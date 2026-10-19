"""Recalcula con sympy el 1º Parcial 1R3 (29/9/2023), grupos A y B: resultados e intermedios, y que el MDX diga lo mismo.
Uso: python3 tests/check_p1-1r3-2023-09.py"""
from pathlib import Path
import sympy as sp

RAIZ = Path(__file__).resolve().parents[1] / "src/content/parciales"
MA = (RAIZ / "p1-1r3-2023-09-a.mdx").read_text()
MB = (RAIZ / "p1-1r3-2023-09-b.mdx").read_text()
def en_a(*ss):
    for s in ss: assert s in MA, f"falta en A: {s}"
def en_b(*ss):
    for s in ss: assert s in MB, f"falta en B: {s}"
R = sp.Rational
x, y, z, l, t, m, a, u, v = sp.symbols("x y z lambda t m a u v", real=True)
def cociente(f, P, s, h=sp.Float("1e-9")):
    return (f.subs({x: P[0] + h*s[0], y: P[1] + h*s[1]}) - f.subs({x: P[0], y: P[1]}))/h

# ================= GRUPO A =================
# --- Ej 1: x²/4 + y² > 1 ∧ x² + y²/16 < 1 ---
def en_dom_a(p, q): return (R(p)**2/4 + R(q)**2 > 1) and (R(p)**2 + R(q)**2/16 < 1)
assert en_dom_a(0, 2) and en_dom_a(0, -3) and en_dom_a(R(1, 2), 1)
assert not en_dom_a(0, R(1, 2)) and not en_dom_a(R(3, 2), 0) and not en_dom_a(0, 4) and not en_dom_a(0, 1)
sol = sp.solve([x**2/4 + y**2 - 1, x**2 + y**2/16 - 1], [x, y], dict=True)
assert len(sol) == 4 and all(s[y]**2 == R(16, 21) and s[x]**2 == R(20, 21) for s in sol)
assert sp.solve(sp.Eq((1 - y**2/16)/4 + y**2, 1), y**2) == [R(16, 21)] and R(63, 64) == 1 - R(1, 64)
assert abs(float(4/sp.sqrt(21)) - .8729) < 1e-3 and abs(float(sp.sqrt(R(20, 21))) - .9759) < 1e-3
assert 1 - 4/R(16) > 0 and 1 - R(9, 16) > 0 and 9 - 1 > 0
en_a(r"\frac{x^2}{4}+y^2>1", r"x^2+\frac{y^2}{16}<1", r"y^2=\frac{16}{21}", r"\sqrt{0{,}75}")

# --- Ej 2: límite de 5x²y/(x⁴+3y²) en (0,0) ---
f2 = 5*x**2*y/(x**4 + 3*y**2)
rec = sp.simplify(f2.subs(y, m*x)); assert sp.simplify(rec - 5*m*x/(x**2 + 3*m**2)) == 0
assert sp.limit(rec, x, 0) == 0 and f2.subs(x, 0) == 0
par = sp.simplify(f2.subs(y, a*x**2)); assert sp.simplify(par - 5*a/(1 + 3*a**2)) == 0
assert par.subs(a, 1) == R(5, 4) and par.subs(a, 0) == 0
assert f2.subs({x: R(1, 10), y: R(1, 100)}) == R(5, 4) and f2.subs({x: R(1, 1000), y: R(1, 10**6)}) == R(5, 4) and f2.subs({x: R(1, 1000), y: 0}) == 0
amax = sp.solve(sp.diff(par, a), a); assert 1/sp.sqrt(3) in amax and sp.simplify(par.subs(a, 1/sp.sqrt(3)) - 5*sp.sqrt(3)/6) == 0
en_a(r"\frac{5mx}{x^2+3m^2}", r"\frac{5a}{1+3a^2}", r"\frac54\neq0", r"\frac{5\sqrt3}{6}")

# --- Ej 3: cono ---
Rr, H = sp.symbols("R H", positive=True); V = sp.pi*Rr**2*H/3; P3 = {Rr: 2, H: 3}
assert V.subs(P3) == 4*sp.pi
vr, vh = sp.diff(V, Rr).subs(P3), sp.diff(V, H).subs(P3); assert (vr, vh) == (4*sp.pi, R(4, 3)*sp.pi)
dR, dH = R(2, 100)*2, R(2, 100)*3; assert (dR, dH) == (R(1, 25), R(3, 50))
assert (vr*dR, vh*dH) == (R(16, 100)*sp.pi, R(8, 100)*sp.pi)
dV = vr*dR + vh*dH; assert dV == R(24, 100)*sp.pi and dV/V.subs(P3)*100 == 6 and abs(float(dV) - .754) < 1e-3
dVr = V.subs({Rr: 2 + dR, H: 3 + dH}) - V.subs(P3); assert sp.simplify(dVr - R(244832, 10**6)*sp.pi) == 0 and abs(float(dVr) - .769) < 1e-3
assert R(2, 100)*2 + R(2, 100) == R(6, 100)
en_a(r"dV=0{,}24\pi\ \text{m}^3\approx0{,}754", r"E\%=6\%", r"4{,}244832\pi", r"V=4\pi")

# --- Ej 4: arctan(x²yz³) = π/4 ---
F4 = sp.atan(x**2*y*z**3) - sp.pi/4
Fx, Fy, Fz = [sp.diff(F4, w) for w in (x, y, z)]
dydx, dzdx = sp.simplify(-Fx/Fy), sp.simplify(-Fx/Fz)
assert sp.simplify(dydx + 2*y/x) == 0 and sp.simplify(dzdx + 2*z/(3*x)) == 0
M = {x: 1, y: 1, z: 1}; assert F4.subs(M) == 0 and dydx.subs(M) == -2 and dzdx.subs(M) == -R(2, 3)
u4 = x**2*y*z**3; assert sp.simplify(Fx*(1 + u4**2) - 2*x*y*z**3) == 0 and sp.simplify(Fy*(1 + u4**2) - x**2*z**3) == 0 and sp.simplify(Fz*(1 + u4**2) - 3*x**2*y*z**2) == 0
yexp = 1/(x**2*z**3); zexp = (x**2*y)**R(-1, 3)
assert sp.diff(yexp, x).subs({x: 1, z: 1}) == -2 and sp.simplify(sp.diff(zexp, x).subs({x: 1, y: 1}) + R(2, 3)) == 0
en_a(r"\frac{dy}{dx}\Big|_M=-\frac{2\cdot1}{1}=-2", r"\frac{dz}{dx}\Big|_M=-\frac{2\cdot1}{3\cdot1}=-\frac23", r"-\frac{2xyz^3}{3x^2yz^2}=-\frac{2z}{3x}")

# --- Ej 5: derivada direccional y gradiente, P(4,3), α=5π/4 ---
f5 = -5*sp.sqrt(x**2 + y**2) + 3*x/y + 4*sp.log(x**2*y)
fx, fy = sp.diff(f5, x), sp.diff(f5, y)
assert sp.simplify(fx - (-5*x/sp.sqrt(x**2 + y**2) + 3/y + 8/x)) == 0 and sp.simplify(fy - (-5*y/sp.sqrt(x**2 + y**2) - 3*x/y**2 + 4/y)) == 0
P5 = {x: 4, y: 3}; gx, gy = sp.simplify(fx.subs(P5)), sp.simplify(fy.subs(P5)); assert (gx, gy) == (-1, -3)
s5 = (sp.cos(5*sp.pi/4), sp.sin(5*sp.pi/4)); assert sp.simplify(s5[0] + sp.sqrt(2)/2) == 0 and sp.simplify(s5[1] + sp.sqrt(2)/2) == 0
ds = sp.simplify(gx*s5[0] + gy*s5[1]); assert ds == 2*sp.sqrt(2)
assert sp.sqrt(gx**2 + gy**2) == sp.sqrt(10)
th = sp.atan2(gy, gx); th_deg = float(th)*180/3.141592653589793 % 360; assert abs(th_deg - 251.57) < .01 and abs(float(sp.atan(3))*180/3.141592653589793 - 71.57) < .01
assert abs(float(cociente(f5, (4, 3), (float(s5[0]), float(s5[1])), 1e-6)) - 2*2**.5) < 1e-4
om = th_deg - 225; cosom = sp.cos(sp.atan(3) - sp.pi/4)   # 251,57−225=26,57 = arctan3 − 45°
assert abs(om - 26.57) < .01 and sp.simplify(sp.sqrt(10)*(gx/sp.sqrt(10)*s5[0] + gy/sp.sqrt(10)*s5[1]) - 2*sp.sqrt(2)) == 0 and sp.simplify((gx*s5[0] + gy*s5[1])/sp.sqrt(10) - 2*sp.sqrt(2)/sp.sqrt(10)) == 0
assert abs(th_deg - 180 - 71.57) < .01 and abs((th_deg + 180) % 360 - 71.57) < .01 and abs((th_deg + 90) % 360 - 341.57) < .01 and abs((th_deg - 90) % 360 - 161.57) < .01
en_a(r"\frac{\partial f}{\partial s}\Big|_P=2\sqrt2\approx2{,}83", r"\sqrt{10}\approx3{,}16", r"251{,}57^\circ", r"f'_x(P)=-\frac{5\cdot4}{5}+\frac33+\frac84=-4+1+2=-1", r"\frac{2\sqrt2}{\sqrt{10}}")

# --- Ej 6: 3xy − x³ − 3y²/2 − 5 ---
f6 = 3*x*y - x**3 - R(3, 2)*y**2 - 5
cp = sp.solve([sp.diff(f6, x), sp.diff(f6, y)], [x, y], dict=True); assert {(s[x], s[y]) for s in cp} == {(0, 0), (1, 1)}
H6 = sp.expand(sp.diff(f6, x, 2)*sp.diff(f6, y, 2) - sp.diff(f6, x, y)**2); assert H6 == 18*x - 9
assert (sp.diff(f6, x, 2), sp.diff(f6, y, 2), sp.diff(f6, x, y)) == (-6*x, -3, 3)
assert H6.subs(x, 0) == -9 and H6.subs(x, 1) == 9 and sp.diff(f6, x, 2).subs(x, 1) == -6 and f6.subs({x: 0, y: 0}) == -5 and f6.subs({x: 1, y: 1}) == -R(9, 2)
assert sp.expand(f6 - (-R(3, 2)*(y - x)**2 + R(3, 2)*x**2 - x**3 - 5)) == 0
g6 = R(3, 2)*x**2 - x**3 - 5; assert (sp.diff(g6, x, 2).subs(x, 0), sp.diff(g6, x, 2).subs(x, 1)) == (3, -3) and sp.solve(sp.diff(g6, x), x) == [0, 1]
en_a(r"H(x;y)=(-6x)(-3)-3^2=18x-9", r"H(0;0)=-9\lt0", r"H(1;1)=18-9=9\gt0", r"f(1;1)=-\frac92")

# --- Ej 7: distancia del plano x+4y+9z=98 al origen ---
F7 = x**2 + y**2 + z**2 - l*(x + 4*y + 9*z - 98)
s7 = sp.solve([sp.diff(F7, w) for w in (x, y, z, l)], [x, y, z, l], dict=True); assert len(s7) == 1 and s7[0] == {x: 1, y: 4, z: 9, l: 2}
assert sp.sqrt(1 + 16 + 81) == 7*sp.sqrt(2) and sp.sqrt(98) == 7*sp.sqrt(2) and abs(float(7*sp.sqrt(2)) - 9.90) < .01
assert sp.simplify(98/sp.sqrt(1 + 16 + 81) - 7*sp.sqrt(2)) == 0 and (1, 4, 9) == (1*1, 4*1, 9*1)
assert [sp.solve(sp.diff(F7, w).subs({l: 2*x}), w) for w in (y, z)] == [[4*x], [9*x]] and sp.solve(x + 16*x + 81*x - 98, x) == [1]
en_a(r"x+16x+81x=98", r"\sqrt{1^2+4^2+9^2}=\sqrt{1+16+81}=\sqrt{98}=7\sqrt2", r"\frac{98}{\sqrt{1^2+4^2+9^2}}")

# ================= GRUPO B =================
# --- Ej 1: x² + y²/4 < 1 ∧ −1−x ≤ y ≤ 1−x ---
def en_dom_b(p, q): p, q = R(p), R(q); return (4 - 4*p**2 - q**2 > 0) and (-1 <= p + q <= 1)
assert en_dom_b(0, 0) and en_dom_b(R(9, 10), -R(2, 10)) and en_dom_b(R(1, 2), R(1, 2))
assert not en_dom_b(1, R(1, 2)) and not en_dom_b(0, -R(19, 10)) and not en_dom_b(1, 0)
assert sp.solve(x**2 + (1 - x)**2/4 - 1, x) == [-R(3, 5), 1] and sp.expand(4*x**2 + 1 - 2*x + x**2 - 4) == 5*x**2 - 2*x - 3 and sp.factor(5*x**2 - 2*x - 3) == (x - 1)*(5*x + 3)
assert 4 - 4*R(81, 100) - R(4, 100) == R(72, 100) and 4 - R(361, 100) == R(39, 100)
for (p, q) in [(1, 0), (-1, 0), (-R(3, 5), R(8, 5)), (R(3, 5), -R(8, 5))]: assert 4 - 4*p**2 - q**2 == 0 and -1 <= p + q <= 1 and abs(p + q) == 1
en_b(r"x^2+\frac{y^2}{4}<1", r"-1-x\le y\le1-x", r"5x^2-2x-3=0", r"(5x+3)(x-1)=0")

# --- Ej 2: límite en (1,−1) ---
f2b = (y + 1)/(y**2 - x + y - x*y)
assert sp.factor(y**2 - x + y - x*y) == sp.factor((y + 1)*(y - x)) and sp.expand(y*(y + 1) - x*(1 + y) - (y**2 - x + y - x*y)) == 0
assert sp.simplify(f2b - 1/(y - x)) == 0 and (1/(y - x)).subs({x: 1, y: -1}) == -R(1, 2)
assert sp.limit(sp.simplify(f2b.subs(y, m*(x - 1) - 1)), x, 1) == -R(1, 2)   # haz de rectas por (1,−1)
assert sp.simplify(f2b.subs(x, 1) - 1/(y - 1)) == 0 and sp.limit(f2b.subs(x, 1), y, -1) == -R(1, 2)   # vertical
assert sp.limit(sp.limit(f2b, y, -1), x, 1) == -R(1, 2) and sp.limit(sp.limit(f2b, x, 1), y, -1) == -R(1, 2)
num = f2b.subs({x: R(1001, 1000), y: -R(1002, 1000)}); assert abs(float(num) + .4993) < 1e-3 and (y**2 - x + y - x*y).subs({x: R(1001, 1000), y: -R(1002, 1000)}) == R(4006, 10**6)
en_b(r"y^2-x+y-xy=y\,(y+1)-x\,(1+y)=(y+1)\,(y-x)", r"\lim_{(x;y)\to(1;-1)}\frac{1}{y-x}=\frac{1}{-1-1}=-\frac12", r"0{,}004006")

# --- Ej 3: pirámide ---
A, B, Hh = sp.symbols("A B H", positive=True); Vp = A*B*Hh/3; P3b = {A: 1, B: 2, Hh: 3}
assert Vp.subs(P3b) == 2
pa, pb, ph = [sp.diff(Vp, w).subs(P3b) for w in (A, B, Hh)]; assert (pa, pb, ph) == (2, 1, R(2, 3))
dA, dB, dHh = -R(2, 100)*1, -R(2, 100)*2, R(3, 100)*3; assert (dA, dB, dHh) == (-R(1, 50), -R(1, 25), R(9, 100))
assert (pa*dA, pb*dB, ph*dHh) == (-R(4, 100), -R(4, 100), R(6, 100))
dVb = pa*dA + pb*dB + ph*dHh; assert dVb == -R(2, 100) and dVb/2*100 == -1
Vn = Vp.subs({A: 1 + dA, B: 2 + dB, Hh: 3 + dHh}); assert abs(float(Vn) - 1.9784) < 1e-4 and abs(float(Vn - 2) + .0216) < 1e-4
assert -R(2, 100) - R(2, 100) + R(3, 100) == -R(1, 100)
en_b(r"dV=-0{,}02\ \text{m}^3", r"E\%=-1\%", r"2\cdot(-0{,}02)=-0{,}04\qquad1\cdot(-0{,}04)=-0{,}04\qquad\frac23\cdot0{,}09=0{,}06", r"-0{,}04-0{,}04+0{,}06")

# --- Ej 4: compuesta u = x²/y + x y² ln(z²), y=ln x, z=x²+3x−1, en (1,1,1) ---
u4b = x**2/y + x*y**2*sp.log(z**2)
ux, uy, uz = [sp.diff(u4b, w) for w in (x, y, z)]
assert sp.simplify(ux - (2*x/y + y**2*sp.log(z**2))) == 0 and sp.simplify(uy - (-x**2/y**2 + 2*x*y*sp.log(z**2))) == 0 and sp.simplify(uz - 2*x*y**2/z) == 0
M1 = {x: 1, y: 1, z: 1}; assert (ux.subs(M1), uy.subs(M1), uz.subs(M1)) == (2, -1, 2)
yp, zp = sp.diff(sp.log(x), x), sp.diff(x**2 + 3*x - 1, x); assert (yp.subs(x, 1), zp.subs(x, 1)) == (1, 5)
tot = ux.subs(M1) + uy.subs(M1)*yp.subs(x, 1) + uz.subs(M1)*zp.subs(x, 1); assert tot == 11
# el punto (1,1,1) no está sobre la curva (nota del MDX)
assert sp.log(1) == 0 and 1**2 + 3*1 - 1 == 3
# comprobación 1: simplificar ln(z²)=2 ln z
u4s = x**2/y + 2*x*y**2*sp.log(z); assert (sp.diff(u4s, x).subs(M1), sp.diff(u4s, y).subs(M1), sp.diff(u4s, z).subs(M1)) == (2, -1, 2)
# comprobación 2: curva (1+t,1+t,1+5t)
g = u4b.subs({x: 1 + t, y: 1 + t, z: 1 + 5*t}); assert sp.simplify(sp.diff(g, t).subs(t, 0)) == 11
en_b(r"\frac{du}{dx}\Big|_{(1,1,1)}=11", r"u'_x=\frac{2}{1}+1\cdot\ln1=2\qquad u'_y=-\frac11+2\ln1=-1\qquad u'_z=\frac{2}{1}=2", r"\frac{du}{dx}=2-1+10=11")

# --- Ej 5: f = 2√(5x²−y²) − 3y/x − ln(x²y), P(1,1), α=3π/4 ---
f5b = 2*sp.sqrt(5*x**2 - y**2) - 3*y/x - sp.log(x**2*y)
fxb, fyb = sp.diff(f5b, x), sp.diff(f5b, y)
assert sp.simplify(fxb - (10*x/sp.sqrt(5*x**2 - y**2) + 3*y/x**2 - 2/x)) == 0 and sp.simplify(fyb - (-2*y/sp.sqrt(5*x**2 - y**2) - 3/x - 1/y)) == 0
P5b = {x: 1, y: 1}; gxb, gyb = fxb.subs(P5b), fyb.subs(P5b); assert (gxb, gyb) == (6, -5)
s5b = (sp.cos(3*sp.pi/4), sp.sin(3*sp.pi/4)); dsb = sp.simplify(gxb*s5b[0] + gyb*s5b[1]); assert dsb == -11*sp.sqrt(2)/2 and abs(float(dsb) + 7.78) < .01
assert sp.sqrt(gxb**2 + gyb**2) == sp.sqrt(61) and abs(float(sp.sqrt(61)) - 7.81) < .01
thb = float(sp.atan(R(-5, 6)))*180/3.141592653589793; assert abs(thb + 39.81) < .01 and abs(thb % 360 - 320.19) < .01
assert abs(float(cociente(f5b, (1, 1), (float(s5b[0]), float(s5b[1])), 1e-6)) + 7.7782) < 1e-3
omb = 135 - thb; assert abs(omb - 174.81) < .01 and abs(float(sp.sqrt(61))*float(sp.cos(sp.rad(omb))) + 7.78) < .01
assert abs((thb + 180) % 360 - 140.19) < .01 and abs((thb + 90) % 360 - 50.19) < .01 and abs((thb - 90) % 360 - 230.19) < .01
# lo que figura en el escaneo (z_y = −9/2): inconsistente con su propia direccional
assert sp.sqrt(36 + R(81, 4)) == R(15, 2) and sp.simplify(6*s5b[0] + (-R(9, 2))*s5b[1]) != dsb and sp.simplify(6*s5b[0] - R(9, 2)*s5b[1]) == -21*sp.sqrt(2)/4
en_b(r"f'_x(P)=\frac{10}{2}+3-2=5+3-2=6", r"f'_y(P)=-\frac22-3-1=-1-3-1=-5", r"\frac{\partial f}{\partial s}\Big|_P=-\frac{11\sqrt2}{2}\approx-7{,}78", r"\|\nabla f\|=\sqrt{61}\approx7{,}81", r"-39{,}81^\circ", r"\arctan\left(-\frac56\right)")

# --- Ej 6: 4/3 x³ + 1/3 y³ − 2x² − y ---
f6b = R(4, 3)*x**3 + R(1, 3)*y**3 - 2*x**2 - y
cpb = sp.solve([sp.diff(f6b, x), sp.diff(f6b, y)], [x, y], dict=True); assert {(s[x], s[y]) for s in cpb} == {(0, 1), (0, -1), (1, 1), (1, -1)}
assert sp.factor(sp.diff(f6b, x)) == 4*x*(x - 1) and sp.factor(sp.diff(f6b, y)) == (y - 1)*(y + 1)
fxx, fyy, fxy = sp.diff(f6b, x, 2), sp.diff(f6b, y, 2), sp.diff(f6b, x, y); assert (sp.expand(fxx), fyy, fxy) == (8*x - 4, 2*y, 0)
H6b = sp.expand(fxx*fyy - fxy**2); assert H6b == 16*x*y - 8*y
res = {(0, 1): (-8, "silla"), (0, -1): (8, "max"), (1, 1): (8, "min"), (1, -1): (-8, "silla")}
for (p, q), (hv, tipo) in res.items():
    assert H6b.subs({x: p, y: q}) == hv
    if hv > 0: assert (fxx.subs(x, p) < 0) == (tipo == "max")
assert [f6b.subs({x: p, y: q}) for (p, q) in [(0, -1), (1, 1), (0, 1), (1, -1)]] == [R(2, 3), -R(4, 3), -R(2, 3), 0]
gg, hh = R(4, 3)*x**3 - 2*x**2, R(1, 3)*y**3 - y; assert sp.expand(gg + hh - f6b) == 0
assert (sp.diff(gg, x, 2).subs(x, 0), sp.diff(gg, x, 2).subs(x, 1), sp.diff(hh, y, 2).subs(y, -1), sp.diff(hh, y, 2).subs(y, 1)) == (-4, 4, -2, 2)
en_b(r"H(x;y)=(8x-4)(2y)-0^2=2y\,(8x-4)", r"H(0;1)=2\cdot(-4)=-8\lt0", r"H(1;-1)=-2\cdot4=-8\lt0", r"f(0;-1)=\frac23")

# --- Ej 7: Lagrange, f = x²/2 + y² + x − y, x+y=1 ---
f7 = x**2/2 + y**2 + x - y; F7b = f7 - l*(x + y - 1)
s7b = sp.solve([sp.diff(F7b, w) for w in (x, y, l)], [x, y, l], dict=True); assert s7b == [{x: 0, y: 1, l: 1}]
assert f7.subs({x: 0, y: 1}) == 0 and sp.solve(x + (x + 2)/2 - 1, x) == [0]
gs = sp.expand(f7.subs(y, 1 - x)); assert gs == R(3, 2)*x**2 and sp.diff(gs, x, 2) == 3 and sp.solve(sp.diff(gs, x), x) == [0]
assert sp.solve([sp.diff(f7, x), sp.diff(f7, y)], [x, y], dict=True) == [{x: -1, y: R(1, 2)}]
en_b(r"x+\frac{x+2}{2}=1", r"(x;y)=(0;1),\qquad z=f(0;1)=0", r"\frac32x^2")
print("OK p1-1r3-2023-09 (A y B)")
