"""Recalcula con sympy el 2S2 Tema B (resultados e intermedios) y comprueba que el MDX diga lo mismo.
Uso: python3 tests/check_2s2b.py"""
from pathlib import Path
import sympy as sp

MDX = (Path(__file__).resolve().parents[1] / "src/content/parciales/2s2-2025-11-07-b.mdx").read_text()
def en_mdx(*ss):
    for s in ss: assert s in MDX, f"falta en el MDX: {s}"
R = sp.Rational
x, y, z, r, th, w = sp.symbols("x y z r theta w", real=True)
I = sp.integrate

# --- Ej 1: V = ∫∫ (y+1) dy dx, 0≤y≤1-x² ---
iny = sp.expand(I(y + 1, (y, 0, 1 - x**2))); assert iny == R(3, 2) - 2*x**2 + x**4/2
assert sp.expand((1 - x**2)**2/2 + 1 - x**2 - iny) == 0
Gx = I(iny, x); assert Gx.subs(x, 1) == R(28, 30) and Gx.subs(x, -1) == -R(28, 30)
V1 = I(I(y + 1, (y, 0, 1 - x**2)), (x, -1, 1)); assert V1 == R(28, 15)
V1z = I(I(I(1, (z, 1, y + 2)), (y, 0, 1 - x**2)), (x, -1, 1)); assert V1z == V1         # triple desde la definición
V1b = I((y + 1)*2*sp.sqrt(1 - y), (y, 0, 1)); assert V1b == V1                          # comprobación: otro orden
assert 2*I((2 - w)*sp.sqrt(w), (w, 0, 1)) == R(28, 15) and R(4, 3) - R(2, 5) == R(14, 15)
assert abs(float(V1) - 1.87) < .005
en_mdx(r"V=\frac{28}{15}\ \text{u}^3\approx1{,}87", r"\frac32-2x^2+\frac{x^4}{2}", r"\tfrac{45-20+3}{30}=\tfrac{28}{30}", r"V=\frac{28}{30}+\frac{28}{30}=\frac{56}{30}=\frac{28}{15}",
       r"2\cdot\frac{14}{15}=\frac{28}{15}")

# --- Ej 2: IT=∭ z dV; √(4-r²) ≤ z ≤ r²+2, r≤1 ---
assert sp.expand((r**2 + 2)**2 - (4 - r**2)) == r**4 + 5*r**2
zin = sp.expand(I(z, (z, sp.sqrt(4 - r**2), r**2 + 2))); assert sp.expand(zin - (r**4 + 5*r**2)/2) == 0
assert I(r*(r**4 + 5*r**2)/2, (r, 0, 1)) == R(17, 24) and R(1, 6) + R(5, 4) == R(17, 12)
IT = I(I(I(r*z, (z, sp.sqrt(4 - r**2), r**2 + 2)), (r, 0, 1)), (th, 0, 2*sp.pi)); assert IT == 17*sp.pi/12
# comprobación: r primero
a1 = I(z*(z**2 - 3)/2, (z, sp.sqrt(3), 2)); a2 = I(z*(3 - z)/2, (z, 2, 3))
assert a1 == R(1, 8) and a2 == R(7, 12) and 2*sp.pi*(a1 + a2) == IT
assert sp.solve(sp.Eq(4 - z**2, z - 2), z) == [-3, 2]
assert (4 - r**2).subs(r, 1) == 3 and sp.sqrt(3) < 2                                      # piso entre √3 y 2 en r∈[0,1]
assert abs(float(IT) - 4.45) < .005
en_mdx(r"IT=\frac{17\pi}{12}\approx4{,}45", r"\frac{r^4+4r^2+4-4+r^2}{2}=\frac{r^4+5r^2}{2}", r"\tfrac16+\tfrac54=\tfrac{2+15}{12}=\tfrac{17}{12}",
       r"\frac{17}{24}\cdot2\pi=\frac{17\pi}{12}", r"2\pi\Big[\frac18+\frac7{12}\Big]=2\pi\cdot\frac{17}{24}=\frac{17\pi}{12}", r"(r^2+2)^2-(4-r^2)=r^4+5r^2\ge0")

# --- Ej 3: P=x+y, Q=-(x+y); C1: y=-x²+4 (x:2→-2), C2: y=-x²/2+2 (x:-2→2) ---
P, Q = x + y, -(x + y)
c1, c2 = -x**2 + 4, -x**2/2 + 2
assert sp.solve(sp.Eq(c1, c2), x) == [-2, 2] and c1.subs(x, 0) == 4 and c2.subs(x, 0) == 2
f1 = sp.expand(P.subs(y, c1) + Q.subs(y, c1)*sp.diff(c1, x)); assert f1 == -2*x**3 + x**2 + 9*x + 4
assert sp.expand((x - x**2 + 4)*(1 + 2*x) - f1) == 0
G = I(f1, x); assert sp.expand(G - (-x**4/2 + x**3/3 + 9*x**2/2 + 4*x)) == 0 and G.subs(x, -2) == -R(2, 3) and G.subs(x, 2) == R(62, 3)
I1 = I(f1, (x, 2, -2)); assert I1 == -R(64, 3) == G.subs(x, -2) - G.subs(x, 2)
f2 = sp.expand(P.subs(y, c2) + Q.subs(y, c2)*sp.diff(c2, x)); assert f2 == -x**3/2 + x**2/2 + 3*x + 2
assert sp.expand((x - x**2/2 + 2)*(1 + x) - f2) == 0
I2 = I(f2, (x, -2, 2)); assert I2 == R(32, 3) == 2*I(x**2/2 + 2, (x, 0, 2)) and I(-x**3/2 + 3*x, (x, -2, 2)) == 0
IC = I1 + I2; assert IC == -R(32, 3)
Hg = sp.diff(Q, x) - sp.diff(P, y); assert Hg == -2
area = I(c1 - c2, (x, -2, 2)); assert area == R(16, 3) and I(2 - x**2/2, x).subs(x, 2) == R(8, 3)
assert I(I(Hg, (y, c2, c1)), (x, -2, 2)) == IC
assert I(4 - x**2, (x, -2, 2)) == R(32, 3) and I(2 - x**2/2, (x, -2, 2)) == R(16, 3)     # comprobación: áreas bajo cada parábola
# independiente: definición con param. explícita (x como t) por cada tramo, vía integral de línea vectorial
t = sp.symbols("t", real=True)
def linea(xt, yt, a, b): return I(P.subs({x: xt, y: yt})*sp.diff(xt, t) + Q.subs({x: xt, y: yt})*sp.diff(yt, t), (t, a, b))
assert linea(-t, c1.subs(x, -t), -2, 2) + linea(t, c2.subs(x, t), -2, 2) == IC             # C1 con x=-t (t de -2 a 2)
en_mdx(r"IC=\oint_C F\cdot dr=-\frac{32}{3}", r"-2x^3+x^2+9x+4", r"I_1=G(-2)-G(2)=-\frac23-\frac{62}{3}=-\frac{64}{3}", r"-\frac{x^3}{2}+\frac{x^2}{2}+3x+2",
       r"I_2=2\int_0^2\Big(\frac{x^2}{2}+2\Big)dx", r"2\cdot\frac{16}{3}=\frac{32}{3}", r"IC=I_1+I_2=-\frac{64}{3}+\frac{32}{3}=-\frac{32}{3}",
       r"IC=-2\cdot\frac{16}{3}=-\frac{32}{3}", r"\frac{32}{3}-\frac{16}{3}=\frac{16}{3}")

# --- Ej 4: Bernoulli xy'-y = x²/y², n=-2 ---
yf = sp.Function("y")
z_ = sp.Function("z")
# 3y² * (y' - y/x - x y^-2) = 3y²y' - 3y³/x - 3x
Eb = 3*y**2*(sp.Symbol("yp") - y/x - x*y**-2); assert sp.simplify(sp.expand(Eb) - (3*y**2*sp.Symbol("yp") - 3*y**3/x - 3*x)) == 0
# lineal z'-3z/x=3x con z=uv: v=x³, u'=3/x², u=-3/x+C
v = x**3
assert sp.simplify(sp.diff(v, x) - 3*v/x) == 0
u = sp.Symbol("C") - 3/x; assert sp.simplify(sp.diff(u, x)*v - 3*x) == 0 and sp.simplify(I(3/x**2, x) + 3/x) == 0
zs = sp.expand(u*v); assert zs == sp.Symbol("C")*x**3 - 3*x**2
assert sp.simplify(sp.diff(zs, x) - 3*zs/x - 3*x) == 0                                    # sustitución en la lineal
ds = sp.dsolve(sp.Eq(z_(x).diff(x) - 3*z_(x)/x, 3*x)).rhs                                 # dsolve independiente
assert sp.simplify(ds.subs(sp.Symbol("C1"), sp.Symbol("C")) - zs) == 0
# vuelta a la original: y = z^(1/3), con x>0 y z>0
# vuelta a la original (C=5)
Cn = 5; ysol = (Cn*x**3 - 3*x**2)**R(1, 3)
assert sp.simplify(x*sp.diff(ysol, x) - ysol - x**2/ysol**2) == 0
en_mdx(r"y^3=x^3\Big(C-\frac3x\Big)=Cx^3-3x^2", r"z'-\frac3x\,z=3x", r"v=x^3", r"u=-\frac3x+C", r"3y^2y'-\frac3x\,y^3=3x", r"=3Cx^2-6x-3Cx^2+9x=3x")

# --- Ej 5: y''-2y' = 2e^{2x}+2 ---
A, B, C1, C2, Cp = sp.symbols("A B C1 C2 Cp")
assert sp.solve(r**2 - 2*r, r) == [0, 2]
yp = A*x*sp.exp(2*x) + B*x
yp1, yp2 = sp.diff(yp, x), sp.diff(yp, x, 2)
assert sp.simplify(yp1 - (A*sp.exp(2*x) + 2*A*x*sp.exp(2*x) + B)) == 0 and sp.simplify(yp2 - (4*A*sp.exp(2*x) + 4*A*x*sp.exp(2*x))) == 0
rhs = 2*sp.exp(2*x) + 2
lhs = sp.expand(yp2 - 2*yp1); assert sp.simplify(lhs - (2*A*sp.exp(2*x) - 2*B)) == 0
sol = sp.solve([2*A - 2, -2*B - 2], [A, B]); assert sol == {A: 1, B: -1}
ypv = yp.subs(sol); assert sp.simplify(sp.diff(ypv, x, 2) - 2*sp.diff(ypv, x) - rhs) == 0   # sustitución en la EDO
assert sp.simplify(sp.diff(ypv, x) - (sp.exp(2*x) + 2*x*sp.exp(2*x) - 1)) == 0 and sp.simplify(sp.diff(ypv, x, 2) - (4*sp.exp(2*x) + 4*x*sp.exp(2*x))) == 0
# sin resonancia no hay solución: Ae^{2x}+B no sirve
yb = A*sp.exp(2*x) + B; assert sp.simplify(sp.diff(yb, x, 2) - 2*sp.diff(yb, x)) == 0
yh = C1 + C2*sp.exp(2*x); assert sp.simplify(sp.diff(yh, x, 2) - 2*sp.diff(yh, x)) == 0
# comprobación por reducción de orden: w=y', w'-2w=2e^{2x}+2
wv = Cp*sp.exp(2*x) + 2*x*sp.exp(2*x) - 1; assert sp.simplify(sp.diff(wv, x) - 2*wv - rhs) == 0
assert sp.simplify(I(2*x*sp.exp(2*x), x) - (x*sp.exp(2*x) - sp.exp(2*x)/2)) == 0
yint = I(wv, x) + C1; assert sp.simplify(yint - (C1 + Cp*sp.exp(2*x)/2 + x*sp.exp(2*x) - sp.exp(2*x)/2 - x)) == 0
f = sp.Function("f"); ds = sp.dsolve(sp.Eq(f(x).diff(x, 2) - 2*f(x).diff(x), rhs)).rhs
h = ds - ypv; assert sp.simplify(sp.diff(ds, x, 2) - 2*sp.diff(ds, x) - rhs) == 0 and sp.simplify(sp.diff(h, x, 2) - 2*sp.diff(h, x)) == 0
en_mdx(r"y=C_1+C_2e^{2x}+xe^{2x}-x", r"y_p=Axe^{2x}+Bx", r"2Ae^{2x}-2B=2e^{2x}+2", r"r(r-2)=0", r"w=C_2'e^{2x}+2xe^{2x}-1",
       r"xe^{2x}-\tfrac12e^{2x}")
print("OK: 2S2-B verificado (ej1 28/15, ej2 17π/12, ej3 -32/3, ej4 Bernoulli, ej5 EDO)")
