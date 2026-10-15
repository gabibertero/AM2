"""Recalcula con sympy el 1V1 (temas A y B): resultados e intermedios, y que el MDX diga lo mismo.
Uso: python3 tests/check_1v1.py"""
from pathlib import Path
import sympy as sp

P_ = Path(__file__).resolve().parents[1] / "src/content/parciales"
MA, MB = (P_ / "1v1-2025-11-13-a.mdx").read_text(), (P_ / "1v1-2025-11-13-b.mdx").read_text()
def en(M, *ss):
    for s in ss: assert s in M, f"falta en el MDX: {s}"
R, I = sp.Rational, sp.integrate
x, y, z, r, th, t, u = sp.symbols("x y z r theta t u", real=True)
pi, s2 = sp.pi, sp.sqrt(2)
def eq(a, b): assert sp.simplify(a - b) == 0, (a, b)

# ================= TEMA A =================
# --- Ej 1: V = ∬(4-2x) dA, cuarto de círculo r<=2
a1 = I(4*r, (r, 0, 2)); b1 = I(2*r**2*sp.cos(th), (r, 0, 2))
assert a1 == 8; eq(b1, R(16, 3)*sp.cos(th))
assert I(8, (th, 0, pi/2)) == 4*pi and I(R(16, 3)*sp.cos(th), (th, 0, pi/2)) == R(16, 3)
VA1 = I(I((4 - 2*r*sp.cos(th))*r, (r, 0, 2)), (th, 0, pi/2)); eq(VA1, 4*pi - R(16, 3)); eq(VA1, 4*(pi - R(4, 3)))
V3 = I(I(I(r, (z, r*sp.cos(th), 4 - r*sp.cos(th))), (r, 0, 2)), (th, 0, pi/2)); eq(V3, VA1)      # triple en cilíndricas
assert sp.solve(sp.Eq(x, 4 - x), x) == [2]
carte = I((4 - 2*x)*sp.sqrt(4 - x**2), (x, 0, 2)); eq(carte, VA1)                                  # comprobación cartesiana
assert I(sp.sqrt(4 - x**2), (x, 0, 2)) == pi and I(x*sp.sqrt(4 - x**2), (x, 0, 2)) == R(8, 3)
assert abs(float(VA1) - 7.23) < .01
en(MA, r"V=4\pi-\frac{16}{3}=4\Big(\pi-\frac43\Big)", r"\int_0^2 4r\,dr=\big[2r^2\big]_0^2=8", r"\frac{16}{3}\cos\theta", r"4\pi-\frac{16}{3}\approx 7{,}23", r"4\cdot\pi-2\cdot\frac83")

# --- Ej 2: IT = ∫cosθ ∫r² ∫z
assert I(z, (z, 0, 2*sp.sqrt(1 - r**2))) == 2*(1 - r**2) or sp.simplify(I(z, (z, 0, 2*sp.sqrt(1 - r**2))) - 2*(1 - r**2)) == 0
assert I(r**2*2*(1 - r**2), (r, 0, 1)) == R(4, 15) and R(1, 3) - R(1, 5) == R(2, 15)
eq(I(sp.cos(th), (th, 0, pi/4)), s2/2)
ITA = I(I(I(r**2*sp.cos(th)*z, (z, 0, 2*sp.sqrt(1 - r**2))), (r, 0, 1)), (th, 0, pi/4)); eq(ITA, 2*s2/15)
assert sp.Eq(4*x**2 + 4*y**2 + z**2, 4).subs({x: r*sp.cos(th), y: r*sp.sin(th)}).lhs.subs(z, 2*sp.sqrt(1 - r**2)).simplify() == 4
# otro orden: z afuera
inner = I(r**2, (r, 0, sp.sqrt(1 - z**2/4))); eq(inner, (1 - z**2/4)**R(3, 2)/3)
assert I(z*(1 - z**2/4)**R(3, 2), (z, 0, 2)) == R(4, 5)
eq(s2/2*R(1, 3)*R(4, 5), ITA); assert abs(float(ITA) - 0.1886) < 1e-3
en(MA, r"\frac{4}{15}", r"\frac{\sqrt2}{2}", r"IT=\frac{2\sqrt2}{15}\approx 0{,}189", r"2(1-r^2)", r"\frac{\sqrt2}{2}\cdot\frac13\cdot\frac45")

# --- Ej 3
P, Q = 2*x*y**2, -3*x*y
Pc, Qc = P.subs(y, sp.sqrt(2 - x**2)), Q.subs(y, sp.sqrt(2 - x**2))
f = sp.simplify(Pc + Qc*sp.diff(sp.sqrt(2 - x**2), x)); eq(f, 4*x - 2*x**3 + 3*x**2)               # P dx + Q dy sobre C1 (solo depende de x)
assert sp.expand(2*x*(2 - x**2)) == 4*x - 2*x**3 and 3*x**2 == -3*x*(-x)
Gx = I(4*x - 2*x**3 + 3*x**2, x); eq(Gx, 2*x**2 - x**4/2 + x**3)
assert (Gx.subs(x, -1), Gx.subs(x, 1)) == (R(1, 2), R(5, 2)); IC1 = I(4*x - 2*x**3 + 3*x**2, (x, 1, -1)); assert IC1 == -2
f2 = sp.expand(P.subs(y, -x) + Q.subs(y, -x)*(-1)); assert f2 == 2*x**3 - 3*x**2
G2 = I(f2, x); assert (G2.subs(x, 1), G2.subs(x, -1)) == (-R(1, 2), R(3, 2)); IC2 = I(f2, (x, -1, 1)); assert IC2 == -2 and IC1 + IC2 == -4
xt, yt = s2*sp.cos(th), s2*sp.sin(th)                                                               # comprobación: C1 con θ
g = sp.simplify(P.subs({x: xt, y: yt})*sp.diff(xt, th) + Q.subs({x: xt, y: yt})*sp.diff(yt, th))
assert I(g, (th, -pi/4, 3*pi/4)) == -2 or sp.simplify(I(g, (th, -pi/4, 3*pi/4)) + 2) == 0
assert sp.simplify(sp.diff(Q, x) - sp.diff(P, y) + 3*y + 4*x*y) == 0
rad = I(-(3*r**2*sp.sin(th) + 4*r**3*sp.sin(th)*sp.cos(th)), (r, 0, s2)); eq(rad, -(2*s2*sp.sin(th) + 4*sp.sin(th)*sp.cos(th)))
assert sp.simplify(I(2*s2*sp.sin(th), (th, -pi/4, 3*pi/4)) - 4) == 0 and sp.simplify(I(4*sp.sin(th)*sp.cos(th), (th, -pi/4, 3*pi/4))) == 0
GA = I(rad, (th, -pi/4, 3*pi/4)); eq(GA, -4)
en(MA, r"-2-2=-4", r"IC_1=-2", r"IC_2=-2", r"4x-2x^3+3x^2", r"\frac12-\frac52=-2", r"-\int_{-\pi/4}^{3\pi/4}\big(2\sqrt2\,\sin\theta+4\sin\theta\cos\theta\big)\,d\theta",
   r"\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}=-3y-4xy", r"2x^3-3x^2")

# --- Ej 4: exacta
P4, Q4 = sp.sin(y) + y*sp.sin(x), x*sp.cos(y) - sp.cos(x) + 3*y**2 - 1
eq(sp.diff(P4, y), sp.cos(y) + sp.sin(x)); eq(sp.diff(Q4, x), sp.cos(y) + sp.sin(x))
uu = I(P4, x); eq(uu, x*sp.sin(y) - y*sp.cos(x))
phi = I(sp.simplify(Q4 - sp.diff(uu, y)), y); eq(phi, y**3 - y)
U = x*sp.sin(y) - y*sp.cos(x) + y**3 - y
eq(sp.diff(U, x), P4); eq(sp.diff(U, y), Q4)
yf = sp.Function("yy"); dd = sp.diff(U.subs(y, yf(x)), x)
eq(dd, P4.subs(y, yf(x)) + Q4.subs(y, yf(x))*sp.diff(yf(x), x))                                    # derivación implícita
en(MA, r"\cos y+\sin x", r"u=x\sin y-y\cos x+\varphi(y)", r"\varphi'(y)=3y^2-1\ \Rightarrow\ \varphi(y)=y^3-y", r"x\sin y-y\cos x+y^3-y=C",
   r"\sin y+y\sin x+\big(x\cos y-\cos x+3y^2-1\big)\,y'=0")

# --- Ej 5
rc = sp.Symbol("rc"); assert set(sp.solve(rc**2 + 1, rc)) == {-sp.I, sp.I}
A, B, C1, C2 = sp.symbols("A B C1 C2")
yp = x*(A*sp.sin(x) + B*sp.cos(x))
eq(sp.diff(yp, x), A*sp.sin(x) + B*sp.cos(x) + x*(A*sp.cos(x) - B*sp.sin(x)))
eq(sp.diff(yp, x, 2), 2*A*sp.cos(x) - 2*B*sp.sin(x) - x*(A*sp.sin(x) + B*sp.cos(x)))
eq(sp.diff(yp, x, 2) + yp, 2*A*sp.cos(x) - 2*B*sp.sin(x))
sol = sp.solve([2*A - 1, -2*B - 1], [A, B]); assert sol == {A: R(1, 2), B: -R(1, 2)}
ypv = yp.subs(sol); eq(ypv, x/2*(sp.sin(x) - sp.cos(x)))
eq(sp.diff(ypv, x, 2) + ypv, sp.sin(x) + sp.cos(x))                                                 # sustitución
sol0 = sp.simplify(sp.diff(A*sp.sin(x) + B*sp.cos(x), x, 2) + A*sp.sin(x) + B*sp.cos(x)); assert sol0 == 0   # sin x: no sirve
yg = C1*sp.sin(x) + C2*sp.cos(x) + ypv; eq(sp.diff(yg, x, 2) + yg, sp.sin(x) + sp.cos(x))
fz = sp.Function("f"); ds = sp.dsolve(sp.Eq(fz(x).diff(x, 2) + fz(x), sp.sin(x) + sp.cos(x))).rhs
eq(sp.diff(ds, x, 2) + ds, sp.sin(x) + sp.cos(x))
en(MA, r"y_p=x\big(A\sin x+B\cos x\big)", r"y_p''+y_p=2A\cos x-2B\sin x", r"A=\tfrac12", r"B=-\tfrac12",
   r"y=C_1\sin x+C_2\cos x+\frac{x}{2}\sin x-\frac{x}{2}\cos x")

# ================= TEMA B =================
# --- Ej 1: V = ∬(6-2y) dA, r<=3
a1 = I(6*r, (r, 0, 3)); b1 = I(2*r**2*sp.sin(th), (r, 0, 3)); assert a1 == 27; eq(b1, 18*sp.sin(th))
assert I(27, (th, 0, pi/2)) == 27*pi/2 and I(18*sp.sin(th), (th, 0, pi/2)) == 18
VB1 = I(I((6 - 2*r*sp.sin(th))*r, (r, 0, 3)), (th, 0, pi/2)); eq(VB1, 27*pi/2 - 18); eq(VB1, 18*(3*pi/4 - 1))
eq(2*I(I((3 - r*sp.sin(th))*r, (r, 0, 3)), (th, 0, pi/2)), VB1)                                    # forma del profe: 2∬(3−y)
eq(I(I(r, (z, r*sp.sin(th), 6 - r*sp.sin(th))), (r, 0, 3)), 27 - 18*sp.sin(th))                  # integral interna en r, forma triple
eq(I(I(I(r, (z, r*sp.sin(th), 6 - r*sp.sin(th))), (r, 0, 3)), (th, 0, pi/2)), VB1)
assert sp.solve(sp.Eq(y, 6 - y), y) == [3]
carte = I((6 - 2*y)*sp.sqrt(9 - y**2), (y, 0, 3)); eq(carte, VB1)
assert I(sp.sqrt(9 - y**2), (y, 0, 3)) == 9*pi/4 and I(y*sp.sqrt(9 - y**2), (y, 0, 3)) == 9; assert abs(float(VB1) - 24.41) < .01
en(MB, r"V=\frac{27\pi}{2}-18=18\Big(\frac{3\pi}{4}-1\Big)", r"\int_0^3 6r\,dr=\big[3r^2\big]_0^3=27", r"18\sin\theta", r"\frac{27\pi}{2}-18\approx 24{,}41", r"6\cdot\frac{9\pi}{4}-2\cdot9")

# --- Ej 2
assert sp.simplify(I(z, (z, 0, 3*sp.sqrt(1 - r**2))) - R(9, 2)*(1 - r**2)) == 0
assert I(r**2*R(9, 2)*(1 - r**2), (r, 0, 1)) == R(3, 5)
eq(I(sp.sin(th), (th, 0, pi/4)), 1 - s2/2)
ITB = I(I(I(r**2*sp.sin(th)*z, (z, 0, 3*sp.sqrt(1 - r**2))), (r, 0, 1)), (th, 0, pi/4)); eq(ITB, R(3, 5)*(1 - s2/2)); eq(ITB, (6 - 3*s2)/10)
eq(ITB, -R(3, 5)*(s2/2 - 1))
assert I(z*(1 - z**2/9)**R(3, 2), (z, 0, 3)) == R(9, 5); eq(R(1, 3)*R(9, 5)*(1 - s2/2), ITB); assert abs(float(ITB) - 0.1757) < 1e-3
en(MB, r"\frac{9}{2}(1-r^2)", r"\frac{3}{5}", r"1-\frac{\sqrt2}{2}", r"IT=\frac35\Big(1-\frac{\sqrt2}{2}\Big)=\frac{6-3\sqrt2}{10}\approx 0{,}176", r"\frac13-\frac15=\frac{5}{15}-\frac{3}{15}=\frac{2}{15}")

# --- Ej 3
P, Q = 2*x + y**2, 3*x*y
ye = 2*sp.sqrt(1 - x**2)
assert sp.simplify(P.subs(y, ye) - (2*x + 4*(1 - x**2))) == 0
assert sp.simplify(Q.subs(y, ye)*sp.diff(ye, x) + 12*x**2) == 0
fB = sp.expand(2*x + 4*(1 - x**2) - 12*x**2); assert fB == -16*x**2 + 2*x + 4
GB = I(fB, x); eq(GB, -16*x**3/3 + x**2 + 4*x); assert (GB.subs(x, -1), GB.subs(x, 1)) == (R(7, 3), -R(1, 3))
IC1 = I(fB, (x, 1, -1)); assert IC1 == R(8, 3); IC2 = I(2*x, (x, -1, 1)); assert IC2 == 0
assert sp.diff(Q, x) - sp.diff(P, y) == y
inn = I(y, (y, 0, ye)); eq(inn, 2*(1 - x**2)); GB_ = I(inn, (x, -1, 1)); assert GB_ == R(8, 3) == IC1 + IC2
xt, yt = sp.cos(t), 2*sp.sin(t)                                                                     # comprobación: C1 con t
gt = sp.simplify(P.subs({x: xt, y: yt})*sp.diff(xt, t) + Q.subs({x: xt, y: yt})*sp.diff(yt, t))
assert sp.simplify(I(gt, (t, 0, pi)) - R(8, 3)) == 0
en(MB, r"IC_2=0", r"(2x+4-16x^2)", r"2\cdot\frac43=\frac83", r"\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}=3y-2y=y", r"2(1-x^2)", r"\frac73-\Big(-\frac13\Big)=\frac83",
   r"P\,x'+Q\,y'=-2\sin t\cos t-4\sin^3t+12\sin t\cos^2t", r"-4\cdot\tfrac43=-\tfrac{16}{3}", r"12\Big[-\tfrac{\cos^3t}{3}\Big]_0^\pi=12\cdot\tfrac23=8")

# --- Ej 4: Bernoulli
n = -R(1, 2); assert 1 - n == R(3, 2)
zf = sp.Function("zz"); X = sp.symbols("X", positive=True)
v = X**3; assert sp.simplify(sp.diff(v, X) - 3*v/X) == 0
uf = I(6/X, X); eq(uf, 6*sp.log(X)); eq(sp.diff(uf*v, X) - 3*uf*v/X, 6*X**2)
Zs = X**3*(6*sp.log(X) + C1); eq(sp.diff(Zs, X) - 3*Zs/X, 6*X**2)
yy_ = sp.Function("yy")(X); ysol = sp.symbols("k", positive=True)
Yn = (X**3*(6*sp.log(X) + 5))**R(2, 3)                                                              # C=5 (6lnX+5>0 para X>=1)
chk = sp.diff(Yn, X) - 2*Yn/X - 4*X**2/sp.sqrt(Yn); assert abs(float(chk.subs(X, 2))) < 1e-12 and abs(float(chk.subs(X, 3.7))) < 1e-12
eq(sp.diff(Yn, X) - 2*Yn/X, R(2, 3)*(X**3*(6*sp.log(X) + 5))**(-R(1, 3))*(sp.diff(Zs.subs(C1, 5), X) - 3*Zs.subs(C1, 5)/X))
fz2 = sp.Function("w"); dsB = sp.dsolve(sp.Eq(fz2(X).diff(X) - 2*fz2(X)/X, 4*X**2/sp.sqrt(fz2(X))), hint="Bernoulli")   # dsolve independiente
assert sp.simplify(dsB[0].rhs.subs(C1, 5) - Yn) == 0                                                   # dsolve da la misma familia (C=5)
en(MB, r"n=-\tfrac12", r"\tfrac32y^{1/2}", r"z'-\frac3x\,z=6x^2", r"v=x^3", r"u=6\ln x+C", r"y^{3/2}=x^3\,(6\ln x+C)",
   r"y=\big[x^3\,(6\ln x+C)\big]^{2/3}")

# --- Ej 5
assert sp.solve(r**2 + r, r) == [-1, 0]
A, B, D = sp.symbols("A B D")
yp = A*x**2 + B*x + D*sp.exp(x)
eq(sp.diff(yp, x), 2*A*x + B + D*sp.exp(x)); eq(sp.diff(yp, x, 2), 2*A + D*sp.exp(x))
lhs = sp.expand(sp.diff(yp, x, 2) + sp.diff(yp, x)); eq(lhs, 2*A*x + (2*A + B) + 2*D*sp.exp(x))
sol = sp.solve([2*A - 1, 2*A + B, 2*D - 1], [A, B, D]); assert sol == {A: R(1, 2), B: -1, D: R(1, 2)}
ypv = yp.subs(sol); eq(ypv, x**2/2 - x + sp.exp(x)/2)
eq(sp.diff(ypv, x), x - 1 + sp.exp(x)/2); eq(sp.diff(ypv, x, 2), 1 + sp.exp(x)/2); eq(sp.diff(ypv, x, 2) + sp.diff(ypv, x), x + sp.exp(x))
yg = C1 + C2*sp.exp(-x) + ypv; eq(sp.diff(yg, x, 2) + sp.diff(yg, x), x + sp.exp(x))
ds = sp.dsolve(sp.Eq(fz(x).diff(x, 2) + fz(x).diff(x), x + sp.exp(x))).rhs; eq(sp.diff(ds, x, 2) + sp.diff(ds, x), x + sp.exp(x))
# si no se multiplicara por x: A x + B no alcanza (r=0 es raíz)
assert sp.simplify(sp.diff(A*x + B, x, 2) + sp.diff(A*x + B, x)) == A
en(MB, r"y_p=Ax^2+Bx+De^x", r"2Ax+(2A+B)+2De^x=x+e^x", r"A=\tfrac12", r"B=-2A=-1", r"D=\tfrac12", r"y=C_1+C_2e^{-x}+\frac{x^2}{2}-x+\frac12e^x")

print("OK: 1V1 A y B verificados")
