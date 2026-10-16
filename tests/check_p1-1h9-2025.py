"""Recalcula con sympy el 1º parcial 1H9 2025 (G1, G2 y recuperatorio): resultados e intermedios, y que los MDX digan lo mismo.
Uso: python3 tests/check_p1-1h9-2025.py"""
from pathlib import Path
import numpy as np
import sympy as sp

BASE = Path(__file__).resolve().parents[1] / "src/content/parciales"
M = {k: (BASE / f"p1-1h9-2025-{k}.mdx").read_text() for k in ("05-g1", "05-g2", "07-rec")}


def en_mdx(k, *ss):
    for s in ss:
        assert s in M[k], f"falta en {k}: {s}"


R = sp.Rational
x, y, t = sp.symbols("x y t", real=True)
r2 = sp.sqrt(2)


def grilla_dominio(f_num, cond, xl, yl, n=801):
    """El dominio analítico debe coincidir con dónde la fórmula da un real finito (grilla con paso irracional)."""
    X, Y = np.meshgrid(np.linspace(*xl, n) + 1e-7*np.pi, np.linspace(*yl, n) + 1e-7*np.e)
    with np.errstate(all="ignore"):
        ok = np.isfinite(f_num(X, Y))
    assert (ok == cond(X, Y)).all(), "dominio analítico no coincide con la fórmula"
    assert ok.any() and (~ok).any()


def clasifica(f, pcs):
    """Hessiano de la cátedra: H = f''xx·f''yy − (f''xy)²; con H>0 el signo de f''xx decide."""
    H = sp.simplify(sp.diff(f, x, 2)*sp.diff(f, y, 2) - sp.diff(f, x, y)**2)
    res = {}
    for p in pcs:
        s = {x: p[0], y: p[1]}
        h, fxx = H.subs(s), sp.diff(f, x, 2).subs(s)
        res[p] = ("silla" if h < 0 else "mín" if fxx > 0 else "máx") if h != 0 else "dudoso"
    return H, res


def vecindad(f, p, r=R(1, 20)):
    """Comprobación numérica: mín/máx/silla mirando f en 16 direcciones alrededor del punto."""
    v = [f.subs({x: p[0] + r*sp.cos(a), y: p[1] + r*sp.sin(a)}) - f.subs({x: p[0], y: p[1]}) for a in [k*sp.pi/8 for k in range(16)]]
    v = [float(i) for i in v]
    return "mín" if min(v) > 0 else "máx" if max(v) < 0 else "silla"


def dir_deriv(f, P, v):
    """Por definición: límite de [f(P+t·s°) − f(P)]/t con s° = v/|v| (versor)."""
    u = sp.Matrix(v) / sp.Matrix(v).norm()
    g = f.subs({x: P[0] + t*u[0], y: P[1] + t*u[1]})
    return sp.simplify(sp.limit((g - f.subs({x: P[0], y: P[1]}))/t, t, 0))


# ===================================================================== G1
# --- Ej 1: dominio
f1 = lambda X, Y: (np.log(1 - X**2/4 - Y**2) + np.sqrt(X**2 - Y**2 - 1)) / np.sqrt(2*X*Y)
grilla_dominio(f1, lambda X, Y: (X**2/4 + Y**2 < 1) & (X**2 - Y**2 >= 1) & (X*Y > 0), (-3, 3), (-2, 2))
xs, ys = sp.symbols("xs ys", positive=True)
inter = sp.solve([xs**2 - ys**2 - 1, xs**2/4 + ys**2 - 1], [xs, ys], dict=True)
assert inter == [{xs: sp.sqrt(R(8, 5)), ys: sp.sqrt(R(3, 5))}]                         # vértices de D (ambos en 1.er cuadrante)
assert sp.simplify(1 - R(8, 5)/4 - R(3, 5)) == 0 and R(8, 5) - R(3, 5) == 1
assert R(1, 4) < 1 and 1 - R(1, 4) > 0 and 1**2 - 0 >= 1                              # (1;0): sobre la hipérbola pero xy=0 → excluido
en_mdx("05-g1", r"\sqrt{\tfrac85}", r"\sqrt{\tfrac35}", r"x^2-y^2\ge1", r"\frac{x^2}{4}+y^2<1", r"x\,y>0")

# --- Ej 2: z = sen³(x−y), P(π, π/4)
z2 = sp.sin(x - y)**3
zx, zy = sp.diff(z2, x), sp.diff(z2, y)
assert sp.simplify(zx - 3*sp.sin(x - y)**2*sp.cos(x - y)) == 0 and sp.simplify(zy + 3*sp.sin(x - y)**2*sp.cos(x - y)) == 0
P = {x: sp.pi, y: sp.pi/4}
gx, gy = sp.simplify(zx.subs(P)), sp.simplify(zy.subs(P))
assert (gx, gy) == (-3*r2/4, 3*r2/4)
assert sp.sin(3*sp.pi/4)**2 == R(1, 2) and sp.cos(3*sp.pi/4) == -r2/2
assert -3*R(1, 2)*r2/2 == -3*r2/4                                                      # 3·(1/2)·(−√2/2)
yp = sp.diff(-x**3 + 2*x, x).subs(x, 1); assert yp == -1 and sp.atan(yp) == -sp.pi/4  # pendiente −1 → α = 135° ó 315°
alfa = 3*sp.pi/4; s1 = (sp.cos(alfa), sp.sin(alfa)); s2 = (sp.cos(7*sp.pi/4), sp.sin(7*sp.pi/4))
assert s1 == (-r2/2, r2/2) and s2 == (r2/2, -r2/2)
DD1 = sp.simplify(gx*s1[0] + gy*s1[1]); DD2 = sp.simplify(gx*s2[0] + gy*s2[1])
assert (DD1, DD2) == (R(3, 2), -R(3, 2))
assert sp.simplify(sp.sqrt(gx**2 + gy**2)) == R(3, 2) and sp.simplify(sp.Matrix([gx, gy]).norm()) == R(3, 2)
assert dir_deriv(z2, (sp.pi, sp.pi/4), (-1, 1)) == R(3, 2)                             # definición (límite)
assert dir_deriv(z2, (sp.pi, sp.pi/4), (1, 1)) == 0                                    # dirección nula
assert sp.atan2(gy, gx) == 3*sp.pi/4 and sp.atan2(gy, gx)*180/sp.pi == 135
assert R(9, 8) + R(9, 8) == R(9, 4) and sp.sqrt(R(9, 4)) == R(3, 2)
assert R(6, 8) + R(6, 8) == R(3, 2)
en_mdx("05-g1", r"\frac{\partial z}{\partial s}\Big|_P=\frac32\ \ (\alpha=135^\circ)", r"\|\nabla z\|=\frac32", r"-\frac{3\sqrt2}{4}\,i+\frac{3\sqrt2}{4}\,j", r"\theta=\frac{3\pi}{4}=135^\circ", r"y'(1)=-3+2=-1")

# --- Ej 3: z = x² + y²/2 + x²y
z3 = x**2 + y**2/2 + x**2*y
sol = sp.solve([sp.diff(z3, x), sp.diff(z3, y)], [x, y], dict=True)
pcs = {(s[x], s[y]) for s in sol}; assert pcs == {(0, 0), (1, -1), (-1, -1)}
assert sp.factor(x*(1 + y)) == x*(1 + y) and sp.factor(-x**3 + x) == -x*(x - 1)*(x + 1)
assert sp.expand(sp.diff(z3, x, 2) - (2 + 2*y)) == 0 and sp.diff(z3, x, y) == 2*x and sp.diff(z3, y, 2) == 1
H, cl = clasifica(z3, pcs); assert sp.expand(H - (2 + 2*y - 4*x**2)) == 0
assert cl == {(0, 0): "mín", (1, -1): "silla", (-1, -1): "silla"}
assert [H.subs({x: a, y: b}) for a, b in [(0, 0), (1, -1), (-1, -1)]] == [2, -4, -4]
assert {p: vecindad(z3, p) for p in pcs} == {(0, 0): "mín", (1, -1): "silla", (-1, -1): "silla"}   # comprobación independiente
assert z3.subs({x: 0, y: 0}) == 0 and z3.subs({x: 1, y: -1}) == R(1, 2) and z3.subs({x: -1, y: -1}) == R(1, 2)
hh = sp.symbols('hh')
assert sp.expand(z3.subs({x: 1, y: -1 - hh}) - R(1, 2) - hh**2/2) == 0                      # sobre x=1: z = 1/2 + (y+1)²/2
assert sp.expand(z3.subs({x: 1 + hh, y: -1 - hh}) - (R(1, 2) - R(3, 2)*hh**2 - hh**3)) == 0  # sobre (1+h; −1−h): baja
en_mdx("05-g1", r"H(x;y)=z''_{xx}\,z''_{yy}-(z''_{xy})^2=(2+2y)\cdot1-(2x)^2=2+2y-4x^2", r"H(0;0)=2+0-0=2>0", r"H(1;-1)=2-2-4=-4<0", r"H(-1;-1)=2-2-4=-4<0")

# ===================================================================== G2
# --- Ej 1
f1 = lambda X, Y: (np.log(X**2 - Y**2 - 1) - np.sqrt(1 - X**2/9 - Y**2/4)) / np.arcsin(Y)
grilla_dominio(f1, lambda X, Y: (X**2 - Y**2 > 1) & (X**2/9 + Y**2/4 <= 1) & (abs(Y) <= 1) & (Y != 0), (-4, 4), (-3, 3), 1201)
assert sp.asin(0) == 0 and sp.asin(1) == sp.pi/2 and sp.asin(-1) == -sp.pi/2         # arcsen(y)=0 sólo en y=0; |y|≤1
# la hipérbola y la elipse no se cortan dentro de |y|≤1: 13y² = 32 → y² = 32/13 > 1
assert sp.solve(4*(1 + ys**2) + 9*ys**2 - 36, ys) == [sp.sqrt(R(32, 13))] and R(32, 13) > 1
en_mdx("05-g2", r"x^2-y^2>1\ \ \wedge", r"\frac{x^2}{9}+\frac{y^2}{4}\le1", r"-1\le y\le1", r"y\neq0", r"13y^2=32\ \Rightarrow\ y^2=\frac{32}{13}")

# --- Ej 2: z = Ln((x²+2)/y²), P(1,−2), s = PQ
z2 = sp.log((x**2 + 2)/y**2)
zx, zy = sp.simplify(sp.diff(z2, x)), sp.simplify(sp.diff(z2, y))
assert sp.simplify(zx - 2*x/(x**2 + 2)) == 0 and sp.simplify(zy + 2/y) == 0
gP = (zx.subs({x: 1, y: -2}), zy.subs({x: 1, y: -2})); assert gP == (R(2, 3), 1)
PQ = (4 - 1, -6 + 2); assert PQ == (3, -4) and sp.sqrt(PQ[0]**2 + PQ[1]**2) == 5
u = (R(3, 5), -R(4, 5)); assert u[0]**2 + u[1]**2 == 1
assert R(2, 3)*R(3, 5) == R(2, 5) and 1*(-R(4, 5)) == -R(4, 5) and R(2, 5) - R(4, 5) == -R(2, 5)
assert gP[0]*u[0] + gP[1]*u[1] == -R(2, 5)
assert dir_deriv(z2, (1, -2), (3, -4)) == -R(2, 5)
modg = sp.sqrt(gP[0]**2 + gP[1]**2); assert modg == sp.sqrt(13)/3 and R(4, 9) + 1 == R(13, 9)
th = sp.atan(gP[1]/gP[0]); assert gP[1]/gP[0] == R(3, 2) and abs(float(th*180/sp.pi) - 56.3099) < 1e-3
assert abs(float(modg) - 1.2019) < 1e-3
assert sp.simplify(sp.Matrix(gP).norm() - modg) == 0
assert abs(float(sp.Matrix(gP).dot(sp.Matrix([-gP[1], gP[0]]))/modg**1)) < 1e-12        # dirección nula ⟂ gradiente
assert dir_deriv(z2, (1, -2), (-gP[1], gP[0])) == 0
assert abs(float(th*180/sp.pi) + 180 - 236.3099) < 1e-3 and abs(float(th*180/sp.pi) + 90 - 146.3099) < 1e-3
en_mdx("05-g2", r"\frac{\partial z}{\partial s}\Big|_P=-\frac25", r"\|\nabla z\|=\sqrt{\left(\frac23\right)^2+1^2}=\sqrt{\frac49+1}=\sqrt{\frac{13}{9}}=\frac{\sqrt{13}}{3}", r"\theta=\arctan\frac{z'_y}{z'_x}=\arctan\frac{1}{2/3}=\arctan\frac32", r"(3;-4)", r"\frac25-\frac45=-\frac25")

# --- Ej 3: z = 2/3 x³ − 18x − 4/3 y³ + 16y
z3 = R(2, 3)*x**3 - 18*x - R(4, 3)*y**3 + 16*y
sol = sp.solve([sp.diff(z3, x), sp.diff(z3, y)], [x, y], dict=True); pcs = {(s[x], s[y]) for s in sol}
assert pcs == {(3, 2), (-3, -2), (3, -2), (-3, 2)}
assert sp.diff(z3, x) == 2*x**2 - 18 and sp.diff(z3, y) == -4*y**2 + 16
assert (sp.diff(z3, x, 2), sp.diff(z3, y, 2), sp.diff(z3, x, y)) == (4*x, -8*y, 0)
H, cl = clasifica(z3, pcs); assert sp.expand(H + 32*x*y) == 0
assert cl == {(3, 2): "silla", (-3, -2): "silla", (3, -2): "mín", (-3, 2): "máx"}
assert [H.subs({x: a, y: b}) for a, b in [(3, 2), (-3, -2), (3, -2), (-3, 2)]] == [-192, -192, 192, 192]
assert [sp.diff(z3, x, 2).subs({x: 3}), sp.diff(z3, x, 2).subs({x: -3})] == [12, -12]
assert {p: vecindad(z3, p) for p in pcs} == cl
assert [z3.subs({x: a, y: b}) for a, b in [(3, -2), (-3, 2)]] == [-R(172, 3), R(172, 3)]
# comprobación por separación de variables: z=g(x)+h(y)
g, h = R(2, 3)*x**3 - 18*x, -R(4, 3)*y**3 + 16*y
assert sp.expand(g + h - z3) == 0 and [sp.diff(g, x, 2).subs(x, v) for v in (3, -3)] == [12, -12] and [sp.diff(h, y, 2).subs(y, v) for v in (2, -2)] == [-16, 16]
en_mdx("05-g2", r"H(x;y)=4x\cdot(-8y)-0^2=-32\,xy", r"H(3;2)=-32\cdot6=-192<0", r"H(3;-2)=-32\cdot(-6)=192>0", r"z''_{xx}(3;-2)=4\cdot3=12>0", r"z''_{xx}(-3;2)=4\cdot(-3)=-12<0")

# ===================================================================== Recuperatorio
# --- Ej 1: arccos(y/x³) / (36−4x²−9y²)^(1/4)
f1 = lambda X, Y: np.arccos(Y/X**3) / (36 - 4*X**2 - 9*Y**2)**.25
grilla_dominio(f1, lambda X, Y: (abs(Y) <= abs(X)**3) & (X**2/9 + Y**2/4 < 1) & (X != 0), (-3.5, 3.5), (-2.5, 2.5), 1201)
# el intervalo del enunciado oficial (−x³ ≤ y ≤ x³) vale sólo para x>0; para x<0 es x³ ≤ y ≤ −x³ (simétrico por (x,y)→(−x,−y))
assert abs(R(1, 100)) <= abs(-R(1, 2))**3        # (−1/2; 1/100): |y| ≤ |x|³ → en D
assert not (-(-sp.Rational(1, 2))**3 <= sp.Rational(1, 100) <= (-sp.Rational(1, 2))**3)  # …pero NO cumple la desigualdad oficial
assert sp.Rational(1, 100)/(-sp.Rational(1, 2))**3 == -R(8, 100) and abs(-R(8, 100)) <= 1   # y/x³ ∈ [−1,1]
xc = sp.nsolve(x**2/9 + x**6/4 - 1, x, 1.2); assert abs(float(xc) - 1.22237) < 1e-4 and abs(float(xc)**3 - 1.82648) < 1e-3
assert sp.simplify(36 - 4*0 - 9*0) == 36
en_mdx("07-rec", r"-1\le\frac{y}{x^3}\le1,\qquad x\neq0", r"|y|\le|x|^3", r"\frac{x^2}{9}+\frac{y^2}{4}<1", r"x^3\le y\le-x^3", r"x\approx1{,}22")

# --- Ej 2: z = (y²−x³)/(xy), P(1,−1), tangente a y = −x²+5x+1 en x=3
z2 = (y**2 - x**3)/(x*y)
assert sp.simplify(z2 - (y/x - x**2/y)) == 0
zx, zy = sp.diff(z2, x), sp.diff(z2, y)
assert sp.simplify(zx - (-2*x**3*y - y**3)/(x**2*y**2)) == 0 and sp.simplify(zy - (x*y**2 + x**4)/(x**2*y**2)) == 0   # forma del profe (cociente)
gP = (sp.simplify(zx.subs({x: 1, y: -1})), sp.simplify(zy.subs({x: 1, y: -1}))); assert gP == (3, 2)
assert sp.simplify(zx - (-y/x**2 - 2*x/y)) == 0 and sp.simplify(zy - (1/x + x**2/y**2)) == 0
yp = sp.diff(-x**2 + 5*x + 1, x).subs(x, 3); assert yp == -1 and sp.atan(yp) == -sp.pi/4
u = (r2/2, -r2/2); DD = sp.simplify(3*u[0] + 2*u[1]); assert DD == r2/2
assert dir_deriv(z2, (1, -1), (1, -1)) == r2/2 and dir_deriv(z2, (1, -1), (-1, 1)) == -r2/2
assert sp.simplify(sp.Matrix(gP).norm()) == sp.sqrt(13) and abs(float(sp.atan(R(2, 3))*180/sp.pi) - 33.6901) < 1e-3
assert 9 + 4 == 13
assert dir_deriv(z2, (1, -1), (-2, 3)) == 0                                            # nula ⟂ a (3,2)
assert z2.subs({x: 1, y: -1}) == 0 and sp.simplify((y**2 - x**3).subs({x: 1, y: -1})) == 0   # curva de nivel z=0: y² = x³ pasa por P
assert abs(float(sp.sqrt(13))*float(sp.cos(sp.atan(R(2, 3)))) - 3) < 1e-9                # |∇|·cosθ = z'x
en_mdx("07-rec", r"\frac{\partial z}{\partial s}\Big|_P=\frac{\sqrt2}{2}\ (\alpha=-45^\circ)", r"\nabla z(P)=3\,i+2\,j", r"\|\nabla z\|=\sqrt{3^2+2^2}=\sqrt{9+4}=\sqrt{13}", r"\theta_{\text{máx}}=\arctan\frac23", r"y'(3)=-6+5=-1=\tan\alpha")

# --- Ej 3: z = x³ + y³ + 48/y + 3/x
z3 = x**3 + y**3 + 48/y + 3/x
assert sp.simplify(sp.diff(z3, x) - (3*x**2 - 3/x**2)) == 0 and sp.simplify(sp.diff(z3, y) - (3*y**2 - 48/y**2)) == 0
assert sp.factor(x**4 - 1) == (x - 1)*(x + 1)*(x**2 + 1) and sp.factor(y**4 - 16) == (y - 2)*(y + 2)*(y**2 + 4)
assert sp.solve(x**4 - 1, x) == [-1, 1] and sp.solve(y**4 - 16, y) == [-2, 2]          # en R
pcs = {(a, b) for a in (1, -1) for b in (2, -2)}
assert all(sp.simplify(sp.diff(z3, x).subs({x: a, y: b})) == 0 and sp.simplify(sp.diff(z3, y).subs({x: a, y: b})) == 0 for a, b in pcs)
assert sp.simplify(sp.diff(z3, x, 2) - (6*x + 6/x**3)) == 0 and sp.simplify(sp.diff(z3, y, 2) - (6*y + 96/y**3)) == 0 and sp.diff(z3, x, y) == 0
H, cl = clasifica(z3, pcs)
assert cl == {(1, 2): "mín", (-1, -2): "máx", (1, -2): "silla", (-1, 2): "silla"}
assert [sp.diff(z3, x, 2).subs({x: a, y: b}) for a, b in [(1, 2), (-1, -2), (1, -2), (-1, 2)]] == [12, -12, 12, -12]
assert [sp.diff(z3, y, 2).subs({x: a, y: b}) for a, b in [(1, 2), (-1, -2), (1, -2), (-1, 2)]] == [24, -24, -24, 24]
assert [H.subs({x: a, y: b}) for a, b in [(1, 2), (-1, -2), (1, -2), (-1, 2)]] == [288, 288, -288, -288]
assert {p: vecindad(z3, p, R(1, 40)) for p in pcs} == cl
assert [z3.subs({x: a, y: b}) for a, b in [(1, 2), (-1, -2), (1, -2), (-1, 2)]] == [36, -36, -28, 28]
assert 6 + 6 == 12 and 12 + R(96, 8) == 24
en_mdx("07-rec", r"H(1;2)=288>0", r"H(1;-2)=-288<0", r"z''_{xx}(1;2)=12>0", r"z''_{xx}(-1;-2)=-12<0", r"z(1;2)=36")

print("OK check_p1-1h9-2025")
