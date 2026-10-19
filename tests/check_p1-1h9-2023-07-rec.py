"""Recalcula con sympy el Recuperatorio 1º parcial 1H9 Jul-23 (08/07/2023): resultados e intermedios, y que el MDX diga lo mismo.
Ej. 1 con la lectura de la resolución oficial (36 − 4x² + 9y²: el signo del enunciado es ilegible).
Uso: python3 tests/check_p1-1h9-2023-07-rec.py"""
from pathlib import Path
import itertools
import numpy as np
import sympy as sp

M = (Path(__file__).resolve().parents[1] / "src/content/parciales/p1-1h9-2023-07-rec.mdx").read_text()


def en_mdx(*ss):
    for s in ss:
        assert s in M, f"falta en el MDX: {s}"


R = sp.Rational
x, y, z, t = sp.symbols("x y z t", real=True)
r2 = sp.sqrt(2)

# --- Ej 1: f = √(36 − 4x² + 9y²)·ln(x²+y²−4)  (lectura de la oficial)
X, Y = np.meshgrid(np.linspace(-8, 8, 1601) + 1e-7*np.pi, np.linspace(-8, 8, 1601) + 1e-7*np.e)
with np.errstate(all="ignore"):
    fin = np.isfinite(np.sqrt(36 - 4*X**2 + 9*Y**2)*np.log(X**2 + Y**2 - 4))
assert (fin == ((X**2/9 - Y**2/4 <= 1) & (X**2 + Y**2 > 4))).all()
assert sp.simplify((36 - 4*x**2 + 9*y**2)/36 - (1 - x**2/9 + y**2/4)) == 0                    # ÷36 → x²/9 − y²/4 ≤ 1
def dom(px, py):
    a, b = R(px), R(py); return (36 - 4*a**2 + 9*b**2 >= 0) and (a**2 + b**2 - 4 > 0)
assert [dom(*p) for p in [(0, 3), (0, 0), (2, 0), (3, 0), (4, 0), (5, 5)]] == [True, False, False, True, False, True]
assert 36 + 81 == 117 and 36 - 36 == 0 and 36 - 64 < 0 and 36 - 100 + 225 == 161
# el disco de radio 2 está dentro de la zona entre ramas (todos sus puntos cumplen x²/9 − y²/4 ≤ 1)
th_ = np.linspace(0, 2*np.pi, 721); assert (4*np.cos(th_)**2/9 - 4*np.sin(th_)**2/4 <= 1).all()
en_mdx(r"\frac{x^2}{9}-\frac{y^2}{4}\le1", r"x^2+y^2-4>0\ \Rightarrow\ x^2+y^2>4", r"36+81=117\ge0", r"\boxed{?}", r"y=\pm\frac23x")

# --- Ej 2: paralelepípedo 3×2×6, 2%
V = x*y*z; D = sp.sqrt(x**2 + y**2 + z**2); pt = {x: 3, y: 2, z: 6}
assert V.subs(pt) == 36 and D.subs(pt) == 7
dx, dy, dz = R(2, 100)*3, R(2, 100)*2, R(2, 100)*6; assert (dx, dy, dz) == (R(6, 100), R(4, 100), R(12, 100))
aV = [sp.diff(V, v).subs(pt) for v in (x, y, z)]; assert aV == [12, 18, 6]
assert [a*d for a, d in zip(aV, (dx, dy, dz))] == [R(72, 100)]*3
dV = sum(a*d for a, d in zip(aV, (dx, dy, dz))); assert dV == R(216, 100) and dV/36*100 == 6
aD = [sp.simplify(sp.diff(D, v).subs(pt)) for v in (x, y, z)]; assert aD == [R(3, 7), R(2, 7), R(6, 7)]
dD = sum(a*d for a, d in zip(aD, (dx, dy, dz))); assert dD == R(14, 100) and dD/7*100 == 2
assert R(18, 100) + R(8, 100) + R(72, 100) == R(98, 100) and R(98, 100)/7 == R(14, 100)
# comprobación: relativos
assert R(2, 100)*3 == R(6, 100) and R(2, 100)*(9 + 4 + 36)/7 == R(14, 100) == R(2, 100)*7
en_mdx(r"dV=2{,}16\ \text{cm}^3", r"E\%(V)=\frac{2{,}16}{36}\cdot100=6\%", r"\frac{0{,}98}{7}=0{,}14\ \text{cm}", r"E\%(D)=\frac{0{,}14}{7}\cdot100=2\%", r"dD=\frac{0{,}02\,(x^2+y^2+z^2)}{D}=0{,}02\,D")

# --- Ej 3: f = ln(x/y), P(2,1), bisectriz del 2.º cuadrante (135°)
f3 = sp.log(x/y); P = {x: 2, y: 1}
u = (sp.cos(3*sp.pi/4), sp.sin(3*sp.pi/4)); assert u == (-r2/2, r2/2)
g = f3.subs({x: 2 + t*u[0], y: 1 + t*u[1]})
lim = sp.limit((g - f3.subs(P))/t, t, 0); assert sp.simplify(lim + 3*r2/4) == 0               # por definición (límite)
a_ = r2/2
q = (sp.log(1 - a_*t/2) - sp.log(1 + a_*t))/t; assert sp.simplify(sp.limit(q, t, 0) + 3*a_/2) == 0 and sp.simplify(-a_/2 - a_ + 3*r2/4) == 0
tv = R(1, 10); assert abs(float(((g - f3.subs(P)) - (sp.log(1 - a_*t/2) - sp.log(1 + a_*t))).subs(t, tv))) < 1e-12   # las dos formas del cociente coinciden
gx, gy = sp.diff(f3, x).subs(P), sp.diff(f3, y).subs(P); assert (gx, gy) == (R(1, 2), -1)
assert sp.simplify(gx*u[0] + gy*u[1] + 3*r2/4) == 0                                           # comprobación con ∇f·s°
mod = sp.sqrt(gx**2 + gy**2); assert mod == sp.sqrt(5)/2 and abs(float(3*r2/4)) < float(mod)
th = sp.atan2(gy, gx); assert sp.simplify(th - sp.atan(-2)) == 0 and abs(float(th)*180/np.pi + 63.4349) < 1e-3
assert abs(float(th)*180/np.pi % 360 - 296.5651) < 1e-3
assert abs((float(th)*180/np.pi + 180) - 116.5651) < 1e-3
assert abs((float(th)*180/np.pi + 90) - 26.5651) < 1e-3 and abs((float(th)*180/np.pi + 270) - 206.5651) < 1e-3
en_mdx(r"-\frac{3\sqrt2}{4}", r"\nabla f(P)=\frac12\,i-j", r"\frac{\sqrt5}{2}", r"\arctan(-2)\approx-63{,}43^\circ", r"\frac{\ln\left(1-\frac{a\,t}{2}\right)-\ln\left(1+a\,t\right)}{t}", r"-\frac a2-a=-\frac{3a}{2}")

# --- Ej 4: z = x⁴+y⁴−x²−y²−1
f4 = x**4 + y**4 - x**2 - y**2 - 1
sol = sp.solve([sp.diff(f4, x), sp.diff(f4, y)], [x, y], dict=True)
pts = {(s[x], s[y]) for s in sol}; c = r2/2
assert len(pts) == 9 and pts == set(itertools.product([0, c, -c], repeat=2))
assert sp.factor(sp.diff(f4, x)) == 2*x*(2*x**2 - 1) and sp.factor(sp.diff(f4, y)) == 2*y*(2*y**2 - 1)
fxx, fyy, fxy = sp.diff(f4, x, 2), sp.diff(f4, y, 2), sp.diff(f4, x, y)
assert sp.expand(fxx - (12*x**2 - 2)) == 0 and sp.expand(fyy - (12*y**2 - 2)) == 0 and fxy == 0
def clas(p):
    Hh = (fxx*fyy - fxy**2).subs({x: p[0], y: p[1]}); a = fxx.subs({x: p[0], y: p[1]})
    return "silla" if Hh < 0 else ("mín" if a > 0 else "máx")
cl = {p: clas(p) for p in pts}
assert cl[(0, 0)] == "máx" and sum(v == "máx" for v in cl.values()) == 1
assert sum(v == "mín" for v in cl.values()) == 4 and all(cl[(sx*c, sy*c)] == "mín" for sx in (1, -1) for sy in (1, -1))
assert sum(v == "silla" for v in cl.values()) == 4 and all(cl[p] == "silla" for p in [(0, c), (0, -c), (c, 0), (-c, 0)])
Hv = lambda p: sp.simplify((fxx*fyy).subs({x: p[0], y: p[1]}))
assert Hv((0, 0)) == 4 and Hv((0, c)) == -8 and Hv((c, 0)) == -8 and Hv((c, c)) == 16
# discrepancia con la oficial: lista 7 (faltan (c,c) y (−c,−c)); ambos son mínimos
oficial = {(0, 0), (0, c), (0, -c), (c, 0), (-c, 0), (c, -c), (-c, c)}
assert pts - oficial == {(c, c), (-c, -c)} and cl[(c, c)] == cl[(-c, -c)] == "mín" and len(oficial) == 7
# comprobación: g(u) = u⁴ − u² separa variables
uu = sp.symbols("uu"); gg = uu**4 - uu**2
assert sorted(sp.solve(sp.diff(gg, uu), uu), key=float) == [-c, 0, c] and sp.diff(gg, uu, 2).subs(uu, 0) == -2 and sp.diff(gg, uu, 2).subs(uu, c) == 4
assert f4.subs({x: 0, y: 0}) == -1 and f4.subs({x: c, y: c}) == -R(3, 2) and f4.subs({x: 0, y: c}) == -R(5, 4)
en_mdx(r"H(x;y)=\begin{vmatrix}12x^2-2&0\\0&12y^2-2\end{vmatrix}=(12x^2-2)(12y^2-2)", r"H=4\cdot4=16>0", r"1 máximo, 4 mínimos y 4 sillas".replace("1 máximo, 4 mínimos y 4 sillas", "Resumen: 1 máximo, 4 mínimos y 4 sillas"), r"-\frac32")

# --- Ej 5: distancia mínima del origen al plano 2x+3y+6z=49
l = sp.symbols("l")
F = x**2 + y**2 + z**2 - l*(2*x + 3*y + 6*z - 49)
s5 = sp.solve([sp.diff(F, v) for v in (x, y, z, l)], [x, y, z, l], dict=True); assert len(s5) == 1
s5 = s5[0]; assert (s5[x], s5[y], s5[z], s5[l]) == (2, 3, 6, 2)
assert sp.solve(sp.diff(F, x), x) == [l] and sp.solve(sp.diff(F, y), y) == [3*l/2] and sp.solve(sp.diff(F, z), z) == [3*l]
assert sp.expand(2*l + 3*(3*l/2) + 6*(3*l)) == R(49, 2)*l
assert sp.sqrt(4 + 9 + 36) == 7 and sp.sqrt(s5[x]**2 + s5[y]**2 + s5[z]**2) == 7
# comprobación: fórmula de distancia punto-plano y pie de la perpendicular
assert R(49)/sp.sqrt(2**2 + 3**2 + 6**2) == 7 and tuple(R(49, 49)*c_ for c_ in (2, 3, 6)) == (2, 3, 6)
# la distancia crece: cualquier otro punto del plano está más lejos
assert all(a**2 + b**2 + ((49 - 2*a - 3*b)/6)**2 >= 49 for a in range(-20, 21) for b in range(-20, 21))
en_mdx(r"2\lambda+\frac{9\lambda}{2}+18\lambda=49", r"\lambda=2", r"x=2\qquad y=3\qquad z=6", r"d=\sqrt{2^2+3^2+6^2}=\sqrt{4+9+36}=\sqrt{49}=7", r"\frac{49}{\sqrt{49}}=7")

print("OK check_p1-1h9-2023-07-rec")
