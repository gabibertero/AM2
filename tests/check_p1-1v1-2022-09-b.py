"""Recalcula con sympy el 1º Parcial 1V1 Sep-22 (15/09/2022, Grupo B): resultados e intermedios, y que el MDX diga lo mismo.
Uso: python3 tests/check_p1-1v1-2022-09-b.py"""
from pathlib import Path
import sympy as sp

MDX = (Path(__file__).resolve().parents[1] / "src/content/parciales/p1-1v1-2022-09-b.mdx").read_text()
def en_mdx(*ss):
    for s in ss: assert s in MDX, f"falta en el MDX: {s}"
R = sp.Rational
x, y, z, Rr, r, H, lam = sp.symbols("x y z R r H lambda", real=True)

# --- Ej 1: −x<y<4−x ∧ x²+y²<16
def en_dom(p, q): return (p + q > 0) and (4 - p - q > 0) and (16 - p**2 - q**2 > 0)
assert en_dom(1, 1) and en_dom(-2, 3) and en_dom(2, -1)
assert not en_dom(0, 0) and not en_dom(3, 3) and not en_dom(-1, -1) and not en_dom(-3, 3.5) and not en_dom(4, 0) and not en_dom(0, 4)
assert {(s[x], s[y]) for s in sp.solve([x + y - 4, x**2 + y**2 - 16], [x, y], dict=True)} == {(4, 0), (0, 4)}
assert {(s[x], s[y]) for s in sp.solve([x + y, x**2 + y**2 - 16], [x, y], dict=True)} == {(2*sp.sqrt(2), -2*sp.sqrt(2)), (-2*sp.sqrt(2), 2*sp.sqrt(2))}
en_mdx(r"x+y\gt0", r"4-x-y\gt0", r"16-x^2-y^2\gt0", r"-x\lt y\lt4-x\ \wedge\ x^2+y^2\lt16")

# --- Ej 2: cono truncado, R=2, r=1, H=3, dR=dr=dH=0.01
V = sp.pi*H*(Rr**2 + Rr*r + r**2)/3; P = {Rr: 2, r: 1, H: 3}; d = R(1, 100)
assert V.subs(P) == 7*sp.pi
VH, VR, Vr = [sp.diff(V, v).subs(P) for v in (H, Rr, r)]
assert (VH, VR, Vr) == (7*sp.pi/3, 5*sp.pi, 4*sp.pi)
assert (VH*d, VR*d, Vr*d) == (7*sp.pi/300, sp.pi/20, sp.pi/25)
dV = (VH + VR + Vr)*d; assert VH + VR + Vr == 34*sp.pi/3 and dV == 17*sp.pi/150 and abs(float(dV) - 0.35605) < 1e-4
E2 = dV/V.subs(P)*100; assert E2 == R(34, 21) and abs(float(E2) - 1.619) < 1e-3
Vn = V.subs({Rr: 2 + d, r: 1 + d, H: 3 + d}); dVr = Vn - V.subs(P)
assert abs(float(dVr) - 0.35794) < 1e-4 and abs(float(dVr/V.subs(P)*100) - 1.6276) < 1e-3   # incremento exacto
# la resolución oficial suma 7+15+12 = 24 (debería ser 34): da 0.08π y 8/7 %
assert 7 + 15 + 12 == 34 and R(24, 3)*d == R(8, 100) and R(8, 100)/7*100 == R(8, 7)
en_mdx(r"V=\frac{\pi\cdot3\,(4+2+1)}3=7\pi", r"dV=\frac\pi3\,(7+15+12)\cdot0{,}01", r"dV=\frac{34\pi}{3}\cdot0{,}01=\frac{17\pi}{150}", r"E\%=\frac{17\pi/150}{7\pi}\cdot100=\frac{34}{21}\%", r"0{,}08\,\pi", r"0{,}1133\,\pi")

# --- Ej 3: u = 2x² + y² − 3z², M(7,2,1), v=(6,3,2)
u = 2*x**2 + y**2 - 3*z**2; M = {x: 7, y: 2, z: 1}
g = [sp.diff(u, v).subs(M) for v in (x, y, z)]; assert [sp.diff(u, v) for v in (x, y, z)] == [4*x, 2*y, -6*z] and g == [28, 4, -6]
vv = (6, 3, 2); nv = sp.sqrt(sum(c**2 for c in vv)); assert nv == 7
assert [R(c, 7) for c in vv] == [R(6, 7), R(3, 7), R(2, 7)]
assert [gi*R(c, 7) for gi, c in zip(g, vv)] == [24, R(12, 7), -R(12, 7)] and sum(gi*R(c, 7) for gi, c in zip(g, vv)) == 24
ng = sp.sqrt(sum(c**2 for c in g)); assert ng == sp.sqrt(836) and abs(float(ng) - 28.914) < 1e-3 and 784 + 16 + 36 == 836
assert sp.sqrt(836) == 2*sp.sqrt(209)
cs = [sp.Integer(c)/ng for c in g]; assert abs(sum(c**2 for c in cs) - 1) == 0
assert [round(float(c), 4) for c in cs] == [0.9684, 0.1383, -0.2075]
hh = sp.Float("1e-7"); q = (u.subs({x: 7 + hh*R(6, 7), y: 2 + hh*R(3, 7), z: 1 + hh*R(2, 7)}) - u.subs(M))/hh; assert abs(float(q) - 24) < 1e-4
en_mdx(r"\frac{\partial u}{\partial s}\Big|_M=24", r"\nabla u(M)=28\,\vec i+4\,\vec j-6\,\vec k", r"\|\nabla u\|=\sqrt{836}\approx28{,}9", r"\cos\alpha=\frac{28}{\sqrt{836}}", r"\|\vec v\|=\sqrt{36+9+4}=7")

# --- Ej 4: mínima distancia al origen del plano x+3y+5z=7
f = x**2 + y**2 + z**2; gg = x + 3*y + 5*z - 7
F = f - lam*gg
sol = sp.solve([sp.diff(F, v) for v in (x, y, z, lam)], [x, y, z, lam], dict=True); assert len(sol) == 1
s = sol[0]; assert (s[x], s[y], s[z], s[lam]) == (R(1, 5), R(3, 5), 1, R(2, 5))
dmin = sp.sqrt(f.subs(s)); assert dmin == sp.sqrt(35)/5 and abs(float(dmin) - 1.1832) < 1e-4
assert sp.Rational(7)/sp.sqrt(1 + 9 + 25) == sp.sqrt(35)/5          # fórmula punto-plano
assert sp.simplify(f.subs(s) - R(7, 5)) == 0
en_mdx(r"x=\lambda/2", r"x+9x+25x=7", r"x=\frac15,\quad y=\frac35,\quad z=1", r"d=\frac{\sqrt{35}}5\approx1{,}18")
print("OK p1-1v1-2022-09-b")
