"""Recalcula con sympy el Recuperatorio 20/11/2025 (resultados e intermedios) y comprueba que el MDX diga lo mismo.
Uso: python3 tests/check_recup-2025-11-20.py"""
from pathlib import Path
import sympy as sp

MDX = (Path(__file__).resolve().parents[1] / "src/content/parciales/recup-2025-11-20.mdx").read_text()
def en_mdx(*ss):
    for s in ss: assert s in MDX, f"falta en el MDX: {s}"
R = sp.Rational
x, y, z, r, th, ph, rho, t = sp.symbols("x y z r theta phi rho t", real=True)
I = sp.integrate

# --- Ej 1: IT = ∭(x+y) dV, esféricas: 1≤ρ≤2, 0≤θ≤π/2, 0≤φ≤π/4 ---
assert I(rho**3, (rho, 1, 2)) == R(15, 4)
assert I(sp.sin(th) + sp.cos(th), (th, 0, sp.pi/2)) == 2
s2 = I(sp.sin(ph)**2, (ph, 0, sp.pi/4))
assert sp.simplify(s2 - (sp.pi/8 - R(1, 4))) == 0
assert sp.simplify(I((1 - sp.cos(2*ph))/2, (ph, 0, sp.pi/4)) - s2) == 0
IT = R(15, 4)*2*s2
assert sp.simplify(IT - 15*(sp.pi - 2)/16) == 0 and abs(float(IT) - 1.0702) < 1e-3
full = I(I(I(rho**3*sp.sin(ph)**2*(sp.sin(th) + sp.cos(th)), (rho, 1, 2)), (th, 0, sp.pi/2)), (ph, 0, sp.pi/4))
assert sp.simplify(full - IT) == 0
# comprobación: simetría ∭x = ∭y y cilíndricas (z entre la esfera de radio 1 o el cono, y la esfera de radio 2)
a = 1/sp.sqrt(2)
zlo1, zhi = sp.sqrt(1 - r**2), sp.sqrt(4 - r**2)
Jx = I(r**2*(zhi - zlo1), (r, 0, a)) + I(r**2*(zhi - r), (r, a, sp.sqrt(2)))
assert sp.simplify(2*Jx*I(sp.cos(th), (th, 0, sp.pi/2)) - IT) == 0
assert sp.simplify(Jx - 15*(sp.pi - 2)/32) == 0
assert I(sp.cos(th), (th, 0, sp.pi/2)) == I(sp.sin(th), (th, 0, sp.pi/2)) == 1
en_mdx(r"\frac{15}{4}\cdot2\cdot\Big(\frac\pi8-\frac14\Big)=\frac{15(\pi-2)}{16}", r"\frac{\pi}{4}-\frac{1}{2}=\frac{\pi-2}{4}",
       r"IT=\frac{15(\pi-2)}{16}\approx 1{,}070", r"=\frac{15(\pi-2)}{32}", r"\int_1^2\rho^3\,d\rho=\Big[\frac{\rho^4}{4}\Big]_1^2=4-\frac14=\frac{15}{4}")

# --- Ej 2: IC = ∫ (θ-senθ)(1-cosθ) + (3-cosθ) senθ dθ ---
xt, yt = t - sp.sin(t), 1 - sp.cos(t)
P, Q = x, y + 2
g = sp.expand(P.subs({x: xt, y: yt})*sp.diff(xt, t) + Q.subs({x: xt, y: yt})*sp.diff(yt, t))
assert sp.simplify(g - (t - t*sp.cos(t) + 2*sp.sin(t))) == 0
assert sp.expand((t - sp.sin(t))*(1 - sp.cos(t)) - (t - t*sp.cos(t) - sp.sin(t) + sp.sin(t)*sp.cos(t))) == 0
assert sp.expand((3 - sp.cos(t))*sp.sin(t) - (3*sp.sin(t) - sp.sin(t)*sp.cos(t))) == 0
assert I(t, (t, 0, 2*sp.pi)) == 2*sp.pi**2
assert sp.simplify(sp.diff(t*sp.sin(t) + sp.cos(t), t) - t*sp.cos(t)) == 0
assert I(t*sp.cos(t), (t, 0, 2*sp.pi)) == 0 and I(2*sp.sin(t), (t, 0, 2*sp.pi)) == 0
IC = I(g, (t, 0, 2*sp.pi)); assert sp.simplify(IC - 2*sp.pi**2) == 0
# comprobación: campo conservativo, φ = x²/2 + (y+2)²/2
assert sp.diff(Q, x) - sp.diff(P, y) == 0
phi = x**2/2 + (y + 2)**2/2
assert sp.diff(phi, x) == P and sp.diff(phi, y) == Q
pf = phi.subs({x: xt, y: yt}).subs(t, 2*sp.pi) - phi.subs({x: xt, y: yt}).subs(t, 0)
assert sp.simplify(pf - 2*sp.pi**2) == 0 and (xt.subs(t, 2*sp.pi), yt.subs(t, 2*sp.pi)) == (2*sp.pi, 0)
en_mdx(r"\theta-\theta\cos\theta-\sin\theta+\sin\theta\cos\theta", r"3\sin\theta-\sin\theta\cos\theta", r"\theta-\theta\cos\theta+2\sin\theta",
       r"\Big[\theta\sin\theta+\cos\theta\Big]_0^{2\pi}=(0+1)-(0+1)=0", r"IC=2\pi^2", r"\frac{(2\pi)^2}{2}+\frac{(0+2)^2}{2}-\Big(0+\frac{(0+2)^2}{2}\Big)=2\pi^2")

# --- Ej 3: x³ + 2xy² = C (exacta, homogénea y Bernoulli) ---
P3, Q3 = 3*x**2 + 2*y**2, 4*x*y
assert sp.diff(P3, y) == 4*y == sp.diff(Q3, x)
assert I(Q3, y) == 2*x*y**2
assert sp.diff(2*x*y**2, x) == 2*y**2 and sp.expand(P3 - 2*y**2) == 3*x**2 and I(3*x**2, x) == x**3
u3 = x**3 + 2*x*y**2
assert sp.diff(u3, x) == P3 and sp.diff(u3, y) == Q3
Y = sp.Function("Y")
dy = sp.solve(sp.diff(u3.subs(y, Y(x)), x), Y(x).diff(x))[0]
assert sp.simplify(dy.subs(Y(x), y) + P3/Q3) == 0                      # derivación implícita: y' = -(3x²+2y²)/(4xy)
# homogénea: u = y/x
uu = sp.symbols("u")
assert sp.simplify(-(3 + 2*uu**2)/(4*uu) - uu - (-(3 + 6*uu**2)/(4*uu))) == 0
assert I(4*uu/(1 + 2*uu**2), uu) == sp.log(2*uu**2 + 1)
assert sp.simplify(((1 + 2*(y/x)**2)*x**3) - u3) == 0
# Bernoulli: z = y²,  z' + z/x = -3x/2  ->  z = -x²/2 + C/x
zz = -x**2/2 + sp.Symbol("K")/x
assert sp.simplify(sp.diff(zz, x) + zz/x + R(3, 2)*x) == 0
assert sp.simplify(sp.expand(x*zz*2) + x**3 - 2*sp.Symbol("K")) == 0
en_mdx(r"\frac{\partial P}{\partial y}=4y=\frac{\partial Q}{\partial x}", r"u=\int4xy\,dy=2xy^2+\varphi(x)", r"\varphi'(x)=3x^2\ \Rightarrow\ \varphi(x)=x^3",
       r"x^3+2xy^2=C", r"y^2=-\frac{x^2}{2}+\frac{K}{x}", r"3x^2+2y^2+4xy\,y'=0")

# --- Ej 4: y'' - 2y' + y = 4e^x + 2x² + 8 ---
Af, B, D, E, C1, C2 = sp.symbols("A B D E C1 C2")
assert sp.solve(r**2 - 2*r + 1, r) == [1] and sp.factor(r**2 - 2*r + 1) == (r - 1)**2
yp = Af*x**2*sp.exp(x) + B*x**2 + D*x + E
L = lambda f: sp.diff(f, x, 2) - 2*sp.diff(f, x) + f
assert sp.simplify(L(Af*x**2*sp.exp(x)) - 2*Af*sp.exp(x)) == 0
assert sp.expand(L(B*x**2 + D*x + E) - (B*x**2 + (D - 4*B)*x + (2*B - 2*D + E))) == 0
sol = sp.solve([2*Af - 4, B - 2, D - 4*B, 2*B - 2*D + E - 8], [Af, B, D, E])
assert sol == {Af: 2, B: 2, D: 8, E: 20}
ypv = yp.subs(sol)
assert sp.simplify(L(ypv) - (4*sp.exp(x) + 2*x**2 + 8)) == 0
yh = C1*sp.exp(x) + C2*x*sp.exp(x); assert sp.simplify(L(yh)) == 0
d = sp.dsolve(sp.Eq(sp.Function("f")(x).diff(x, 2) - 2*sp.Function("f")(x).diff(x) + sp.Function("f")(x), 4*sp.exp(x) + 2*x**2 + 8)).rhs
assert sp.simplify(L(d) - (4*sp.exp(x) + 2*x**2 + 8)) == 0
# superposición: cada parte por separado
assert sp.simplify(L(2*x**2*sp.exp(x)) - 4*sp.exp(x)) == 0 and sp.expand(L(2*x**2 + 8*x + 20) - (2*x**2 + 8)) == 0
assert sp.expand(sp.diff(ypv, x, 2) - 2*sp.diff(ypv, x) + ypv - sp.expand(4*sp.exp(x) + 2*x**2 + 8)) == 0
en_mdx(r"y_p=2x^2e^x+2x^2+8x+20", r"y=C_1e^x+C_2xe^x+2x^2e^x+2x^2+8x+20", r"2A=4\ \Rightarrow\ A=2", r"E=8-2B+2D=8-4+16=20", r"D=4B=8")
print("OK: recup 20/11/2025 verificado (ej1 15(π-2)/16, ej2 2π², ej3 x³+2xy²=C, ej4 yp=2x²eˣ+2x²+8x+20)")
