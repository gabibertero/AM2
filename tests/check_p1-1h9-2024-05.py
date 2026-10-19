"""Recalcula con sympy el 1º parcial 1H9 May-24: resultados e intermedios, y que el MDX diga lo mismo.
Uso: python3 tests/check_p1-1h9-2024-05.py"""
from pathlib import Path
import numpy as np
import sympy as sp

M = (Path(__file__).resolve().parents[1] / "src/content/parciales/p1-1h9-2024-05.mdx").read_text()


def en_mdx(*ss):
    for s in ss:
        assert s in M, f"falta en el MDX: {s}"


R = sp.Rational
x, y, z, t = sp.symbols("x y z t", real=True)
r3 = sp.sqrt(3)


def dir_deriv(f, P, v):
    """Por definición: límite de [f(P+t·s°) − f(P)]/t con s° = v/|v| (versor)."""
    u = sp.Matrix(v) / sp.Matrix(v).norm()
    g = f.subs({x: P[0] + t*u[0], y: P[1] + t*u[1]})
    return sp.simplify(sp.limit((g - f.subs({x: P[0], y: P[1]}))/t, t, 0))


def deg(a): return float(a*180/sp.pi)


# --- Ej 1: z = sqrt[(x²/9 + y²/4 − a²)/(a² − x² + y²/4)]
def dominio_ok(a, n=1201):
    X, Y = np.meshgrid(np.linspace(-4*abs(a), 4*abs(a), n) + 1e-7*np.pi, np.linspace(-4*abs(a), 4*abs(a), n) + 1e-7*np.e)
    N = X**2/9 + Y**2/4 - a**2; D = a**2 - X**2 + Y**2/4
    with np.errstate(all="ignore"):
        ok = np.isfinite(np.sqrt(N/D))
    cond = ((N >= 0) & (D > 0)) | ((N <= 0) & (D < 0))
    assert (ok == cond).all(), f"dominio no coincide para a={a}"
    assert ok.any() and (~ok).any()
for a in (1, 2, -1.5, 0.3): dominio_ok(a)
a_ = sp.symbols("a_", positive=True)
Ne = x**2/9 + y**2/4 - a_**2; De = a_**2 - x**2 + y**2/4
# puntos de la frontera: la elipse (N=0) es parte del dominio; la hipérbola (D=0) no
assert Ne.subs({x: 3*a_, y: 0}) == 0 and De.subs({x: 3*a_, y: 0}) == -8*a_**2 < 0       # (3a; 0): 0/(−8a²) = 0 → pertenece
assert De.subs({x: a_, y: 0}) == 0 and sp.simplify(Ne.subs({x: a_, y: 0})) == -8*a_**2/9   # (a; 0): denominador 0 → no pertenece
assert Ne.subs({x: 0, y: 0}) == -a_**2 < 0 and De.subs({x: 0, y: 0}) == a_**2 > 0         # origen: N<0, D>0 → cociente negativo → fuera
# puntos de prueba de la comprobación (a = 1): valor del radicando N/D
def ND(px, py, a=1): return (R(px)**2/9 + R(py)**2/4 - a**2, a**2 - R(px)**2 + R(py)**2/4)
assert ND(2, 0) == (-R(5, 9), -3) and ND(2, 0)[0]/ND(2, 0)[1] == R(5, 27)
assert ND(0, 3) == (R(5, 4), R(13, 4)) and ND(0, 3)[0]/ND(0, 3)[1] == R(5, 13)
assert ND(0, 0) == (-1, 1) and ND(2, 2) == (R(4, 9), -2) and ND(2, 2)[0]/ND(2, 2)[1] == -R(2, 9)
assert ND(1, 0)[1] == 0 and ND(3, 0) == (0, -8)
# intersección elipse ∩ hipérbola: x² = a² + y²/4 → y² = 16a²/5, x² = 9a²/5
sol = sp.solve([sp.Eq(x**2/9 + y**2/4, a_**2), sp.Eq(x**2 - y**2/4, a_**2)], [x**2, y**2], dict=True) if False else None
X2, Y2 = sp.symbols("X2 Y2")
s = sp.solve([sp.Eq(X2/9 + Y2/4, a_**2), sp.Eq(X2 - Y2/4, a_**2)], [X2, Y2], dict=True)[0]
assert s == {X2: 9*a_**2/5, Y2: 16*a_**2/5}
assert sp.simplify(sp.sqrt(s[X2]) - 3*a_/sp.sqrt(5)) == 0 and sp.simplify(sp.sqrt(s[Y2]) - 4*a_/sp.sqrt(5)) == 0
assert sp.expand(1 - x**2/(a_**2) + (4*a_**2)**-1*y**2 - (De/a_**2)) == 0                   # D>0 ⇔ x²/a² − y²/(2a)² < 1
assert sp.expand(sp.Rational(1, 1)*(Ne + a_**2)/a_**2 - (x**2/(3*a_)**2 + y**2/(2*a_)**2)) == 0   # N≥0 ⇔ x²/(3a)² + y²/(2a)² ≥ 1
# a = 0: N = x²/9 + y²/4 ≥ 0 siempre; D = y²/4 − x² > 0 ⇔ |y| > 2|x|  (el origen da 0/0)
assert sp.simplify((y**2/4 - x**2) - (y - 2*x)*(y + 2*x)/4) == 0
en_mdx(r"\frac{x^2}{(3a)^2}+\frac{y^2}{(2a)^2}\ge1", r"\frac{x^2}{a^2}-\frac{y^2}{(2a)^2}<1", r"\frac{x^2}{9}+\frac{y^2}{4}-a^2\ge0", r"a^2-x^2+\frac{y^2}{4}>0",
       r"\left(\pm\frac{3a}{\sqrt5};\pm\frac{4a}{\sqrt5}\right)", r"y^2=\frac{16a^2}{5}")

# --- Ej 2: cilindro hueco
r, h = sp.symbols("r h", positive=True)
V = sp.pi*r**2*h
assert V.subs({r: 4, h: 10}) == 160*sp.pi
dVr, dVh = sp.diff(V, r).subs({r: 4, h: 10}), sp.diff(V, h).subs({r: 4, h: 10}); assert (dVr, dVh) == (80*sp.pi, 16*sp.pi)
dr_, dh_ = R(2, 10), R(1, 10) + R(5, 10); assert (dr_, dh_) == (R(1, 5), R(3, 5))             # cm
t1, t2 = dVr*dr_, dVh*dh_; assert (t1, t2) == (16*sp.pi, R(48, 5)*sp.pi) and t1 + t2 == R(128, 5)*sp.pi == R(256, 10)*sp.pi
assert R(128, 5) == R(256, 10) == R(256, 10) and abs(float(R(128, 5)) - 25.6) < 1e-12
Dexacto = V.subs({r: R(42, 10), h: R(106, 10)}) - V.subs({r: 4, h: 10}); assert Dexacto == R(26984, 1000)*sp.pi    # ΔV exacto
assert abs(float(Dexacto/sp.pi) - 26.984) < 1e-9 and abs(float(R(128, 5)) - 26.984) < 1.5
assert abs((26.984 - 25.6)/26.984*100 - 5.13) < 0.01
# comprobación por partes: pared lateral + fondo + tapa (tres capas de material)
lateral = sp.pi*(R(42, 10)**2 - 16)*10; fondo = sp.pi*R(42, 10)**2*R(5, 10); tapa = sp.pi*R(42, 10)**2*R(1, 10)
assert sp.simplify(lateral + fondo + tapa - Dexacto) == 0 and lateral == R(164, 10)*sp.pi and fondo == R(882, 100)*sp.pi and tapa == R(1764, 1000)*sp.pi
en_mdx(r"V=\pi r^2h=\pi\cdot4^2\cdot10=160\pi", r"dV=25{,}6\,\pi\ \text{cm}^3", r"2\pi rh=2\pi\cdot4\cdot10=80\pi", r"dh=0{,}1+0{,}5=0{,}6")

# --- Ej 3: z = sen²(2x − y), P(π, π/3), α = −30°
z3 = sp.sin(2*x - y)**2
zx, zy = sp.diff(z3, x), sp.diff(z3, y)
assert sp.simplify(zx - 4*sp.sin(2*x - y)*sp.cos(2*x - y)) == 0 and sp.simplify(zy + 2*sp.sin(2*x - y)*sp.cos(2*x - y)) == 0
P = {x: sp.pi, y: sp.pi/3}
assert (2*sp.pi - sp.pi/3).equals(5*sp.pi/3) and sp.sin(5*sp.pi/3) == -r3/2 and sp.cos(5*sp.pi/3) == R(1, 2)
gx, gy = sp.simplify(zx.subs(P)), sp.simplify(zy.subs(P)); assert (gx, gy) == (-r3, r3/2)
assert 4*(-r3/2)*R(1, 2) == -r3 and -2*(-r3/2)*R(1, 2) == r3/2
al = -sp.pi/6; s_ = (sp.cos(al), sp.sin(al)); assert s_ == (r3/2, -R(1, 2))
DD = sp.simplify(gx*s_[0] + gy*s_[1]); assert DD == -R(3, 2) - r3/4
assert (-r3)*(r3/2) == -R(3, 2) and (r3/2)*(-R(1, 2)) == -r3/4
assert abs(float(DD) + 1.9330) < 1e-4
assert sp.simplify(dir_deriv(z3, (sp.pi, sp.pi/3), (r3, -1)) - DD) == 0                      # definición
mod = sp.sqrt(gx**2 + gy**2); assert mod == sp.sqrt(15)/2 and 3 + R(3, 4) == R(15, 4)
th = sp.atan2(gy, gx); assert abs(deg(th) - 153.4349) < 1e-3                                  # 2.º cuadrante
assert abs(deg(sp.atan(gy/gx)) + 26.5651) < 1e-3 and abs(180 + deg(sp.atan(gy/gx)) - 153.4349) < 1e-3
assert gy/gx == -R(1, 2) and abs(deg(th) - 150) > 3                                           # el manuscrito da 150°: discrepancia
assert abs(deg(th) + 180 - 333.4349) < 1e-3 and abs(deg(th) - 90 - 63.4349) < 1e-3 and abs(deg(th) + 90 - 243.4349) < 1e-3
assert dir_deriv(z3, (sp.pi, sp.pi/3), (gy, -gx)) == 0 and dir_deriv(z3, (sp.pi, sp.pi/3), (-gy, gx)) == 0
assert sp.simplify(dir_deriv(z3, (sp.pi, sp.pi/3), (gx, gy)) - mod) == 0                      # máxima = ‖∇z‖
assert abs(float(mod*sp.cos(th - al)) - float(DD)) < 1e-9 and abs(deg(th - al) - 183.4349) < 1e-3   # ω = θ − α
en_mdx(r"z'_x(P)=-\sqrt3", r"z'_y(P)=\frac{\sqrt3}{2}", r"\frac{\partial z}{\partial s}\Big|_P=-\frac32-\frac{\sqrt3}{4}", r"\nabla z(P)=-\sqrt3\,i+\frac{\sqrt3}{2}\,j",
       r"\|\nabla z\|=\frac{\sqrt{15}}{2}", r"\theta\approx153{,}43^\circ", r"\arctan\left(-\frac12\right)")

# --- Ej 4: Lagrange con plano tangente al paraboloide z = 16 − x² − y² en (1, 2)
f4 = 16 - x**2 - y**2
fx0, fy0, z0 = sp.diff(f4, x).subs({x: 1, y: 2}), sp.diff(f4, y).subs({x: 1, y: 2}), f4.subs({x: 1, y: 2})
assert (fx0, fy0, z0) == (-2, -4, 11)
plano = sp.expand(z0 + fx0*(x - 1) + fy0*(y - 2))
assert sp.expand(plano - (21 - 2*x - 4*y)) == 0                                              # z = 21 − 2x − 4y  ⇔  2x + 4y + z = 21
l = sp.symbols("l")
F = x*y*z + l*(2*x + 4*y + z - 21)
sol = sp.solve([sp.diff(F, v) for v in (x, y, z, l)], [x, y, z, l], dict=True)
assert len(sol) == 4
pos = [s for s in sol if s[x] > 0 and s[y] > 0 and s[z] > 0]; assert len(pos) == 1
p4 = pos[0]; assert (p4[x], p4[y], p4[z], p4[l]) == (R(7, 2), R(7, 4), 7, -R(49, 8))
assert p4[x]*p4[y]*p4[z] == R(343, 8) and abs(float(R(343, 8)) - 42.875) < 1e-9
assert 2*R(7, 2) + 4*R(7, 4) + 7 == 21 and 6*R(7, 2) == 21
# comprobación: AM-GM sobre 2x, 4y, z (suma 21): 2x·4y·z ≤ 7³ → xyz ≤ 343/8; y sustitución directa en V(x, y)
assert 2*p4[x] == 4*p4[y] == p4[z] == 7 and R(7)**3/8 == R(343, 8)
V2 = sp.expand(x*y*(21 - 2*x - 4*y)); s2 = sp.solve([sp.diff(V2, x), sp.diff(V2, y)], [x, y], dict=True)
assert any(s[x] == R(7, 2) and s[y] == R(7, 4) for s in s2) and V2.subs({x: R(7, 2), y: R(7, 4)}) == R(343, 8)
Hs = sp.hessian(V2, (x, y)).subs({x: R(7, 2), y: R(7, 4)}); assert Hs.det() > 0 and Hs[0, 0] < 0   # máximo local
en_mdx(r"2x+4y+z=21", r"z_0=16-1^2-2^2=11", r"x=\frac72", r"y=\frac74", r"V_{\text{máx}}=\frac72\cdot\frac74\cdot7=\frac{343}{8}", r"z=2x", r"y=\frac x2")

print("OK check_p1-1h9-2024-05")
