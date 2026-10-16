"""Recalcula con sympy el 1º Parcial 1R7 (7/10/2025): resultados e intermedios, y que el MDX diga lo mismo.
Uso: python3 tests/check_p1-1r7-2025-10.py"""
from pathlib import Path
import sympy as sp

MDX = (Path(__file__).resolve().parents[1] / "src/content/parciales/p1-1r7-2025-10.mdx").read_text()
def en_mdx(*ss):
    for s in ss: assert s in MDX, f"falta en el MDX: {s}"
R = sp.Rational
x, y, z, l, a, b, h = sp.symbols("x y z lambda a b h", real=True)

# --- Ej 1: dominio ---
def en_dominio(p, q):
    return (36 - 9*p**2 - 4*q**2 >= 0) and (p**2 - q**2 + 1 > 0) and (p*q > 0) and (p*q != 1)
assert en_dominio(1, R(1, 2)) and en_dominio(-1, -R(1, 2)) and en_dominio(R(1, 10), 1)
assert not en_dominio(1, -1) and not en_dominio(-1, 1)                       # 2.º y 4.º cuadrante: xy<0
assert not en_dominio(1, 0) and not en_dominio(0, 1)                         # ejes: xy=0
assert not en_dominio(1, 1) and en_dominio(R(11, 10), 1) and en_dominio(R(9, 10), 1)   # xy=1 excluida, vecinos sí
assert en_dominio(2, 0) is False                                             # (2,0): xy=0 → fuera aunque sea punto de la elipse
assert en_dominio(R(19, 10), R(1, 10))                                       # cerca del vértice, dentro
assert not en_dominio(2, R(1, 2))                                            # 36−36−1<0: fuera de la elipse
assert not en_dominio(3, 1) and not en_dominio(R(3, 2), 3)                   # fuera de la elipse
assert not en_dominio(R(1, 2), R(21, 10))                                    # y²−x²=4,16≥1: fuera (aunque esté dentro de la elipse)
assert 36 - 9*R(1, 4) - 4*R(441, 100) > 0
assert 36 - 9*0 - 4*9 == 0 and not en_dominio(0, 3)                          # (0,3) vértice de la elipse: xy=0
# cortes de bordes: elipse ∩ (y²−x²=1): y²=45/13 ; elipse ∩ (xy=1): 4y⁴−36y²+9=0
assert sp.solve(sp.Eq((y**2 - 1)/4 + y**2/9, 1), y**2) == [R(45, 13)]
assert sp.expand((R(1, 4)/y**2 + y**2/9 - 1)*36*y**2 - (4*y**4 - 36*y**2 + 9)) == 0
en_mdx(r"\frac{x^2}{4}+\frac{y^2}{9}\le1", r"y^2-x^2\lt1", r"xy\gt0", r"xy\ne1")

# --- Ej 2: V = π a b h ---
V = sp.pi*a*b*h; P2 = {a: 2, b: 3, h: 10}
assert V.subs(P2) == 60*sp.pi
da, db, dh = R(2, 100)*2, R(2, 100)*3, R(2, 100)*10; assert (da, db, dh) == (R(4, 100), R(6, 100), R(2, 10))
parc = [sp.diff(V, v).subs(P2) for v in (a, b, h)]; assert parc == [30*sp.pi, 20*sp.pi, 6*sp.pi]
terms = [parc[0]*da, parc[1]*db, parc[2]*dh]; assert terms == [R(6, 5)*sp.pi]*3
dV = sum(terms); assert dV == R(18, 5)*sp.pi and dV/V.subs(P2)*100 == 6
dV_real = V.subs({a: 2 + da, b: 3 + db, h: 10 + dh}) - V.subs(P2); assert sp.simplify(dV_real - R(367248, 100000)*sp.pi) == 0
assert abs(float(dV_real) - float(dV)) < .3 and abs(float(dV_real/V.subs(P2))*100 - 6.12) < 1e-3
en_mdx(r"dV=3{,}6\pi\ \text{m}^3", r"E\%=6\%", r"V=60\pi", r"\Delta V=63{,}67248\pi-60\pi=3{,}67248\pi")

# --- Ej 3: z = 2√6 cos²(3x−2y), P(π/3, π/3) ---
f = 2*sp.sqrt(6)*sp.cos(3*x - 2*y)**2; P = {x: sp.pi/3, y: sp.pi/3}
fx, fy = sp.diff(f, x), sp.diff(f, y)
assert sp.simplify(fx + 12*sp.sqrt(6)*sp.cos(3*x - 2*y)*sp.sin(3*x - 2*y)) == 0
assert sp.simplify(fy - 8*sp.sqrt(6)*sp.cos(3*x - 2*y)*sp.sin(3*x - 2*y)) == 0
assert sp.simplify((3*x - 2*y).subs(P) - sp.pi/3) == 0
gx, gy = sp.simplify(fx.subs(P)), sp.simplify(fy.subs(P)); assert (gx, gy) == (-9*sp.sqrt(2), 6*sp.sqrt(2))
# recta tangente a y = ln(x²) en x=2: y' = 2/x = 1 → α = π/4
yy = sp.log(x**2); m = sp.diff(yy, x).subs(x, 2); assert m == 1 and sp.atan(m) == sp.pi/4
u = (sp.cos(sp.pi/4), sp.sin(sp.pi/4)); ds = sp.simplify(gx*u[0] + gy*u[1]); assert ds == -3
assert sp.simplify(sp.sqrt(gx**2 + gy**2) - sp.sqrt(234)) == 0 and abs(float(sp.sqrt(234)) - 15.3) < .01
th = sp.atan(gy/gx) + sp.pi; assert abs(float(th)*180/float(sp.pi) - 146.31) < .01      # 2.º cuadrante
# comprobación: z = √6 (1 + cos 2u) → z_x = −6√6 sen 2u
g2 = sp.sqrt(6)*(1 + sp.cos(2*(3*x - 2*y))); u_ = sp.Symbol('u'); assert sp.simplify(sp.expand_trig(sp.sqrt(6)*(1 + sp.cos(2*u_)) - 2*sp.sqrt(6)*sp.cos(u_)**2)) == 0   # cos²u=(1+cos2u)/2
assert sp.simplify(sp.diff(g2, x).subs(P) - gx) == 0 and sp.simplify(sp.diff(g2, y).subs(P) - gy) == 0
assert sp.simplify(-6*sp.sqrt(6)*sp.sin(2*sp.pi/3) - gx) == 0
hh = sp.Float("1e-8"); q = (f.subs({x: P[x] + hh*u[0], y: P[y] + hh*u[1]}) - f.subs(P))/hh; assert abs(float(q) + 3) < 1e-4
assert gx*(-2*sp.sqrt(6)*0 + 6*sp.sqrt(2)) + gy*(9*sp.sqrt(2))*(-1)*(-1) == -9*sp.sqrt(2)*6*sp.sqrt(2) + 6*sp.sqrt(2)*9*sp.sqrt(2) == 0   # ∇z ⊥ (6√2, 9√2)
en_mdx(r"-9\sqrt2", r"6\sqrt2", r"\sqrt{234}\approx15{,}3", r"146{,}31^\circ", r"\frac{\partial z}{\partial s}=-3")

# --- Ej 4: z = x³ − 12xy + 8y³ − 3 ---
g = x**3 - 12*x*y + 8*y**3 - 3
cp = {(s[x], s[y]) for s in sp.solve([sp.diff(g, x), sp.diff(g, y)], [x, y], dict=True)}
real = {(p, q) for p, q in cp if p.is_real and q.is_real}; assert real == {(0, 0), (2, 1)}
assert sp.factor(4*y**4 - 4*y) == 4*y*(y - 1)*(y**2 + y + 1) and sp.solve(y**3 - 1, y, dict=False)[0] == 1
gxx, gyy, gxy = sp.diff(g, x, 2), sp.diff(g, y, 2), sp.diff(g, x, y); assert (gxx, gyy, gxy) == (6*x, 48*y, -12)
H = sp.expand(gxx*gyy - gxy**2); assert H == 288*x*y - 144
assert H.subs({x: 0, y: 0}) == -144 and H.subs({x: 2, y: 1}) == 432 and gxx.subs(x, 2) == 12 and gyy.subs(y, 1) == 48
assert g.subs({x: 2, y: 1}) == -11 and g.subs({x: 0, y: 0}) == -3
# comprobación: vecinos de (2,1) a distancia 0.1 son mayores; en (0,0) hay mayores y menores
vec = [(2 + i*R(1, 10), 1 + j*R(1, 10)) for i in (-1, 0, 1) for j in (-1, 0, 1) if (i, j) != (0, 0)]
assert all(g.subs({x: p, y: q}) > -11 for p, q in vec)
e = sp.Symbol("e", positive=True)
assert sp.expand(g.subs({x: e, y: e}) - g.subs({x: 0, y: 0})) == 9*e**3 - 12*e**2 and sp.expand(g.subs({x: e, y: -e}) - g.subs({x: 0, y: 0})) == -7*e**3 + 12*e**2
assert (9*R(1, 10)**3 - 12*R(1, 10)**2) < 0 and (-7*R(1, 10)**3 + 12*R(1, 10)**2) > 0
en_mdx(r"H(x,y)=6x\cdot48y-(-12)^2=288xy-144", r"H(0,0)=-144\lt0", r"H(2,1)=432\gt0", r"z(2,1)=8-24+8-3=-11")

# --- Ej 5: Lagrange, V = xyz, x + 3y/2 + 3z = 9 ---
F = x*y*z - l*(x + R(3, 2)*y + 3*z - 9)
s5 = sp.solve([sp.diff(F, v) for v in (x, y, z, l)], [x, y, z, l], dict=True)
s5 = [s for s in s5 if s[x] > 0 and s[y] > 0 and s[z] > 0]; assert len(s5) == 1; s5 = s5[0]
assert (s5[x], s5[y], s5[z], s5[l]) == (3, 2, 1, 2) and s5[x]*s5[y]*s5[z] == 6
assert (s5[y]*s5[z], R(2, 3)*s5[x]*s5[z], R(1, 3)*s5[x]*s5[y]) == (2, 2, 2)
assert 3*3 == 9 and 3 + R(3, 2)*2 + 3*1 == 9
# comprobación 1: sustitución z = (9 − x − 3y/2)/3
Vs = x*y*(9 - x - R(3, 2)*y)/3
ss = sp.solve([sp.diff(Vs, x), sp.diff(Vs, y)], [x, y], dict=True); assert {(s[x], s[y]) for s in ss if s[x] > 0 and s[y] > 0} == {(3, 2)}
Hs = sp.diff(Vs, x, 2)*sp.diff(Vs, y, 2) - sp.diff(Vs, x, y)**2
assert sp.diff(Vs, x, 2).subs({x: 3, y: 2}) == -R(4, 3) and sp.diff(Vs, y, 2).subs({x: 3, y: 2}) == -3 and sp.diff(Vs, x, y).subs({x: 3, y: 2}) == -1 and Hs.subs({x: 3, y: 2}) == 3
assert Vs.subs({x: 3, y: 2}) == 6
# comprobación 2: tres sumandos x, 3y/2, 3z suman 9 → producto máximo con los tres iguales a 3 (x·(3y/2)·3z = 9/2·xyz)
assert 3*3*3 == 27 and R(9, 2)*6 == 27
en_mdx(r"V=xyz=3\cdot2\cdot1=6\ \text{m}^3", r"x=3", r"y=\tfrac23x=2", r"\lambda=yz=2")
print("OK p1-1r7-2025-10")
