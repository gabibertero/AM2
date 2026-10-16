"""Recalcula con sympy el 1º Parcial 2S2 Tema B (27/06/2025): resultados e intermedios, y que el MDX diga lo mismo.
Uso: python3 tests/check_p1-2s2-2025-06-b.py"""
from pathlib import Path
import sympy as sp

MDX = (Path(__file__).resolve().parents[1] / "src/content/parciales/p1-2s2-2025-06-b.mdx").read_text()
def en_mdx(*ss):
    for s in ss: assert s in MDX, f"falta en el MDX: {s}"
R = sp.Rational
x, y, r, h = sp.symbols("x y r h", real=True)

# --- Ej 1: −x<y<4−x ∧ x²+y²>16
def en_dominio(p, q):
    return (p + q > 0) and (4 - p - q > 0) and (p**2 + q**2 - 16 > 0)
assert en_dominio(5, -2) and en_dominio(-4, 5)
assert not en_dominio(1, 1) and not en_dominio(3, 2) and not en_dominio(4, 0) and not en_dominio(0, 4)
# cortes: circunferencia con y=4−x → (4,0),(0,4); con y=−x → (±2√2, ∓2√2)
assert {(s[x], s[y]) for s in sp.solve([x + y - 4, x**2 + y**2 - 16], [x, y], dict=True)} == {(4, 0), (0, 4)}
assert {(s[x], s[y]) for s in sp.solve([x + y, x**2 + y**2 - 16], [x, y], dict=True)} == {(2*sp.sqrt(2), -2*sp.sqrt(2)), (-2*sp.sqrt(2), 2*sp.sqrt(2))}
assert x**2 + x**2 == 16 if False else sp.solve(2*x**2 - 16, x) == [-2*sp.sqrt(2), 2*sp.sqrt(2)]
en_mdx(r"x+y\gt0", r"4-x-y\gt0", r"x^2+y^2-16\gt0", r"-x\lt y\lt4-x\ \wedge\ x^2+y^2\gt16")

# --- Ej 2: cono V = π r² h / 3, r=10, h=30, dr=−0.1, dh=+0.3
V = sp.pi*r**2*h/3; P = {r: 10, h: 30}; dr, dh = -R(1, 10), R(3, 10)
assert V.subs(P) == 1000*sp.pi and (R(1, 100)*30, -R(1, 100)*10) == (dh, dr)
Vr, Vh = sp.diff(V, r).subs(P), sp.diff(V, h).subs(P); assert (Vr, Vh) == (200*sp.pi, R(100, 3)*sp.pi)
assert (Vr*dr, Vh*dh) == (-20*sp.pi, 10*sp.pi)
dV = Vr*dr + Vh*dh; assert dV == -10*sp.pi and abs(float(dV) + 31.4159) < 1e-3 and dV/V.subs(P)*100 == -1
Vn = V.subs({r: R(99, 10), h: R(303, 10)}); assert R(99, 10)**2 == R(9801, 100) and R(9801, 100)*R(303, 10) == R(2969703, 1000) and Vn == R(989901, 1000)*sp.pi
dVr = Vn - V.subs(P); assert dVr == -R(10099, 1000)*sp.pi and abs(float(dVr) + 31.7269) < 1e-3
assert abs(float(dVr/V.subs(P))*100 + 1.0099) < 1e-9
# signo mal puesto (dr=+0.1) daría +30π → E% = 3 (error típico del criterio "A medias")
assert Vr*R(1, 10) + Vh*dh == 30*sp.pi and (30*sp.pi)/V.subs(P)*100 == 3
en_mdx(r"dV=-10\pi\ \text{cm}^3\approx-31{,}4", r"E\%=-1\%", r"V=\frac\pi3\cdot10^2\cdot30=1000\pi", r"\Delta V=989{,}901\pi-1000\pi=-10{,}099\pi")

# --- Ej 3: z = −xy + 2y² − x, P(1,3), Q(2,−1)
z = -x*y + 2*y**2 - x; Pp = {x: 1, y: 3}
zx, zy = sp.diff(z, x), sp.diff(z, y); assert (zx, zy) == (-y - 1, -x + 4*y)
gx, gy = zx.subs(Pp), zy.subs(Pp); assert (gx, gy) == (-4, 11)
PQ = (2 - 1, -1 - 3); nPQ = sp.sqrt(PQ[0]**2 + PQ[1]**2); assert PQ == (1, -4) and nPQ == sp.sqrt(17)
c, s_ = PQ[0]/nPQ, PQ[1]/nPQ
ds = sp.simplify(gx*c + gy*s_); assert sp.simplify(ds + 48/sp.sqrt(17)) == 0 and abs(float(ds) + 11.64) < 5e-3
assert sp.simplify(gx*c) == -4/sp.sqrt(17) and sp.simplify(gy*s_) == -44/sp.sqrt(17)
ng = sp.sqrt(gx**2 + gy**2); assert ng == sp.sqrt(137) and abs(float(ng) - 11.7) < .01
th = float(sp.atan2(gy, gx))*180/float(sp.pi); assert abs(th - 109.98) < .01 and abs(float(sp.atan(R(11, -4)))*180/float(sp.pi) + 70.02) < .01
assert abs(float(abs(ds))) <= float(ng)
assert gx*11 + gy*4 == -44 + 44 == 0   # perpendicular (11,4)/√137 → crecimiento nulo
hh = sp.Float("1e-6"); q = (z.subs({x: 1 + hh*c, y: 3 + hh*s_}) - z.subs(Pp))/hh; assert abs(float(q) + 11.6417) < 1e-3
assert abs(float(sp.atan2(PQ[1], PQ[0]))*180/float(sp.pi) % 360 - 284.04) < .01
en_mdx(r"-\frac{48}{\sqrt{17}}\approx-11{,}64", r"\sqrt{137}\approx11{,}7", r"109{,}98^\circ", r"-4\,\vec i+11\,\vec j", r"z'_y(P)=-1+12=11")

# --- Ej 4: z = x³ + y³ + 3x² − 3y − 9x − 10
g = x**3 + y**3 + 3*x**2 - 3*y - 9*x - 10
cp = {(s[x], s[y]) for s in sp.solve([sp.diff(g, x), sp.diff(g, y)], [x, y], dict=True)}; assert cp == {(1, 1), (-3, -1), (1, -1), (-3, 1)}
gxx, gyy, gxy = sp.diff(g, x, 2), sp.diff(g, y, 2), sp.diff(g, x, y); assert (sp.expand(gxx), gyy, gxy) == (6*x + 6, 6*y, 0)
H = sp.expand(gxx*gyy - gxy**2); assert sp.expand(H - 36*y*(x + 1)) == 0
exp = {(1, 1): (72, 12, -17), (-3, -1): (72, -12, 19), (1, -1): (-72, 12, -13), (-3, 1): (-72, -12, 15)}
for (a, b), (Hv, fxx, zv) in exp.items():
    assert H.subs({x: a, y: b}) == Hv and gxx.subs(x, a) == fxx and g.subs({x: a, y: b}) == zv
ph, ps = x**3 + 3*x**2 - 9*x, y**3 - 3*y; assert sp.expand(ph + ps - 10 - g) == 0
assert (sp.diff(ph, x, 2).subs(x, 1), sp.diff(ph, x, 2).subs(x, -3), sp.diff(ps, y, 2).subs(y, 1), sp.diff(ps, y, 2).subs(y, -1)) == (12, -12, 6, -6)
en_mdx(r"H(x,y)=(6x+6)\cdot6y-0^2=36y\,(x+1)", r"H=36\cdot1\cdot2=72\gt0", r"H=36\cdot(-1)\cdot(-2)=72\gt0", r"H=36\cdot(-1)\cdot2=-72\lt0", r"H=36\cdot1\cdot(-2)=-72\lt0",
       r"z(1,1)=1+1+3-3-9-10=-17", r"z(-3,-1)=-27-1+27+3+27-10=19")
print("OK p1-2s2-2025-06-b")
