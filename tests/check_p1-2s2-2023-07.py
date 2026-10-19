"""Recalcula con sympy el 1º Parcial 2S2 (7/7/2023): resultados e intermedios, y que el MDX diga lo mismo.
Uso: python3 tests/check_p1-2s2-2023-07.py"""
from pathlib import Path
import sympy as sp

MDX = (Path(__file__).resolve().parents[1] / "src/content/parciales/p1-2s2-2023-07.mdx").read_text()
def en_mdx(*ss):
    for s in ss: assert s in MDX, f"falta en el MDX: {s}"
R = sp.Rational
x, y, z, l, t, u, v, w = sp.symbols("x y z lambda t u v w", real=True)

# --- Ej 1: x²/4 + y²/9 ≤ 1 ∧ x² + y² > 1 ---
def en_dom(p, q): p, q = R(p), R(q); return (36 - 9*p**2 - 4*q**2 >= 0) and (p**2 + q**2 > 1)
assert en_dom(R(3, 2), 0) and en_dom(2, 0) and en_dom(0, 3) and en_dom(0, -3) and en_dom(0, 2)
assert not en_dom(0, R(1, 2)) and not en_dom(1, 0) and not en_dom(2, 2) and not en_dom(0, 4) and not en_dom(0, 0)
assert sp.expand((36 - 9*x**2 - 4*y**2)/-36 + 1 - (x**2/4 + y**2/9)) == 0           # 36−9x²−4y² ≥ 0 ⇔ x²/4+y²/9 ≤ 1
assert 36 - 9*R(9, 4) - 0 == R(63, 4) and R(9, 4) - 1 == R(5, 4)                    # (3/2, 0): radicando 63/4=15,75 y ln(5/4)
assert 36 - 36 - 16 < 0 and 36 - 9*4 - 0 == 0                                       # (2,2) fuera; (2,0) borde, raíz de 0
# la circunferencia r=1 queda dentro de la elipse: máx de 9x²+4y² sobre x²+y²=1 es 9 ≤ 36
assert max(9*sp.cos(a)**2 + 4*sp.sin(a)**2 for a in [0, sp.pi/2]) == 9 < 36
en_mdx(r"\frac{x^2}{4}+\frac{y^2}{9}\le1", r"x^2+y^2>1", r"36-9x^2-4y^2\ge0", r"\sqrt{15{,}75}")

# --- Ej 2: paralelepípedo 2×3×6, errores 1% ---
X, Y, Z = sp.symbols("X Y Z", positive=True); P2 = {X: 2, Y: 3, Z: 6}
Vv = X*Y*Z; D = sp.sqrt(X**2 + Y**2 + Z**2)
dx, dy, dz = R(1, 100)*2, R(1, 100)*3, R(1, 100)*6; assert (dx, dy, dz) == (R(2, 100), R(3, 100), R(6, 100))
assert Vv.subs(P2) == 36 and [sp.diff(Vv, w).subs(P2) for w in (X, Y, Z)] == [18, 12, 6]
terms = [18*dx, 12*dy, 6*dz]; assert terms == [R(36, 100)]*3
dV = sum(terms); assert dV == R(108, 100) and dV/36*100 == 3
assert D.subs(P2) == 7 and [sp.diff(D, w).subs(P2) for w in (X, Y, Z)] == [R(2, 7), R(3, 7), R(6, 7)]
dD = R(2, 7)*dx + R(3, 7)*dy + R(6, 7)*dz; assert dD == R(7, 100) and dD/7*100 == 1
assert R(4, 100) + R(9, 100) + R(36, 100) == R(49, 100) and R(49, 100)/7 == R(7, 100)
dVr = (2 + dx)*(3 + dy)*(6 + dz) - 36; assert dVr == R(1090836, 10**6) and abs(float(dVr) - 1.0908) < 1e-4
assert (2 + dx)**2 + (3 + dy)**2 + (6 + dz)**2 == R(499849, 10000) and R(707, 100)**2 == R(499849, 10000)
assert sp.sqrt((2 + dx)**2 + (3 + dy)**2 + (6 + dz)**2) - 7 == R(7, 100)
# comprobación 2: si todos los lados crecen 1%, V crece ≈3% y D crece 1% (homogénea de grado 1)
assert D.subs({X: 2*R(101, 100), Y: 3*R(101, 100), Z: 6*R(101, 100)}) == 7*R(101, 100)
en_mdx(r"dV=0{,}36+0{,}36+0{,}36=1{,}08\ \text{cm}^3", r"E\%=\frac{1{,}08}{36}\cdot100=3\%", r"\frac{0{,}04+0{,}09+0{,}36}{7}=\frac{0{,}49}{7}=0{,}07\ \text{cm}", r"E\%=\frac{0{,}07}{7}\cdot100=1\%", r"7{,}07^2=49{,}9849")

# --- Ej 3: f = ln(x/y), P(1,2), bisectriz del 2.º cuadrante (135°) ---
f3 = sp.log(x/y); s = (-sp.sqrt(2)/2, sp.sqrt(2)/2)
assert (sp.cos(3*sp.pi/4), sp.sin(3*sp.pi/4)) == s
q = sp.simplify((f3.subs({x: 1 + t*s[0], y: 2 + t*s[1]}) - f3.subs({x: 1, y: 2}))/t)
Dd = sp.limit(q, t, 0, "+"); assert sp.simplify(Dd + 3*sp.sqrt(2)/4) == 0 and sp.limit(q, t, 0, "-") == Dd       # por definición, ambos lados
diff_log = sp.log(1 - sp.sqrt(2)/2*t) - sp.log(1 + sp.sqrt(2)/4*t)
assert sp.simplify(f3.subs({x: 1 + t*s[0], y: 2 + t*s[1]}) - f3.subs({x: 1, y: 2}) - diff_log) == 0 or sp.simplify(sp.expand_log(diff_log.subs(t, R(1, 10)) - (f3.subs({x: 1 + t*s[0], y: 2 + t*s[1]}) - f3.subs({x: 1, y: 2})).subs(t, R(1, 10)), force=True)) == 0
assert abs(float(diff_log.subs(t, R(1, 10)) - (f3.subs({x: 1 + t*s[0], y: 2 + t*s[1]}) - f3.subs({x: 1, y: 2})).subs(t, R(1, 10)))) < 1e-12
assert sp.limit(diff_log/t, t, 0) == -sp.sqrt(2)/2 - sp.sqrt(2)/4 and sp.limit(sp.log(1 + 3*t)/t, t, 0) == 3
fx, fy = sp.diff(f3, x), sp.diff(f3, y); assert (fx, fy) == (1/x, -1/y) and (fx.subs({x: 1, y: 2}), fy.subs({x: 1, y: 2})) == (1, -R(1, 2))
ds = fx.subs({x: 1, y: 2})*s[0] + fy.subs({x: 1, y: 2})*s[1]; assert sp.simplify(ds - Dd) == 0 and abs(float(Dd) + 1.06) < .01
assert sp.sqrt(1 + R(1, 4)) == sp.sqrt(5)/2 and abs(float(sp.sqrt(5)/2) - 1.12) < .01
th = float(sp.atan(-R(1, 2)))*180/3.141592653589793; assert abs(th + 26.57) < .01 and abs(th % 360 - 333.43) < .01
om = 135 - th; assert abs(om - 161.57) < .01 and abs(float(sp.sqrt(5)/2)*float(sp.cos(sp.rad(om))) + 1.0607) < 1e-3
assert abs((th + 180) % 360 - 153.43) < .01 and abs((th + 90) % 360 - 63.43) < .01 and abs((th - 90) % 360 - 243.43) < .01
en_mdx(r"\frac{\partial f}{\partial s}\Big|_P=-\frac{3\sqrt2}{4}\approx-1{,}06", r"\nabla f(P)=\frac11\,i-\frac12\,j=i-\frac12\,j", r"\|\nabla f\|=\sqrt{1^2+\left(-\frac12\right)^2}=\sqrt{\frac54}=\frac{\sqrt5}{2}", r"-26{,}57^\circ")

# --- Ej 4: z = 4/3 x³ + 1/3 y³ − 6x² + y² + 9x − 2 ---
z4 = R(4, 3)*x**3 + R(1, 3)*y**3 - 6*x**2 + y**2 + 9*x - 2
zx, zy = sp.diff(z4, x), sp.diff(z4, y)
assert sp.factor(zx) == (2*x - 3)**2 and (-12)**2 - 4*4*9 == 0 and sp.factor(zy) == y*(y + 2)
cp = sp.solve([zx, zy], [x, y], dict=True); assert {(c[x], c[y]) for c in cp} == {(R(3, 2), 0), (R(3, 2), -2)}
zxx, zyy, zxy = sp.diff(z4, x, 2), sp.diff(z4, y, 2), sp.diff(z4, x, y); assert (sp.expand(zxx), sp.expand(zyy), zxy) == (8*x - 12, 2*y + 2, 0)
H = sp.expand(zxx*zyy - zxy**2); assert sp.expand(H - 8*(2*x - 3)*(y + 1)) == 0
assert H.subs({x: R(3, 2), y: 0}) == 0 and H.subs({x: R(3, 2), y: -2}) == 0
assert z4.subs({x: R(3, 2), y: 0}) == R(5, 2) and z4.subs({x: R(3, 2), y: -2}) == R(23, 6)
d1 = sp.expand(z4.subs({x: R(3, 2) + u, y: v}) - R(5, 2)); assert d1 == R(4, 3)*u**3 + v**2 + v**3/3
d2 = sp.expand(z4.subs({x: R(3, 2) + u, y: -2 + w}) - R(23, 6)); assert d2 == R(4, 3)*u**3 - w**2 + w**3/3
# cambio de signo del incremento (ambos puntos): sobre v=0 / w=0 y el signo en el eje perpendicular
assert d1.subs(v, 0) == R(4, 3)*u**3 and d2.subs(w, 0) == R(4, 3)*u**3
assert d1.subs({v: 0, u: R(1, 10)}) > 0 and d1.subs({v: 0, u: -R(1, 10)}) < 0 and d2.subs({w: 0, u: R(1, 10)}) > 0 and d2.subs({w: 0, u: -R(1, 10)}) < 0
assert sp.factor(d1.subs(u, 0)) == v**2*(v + 3)/3 and all(d1.subs({u: 0, v: e}) > 0 for e in (R(1, 10), -R(1, 10), R(1, 100)))
assert all(d2.subs({u: 0, w: e}) < 0 for e in (R(1, 10), -R(1, 10), R(1, 100)))
# comprobación: z'_x = (2x−3)² ≥ 0 → x ↦ z(x,y) estrictamente creciente para todo y
assert z4.subs({x: R(3, 2) + R(1, 10), y: 0}) - R(5, 2) == R(4, 3)*R(1, 1000) and z4.subs({x: R(3, 2) - R(1, 10), y: 0}) - R(5, 2) == -R(4, 3)*R(1, 1000)
assert all(zx.subs(x, p) > 0 for p in (0, 1, 2, 3, R(14, 10), R(16, 10)))
en_mdx(r"z'_x=4x^2-12x+9=(2x-3)^2=0", r"H(x;y)=(8x-12)(2y+2)=8\,(2x-3)(y+1)", r"\Delta z=\frac43u^3+v^2+\frac{v^3}{3}", r"\Delta z=\frac43u^3-w^2+\frac{w^3}{3}", r"\frac{23}{6}")

# --- Ej 5: caja con tapa, S = 216 ---
F5 = x*y*z - l*(2*(x*y + y*z + x*z) - 216)
assert sp.expand(sp.diff(F5, x) - (y*z - 2*l*(y + z))) == 0 and sp.expand(sp.diff(F5, y) - (x*z - 2*l*(x + z))) == 0 and sp.expand(sp.diff(F5, z) - (x*y - 2*l*(x + y))) == 0
sol = sp.solve([sp.diff(F5, w) for w in (x, y, z, l)], [x, y, z, l], dict=True)
pos = [c for c in sol if all(c[w].is_real and c[w] > 0 for w in (x, y, z))]; assert len(pos) == 1 and (pos[0][x], pos[0][y], pos[0][z]) == (6, 6, 6) and pos[0][l] == R(3, 2)
assert pos[0][x]*pos[0][y]*pos[0][z] == 216 and 2*(36 + 36 + 36) == 216 and 6*6**2 == 216
assert sp.expand(y*z*(x + z) - x*z*(y + z)) == sp.expand(y*z**2 - x*z**2) and sp.expand(z*(x + y) - x*(y + z)) == sp.expand(z*y - x*y)
assert sp.solve(2*(3*x**2) - 216, x) == [-6, 6] and 6*x**2 - 216 == 6*(x**2 - 36)
# lo que figura en el escaneo (sin el factor 2): 3x²=216
assert sp.solve(3*x**2 - 216, x) == [-6*sp.sqrt(2), 6*sp.sqrt(2)] and (6*sp.sqrt(2))**3 == 432*sp.sqrt(2) and 6*(6*sp.sqrt(2))**2 == 432 != 216
# comprobación 2: AM–GM, xy+yz+xz = 108 → V ≤ 108^{3/2}/3^{3/2} = 216
assert (R(108, 3))**R(3, 2) == 216 and sp.sqrt(36)**3 == 216
# comprobación 3: sustitución z=(108−xy)/(x+y) y máximo en (6,6)
Vs = x*y*(108 - x*y)/(x + y); ss = sp.solve([sp.diff(Vs, x), sp.diff(Vs, y)], [x, y], dict=True)
assert {(c[x], c[y]) for c in ss if c[x].is_real and c[y].is_real and c[x] > 0 and c[y] > 0} == {(6, 6)} and Vs.subs({x: 6, y: 6}) == 216
en_mdx(r"6x^2=216\ \Rightarrow\ x^2=36\ \Rightarrow\ x=6", r"V=6\cdot6\cdot6=216\ \text{cm}^3", r"V\le36^{3/2}=216", r"x=y=z=6\ \text{cm},\qquad V_{\text{máx}}=216\ \text{cm}^3", r"432\sqrt2")
en_mdx(r"""La resolución del profe resuelve el inciso (a) con la fórmula $f'_x\cos\alpha+f'_y\sin\alpha$ y no por definición, como pide la consigna (mismo resultado, $-\frac{3\sqrt2}{4}$);""")  # aviso de discrepancia con la resolución del profe
en_mdx(r"""La resolución del profe da $x=y=z=6\sqrt2$ y $V=432\sqrt2\ \text{cm}^3$ (pierde el factor $2$ de la superficie); acá $x=y=z=6$ y $V=216\ \text{cm}^3$;""")  # aviso de discrepancia con la resolución del profe
en_mdx(r"""Saco denominador común $7$""")
print("OK p1-2s2-2023-07")
