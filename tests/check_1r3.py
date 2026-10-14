"""Recalcula con sympy el 1R3 (resultados e intermedios) y comprueba que el MDX diga lo mismo.
Uso: python3 tests/check_1r3.py"""
from pathlib import Path
import sympy as sp

MDX = (Path(__file__).resolve().parents[1] / "src/content/parciales/1r3-2025-11-14.mdx").read_text()
def en_mdx(*ss):
    for s in ss: assert s in MDX, f"falta en el MDX: {s}"
R = sp.Rational
x, y, z, r, th, t = sp.symbols("x y z r theta t", real=True)
I = sp.integrate

# --- Ej 1: V = ∬(y+4-√(4-r²)) r dr dθ ---
sq = r*sp.sqrt(4 - r**2)
a, b, c = I(r**2*sp.sin(th), (r, 0, 2)), I(4*r, (r, 0, 2)), I(sq, (r, 0, 2))
assert sp.simplify(a - R(8, 3)*sp.sin(th)) == 0 and b == 8 and c == R(8, 3)
inner = sp.simplify(a + b - c)
assert sp.simplify(inner - (R(8, 3)*sp.sin(th) + R(16, 3))) == 0
assert I(sp.sin(th), (th, 0, 2*sp.pi)) == 0
V = I(inner, (th, 0, 2*sp.pi))
V3 = I(I(I(r, (z, sp.sqrt(4 - r**2), r*sp.sin(th) + 4)), (r, 0, 2)), (th, 0, 2*sp.pi))
assert sp.simplify(V - 32*sp.pi/3) == 0 and sp.simplify(V3 - V) == 0
assert sp.simplify(16*sp.pi - R(1, 2)*R(4, 3)*sp.pi*8 - V) == 0           # comprobación: cilindro − semiesfera
assert I(4, (y, -sp.sqrt(4 - x**2), sp.sqrt(4 - x**2)), (x, -2, 2)) == 16*sp.pi
assert abs(float(V) - 33.5) < .05
en_mdx(r"\frac{8}{3}\sin\theta+8-\frac83=\frac{8}{3}\sin\theta+\frac{16}{3}", r"16\pi-\tfrac{16\pi}{3}=\tfrac{32\pi}{3}",
       r"\frac{32\pi}{3}\ \text{u}^3\approx 33{,}5", r"\tfrac12\cdot\tfrac23\cdot4^{3/2}=\dfrac83")

# --- Ej 2: IT = ∫∫∫ r² dz dr dθ ---
assert sp.solve(sp.Eq(r**2 - 3, 5 - r**2), r) == [-2, 2]
assert sp.expand((5 - r**2) - (r**2 - 3)) == 8 - 2*r**2
pr = I(8*r**2 - 2*r**4, (r, 0, 2))
assert pr == R(128, 15) and R(64, 3) - R(64, 5) == R(128, 15) and R(320 - 192, 15) == R(128, 15)
IT = pr*2*sp.pi
assert sp.simplify(IT - 256*sp.pi/15) == 0 and abs(float(IT) - 53.6) < .05
# otro orden (r primero con z fijo)
J1 = I(I(r**2, (r, 0, sp.sqrt(z + 3))), (z, -3, 1)); J2 = I(I(r**2, (r, 0, sp.sqrt(5 - z))), (z, 1, 5))
assert J1 == R(64, 15) and J2 == R(64, 15) and sp.simplify(2*sp.pi*(J1 + J2) - IT) == 0
en_mdx(r"\frac{320-192}{15}=\frac{128}{15}", r"\frac{256\pi}{15}\approx 53{,}6", r"\frac{64}{15}+\frac{64}{15}")

# --- Ej 3 ---
P, Q = x - y**2, x*y
assert sp.factor(y**2 + y - 2) == (y + 2)*(y - 1) and sp.diff(Q, x) - sp.diff(P, y) == 3*y
xs, ys = t, sp.sqrt(2 - t**2)
f1 = sp.simplify(P.subs({x: xs, y: ys}) + Q.subs({x: xs, y: ys})*sp.diff(ys, t))
assert sp.simplify(f1 - (t - 2)) == 0                                    # P dx + Q dy sobre C1 = (x−2)dx
assert sp.simplify(P.subs({x: xs, y: ys}) - (t - 2 + t**2)) == 0 and sp.simplify(Q.subs({x: xs, y: ys})*sp.diff(ys, t) + t**2) == 0
F1 = sp.integrate(t - 2, t)
assert (F1.subs(t, -1), F1.subs(t, 1)) == (R(5, 2), -R(3, 2))
IC1 = I(f1, (t, 1, -1)); assert IC1 == 4
f2 = sp.expand(P.subs({x: t, y: t**2}) + Q.subs({x: t, y: t**2})*2*t)
assert f2 == t + t**4 and Q.subs({x: t, y: t**2})*2*t == 2*t**4
F2 = sp.integrate(f2, t); assert (F2.subs(t, 1), F2.subs(t, -1)) == (R(7, 10), R(3, 10))
IC2 = I(f2, (t, -1, 1)); assert IC2 == R(2, 5) and IC1 + IC2 == R(22, 5)
# C1 trigonométrica
xt, yt = sp.sqrt(2)*sp.cos(th), sp.sqrt(2)*sp.sin(th)
g = sp.simplify(P.subs({x: xt, y: yt})*sp.diff(xt, th) + Q.subs({x: xt, y: yt})*sp.diff(yt, th))
assert sp.simplify(g - (-sp.sin(2*th) + 2*sp.sqrt(2)*sp.sin(th))) == 0
assert sp.simplify(I(g, (th, sp.pi/4, 3*sp.pi/4)) - 4) == 0
# Green
assert sp.simplify(I(y, (y, x**2, sp.sqrt(2 - x**2))) - (2 - x**2 - x**4)/2) == 0
assert I(2 - x**2 - x**4, (x, -1, 1)) == R(44, 15)
G = 3*I(I(y, (y, x**2, sp.sqrt(2 - x**2))), (x, -1, 1)); assert G == R(22, 5) == R(3, 2)*R(44, 15)
en_mdx(r"\dfrac52-\Big(-\dfrac32\Big)=4", r"\frac{7}{10}-\frac{3}{10}=\frac25", r"-\sin2\theta+2\sqrt2\sin\theta",
       r"\frac32\cdot\frac{44}{15}=\frac{22}{5}", r"(y+2)(y-1)=0")

# --- Ej 4 ---
P4, Q4 = 2*x*sp.cos(2*y) - sp.exp(3*x), 12*y - 2*x**2*sp.sin(2*y)
assert sp.simplify(sp.diff(P4, y) + 4*x*sp.sin(2*y)) == 0 and sp.simplify(sp.diff(Q4, x) + 4*x*sp.sin(2*y)) == 0
assert sp.integrate(P4, x) == x**2*sp.cos(2*y) - sp.exp(3*x)/3
phi = sp.integrate(sp.simplify(Q4 - sp.diff(x**2*sp.cos(2*y) - sp.exp(3*x)/3, y)), y)
assert sp.simplify(phi - 6*y**2) == 0
u = x**2*sp.cos(2*y) - sp.exp(3*x)/3 + 6*y**2
assert sp.simplify(sp.diff(u, x) - P4) == 0 and sp.simplify(sp.diff(u, y) - Q4) == 0
# derivación implícita: u(x,y(x)) = C  =>  P + Q y' = 0
yp_ = sp.Function("yy")
dd = sp.diff(u.subs(y, yp_(x)), x)
assert sp.simplify(dd - (P4.subs(y, yp_(x)) + Q4.subs(y, yp_(x))*sp.diff(yp_(x), x))) == 0
en_mdx(r"-4x\sin(2y)", r"\varphi'(y)=12y\ \Rightarrow\ \varphi(y)=6y^2", r"x^2\cos(2y)-\frac{1}{3}e^{3x}+6y^2=C")

# --- Ej 5 ---
A, B, D, C1, C2 = sp.symbols("A B D C1 C2")
assert sp.solve(r**2 + 2*r, r) == [-2, 0]
yp = A*sp.exp(2*x) + B*sp.sin(2*x) + D*sp.cos(2*x)
assert sp.simplify(sp.diff(yp, x) - (2*A*sp.exp(2*x) + 2*B*sp.cos(2*x) - 2*D*sp.sin(2*x))) == 0
assert sp.simplify(sp.diff(yp, x, 2) - (4*A*sp.exp(2*x) - 4*B*sp.sin(2*x) - 4*D*sp.cos(2*x))) == 0
lhs = sp.expand(sp.diff(yp, x, 2) + 2*sp.diff(yp, x))
assert sp.simplify(lhs - (8*A*sp.exp(2*x) + (4*B - 4*D)*sp.cos(2*x) + (-4*B - 4*D)*sp.sin(2*x))) == 0
rhs = 16*sp.exp(2*x) - 4*sp.cos(2*x)
sol = sp.solve([8*A - 16, 4*B - 4*D + 4, -4*B - 4*D], [A, B, D])
assert sol == {A: 2, B: -R(1, 2), D: R(1, 2)} and sp.solve(-8*D + 4, D) == [R(1, 2)]
ypv = yp.subs(sol)
assert sp.simplify(sp.diff(ypv, x) - (4*sp.exp(2*x) - sp.cos(2*x) - sp.sin(2*x))) == 0
assert sp.simplify(sp.diff(ypv, x, 2) - (8*sp.exp(2*x) + 2*sp.sin(2*x) - 2*sp.cos(2*x))) == 0
assert sp.simplify(sp.diff(ypv, x, 2) + 2*sp.diff(ypv, x) - rhs) == 0
yh = C1 + C2*sp.exp(-2*x)
assert sp.simplify(sp.diff(yh, x, 2) + 2*sp.diff(yh, x)) == 0
yg = yh + ypv
dsol = sp.dsolve(sp.Eq(sp.Function("f")(x).diff(x, 2) + 2*sp.Function("f")(x).diff(x), rhs)).rhs   # dsolve independiente
assert sp.simplify(sp.diff(dsol, x, 2) + 2*sp.diff(dsol, x) - rhs) == 0 and sp.simplify(sp.diff(yg, x, 2) + 2*sp.diff(yg, x) - rhs) == 0   # sustitución en la EDO
en_mdx(r"-8D=-4\Rightarrow D=\tfrac12", r"B=-D=-\tfrac12", r"y_p''+2y_p'=(8+8)e^{2x}+(-2-2)\cos2x+(2-2)\sin2x=16e^{2x}-4\cos2x",
       r"y=C_1+C_2e^{-2x}+2e^{2x}-\frac{1}{2}\sin(2x)+\frac{1}{2}\cos(2x)")
print("OK: 1R3 verificado (ej1 32π/3, ej2 256π/15, ej3 22/5, ej4 exacta, ej5 EDO)")
