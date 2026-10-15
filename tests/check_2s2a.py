"""Recalcula con sympy el 2S2 Tema A (resultados e intermedios) y comprueba que el MDX diga lo mismo.
Uso: python3 tests/check_2s2a.py"""
from pathlib import Path
import sympy as sp

MDX = (Path(__file__).resolve().parents[1] / "src/content/parciales/2s2-2025-11-07-a.mdx").read_text()
def en_mdx(*ss):
    for s in ss: assert s in MDX, f"falta en el MDX: {s}"
R = sp.Rational
x, y, z, r, th, w = sp.symbols("x y z r theta w", real=True)
I = sp.integrate

# --- Ej 1: V = ∬[(8+r²)-(4-r²)] r dr dθ, r≤2 ---
assert sp.expand((8 + r**2) - (4 - r**2)) == 2*r**2 + 4
assert I((2*r**2 + 4)*r, (r, 0, 2)) == 16 and [(r**4/2).subs(r, 2), (2*r**2).subs(r, 2)] == [8, 8]
V1 = I(I((2*r**2 + 4)*r, (r, 0, 2)), (th, 0, 2*sp.pi)); assert V1 == 32*sp.pi
assert I(I(I(r, (z, 4 - r**2, 8 + r**2)), (r, 0, 2)), (th, 0, 2*sp.pi)) == V1      # cilíndricas (triple)
assert I((8 + r**2)*r, (r, 0, 2))*2*sp.pi == 40*sp.pi and I((4 - r**2)*r, (r, 0, 2))*2*sp.pi == 8*sp.pi   # comprobación
assert abs(float(V1) - 100.5) < .05
en_mdx(r"V=32\pi\ \text{u}^3\approx100{,}5", r"2\pi\cdot20=40\pi", r"2\pi\cdot4=8\pi", r"V=40\pi-8\pi=32\pi",
       r"\Big[\frac{r^4}{2}+2r^2\Big]_0^2", r"\int_0^{2\pi}16\,d\theta=16\cdot2\pi=32\pi", r"\iint_D(2x^2+2y^2+4)\,dx\,dy")

# --- Ej 2: ∭ xz dV, 1er octante, r²≤z≤8-r² ---
assert sp.solve(r**2 - (8 - r**2), r) == [-2, 2]
zin = I(z, (z, r**2, 8 - r**2)); assert sp.expand(zin) == 32 - 8*r**2 and sp.expand((8 - r**2)**2) == 64 - 16*r**2 + r**4
assert I(r**2*(32 - 8*r**2), (r, 0, 2)) == R(512, 15) and R(256, 3) - R(256, 5) == R(512, 15) and R(1280 - 768, 15) == R(512, 15)
assert I(sp.cos(th), (th, 0, sp.pi/2)) == 1
IT = I(I(I(r*r*sp.cos(th)*z, (z, r**2, 8 - r**2)), (r, 0, 2)), (th, 0, sp.pi/2)); assert IT == R(512, 15)
# cartesianas independientes (cuarto de círculo): ∬ x (z²/2 entre paraboloides) dA
IT_c = I(I(x*((8 - x**2 - y**2)**2 - (x**2 + y**2)**2)/2, (y, 0, sp.sqrt(4 - x**2))), (x, 0, 2)); assert sp.simplify(IT_c - IT) == 0
# comprobación: orden r-primero
t1 = I(z*z**R(3, 2)/3, (z, 0, 4)); t2 = I(z*(8 - z)**R(3, 2)/3, (z, 4, 8))
assert t1 == R(256, 21) and t2 == R(768, 35) and t1 + t2 == R(3584, 105) == IT
assert I((8 - w)*w**R(3, 2)/3, (w, 0, 4)) == R(768, 35)
en_mdx(r"IT=\frac{512}{15}\approx34{,}13", r"\frac{256}{3}-\frac{256}{5}=\frac{1280-768}{15}=\frac{512}{15}", r"\frac{64-16r^2}{2}=32-8r^2",
       r"\frac{256}{21}+\frac{768}{35}=\frac{1280+2304}{105}=\frac{512}{15}", r"r^2=8-r^2\ \Rightarrow\ 2r^2=8", r"\sin\tfrac\pi2-\sin0=1")

# --- Ej 3: P=x-y, Q=x+y; C1: y=-x (x:1→-2), C2: y=x²-2 (x:-2→1) ---
P, Q = x - y, x + y
assert sp.solve(sp.Eq(x**2 - 2, -x), x) == [-2, 1] and sp.factor(x**2 + x - 2) == (x - 1)*(x + 2)
f1 = sp.expand(P.subs(y, -x)*1 + Q.subs(y, -x)*(-1)); assert f1 == 2*x
IC1 = I(f1, (x, 1, -2)); assert IC1 == 3
yc = x**2 - 2
f2 = sp.expand(P.subs(y, yc) + Q.subs(y, yc)*sp.diff(yc, x)); assert f2 == 2*x**3 + x**2 - 3*x + 2
G = I(f2, x); assert sp.expand(G - (x**4/2 + x**3/3 - 3*x**2/2 + 2*x)) == 0
assert [G.subs(x, 1), G.subs(x, -2)] == [R(4, 3), -R(14, 3)]
IC2 = I(f2, (x, -2, 1)); assert IC2 == 6 and IC1 + IC2 == 9
assert sp.expand((x + y).subs(y, yc)*2*x) == 2*x**3 + 2*x**2 - 4*x and sp.expand(P.subs(y, yc)) == -x**2 + x + 2
assert sp.diff(Q, x) - sp.diff(P, y) == 2
Hg = sp.diff(Q, x) - sp.diff(P, y)
area = I(-x - yc, (x, -2, 1)); assert area == R(9, 2)
H = I(I(Hg, (y, yc, -x)), (x, -2, 1)); assert H == 9
Hx = sp.integrate(-x - x**2 + 2, x); assert [Hx.subs(x, 1), Hx.subs(x, -2)] == [R(7, 6), -R(10, 3)]
p1 = I(2 - x**2, x); p2 = I(-x, x)                                                       # comprobación: área en dos integrales
assert p1.subs(x, 1) - p1.subs(x, -2) == 3 and p2.subs(x, 1) - p2.subs(x, -2) == R(3, 2) and 3 + R(3, 2) == R(9, 2)
assert (R(5, 3), -R(4, 3)) == (p1.subs(x, 1), p1.subs(x, -2)) and (-R(1, 2), -2) == (p2.subs(x, 1), p2.subs(x, -2))
assert 8 - 6 - 4 == -2 and -2 - R(8, 3) == -R(14, 3) and R(1, 2) - R(3, 2) + 2 + R(1, 3) == R(4, 3) and R(4, 3) + R(14, 3) == 6   # líneas aparte de Ej3
assert R(7, 6) - R(-10, 3) == R(27, 6) and -R(5, 6) + 2 == R(7, 6) and -6 + R(8, 3) == -R(10, 3)
en_mdx(r"IC=\oint_C F\cdot dr=9\qquad\big(IC_1=3,\ IC_2=6\big)", r"\big[x^2\big]_1^{-2}=4-1=3", r"(2x^3+x^2-3x+2)\,dx",
       r"\tfrac43-\big(-\tfrac{14}{3}\big)=\tfrac{18}{3}=6", r"\tfrac76+\tfrac{20}{6}=\tfrac{27}{6}=\tfrac92", r"\text{Área}=3+\frac32=\frac92", r"\tfrac53-\Big(-\tfrac43\Big)=3", r"-\tfrac12-(-2)=\tfrac32",
       r"(x+2)(x-1)=0", r"-x-x^2+2")

# --- Ej 4: exacta ---
P4, Q4 = 2*x*sp.sin(y) - y*sp.sin(x), x**2*sp.cos(y) + sp.cos(x)
assert sp.simplify(sp.diff(P4, y) - (2*x*sp.cos(y) - sp.sin(x))) == 0 and sp.simplify(sp.diff(Q4, x) - (2*x*sp.cos(y) - sp.sin(x))) == 0
assert sp.simplify(I(P4, x) - (x**2*sp.sin(y) + y*sp.cos(x))) == 0
u = x**2*sp.sin(y) + y*sp.cos(x)
assert sp.simplify(sp.diff(u, y) - Q4) == 0 and sp.simplify(sp.diff(u, x) - P4) == 0     # φ'(y)=0
assert sp.simplify(I(Q4, y) - u) == 0                                                    # camino 2: integrar Q en y
yf = sp.Function("yy"); dd = sp.diff(u.subs(y, yf(x)), x)
assert sp.simplify(dd - (P4.subs(y, yf(x)) + Q4.subs(y, yf(x))*sp.diff(yf(x), x))) == 0   # derivación implícita
en_mdx(r"x^2\sin(y)+y\cos(x)=C", r"\frac{\partial P}{\partial y}=2x\cos(y)-\sin(x)", r"\varphi'(y)=0", r"P+Q\,y'=0")

# --- Ej 5: y''-y'-6y = 5e^{3x}+6x+3 ---
A, B, D, C1, C2 = sp.symbols("A B D C1 C2")
assert sp.solve(r**2 - r - 6, r) == [-2, 3]
yp = A*x*sp.exp(3*x) + B*x + D
yp1, yp2 = sp.diff(yp, x), sp.diff(yp, x, 2)
assert sp.simplify(yp1 - (A*sp.exp(3*x) + 3*A*x*sp.exp(3*x) + B)) == 0 and sp.simplify(yp2 - (6*A*sp.exp(3*x) + 9*A*x*sp.exp(3*x))) == 0
rhs = 5*sp.exp(3*x) + 6*x + 3
lhs = sp.expand(yp2 - yp1 - 6*yp); assert sp.simplify(lhs - (5*A*sp.exp(3*x) - 6*B*x + (-B - 6*D))) == 0
sol = sp.solve([5*A - 5, -6*B - 6, -B - 6*D - 3], [A, B, D]); assert sol == {A: 1, B: -1, D: -R(1, 3)}
ypv = yp.subs(sol); assert sp.simplify(ypv - (x*sp.exp(3*x) - x - R(1, 3))) == 0
assert sp.simplify(sp.diff(ypv, x) - (sp.exp(3*x) + 3*x*sp.exp(3*x) - 1)) == 0 and sp.simplify(sp.diff(ypv, x, 2) - (6*sp.exp(3*x) + 9*x*sp.exp(3*x))) == 0
assert sp.simplify(-6*ypv - (-6*x*sp.exp(3*x) + 6*x + 2)) == 0
assert sp.simplify(sp.diff(ypv, x, 2) - sp.diff(ypv, x) - 6*ypv - rhs) == 0              # sustitución en la EDO
yh = C1*sp.exp(3*x) + C2*sp.exp(-2*x); assert sp.simplify(sp.diff(yh, x, 2) - sp.diff(yh, x) - 6*yh) == 0
f = sp.Function("f"); ds = sp.dsolve(sp.Eq(f(x).diff(x, 2) - f(x).diff(x) - 6*f(x), rhs)).rhs   # dsolve independiente
assert sp.simplify(sp.diff(ds, x, 2) - sp.diff(ds, x) - 6*ds - rhs) == 0
h = ds - ypv; assert sp.simplify(sp.diff(h, x, 2) - sp.diff(h, x) - 6*h) == 0   # dsolve difiere de y_p en una solución de la homogénea
en_mdx(r"y=C_1e^{3x}+C_2e^{-2x}+xe^{3x}-x-\frac13", r"y_p=Axe^{3x}+Bx+D", r"5Ae^{3x}-6Bx+(-B-6D)=5e^{3x}+6x+3",
       r"1-6D=3", r"D=-\tfrac13", r"r=\frac{1\pm\sqrt{1+24}}{2}=\frac{1\pm5}{2}")
print("OK: 2S2-A verificado (ej1 32π, ej2 512/15, ej3 9, ej4 exacta, ej5 EDO)")
