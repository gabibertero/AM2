"""Recalcula con sympy el 1º parcial 1H9 May-23 (13/05/2023): resultados e intermedios, y que el MDX diga lo mismo.
Uso: python3 tests/check_p1-1h9-2023-05.py"""
from pathlib import Path
import numpy as np
import sympy as sp

M = (Path(__file__).resolve().parents[1] / "src/content/parciales/p1-1h9-2023-05.mdx").read_text()


def en_mdx(*ss):
    for s in ss:
        assert s in M, f"falta en el MDX: {s}"


R = sp.Rational
x, y, z, t = sp.symbols("x y z t", real=True)
r3 = sp.sqrt(3)

# --- Ej 1: z = ln(x²+y²−1)/√(9−x²−y²)  →  1 < x²+y² < 9
def ok(px, py):
    a, b = R(px), R(py)
    return (a**2 + b**2 - 1 > 0) and (9 - a**2 - b**2 > 0)
assert [ok(*p) for p in [(0, 0), (2, 0), (0, 2), (1, 0), (3, 0), (3, 1)]] == [False, True, True, False, False, False]
X, Y = np.meshgrid(np.linspace(-4, 4, 1201) + 1e-7*np.pi, np.linspace(-4, 4, 1201) + 1e-7*np.e)
with np.errstate(all="ignore"):
    fin = np.isfinite(np.log(X**2 + Y**2 - 1)/np.sqrt(9 - X**2 - Y**2))
assert (fin == ((X**2 + Y**2 > 1) & (X**2 + Y**2 < 9))).all()
assert sp.solve(sp.Eq(x**2 - 1, 0), x) == [-1, 1] and sp.log(R(3)).is_positive and sp.sqrt(5) > 0
en_mdx(r"x^2+y^2-1>0\ \Rightarrow\ x^2+y^2>1", r"9-x^2-y^2>0\ \Rightarrow\ x^2+y^2<9", r"1<x^2+y^2<9", r"\dfrac{\ln3}{\sqrt5}")

# --- Ej 2: cono R=1, H=2, 1%
Rr, H = sp.symbols("R H", positive=True)
V = sp.pi*Rr**2*H/3; pt = {Rr: 1, H: 2}
VR, VH = sp.diff(V, Rr).subs(pt), sp.diff(V, H).subs(pt); assert (VR, VH) == (4*sp.pi/3, sp.pi/3)
dR, dH = R(1, 100)*1, R(1, 100)*2; assert (dR, dH) == (R(1, 100), R(2, 100))
dV = VR*dR + VH*dH; assert dV == R(2, 100)*sp.pi and abs(float(dV) - 0.0628319) < 1e-6
assert VR*dR == R(4, 300)*sp.pi and VH*dH == R(2, 300)*sp.pi and R(4, 300) + R(2, 300) == R(6, 300)
Vol = V.subs(pt); assert Vol == 2*sp.pi/3 and dV/Vol*100 == 3
# comprobación: diferencial logarítmico y variación real
assert 2*R(1, 100) + R(1, 100) == R(3, 100)
DV = V.subs({Rr: R(101, 100), H: R(202, 100)}) - Vol; assert DV == R(60602, 3*10**6)*sp.pi and abs(float(DV/sp.pi) - 0.0202) < 1e-4 and abs(float(DV - dV)) < 1e-3
assert abs(float(dV)*1e6 - 0.02*np.pi*1e6) < 1e-6 and sp.Rational(2, 100)*10**6 == 20000        # 0,02π m³ = 20 000 π cm³ (errata de la oficial)
en_mdx(r"dV=0{,}02\,\pi\ \text{m}^3", r"E\%=3\%", r"\frac{4\pi}{3}\cdot0{,}01", r"\frac{\pi}{3}\cdot0{,}060602\approx0{,}0202\,\pi", r"2\,\frac{dR}{R}+\frac{dH}{H}")

# --- Ej 3: z = x³ + 3x/y + 4y², P(1,−1), α=π/3
f3 = x**3 + 3*x/y + 4*y**2
fx, fy = sp.diff(f3, x), sp.diff(f3, y)
assert sp.simplify(fx - (3*x**2 + 3/y)) == 0 and sp.simplify(fy - (-3*x/y**2 + 8*y)) == 0
P = {x: 1, y: -1}; gx, gy = fx.subs(P), fy.subs(P); assert (gx, gy) == (0, -11)
al = sp.pi/3; u = (sp.cos(al), sp.sin(al)); assert u == (R(1, 2), r3/2)
DD = sp.simplify(gx*u[0] + gy*u[1]); assert DD == -11*r3/2 and abs(float(DD) + 9.5263) < 1e-3
mod = sp.sqrt(gx**2 + gy**2); assert mod == 11
assert sp.atan2(gy, gx) == -sp.pi/2 and (sp.atan2(gy, gx) % (2*sp.pi)) == 3*sp.pi/2
# comprobación 1: derivada de g(t) = f(P + t s°) en t=0
g = f3.subs({x: 1 + t*u[0], y: -1 + t*u[1]}); assert sp.simplify(sp.diff(g, t).subs(t, 0) - DD) == 0
# comprobación 2: dirección nula (1,0) ⟂ ∇z
assert gx*1 + gy*0 == 0
_c = lambda v: float((f3.subs({x: 1 + 1e-6*v[0], y: -1 + 1e-6*v[1]}) - f3.subs({x: 1, y: -1}))/1e-6)   # comprobación: cociente incremental
assert abs(_c((.5, 3**.5/2)) + 11*3**.5/2) < 1e-3 and abs(_c((0, -1)) - 11) < 1e-3 and abs(_c((1, 0))) < 1e-3
en_mdx(r"\approx-9{,}5263", r"da $11=\|\nabla z\|$")
en_mdx(r"z'_x(P)=3\cdot1^2+\frac{3}{-1}=3-3=0", r"-\frac{3\cdot1}{(-1)^2}+8\cdot(-1)=-3-8=-11", r"-\frac{11\sqrt3}{2}", r"\nabla z(P)=0\,i-11\,j=-11\,j", r"\theta=270^\circ")

# --- Ej 4: z = x²/2 + xy + y³/3
f4 = x**2/2 + x*y + y**3/3
sol = sp.solve([sp.diff(f4, x), sp.diff(f4, y)], [x, y], dict=True)
assert {(s[x], s[y]) for s in sol} == {(0, 0), (-1, 1)}
Hh = sp.simplify(sp.diff(f4, x, 2)*sp.diff(f4, y, 2) - sp.diff(f4, x, y)**2); assert sp.simplify(Hh - (2*y - 1)) == 0
assert Hh.subs({y: 0}) == -1 and Hh.subs({y: 1}) == 1 and sp.diff(f4, x, 2) == 1
assert f4.subs({x: -1, y: 1}) == -R(1, 6)
# comprobación: silla en (0,0) (signos opuestos) y mínimo en (−1,1) por desarrollo con h, k
assert f4.subs({y: 0}) == x**2/2 and sp.expand(f4.subs(y, -x) + x**2/2 + x**3/3) == 0
h, k = sp.symbols("h k")
dev = sp.expand(f4.subs({x: -1 + h, y: 1 + k}) + R(1, 6)); assert sp.expand(dev - (h**2/2 + h*k + k**2 + k**3/3)) == 0
assert sp.expand(h**2/2 + h*k + k**2 - ((h + k)**2/2 + k**2/2)) == 0
en_mdx(r"H(x;y)=\begin{vmatrix}1&1\\1&2y\end{vmatrix}=1\cdot2y-1\cdot1=2y-1", r"y\,(y-1)=0", r"P_2(-1;1)", r"z(-1;1)=\frac12-1+\frac13=-\frac16")

print("OK check_p1-1h9-2023-05")
