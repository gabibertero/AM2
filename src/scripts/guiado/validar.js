// Comprobador local de un subconjunto explícito de álgebra real.
// No ejecuta entradas ni usa muestreo numérico para decidir equivalencia.
const VARIABLES = new Set(['x', 'y', 'z', 'r', 't', 'theta', 'u', 'v', 'C', 'C1', 'C2', 'pi', 'e']);
const FUNCTIONS = new Set(['exp', 'ln', 'sin', 'cos', 'sqrt']);
const LIMIT = { chars: 360, tokens: 220, depth: 28, terms: 200, operations: 20000, exponent: 12, digits: 150, atomSize: 4096, keySize: 65536 };
class Unsupported extends Error {}
const stop = (message) => { throw new Unsupported(message); };
function gcd(a, b) { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) [a, b] = [b, a % b]; return a; }
function fraction(n, d = 1n) {
  if (!d) stop('Hay una división por cero. Revisá el denominador.');
  if (String(n).length > LIMIT.digits || String(d).length > LIMIT.digits) stop('La cuenta es demasiado grande para este comprobador.');
  if (d < 0n) { n = -n; d = -d; }
  const g = gcd(n, d); return [n / g, d / g];
}
const qAdd = (a, b) => fraction(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
const qMul = (a, b) => fraction(a[0] * b[0], a[1] * b[1]);
const qNeg = (a) => [-a[0], a[1]];
const qKey = (a) => `${a[0]}/${a[1]}`;
function monoKey(m) {
  const entries = [...m].filter(([, n]) => n).sort(([a], [b]) => a.localeCompare(b));
  // Las funciones anidadas vuelven a escapar claves. Acotá el tamaño antes de serializar.
  const size = entries.reduce((total, [name]) => total + name.length, 0);
  if (size > LIMIT.atomSize) stop('Hay demasiadas funciones anidadas. Separá la cuenta en pasos más cortos.');
  return JSON.stringify(entries);
}
const mono = (key) => new Map(JSON.parse(key));
const ONE_KEY = '[]';
const constant = (q) => q[0] ? new Map([[ONE_KEY, q]]) : new Map();
const atom = (name) => new Map([[monoKey(new Map([[name, 1]])), [1n, 1n]]]);
function context() {
  let ops = 0;
  const charge = (n = 1) => { ops += n; if (ops > LIMIT.operations) stop('Separá la cuenta en una expresión más corta.'); };
  const bounded = (p) => { if (p.size > LIMIT.terms) stop('La expresión tiene demasiados términos.'); return p; };
  function add(a, b) {
    const p = new Map(a); charge(a.size + b.size);
    for (const [m, q] of b) { const c = qAdd(p.get(m) || [0n, 1n], q); if (c[0]) p.set(m, c); else p.delete(m); }
    return bounded(p);
  }
  const neg = (a) => new Map([...a].map(([k, q]) => [k, qNeg(q)]));
  function mul(a, b) {
    const p = new Map(); charge(a.size * b.size);
    for (const [ka, qa] of a) for (const [kb, qb] of b) {
      const m = mono(ka);
      for (const [v, n] of mono(kb)) m.set(v, (m.get(v) || 0) + n);
      const k = monoKey(m), q = qAdd(p.get(k) || [0n, 1n], qMul(qa, qb));
      if (q[0]) p.set(k, q); else p.delete(k);
      bounded(p);
    }
    return p;
  }
  function power(p, n) { let out = constant([1n, 1n]), base = p; while (n) { if (n % 2) out = mul(out, base); n = Math.floor(n / 2); if (n) base = mul(base, base); } return out; }
  return { add, neg, mul, power };
}
function polyKey(p) {
  const entries = [...p].sort(([a], [b]) => a.localeCompare(b)).map(([k, q]) => [k, qKey(q)]);
  const size = entries.reduce((total, [key, coefficient]) => total + key.length + coefficient.length, 0);
  if (size > LIMIT.keySize) stop('La expresión es demasiado grande. Separá la cuenta en pasos más cortos.');
  return JSON.stringify(entries);
}
function scalar(p) { return p.size === 0 ? [0n, 1n] : p.size === 1 && p.has(ONE_KEY) ? p.get(ONE_KEY) : null; }
function normalizedPoly(p) {
  if (!p.size) return '0';
  const entries = [...p].sort(([a], [b]) => a.localeCompare(b)), first = entries[0][1];
  return polyKey(new Map(entries.map(([m, q]) => [m, fraction(q[0] * first[1], q[1] * first[0])])));
}
// Los denominadores constantes y sumas positivas de potencias pares no restringen el dominio real.
function certainlyNonzero(p) {
  const c = p.get(ONE_KEY); if (!c?.[0]) return false;
  const sign = c[0] > 0n;
  return [...p].every(([m, q]) => (q[0] > 0n) === sign && [...mono(m)].every(([name, n]) => n % 2 === 0 && !name.startsWith('fn:')));
}
function zeros(p) {
  if (!p.size) stop('Hay una división por cero. Revisá el denominador.');
  if (scalar(p) || certainlyNonzero(p)) return [];
  // En un monomio, cada factor debe ser distinto de cero; x y x² comparten restricción.
  if (p.size === 1) return [...mono(p.keys().next().value).keys()].filter((name) => name !== 'pi' && name !== 'e').map((name) => normalizedPoly(atom(name)));
  return [normalizedPoly(p)];
}
function expression(n, d = constant([1n, 1n]), restrictions = new Set(), numeratorZeros = null) {
  return { n, d, restrictions, numeratorZeros: numeratorZeros ?? zerosForNumerator(n) };
}
function zerosForNumerator(p) { return p.size ? zeros(p) : ['zero']; }
function rationalKey(a) {
  // Canonical normalization sufficient for reordered/factored polynomials inside functions.
  const d = scalar(a.d);
  if (d) return polyKey(new Map([...a.n].map(([m, q]) => [m, fraction(q[0] * d[1], q[1] * d[0])])));
  const first = (p) => [...p].sort(([x], [y]) => x.localeCompare(y))[0]?.[1] || [0n, 1n];
  return `${normalizedPoly(a.n)}|${normalizedPoly(a.d)}|${qKey(first(a.n))}/${qKey(first(a.d))}`;
}
function normalize(input) {
  if (typeof input !== 'string') stop('Escribí una expresión en el casillero.');
  if (input.length > LIMIT.chars) stop('Escribí solamente la expresión de este paso.');
  return input.trim().replaceAll('π', 'pi').replaceAll('θ', 'theta').replace(/[−–]/g, '-').replace(/[×·]/g, '*').replaceAll('÷', '/').replaceAll('²', '^2').replaceAll('³', '^3').replace(/C_([12])/g, 'C$1').replace(/\bsen\b/g, 'sin').replace(/\b([0-9]+),([0-9]+)\b/g, '$1.$2');
}
function tokenize(text) {
  const tokens = [], re = /\s+|(?:\d+(?:\.\d*)?|\.\d+)|[A-Za-z_][A-Za-z_0-9]*|[()+\-*/^]/gy;
  let pos = 0;
  while (pos < text.length) {
    re.lastIndex = pos; const m = re.exec(text);
    if (!m) stop('Usá números, letras, +, -, *, /, ^ y paréntesis. Ejemplo: 5-r^2/5.');
    pos = re.lastIndex; if (/^\s/.test(m[0])) continue;
    const word = m[0];
    if (/^[A-Za-z]/.test(word) && !VARIABLES.has(word) && !FUNCTIONS.has(word)) {
      if (/^[xyzrtuv]+$/.test(word)) tokens.push(...word); else stop(`No reconozco «${word}». Usá exp, ln, sin, cos o sqrt para esas funciones.`);
    } else tokens.push(word);
    if (tokens.length > LIMIT.tokens) stop('La expresión es demasiado larga para comprobarla.');
  }
  tokens.push('EOF'); return tokens;
}
function parse(raw) {
  const text = normalize(raw); if (!text) stop('Completá este paso antes de comprobarlo.');
  const tokens = tokenize(text), op = context(); let i = 0, depth = 0;
  const num = (n, d = 1n) => expression(constant(fraction(n, d)));
  const merge = (a, b) => new Set([...a.restrictions, ...b.restrictions]);
  const subtract = (a, b) => op.add(a, op.neg(b));
  function combine(a, b, action) {
    const restrictions = merge(a, b);
    if (action === '+') return expression(op.add(op.mul(a.n, b.d), op.mul(b.n, a.d)), op.mul(a.d, b.d), restrictions);
    if (action === '-') return expression(subtract(op.mul(a.n, b.d), op.mul(b.n, a.d)), op.mul(a.d, b.d), restrictions);
    if (action === '*') return expression(op.mul(a.n, b.n), op.mul(a.d, b.d), restrictions, [...a.numeratorZeros, ...b.numeratorZeros]);
    if (!b.n.size) stop('Hay una división por cero. Revisá el denominador.');
    for (const r of b.numeratorZeros) restrictions.add(r);
    return expression(op.mul(a.n, b.d), op.mul(a.d, b.n), restrictions, a.numeratorZeros);
  }
  function functionCall(name, arg) {
    const nq = scalar(arg.n), dq = scalar(arg.d), q = nq && dq ? fraction(nq[0] * dq[1], nq[1] * dq[0]) : null;
    const restrictions = new Set(arg.restrictions);
    // Las condiciones reales sobreviven incluso si una resta o un producto cancela la función.
    if (!q && (name === 'ln' || name === 'sqrt')) restrictions.add(`${name === 'ln' ? 'positive' : 'nonnegative'}:${rationalKey(arg)}`);
    const fixed = (n, d = 1n) => ({ ...num(n, d), restrictions: new Set(restrictions) });
    if (q && name === 'ln' && q[0] <= 0n) stop('El logaritmo real necesita un argumento positivo.');
    if (q && name === 'sqrt' && q[0] < 0n) stop('La raíz cuadrada real necesita un argumento no negativo.');
    if (q && q[0] === 0n && (name === 'exp' || name === 'cos')) return fixed(1n);
    if (q && q[0] === 0n && (name === 'sin' || name === 'sqrt')) return fixed(0n);
    if (q && name === 'ln' && q[0] === q[1]) return fixed(0n);
    if (q && name === 'sqrt') {
      const integerRoot = (v) => { if (v < 2n) return v; let x = v, y = (x + 1n) / 2n; while (y < x) { x = y; y = (x + v / x) / 2n; } return x; };
      const n = integerRoot(q[0]), d = integerRoot(q[1]); if (n * n === q[0] && d * d === q[1]) return fixed(n, d);
    }
    return expression(atom(`fn:${name}(${rationalKey(arg)})`), constant([1n, 1n]), restrictions);
  }
  const isPrimary = (t) => t === '(' || /^\d|^\./.test(t) || VARIABLES.has(t) || FUNCTIONS.has(t);
  function primary() {
    if (++depth > LIMIT.depth) stop('Hay demasiados paréntesis anidados.');
    const t = tokens[i++]; let out;
    if (t === '(') { out = sum(); if (tokens[i++] !== ')') stop('Falta cerrar un paréntesis.'); }
    else if (FUNCTIONS.has(t)) { if (tokens[i++] !== '(') stop(`Escribí ${t}(...) con paréntesis.`); const a = sum(); if (tokens[i++] !== ')') stop('Falta cerrar el paréntesis de la función.'); out = functionCall(t, a); }
    else if (/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(t)) { const [a, b = ''] = t.split('.'); out = num(BigInt((a || '0') + b), 10n ** BigInt(b.length)); }
    else if (VARIABLES.has(t)) { out = expression(atom(t)); if (t === 'e') out.eBase = true; }
    else stop('La expresión quedó incompleta. Revisá los signos y paréntesis.');
    depth--; return out;
  }
  function power() {
    let a = primary();
    if (tokens[i] === '^') {
      i++; const b = unary();
      if (a.eBase) return functionCall('exp', b);
      const n = scalar(b.n), d = scalar(b.d), q = n && d ? fraction(n[0] * d[1], n[1] * d[0]) : null;
      if (!q || q[1] !== 1n || q[0] > BigInt(LIMIT.exponent) || q[0] < -BigInt(LIMIT.exponent)) stop('Acá puedo comprobar potencias enteras entre -12 y 12. Para una raíz usá sqrt(...).');
      const k = Number(q[0]), restrictions = merge(a, b);
      if (k <= 0) for (const r of a.numeratorZeros) restrictions.add(r);
      if (k < 0 && !a.n.size || k === 0 && !a.n.size) stop('Esta potencia no está definida.');
      a = k < 0 ? expression(op.power(a.d, -k), op.power(a.n, -k), restrictions, []) : expression(op.power(a.n, k), op.power(a.d, k), restrictions, k ? a.numeratorZeros : []);
    }
    return a;
  }
  function unary() { if (tokens[i] === '+') { i++; return unary(); } if (tokens[i] === '-') { i++; const a = unary(); return { ...a, n: op.neg(a.n), eBase: false }; } return power(); }
  function product() { let a = unary(); while (tokens[i] === '*' || tokens[i] === '/' || isPrimary(tokens[i])) { const action = tokens[i] === '*' || tokens[i] === '/' ? tokens[i++] : '*'; a = combine(a, unary(), action); } return a; }
  function sum() { let a = product(); while (tokens[i] === '+' || tokens[i] === '-') { const action = tokens[i++]; a = combine(a, product(), action); } return a; }
  const result = sum(); if (tokens[i] !== 'EOF') stop('Sobran signos o paréntesis en la expresión.'); return result;
}
const setsEqual = (a, b) => a.size === b.size && [...a].every((x) => b.has(x));
function atomsOf(a) { return new Set([...a.n, ...a.d].flatMap(([m]) => [...mono(m).keys()])); }
/** Exact algebra on the supported real-domain subset. No numeric guessing. */
export function checkExpression(input, expected) {
  try {
    const a = parse(input), b = parse(expected), op = context();
    const equal = polyKey(op.mul(a.n, b.d)) === polyKey(op.mul(b.n, a.d));
    if (equal) {
      if (!setsEqual(a.restrictions, b.restrictions)) return { status: 'unsupported', message: 'Las cuentas coinciden donde están definidas, pero cambian las restricciones de dominio. Revisá el dominio o usá la forma pedida.' };
      return { status: 'correct', message: 'Bien: la expresión coincide con la de este paso.' };
    }
    const functionsA = new Set([...atomsOf(a)].filter((x) => x.startsWith('fn:'))), functionsB = new Set([...atomsOf(b)].filter((x) => x.startsWith('fn:')));
    if (functionsA.size || functionsB.size) return { status: 'unsupported', message: 'No puedo asegurar si estas funciones son equivalentes. Probá escribirlas con la misma función indicada en el paso; no lo cuento como error.' };
    return { status: 'incorrect', message: 'Esta expresión no coincide. Revisá signos, factores y la operación de este paso.' };
  } catch (error) {
    return { status: 'unsupported', message: error instanceof Unsupported ? error.message : 'No pude comprobar esa escritura. Probá una expresión más corta con operaciones y paréntesis.' };
  }
}
