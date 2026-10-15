"""Recalcula con sympy el Examen Z Tema 2 y comprueba que el MDX diga lo mismo. Uso: python3 tests/check_anterior-z-t2.py"""
from pathlib import Path
import sympy as sp

MDX = (Path(__file__).resolve().parents[1] / "src/content/anteriores/anterior-z-t2.mdx").read_text()
def en_mdx(*ss):
    for s in ss: assert s in MDX, f"falta en el MDX: {s}"
R = sp.Rational
x, y, a, b, c, A, B, D, E, C, C1, C2, z, u, v, r = sp.symbols("x y a b c A B D E C C1 C2 z u v r")
I = sp.integrate
Y = sp.Function("Y")
def ode_ok(res): assert sp.simplify(res) == 0

# --- Ej 1: área ---
pts = [(-1, -1), (0, -1), (1, 1)]
sol = sp.solve([a*px**2 + b*px + c - py for px, py in pts], [a, b, c]); assert sol == {a: 1, b: 1, c: -1}
par = sol[a]*x**2 + sol[b]*x + sol[c]; assert sp.expand(par - (x**2 + x - 1)) == 0
L1, L2 = 2*x + 5, -x + 2
assert sp.solve(par - L1, x) == [-2, 3] and sp.solve(par - L2, x) == [-3, 1] and sp.solve(L1 - L2, x) == [-1]
assert sp.factor(par - L1) == (x - 3)*(x + 2) and sp.factor(par - L2) == (x + 3)*(x - 1)
xa, xb, xc = -2, -1, 1
assert L1.subs(x, R(-3, 2)) < L2.subs(x, R(-3, 2)) and L2.subs(x, 0) < L1.subs(x, 0)   # techo = recta más baja a cada lado de x=-1
assert sp.expand(L1 - par - (-x**2 + x + 6)) == 0 and sp.expand(L2 - par - (-x**2 - 2*x + 3)) == 0
P1 = sp.integrate(-x**2 + x + 6, x); P2 = sp.integrate(-x**2 - 2*x + 3, x)
assert sp.expand(P1 - (-x**3/3 + x**2/2 + 6*x)) == 0 and sp.expand(P2 - (-x**3/3 - x**2 + 3*x)) == 0
assert (P1.subs(x, xb), P1.subs(x, xa)) == (-R(31, 6), -R(22, 3)) and (P2.subs(x, xc), P2.subs(x, xb)) == (R(5, 3), -R(11, 3))
A1 = I(-x**2 + x + 6, (x, xa, xb)); A2 = I(-x**2 - 2*x + 3, (x, xb, xc)); assert (A1, A2) == (R(13, 6), R(16, 3))
assert A1 + A2 == R(15, 2)
# comprobación: trapecios - parábola
T1 = I(L1, (x, xa, xb)); T2 = I(L2, (x, xb, xc)); assert (T1, T2) == (2, 4) and T1 + T2 == 6
assert I(par, (x, xa, xc)) == -R(3, 2) and T1 + T2 - I(par, (x, xa, xc)) == R(15, 2)
# la otra forma: doble integral con orden dy dx
assert I(I(1, (y, par, L1)), (x, xa, xb)) + I(I(1, (y, par, L2)), (x, xb, xc)) == R(15, 2)
en_mdx(r"A=\frac{15}{2}\ \text{u}^2", r"y=x^2+x-1", r"A=A_1+A_2=", r"\frac{15}2")

# --- Ej 2: exacta y Bernoulli ---
M = 2*x/y**3; N = -(3*x**2 - y**2)/y**4
assert sp.simplify(M.diff(y) - N.diff(x)) == 0 and sp.simplify(M.diff(y) + 6*x/y**4) == 0
U = x**2/y**3 - 1/y
assert sp.simplify(U.diff(x) - M) == 0 and sp.simplify(U.diff(y) - N) == 0
assert sp.integrate(M, x) == x**2/y**3 and sp.integrate(1/y**2, y) == -1/y
assert U.subs({x: 2, y: 1}) == 3 and sp.expand((U - 3)*y**3 - (x**2 - y**2 - 3*y**3)) == 0
yp = -sp.diff(U, x)/sp.diff(U, y); ode_ok(yp - M/(-N))
ode_ok((3*x**2 - y**2)/y**4*yp - 2*x/y**3)
# Bernoulli
zf = x**3 - 2*x + C*x**2; yb = zf**sp.Rational(-1, 3)
ode_ok(3*x**2*yb.diff(x) + 2*x*yb + (x**2 + 2)*x**2*yb**4)
ode_ok(zf.diff(x) - 2*zf/x - (x**2 + 2))
ode_ok((x**2).diff(x) - 2*x**2/x)                        # v = x^2
assert sp.integrate(1 + 2/x**2, x) == x - 2/x
zs = sp.Function("zz"); sb = sp.dsolve(zs(x).diff(x) - 2*zs(x)/x - (x**2 + 2), zs(x)); ode_ok(sb.rhs.diff(x) - 2*sb.rhs/x - (x**2 + 2))
# paso del cambio z = y^-3: -z'/3 + 2z/(3x) = -(x^2+2)/3
ode_ok(-zf.diff(x)/3 + 2*zf/(3*x) + (x**2 + 2)/3 - (-(zf.diff(x) - 2*zf/x - (x**2 + 2))/3))
en_mdx(r"\frac{x^2}{y^3}-\frac1y=3", r"x^2-y^2=3y^3", r"g(y)=-\frac1y", r"C=3", r"z'-\frac2x\,z=x^2+2", r"v=x^2", r"u=x-\frac2x+C", r"y=\big(x^3+Cx^2-2x\big)^{-1/3}", r"z=x^2\Big(x-\frac2x+C\Big)=x^3-2x+Cx^2", r"-\frac{6x}{y^4}")

# --- Ej 3: y'' - y' - 2y = 3 e^-x + x^2 ---
assert sp.factor(r**2 - r - 2) == (r - 2)*(r + 1)
yP = A*x*sp.exp(-x) + B*x**2 + D*x + E
L = lambda f: f.diff(x, 2) - f.diff(x) - 2*f
assert sp.simplify(yP.diff(x) - (A*sp.exp(-x)*(1 - x) + 2*B*x + D)) == 0 and sp.simplify(yP.diff(x, 2) - (A*sp.exp(-x)*(-2 + x) + 2*B)) == 0
res = sp.expand(L(yP)); assert sp.simplify(res - (-3*A*sp.exp(-x) - 2*B*x**2 + (-2*B - 2*D)*x + (2*B - D - 2*E))) == 0
so = sp.solve([-3*A - 3, -2*B - 1, -2*B - 2*D, 2*B - D - 2*E], [A, B, D, E]); assert so == {A: -1, B: -R(1, 2), D: R(1, 2), E: -R(3, 4)}
ypf = -x*sp.exp(-x) - x**2/2 + x/2 - R(3, 4); ode_ok(L(ypf) - (3*sp.exp(-x) + x**2))
ode_ok(ypf.diff(x) - (-sp.exp(-x)*(1 - x) - x + R(1, 2))); ode_ok(ypf.diff(x, 2) - ((2 - x)*sp.exp(-x) - 1))
s3 = sp.dsolve(Y(x).diff(x, 2) - Y(x).diff(x) - 2*Y(x) - 3*sp.exp(-x) - x**2, Y(x))
ode_ok(L(s3.rhs) - (3*sp.exp(-x) + x**2))
en_mdx(r"y=C_1e^{2x}+C_2e^{-x}-x\,e^{-x}-\frac{x^2}{2}+\frac x2-\frac34", r"A=-1", r"B=-\tfrac12", r"D=\tfrac12", r"E=-\tfrac34", r"-3A\,e^{-x}-2Bx^2+(-2B-2D)x+(2B-D-2E)=3e^{-x}+x^2", r"y_p=A\,x\,e^{-x}+Bx^2+Dx+E")
print("OK Z-T2")
