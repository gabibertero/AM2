"""Controles independientes del parcial fotografiado 1H10 A, 31/10/2026.

Ejecutar: python3 tests/check_1h10_2026.py (requiere sympy).
Se verifican dominios, dos órdenes de integración, orientación y soluciones
generales, para detectar errores que un resultado aislado no mostraría.
"""
from pathlib import Path
import sympy as s

x, y, r, z, th, t = s.symbols('x y r z th t', real=True)
C, C1, C2 = s.symbols('C C1 C2', real=True)
I = s.integrate
mdx = (Path(__file__).parents[1] / 'src/content/parciales/1h10-2026-10-31-a.mdx').read_text()

# 1: techo menos piso, radio 5. Cortes horizontales como cálculo independiente.
volume = I(I((5-r*r/5)*r, (r, 0, 5)), (th, 0, 2*s.pi))
assert volume == s.Rational(125, 2)*s.pi
assert I(5*s.pi*z, (z, 0, 5)) == volume
assert (r*r/5).subs(r, 5) == 5

# 2: integrando 2r por jacobiano r; cono superior acotado por z=2.
triple = I(I(I(2*r*r, (z, r, 2)), (r, 0, 2)), (th, 0, 2*s.pi))
other_order = I(I(I(2*r*r, (r, 0, z)), (z, 0, 2)), (th, 0, 2*s.pi))
assert triple == other_order == 16*s.pi/3

# 3: orientación antihoraria: derecha (recta) hacia arriba y parábola hacia abajo.
P, Q = x-y, x+y
assert s.solve(y*y-y-2, y) == [-1, 2]
line = P.subs({x:t, y:t}) + Q.subs({x:t, y:t})
parabola = s.expand(P.subs({x:t*t-2, y:t})*2*t + Q.subs({x:t*t-2, y:t}))
assert parabola == 2*t**3-t**2-3*t-2
line_value = I(line, (t, -1, 2))
parabola_value = I(parabola, (t, 2, -1))
assert (line_value, parabola_value) == (3, 6)
curl = s.diff(Q,x)-s.diff(P,y)
green = I(I(curl, (x, y*y-2, y)), (y,-1,2))
assert green == line_value + parabola_value == 9
assert I(line,(t,2,-1)) + I(parabola,(t,-1,2)) == -green

# 4: sustitución en la EDO impresa, no solo en una forma reorganizada.
linear_solution = (1+x*x)*(s.log(1+x*x)+C)
residual = (1+x*x)*s.diff(linear_solution,x)-2*x*linear_solution-2*x-2*x**3
assert s.simplify(residual) == 0
assert s.simplify(s.diff(1+x*x,x)-2*x*(1+x*x)/(1+x*x)) == 0

# 5: solución general con ambas constantes arbitrarias y particular resonante.
second_solution = (C1+C2*x+x*x)*s.exp(x)+1
assert s.simplify(s.diff(second_solution,x,2)-2*s.diff(second_solution,x)+second_solution-2*s.exp(x)-1) == 0

# Controles del contenido servido: no hay resolución oficial recibida ni foto pública.
assert '<ResolucionOficial' not in mdx
assert '<Enunciado examen=' not in mdx
assert 'no especifica orientación' in mdx
assert r'\frac{125\pi}{2}' in mdx and r'\frac{16\pi}{3}' in mdx
assert r'I_1+I_2=3+6=9' in mdx
assert 'y=(1+x^2)' in mdx and 'C_1+C_2x+x^2' in mdx
assert len(__import__('re').findall(r'<Ejercicio\b', mdx)) == 5
print('1H10 A 31/10/2026: 5 ejercicios verificados; dominios, orientación y soluciones OK.')
