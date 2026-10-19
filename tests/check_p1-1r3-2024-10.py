"""Recalcula con sympy el 1º parcial 1R3 Oct-24 (versiones A y B): resultados e intermedios, y que los MDX digan lo mismo.
Uso: python3 tests/check_p1-1r3-2024-10.py"""
from pathlib import Path
import numpy as np
import sympy as sp

BASE = Path(__file__).resolve().parents[1] / "src/content/parciales"
M = {k: (BASE / f"p1-1r3-2024-10-{k}.mdx").read_text() for k in ("a", "b")}


def en_mdx(k, *ss):
    for s in ss:
        assert s in M[k], f"falta en {k}: {s}"


R = sp.Rational
x, y, z, t = sp.symbols("x y z t", real=True)
r2 = sp.sqrt(2)


def grilla_dominio(f_num, cond, xl, yl, n=1001):
    """El dominio analítico debe coincidir con dónde la fórmula da un real finito (grilla con paso irracional)."""
    X, Y = np.meshgrid(np.linspace(*xl, n) + 1e-7*np.pi, np.linspace(*yl, n) + 1e-7*np.e)
    with np.errstate(all="ignore"):
        ok = np.isfinite(f_num(X, Y))
    assert (ok == cond(X, Y)).all(), "dominio analítico no coincide con la fórmula"
    assert ok.any() and (~ok).any()


def clasifica(f, pcs):
    """Hessiano de la cátedra: H = f''xx·f''yy − (f''xy)²; con H>0 el signo de f''xx decide."""
    H = sp.simplify(sp.diff(f, x, 2)*sp.diff(f, y, 2) - sp.diff(f, x, y)**2)
    res = {}
    for p in pcs:
        s = {x: p[0], y: p[1]}
        h, fxx = H.subs(s), sp.diff(f, x, 2).subs(s)
        res[p] = ("silla" if h < 0 else "mín" if fxx > 0 else "máx") if h != 0 else "dudoso"
    return H, res


def vecindad(f, p, r=R(1, 20)):
    v = [float(f.subs({x: p[0] + r*sp.cos(a), y: p[1] + r*sp.sin(a)}) - f.subs({x: p[0], y: p[1]})) for a in [k*sp.pi/8 for k in range(16)]]
    return "mín" if min(v) > 0 else "máx" if max(v) < 0 else "silla"


def dir_deriv(f, P, v):
    """Por definición: límite de [f(P+t·s°) − f(P)]/t con s° = v/|v| (versor)."""
    u = sp.Matrix(v) / sp.Matrix(v).norm()
    g = f.subs({x: P[0] + t*u[0], y: P[1] + t*u[1]})
    return sp.simplify(sp.limit((g - f.subs({x: P[0], y: P[1]}))/t, t, 0))


def deg(a): return float(a*180/sp.pi)


def implicita(f, g):
    """Jacobianos de la cátedra: dy/dx, dz/dx = −Δ/Δppal con Δppal = J(f,g/y,z)."""
    fx, fy, fz = [sp.diff(f, v) for v in (x, y, z)]; gx, gy, gz = [sp.diff(g, v) for v in (x, y, z)]
    Dp = fy*gz - fz*gy
    return dict(dy=-(fx*gz - fz*gx)/Dp, dz=-(fy*gx - fx*gy)/Dp, Dp=Dp, fx=fx, fy=fy, fz=fz, gx=gx, gy=gy, gz=gz)


# ===================================================================== A
# --- Ej 1: dominio
f1 = lambda X, Y: (np.log(4 - X**2 - Y**2) - np.arccos(Y + X)) / np.sqrt(X**2 + Y**2/4 - 1)
grilla_dominio(f1, lambda X, Y: (X**2 + Y**2 < 4) & (abs(X + Y) <= 1) & (X**2 + Y**2/4 > 1), (-3, 3), (-3, 3), 1201)
# vértices de la figura: elipse ∩ rectas
assert sp.solve(4*x**2 + (1 - x)**2 - 4, x) == [-R(3, 5), 1]       # recta y = 1 − x
assert sp.solve(4*x**2 + (-1 - x)**2 - 4, x) == [-1, R(3, 5)]      # recta y = −1 − x
assert (-R(3, 5))**2 + (R(8, 5))**2 < 4 and R(8, 5) == 1 + R(3, 5)  # (−3/5; 8/5) está dentro de la circunferencia y sobre y = 1 − x
assert sp.solve(x**2 + (1 - x)**2 - 4, x) == [(1 - sp.sqrt(7))/2, (1 + sp.sqrt(7))/2]
assert 1**2 + 0 == 1 and 0 + 2**2/4 == 1                                  # a_x = 1, b_y = 2: semiejes de la elipse
assert abs((float(sp.log(2)) - float(sp.pi/2))/0.5 + 1.7553) < 1e-3                        # z(−1; 1) existe
assert sp.solve(2*x**2 - 2*x - 3, x) == [(1 - sp.sqrt(7))/2, (1 + sp.sqrt(7))/2] and sp.expand((5*x + 3)*(x - 1) - (5*x**2 - 2*x - 3)) == 0
assert set(sp.solve(x**2 + (-1 - x)**2 - 4, x)) == {(-1 - sp.sqrt(7))/2, (-1 + sp.sqrt(7))/2}                # cortes recta y = −1 − x con la circunferencia
en_mdx("a", r"x=\frac{1\pm\sqrt7}{2}", r"\frac{-1-\sqrt7}{2}", r"\frac{1+\sqrt7}{2}", r"\frac{1-\sqrt7}{2}")
en_mdx("a", r"x^2+y^2<4", r"-1-x\le y\le1-x", r"x^2+\frac{y^2}{4}>1", r"-1\le y+x\le1")

# --- Ej 2: pirámide V = A·B·H/3
A, B, H_ = sp.symbols("A B H_")
V = A*B*H_/3
vals = {A: 2, B: 3, H_: 5}
assert V.subs(vals) == 10
gradV = [sp.diff(V, v).subs(vals) for v in (A, B, H_)]
assert gradV == [5, R(10, 3), 2]                                          # B·H/3, A·H/3, A·B/3
dA_, dB_, dH_ = R(2, 100)*2, R(2, 100)*3, -R(3, 10)
assert (dA_, dB_, dH_) == (R(1, 25), R(3, 50), -R(3, 10))
terms = [gradV[0]*dA_, gradV[1]*dB_, gradV[2]*dH_]
assert terms == [R(1, 5), R(1, 5), -R(3, 5)]
dV = sum(terms); assert dV == -R(1, 5) and dV/V.subs(vals)*100 == -2
dVexacto = V.subs({A: R(204, 100), B: R(306, 100), H_: R(47, 10)}) - 10   # comprobación: ΔV exacto
assert abs(float(dVexacto) - (-0.22024)) < 1e-4 and abs(float(dVexacto) - float(dV)) < .03
# lo que da el manuscrito: usa 3/100 en vez de 30 cm = 3/10 m → ⚠ discrepancia
terms_of = [R(3*5*4, 100), R(2*5*6, 100), -R(2*3*3, 100)]
assert sum(terms_of)/3 == R(102, 300) and R(102, 300) == R(17, 50)       # 0,34
assert R(17, 50)/10*100 == R(17, 5)                                       # 3,4 %
assert terms_of[2]/3 == -R(3, 50) and gradV[2]*(-R(3, 100)) == -R(3, 50)  # equivale a dh = −0,03 m
assert dV/10 == -R(1, 50)                                                 # error relativo −2 %
# E% por diferencial logarítmico (otro camino): dV/V = dA/A + dB/B + dH/H
assert R(2, 100) + R(2, 100) + (-R(3, 10)/5) == -R(1, 50)
en_mdx("a", r"dV=-0{,}2\ \text{m}^3", r"E\%=-2\%", r"\frac{\partial V}{\partial H}=\frac{A\,B}{3}=\frac{2\cdot3}{3}=2", r"dH=-0{,}3\ \text{m}")

# --- Ej 3: dz/dx
fA = x**2 + x*y**3 - y*z**4; gA = 2*x - 2*x*y**2 + 3*y*z**2
I = implicita(fA, gA)
assert sp.expand(I["fy"] - (3*x*y**2 - z**4)) == 0 and sp.expand(I["fx"] - (2*x + y**3)) == 0 and sp.expand(I["fz"] + 4*y*z**3) == 0
assert sp.expand(I["gy"] - (-4*x*y + 3*z**2)) == 0 and sp.expand(I["gx"] - (2 - 2*y**2)) == 0 and sp.expand(I["gz"] - 6*y*z) == 0
Num = (3*x*y**2 - z**4)*(2 - 2*y**2) - (2*x + y**3)*(-4*x*y + 3*z**2)
Den = (3*x*y**2 - z**4)*6*y*z + 4*y*z**3*(-4*x*y + 3*z**2)
assert sp.expand(I["dz"] + Num/Den) == 0
assert sp.expand(Den - 2*y*z*(9*x*y**2 + 3*z**4 - 8*x*y*z**2)) == 0
assert sp.expand(Num - (8*x**2*y - 2*x*y**4 + 6*x*y**2 - 6*x*z**2 - 3*y**3*z**2 + 2*y**2*z**4 - 2*z**4)) == 0
# comprobación independiente: despejar el sistema lineal de f_x + f_y y' + f_z z' = 0, g_x + g_y y' + g_z z' = 0
yp, zp = sp.symbols("yp zp")
sol = sp.solve([I["fx"] + I["fy"]*yp + I["fz"]*zp, I["gx"] + I["gy"]*yp + I["gz"]*zp], [yp, zp], dict=True)[0]
assert sp.simplify(sol[zp] + Num/Den) == 0
# numérico sobre la curva: el punto (8; 2; 2√2) cumple las dos ecuaciones; derivada por diferencias finitas
P0 = {x: 8, y: 2, z: 2*r2}
assert sp.simplify(fA.subs(P0)) == 0 and sp.simplify(gA.subs(P0)) == 0
def punto(xv):
    s = sp.nsolve([fA.subs(x, xv), gA.subs(x, xv)], [y, z], (2, 2.8284), tol=1e-20, prec=30, maxsteps=100)
    return float(s[0]), float(s[1])
hh = R(1, 10**4); zp_num = (punto(8 + hh)[1] - punto(8 - hh)[1])/float(2*hh)
zp_for = float((-Num/Den).subs(P0))
assert abs(zp_num - zp_for) < 1e-5, (zp_num, zp_for)
assert sp.expand((3*x*y**2 - z**4)*(2 - 2*y**2) - (6*x*y**2 - 6*x*y**4 - 2*z**4 + 2*y**2*z**4)) == 0
assert sp.expand((2*x + y**3)*(-4*x*y + 3*z**2) - (-8*x**2*y + 6*x*z**2 - 4*x*y**4 + 3*y**3*z**2)) == 0
assert sp.gcd(sp.expand(Num), sp.expand(Den)) == 1                                    # el numerador no se simplifica con el denominador
en_mdx("a", r"8x^2y-2xy^4+6xy^2-6xz^2-3y^3z^2+2y^2z^4-2z^4", r"no se simplifica más", r"\begin{vmatrix}f'_y&-f'_x")
en_mdx("a", r"2yz\left(9xy^2-8xyz^2+3z^4\right)", r"\frac{\partial z}{\partial x}=-\frac{\Delta_{zx}}{\Delta_{ppal}}", r"6yz", r"-4xy+3z^2")

# --- Ej 4: z = 2x²y³ − 3x⁴y + 10, P(1,2), α = −45°
z4 = 2*x**2*y**3 - 3*x**4*y + 10
assert sp.expand(sp.diff(z4, x) - (4*x*y**3 - 12*x**3*y)) == 0 and sp.expand(sp.diff(z4, y) - (6*x**2*y**2 - 3*x**4)) == 0
P = {x: 1, y: 2}
gx_, gy_ = sp.diff(z4, x).subs(P), sp.diff(z4, y).subs(P)
assert (4*1*8, 12*1*2, 6*4, 3) == (32, 24, 24, 3) and (gx_, gy_) == (8, 21)
al = -sp.pi/4; s_ = (sp.cos(al), sp.sin(al)); assert s_ == (r2/2, -r2/2)
DD = sp.simplify(gx_*s_[0] + gy_*s_[1]); assert DD == -13*r2/2
assert sp.simplify(8*r2/2) == 4*r2 and sp.simplify(21*r2/2) == 21*r2/2 and 4*r2 - 21*r2/2 == -13*r2/2
assert abs(float(DD) + 9.1924) < 1e-4
assert dir_deriv(z4, (1, 2), (1, -1)) == -13*r2/2                                         # definición
assert sp.sqrt(gx_**2 + gy_**2) == sp.sqrt(505) and 64 + 441 == 505 and abs(float(sp.sqrt(505)) - 22.4722) < 1e-4
th = sp.atan(R(21, 8)); assert abs(deg(th) - 69.1455) < 1e-3
assert abs(deg(th) + 180 - 249.1455) < 1e-3 and abs(deg(th) + 90 - 159.1455) < 1e-3 and abs(deg(th) - 90 - (-20.8545)) < 1e-3   # mín, nulos
assert dir_deriv(z4, (1, 2), (-21, 8)) == 0 and dir_deriv(z4, (1, 2), (21, -8)) == 0
hq = R(1, 10**6); cuoc = (z4.subs({x: 1 + hq*r2/2, y: 2 - hq*r2/2}) - z4.subs({x: 1, y: 2}))/hq   # cociente incremental con t = 1e-6
assert abs(float(cuoc) + 9.1924) < 1e-4 and abs(float(DD) + 9.1924) < 1e-4
assert abs(8*(-21) + 21*8) == 0                                                          # nulo: (−21; 8) ⟂ (8; 21)
# 4c: ∂z/∂s = ‖∇z‖ cos ω, ω = ángulo entre ∇z y s = θ − α
om = th - al; assert abs(deg(om) - 114.1455) < 1e-3
assert abs(float(sp.sqrt(505)*sp.cos(om)) - float(DD)) < 1e-9
assert abs(float(sp.cos(om)) + 0.40898) < 1e-4
en_mdx("a", r"\frac{\partial z}{\partial s}\Big|_P=-\frac{13\sqrt2}{2}", r"\nabla z(P)=8\,i+21\,j", r"\|\nabla z\|=\sqrt{505}", r"\theta=\arctan\frac{21}{8}", r"\omega=\theta-\alpha")

# --- Ej 5: z = x³ + y² − 3xy + 5
z5 = x**3 + y**2 - 3*x*y + 5
sol = sp.solve([sp.diff(z5, x), sp.diff(z5, y)], [x, y], dict=True); pcs = {(s[x], s[y]) for s in sol}
assert pcs == {(0, 0), (R(3, 2), R(9, 4))}
assert sp.diff(z5, x) == 3*x**2 - 3*y and sp.diff(z5, y) == 2*y - 3*x and sp.factor(2*x**2 - 3*x) == x*(2*x - 3)
assert (sp.diff(z5, x, 2), sp.diff(z5, y, 2), sp.diff(z5, x, y)) == (6*x, 2, -3)
H5, cl = clasifica(z5, pcs); assert sp.expand(H5 - (12*x - 9)) == 0
assert cl == {(0, 0): "silla", (R(3, 2), R(9, 4)): "mín"} and [H5.subs({x: a, y: b}) for a, b in [(0, 0), (R(3, 2), R(9, 4))]] == [-9, 9]
assert sp.diff(z5, x, 2).subs(x, R(3, 2)) == 9 and 12*R(3, 2) == 18 and 18 - 9 == 9
assert {p: vecindad(z5, p) for p in pcs} == cl
assert z5.subs({x: R(3, 2), y: R(9, 4)}) == R(53, 16) and z5.subs({x: 0, y: 0}) == 5
# comprobación completando cuadrados: z = (y − 3x/2)² + x³ − 9x²/4 + 5
assert sp.expand(z5 - ((y - 3*x/2)**2 + x**3 - R(9, 4)*x**2 + 5)) == 0
gg = x**3 - R(9, 4)*x**2 + 5
assert sp.solve(sp.diff(gg, x), x) == [0, R(3, 2)] and [sp.diff(gg, x, 2).subs(x, v) for v in (0, R(3, 2))] == [-R(9, 2), R(9, 2)]
en_mdx("a", r"H(x;y)=z''_{xx}\,z''_{yy}-(z''_{xy})^2=6x\cdot2-(-3)^2", r"H(x;y)=12x-9", r"H(0;0)=-9<0", r"H\!\left(\tfrac32;\tfrac94\right)=18-9=9>0", r"z''_{xx}\!\left(\tfrac32;\tfrac94\right)=6\cdot\tfrac32=9>0")

# --- Ej 6: Lagrange, caja con vértice en x + y/3 + z/4 = 1
l = sp.symbols("l")
F = x*y*z - l*(x + y/3 + z/4 - 1)
sol = sp.solve([sp.diff(F, v) for v in (x, y, z, l)], [x, y, z, l], dict=True)
assert len(sol) == 4                                              # tres degenerados (V = 0) y uno positivo
sol = [s for s in sol if s[x] > 0 and s[y] > 0 and s[z] > 0]; assert len(sol) == 1
s6 = sol[0]; assert (s6[x], s6[y], s6[z]) == (R(1, 3), 1, R(4, 3)) and s6[l] == R(4, 3)
assert s6[x]*s6[y]*s6[z] == R(4, 9) and abs(float(R(4, 9)) - 0.4444) < 1e-4
# comprobación: AM-GM sobre x, y/3, z/4 (suma 1): x·(y/3)·(z/4) ≤ (1/3)³ → xyz ≤ 12/27
assert 12*R(1, 3)**3 == R(4, 9) and s6[x] == s6[y]/3 == s6[z]/4 == R(1, 3)
Vxy = sp.expand((x*y*4*(1 - x - y/3)))
sol2 = sp.solve([sp.diff(Vxy, x), sp.diff(Vxy, y)], [x, y], dict=True)
assert {(s[x], s[y]) for s in sol2} >= {(R(1, 3), 1)} and Vxy.subs({x: R(1, 3), y: 1}) == R(4, 9)
assert sp.expand(sp.diff(Vxy, x) - 4*y*(1 - 2*x - y/3)) == 0 and sp.expand(sp.diff(Vxy, y) - 4*x*(1 - x - 2*y/3)) == 0
en_mdx("a", r"V'_x=4y\left(1-2x-\frac y3\right)", r"V'_y=4x\left(1-x-\frac{2y}{3}\right)")
en_mdx("a", r"y=3x", r"z=4x", r"x=\frac13", r"V_{\text{máx}}=\frac13\cdot1\cdot\frac43=\frac49")

# ===================================================================== B
# --- Ej 1
f1 = lambda X, Y: (np.log(1 - X**2/9 + Y**2/4) - np.arcsin(X/5)) / np.sqrt(X**2 + Y**2 - 1)
grilla_dominio(f1, lambda X, Y: (X**2/9 - Y**2/4 < 1) & (abs(X) <= 5) & (X**2 + Y**2 > 1), (-6, 6), (-8, 8), 1201)
assert sp.asin(1) == sp.pi/2 and sp.asin(-1) == -sp.pi/2 and 3**2/9 - 0 == 1   # vértices de la hipérbola en (±3; 0)
assert 1 < 3**2                                                                 # la circunferencia r = 1 queda dentro de la zona entre ramas
assert sp.solve(sp.Eq(x**2/9 - y**2/4, 1).subs(x, 5), y) == [-R(8, 3), R(8, 3)]
assert 1 - R(25, 9) + R(9, 4) == R(17, 36) and 25 + 9 > 1                              # punto (5; 3) de la comprobación
en_mdx("b", r"\frac{x^2}{9}-\frac{y^2}{4}<1", r"-5\le x\le5", r"x^2+y^2>1", r"-1\le\frac x5\le1")

# --- Ej 2
l_, h_ = sp.symbols("l_ h_")
VB = sp.sqrt(3)/12*l_**2*h_
vv = {l_: 20, h_: 30}
assert sp.simplify(VB.subs(vv)) == 1000*sp.sqrt(3)
dl_, dh_ = R(2, 100)*20, R(2, 100)*30; assert (dl_, dh_) == (R(2, 5), R(3, 5))
pl, ph = sp.diff(VB, l_).subs(vv), sp.diff(VB, h_).subs(vv)
assert sp.simplify(pl - 100*sp.sqrt(3)) == 0 and sp.simplify(ph - 100*sp.sqrt(3)/3) == 0
assert sp.simplify(pl*dl_ - 40*sp.sqrt(3)) == 0 and sp.simplify(ph*dh_ - 20*sp.sqrt(3)) == 0
dVB = sp.simplify(pl*dl_ + ph*dh_); assert sp.simplify(dVB - 60*sp.sqrt(3)) == 0 and abs(float(dVB) - 103.923) < 1e-3
assert sp.simplify(dVB/VB.subs(vv)*100) == 6
assert 2*R(2, 100) + R(2, 100) == R(6, 100)                                     # V ∝ l²h → 2·2 % + 2 %
dVexB = sp.simplify(VB.subs({l_: R(204, 10), h_: R(306, 10)}) - VB.subs(vv)); assert abs(float(dVexB) - 61.208*1.7320508) < 1e-2
en_mdx("b", r"dV=60\sqrt3\ \text{cm}^3", r"E\%=6\%", r"\frac{\partial V}{\partial l}=\frac{\sqrt3}{6}\,l\,h", r"\frac{\partial V}{\partial h}=\frac{\sqrt3}{12}\,l^2")

# --- Ej 3: dy/dx
fB = x**3*y + y**2*z + x*z**2; gB = x**2*y - x*y*z - x*z**2
I = implicita(fB, gB)
assert sp.expand(I["fx"] - (3*x**2*y + z**2)) == 0 and sp.expand(I["fy"] - (x**3 + 2*y*z)) == 0 and sp.expand(I["fz"] - (y**2 + 2*x*z)) == 0
assert sp.expand(I["gx"] - (2*x*y - y*z - z**2)) == 0 and sp.expand(I["gy"] - (x**2 - x*z)) == 0 and sp.expand(I["gz"] - (-x*y - 2*x*z)) == 0
NumB = (3*x**2*y + z**2)*(-x*y - 2*x*z) - (y**2 + 2*x*z)*(2*x*y - y*z - z**2)
DenB = (x**3 + 2*y*z)*(-x*y - 2*x*z) - (y**2 + 2*x*z)*(x**2 - x*z)
assert sp.expand(I["dy"] + NumB/DenB) == 0
sol = sp.solve([I["fx"] + I["fy"]*yp + I["fz"]*zp, I["gx"] + I["gy"]*yp + I["gz"]*zp], [yp, zp], dict=True)[0]
assert sp.simplify(sol[yp] + NumB/DenB) == 0
# intermedios del desarrollo y forma final (mínima expresión)
p1 = sp.expand((3*x**2*y + z**2)*(-x*y - 2*x*z)); assert sp.expand(p1 - (-3*x**3*y**2 - 6*x**3*y*z - x*y*z**2 - 2*x*z**3)) == 0
p2 = sp.expand((y**2 + 2*x*z)*(2*x*y - y*z - z**2)); assert sp.expand(p2 - (2*x*y**3 - y**3*z - y**2*z**2 + 4*x**2*y*z - 2*x*y*z**2 - 2*x*z**3)) == 0
Q1 = 3*x**3*y + 6*x**3*z + 4*x**2*z + 2*x*y**2 - x*z**2 - y**2*z - y*z**2
Q2 = x**3*y + 2*x**3*z + 2*x**2*z + x*y**2 + y**2*z + 4*y*z**2 - 2*x*z**2
assert sp.expand(NumB + y*Q1) == 0 and sp.expand(DenB + x*Q2) == 0 and sp.simplify(I["dy"] + y*Q1/(x*Q2)) == 0
q1 = sp.expand((x**3 + 2*y*z)*(-x*y - 2*x*z)); assert sp.expand(q1 - (-x**4*y - 2*x**4*z - 2*x*y**2*z - 4*x*y*z**2)) == 0
q2 = sp.expand((y**2 + 2*x*z)*(x**2 - x*z)); assert sp.expand(q2 - (x**2*y**2 - x*y**2*z + 2*x**3*z - 2*x**2*z**2)) == 0
# numérico: curva paramétrica por z (g=0, x≠0 → y = z²/(x−z)); derivada dy/dx = (dy/dz)/(dx/dz)
def pt(zv):
    s = sp.nsolve([fB.subs(z, zv), gB.subs(z, zv)], [x, y], (-0.5249, -0.6558), tol=1e-20, prec=30, maxsteps=100); return float(s[0]), float(s[1])
x0, y0 = pt(1)
assert abs(float(fB.subs({x: x0, y: y0, z: 1}))) < 1e-9 and abs(float(gB.subs({x: x0, y: y0, z: 1}))) < 1e-9
hz = 1e-4; (xa, ya), (xb, yb) = pt(1 + hz), pt(1 - hz)
dy_num = (ya - yb)/(xa - xb); dy_for = float((-NumB/DenB).subs({x: x0, y: y0, z: 1}))
assert abs(dy_num - dy_for) < 1e-5, (dy_num, dy_for)
en_mdx("b", r"\frac{\partial y}{\partial x}=-\frac{\Delta_{yx}}{\Delta_{ppal}}", r"3x^2y+z^2", r"-xy-2xz", r"x^3+2yz", r"x^2-xz")

# --- Ej 4: z = x³ − x²y + xy² − 12, P(1,2), PQ con Q(4,6)
z4 = x**3 - x**2*y + x*y**2 - 12
assert sp.expand(sp.diff(z4, x) - (3*x**2 - 2*x*y + y**2)) == 0 and sp.expand(sp.diff(z4, y) - (-x**2 + 2*x*y)) == 0
gx_, gy_ = sp.diff(z4, x).subs(P), sp.diff(z4, y).subs(P); assert (gx_, gy_) == (3, 3) and 3 - 4 + 4 == 3 and -1 + 4 == 3
PQ = (4 - 1, 6 - 2); assert PQ == (3, 4) and sp.sqrt(PQ[0]**2 + PQ[1]**2) == 5
u = (R(3, 5), R(4, 5)); DD = gx_*u[0] + gy_*u[1]; assert DD == R(21, 5) and R(9, 5) + R(12, 5) == R(21, 5)
assert dir_deriv(z4, (1, 2), PQ) == R(21, 5)
assert sp.sqrt(gx_**2 + gy_**2) == 3*r2 and 9 + 9 == 18 and sp.atan2(gy_, gx_) == sp.pi/4
assert dir_deriv(z4, (1, 2), (-1, 1)) == 0 and dir_deriv(z4, (1, 2), (1, -1)) == 0                 # nulos a 135° y 315°
om = sp.atan2(gy_, gx_) - sp.atan2(PQ[1], PQ[0]); assert abs(deg(om) - (45 - 53.1301)) < 1e-3     # ω = θ − α
assert abs(float(3*r2*sp.cos(om)) - 4.2) < 1e-9 and abs(float(sp.cos(om)) - 0.98995) < 1e-4
assert abs(deg(sp.atan2(PQ[1], PQ[0])) - 53.1301) < 1e-3
en_mdx("b", r"\frac{\partial z}{\partial s}\Big|_P=\frac{21}{5}", r"\nabla z(P)=3\,i+3\,j", r"\|\nabla z\|=3\sqrt2", r"\theta=45^\circ", r"\omega=\theta-\alpha")

# --- Ej 5: z = 2x⁴ + y² − x² − 2y
z5 = 2*x**4 + y**2 - x**2 - 2*y
sol = sp.solve([sp.diff(z5, x), sp.diff(z5, y)], [x, y], dict=True); pcs = {(s[x], s[y]) for s in sol}
assert pcs == {(0, 1), (R(1, 2), 1), (-R(1, 2), 1)}
assert sp.diff(z5, x) == 8*x**3 - 2*x and sp.factor(4*x**3 - x) == x*(2*x - 1)*(2*x + 1)
assert (sp.expand(sp.diff(z5, x, 2) - 24*x**2 + 2), sp.diff(z5, y, 2), sp.diff(z5, x, y)) == (0, 2, 0)
H5, cl = clasifica(z5, pcs); assert sp.expand(H5 - (48*x**2 - 4)) == 0
assert cl == {(0, 1): "silla", (R(1, 2), 1): "mín", (-R(1, 2), 1): "mín"}
assert [H5.subs({x: a, y: 1}) for a in (0, R(1, 2), -R(1, 2))] == [-4, 8, 8] and sp.diff(z5, x, 2).subs(x, R(1, 2)) == 4
assert {p: vecindad(z5, p, R(1, 40)) for p in pcs} == cl
assert [z5.subs({x: a, y: 1}) for a in (0, R(1, 2), -R(1, 2))] == [-1, -R(9, 8), -R(9, 8)]
# separación de variables: z = g(x) + h(y), g = 2x⁴ − x², h = (y − 1)² − 1
gx2 = 2*x**4 - x**2; hy = (y - 1)**2 - 1; assert sp.expand(gx2 + hy - z5) == 0
assert [sp.diff(gx2, x, 2).subs(x, v) for v in (0, R(1, 2), -R(1, 2))] == [-2, 4, 4]
en_mdx("b", r"H(x;y)=z''_{xx}\,z''_{yy}-(z''_{xy})^2=(24x^2-2)\cdot2=48x^2-4", r"H(0;1)=-4<0", r"H\!\left(\tfrac12;1\right)=48\cdot\tfrac14-4=12-4=8>0", r"z''_{xx}\!\left(\pm\tfrac12;1\right)=24\cdot\tfrac14-2=4>0")

# --- Ej 6: Lagrange, distancia de P(−1,−2) a la recta x + 2y = 5
d2 = (x + 1)**2 + (y + 2)**2
F = d2 - l*(x + 2*y - 5)
sol = sp.solve([sp.diff(F, v) for v in (x, y, l)], [x, y, l], dict=True)[0]
assert (sol[x], sol[y], sol[l]) == (1, 2, 4) and sp.sqrt(d2.subs({x: 1, y: 2})) == 2*sp.sqrt(5)
assert sp.solve([2*(x + 1) - l, 2*(y + 2) - 2*l], [x, y]) == {x: l/2 - 1, y: l - 2} and sp.solve(sp.Eq(2*(x + 1), y + 2), y) == [2*x]
assert abs(float(2*sp.sqrt(5)) - 4.4721) < 1e-4
# comprobación: fórmula de distancia punto-recta y perpendicularidad de PQ con la dirección de la recta (2, −1)
assert sp.Rational(abs(1*(-1) + 2*(-2) - 5), 1)/sp.sqrt(5) == 2*sp.sqrt(5)
assert (1 - (-1))*2 + (2 - (-2))*(-1) == 0
assert sp.simplify(d2.subs({x: 5 - 2*y}).subs(y, 2) - 20) == 0 and sp.simplify(sp.diff(d2.subs(x, 5 - 2*y), y, 2)) == 10   # f(y) convexa → mínimo
en_mdx("b", r"y=2x", r"x=1", r"Q(1;2)", r"d=\sqrt{2^2+4^2}=\sqrt{4+16}=\sqrt{20}=2\sqrt5")

en_mdx("a", r"""La resolución del profe escribe $g'_y=-2xy+3z^2$ en el determinante de abajo; la derivada correcta es $-4xy+3z^2$ (errata de copia que no cambia el planteo);""")  # aviso de discrepancia con la resolución del profe
en_mdx("a", r"""Reemplazo y se simplifica $\sqrt{505}$""")
en_mdx("b", r"""Reemplazo, con $\sqrt2\cdot\sqrt2=2$""")
en_mdx("b", r"""Con $l=20$ y $h=30$:""")
print("OK check_p1-1r3-2024-10")
