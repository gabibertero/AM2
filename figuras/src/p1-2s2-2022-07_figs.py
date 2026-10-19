# 2S2 Jul-22 (01/07/2022): ej1 dominio (corona, enunciado literal) y ej4 gradiente. Uso: python3 figuras/src/p1-2s2-2022-07_figs.py
import sys; sys.path.insert(0, __import__("os").path.dirname(__file__))
from p1r2_common import *
d = salida("p1-2s2-2022-07")
xl, yl = (-4, 4), (-4, 4); X, Y = malla(xl, yl, 1000)
fig, ax = plt.subplots(figsize=(7.8, 7.6), facecolor="white"); ejes(ax, xl, yl)
region(ax, (X**2 + Y**2 > 1) & (X**2 + Y**2 < 9), X, Y)
curva(ax, X, Y, X**2 + Y**2 - 1, False, RJ, 2.2); curva(ax, X, Y, X**2 + Y**2 - 9, False, GR, 2.2)
for (px, py, t, dx, dy, ha) in [(1, 0, "(1, 0)", .1, -.4, "left"), (3, 0, "(3, 0)", .1, -.4, "left"), (0, 1, "(0, 1)", .1, .1, "left"), (0, 3, "(0, 3)", .1, .1, "left")]:
    ax.plot([px], [py], "ko", ms=5, zorder=6); ax.text(px + dx, py + dy, t, fontsize=10, ha=ha)
ax.text(1.6, -2.7, "x² + y² = 9", color=GR, fontsize=11); ax.text(-.7, -1.35, "x² + y² = 1", color=RJ, fontsize=11)
ax.set_title("Dominio de definición (corona celeste)")
leyenda_abajo(ax, [Patch(color=AZ, alpha=.4, label="corona 1 < x² + y² < 9"), Line2D([], [], c=RJ, ls="--", lw=2.2, label="x² + y² = 1: borde excluido"),
                   Line2D([], [], c=GR, ls="--", lw=2.2, label="x² + y² = 9: borde excluido")], ncol=1)
guardar(fig, d, "ej1")

# ---- Ej 4: P(1,−1), ∇z = −11 j, α = 60°
fig, ax, u, perp, th = gradiente_fig(d, "ej4", (1, -1), (0, -11), .3, (-4, 6), (-6, 4), S=(2*np.cos(np.pi/3), 2*np.sin(np.pi/3)), Lnul=2.2)
ax.text(1.15, -3.6, "∇z = −11 j (escala 3/10)\nmáx. crecimiento", color=RJ, fontsize=11)
ax.text(1.15, 1.2, "mín. crecim.", color=AZ, fontsize=11); ax.text(3.35, -1.3, "nulo", color=VD, fontsize=11); ax.text(-1.9, -1.3, "nulo", color=VD, fontsize=11)
ax.text(2.1, .5, "S (60°)", color="#6a3d9a", fontsize=11); ax.text(-1.9, -.55, "P(1, −1)", fontsize=11)
ax.text(1.9, -1.75, "θ = 270°", fontsize=11); ax.set_title("Gradiente en P(1, −1): ∇z = −11 j")
leyenda_abajo(ax, [Line2D([], [], c=RJ, lw=3, label="∇z (máx. crecimiento), θ = 270° = −90°"), Line2D([], [], c=AZ, lw=2.4, label="mínimo crecimiento (−∇z)"),
                   Line2D([], [], c=VD, ls="--", lw=2.2, label="crecimiento nulo (⊥ ∇z)"), Line2D([], [], c="#6a3d9a", lw=2.6, label="dirección S: α = π/3")], ncol=2)
guardar(fig, d, "ej4")
