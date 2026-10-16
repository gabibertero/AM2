"""Recalcula con sympy el Recuperatorio 1° Parcial (20/11/2025): resultados e intermedios, y que el MDX diga lo mismo.
Uso: python3 tests/check_p1-todas-2025-11-rec.py"""
from pathlib import Path
import sympy as sp

MDX = (Path(__file__).resolve().parents[1] / "src/content/parciales/p1-todas-2025-11-rec.mdx").read_text()
def en_mdx(*ss):
    for s in ss: assert s in MDX, f"falta en el MDX: {s}"
R = sp.Rational
x, y, z, l, v0, t = sp.symbols("x y z lambda v0 theta", real=True)

# --- Ej 1: dominio
def en_dominio(p, q):
    return (p**2 - q**2 + 1 > 0) and (p**2 + q**2 <= 9) and (q**2 - p**2 + 4 > 0) and p != 0 and q != 0
assert en_dominio(1, 1) and en_dominio(-1, -1) and en_dominio(sp.sqrt(5), 2)         # (√5,2): borde de la circunferencia, entra
assert en_dominio(2, 1) and en_dominio(-2, 1)                                         # 4−1+1>0 ; 5≤9 ; 1−4+4=1>0
assert not en_dominio(-1, -2)                                                         # 1−4+1<0
assert not en_dominio(3, 0) and not en_dominio(0, 1) and not en_dominio(1, 0)         # ejes excluidos
assert not en_dominio(R(29, 10), R(1, 2))                                             # 0,25−8,41+4<0
assert not en_dominio(3, 1)                                                           # fuera del disco
# cortes de la circunferencia con cada hipérbola
assert {(s[x]**2, s[y]**2) for s in sp.solve([x**2 + y**2 - 9, y**2 - x**2 - 1], [x, y], dict=True)} == {(4, 5)}
assert {(s[x]**2, s[y]**2) for s in sp.solve([x**2 + y**2 - 9, x**2 - y**2 - 4], [x, y], dict=True)} == {(R(13, 2), R(5, 2))}
assert abs(float(sp.sqrt(R(13, 2))) - 2.55) < .005 and abs(float(sp.sqrt(R(5, 2))) - 1.58) < .005
en_mdx(r"x^2-y^2+1\gt0", r"x^2+y^2\le9", r"y^2-x^2+4\gt0", r"x^2=4,\ y^2=5", r"x^2=\tfrac{13}2,\ y^2=\tfrac52", r"x\ne0\ \wedge\ y\ne0")

# --- Ej 2: tiro oblicuo, v0=50, θ=45°, g=10, dv0=1%·50, dθ=3°=π/60
g = 10; H = v0**2*sp.sin(t)**2/(2*g); Rr = v0**2*sp.sin(2*t)/g; P = {v0: 50, t: sp.pi/4}
dv, dth = R(1, 100)*50, sp.pi/60; assert dv == R(1, 2) and sp.Rational(3, 180)*sp.pi == dth
assert H.subs(P) == R(125, 2) and Rr.subs(P) == 250
Hv, Ht = sp.simplify(sp.diff(H, v0).subs(P)), sp.simplify(sp.diff(H, t).subs(P)); assert (Hv, Ht) == (R(5, 2), 125)
assert (Hv*dv, Ht*dth) == (R(5, 4), 25*sp.pi/12)
dH = Hv*dv + Ht*dth; assert sp.simplify(dH - (R(5, 4) + 25*sp.pi/12)) == 0 and abs(float(dH) - 7.795) < 1e-3
assert abs(float(R(5, 4)) + float(25*sp.pi/12) - 7.79) < .005
EH = dH/H.subs(P)*100; assert abs(float(EH) - 12.47) < .01
Rv, Rt = sp.simplify(sp.diff(Rr, v0).subs(P)), sp.simplify(sp.diff(Rr, t).subs(P)); assert (Rv, Rt) == (10, 0)
dR = Rv*dv + Rt*dth; assert dR == 5 and dR/Rr.subs(P)*100 == 2
# comprobación: incremento exacto
dH_real = H.subs({v0: R(101, 2), t: sp.pi/4 + sp.pi/60}) - H.subs(P); assert abs(float(dH_real) - 7.9206) < 1e-3
assert abs(float(dH) - float(dH_real))/float(dH_real) < .02
dR_real = Rr.subs({v0: R(101, 2), t: sp.pi/4 + sp.pi/60}) - Rr.subs(P); assert abs(float(dR_real) - 3.628) < 1e-2
# DISCREPANCIA con el escaneo (p.3): el profe escribe dH = 5/2 + 125π/60 ≈ 9 y E% ≈ 14,4 ; aquí 5/4 + 25π/12 (se perdió dv0 = 1/2)
dH_prof = R(5, 2) + 125*sp.pi/60; assert abs(float(dH_prof) - 9.05) < .01 and abs(float(dH_prof/H.subs(P)*100) - 14.5) < .1
assert dH_prof - dH == R(5, 4) and abs(float(dH_real) - float(dH_prof)) > 1                # el valor del profe queda lejos del incremento real
assert 125*sp.pi/60 == 25*sp.pi/12
en_mdx(r"dH=\frac54+\frac{25\pi}{12}\approx1{,}25+6{,}54=7{,}79", r"dR=10\cdot\frac12+0\cdot\frac\pi{60}=5", r"\frac5{250}\cdot100=2\%",
       r"H=\frac{50^2\cdot\frac12}{2\cdot10}=\frac{1250}{20}=\frac{125}2=62{,}5", r"d\theta=3^\circ=\frac{3\pi}{180}=\frac\pi{60}", r"\Delta H=H(50{,}5;\,48^\circ)-H(50;\,45^\circ)\approx7{,}92", r"dH=\frac52+\frac{125\pi}{60}\approx9")

# --- Ej 3: f = ln√(5x²−4y²), P(4,5)
u = 5*x**2 - 4*y**2; Pp = {x: 4, y: 5}
assert u.subs(Pp) == -20                                       # P no está en el dominio de ln√u (u<0): se deriva formalmente
f = sp.log(sp.sqrt(u)); fh = sp.log(sp.Abs(u))/2                # versión definida en P: ½ ln|u|
fx = sp.simplify(sp.diff(sp.log(u)/2, x)); fy = sp.simplify(sp.diff(sp.log(u)/2, y))
assert sp.simplify(fx - 5*x/u) == 0 and sp.simplify(fy + 4*y/u) == 0
gx, gy = (5*x/u).subs(Pp), (-4*y/u).subs(Pp); assert (gx, gy) == (-1, 1)
# misma derivada con la versión con módulo (para u<0): d/dx ½ln(−u) = ½·(−u_x)/(−u)
assert sp.simplify(sp.diff(sp.log(-u)/2, x).subs(Pp) - gx) == 0 and sp.simplify(sp.diff(sp.log(-u)/2, y).subs(Pp) - gy) == 0
al = sp.symbols("alpha", real=True)
assert sp.solve(sp.Eq(gx*sp.cos(al) + gy*sp.sin(al), 0), al) == [sp.pi/4]     # y su opuesta α+π (tg α = 1 tiene dos soluciones en [0, 2π))
assert sp.solve(sp.Eq(sp.tan(al), 1), al) == [sp.pi/4]
assert sp.sqrt(gx**2 + gy**2) == sp.sqrt(2) and abs(float(sp.atan2(gy, gx))*180/float(sp.pi) - 135) < 1e-9
for a_ in (sp.pi/4, 5*sp.pi/4): assert sp.simplify(gx*sp.cos(a_) + gy*sp.sin(a_)) == 0
hh = sp.Float("1e-6"); q = (fh.subs({x: 4 + hh*sp.cos(sp.pi/4), y: 5 + hh*sp.sin(sp.pi/4)}) - fh.subs(Pp))/hh; assert abs(float(q)) < 1e-4
assert gx*1 + gy*1 == 0                                         # ⊥ (1,1)
en_mdx(r"f'_x(P)=\frac{5\cdot4}{-20}=-1", r"\nabla f(P)=-\vec i+\vec j", r"\|\nabla f\|=\sqrt{(-1)^2+1^2}=\sqrt2", r"\alpha=45^\circ\quad\text{o}\quad\alpha=45^\circ+180^\circ=225^\circ", r"5\cdot16-4\cdot25=-20")

# --- Ej 4: Lagrange, V = xyz, 6x+3y+2z=18
F = x*y*z - l*(6*x + 3*y + 2*z - 18)
s4 = [s for s in sp.solve([sp.diff(F, v) for v in (x, y, z, l)], [x, y, z, l], dict=True) if s[x] > 0 and s[y] > 0 and s[z] > 0]
assert len(s4) == 1 and (s4[0][x], s4[0][y], s4[0][z]) == (1, 2, 3) and s4[0][l] == 1
assert (2*3/6, 1*3/3, 1*2/2) == (1, 1, 1)                      # λ = yz/6 = xz/3 = xy/2
V = 1*2*3; S = 2*(1*2 + 2*3 + 1*3); assert V == 6 and S == 22 and 2 + 6 + 3 == 11
# comprobación 1: sustitución z = (18−6x−3y)/2
Vs = x*y*(18 - 6*x - 3*y)/2
assert sp.diff(Vs, x).subs({x: 1, y: 2}) == 0 and sp.diff(Vs, y).subs({x: 1, y: 2}) == 0
vxx, vyy, vxy = [e.subs({x: 1, y: 2}) for e in (sp.diff(Vs, x, 2), sp.diff(Vs, y, 2), sp.diff(Vs, x, y))]
assert (vxx, vyy, vxy) == (-12, -3, -3) and vxx*vyy - vxy**2 == 27
assert Vs.subs({x: 1, y: 2}) == 6
# comprobación 2: media geométrica, 6x·3y·2z = 36xyz con suma 18 → cada uno 6
assert 6*1 == 3*2 == 2*3 == 6 and 36*V == 6*6*6
en_mdx(r"6x+6x+6x=18\ \Rightarrow\ 18x=18\ \Rightarrow\ x=1", r"S=2(2+6+3)=2\cdot11=22\ \text{m}^2", r"H=36-9=27\gt0")
print("OK p1-todas-2025-11-rec")
