# 1R3 Oct-24 (A y B, 4/10/2024): dominios, gradientes, extremos, Lagrange. Uso: python3 figuras/src/p1-1r3-2024_figuras.py
import sys; sys.path.insert(0, __import__("os").path.dirname(__file__))
from p1r2_common import *
from mpl_toolkits.mplot3d.art3d import Poly3DCollection
dA = salida("p1-1r3-2024-10-a"); dB = salida("p1-1r3-2024-10-b")
BB = dict(fc="white", ec="none", alpha=.85, pad=1.2)

# ======================= A, ej1: x²+y²<4 ∧ −1−x≤y≤1−x ∧ x²+y²/4>1
xl, yl = (-3, 3), (-3, 3); X, Y = malla(xl, yl, 1000)
fig, ax = plt.subplots(figsize=(7.8, 7.6), facecolor="white"); ejes(ax, xl, yl)
m = (X**2 + Y**2 < 4) & (Y >= -1 - X) & (Y <= 1 - X) & (X**2 + Y**2/4 > 1)
region(ax, m, X, Y)
curva(ax, X, Y, X**2 + Y**2 - 4, False, GR, 1.8)
curva(ax, X, Y, X**2 + Y**2/4 - 1, False, RJ, 1.8)
xs = np.array([-3, 3]); ax.plot(xs, 1 - xs, c="k", lw=2.2); ax.plot(xs, -1 - xs, c="k", lw=2.2)
ax.text(-2.85, 2.55, "y = 1 − x", fontsize=11, bbox=BB); ax.text(1.0, -2.65, "y = −1 − x", fontsize=11, bbox=BB)
ax.text(1.55, 1.55, "x² + y² = 4", color=GR, fontsize=11, bbox=BB); ax.text(-2.9, -.55, "x² + y²/4 = 1", color=RJ, fontsize=11, bbox=BB)
for (px, py, tx_, ty_, h) in [(1, 0, "(1; 0)", .12, "left"), (-1, 0, "(−1; 0)", .12, "right"), (-.6, 1.6, "(−3/5; 8/5)", .25, "right"), (.6, -1.6, "(3/5; −8/5)", .1, "left")]:
    ax.plot([px], [py], "ko", ms=5, zorder=6)
    ax.text(px + (.12 if h == "left" else -.12), py + (ty_ if py >= 0 else -.38), tx_, fontsize=10.5, ha=h, bbox=BB)
ax.set_title("Dominio de definición (zona celeste)")
leyenda_abajo(ax, [Patch(color=AZ, alpha=.4, label="dominio (dos piezas)"), Line2D([], [], c="k", lw=2.2, label="rectas y = ±1 − x: borde incluido (≤)"),
                   Line2D([], [], c=GR, ls="--", label="circunferencia r = 2: excluida (<)"), Line2D([], [], c=RJ, ls="--", label="elipse: excluida (>)")], ncol=2)
guardar(fig, dA, "ej1")

# ======================= A, ej4: ∇z(1,2) = (8, 21), S a −45°
g = (8, 21)
fig, ax, u, perp, th = gradiente_fig(dA, "ej4", (1, 2), g, .2, (-3, 5), (-2, 7), S=(1.8*np.cos(-np.pi/4), 1.8*np.sin(-np.pi/4)), Lnul=2.2)
ax.text(-.15, 6.2, "∇z (dibujado a escala 1/5)\nmáx. crecimiento, θ ≈ 69,15°", color=RJ, fontsize=11, ha="right")
ax.text(.0, -.9, "mín. crecim.", color=AZ, fontsize=11, ha="right"); ax.text(3.3, 2.75, "nulo", color=VD, fontsize=11); ax.text(-1.4, 1.0, "nulo", color=VD, fontsize=11)
ax.text(2.95, .55, "S (−45°)", color="#6a3d9a", fontsize=11); ax.text(.55, 2.15, "P", ha="right")
ax.set_title("Gradiente en P(1; 2): ∇z = 8 i + 21 j")
leyenda_abajo(ax, [Line2D([], [], c=RJ, lw=3, label="∇z (máx.), θ ≈ 69,15°"), Line2D([], [], c=AZ, lw=2.4, label="mínimo crecimiento (−∇z), θ ≈ 249,15°"),
                   Line2D([], [], c=VD, ls="--", lw=2.2, label="crecimiento nulo (⊥ ∇z): 159,15° y 339,15°"), Line2D([], [], c="#6a3d9a", lw=2.6, label="dirección S (α = −45°)")], ncol=2)
guardar(fig, dA, "ej4")

# ======================= A, ej5: z = x³ + y² − 3xy + 5
f = lambda X, Y: X**3 + Y**2 - 3*X*Y + 5
pts = [(0, 0, "Silla"), (1.5, 2.25, "Mín")]
fig, a, b = extremos_fig(dA, "ej5", f, (-1, 3), (-1, 4), pts, "", zt=range(0, 31, 10))
b.text(.12, .15, "(0; 0)", fontsize=11); b.text(1.62, 2.1, "(3/2; 9/4)", fontsize=11)
guardar(fig, dA, "ej5")

# ======================= A, ej6: plano x + y/3 + z/4 = 1 y caja (1/3, 1, 4/3)
fig = plt.figure(figsize=(7.8, 7.4), facecolor="white"); a = fig.add_subplot(111, projection="3d")
a.add_collection3d(Poly3DCollection([[(1, 0, 0), (0, 3, 0), (0, 0, 4)]], alpha=.25, facecolor=AZ, edgecolor="k"))
x0, y0, z0 = 1/3, 1, 4/3
for q in ([(0, 0, 0), (x0, 0, 0), (x0, y0, 0), (0, y0, 0)], [(0, 0, 0), (x0, 0, 0), (x0, 0, z0), (0, 0, z0)], [(0, 0, 0), (0, y0, 0), (0, y0, z0), (0, 0, z0)],
          [(x0, 0, 0), (x0, y0, 0), (x0, y0, z0), (x0, 0, z0)], [(0, y0, 0), (x0, y0, 0), (x0, y0, z0), (0, y0, z0)], [(0, 0, z0), (x0, 0, z0), (x0, y0, z0), (0, y0, z0)]):
    a.add_collection3d(Poly3DCollection([q], alpha=.35, facecolor=RJ, edgecolor="k"))
a.scatter([x0], [y0], [z0], c="k", s=60, depthshade=False); a.text(x0 + .1, y0 + .1, z0 + .3, "(1/3; 1; 4/3)")
a.set_xlim(0, 1); a.set_ylim(0, 3); a.set_zlim(0, 4); a.set_xticks([0, 1]); a.set_yticks(range(0, 4)); a.set_zticks(range(0, 5))
a.set_xlabel("x"); a.set_ylabel("y"); a.set_zlabel("z"); a.set_box_aspect((1, 3, 4)); a.view_init(24, 38)
a.set_title("Plano x + y/3 + z/4 = 1 y la caja de volumen máximo (V = 4/9)"); guardar(fig, dA, "ej6")

# ======================= B, ej1: x²/9 − y²/4 < 1 ∧ |x| ≤ 5 ∧ x²+y² > 1
xl, yl = (-6, 6), (-6, 6); X, Y = malla(xl, yl, 1200)
fig, ax = plt.subplots(figsize=(7.8, 7.6), facecolor="white"); ejes(ax, xl, yl)
m = (X**2/9 - Y**2/4 < 1) & (abs(X) <= 5) & (X**2 + Y**2 > 1)
region(ax, m, X, Y)
curva(ax, X, Y, X**2/9 - Y**2/4 - 1, False, RJ, 1.8); curva(ax, X, Y, X**2 + Y**2 - 1, False, GR, 1.8)
for s in (-5, 5): ax.plot([s, s], [-6, 6], c="k", lw=2.2)
ax.text(5.1, 5.3, "x = 5", fontsize=11, bbox=BB); ax.text(-5.9, 5.3, "x = −5", fontsize=11, bbox=BB)
ax.text(3.35, -4.2, "x²/9 − y²/4 = 1", color=RJ, fontsize=11, bbox=BB); ax.text(-.9, -1.35, "x² + y² = 1", color=GR, fontsize=11, bbox=BB)
for px in (3, -3): ax.plot([px], [0], "o", c=RJ, ms=5, zorder=6)
ax.text(3.1, .25, "(3; 0)", fontsize=10.5, bbox=BB); ax.text(-3.1, .25, "(−3; 0)", fontsize=10.5, ha="right", bbox=BB)
ax.set_title("Dominio de definición (zona celeste)")
leyenda_abajo(ax, [Patch(color=AZ, alpha=.4, label="dominio"), Line2D([], [], c="k", lw=2.2, label="x = ±5: borde incluido (≤)"),
                   Line2D([], [], c=RJ, ls="--", label="hipérbola: excluida (<)"), Line2D([], [], c=GR, ls="--", label="circunferencia r = 1: excluida (>)")], ncol=2)
guardar(fig, dB, "ej1")

# ======================= B, ej4: ∇z(1,2) = (3,3), S = PQ → (3,4)/5
g = (3, 3); s = np.array([3, 4])/5
fig, ax, u, perp, th = gradiente_fig(dB, "ej4", (1, 2), g, .5, (-3, 5), (-2, 6), S=tuple(2.0*s), Lnul=2.2)
ax.text(1.0, 4.3, "∇z (a escala 1/2)\nmáx. crecimiento, θ = 45°", color=RJ, fontsize=11, ha="right")
ax.text(-.15, .15, "mín. crecim.", color=AZ, fontsize=11, ha="right"); ax.text(-1.5, 3.7, "nulo", color=VD, fontsize=11); ax.text(2.8, .6, "nulo", color=VD, fontsize=11)
ax.text(3.2, 3.9, "S = PQ (≈ 53,13°)", color="#6a3d9a", fontsize=11, ha="left"); ax.text(.75, 2.2, "P", ha="right")
ax.set_title("Gradiente en P(1; 2): ∇z = 3 i + 3 j")
leyenda_abajo(ax, [Line2D([], [], c=RJ, lw=3, label="∇z (máx.), θ = 45°"), Line2D([], [], c=AZ, lw=2.4, label="mínimo crecimiento (−∇z), θ = 225°"),
                   Line2D([], [], c=VD, ls="--", lw=2.2, label="crecimiento nulo (⊥ ∇z): 135° y 315°"), Line2D([], [], c="#6a3d9a", lw=2.6, label="dirección S = PQ")], ncol=2)
guardar(fig, dB, "ej4")

# ======================= B, ej5: z = 2x⁴ + y² − x² − 2y
f = lambda X, Y: 2*X**4 + Y**2 - X**2 - 2*Y
pts = [(0, 1, "Silla"), (.5, 1, "Mín"), (-.5, 1, "Mín")]
fig, a, b = extremos_fig(dB, "ej5", f, (-1, 1), (-1, 3), pts, "", zt=None)
b.text(.06, 1.12, "(0; 1)", fontsize=11); b.text(.58, 1.12, "(1/2; 1)", fontsize=11); b.text(-.45, .75, "(−1/2; 1)", fontsize=11, ha="right")
guardar(fig, dB, "ej5")

# ======================= B, ej6: distancia de P(−1;−2) a la recta x+2y=5
xl, yl = (-2, 6), (-3, 4)
fig, ax = plt.subplots(figsize=(7.8, 7.0), facecolor="white"); ejes(ax, xl, yl)
xs = np.array([-2, 6]); ax.plot(xs, (5 - xs)/2, c="k", lw=2.2)
ax.plot([-1, 1], [-2, 2], c=RJ, lw=2.6); ax.plot([-1, 1, 5], [-2, 2, 0], "o", c="k", ms=0)
ax.plot([-1], [-2], "o", c="#6a3d9a", ms=8, zorder=6); ax.plot([1], [2], "o", c=VD, ms=8, zorder=6)
ax.text(-.9, -2.45, "P(−1; −2)", fontsize=11, bbox=BB); ax.text(1.15, 2.2, "Q(1; 2)", fontsize=11, bbox=BB)
ax.text(2.3, 1.65, "recta x + 2y = 5", fontsize=11, rotation=-26, bbox=BB); ax.text(.15, -1.35, "d = 2√5", color=RJ, fontsize=11, rotation=63, bbox=BB)
ax.set_title("Distancia mínima de P a la recta: d = 2√5 ≈ 4,47")
leyenda_abajo(ax, [Line2D([], [], c="k", lw=2.2, label="recta x + 2y = 5 (condición)"), Line2D([], [], c=RJ, lw=2.6, label="segmento PQ, perpendicular a la recta")], ncol=1)
guardar(fig, dB, "ej6")
print("ok figuras 1r3-2024")
