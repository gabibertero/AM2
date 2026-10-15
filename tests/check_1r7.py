"""Recalcula con sympy el 1R7 (resultados e intermedios) y comprueba que el MDX diga lo mismo.
Uso: python3 tests/check_1r7.py"""
from pathlib import Path
import sympy as sp

MDX = (Path(__file__).resolve().parents[1] / "src/content/parciales/1r7-2025-11-11.mdx").read_text()
def en_mdx(*ss):
    for s in ss: assert s in MDX, f"falta en el MDX: {s}"
R = sp.Rational
x, y, z, r, th, u = sp.symbols("x y z r theta u", real=True)
I = sp.integrate

# --- Ej 1: V = ∬(6 - r² - r) r dr dθ ---
assert sp.solve(sp.Eq(r, 6 - r**2), r) == [-3, 2] and sp.factor(r**2 + r - 6) == (r + 3)*(r - 2)
assert 2 == 6 - 2**2
pr = I(6*r - r**3 - r**2, (r, 0, 2))
assert pr == R(16, 3) and 3*4 - R(16, 4) - R(8, 3) == R(16, 3) and 12 - 4 == 8
V = pr*2*sp.pi
V3 = I(I(I(r, (z, r, 6 - r**2)), (r, 0, 2)), (th, 0, 2*sp.pi))
assert sp.simplify(V - 32*sp.pi/3) == 0 and sp.simplify(V3 - V) == 0
# comprobación: rebanadas en z (área de la sección horizontal)
S1 = I(sp.pi*z**2, (z, 0, 2)); S2 = I(sp.pi*(6 - z), (z, 2, 6))
assert S1 == 8*sp.pi/3 and S2 == 8*sp.pi and sp.simplify(S1 + S2 - V) == 0
assert abs(float(V) - 33.5) < .05
en_mdx(r"3r^2-\frac{r^4}{4}-\frac{r^3}{3}", r"12-4-\frac83=\frac{16}{3}", r"V=\frac{16}{3}\cdot2\pi=\frac{32\pi}{3}",
       r"\frac{32\pi}{3}\ \text{u}^3\approx 33{,}5", r"\frac{8\pi}{3}+8\pi=\frac{32\pi}{3}")

# --- Ej 2: IT = ∫∫∫ r²(cosθ+senθ) dz dr dθ ---
assert sp.expand((2 + r**2*sp.sin(th)**2) - (1 - r**2*sp.cos(th)**2)) - sp.expand(1 + r**2*(sp.sin(th)**2 + sp.cos(th)**2)) == 0
assert sp.simplify((2 + r**2*sp.sin(th)**2) - (1 - r**2*sp.cos(th)**2) - (1 + r**2)) == 0
ir = I(r**2*(1 + r**2), (r, 0, 1)); assert ir == R(8, 15) and R(1, 3) + R(1, 5) == R(8, 15)
it = I(sp.cos(th) + sp.sin(th), (th, 0, sp.pi/2)); assert it == 2
IT = ir*it; assert IT == R(16, 15)
IT3 = I(I(I(r*(r*sp.cos(th) + r*sp.sin(th)), (z, 1 - r**2*sp.cos(th)**2, 2 + r**2*sp.sin(th)**2)), (r, 0, 1)), (th, 0, sp.pi/2))
assert sp.simplify(IT3 - IT) == 0
# comprobación: cartesianas, por simetría x↔y; ∬ x(1+x²+y²) dA en el cuarto de disco
inner = I(1 + x**2 + y**2, (y, 0, sp.sqrt(1 - x**2)))
assert sp.simplify(inner - ((1 + x**2)*sp.sqrt(1 - x**2) + (1 - x**2)**R(3, 2)/3)) == 0
j1 = I(x*(1 + x**2)*sp.sqrt(1 - x**2), (x, 0, 1)); j2 = I(x*(1 - x**2)**R(3, 2)/3, (x, 0, 1))
assert j1 == R(7, 15) and j2 == R(1, 15) and j1 + j2 == R(8, 15)
assert I(sp.Rational(1, 2)*(2 - u)*sp.sqrt(u), (u, 0, 1)) == R(7, 15) and I(u**R(3, 2)/6, (u, 0, 1)) == R(1, 15)
assert 2*(j1 + j2) == IT
Ic = I(I(x*(1 + x**2 + y**2) + y*(1 + x**2 + y**2), (y, 0, sp.sqrt(1 - x**2))), (x, 0, 1))
assert sp.simplify(Ic - IT) == 0
en_mdx(r"\frac13+\frac15=\frac{8}{15}", r"IT=\frac{8}{15}\cdot2=\frac{16}{15}", r"\tfrac12\Big(\tfrac43-\tfrac25\Big)=\tfrac{7}{15}", r"\tfrac16\cdot\tfrac25=\tfrac1{15}")

# --- Ej 3 ---
P, Q = 2*x - y, 2*x + y
f1 = sp.expand(P.subs(y, x**2 - 1) + Q.subs(y, x**2 - 1)*sp.diff(x**2 - 1, x))
assert f1 == 2*x**3 + 3*x**2 + 1
F1 = I(f1, x); assert (F1.subs(x, 1), F1.subs(x, -1)) == (R(5, 2), -R(3, 2))
IC1 = I(f1, (x, -1, 1)); assert IC1 == 4
f2 = sp.expand(P.subs(y, 1 - x**2) + Q.subs(y, 1 - x**2)*sp.diff(1 - x**2, x))
assert f2 == 2*x**3 - 3*x**2 - 1
assert sp.expand(P.subs(y, 1 - x**2) - (2*x + x**2 - 1)) == 0
IC2 = I(f2, (x, 1, -1)); assert IC2 == 4 and I(-f2, (x, -1, 1)) == 4 and IC1 + IC2 == 8
assert sp.diff(Q, x) - sp.diff(P, y) == 3
A = I(1 - x**2 - (x**2 - 1), (x, -1, 1)); assert A == R(8, 3)
G = 3*I(I(1, (y, x**2 - 1, 1 - x**2)), (x, -1, 1)); assert G == 8 == 3*A
# comprobación: ∮(2x dx + y dy)=0 (exacta) + ∮(-y dx + 2x dy)
ex = I((2*x + (x**2 - 1)*2*x), (x, -1, 1)) + I((2*x + (1 - x**2)*(-2*x)), (x, 1, -1))
assert ex == 0
a1 = I(-(x**2 - 1), (x, -1, 1)) + I(-(1 - x**2), (x, 1, -1)); assert a1 == R(8, 3)
a2 = I(2*x*2*x, (x, -1, 1)) + I(2*x*(-2*x), (x, 1, -1)); assert a2 == R(16, 3)
assert a1 + a2 == 8
en_mdx(r"2x^3+3x^2+1", r"2x^3-3x^2-1", r"\Big(\tfrac12+1+1\Big)-\Big(\tfrac12-1-1\Big)=4", r"3\cdot\frac83=8", r"dr=8\qquad")

# --- Ej 4 ---
P4, Q4 = sp.exp(x) + sp.log(y) + y/x, x/y + sp.log(x) + sp.cos(y)
assert sp.simplify(sp.diff(P4, y) - (1/y + 1/x)) == 0 and sp.simplify(sp.diff(Q4, x) - (1/y + 1/x)) == 0
xp, yp = sp.symbols("x y", positive=True)
P4p, Q4p = P4.subs({x: xp, y: yp}), Q4.subs({x: xp, y: yp})
base = I(P4p, xp); assert sp.simplify(base - (sp.exp(xp) + xp*sp.log(yp) + yp*sp.log(xp))) == 0
phi = I(sp.simplify(Q4p - sp.diff(base, yp)), yp); assert sp.simplify(phi - sp.sin(yp)) == 0
u4 = sp.exp(xp) + xp*sp.log(yp) + yp*sp.log(xp) + sp.sin(yp)
assert sp.simplify(sp.diff(u4, xp) - P4p) == 0 and sp.simplify(sp.diff(u4, yp) - Q4p) == 0
yf = sp.Function("yy"); dd = sp.diff(u4.subs(yp, yf(xp)), xp)
assert sp.simplify(dd - (P4p.subs(yp, yf(xp)) + Q4p.subs(yp, yf(xp))*sp.diff(yf(xp), xp))) == 0
en_mdx(r"\frac1y+\frac1x", r"\varphi'(y)=\cos y\ \Rightarrow\ \varphi(y)=\sin y", r"e^x+x\ln y+y\ln x+\sin y=C")

# --- Ej 5 ---
A_, B_, D_, C1, C2 = sp.symbols("A B D C1 C2")
assert sp.solve(r**2 + r, r) == [-1, 0]
yp5 = A_*sp.sin(x) + B_*sp.cos(x) + D_*x
assert sp.simplify(sp.diff(yp5, x) - (A_*sp.cos(x) - B_*sp.sin(x) + D_)) == 0
assert sp.simplify(sp.diff(yp5, x, 2) - (-A_*sp.sin(x) - B_*sp.cos(x))) == 0
lhs = sp.expand(sp.diff(yp5, x, 2) + sp.diff(yp5, x))
assert sp.simplify(lhs - ((A_ - B_)*sp.cos(x) + (-A_ - B_)*sp.sin(x) + D_)) == 0
rhs = 2*sp.cos(x) + 1
sol = sp.solve([A_ - B_ - 2, -A_ - B_, D_ - 1], [A_, B_, D_]); assert sol == {A_: 1, B_: -1, D_: 1}
ypv = yp5.subs(sol)
assert sp.simplify(sp.diff(ypv, x) - (sp.cos(x) + sp.sin(x) + 1)) == 0 and sp.simplify(sp.diff(ypv, x, 2) - (-sp.sin(x) + sp.cos(x))) == 0
assert sp.simplify(sp.diff(ypv, x, 2) + sp.diff(ypv, x) - rhs) == 0
# sin D·x no alcanza (resonancia): el término constante queda en -1 ≠ 0
assert sp.expand(lhs.subs(D_, 0) - rhs).subs({sp.cos(x): 0, sp.sin(x): 0}) == -1
yh = C1 + C2*sp.exp(-x); assert sp.simplify(sp.diff(yh, x, 2) + sp.diff(yh, x)) == 0
yg = yh + ypv
f = sp.Function("f"); dsol = sp.dsolve(sp.Eq(f(x).diff(x, 2) + f(x).diff(x), rhs)).rhs
assert sp.simplify(sp.diff(dsol, x, 2) + sp.diff(dsol, x) - rhs) == 0 and sp.simplify(sp.diff(yg, x, 2) + sp.diff(yg, x) - rhs) == 0
en_mdx(r"y_p=A\sin x+B\cos x+Dx", r"A-B=2", r"A+B=0", r"y=C_1+C_2e^{-x}+\sin x-\cos x+x")
print("OK: 1R7 verificado (ej1 32π/3, ej2 16/15, ej3 8, ej4 exacta, ej5 EDO)")
