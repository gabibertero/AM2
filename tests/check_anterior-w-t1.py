"""Recalcula con sympy el Examen W Tema 1 y comprueba que el MDX diga lo mismo. Uso: python3 tests/check_anterior-w-t1.py"""
from pathlib import Path
import sympy as sp

MDX = (Path(__file__).resolve().parents[1] / "src/content/anteriores/anterior-w-t1.mdx").read_text()
def en_mdx(*ss):
    for s in ss: assert s in MDX, f"falta en el MDX: {s}"
R = sp.Rational
x, y, u, v, C, C1, C2, A, B = sp.symbols("x y u v C C1 C2 A B")
I = sp.integrate
f = sp.Function("f")

# --- Ej 1: recta, intersección, V ---
m = R(3 - (-1), 2 - 0); assert m == 2 and -1 == 2*0 - 1 and 3 == 2*2 - 1          # y = 2x - 1
assert sp.factor(2*x**2 - x - 1) == (2*x + 1)*(x - 1) and sp.solve(2*x - 1 - 1/x, x) == [-R(1, 2), 1]
z1, z2 = -x, x**2*y
assert sp.expand((z2 - z1) - x*(x*y + 1)) == 0
inner = I(z2 - z1, (y, 0, 1/x)); assert sp.simplify(inner - R(3, 2)) == 0
assert [(x**2*y**2/2).subs(y, 1/x), (x*y).subs(y, 1/x)] == [R(1, 2), 1]
V = I(R(3, 2), (x, 1, 3)); assert V == 3
# comprobación: dx primero, dos tramos en y
t1 = I(I(z2 - z1, (x, 1, 3)), (y, 0, R(1, 3))); i1 = sp.expand(I(z2 - z1, (x, 1, 3)))
assert i1 == R(26, 3)*y + 4 and t1 == R(49, 27)
i2 = sp.expand(I(z2 - z1, (x, 1, 1/y))); assert sp.simplify(i2 - (R(5, 6)/y**2 - y/3 - R(1, 2))) == 0
t2 = I(i2, (y, R(1, 3), 1)); assert t2 == R(32, 27) and t1 + t2 == 3
en_mdx(r"V=3\ \text{u}^3", r"y=2x-1", r"(2x+1)(x-1)=0", r"\tfrac12+1=\tfrac32", r"\frac32\cdot2=3", r"\frac{13}{27}+\frac{36}{27}=\frac{49}{27}", r"\frac{145}{54}", r"\frac{49}{27}+\frac{32}{27}=\frac{81}{27}=3",
       r"\frac{26}{3}y+4", r"\frac{5}{6y^2}-\frac y3-\frac12")

# --- Ej 2a: lineal ---
yy = sp.Function("y")
ya = x**4*(sp.exp(x) + sp.E)
assert sp.simplify(x*sp.diff(ya, x) - (x**5*sp.exp(x) + 4*ya)) == 0 and ya.subs(x, 1) == 2*sp.E
assert sp.simplify(sp.diff(x**4*sp.exp(x)*0 + x**4, x)/x**4 - 4/x) == 0       # v = x^4 cumple v' = 4v/x
assert sp.simplify(sp.diff(sp.exp(x) + C, x) - sp.exp(x)) == 0 and 1*(sp.E + sp.E) == 2*sp.E
sol = sp.dsolve(sp.Eq(x*yy(x).diff(x), x**5*sp.exp(x) + 4*yy(x)), yy(x), ics={yy(1): 2*sp.E}); assert sp.simplify(sol.rhs - ya) == 0
en_mdx(r"y=x^4\,(e^x+e)", r"v=x^4", r"y'-\frac4x\,y=x^4e^x", r"u'x^4=x^4e^x", r"e+C=2e")

# --- Ej 2b: homogénea ---
yb = -x*sp.cos(sp.log(x))
assert yb.subs(x, 1) == -1
res = sp.simplify(x*sp.diff(yb, x) - yb - sp.sqrt(x**2 - yb**2)); xn = 3.0     # válida para 1 <= x <= e^pi
assert abs(float(res.subs(x, xn))) < 1e-12
assert sp.simplify(x*sp.diff(-x, x) - (-x) - sp.sqrt(x**2 - x**2)) == 0       # y = -x también cumple (solución singular)
ub = sp.asin(-1); assert ub == -sp.pi/2 and sp.simplify(sp.sin(sp.log(x) - sp.pi/2) + sp.cos(sp.log(x))) == 0
assert sp.simplify(sp.diff(sp.sin(sp.log(x) - sp.pi/2), x)*x - sp.cos(sp.log(x) - sp.pi/2)) == 0
assert sp.log(sp.exp(sp.pi)) == sp.pi
en_mdx(r"y=-x\cos(\ln x)", r"\arcsin u=\ln x+C", r"-\frac\pi2", r"u'x=\sqrt{1-u^2}", r"y=-x")

# --- Ej 3: y'' + 9y = 37 e^x cos 3x ---
yp = sp.exp(x)*(A*sp.cos(3*x) + B*sp.sin(3*x))
L = sp.expand(sp.simplify((yp.diff(x, 2) + 9*yp)/sp.exp(x)))
assert sp.simplify(L - ((A + 6*B)*sp.cos(3*x) + (-6*A + B)*sp.sin(3*x))) == 0
assert sp.solve([A + 6*B - 37, -6*A + B], [A, B]) == {A: 1, B: 6}
ypf = sp.exp(x)*(sp.cos(3*x) + 6*sp.sin(3*x)); assert sp.simplify(ypf.diff(x, 2) + 9*ypf - 37*sp.exp(x)*sp.cos(3*x)) == 0
assert sp.simplify(sp.diff(yp, x)/sp.exp(x) - ((A + 3*B)*sp.cos(3*x) + (B - 3*A)*sp.sin(3*x))) == 0
sol3 = sp.dsolve(yy(x).diff(x, 2) + 9*yy(x) - 37*sp.exp(x)*sp.cos(3*x), yy(x))
assert sp.simplify(sol3.rhs.subs({sp.Symbol("C1"): C1, sp.Symbol("C2"): C2}) - (C1*sp.cos(3*x) + C2*sp.sin(3*x) + ypf)) == 0
assert sp.solve(sp.Symbol("r")**2 + 9, sp.Symbol("r")) == [-3*sp.I, 3*sp.I]
en_mdx(r"y=C_1\cos(3x)+C_2\sin(3x)+e^x\big(\cos(3x)+6\sin(3x)\big)", r"A+6B=37", r"-6A+B=0", r"B=6A", r"37A=37", r"(A+3B)\cos(3x)+(B-3A)\sin(3x)",
       r"(-8A+6B)\cos(3x)+(-6A-8B)\sin(3x)", r"r=\pm3i")
print("OK W-T1")
