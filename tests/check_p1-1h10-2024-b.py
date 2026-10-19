"""Recalcula con sympy el 1º Parcial 1H10 (B) 2024: resultados e intermedios, y que el MDX diga lo mismo.
Uso: python3 tests/check_p1-1h10-2024-b.py"""
from pathlib import Path
import sympy as sp

MDX = (Path(__file__).resolve().parents[1] / "src/content/parciales/p1-1h10-2024-b.mdx").read_text()
def en_mdx(*ss):
    for s in ss: assert s in MDX, f"falta en el MDX: {s}"
R = sp.Rational
x, y, l = sp.symbols("x y lambda", real=True)

# --- Ej 1: x²+y²<4 ∧ −1 ≤ y−x ≤ 1
def en_dom(p, q): return p**2 + q**2 < 4 and -1 <= q - p <= 1
assert en_dom(0, 0) and en_dom(R(1, 2), R(3, 2))            # sobre y=x+1, dentro del disco
assert not en_dom(1, 2) and not en_dom(R(3, 2), 0)          # fuera del disco / fuera de la banda
assert not en_dom(2, 0) and not en_dom(0, 2)                # borde del círculo excluido
assert R(1, 4) + R(9, 4) == R(5, 2) < 4
# cortes de la recta y=x+1 con la circunferencia: 2x²+2x−3=0
assert set(sp.solve(2*x**2 + 2*x - 3, x)) == {(-1 - sp.sqrt(7))/2, (-1 + sp.sqrt(7))/2} and abs(float((-1 + sp.sqrt(7))/2) - .82) < .01
assert sp.expand(x**2 + (x + 1)**2 - 4) == 2*x**2 + 2*x - 3
en_mdx(r"x^2+y^2\lt4", r"-1+x\le y\le1+x", r"x^2+y^2\lt4\ \wedge\ -1+x\le y\le1+x")

# --- Ej 2 (lectura del profe): z = 2√(5x²−y²) − 3y/x − ln((xy)²), P(1,1), α = 3π/4
f = 2*sp.sqrt(5*x**2 - y**2) - 3*y/x - sp.log((x*y)**2); P = {x: 1, y: 1}
fx, fy = sp.diff(f, x), sp.diff(f, y)
assert sp.simplify(fx - (10*x/sp.sqrt(5*x**2 - y**2) + 3*y/x**2 - 2/x)) == 0
assert sp.simplify(fy - (-2*y/sp.sqrt(5*x**2 - y**2) - 3/x - 2/y)) == 0
assert sp.sqrt(5*1 - 1) == 2 and (fx.subs(P), fy.subs(P)) == (6, -6)
al = 3*sp.pi/4; assert (sp.cos(al), sp.sin(al)) == (-sp.sqrt(2)/2, sp.sqrt(2)/2)
ds = sp.simplify(6*sp.cos(al) + (-6)*sp.sin(al)); assert ds == -6*sp.sqrt(2)
assert sp.sqrt(36 + 36) == 6*sp.sqrt(2) and sp.atan(R(-6, 6)) == -sp.pi/4
# 135° es el sentido opuesto a ∇z (315°): direccional = −‖∇z‖
assert ds == -sp.sqrt(36 + 36)
hh = sp.Float("1e-8"); q = (f.subs({x: 1 + hh*sp.cos(al), y: 1 + hh*sp.sin(al)}) - f.subs(P))/hh; assert abs(float(q) + 6*float(sp.sqrt(2))) < 1e-4
# enunciado literal: radicando 0 en P y se sale del dominio hacia 135°
g = 2*sp.sqrt(x**2 - y**2) + 3*y/x - sp.log((x*y)**2)
assert (1**2 - 1**2) == 0 and sp.simplify(sp.diff(g, x) - (2*x/sp.sqrt(x**2 - y**2) - 2/x - 3*y/x**2)) == 0
t = sp.Symbol("t", positive=True); assert sp.expand((1 - t*sp.sqrt(2)/2)**2 - (1 + t*sp.sqrt(2)/2)**2) == -2*sp.sqrt(2)*t   # radicando <0 para t>0
# lo que escribe el profe (no coincide): ∇=5i+j, ∂z/∂s=−2√2, ‖∇‖=√26, θ=arctan(1/5)
assert 5*(-sp.sqrt(2)/2) + 1*(sp.sqrt(2)/2) == -2*sp.sqrt(2) and sp.sqrt(25 + 1) == sp.sqrt(26) and (-2*sp.sqrt(2)) != ds
assert 3 - 2 == 1 and R(10, 2) == 5      # 3y/x² − 2xy/(x²y²) = 1 en P (es parte de z'_x) y 10x/√(5x²−y²) = 5
en_mdx(r"z'_x(P)=\frac{10}{2}+3-2=6", r"z'_y(P)=\frac{-2}{2}-3-2=-6", r"\frac{\partial z}{\partial s}=-6\sqrt2\approx-8{,}49",
       r"\|\nabla z\|=\sqrt{36+36}=6\sqrt2", r"\arctan(-1)=-45^\circ", r"\sqrt{26}", r"-2\sqrt2", r"5\,\vec i+\vec j")

# --- Ej 3: f = 4/3 x³ + 1/3 y³ − 2x² − y − 10
f3 = R(4, 3)*x**3 + R(1, 3)*y**3 - 2*x**2 - y - 10
sol = {(s[x], s[y]) for s in sp.solve([sp.diff(f3, x), sp.diff(f3, y)], [x, y], dict=True)}; assert sol == {(0, 1), (0, -1), (1, 1), (1, -1)}
assert sp.expand(sp.diff(f3, x)) == 4*x**2 - 4*x and sp.diff(f3, y) == y**2 - 1
fxx, fyy, fxy = sp.expand(sp.diff(f3, x, 2)), sp.diff(f3, y, 2), sp.diff(f3, x, y); assert (fxx, fyy, fxy) == (8*x - 4, 2*y, 0)
H = sp.expand(fxx*fyy - fxy**2); assert H == 16*x*y - 8*y and sp.expand(8*y*(2*x - 1)) == H
Hv = {p: H.subs({x: p[0], y: p[1]}) for p in sol}; assert Hv == {(0, 1): -8, (0, -1): 8, (1, 1): 8, (1, -1): -8}
assert fyy.subs(y, -1) == -2 and fyy.subs(y, 1) == 2 and fxx.subs(x, 0) == -4 and fxx.subs(x, 1) == 4
assert f3.subs({x: 0, y: -1}) == -R(28, 3) and f3.subs({x: 1, y: 1}) == -R(34, 3)
# comprobación por entorno
vec = lambda c: [(c[0] + i*R(1, 10), c[1] + j*R(1, 10)) for i in (-1, 0, 1) for j in (-1, 0, 1) if (i, j) != (0, 0)]
assert all(f3.subs({x: p, y: q}) > f3.subs({x: 1, y: 1}) for p, q in vec((1, 1)))
assert all(f3.subs({x: p, y: q}) < f3.subs({x: 0, y: -1}) for p, q in vec((0, -1)))
for c in [(0, 1), (1, -1)]:
    v0 = f3.subs({x: c[0], y: c[1]}); vs = [f3.subs({x: p, y: q}) - v0 for p, q in vec(c)]; assert max(vs) > 0 > min(vs)
assert f3.subs({x: 0, y: R(11, 10)}) > f3.subs({x: 0, y: 1}) and f3.subs({x: R(1, 10), y: 1}) < f3.subs({x: 0, y: 1})
en_mdx(r"H(x,y)=(8x-4)\cdot2y-0^2=8y\,(2x-1)", r"H(0,1)=8\cdot1\cdot(-1)=-8\lt0", r"H(0,-1)=8\cdot(-1)\cdot(-1)=8\gt0",
       r"H(1,1)=8\cdot1\cdot1=8\gt0", r"H(1,-1)=8\cdot(-1)\cdot1=-8\lt0", r"f(0,-1)=-\frac{28}3", r"f(1,1)=-\frac{34}3")

# --- Ej 4: Lagrange
z4 = x**2/2 + y**2 + x - y; F = z4 - l*(x + y - 1)
s4 = sp.solve([sp.diff(F, v) for v in (x, y, l)], [x, y, l], dict=True); assert s4 == [{x: 0, y: 1, l: 1}]
assert sp.diff(F, x) == x + 1 - l and sp.diff(F, y) == 2*y - 1 - l
assert sp.solve(sp.Eq(x + 1, 2*y - 1), x) == [2*y - 2] and sp.solve((2*y - 2) + y - 1, y) == [1]
assert z4.subs({x: 0, y: 1}) == 0
zs = sp.expand(z4.subs(y, 1 - x)); assert zs == R(3, 2)*x**2 and sp.diff(zs, x, 2) == 3 and sp.solve(sp.diff(zs, x), x) == [0]
assert (sp.diff(z4, x).subs({x: 0, y: 1}), sp.diff(z4, y).subs({x: 0, y: 1})) == (1, 1)       # ∇z = λ·(1,1)
en_mdx(r"x=2y-2", r"y=1", r"\frac32x^2", r"\text{Mín}\ (x,y)=(0,1),\qquad z=0,\ \lambda=1", r"\nabla z(0,1)=(x+1,\,2y-1)=(1,1)")
print("OK p1-1h10-2024-b")
