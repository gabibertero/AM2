"""Recalcula con sympy el Examen X Tema 1 y comprueba que el MDX diga lo mismo. Uso: python3 tests/check_anterior-x-t1.py"""
from pathlib import Path
import sympy as sp

MDX = (Path(__file__).resolve().parents[1] / "src/content/anteriores/anterior-x-t1.mdx").read_text()
def en_mdx(*ss):
    for s in ss: assert s in MDX, f"falta en el MDX: {s}"
R = sp.Rational
x, y, t, C, C1, C2 = sp.symbols("x y t C C1 C2", real=True)
I = sp.integrate
yy = sp.Function("y")

# --- Ej 1: área ---
par = -x**2 - 2*x + 3
assert sp.factor(x**2 + 2*x - 3) == (x + 3)*(x - 1) and sp.solve(par, x) == [-3, 1] and par.subs(x, 0) == 3
assert sp.solve(sp.diff(par, x), x) == [-1] and par.subs(x, -1) == 4
assert sp.solve(x**2 + 3**2 - 9, x) == [0] and (-3)**2 == 9                 # el círculo x²+y²=9 pasa por (0,3) y (-3,0)
assert all(par.subs(x, v) >= 0 for v in (0, R(1, 2), 1)) and par.subs(x, 2) < 0
assert all(par.subs(x, v) <= sp.sqrt(9 - v**2) for v in (0, R(1, 2), 1))      # parábola bajo el círculo en [0,1]
q = I(sp.sqrt(9 - x**2), (x, 0, 3)); assert q == 9*sp.pi/4
assert sp.simplify(I(9*sp.cos(t)**2, (t, 0, sp.pi/2)) - 9*sp.pi/4) == 0 and (t/2 + sp.sin(2*t)/4).subs(t, sp.pi/2) == sp.pi/4
pb = I(par, (x, 0, 1)); assert pb == R(5, 3) and (-x**3/3 - x**2 + 3*x).subs(x, 1) == R(5, 3)
A1 = q - pb; assert A1 == 9*sp.pi/4 - R(5, 3) and abs(float(A1) - 5.40) < .005
A1t = I(sp.sqrt(9 - x**2) - par, (x, 0, 1)) + I(sp.sqrt(9 - x**2), (x, 1, 3)); assert sp.simplify(A1t - A1) == 0   # dos tramos
# comprobación en dy: x_izq = -1 + sqrt(4-y), x_der = sqrt(9-y²)
assert sp.simplify(par.subs(x, -1 + sp.sqrt(4 - y)) - y) == 0
assert I(sp.sqrt(9 - y**2), (y, 0, 3)) == 9*sp.pi/4 and I(sp.sqrt(4 - y), (y, 0, 3)) == R(14, 3) and R(-2, 3) + R(16, 3) == R(14, 3)
assert I(sp.sqrt(9 - y**2) + 1 - sp.sqrt(4 - y), (y, 0, 3)) == A1 and 9*sp.pi/4 + 3 - R(14, 3) == A1
en_mdx(
       r"A=\frac{9\pi}{4}-\frac53\ \text{u}^2\approx5{,}40", r"(x+3)(x-1)=0", r"x^2+y^2=9", r"-\frac13-1+3=\frac53", r"-\tfrac23+\tfrac{16}{3}=\tfrac{14}{3}",
       r"\frac{9\pi}{4}+3-\frac{14}{3}=\frac{9\pi}{4}-\frac53", r"9\cdot\frac\pi4=\frac{9\pi}{4}")

# --- Ej 2a: exacta ---
M, N = 4*x*y**3 + 3*y**2 + 1, 6*x**2*y**2 + 6*x*y
assert sp.diff(M, y) == 12*x*y**2 + 6*y == sp.diff(N, x)
F = sp.expand(I(M, x)); assert sp.expand(F - (2*x**2*y**3 + 3*x*y**2 + x)) == 0
assert sp.simplify(sp.diff(F, y) - N) == 0 and F.subs({x: 1, y: 1}) == 6
assert sp.expand(I(N, y) + x - F) == 0                                                       # camino por N: h(x) = x
assert sp.simplify(sp.diff(sp.Eq(F, 6).lhs, x) + sp.diff(F, y)*sp.Symbol("yp") - (M + N*sp.Symbol("yp"))) == 0
# la ecuación del enunciado: 1 = -M dx / (N dy)  <=>  M dx + N dy = 0
en_mdx(r"2x^2y^3+3xy^2+x=6", r"M_y=12xy^2+6y,\qquad N_x=12xy^2+6y", r"6x^2y^2+6xy+g'(y)", r"2+3+1=6", r"h'=1")

# --- Ej 2b: lineal y' - tg x y = sen x ---
yb = (sp.sin(x)**2/2 + C)/sp.cos(x)
assert sp.simplify(yb.diff(x) - sp.tan(x)*yb - sp.sin(x)) == 0
assert sp.simplify(sp.diff(1/sp.cos(x), x) - sp.tan(x)/sp.cos(x)) == 0 and sp.simplify(I(sp.tan(x), x) + sp.log(sp.cos(x))) == 0
assert sp.simplify(I(sp.sin(x)*sp.cos(x), x) - sp.sin(x)**2/2) == 0
assert sp.simplify(sp.diff(yb, x) - (sp.sin(x) + sp.sin(x)**3/(2*sp.cos(x)**2) + C*sp.sin(x)/sp.cos(x)**2)) == 0
assert sp.simplify(yb*sp.tan(x) - (sp.sin(x)**3/(2*sp.cos(x)**2) + C*sp.sin(x)/sp.cos(x)**2)) == 0
en_mdx(r"y=\frac{\frac{\sin^2x}{2}+C}{\cos x}", r"v=\dfrac1{\cos x}", r"u'=\sin x\cos x", r"\ln|v|=-\ln|\cos x|", r"y'=\sin x+\frac{\sin^3x}{2\cos^2x}+\frac{C\sin x}{\cos^2x}")

# --- Ej 3: y'' + 2y' + y = e^{-x}/x ---
r_ = sp.Symbol("r"); assert sp.factor(r_**2 + 2*r_ + 1) == (r_ + 1)**2
y1, y2, f = sp.exp(-x), x*sp.exp(-x), sp.exp(-x)/x
W = sp.simplify(y1*y2.diff(x) - y2*y1.diff(x)); assert W == sp.exp(-2*x)
assert sp.simplify(y1*y2.diff(x) - (sp.exp(-2*x) - x*sp.exp(-2*x))) == 0 and sp.simplify(y2*y1.diff(x) + x*sp.exp(-2*x)) == 0
u1p = sp.simplify(-y2*f/W); u2p = sp.simplify(y1*f/W); assert u1p == -1 and u2p == 1/x
yp = -x*y1 + sp.log(x)*y2
assert sp.simplify(yp.diff(x, 2) + 2*yp.diff(x) + yp - f) == 0
gen = (C1 + C2*x)*sp.exp(-x) + x*sp.exp(-x)*sp.log(x); assert sp.simplify(gen.diff(x, 2) + 2*gen.diff(x) + gen - f) == 0
L = sp.log(x); yn = x*sp.exp(-x)*L
assert sp.simplify(yn.diff(x)/sp.exp(-x) - ((1 - x)*L + 1)) == 0 and sp.simplify(yn.diff(x, 2)/sp.exp(-x) - ((x - 2)*L - 2 + 1/x)) == 0
assert sp.expand((x - 2) + 2*(1 - x) + x) == 0 and -2 + 2 == 0
en_mdx(r"y=(C_1+C_2x)\,e^{-x}+xe^{-x}\ln|x|", r"W=e^{-2x}-xe^{-2x}+xe^{-2x}=e^{-2x}", r"-\frac{e^{-2x}}{e^{-2x}}=-1", r"u_1=-x,\qquad u_2=\ln|x|",
       r"u_1y_1+u_2y_2=-xe^{-x}+xe^{-x}\ln|x|", r"(r+1)^2=0", r"e^{-x}\big[(1-x)L+1\big]", r"e^{-x}\Big[(x-2)L-2+\frac1x\Big]")
print("OK X-T1")
