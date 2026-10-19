"""Recalcula con sympy el Recup. 1º parcial 1H10 Oct-23 (07/10/2023): resultados e intermedios, y que el MDX diga lo mismo.
Uso: python3 tests/check_p1-1h10-2023-10-rec.py"""
from pathlib import Path
import numpy as np
import sympy as sp

M = (Path(__file__).resolve().parents[1] / "src/content/parciales/p1-1h10-2023-10-rec.mdx").read_text()


def en_mdx(*ss):
    for s in ss:
        assert s in M, f"falta en el MDX: {s}"


R = sp.Rational
x, y, t = sp.symbols("x y t", real=True)
r2 = sp.sqrt(2)

# --- Ej 1: z = ln|x²/4+y²−1|·log(xy)/√(1−x²−y²/4)
def dom(a, b):
    a, b = R(a), R(b); return (a**2/4 + b**2 - 1 != 0) and (a*b > 0) and (1 - a**2 - b**2/4 > 0)
assert [dom(*p) for p in [(R(1, 2), R(1, 2)), (R(1, 5), R(9, 5)), (1, 0), (-R(1, 2), R(1, 2)), (R(3, 2), R(3, 2))]] == [True, True, False, False, False]
assert R(1, 4) == R(1, 2)*R(1, 2) and R(1, 4)/4 + R(1, 4) == R(5, 16) and R(1, 4) + R(1, 4)/4 == R(5, 16)
assert R(1, 5)**2 + R(9, 5)**2/4 == R(17, 20) and R(1, 5)**2/4 + R(9, 5)**2 == R(13, 4)
# malla: dominio real ⇔ condiciones del MDX (con módulo: solo se excluye la curva)
X, Y = np.meshgrid(np.linspace(-3, 3, 1501) + 1e-7*np.pi, np.linspace(-3, 3, 1501) + 1e-7*np.e)
with np.errstate(all="ignore"):
    fin = np.isfinite(np.log(np.abs(X**2/4 + Y**2 - 1))*np.log10(X*Y)/np.sqrt(1 - X**2 - Y**2/4))
assert (fin == ((X*Y > 0) & (X**2 + Y**2/4 < 1))).all()          # |·|=0 es un conjunto de medida nula en la malla
# cortes de las dos elipses: x² = y² = 4/5
sol = sp.solve([sp.Eq(x**2/4 + y**2, 1), sp.Eq(x**2 + y**2/4, 1)], [x, y], dict=True)
assert len(sol) == 4 and all(s[x]**2 == R(4, 5) and s[y]**2 == R(4, 5) for s in sol)
assert sp.simplify(sp.Rational(2)/sp.sqrt(5) - sp.sqrt(R(4, 5))) == 0
# la oficial (sin módulo) se queda solo con la parte de afuera: el recálculo agrega la de adentro
assert dom(R(1, 2), R(1, 2)) and not (R(1, 2)**2/4 + R(1, 2)**2 - 1 > 0)
en_mdx(r"\frac{x^2}{4}+y^2\ne1", r"x^2+\frac{y^2}{4}<1", r"x^2=y^2=\frac45", r"\left(\pm\frac{2}{\sqrt5};\pm\frac{2}{\sqrt5}\right)", r"\frac{5}{16}")

# --- Ej 2: cono r=3, h=2, 1%
r_, h_ = sp.symbols("r h", positive=True)
V = sp.pi*r_**2*h_/3; pt = {r_: 3, h_: 2}
assert V.subs(pt) == 6*sp.pi
Vr, Vh = sp.diff(V, r_).subs(pt), sp.diff(V, h_).subs(pt); assert (Vr, Vh) == (4*sp.pi, 3*sp.pi)
dr, dh = R(1, 100)*3, R(1, 100)*2; assert (dr, dh) == (R(3, 100), R(2, 100))
dV = Vr*dr + Vh*dh; assert (Vr*dr, Vh*dh) == (R(12, 100)*sp.pi, R(6, 100)*sp.pi) and dV == R(18, 100)*sp.pi
assert dV/V.subs(pt)*100 == 3 and abs(float(dV) - 0.5655) < 1e-3
assert 2*R(1, 100) + R(1, 100) == R(3, 100)
DV = V.subs({r_: R(303, 100), h_: R(202, 100)}) - V.subs(pt); assert abs(float(DV/sp.pi) - 0.181806) < 1e-6 and abs(float(DV - dV)/float(dV)) < 0.02
assert R(303, 100)**2*R(202, 100) - 18 == R(545418, 10**6)
en_mdx(r"dV=0{,}18\,\pi\ \text{m}^3", r"E\%=3\%", r"4\pi\cdot0{,}03+3\pi\cdot0{,}02=0{,}12\pi+0{,}06\pi=0{,}18\pi", r"0{,}545418", r"2\,\frac{dr}{r}+\frac{dh}{h}")

# --- Ej 3: z = −5√(x²+y²) + 12x/y + 4 ln(x²y), P(3,4), α=−π/4
f3 = -5*sp.sqrt(x**2 + y**2) + 12*x/y + 4*sp.log(x**2*y)
fx, fy = sp.diff(f3, x), sp.diff(f3, y)
assert sp.simplify(fx - (-5*x/sp.sqrt(x**2 + y**2) + 12/y + 8/x)) == 0 and sp.simplify(fy - (-5*y/sp.sqrt(x**2 + y**2) - 12*x/y**2 + 4/y)) == 0
P = {x: 3, y: 4}; gx, gy = sp.simplify(fx.subs(P)), sp.simplify(fy.subs(P)); assert (gx, gy) == (R(8, 3), -R(21, 4))
assert (-3 + 3 + R(8, 3), -4 - R(9, 4) + 1) == (R(8, 3), -R(21, 4))
al = -sp.pi/4; u = (sp.cos(al), sp.sin(al)); assert u == (r2/2, -r2/2)
DD = sp.simplify(gx*u[0] + gy*u[1]); assert sp.simplify(DD - 95*r2/24) == 0 and abs(float(DD) - 5.5978) < 1e-3
assert R(4, 3) + R(21, 8) == R(95, 24)
g = f3.subs({x: 3 + t*u[0], y: 4 + t*u[1]}); assert sp.simplify(sp.diff(g, t).subs(t, 0) - DD) == 0      # comprobación 1
mod2 = gx**2 + gy**2; assert (gx**2, gy**2) == (R(64, 9), R(441, 16)) and mod2 == R(4993, 144)
mod = sp.sqrt(mod2); assert sp.simplify(mod - sp.sqrt(4993)/12) == 0 and abs(float(mod) - 5.8882) < 1e-3
assert gy/gx == -R(63, 32)
th = sp.atan2(gy, gx); thd = float(th)*180/np.pi
assert abs(thd + 63.0723) < 1e-3 and abs(thd % 360 - 296.9277) < 1e-3
assert abs(thd + 180 - 116.9277) < 1e-3 and abs((thd + 90) - 26.9277) < 1e-3 and abs((thd + 270) - 206.9277) < 1e-3
_n = float(mod); _c = lambda u: float((f3.subs({x: 3 + 1e-6*u[0], y: 4 + 1e-6*u[1]}) - f3.subs({x: 3, y: 4}))/1e-6)   # comprobación 2: cociente incremental
assert abs(_c((float(gx)/_n, float(gy)/_n)) - _n) < 1e-3 and abs(_c((-float(gy)/_n, float(gx)/_n))) < 1e-3
omega = abs(thd + 45); assert abs(omega - 18.0723) < 1e-3 and abs(float(mod)*np.cos(np.radians(omega)) - float(DD)) < 1e-9         # comprobación 2
assert abs(np.cos(np.radians(omega)) - 0.9507) < 1e-4
assert abs(float(mod2 - R(64, 9) - R(441, 16))) < 1e-12 and R(32, 24) + R(63, 24) == R(95, 24)
en_mdx(r"5{,}8884=\frac{\sqrt{4993}}{12}", r"\frac{36}{16}=\frac94", r"\frac{95\sqrt2}{24}", r"\nabla z(P)=\frac83\,i-\frac{21}{4}\,j", r"\frac{\sqrt{4993}}{12}", r"\arctan\left(-\frac{63}{32}\right)\approx-63{,}07^\circ",
       r"z'_x(P)=-\frac{5\cdot3}{5}+\frac{12}{4}+\frac83=-3+3+\frac83=\frac83", r"-4-\frac94+1=-\frac{21}{4}", r"\frac{32}{24}+\frac{63}{24}=\frac{95}{24}")

# --- Ej 4: z = x³ + 3xy² − 15x − 12y + 1
f4 = x**3 + 3*x*y**2 - 15*x - 12*y + 1
s4 = sp.solve([sp.diff(f4, x), sp.diff(f4, y)], [x, y], dict=True)
assert {(s[x], s[y]) for s in s4} == {(2, 1), (-2, -1), (1, 2), (-1, -2)}
assert sp.expand(sp.diff(f4, x) - 3*(x**2 + y**2 - 5)) == 0 and sp.expand(sp.diff(f4, y) - 6*(x*y - 2)) == 0
assert sp.factor(x**4 - 5*x**2 + 4) == (x - 2)*(x + 2)*(x - 1)*(x + 1) and sp.solve(t**2 - 5*t + 4, t) == [1, 4]
fxx, fyy, fxy = sp.diff(f4, x, 2), sp.diff(f4, y, 2), sp.diff(f4, x, y)
assert (fxx, fyy, fxy) == (6*x, 6*x, 6*y)
Hh = sp.expand(fxx*fyy - fxy**2); assert sp.expand(Hh - 36*(x**2 - y**2)) == 0
val = lambda p: (Hh.subs({x: p[0], y: p[1]}), fxx.subs({x: p[0], y: p[1]}))
assert val((2, 1)) == (108, 12) and val((-2, -1)) == (108, -12) and val((1, 2)) == (-108, 6) and val((-1, -2)) == (-108, -6)
# comprobación: autovalores de la hessiana
Hm = sp.hessian(f4, (x, y))
ev = lambda p: sorted(Hm.subs({x: p[0], y: p[1]}).eigenvals().keys())
assert ev((2, 1)) == [6, 18] and ev((-2, -1)) == [-18, -6] and ev((1, 2)) == [-6, 18] and ev((-1, -2)) == [-18, 6]
assert all(p[0]**2 + p[1]**2 == 5 and p[0]*p[1] == 2 for p in [(2, 1), (-2, -1), (1, 2), (-1, -2)])
assert f4.subs({x: 2, y: 1}) == -27 and f4.subs({x: -2, y: -1}) == 29
en_mdx(r"x^4-5x^2+4=0", r"t=\frac{5\pm\sqrt{25-16}}{2}=\frac{5\pm3}{2}", r"H(x;y)=\begin{vmatrix}6x&6y\\6y&6x\end{vmatrix}=36x^2-36y^2=36\,(x^2-y^2)",
       r"H=36\cdot(4-1)=108>0", r"H=36\cdot(1-4)=-108<0")

en_mdx(r"""La resolución del profe escribe el módulo con un numerador ilegible ($442$ o $441$); el correcto es $\left(\frac{21}{4}\right)^2=\frac{441}{16}$, o sea $\|\nabla z\|=\frac{\sqrt{4993}}{12}\approx5{,}89$ (y no trae el gráfico pedido);""")  # aviso de discrepancia con la resolución del profe
print("OK check_p1-1h10-2023-10-rec")
