"""Recalcula con sympy el Examen W Tema 2 y comprueba que el MDX diga lo mismo. Uso: python3 tests/check_anterior-w-t2.py"""
from pathlib import Path
import sympy as sp

MDX = (Path(__file__).resolve().parents[1] / "src/content/anteriores/anterior-w-t2.mdx").read_text()
def en_mdx(*ss):
    for s in ss: assert s in MDX, f"falta en el MDX: {s}"
R = sp.Rational
x, y, C, C1, C2, A, B = sp.symbols("x y C C1 C2 A B")
I = sp.integrate
yy = sp.Function("y")

# --- Ej 1: recta por (0,1/2), (-1,0); V ---
a = R(1, 2) / (0 - (-1)); assert a == R(1, 2) and a*(-1) + R(1, 2) == 0           # y = x/2 + 1/2
assert sp.factor(x**2 + x - 2) == (x + 2)*(x - 1) and sp.solve((x + 1)/2 - 1/x, x) == [-2, 1]
z1, z2 = x**2*y, x
assert sp.expand((z2 - z1) - x*(1 - x*y)) == 0 and (z2 - z1).subs({x: R(3, 2), y: R(1, 5)}) > 0 and [z2.subs(x, R(3, 2)), z1.subs({x: R(3, 2), y: R(1, 5)})] == [R(3, 2), R(9, 20)]
inner = I(z2 - z1, (y, 0, 1/x)); assert sp.simplify(inner - R(1, 2)) == 0
assert [(x*y).subs(y, 1/x), (x**2*y**2/2).subs(y, 1/x)] == [1, R(1, 2)]
V = I(R(1, 2), (x, 1, 2)); assert V == R(1, 2)
i1 = sp.expand(I(z2 - z1, (x, 1, 2))); assert i1 == R(3, 2) - R(7, 3)*y
t1 = I(i1, (y, 0, R(1, 2))); assert t1 == R(11, 24) and R(3, 4) - R(7, 24) == R(11, 24)
i2 = sp.expand(I(z2 - z1, (x, 1, 1/y))); assert sp.simplify(i2 - (1/(6*y**2) - R(1, 2) + y/3)) == 0
t2 = I(i2, (y, R(1, 2), 1)); assert t2 == R(1, 24) and t1 + t2 == V
assert (-1/(6*y) - y/2 + y**2/6).subs(y, R(1, 2)) == -R(13, 24)
en_mdx(r"V=\frac12\ \text{u}^3", r"(x+2)(x-1)=0", r"1-\tfrac12=\tfrac12", r"\frac12\cdot1=\frac12", r"\frac32-\frac{7y}{3}", r"\frac34-\frac7{24}=\frac{11}{24}",
       r"\frac{1}{6y^2}-\frac12+\frac y3", r"-\frac12-\Big(-\frac{13}{24}\Big)=\frac1{24}", r"\frac{11}{24}+\frac1{24}=\frac{12}{24}=\frac12")

# --- Ej 2a: homogénea (igual a la b del tema 1) ---
ya = -x*sp.cos(sp.log(x)); assert ya.subs(x, 1) == -1
assert abs(float((x*sp.diff(ya, x) - ya - sp.sqrt(x**2 - ya**2)).subs(x, 3.0))) < 1e-12     # válida en 1 <= x <= e^pi
assert sp.simplify(x*sp.diff(-x, x) - (-x) - sp.sqrt(x**2 - x**2)) == 0 and sp.asin(-1) == -sp.pi/2
assert sp.simplify(sp.sin(sp.log(x) - sp.pi/2) + sp.cos(sp.log(x))) == 0 and sp.simplify(sp.diff(-sp.cos(sp.log(x)), x)*x - sp.sin(sp.log(x))) == 0
assert sp.simplify(sp.diff(ya, x) - (-sp.cos(sp.log(x)) + sp.sin(sp.log(x)))) == 0
en_mdx(r"y=-x\cos(\ln x)", r"\arcsin u=\ln x+C", r"C=-\frac\pi2", r"u'x=\sqrt{1-u^2}", r"y=-x", r"x\sin(\ln x)")

# --- Ej 2b: lineal ---
yb = x**4*(sp.exp(x) + sp.E)
assert sp.simplify(x*sp.diff(yb, x) - (x**5*sp.exp(x) + 4*yb)) == 0 and yb.subs(x, 1) == 2*sp.E
sol = sp.dsolve(sp.Eq(yy(x).diff(x), (x**5*sp.exp(x) + 4*yy(x))/x), yy(x), ics={yy(1): 2*sp.E}); assert sp.simplify(sol.rhs - yb) == 0
assert sp.simplify(sp.diff(x**4, x) - 4*x**4/x) == 0 and sp.expand(sp.diff(yb, x)*x) == sp.expand(4*x**4*sp.exp(x) + x**5*sp.exp(x) + 4*sp.E*x**4)
en_mdx(r"y=x^4\,(e^x+e)", r"v=x^4", r"y'-\frac4x\,y=x^4e^x", r"u'x^4=x^4e^x", r"e+C=2e", r"4x^4e^x+x^5e^x+4ex^4")

# --- Ej 3: y'' + y = 5 e^{-x} sen x ---
yp = sp.exp(-x)*(A*sp.cos(x) + B*sp.sin(x))
assert sp.simplify(yp.diff(x)/sp.exp(-x) - ((-A + B)*sp.cos(x) + (-A - B)*sp.sin(x))) == 0
assert sp.simplify(yp.diff(x, 2)/sp.exp(-x) - (-2*B*sp.cos(x) + 2*A*sp.sin(x))) == 0
assert sp.simplify((yp.diff(x, 2) + yp)/sp.exp(-x) - ((A - 2*B)*sp.cos(x) + (2*A + B)*sp.sin(x))) == 0
assert sp.solve([A - 2*B, 2*A + B - 5], [A, B]) == {A: 2, B: 1}
ypf = sp.exp(-x)*(2*sp.cos(x) + sp.sin(x)); assert sp.simplify(ypf.diff(x, 2) + ypf - 5*sp.exp(-x)*sp.sin(x)) == 0
assert sp.simplify(ypf.diff(x)/sp.exp(-x) - (-sp.cos(x) - 3*sp.sin(x))) == 0 and sp.simplify(ypf.diff(x, 2)/sp.exp(-x) - (-2*sp.cos(x) + 4*sp.sin(x))) == 0
gen = C1*sp.cos(x) + C2*sp.sin(x) + ypf; assert sp.simplify(gen.diff(x, 2) + gen - 5*sp.exp(-x)*sp.sin(x)) == 0
assert sp.solve(sp.Symbol("r")**2 + 1, sp.Symbol("r")) == [-sp.I, sp.I]
en_mdx(r"y=C_1\cos x+C_2\sin x+e^{-x}\big(2\cos x+\sin x\big)", r"A-2B=0", r"2A+B=5", r"A=2B", r"5B=5", r"(-A+B)\cos x+(-A-B)\sin x",
       r"-2B\cos x+2A\sin x", r"r=\pm i", r"e^{-x}[0\cos x+5\sin x]=5e^{-x}\sin x")
print("OK W-T2")
