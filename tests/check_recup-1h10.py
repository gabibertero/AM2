"""Recalcula con sympy el Recuperatorio 1H10 (8/11/2025): resultados e intermedios, y que el MDX diga lo mismo.
Uso: python3 tests/check_recup-1h10.py"""
from pathlib import Path
import sympy as sp

MDX = (Path(__file__).resolve().parents[1] / "src/content/parciales/recup-1h10-2025-11-08.mdx").read_text()
def en_mdx(*ss):
    for s in ss: assert s in MDX, f"falta en el MDX: {s}"
R = sp.Rational
x, y, z, r, th, t = sp.symbols("x y z r theta t", real=True)
I = sp.integrate

# --- Ej 1: V entre cono z=r y z=3 ---
assert I((3 - r)*r, (r, 0, 3)) == R(9, 2) and I(3*r - r**2, r) == 3*r**2/2 - r**3/3
assert R(3, 2)*9 - R(27, 3) == R(9, 2)
V1 = 2*sp.pi*R(9, 2); assert V1 == 9*sp.pi
# comprobación: cilindro r<=3 de altura 3 menos cono (1/3 π R² h) ; y rebanadas: ∫0^3 π z² dz
assert sp.pi*9*3 - R(1, 3)*sp.pi*9*3 == 18*sp.pi            # cilindro - cono = parte exterior (18π)
assert R(1, 3)*sp.pi*9*3 == 9*sp.pi == I(sp.pi*z**2, (z, 0, 3))
en_mdx(r"\Big[\frac{3r^2}{2}-\frac{r^3}{3}\Big]_0^3", r"V=9\pi", r"\frac{27}{2}-9=\frac92", r"\int_0^3\pi z^2\,dz=\Big[\frac{\pi z^3}{3}\Big]_0^3=9\pi")
assert R(3, 2)*9 == R(27, 2) and R(27, 2) - 9 == R(9, 2)

# --- Ej 2: IT = ∭ z r  (r dz dr dθ), r^2 <= z <= 4.  OJO: el profe da 64π/21 (error de cuenta); el valor correcto es 512π/21 ---
assert I(z, (z, r**2, 4)) == 8 - r**4/2
assert sp.expand(r**2*(8 - r**4/2)) == 8*r**2 - r**6/2
inner = I(8*r**2 - r**6/2, (r, 0, 2)); assert inner == R(256, 21)
assert I(8*r**2, (r, 0, 2)) == R(64, 3) and I(r**6/2, (r, 0, 2)) == R(64, 7) and R(64, 3) - R(64, 7) == R(256, 21)
IT = 2*sp.pi*R(256, 21); assert IT == R(512, 21)*sp.pi
full = I(I(I(z*r*r, (z, r**2, 4)), (r, 0, 2)), (th, 0, 2*sp.pi)); assert full == IT
# comprobación: orden dz último: r de 0 a √z, z de 0 a 4
alt = 2*sp.pi*I(I(z*r**2, (r, 0, sp.sqrt(z))), (z, 0, 4)); assert sp.simplify(alt - IT) == 0
assert I(z**R(5, 2)/3, (z, 0, 4)) == R(256, 21)
# el valor del profe sale de ½(8r²−r⁶) en vez de ½(16r²−r⁶)
assert 2*sp.pi*R(1, 2)*(R(64, 3) - R(128, 7)) == R(64, 21)*sp.pi != IT
en_mdx(r"\frac{16}{2}-\frac{r^4}{2}", r"\frac{448-192}{21}=\frac{256}{21}", r"IT=\frac{512\pi}{21}",
       r"\int_0^4\frac{z^{5/2}}{3}\,dz=\frac13\cdot\frac27\,z^{7/2}\Big|_0^4=\frac{2}{21}\cdot128=\frac{256}{21}")

# --- Ej 3: IC por definición y Green ---
P, Q = x - y, x + y
c1, c2 = x**2 - x, -2*x**2 + 2*x
assert sp.solve(sp.Eq(c1, c2), x) == [0, 1] and c1.subs(x, 0) == c2.subs(x, 0) == 0 and c1.subs(x, 1) == c2.subs(x, 1) == 0
g1 = sp.expand(P.subs(y, c1) + Q.subs(y, c1)*sp.diff(c1, x))
assert sp.expand(g1 - (2*x**3 - 2*x**2 + 2*x)) == 0
IC1 = I(g1, (x, 0, 1)); assert IC1 == R(5, 6)
assert sp.expand((x - c1) - (2*x - x**2)) == 0
g2 = sp.expand(P.subs(y, c2) + Q.subs(y, c2)*sp.diff(c2, x))
assert sp.expand(g2 - (8*x**3 - 14*x**2 + 5*x)) == 0
IC2 = I(g2, (x, 1, 0)); assert IC2 == R(1, 6) and I(g2, (x, 0, 1)) == -R(1, 6)
assert IC1 + IC2 == 1
# Green
assert sp.diff(Q, x) - sp.diff(P, y) == 2
Ar = I(c2 - c1, (x, 0, 1)); assert Ar == R(1, 2) and sp.expand(c2 - c1) == -3*x**2 + 3*x
assert 2*Ar == 1
gr = I(I(2, (y, c1, c2)), (x, 0, 1)); assert gr == 1
# comprobación: P dx+Q dy = d(x²/2+y²/2) + (-y dx + x dy); la parte exacta circula 0 y ∮ x dy = Área
ex = I(x*1 + c1*sp.diff(c1, x), (x, 0, 1)) + I(x + c2*sp.diff(c2, x), (x, 1, 0)); assert ex == 0
xdy = I(x*sp.diff(c1, x), (x, 0, 1)) + I(x*sp.diff(c2, x), (x, 1, 0)); assert xdy == Ar
assert I(x*sp.diff(c1, x), (x, 0, 1)) == R(1, 6) and I(x*sp.diff(c2, x), (x, 1, 0)) == R(1, 3)
rot = I(-c1 + x*sp.diff(c1, x), (x, 0, 1)) + I(-c2 + x*sp.diff(c2, x), (x, 1, 0)); assert rot == 1
en_mdx(r"2x^3-2x^2+2x", r"IC_1=\frac56", r"8x^3-14x^2+5x", r"IC_2=\frac16", r"IC=\frac56+\frac16=1", r"2\iint_D dx\,dy=2\cdot\frac12=1", r"-3x^2+3x")

# --- Ej 4: exacta ---
P4, Q4 = x**2 + y**2 - sp.cos(x), 2*x*y + sp.sin(y)
assert sp.diff(P4, y) == 2*y == sp.diff(Q4, x)
u4 = I(P4, x) + sp.Function("f")(y)
assert I(P4, x) == x**3/3 + x*y**2 - sp.sin(x)
assert sp.diff(x**3/3 + x*y**2 - sp.sin(x), y) == 2*x*y and I(sp.sin(y), y) == -sp.cos(y)
U = x**3/3 + x*y**2 - sp.sin(x) - sp.cos(y)
assert sp.simplify(sp.diff(U, x) - P4) == 0 and sp.simplify(sp.diff(U, y) - Q4) == 0
# comprobación: partiendo de integrar Q en y
assert I(Q4, y) == x*y**2 - sp.cos(y)
assert sp.simplify(P4 - sp.diff(x*y**2 - sp.cos(y), x)) == x**2 - sp.cos(x) and I(x**2 - sp.cos(x), x) == x**3/3 - sp.sin(x)
en_mdx(r"\frac{\partial P}{\partial y}=2y=\frac{\partial Q}{\partial x}", r"=\frac{x^3}{3}+xy^2-\sin x+\varphi(y)", r"\varphi'(y)=\sin y",
       r"\int\sin y\,dy=-\cos y", r"\frac{x^3}{3}+xy^2-\sin x-\cos y=C")

# --- Ej 5 ---
Af, C1, C2 = sp.symbols("A C1 C2")
L = lambda f: sp.diff(f, x, 2) - 2*sp.diff(f, x) + f
assert sp.factor(r**2 - 2*r + 1) == (r - 1)**2
assert sp.simplify(L(C1*sp.exp(x) + C2*x*sp.exp(x))) == 0
assert sp.simplify(L(Af*x**2*sp.exp(x)) - 2*Af*sp.exp(x)) == 0
assert sp.solve(2*Af - 2, Af) == [1]
assert sp.simplify(L(x**2*sp.exp(x)) - 2*sp.exp(x)) == 0
d = sp.dsolve(sp.Eq(sp.Function("f")(x).diff(x, 2) - 2*sp.Function("f")(x).diff(x) + sp.Function("f")(x), 2*sp.exp(x))).rhs
assert sp.simplify(L(d) - 2*sp.exp(x)) == 0
# variación de parámetros: yp = -y1∫y2 f/W + y2∫y1 f/W, W = e^{2x}
y1, y2 = sp.exp(x), x*sp.exp(x); W = sp.simplify(y1*sp.diff(y2, x) - y2*sp.diff(y1, x)); assert sp.simplify(W - sp.exp(2*x)) == 0
yv = sp.simplify(-y1*I(sp.simplify(y2*2*sp.exp(x)/W), x) + y2*I(sp.simplify(y1*2*sp.exp(x)/W), x)); assert sp.simplify(yv - x**2*sp.exp(x)) == 0
en_mdx(r"y_p=x^2e^x", r"y=C_1e^x+C_2xe^x+x^2e^x", r"2A=2\ \Rightarrow\ A=1", r"(r-1)^2=0")
print("OK: recup 1H10 verificado (ej1 9π, ej2 512π/21 (el profe da 64π/21: error de cuenta), ej3 IC=1 (5/6+1/6; Green 1), ej4 x³/3+xy²−senx−cosy=C, ej5 yp=x²eˣ)")
