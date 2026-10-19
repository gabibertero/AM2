"""Recalcula con sympy el 1º Parcial 2S2 Jul-22 (01/07/2022): resultados e intermedios, y que el MDX diga lo mismo.
Uso: python3 tests/check_p1-2s2-2022-07.py"""
from pathlib import Path
import sympy as sp

MDX = (Path(__file__).resolve().parents[1] / "src/content/parciales/p1-2s2-2022-07.mdx").read_text()
def en_mdx(*ss):
    for s in ss: assert s in MDX, f"falta en el MDX: {s}"
R = sp.Rational
x, y, z, r, h, lam = sp.symbols("x y z r h lambda", real=True)

# --- Ej 1 (enunciado literal): 1 < x²+y² < 9
def en_dom(p, q): return (p**2 + q**2 - 1 > 0) and (9 - p**2 - q**2 > 0)
assert en_dom(2, 0) and en_dom(0, -2)
assert not en_dom(0, 0) and not en_dom(4, 0) and not en_dom(3, 0) and not en_dom(1, 0)
# la resolución oficial usa 9−x²+y² (hipérbola): el punto (2,2) lo separa del enunciado literal
assert en_dom(0, 2.9) and (9 - 0**2 + 2.9**2 > 0)              # coinciden cerca del origen
assert not en_dom(0, 4) and (9 - 0 + 16 > 0)                    # (0,4): fuera con el enunciado, "dentro" de la hipérbola de la oficial
en_mdx(r"x^2+y^2-1\gt0", r"9-x^2-y^2\gt0", r"1\lt x^2+y^2\lt9")

# --- Ej 2: cono r=1, h=2, dr=0.05, dh=0.1
V = sp.pi*r**2*h/3; G = sp.sqrt(r**2 + h**2); S = sp.pi*r**2 + sp.pi*r*G; P = {r: 1, h: 2}; dr, dh = R(5, 100), R(10, 100)
assert (R(5, 100)*1, R(5, 100)*2) == (dr, dh) and V.subs(P) == 2*sp.pi/3
Vr, Vh = sp.diff(V, r).subs(P), sp.diff(V, h).subs(P); assert (Vr, Vh) == (4*sp.pi/3, sp.pi/3)
assert (Vr*dr, Vh*dh) == (sp.pi/15, sp.pi/30)
dV = Vr*dr + Vh*dh; assert dV == sp.pi/10 and abs(float(dV) - 0.31416) < 1e-4 and dV/V.subs(P)*100 == 15
Sv = sp.simplify(S.subs(P)); assert sp.simplify(Sv - sp.pi*(1 + sp.sqrt(5))) == 0 and abs(float(Sv) - 10.1665) < 1e-3
assert sp.simplify(sp.sqrt(5)*sp.pi - Sv) != 0                   # √5π (oficial) no es S
Sr, Sh = sp.diff(S, r).subs(P), sp.diff(S, h).subs(P)
assert sp.simplify(Sr - (2*sp.pi + sp.pi*sp.sqrt(5) + sp.pi/sp.sqrt(5))) == 0 and sp.simplify(Sh - 2*sp.pi/sp.sqrt(5)) == 0
dS = sp.simplify(Sr*dr + Sh*dh); assert sp.simplify(dS - sp.pi*(1 + sp.sqrt(5))/10) == 0 and abs(float(dS) - 1.0167) < 1e-3
assert sp.simplify(dS/Sv*100 - 10) == 0
# desarrollo término a término del MDX
a, b, c, d_ = sp.pi/10, sp.pi*sp.sqrt(5)/20, sp.pi*sp.sqrt(5)/100, 2*sp.pi*sp.sqrt(5)/5*R(1, 10)
assert sp.simplify(a + b + c + d_ - dS) == 0 and sp.simplify(d_ - 4*sp.pi*sp.sqrt(5)/100) == 0
# error oficial (factor 2 en el último término): daría otro valor
dS_of = (2*sp.pi + sp.pi*sp.sqrt(5) + sp.pi*sp.sqrt(5)/5 + 2*sp.pi*sp.sqrt(5)/5)*R(5, 100); assert sp.simplify(dS_of - dS) != 0
# comprobación: cono semejante y valor exacto
assert abs(1.05**3 - 1 - 0.157625) < 1e-9 and abs(1.05**2 - 1 - 0.1025) < 1e-12
Sn = S.subs({r: R(105, 100), h: R(21, 10)}); assert abs(float(Sn - Sv) - 1.0420) < 1e-3 and sp.simplify(Sn - R(105, 100)**2*Sv) == 0
en_mdx(r"dV=\frac\pi{10}\ \text{m}^3\approx0{,}314", r"\pi+\pi\sqrt5=\pi\,(1+\sqrt5)", r"dS=0{,}1\pi\,(1+\sqrt5)=\frac{\pi\,(1+\sqrt5)}{10}", r"E\%_S=\frac{dS}S\cdot100", r"=10\%", r"=15\%")

# --- Ej 3: x²+y²+2/z²−ln(xyz)=0, M(1,1,1)
Fz = x**2 + y**2 + 2/z**2 - sp.log(x*y*z); M = {x: 1, y: 1, z: 1}
assert Fz.subs(M) == 4                                           # M NO cumple la ecuación (4 ≠ 0)
Fx, Fy, Fzz = [sp.simplify(sp.diff(Fz, v)) for v in (x, y, z)]
assert (sp.simplify(Fx - (2*x - 1/x)), sp.simplify(Fy - (2*y - 1/y)), sp.simplify(Fzz - (-4/z**3 - 1/z))) == (0, 0, 0)
fx, fy, fz = Fx.subs(M), Fy.subs(M), Fzz.subs(M); assert (fx, fy, fz) == (1, 1, -5)
assert (-fx/fz, -fy/fz) == (R(1, 5), R(1, 5))
zx = sp.symbols("zx"); assert sp.solve(2 - 4*zx - (1 + zx), zx) == [R(1, 5)]   # derivando toda la ecuación
en_mdx(r"F'_x(M)=2-1=1", r"F'_z(M)=-4-1=-5", r"\frac{\partial z}{\partial x}=-\frac{F'_x}{F'_z}=-\frac{1}{-5}=\frac15", r"2-4\,z'_x=1+z'_x")

# --- Ej 4: z = x³ + 3x/y + 4y², P(1,−1), α=π/3
f4 = x**3 + 3*x/y + 4*y**2; P4 = {x: 1, y: -1}
zx_, zy_ = sp.diff(f4, x), sp.diff(f4, y); assert (zx_, zy_) == (3*x**2 + 3/y, -3*x/y**2 + 8*y)
gx, gy = zx_.subs(P4), zy_.subs(P4); assert (gx, gy) == (0, -11)
ds = gx*sp.cos(sp.pi/3) + gy*sp.sin(sp.pi/3); assert sp.simplify(ds + 11*sp.sqrt(3)/2) == 0 and abs(float(ds) + 9.5263) < 1e-3
assert sp.sqrt(gx**2 + gy**2) == 11 and sp.atan2(gy, gx) == -sp.pi/2 and (float(sp.atan2(gy, gx))*180/3.141592653589793) % 360 == 270
hh = sp.Float("1e-7"); q = (f4.subs({x: 1 + hh*R(1, 2), y: -1 + hh*sp.sqrt(3)/2}) - f4.subs(P4))/hh; assert abs(float(q) + 9.5263) < 1e-3
assert abs(float(ds)) <= 11
en_mdx(r"z'_x(P)=3-3=0", r"z'_y(P)=-3-8=-11", r"-\frac{11\sqrt3}2\approx-9{,}53", r"\nabla z(P)=0\,\vec i-11\,\vec j=-11\,\vec j", r"\theta=270^\circ=\frac{3\pi}2")

# --- Ej 5: z = x²/2 + xy + y³/3
f5 = x**2/2 + x*y + y**3/3
cp = {(s[x], s[y]) for s in sp.solve([sp.diff(f5, x), sp.diff(f5, y)], [x, y], dict=True)}; assert cp == {(0, 0), (-1, 1)}
fxx, fyy, fxy = sp.diff(f5, x, 2), sp.diff(f5, y, 2), sp.diff(f5, x, y); assert (fxx, fyy, fxy) == (1, 2*y, 1)
H5 = sp.expand(fxx*fyy - fxy**2); assert H5 == 2*y - 1 and H5.subs({y: 0}) == -1 and H5.subs({y: 1}) == 1
assert f5.subs({x: -1, y: 1}) == -R(1, 6) and f5.subs({x: 0, y: 0}) == 0
t = sp.symbols("t"); assert sp.expand(f5.subs({x: t, y: -t})) == -t**2/2 - t**3/3                 # comprobación por trayectoria
assert 1 - 4*R(1, 2)*1 == -1
en_mdx(r"H(x,y)=1\cdot2y-1^2=2y-1", r"H=-1\lt0", r"H=2-1=1\gt0", r"z(-1,1)=\frac{(-1)^2}2+(-1)\cdot1+\frac{1^3}3=\frac12-1+\frac13=-\frac16")

# --- Ej 6: mínima distancia al origen del plano 2x+y+3z=42
f6 = x**2 + y**2 + z**2; g6 = 2*x + y + 3*z - 42; F6 = f6 - lam*g6
sol = sp.solve([sp.diff(F6, v) for v in (x, y, z, lam)], [x, y, z, lam], dict=True); assert len(sol) == 1
s6 = sol[0]; assert (s6[x], s6[y], s6[z], s6[lam]) == (6, 3, 9, 6)
assert 2 + R(1, 2) + 3*R(3, 2) == 7 and R(14, 2) == 7
d6 = sp.sqrt(f6.subs(s6)); assert d6 == 3*sp.sqrt(14) and abs(float(d6) - 11.2250) < 1e-3
assert sp.Integer(42)/sp.sqrt(4 + 1 + 9) == 3*sp.sqrt(14)
# el valor del escaneo (x=21) no está en el plano de manera óptima: da una distancia mayor
d_of = sp.sqrt(21**2 + R(21, 2)**2 + R(63, 2)**2); assert sp.simplify(d_of - 21*sp.sqrt(14)/2) == 0 and float(d_of) > float(d6)
assert 2*21 + R(21, 2) + 3*R(63, 2) != 42                       # (21, 21/2, 63/2) NO está en el plano
en_mdx(r"2\lambda+\frac12\lambda+\frac92\lambda=42", r"7\lambda=42\ \Rightarrow\ \lambda=6", r"x=6,\qquad y=3,\qquad z=9", r"d=3\sqrt{14}\approx11{,}22")
print("OK p1-2s2-2022-07")
