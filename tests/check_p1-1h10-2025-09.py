"""Recalcula con sympy el 1º Parcial 1H10 (27/09/2025): resultados e intermedios, y que el MDX diga lo mismo.
Uso: python3 tests/check_p1-1h10-2025-09.py"""
from pathlib import Path
import sympy as sp

MDX = (Path(__file__).resolve().parents[1] / "src/content/parciales/p1-1h10-2025-09.mdx").read_text()
def en_mdx(*ss):
    for s in ss: assert s in MDX, f"falta en el MDX: {s}"
R = sp.Rational
x, y, z, l = sp.symbols("x y z lambda", real=True)

# --- Ej 1: dominio. Condiciones: |4-x²-4y²|≠0 (ln), |xy|≠0 (log), x²-y²-1>0 (raíz en el denominador)
def en_dominio(a, b):
    return (a**2 - b**2 - 1 > 0) and (4 - a**2 - 4*b**2 != 0) and (a*b != 0)
assert en_dominio(3, 1) and en_dominio(-3, 1) and en_dominio(-3, -1)
assert not en_dominio(3, 0)                                   # eje x excluido (log|xy|)
assert not en_dominio(1, 0.5) and not en_dominio(0.5, 0.1)    # x²-y²≤1: fuera
assert not en_dominio(1, 0) and not en_dominio(0, 3)          # x=0 ya queda fuera por x²>1+y²
# cruce elipse–hipérbola: x²=1+y², x²+4y²=4 → y²=3/5, x²=8/5 (4 puntos)
sol = sp.solve([x**2 - y**2 - 1, x**2 + 4*y**2 - 4], [x, y], dict=True)
assert len(sol) == 4 and all(s[y]**2 == R(3, 5) and s[x]**2 == R(8, 5) for s in sol)
# arco de la elipse que SÍ cae en la región: ej. y=1/2 → x²=3, x²-y²=11/4>1, y ahí 4-x²-4y²=0 → excluido
xe = sp.sqrt(3); assert xe**2 + 4*R(1, 4) == 4 and xe**2 - R(1, 4) - 1 == R(7, 4) and not en_dominio(xe, R(1, 2))
# y la parte de la elipse con |y|>√(3/5) cae fuera de la región (4-4y²<1+y²)
assert sp.solve(sp.Eq(4 - 4*y**2, 1 + y**2), y) == [-sp.sqrt(R(3, 5)), sp.sqrt(R(3, 5))]
en_mdx(r"x^2-y^2\gt1", r"x^2+4y^2\ne4", r"y\ne0", r"y^2=\frac35,\qquad x^2=\frac85")

# --- Ej 2: V = xyz, (3,2,1), e = 1% de cada medida
X_, Y_, Z_ = x, y, z
V = x*y*z; pt = {x: 3, y: 2, z: 1}; dx, dy, dz = R(3, 100), R(2, 100), R(1, 100)
assert V.subs(pt) == 6
dV = sp.diff(V, x).subs(pt)*dx + sp.diff(V, y).subs(pt)*dy + sp.diff(V, z).subs(pt)*dz
assert [sp.diff(V, x).subs(pt), sp.diff(V, y).subs(pt), sp.diff(V, z).subs(pt)] == [2, 3, 6]
assert [2*dx, 3*dy, 6*dz] == [R(6, 100)]*3 and dV == R(18, 100)
assert dV/V.subs(pt)*100 == 3
dV_real = (3 + dx)*(2 + dy)*(1 + dz) - 6; assert dV_real == R(1818060, 10**7) and abs(float(dV_real) - float(dV)) < 2e-3   # ΔV real
IOS = dV_real - dV; assert IOS == R(1806, 10**6)
en_mdx(r"dV=0{,}18\ \text{m}^3", r"E\%=3\%", r"\Delta V=6{,}181806-6=0{,}181806")

# --- Ej 3: z = x³ y e^{x y²}, P(1,1), α=60°
f = x**3*y*sp.exp(x*y**2); P = {x: 1, y: 1}
fx, fy = sp.diff(f, x), sp.diff(f, y)
assert sp.simplify(fx - (3*x**2*y*sp.exp(x*y**2) + x**3*y**3*sp.exp(x*y**2))) == 0
assert sp.simplify(fy - (x**3*sp.exp(x*y**2) + 2*x**4*y**2*sp.exp(x*y**2))) == 0
gx, gy = sp.simplify(fx.subs(P)), sp.simplify(fy.subs(P)); assert (gx, gy) == (4*sp.E, 3*sp.E)
u = (sp.cos(sp.pi/3), sp.sin(sp.pi/3)); assert u == (R(1, 2), sp.sqrt(3)/2)
ds = sp.simplify(gx*u[0] + gy*u[1]); assert sp.simplify(ds - sp.E*(2 + R(3, 2)*sp.sqrt(3))) == 0 and abs(float(ds) - 12.4989) < 1e-3
assert sp.simplify(sp.sqrt(gx**2 + gy**2) - 5*sp.E) == 0
th = sp.atan(R(3, 4)); assert abs(float(th)*180/float(sp.pi) - 36.87) < 1e-2
# comprobación: cociente incremental numérico en la dirección de 60°
h = sp.Float("1e-8"); q = (f.subs({x: 1 + h*u[0], y: 1 + h*u[1]}) - f.subs(P))/h; assert abs(float(q) - float(ds)) < 1e-4
# crecimiento nulo ⇒ perpendicular al gradiente: ∇·(−3,4)/5 = 0
assert gx*(-3) + gy*4 == 0
en_mdx(r"4e\,\vec i+3e\,\vec j", r"5e", r"e\Big(2+\tfrac32\sqrt3\Big)\approx12{,}5", r"37^\circ")

# --- Ej 4: z = x³+3y²−3x−9y+y³
g = x**3 + 3*y**2 - 3*x - 9*y + y**3
assert sp.solve([sp.diff(g, x), sp.diff(g, y)], [x, y], dict=True) == [{x: -1, y: -3}, {x: -1, y: 1}, {x: 1, y: -3}, {x: 1, y: 1}] or \
       {(s[x], s[y]) for s in sp.solve([sp.diff(g, x), sp.diff(g, y)], [x, y], dict=True)} == {(1, 1), (1, -3), (-1, 1), (-1, -3)}
gxx, gyy, gxy = sp.diff(g, x, 2), sp.diff(g, y, 2), sp.diff(g, x, y)
assert (gxx, sp.expand(gyy), gxy) == (6*x, 6*y + 6, 0)
H = sp.expand(gxx*gyy - gxy**2); assert H == 36*x*y + 36*x
res = {(1, 1): (72, 6, g.subs({x: 1, y: 1})), (1, -3): (-72, 6, g.subs({x: 1, y: -3})), (-1, 1): (-72, -6, g.subs({x: -1, y: 1})), (-1, -3): (72, -6, g.subs({x: -1, y: -3}))}
for (a, b), (Hv, fxx, zv) in res.items():
    assert H.subs({x: a, y: b}) == Hv and gxx.subs({x: a}) == fxx
assert [res[k][2] for k in res] == [-7, 25, -3, 29]
# comprobación: z = φ(x)+ψ(y), φ = x³−3x, ψ = y³+3y²−9y
ph, ps = x**3 - 3*x, y**3 + 3*y**2 - 9*y
assert sp.expand(ph + ps - g) == 0
assert (ph.subs(x, 1), ph.subs(x, -1), ps.subs(y, 1), ps.subs(y, -3)) == (-2, 2, -5, 27)     # φ mín en 1, máx en −1; ψ mín en 1, máx en −3
assert (sp.diff(ph, x, 2).subs(x, 1), sp.diff(ps, y, 2).subs(y, 1), sp.diff(ps, y, 2).subs(y, -3)) == (6, 12, -12)
en_mdx(r"36x\,(y+1)", r"H=36\cdot1\cdot2=72\gt0", r"H=36\cdot1\cdot(-2)=-72\lt0", r"H=36\cdot(-1)\cdot2=-72\lt0", r"H=36\cdot(-1)\cdot(-2)=72\gt0", r"z(1,1)=1+3-3-9+1=-7", r"z(-1,-3)=-1+27+3+27-27=29")

# --- Ej 5: mín. distancia al origen del plano x+3y+6z=49
F = x**2 + y**2 + z**2 - l*(x + 3*y + 6*z - 49)
s5 = sp.solve([sp.diff(F, v) for v in (x, y, z, l)], [x, y, z, l], dict=True); assert len(s5) == 1
s5 = s5[0]; assert (s5[x], s5[y], s5[z]) == (R(49, 46), R(147, 46), R(294, 46)) and s5[l] == R(49, 23)
assert 2*s5[x] - s5[l] == 0 and 2*s5[y] - 3*s5[l] == 0 and 2*s5[z] - 6*s5[l] == 0
d5 = sp.sqrt(s5[x]**2 + s5[y]**2 + s5[z]**2); assert sp.simplify(d5 - 49/sp.sqrt(46)) == 0 and abs(float(d5) - 7.2246) < 1e-4
assert 46*R(49, 46) == 49
# comprobación geométrica: distancia punto–plano |−49|/√(1+9+36)
assert sp.simplify(49/sp.sqrt(1 + 9 + 36) - d5) == 0
# comprobación por sustitución: x = 49 − 3y − 6z, mínimo de D² (hessiano definido positivo)
D2 = (49 - 3*y - 6*z)**2 + y**2 + z**2; sub = sp.solve([sp.diff(D2, y), sp.diff(D2, z)], [y, z], dict=True)[0]
assert sub == {y: R(147, 46), z: R(294, 46)} and sp.diff(D2, y, 2) > 0 and sp.diff(D2, y, 2)*sp.diff(D2, z, 2) - sp.diff(D2, y, z)**2 > 0
assert sp.simplify(sp.sqrt(D2.subs(sub)) - d5) == 0
en_mdx(r"\frac{49}{\sqrt{46}}\approx7{,}2246", r"x=\frac{49}{46}", r"\lambda=2x=\frac{49}{23}")
print("OK p1-1h10-2025-09")
