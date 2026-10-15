"""Recalcula con sympy el Examen X Tema 2 y comprueba que el MDX diga lo mismo. Uso: python3 tests/check_anterior-x-t2.py"""
from pathlib import Path
import sympy as sp

MDX = (Path(__file__).resolve().parents[1] / "src/content/anteriores/anterior-x-t2.mdx").read_text()
def en_mdx(*ss):
    for s in ss: assert s in MDX, f"falta en el MDX: {s}"
R = sp.Rational
x, y, C, C1, C2 = sp.symbols("x y C C1 C2", real=True)
I = sp.integrate

# --- Ej 1: área ---
par = -R(1, 2)*x**2 + R(3, 2)*x + 2
assert sp.factor(x**2 - 3*x - 4) == (x - 4)*(x + 1) and sp.solve(par, x) == [-1, 4] and par.subs(x, 0) == 2
assert sp.solve(sp.diff(par, x), x) == [R(3, 2)] and par.subs(x, R(3, 2)) == R(25, 8)
assert sp.expand(-2*par - (x**2 - 3*x - 4)) == 0
assert par.subs(x, 1) == 3 and sp.sqrt(4 - 1) < 3                                   # en x=1: parábola 3, círculo √3
assert all(par.subs(x, v) >= sp.sqrt(4 - v**2) for v in (0, R(1, 2), 1, R(3, 2), 2))   # parábola sobre el círculo en [0,2]
G = -x**3/6 + R(3, 4)*x**2 + 2*x; assert sp.expand(sp.diff(G, x) - par) == 0
assert [G.subs(x, 4), -R(64, 6), R(3*16, 4), 2*4] == [R(28, 3), -R(32, 3), 12, 8] and -R(32, 3) + 12 + 8 == R(28, 3)
pb = I(par, (x, 0, 4)); assert pb == R(28, 3)
qc = I(sp.sqrt(4 - x**2), (x, 0, 2)); assert qc == sp.pi
t = sp.Symbol("t"); assert sp.simplify(I(4*sp.cos(t)**2, (t, 0, sp.pi/2)) - sp.pi) == 0
A = pb - qc; assert A == R(28, 3) - sp.pi and abs(float(A) - 6.19) < .005
# comprobación independiente (dos tramos): ∫0^2 (par - √(4-x²)) + ∫2^4 par
assert sp.simplify(I(par - sp.sqrt(4 - x**2), (x, 0, 2)) + I(par, (x, 2, 4)) - A) == 0
# segmento parabólico: |a| L³/6 entre -1 y 4, menos el tramo [-1,0]
assert R(1, 2)*5**3/6 == R(125, 12) == I(par, (x, -1, 4))
assert I(par, (x, -1, 0)) == R(13, 12) and G.subs(x, -1) == -R(13, 12) and R(1, 6) + R(3, 4) - 2 == -R(13, 12) and R(125, 12) - R(13, 12) == R(28, 3)
# integración en dy (otro orden): x_der_par = (3+√(25-8y))/2, x_izq_par = (3-√(25-8y))/2
xr = (3 + sp.sqrt(25 - 8*y))/2; xl = (3 - sp.sqrt(25 - 8*y))/2
assert sp.simplify(par.subs(x, xr) - y) == 0 and sp.simplify(par.subs(x, xl) - y) == 0 and xl.subs(y, 2) == 0 and xr.subs(y, 0) == 4
Ay = I(xr - sp.sqrt(4 - y**2), (y, 0, 2)) + I(xr - xl, (y, 2, R(25, 8))); assert sp.simplify(Ay - A) == 0
en_mdx(r"A=\frac{28}{3}-\pi\ \text{u}^2\approx6{,}19", r"(x-4)(x+1)=0", r"x^2+y^2=4", r"-\frac{64}{6}=-\frac{32}{3},\qquad\frac{3\cdot16}{4}=12,\qquad2\cdot4=8",
       r"-\frac{32}{3}+20=\frac{28}{3}", r"\frac{\frac12\cdot5^3}{6}=\frac{125}{12}", r"0-\Big(\frac16+\frac34-2\Big)=\frac{13}{12}",
       r"\frac{125}{12}-\frac{13}{12}=\frac{112}{12}=\frac{28}{3}", r"\frac{\pi\cdot2^2}{4}=\pi")

# --- Ej 2a: lineal ---
yy = sp.Function("y")
ya = (sp.sin(x)**2/2 + C)/sp.cos(x)
assert sp.simplify(1/(1/sp.sin(x)) - sp.sin(x)) == 0 and sp.simplify(ya.diff(x) - sp.tan(x)*ya - sp.sin(x)) == 0
assert sp.simplify(I(sp.tan(x), x) + sp.log(sp.cos(x))) == 0 and sp.simplify(I(sp.sin(x)*sp.cos(x), x) - sp.sin(x)**2/2) == 0
assert sp.simplify(ya.diff(x) - (sp.sin(x) + sp.sin(x)**3/(2*sp.cos(x)**2) + C*sp.sin(x)/sp.cos(x)**2)) == 0
en_mdx(r"y=\frac{\frac{\sin^2x}{2}+C}{\cos x}", r"\frac1{\operatorname{cosec}(x)}=\sin x", r"u'=\sin x\cos x", r"\ln|v|=-\ln|\cos x|", r"y'-\tan x\cdot y=\sin x")

# --- Ej 2b: exacta ---
M, N = 4*x*y**3 + 3*y**2 + 1, 6*x**2*y**2 + 6*x*y
assert sp.diff(M, y) == sp.diff(N, x) == 12*x*y**2 + 6*y
F = sp.expand(I(M, x)); assert sp.expand(F - (2*x**2*y**3 + 3*x*y**2 + x)) == 0 and sp.simplify(sp.diff(F, y) - N) == 0
assert F.subs({x: 1, y: 1}) == 6 and sp.expand(I(N, y) + x - F) == 0
yp_ = sp.Symbol("yp"); assert sp.expand(sp.diff(F, x) + sp.diff(F, y)*yp_ - (M + N*yp_)) == 0
en_mdx(r"2x^2y^3+3xy^2+x=6", r"M_y=12xy^2+6y,\qquad N_x=12xy^2+6y", r"g'(y)=0", r"2+3+1=6", r"h'=1")

# --- Ej 3: y'' - 4y' + 4y = e^{2x}/x ---
r_ = sp.Symbol("r"); assert sp.factor(r_**2 - 4*r_ + 4) == (r_ - 2)**2
y1, y2, f = sp.exp(2*x), x*sp.exp(2*x), sp.exp(2*x)/x
W = sp.simplify(y1*y2.diff(x) - y2*y1.diff(x)); assert W == sp.exp(4*x)
assert sp.simplify(y1*y2.diff(x) - (sp.exp(4*x) + 2*x*sp.exp(4*x))) == 0 and sp.simplify(y2*y1.diff(x) - 2*x*sp.exp(4*x)) == 0
assert sp.simplify(-y2*f/W) == -1 and sp.simplify(y1*f/W) == 1/x
yp = -x*y1 + sp.log(x)*y2; assert sp.simplify(yp.diff(x, 2) - 4*yp.diff(x) + 4*yp - f) == 0
gen = (C1 + C2*x)*sp.exp(2*x) + x*sp.exp(2*x)*sp.log(x); assert sp.simplify(gen.diff(x, 2) - 4*gen.diff(x) + 4*gen - f) == 0
L = sp.log(x); yn = x*sp.exp(2*x)*L
assert sp.simplify(yn.diff(x)/sp.exp(2*x) - ((1 + 2*x)*L + 1)) == 0 and sp.simplify(yn.diff(x, 2)/sp.exp(2*x) - ((4 + 4*x)*L + 4 + 1/x)) == 0
assert sp.expand((4 + 4*x) - 4*(1 + 2*x) + 4*x) == 0 and 4 - 4 == 0
en_mdx(r"y=(C_1+C_2x)\,e^{2x}+xe^{2x}\ln|x|", r"W=e^{4x}+2xe^{4x}-2xe^{4x}=e^{4x}", r"-\frac{e^{4x}}{e^{4x}}=-1", r"u_1=-x,\qquad u_2=\ln|x|",
       r"u_1y_1+u_2y_2=-xe^{2x}+xe^{2x}\ln|x|", r"(r-2)^2=0", r"e^{2x}\big[(1+2x)L+1\big]", r"e^{2x}\Big[(4+4x)L+4+\frac1x\Big]")
print("OK X-T2")
