"""Recalcula con sympy el 1H9 (temas A y B, jun-2026): resultados e intermedios, y que ambos MDX digan lo mismo.
Uso: python3 tests/check_1h9.py"""
from pathlib import Path
import sympy as sp

D = Path(__file__).resolve().parents[1] / "src/content/parciales"
MA = (D / "1h9-2026-06-27-a.mdx").read_text(); MB = (D / "1h9-2026-06-27-b.mdx").read_text()
def en(M, *ss):
    for s in ss: assert s in M, f"falta en el MDX: {s}"
R = sp.Rational
x, y, z, th, t, u, w, C1, C2 = sp.symbols("x y z theta t u w C1 C2", real=True)
r = sp.Symbol("r", positive=True)
I = sp.integrate
Y = sp.Function("y")

# ============ Ej 1 A: ∭ x√(x²+y²) dV, z²=x²+y², 0≤z≤4  (cono r ≤ z ≤ 4) ============
assert sp.solve(sp.Eq(z**2, r**2), z) == [-r, r]                       # z = r (z ≥ 0)
rad = I(r**3*(4 - r), (r, 0, 4))
assert I(r**3*z.subs(z, 1), (r, 0, 4)) == 64 and I(4*r**3, (r, 0, 4)) == 256 and I(r**4, (r, 0, 4)) == R(1024, 5)
assert rad == R(256, 5) and 256 - R(1024, 5) == R(256, 5)
assert I(sp.cos(th), (th, 0, 2*sp.pi)) == 0
ITa = I(I(I(r**3*sp.cos(th), (z, r, 4)), (r, 0, 4)), (th, 0, 2*sp.pi)); assert ITa == 0
# integrando en cilíndricas
xc, yc = r*sp.cos(th), r*sp.sin(th)
assert sp.simplify(xc*sp.sqrt(xc**2 + yc**2)*r - r**3*sp.cos(th)) == 0     # r>0
# comprobación: otro orden (r primero) y simetría
assert I(I(r**3, (r, 0, z)), (z, 0, 4)) == R(256, 5) and I(z**4/4, (z, 0, 4)) == R(256, 5) and R(4**5, 20) == R(256, 5)
assert I(sp.cos(th), (th, 0, sp.pi/2)) == 1 and I(sp.cos(th), (th, sp.pi/2, 3*sp.pi/2)) == -2 and I(sp.cos(th), (th, 3*sp.pi/2, 2*sp.pi)) == -1 + 2
# valor numérico completo (cartesianas, región x∈, y∈, z∈) por Monte Carlo no: otro orden exacto ya cubre
en(MA, r"\int_0^4 r^3(4-r)\,dr=\frac{256}{5}", r"IT=\frac{256}{5}\cdot0=0", r"\frac{4^5}{20}=\frac{256}{5}", r"=256-\frac{1024}{5}")

# ============ Ej 1 B: ∭ y√(x²+y²) dV, z=x²+y², 0≤z≤3 (r² ≤ z ≤ 3, r ≤ √3) ============
assert sp.solve(sp.Eq(3, r**2), r) == [sp.sqrt(3)]   # r > 0
radb = I(r**3*(3 - r**2), (r, 0, sp.sqrt(3)))
assert sp.expand(r**3*(3 - r**2)) == 3*r**3 - r**5
assert I(3*r**3, (r, 0, sp.sqrt(3))) == R(27, 4) and I(r**5, (r, 0, sp.sqrt(3))) == R(9, 2)
assert radb == R(9, 4) and R(27, 4) - R(9, 2) == R(9, 4)
assert I(sp.sin(th), (th, 0, 2*sp.pi)) == 0
ITb = I(I(I(r**3*sp.sin(th), (z, r**2, 3)), (r, 0, sp.sqrt(3))), (th, 0, 2*sp.pi)); assert ITb == 0
assert sp.simplify(yc*sp.sqrt(xc**2 + yc**2)*r - r**3*sp.sin(th)) == 0
assert I(I(r**3, (r, 0, sp.sqrt(z))), (z, 0, 3)) == R(9, 4) and I(z**2/4, (z, 0, 3)) == R(9, 4)
# cartesianas, un orden con la integral de y: región simétrica en y → 0
assert I(I(I(y*sp.sqrt(x**2 + y**2), (z, x**2 + y**2, 3)), (y, -sp.sqrt(3 - x**2), sp.sqrt(3 - x**2))), (x, -sp.sqrt(3), sp.sqrt(3))) == 0
en(MB, r"\int_0^{\sqrt3} r^3(3-r^2)\,dr=\frac{9}{4}", r"IT=\frac94\cdot0=0", r"\frac{3^3}{12}=\frac94", r"=\frac{27}{4}-\frac92")

# ============ Ej 2: curvilínea por definición ============
C1f, C2f = x**2 - x, y**2 - y
assert sp.expand((x**2 - x)**2 - (x**2 - x) - x) == x**4 - 2*x**3 and sp.factor(x**4 - 2*x**3) == x**3*(x - 2)
assert sorted(sp.solve(x**4 - 2*x**3, x)) == [0, 2] and (x**2 - x).subs(x, 2) == 2 and (x**2 - x).subs(x, 0) == 0
assert C2f.subs(y, 2) == 2 and C2f.subs(y, 0) == 0                    # (2,2) y (0,0) también están en C2
# Tema A: P = x−y, Q = −(y−x) = x−y
Pa, Qa = x - y, -(y - x)
assert sp.simplify(Qa - (x - y)) == 0
f1 = sp.expand((Pa + Qa*sp.diff(C1f, x)).subs(y, C1f))
assert f1 == 4*x**2 - 2*x**3 and sp.expand((x - (x**2 - x))*(1 + 2*x - 1)) == f1 and 2*x - x**2 == x - C1f
IC1a = I(f1, (x, 0, 2)); assert IC1a == R(8, 3) and R(32, 3) - 8 == R(8, 3) and I(4*x**2, (x, 0, 2)) == R(32, 3) and I(2*x**3, (x, 0, 2)) == 8
f2 = sp.expand((Pa*sp.diff(C2f, y) + Qa).subs(x, C2f))
assert f2 == 2*y**3 - 4*y**2 and sp.expand((y**2 - 2*y)*(2*y - 1 + 1)) == f2
IC2a = I(f2, (y, 2, 0)); assert IC2a == R(8, 3) and I(f2, (y, 0, 2)) == -R(8, 3) and 8 - R(32, 3) == -R(8, 3)
assert IC1a + IC2a == R(16, 3)
# Tema B: P = x−y, Q = x+y
Pb, Qb = x - y, x + y
g1 = sp.expand((Pb + Qb*sp.diff(C1f, x)).subs(y, C1f))
assert g1 == 2*x**3 - 2*x**2 + 2*x and x - C1f == 2*x - x**2 and x + C1f == x**2
IC1b = I(g1, (x, 0, 2)); assert IC1b == R(20, 3) and 8 - R(16, 3) + 4 == R(20, 3)
g2 = sp.expand((Pb*sp.diff(C2f, y) + Qb).subs(x, C2f))
assert g2 == 2*y**3 - 4*y**2 + 2*y and sp.expand((y**2 - 2*y)*(2*y - 1) + y**2) == g2
IC2b = I(g2, (y, 2, 0)); assert IC2b == -R(4, 3) and 8 - R(32, 3) + 4 == R(4, 3)
assert IC1b + IC2b == R(16, 3) and R(20, 3) - R(4, 3) == R(16, 3)
# Green: Q_x − P_y = 2 en ambos temas; Área(D) = 8/3
assert sp.diff(Qa, x) - sp.diff(Pa, y) == 2 and sp.diff(Qb, x) - sp.diff(Pb, y) == 2
s = sp.sqrt(1 + 4*y)
A_alto = I((1 + s)/2 - y**2 + y, (y, 0, 2)); A_gajo = I(s, (y, -R(1, 4), 0))
assert A_alto == R(5, 2) and A_gajo == R(1, 6) and R(5, 2) + R(1, 6) == R(8, 3)
# área por Green (A = ∮ x dy), independiente de franjas
# ∮ x dy = ∫_{C1} x dy + ∫_{C2} x dy
Ac = I(x*(2*x - 1), (x, 0, 2)) + I((y**2 - y)*1, (y, 2, 0))
assert Ac == R(10, 3) + R(-2, 3) == R(8, 3)
assert 2*R(8, 3) == R(16, 3)
en(MA, r"IC_1=\int_0^2(4x^2-2x^3)\,dx", r"IC_1=\frac{32}{3}-8", r"IC_1=\frac83", r"IC_2=\frac83", r"IC=IC_1+IC_2=\frac83+\frac83=\frac{16}{3}", r"2\cdot\frac83=\frac{16}{3}", r"A(D)=\frac{10}{3}-\frac23=\frac83")
en(MB, r"IC_1=\int_0^2(2x^3-2x^2+2x)\,dx", r"IC_1=8-\frac{16}{3}+4", r"IC_1=\frac{20}{3}", r"IC_2=-\Big(8-\frac{32}{3}+4\Big)", r"IC_2=-\frac43",
   r"IC=IC_1+IC_2=\frac{20}{3}-\frac43=\frac{16}{3}", r"2\cdot\frac83=\frac{16}{3}", r"A(D)=\frac{10}{3}-\frac23=\frac83")

# ============ Ej 3 A: 2y² − x²y' − 2xyy' = 0 (homogénea) ============
yp = 2*y**2/(x**2 + 2*x*y)
assert sp.simplify(sp.solve(sp.Eq(2*y**2 - x**2*sp.Symbol("p") - 2*x*y*sp.Symbol("p"), 0), sp.Symbol("p"))[0] - yp) == 0
assert sp.simplify(yp.subs(y, u*x) - 2*u**2/(1 + 2*u)) == 0
rhs = sp.simplify(2*u**2/(1 + 2*u) - u); assert sp.simplify(rhs + u/(1 + 2*u)) == 0 and sp.expand(2*u**2 - u*(1 + 2*u)) == -u
assert sp.expand((1 + 2*u)/u) == 1/u + 2
# solución implícita F(x,y) = ln y + 2y/x : F_x + F_y y' = 0 con y' de la EDO
F = sp.log(y) + 2*y/x
assert sp.simplify(sp.diff(F, x) + sp.diff(F, y)*yp) == 0
# y' por derivada implícita = y' de la EDO
pp = sp.solve(sp.Eq(sp.diff(F, x) + sp.diff(F, y)*sp.Symbol("p"), 0), sp.Symbol("p"))[0]
assert sp.simplify(pp - yp) == 0 and sp.simplify(pp - 2*y**2/(x*(x + 2*y))) == 0
assert (2*y**2 - x**2*yp - 2*x*y*yp).subs(y, 0) == 0                    # y ≡ 0 es solución
en(MA, r"\ln|y|+\frac{2y}{x}=C", r"u'x=\frac{2u^2-u-2u^2}{1+2u}", r"u'x=\frac{-u}{1+2u}", r"\frac{y'}{y}+\frac{2(y'x-y)}{x^2}=0", r"x^2y'+2xyy'-2y^2=0")

# implícita (A3): multiplicar por x²y da exactamente −(EDO original)
pq = sp.Symbol("p")
assert sp.expand((sp.diff(F, x) + sp.diff(F, y)*pq)*x**2*y + (2*y**2 - x**2*pq - 2*x*y*pq)) == 0
assert sp.expand((x**2*pq + 2*x*y*pq - 2*y**2) + (2*y**2 - x**2*pq - 2*x*y*pq)) == 0

# ============ Ej 3 B: y' − 3x²y − 6x² = 0 (lineal) ============
ysol = -2 + C1*sp.exp(x**3)
assert sp.simplify(sp.diff(ysol, x) - 3*x**2*ysol - 6*x**2) == 0
d = sp.dsolve(sp.Eq(Y(x).diff(x) - 3*x**2*Y(x) - 6*x**2, 0)); assert sp.simplify(d.rhs.subs(sp.Symbol("C1"), 0) + 2) == 0
v = sp.exp(x**3); assert sp.diff(v, x) - 3*x**2*v == 0
assert I(6*x**2*sp.exp(-x**3), x) == -2*sp.exp(-x**3)
assert sp.simplify((-2*sp.exp(-x**3) + C1)*sp.exp(x**3) - ysol) == 0
# variables separables: dy/(y+2) = 3x² dx
assert sp.simplify(sp.diff(sp.log(y + 2), y) - 1/(y + 2)) == 0 and I(3*x**2, x) == x**3
assert sp.simplify(sp.exp(x**3 + sp.Symbol("k")) - sp.exp(sp.Symbol("k"))*sp.exp(x**3)) == 0
assert sp.diff(-2, x) - 3*x**2*(-2) - 6*x**2 == 0   # y = −2 (C=0)
en(MB, r"y=-2+C\,e^{x^3}", r"u=\int6x^2e^{-x^3}\,dx", r"u=-2e^{-x^3}+C", r"v=e^{x^3}", r"\ln|y+2|=x^3+k")

# ============ Ej 4: y'' − 2y' + y = f ============
def lhs(f): return sp.simplify(sp.diff(f, x, 2) - 2*sp.diff(f, x) + f)
A, B, Dd = sp.symbols("A B D")
yp_g = A*x**2*sp.exp(x) + B*x + Dd
ex = sp.expand(sp.diff(yp_g, x, 2) - 2*sp.diff(yp_g, x) + yp_g)
assert sp.simplify(ex - (2*A*sp.exp(x) + B*x - 2*B + Dd)) == 0
assert sp.simplify(sp.diff(A*x**2*sp.exp(x), x) - (2*A*x + A*x**2)*sp.exp(x)) == 0
assert sp.simplify(sp.diff(A*x**2*sp.exp(x), x, 2) - (2*A + 4*A*x + A*x**2)*sp.exp(x)) == 0
assert sp.simplify(sp.solve(sp.Eq(r**2 - 2*r + 1, 0), r)[0] - 1) == 0 and sp.factor(r**2 - 2*r + 1) == (r - 1)**2
# Tema A: e^x − x
sA = sp.solve([2*A - 1, B + 1, -2*B + Dd], [A, B, Dd]); assert sA == {A: R(1, 2), B: -1, Dd: -2}
ypA = x**2*sp.exp(x)/2 - x - 2
assert lhs(ypA) - (sp.exp(x) - x) == 0
assert sp.simplify(lhs(C1*sp.exp(x) + C2*x*sp.exp(x)) ) == 0
# comprobación: y = e^x w  →  y''−2y'+y = e^x w''
wf = Y(x); yy = sp.exp(x)*wf
assert sp.simplify(sp.diff(yy, x, 2) - 2*sp.diff(yy, x) + yy - sp.exp(x)*sp.diff(wf, x, 2)) == 0
assert sp.diff(x**2/2, x, 2) == 1 and lhs(sp.exp(x)*x**2/2) == sp.exp(x)
assert sp.simplify(lhs(-x - 2) - (-x)) == 0 and sp.simplify(lhs(-x) - (2 - x)) == 0
dA = sp.dsolve(sp.Eq(Y(x).diff(x, 2) - 2*Y(x).diff(x) + Y(x), sp.exp(x) - x))
assert sp.simplify(lhs(dA.rhs) - (sp.exp(x) - x)) == 0
en(MA, r"y=C_1e^{x}+C_2xe^{x}+\frac12x^2e^{x}-x-2", r"A=\frac12", r"D=2B=-2")
# Tema B: −e^x + x − 1
sB = sp.solve([2*A + 1, B - 1, -2*B + Dd + 1], [A, B, Dd]); assert sB == {A: -R(1, 2), B: 1, Dd: 1}
ypB = -x**2*sp.exp(x)/2 + x + 1
assert lhs(ypB) - (-sp.exp(x) + x - 1) == 0
assert sp.diff(-x**2/2, x, 2) == -1 and lhs(x + 1) == x - 1
en(MB, r"y=C_1e^{x}+C_2xe^{x}-\frac12x^2e^{x}+x+1", r"A=-\frac12", r"D=-1+2B=1")
print("check_1h9 OK")
