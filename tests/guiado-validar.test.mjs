import test from 'node:test';
import assert from 'node:assert/strict';
import { checkExpression } from '../src/scripts/guiado/validar.js';
const status = (a, b) => checkExpression(a, b).status;
test('cuentas exactas, fracciones y pi sin aproximaciones numéricas', () => {
  for (const [a,b] of [['0.5','1/2'],['125π/2','62.5*pi'],['16*pi/3','(8/3)*2pi'],['2,5','5/2'],['sqrt(25)','5'],['sqrt(1/4)','1/2'],['-(-3)','3']]) assert.equal(status(a,b),'correct',`${a} = ${b}`);
  for (const [a,b] of [['3.14159','pi'],['25','5'],['125*pi','125*pi/2'],['-9','9']]) assert.equal(status(a,b),'incorrect',`${a} != ${b}`);
});
test('equivalencias algebraicas y precedencia, incluye formas expandidas', () => {
  for (const [a,b] of [['(x+1)^2','x^2+2x+1'],['5-r²/5','(25-r^2)/5'],['-x^2','-(x*x)'],['2xy','2*x*y'],['1/(x+1)','(x+1)^-1'],['(x*x)/x','x^2/x'],['exp(x+x)','exp(2*x)'],['e^x','exp(x)'],['(1+x^2)*(ln(1+x^2)+C)','C*(1+x^2)+(1+x*x)*ln(x*x+1)']]) assert.equal(status(a,b),'correct',`${a} = ${b}`);
  for (const [a,b] of [['-x^2','(-x)^2'],['5-r^2/5','5+r^2/5'],['2*r','2*r^2']]) assert.equal(status(a,b),'incorrect',`${a} != ${b}`);
});
test('no aprueba alteraciones de dominio ni identidades fuera de alcance', () => {
  assert.equal(status('x/x','1'),'unsupported');
  assert.equal(status('(x^2-1)/(x-1)','x+1'),'unsupported');
  assert.equal(status('sin(x)^2+cos(x)^2','1'),'unsupported');
  assert.equal(status('exp(2*x)','exp(x)^2'),'unsupported');
  assert.equal(status('ln(x^2)','2*ln(x)'),'unsupported');
  assert.equal(status('sqrt(x^2)','x'),'unsupported');
  assert.equal(status('exp(ln(x))+x','2*exp(ln(x))'),'unsupported');
  assert.equal(status('sin(x)^2+cos(x)^2','2*sin(x)^2+2*cos(x)^2-1'),'unsupported');
});
test('funciones elementales y constantes, sin ejecutar código del usuario', () => {
  assert.equal(status('sen(x)','sin(x)'),'correct');
  assert.equal(status('exp(0)+cos(0)+ln(1)','2'),'correct');
  for (const text of ['globalThis.process.exit()','constructor("return 1")()','x;alert(1)','<img onerror=alert(1)>','ln(-1)','sqrt(-1)','1/0','0^0','','x^y','y=2*x']) assert.equal(status(text,'1'),'unsupported',text);
});
test('controla complejidad sin colgarse ni agotar memoria', () => {
  for (const text of ['x'.repeat(500), '('.repeat(32)+'1'+')'.repeat(32), '(x+y+z+r+t+u+v+theta)^12','2^99999999','9'.repeat(151), '1/'.repeat(100)+'0']) assert.equal(status(text,'1'),'unsupported');
});

test('las funciones conservan sus condiciones reales incluso al cancelarse', () => {
  for (const [a,b] of [
    ['ln(x)-ln(x)','0'], ['0*sqrt(x)','0'],
    ['exp(ln(x))-exp(ln(x))','0'], ['sqrt(x)-sqrt(x)','0'],
    ['ln(x/x)','0'], ['exp((1/x)^0-1)','1'],
    ['ln((1/x)^0)','0'], ['sqrt(4*(1/x)^0)','2'],
    ['sin((1/x)^0-1)','0'], ['cos((1/x)^0-1)','1'],
  ]) assert.equal(status(a,b),'unsupported',`${a} pierde dominio frente a ${b}`);
  assert.equal(status('ln(x)+ln(x)','2*ln(x)'),'correct');
  assert.equal(status('sqrt(x)+sqrt(x)','2*sqrt(x)'),'correct');
  assert.equal(status('ln(2)-ln(2)','0'),'correct');
  assert.equal(status('0*sqrt(4)','0'),'correct');
});
test('negar la base e no la transforma en una exponencial de base positiva', () => {
  assert.notEqual(status('(-e)^3','exp(3)'),'correct');
  assert.equal(status('(-e)^x','exp(x)'),'unsupported');
  assert.equal(status('(-e)^3','-e*e*e'),'correct');
  assert.equal(status('e^3','exp(3)'),'correct');
  assert.equal(status('-e^3','-exp(3)'),'correct');
  assert.equal(status('e^x','exp(x)'),'correct');
});

test('las claves de funciones anidadas tienen un límite de tamaño', () => {
  const nested = 'exp('.repeat(15) + 'x' + ')'.repeat(15);
  assert.equal(status(nested, nested), 'unsupported');
  assert.equal(status('exp(ln(x+1))', 'exp(ln(1+x))'), 'correct');
});
