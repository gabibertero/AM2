"""Recalcula con sympy el recuperatorio 1H9 (resultados e intermedios) y comprueba que el MDX diga lo mismo.
Uso: python3 tests/check_recup-1h9.py"""
from pathlib import Path
import sympy as sp

MDX = (Path(__file__).resolve().parents[1] / "src/content/parciales/recup-1h9-2025-07-05.mdx").read_text()
def en_mdx(*ss):
    for s in ss: assert s in MDX, f"falta en el MDX: {s}"
R = sp.Rational
x, y, z, r, th = sp.symbols("x y z r theta", real=True)
I = sp.integrate

# --- Ej 1 ---
assert sp.solve(sp.Eq(r**2, 2), r) == [-sp.sqrt(2), sp.sqrt(2)]
pr = I(2*r - r**3, (r, 0, sp.sqrt(2))); assert pr == 1 and sp.sqrt(2)**2 - sp.sqrt(2)**4/4 == 1
V = pr*2*sp.pi; assert V == 2*sp.pi
assert I(I(I(r, (z, r**2, 2)), (r, 0, sp.sqrt(2))), (th, 0, 2*sp.pi)) == V
assert I(sp.pi*z, (z, 0, 2)) == V                                           # rebanadas: círculo de área πz
assert 2*sp.pi*sp.sqrt(2)**2*0 + sp.pi*2*2 - I(2*sp.pi*r*r**2, (r, 0, sp.sqrt(2))) == V   # cilindro − bajo el paraboloide
assert abs(float(V) - 6.28) < .01
en_mdx(r"\Big[r^2-\frac{r^4}{4}\Big]_0^{\sqrt2}=2-1=1", r"V=2\pi\ \text{u}^3", r"4\pi-2\pi=2\pi", r"\int_0^2\pi z\,dz=\pi\Big[\frac{z^2}{2}\Big]_0^2=2\pi")

# --- Ej 2 ---
P, Q = x**2 - y, x**2 + y
assert sp.factor(x**2 + x - 6) == (x + 3)*(x - 2) and sp.solve(x - 2 + x**2 - 4, x) == [-3, 2]
assert (-3 - 2, 2 - 2) == (-5, 0)
f1 = sp.expand(P.subs(y, x - 2) + Q.subs(y, x - 2)*1); assert f1 == 2*x**2
IC1 = I(f1, (x, -3, 2)); assert IC1 == R(70, 3) and R(2, 3)*(8 + 27) == R(70, 3)
assert sp.expand(P.subs(y, 4 - x**2) - (2*x**2 - 4)) == 0 and sp.expand(Q.subs(y, 4 - x**2)) == 4
f2 = sp.expand(P.subs(y, 4 - x**2) + Q.subs(y, 4 - x**2)*(-2*x)); assert f2 == 2*x**2 - 8*x - 4
F2 = sp.integrate(f2, x)
IC2 = I(f2, (x, 2, -3)); assert IC2 == -R(70, 3) and I(f2, (x, -3, 2)) == R(70, 3)
assert F2.subs(x, -3) - F2.subs(x, 2) == -R(70, 3)
assert (F2.subs(x, 2), F2.subs(x, -3)) == (-R(56, 3), -42) and -R(56, 3) + 42 == R(70, 3)
assert IC1 + IC2 == 0
# Green: ∬ (2x+1) dA = 0
assert sp.diff(Q, x) - sp.diff(P, y) == 2*x + 1
assert sp.expand((2*x + 1)*(4 - x**2 - (x - 2))) == -2*x**3 - 3*x**2 + 11*x + 6
G = I(I(2*x + 1, (y, x - 2, 4 - x**2)), (x, -3, 2)); assert G == 0
w = sp.symbols("w"); assert I((6 - w), (w, 6, 6)) == 0 and sp.expand((2*x + 1)*(6 - x - x**2)) == sp.expand((2*x + 1)*(6 - (x**2 + x)))
assert I(1, (y, x - 2, 4 - x**2), (x, -3, 2)) == R(125, 6)
en_mdx(r"(x+3)(x-2)=0", r"\frac23\big(8+27\big)=\frac{70}{3}", r"2x^2-8x-4", r"IC=\frac{70}{3}-\frac{70}{3}=0")

# --- Ej 3 ---
yy = sp.Function("y")
z_ = (R(1, 2) + sp.symbols("C")*sp.exp(-8*x))   # z = y^4
assert sp.simplify(sp.diff(z_, x) + 8*z_ - 4) == 0
uu, vv = sp.exp(8*x)/2 + sp.symbols("C"), sp.exp(-8*x)
assert sp.simplify(vv.diff(x) + 8*vv) == 0 and sp.simplify(sp.diff(uu, x)*vv - 4) == 0 and sp.simplify(uu*vv - z_) == 0
assert sp.integrate(4*sp.exp(8*x), x) == sp.exp(8*x)/2
# comprobación: sustituir y = z^(1/4) en y' + 2y = y^-3
C = sp.symbols("C", positive=True); xp = sp.symbols("x", positive=True)
yv = (R(1, 2) + C*sp.exp(-8*xp))**R(1, 4)
assert sp.simplify(sp.diff(yv, xp) + 2*yv - yv**-3) == 0
assert sp.simplify(sp.diff(yv**4, xp)/4*yv**-3*4 - 4*yv**3*sp.diff(yv, xp)*yv**-3) == 0
fy = sp.Function("f"); ds = sp.dsolve(sp.Eq(fy(x).diff(x) + 2*fy(x), fy(x)**-3))
assert any(sp.simplify(sp.diff(s.rhs**4, x) + 8*s.rhs**4 - 4) == 0 for s in ds)   # dsolve independiente (z = y⁴ cumple z'+8z=4)
en_mdx(r"y^3y'+2y^4=1", r"z'+8z=4", r"v=e^{-8x}", r"=\frac12e^{8x}+C", r"y^4=\frac12+Ce^{-8x}")
print("OK: recup 1H9 verificado (ej1 2π, ej2 0, ej3 y⁴=1/2+Ce^{-8x})")
