"""Recalcula con sympy el 1º Parcial 2S2 Jun-24 (Tema B): resultados e intermedios, y que el MDX diga lo mismo.
Uso: python3 tests/check_p1-2s2-2024-06-b.py"""
from pathlib import Path
import sympy as sp

MDX = (Path(__file__).resolve().parents[1] / "src/content/parciales/p1-2s2-2024-06-b.mdx").read_text()
def en_mdx(*ss):
    for s in ss: assert s in MDX, f"falta en el MDX: {s}"
R = sp.Rational
x, y, z, l, r, Rr, h = sp.symbols("x y z lambda r R h", real=True)

# --- Ej 1: y²−x²<1 ∧ |x|≤1 ∧ x²/4+y²/9≤1
def en_dom(p, q): return (p**2 - q**2 + 1 > 0) and abs(p) <= 1 and (1 - p**2/4 - q**2/9 >= 0)
assert en_dom(0, 0) and en_dom(1, R(6, 5)) and en_dom(-1, R(-6, 5))
assert not en_dom(0, 1) and not en_dom(R(3, 2), 0) and not en_dom(0, 2)      # hipérbola excluida / |x|>1 / fuera de la hipérbola
assert 1 - R(1, 4) - R(36, 25)/9 == R(59, 100)*1 and en_dom(1, R(6, 5))
assert 0**2 - 2**2 + 1 == -3
# la elipse no recorta: con |x|≤1 y y²<1+x²≤2, x²/4+y²/9 < 1/4+2/9 < 1
assert R(1, 4) + R(2, 9) < 1
import itertools
assert all(1 - p**2/4 - q**2/9 >= 0 for p in [R(i, 10) for i in range(-10, 11)] for q in [R(j, 20) for j in range(-28, 29)] if p**2 - q**2 + 1 > 0)
assert sp.sqrt(2) > R(141, 100) and 3*sp.sqrt(1 - R(1, 4)) > R(259, 100)
en_mdx(r"y^2-x^2\lt1", r"-1\le x\le1", r"\frac{x^2}{4}+\frac{y^2}{9}\le1")

# --- Ej 2: V = πh/3 (r²+rR+R²), dh=+0,3, dr=dR=−0,1
V = sp.pi*h/3*(r**2 + r*Rr + Rr**2); P2 = {r: 10, Rr: 20, h: 30}
assert V.subs(P2) == 7000*sp.pi
parc = [sp.diff(V, v).subs(P2) for v in (r, Rr, h)]; assert parc == [400*sp.pi, 500*sp.pi, R(700, 3)*sp.pi]
d = [R(-1, 10), R(-1, 10), R(3, 10)]; terms = [p*q for p, q in zip(parc, d)]; assert terms == [-40*sp.pi, -50*sp.pi, 70*sp.pi]
dV = sum(terms); assert dV == -20*sp.pi and abs(float(dV) + 62.83) < .01
E = dV/V.subs(P2)*100; assert E == -R(2, 7) and abs(float(E) + .2857) < 1e-4 and round(float(E), 2) == -.29
Vn = V.subs({r: R(99, 10), Rr: R(199, 10), h: R(303, 10)}); assert Vn == R(6979403, 1000)*sp.pi
dVr = Vn - V.subs(P2); assert dVr == -R(20597, 1000)*sp.pi and abs(float(dVr) + 64.71) < .01
assert abs(float(dVr/V.subs(P2)*100) + .294) < 1e-3 and abs(float(dVr - dV) + 1.88) < .01
en_mdx(r"V=7000\pi\ \text{cm}^3", r"V'_r=\frac{\pi\cdot30}3(2\cdot10+20)=10\pi\cdot40=400\pi", r"10\pi\cdot50=500\pi", r"\frac{700\pi}3",
       r"dV=-40\pi-50\pi+70\pi=-20\pi", r"-\frac27\%", r"6979{,}403\pi", r"-20{,}597\pi")

# --- Ej 3: u = z³ − x²y, M(1,6,2), N(4,10,14)
u = z**3 - x**2*y; M = {x: 1, y: 6, z: 2}
MN = sp.Matrix([4 - 1, 10 - 6, 14 - 2]); assert list(MN) == [3, 4, 12] and sp.sqrt(MN.dot(MN)) == 13
s_ = MN/13; assert list(s_) == [R(3, 13), R(4, 13), R(12, 13)]
gr = sp.Matrix([sp.diff(u, v).subs(M) for v in (x, y, z)]); assert list(gr) == [-12, -1, 12]
assert sp.diff(u, x) == -2*x*y and sp.diff(u, y) == -x**2 and sp.diff(u, z) == 3*z**2
ds = gr.dot(s_); assert ds == 8 and (-36 - 4 + 144) == 104 and R(104, 13) == 8
assert sp.sqrt(gr.dot(gr)) == 17 and 144 + 1 + 144 == 289
cg = gr/17; assert list(cg) == [-R(12, 17), -R(1, 17), R(12, 17)]
assert [round(float(sp.acos(c))*180/float(sp.pi), 1) for c in cg] == [134.9, 93.4, 45.1]
cosphi = cg.dot(s_); assert cosphi == R(8, 17) and R(-12*3 - 4 + 144, 17*13) == R(104, 221) == R(8, 17)
assert 17*cosphi == ds and round(float(sp.acos(cosphi))*180/float(sp.pi), 1) == 61.9
hh = sp.Float("1e-8"); q = (u.subs({x: 1 + hh*s_[0], y: 6 + hh*s_[1], z: 2 + hh*s_[2]}) - u.subs(M))/hh; assert abs(float(q) - 8) < 1e-4
en_mdx(r"\frac{\partial u}{\partial s}=\frac{-36-4+144}{13}=\frac{104}{13}=8", r"\|\nabla u\|=\sqrt{144+1+144}=\sqrt{289}=17",
       r"\cos\varphi=-\frac{12}{17}\cdot\frac3{13}-\frac1{17}\cdot\frac4{13}+\frac{12}{17}\cdot\frac{12}{13}=\frac{104}{221}=\frac8{17}",
       r"\nabla u(M)=-12\,\vec i-\vec j+12\,\vec k", r"134{,}9^\circ", r"93{,}4^\circ", r"45{,}1^\circ", r"61{,}9^\circ")

# --- Ej 4: z = 2/3 x³ − 18x − 4/3 y³ + 16y
g = R(2, 3)*x**3 - 18*x - R(4, 3)*y**3 + 16*y
cp = {(s[x], s[y]) for s in sp.solve([sp.diff(g, x), sp.diff(g, y)], [x, y], dict=True)}; assert cp == {(3, 2), (3, -2), (-3, 2), (-3, -2)}
assert sp.expand(sp.diff(g, x)) == 2*x**2 - 18 and sp.expand(sp.diff(g, y)) == -4*y**2 + 16
gxx, gyy, gxy = sp.diff(g, x, 2), sp.diff(g, y, 2), sp.diff(g, x, y); assert (gxx, gyy, gxy) == (4*x, -8*y, 0)
H = sp.expand(gxx*gyy - gxy**2); assert H == -32*x*y
Hv = {p: H.subs({x: p[0], y: p[1]}) for p in cp}; assert Hv == {(3, 2): -192, (3, -2): 192, (-3, 2): 192, (-3, -2): -192}
assert gxx.subs(x, 3) == 12 and gxx.subs(x, -3) == -12
zv = {p: g.subs({x: p[0], y: p[1]}) for p in cp}; assert zv == {(3, -2): -R(172, 3), (-3, 2): R(172, 3), (3, 2): -R(44, 3), (-3, -2): R(44, 3)}
vec = lambda c: [(c[0] + i*R(1, 10), c[1] + j*R(1, 10)) for i in (-1, 0, 1) for j in (-1, 0, 1) if (i, j) != (0, 0)]
assert all(g.subs({x: p, y: q}) > zv[(3, -2)] for p, q in vec((3, -2))) and all(g.subs({x: p, y: q}) < zv[(-3, 2)] for p, q in vec((-3, 2)))
assert g.subs({x: R(31, 10), y: 2}) > zv[(3, 2)] and g.subs({x: 3, y: R(21, 10)}) < zv[(3, 2)]
for c in [(3, 2), (-3, -2)]:
    v0 = g.subs({x: c[0], y: c[1]}); vs = [g.subs({x: p, y: q}) - v0 for p, q in vec(c)]; assert max(vs) > 0 > min(vs)
# separable: f(x)+g(y)
fx_, gy_ = R(2, 3)*x**3 - 18*x, -R(4, 3)*y**3 + 16*y; assert sp.expand(fx_ + gy_ - g) == 0
assert sp.diff(fx_, x, 2).subs(x, 3) > 0 > sp.diff(fx_, x, 2).subs(x, -3) and sp.diff(gy_, y, 2).subs(y, 2) < 0 < sp.diff(gy_, y, 2).subs(y, -2)
# 4 bis (no está en el enunciado): hessiano 32xy → clasificación distinta
g2 = R(2, 3)*x**3 - 18*x + R(4, 3)*y**3 - 16*y; H2 = sp.expand(sp.diff(g2, x, 2)*sp.diff(g2, y, 2)); assert H2 == 32*x*y
assert {(s[x], s[y]) for s in sp.solve([sp.diff(g2, x), sp.diff(g2, y)], [x, y], dict=True)} == cp
assert H2.subs({x: 3, y: 2}) == 192 and sp.diff(g2, x, 2).subs(x, 3) > 0 and H2.subs({x: -3, y: -2}) == 192 and sp.diff(g2, x, 2).subs(x, -3) < 0
assert H2.subs({x: 3, y: -2}) < 0 and H2.subs({x: -3, y: 2}) < 0
assert 4*3*(-8*2) != -36*3*2        # el profe escribe −36xy (errata)
en_mdx(r"H(x,y)=4x\cdot(-8y)-0^2=-32xy", r"H(3,2)=-192\lt0", r"H(3,-2)=192\gt0", r"H(-3,2)=192\gt0", r"H(-3,-2)=-192\lt0",
       r"z(3,-2)=-\frac{172}3", r"-36xy", r"H=32xy")

# --- Ej 5: caja sin tapa V=32, S = xy + 2xz + 2yz
S = x*y + 2*x*z + 2*y*z; F = S - l*(x*y*z - 32)
sl = sp.solve([sp.diff(F, v) for v in (x, y, z, l)], [x, y, z, l], dict=True)
sl = [s for s in sl if all(s[v].is_real and s[v] > 0 for v in (x, y, z))]; assert len(sl) == 1 and sl[0] == {x: 4, y: 4, z: 2, l: 1}
assert (sp.diff(F, x), sp.diff(F, y), sp.diff(F, z)) == (y + 2*z - l*y*z, x + 2*z - l*x*z, 2*x + 2*y - l*x*y)
assert sp.expand(x*(y + 2*z) - y*(x + 2*z)) == 2*x*z - 2*y*z and sp.expand(y*(x + 2*z) - z*(2*x + 2*y)) == x*y - 2*x*z
assert 4*4*2 == 32 and S.subs({x: 4, y: 4, z: 2}) == 48 and R(4 + 4, 8) == 1
Ss = x*y + 64/x + 64/y; assert sp.simplify(S.subs(z, 32/(x*y)) - Ss) == 0
assert sp.solve([sp.diff(Ss, x), sp.diff(Ss, y)], [x, y], dict=True).count({x: 4, y: 4}) == 1
Hs = sp.diff(Ss, x, 2)*sp.diff(Ss, y, 2) - sp.diff(Ss, x, y)**2
assert (sp.diff(Ss, x, 2).subs({x: 4, y: 4}), sp.diff(Ss, y, 2).subs({x: 4, y: 4}), sp.diff(Ss, x, y).subs({x: 4, y: 4}), Hs.subs({x: 4, y: 4})) == (2, 2, 1, 3)
assert Ss.subs({x: 4, y: 4}) == 48 and all(Ss.subs({x: 4 + a, y: 4 + b}) > 48 for a in (-1, 0, 1) for b in (-1, 0, 1) if (a, b) != (0, 0))
en_mdx(r"S=xy+2xz+2yz", r"x^3=64\ \Rightarrow\ x=4", r"S=xy+2xz+2yz=16+16+16=48\ \text{cm}^2", r"S(x,y)=xy+\frac{64}x+\frac{64}y", r"H=4-1=3\gt0")
print("OK p1-2s2-2024-06-b")
