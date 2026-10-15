"""Recalcula con sympy el Examen Y Tema 1 y comprueba que el MDX diga lo mismo. Uso: python3 tests/check_anterior-y-t1.py"""
from pathlib import Path
import sympy as sp

MDX = (Path(__file__).resolve().parents[1] / "src/content/anteriores/anterior-y-t1.mdx").read_text()
def en_mdx(*ss):
    for s in ss: assert s in MDX, f"falta en el MDX: {s}"
R = sp.Rational
x, y, u, v, A, B, D, E, C, C1, C2, r, t, s = sp.symbols("x y u v A B D E C C1 C2 r t s")
I = sp.integrate
Y = sp.Function("Y")
def ode_ok(res): assert sp.simplify(res) == 0

th = sp.symbols("th", positive=True)
# --- Ej 1: disco x^2+(y-2)^2=4, z=1/y ---
assert sp.expand(x**2 + (y - 2)**2 - 4 - (x**2 + y**2 - 4*y)) == 0
assert sp.factor(r**2 - 4*r*sp.sin(th)) == r*(r - 4*sp.sin(th))
inner = I(sp.Integer(1)/sp.sin(th), (r, 0, 4*sp.sin(th))); assert sp.simplify(inner - 4) == 0
V = I(4, (th, 0, sp.pi)); assert V == 4*sp.pi
# comprobación cartesianas: 2*int sqrt((4-y)/y) dy, y = 4 sen^2 t
yy = sp.symbols("yy", positive=True)
assert sp.simplify(sp.sqrt(4*yy - yy**2) - yy*sp.sqrt((4 - yy)/yy)) == 0
sub = 2*(sp.cos(t)/sp.sin(t))*8*sp.sin(t)*sp.cos(t); assert sp.simplify(sub - 16*sp.cos(t)**2) == 0
assert I(16*sp.cos(t)**2, (t, 0, sp.pi/2)) == 4*sp.pi and I(sp.cos(t)**2, (t, 0, sp.pi/2)) == sp.pi/4
assert sp.simplify(I(2*sp.sqrt((4 - yy)/yy), (yy, 0, 4)) - 4*sp.pi) == 0
# doble integral directa en cartesianas (otro orden)
assert sp.simplify(I(2*sp.sqrt(4*yy - yy**2)/yy, (yy, 0, 4)) - 4*sp.pi) == 0
en_mdx(r"x^2+(y-2)^2=4", r"r=4\operatorname{sen}\theta", r"V=4\pi\ \text{u}^3", r"\frac{4\operatorname{sen}\theta-0}{\operatorname{sen}\theta}=4", r"16\int_0^{\pi/2}\cos^2t\,dt", r"V=16\cdot\frac\pi4=4\pi")

# --- Ej 2a: y' = cos x - y cot x ---
assert sp.simplify(1/sp.sec(x) - sp.cos(x)) == 0
ya = sp.sin(x)/2 + C/sp.sin(x)
ode_ok(ya.diff(x) - (sp.cos(x) - ya*sp.cot(x)))
ode_ok((1/sp.sin(x)).diff(x) + sp.cot(x)/sp.sin(x))          # v' = -cot x v
ode_ok((sp.sin(x)**2/2).diff(x) - sp.sin(x)*sp.cos(x))                    # u' = sen cos
ode_ok(ya.diff(x) - (-sp.cos(x)/sp.sin(x)**2*C + sp.cos(x)/2))
sol = sp.dsolve(Y(x).diff(x) + sp.cot(x)*Y(x) - sp.cos(x), Y(x))
ode_ok(sol.rhs.diff(x) + sp.cot(x)*sol.rhs - sp.cos(x))                    # dsolve cumple la misma EDO
ode_ok(((C - sp.cos(x)**2/2)/sp.sin(x)) - ya.subs(C, C - R(1, 2)))         # misma familia (constante corrida 1/2)
en_mdx(r"y=\frac{\operatorname{sen}x}{2}+\frac{C}{\operatorname{sen}x}", r"v=\frac1{\operatorname{sen}x}", r"u'=\operatorname{sen}x\cos x", r"y'+\cot x\;y=\cos x", r"\frac{\operatorname{sen}^2x}{2}+C")

# --- Ej 2b: (x+sqrt(xy)) dy = y dx, y(1)=1 ---
x1, y1 = sp.symbols("x1 y1", positive=True)
F = sp.log(y1) - 2*sp.sqrt(x1/y1)
assert F.subs({x1: 1, y1: 1}) == -2
yp = -sp.diff(F, x1)/sp.diff(F, y1)                           # derivada implícita
ode_ok(yp - y1/(x1 + sp.sqrt(x1*y1)))
uu = sp.symbols("uu", positive=True)
ode_ok((1 + sp.sqrt(uu))/(uu*sp.sqrt(uu)) - (uu**R(-3, 2) + 1/uu))
ode_ok(sp.integrate(uu**R(-3, 2) + 1/uu, uu) - (-2/sp.sqrt(uu) + sp.log(uu)))
ode_ok(uu/(1 + sp.sqrt(uu)) - uu - (-uu*sp.sqrt(uu)/(1 + sp.sqrt(uu))))
ode_ok(sp.sqrt(x1*y1)/x1 - sp.sqrt(y1/x1))
# verificar numéricamente la curva implícita contra EDO (punto cercano)
import math
c = lambda X: sp.nsolve(F.subs(x1, X) + 2, y1, 1.0)
h = 1e-6; yv = float(c(1.2)); dy = (float(c(1.2 + h)) - float(c(1.2 - h)))/(2*h)
assert abs(dy - yv/(1.2 + math.sqrt(1.2*yv))) < 1e-5
en_mdx(r"\ln y-2\sqrt{\frac xy}=-2", r"u'x=\frac{u}{1+\sqrt u}-u=\frac{u-u-u\sqrt u}{1+\sqrt u}=-\frac{u\sqrt u}{1+\sqrt u}", r"C=-2", r"-\frac{2}{\sqrt u}+\ln u=-\ln x+C")

# --- Ej 3: y'' + 9y = 3/cos 3x (variación de parámetros) ---
y1_, y2_ = sp.cos(3*x), sp.sin(3*x); f = 3/sp.cos(3*x)
W = sp.simplify(y1_*y2_.diff(x) - y2_*y1_.diff(x)); assert W == 3
up = sp.simplify(-y2_*f/W); vp = sp.simplify(y1_*f/W); assert sp.simplify(up + sp.tan(3*x)) == 0 and vp == 1
ode_ok(sp.diff(sp.log(sp.cos(3*x))/3, x) - up)
yP = sp.cos(3*x)*sp.log(sp.cos(3*x))/3 + x*sp.sin(3*x)
ode_ok(yP.diff(x, 2) + 9*yP - f)
d1 = -sp.sin(3*x)*sp.log(sp.cos(3*x)) + 3*x*sp.cos(3*x); ode_ok(yP.diff(x) - d1)
d2 = -3*sp.cos(3*x)*sp.log(sp.cos(3*x)) + 3*sp.sin(3*x)**2/sp.cos(3*x) + 3*sp.cos(3*x) - 9*x*sp.sin(3*x); ode_ok(yP.diff(x, 2) - d2)
sol3 = sp.dsolve(Y(x).diff(x, 2) + 9*Y(x) - f, Y(x))
ode_ok(sol3.rhs.diff(x, 2) + 9*sol3.rhs - f)
en_mdx(r"\frac13\cos(3x)\ln|\cos(3x)|+x\operatorname{sen}(3x)", r"u'=-\frac{y_2\,f}{W}=-\frac{\operatorname{sen}3x\cdot\frac3{\cos3x}}{3}=-\tan3x", r"W=y_1y_2'-y_2y_1'=3\cos^23x+3\operatorname{sen}^23x=3", r"y_p'=-\operatorname{sen}3x\ln\cos3x+3x\cos3x")
print("OK Y-T1")
