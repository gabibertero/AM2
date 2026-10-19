# 1V1 Sep-22 (15/09/2022) Grupo B, ej1 dominio. Uso: python3 figuras/src/p1-1v1-2022-09-b_figs.py
import sys; sys.path.insert(0, __import__("os").path.dirname(__file__))
from p1r2_common import *
d = salida("p1-1v1-2022-09-b")
xl, yl = (-5, 5), (-5, 5); X, Y = malla(xl, yl, 1000)
fig, ax = plt.subplots(figsize=(7.8, 7.6), facecolor="white"); ejes(ax, xl, yl)
region(ax, (X + Y > 0) & (X + Y < 4) & (X**2 + Y**2 < 16), X, Y)
curva(ax, X, Y, X + Y, False, GR, 2); curva(ax, X, Y, X + Y - 4, False, GR, 2); curva(ax, X, Y, X**2 + Y**2 - 16, False, RJ, 2.2)
r = 2*np.sqrt(2)
for (px, py, t, dx, dy, ha) in [(4, 0, "(4, 0)", .15, .3, "left"), (0, 4, "(0, 4)", .2, .15, "left"), (r, -r, "(2√2, −2√2)", .2, -.5, "left"), (-r, r, "(−2√2, 2√2)", -.2, .2, "right")]:
    ax.plot([px], [py], "ko", ms=5, zorder=6); ax.text(px + dx, py + dy, t, fontsize=10, ha=ha)
ax.text(4.95, 2.6, "y = 4 − x", color=GR, fontsize=11, ha="right"); ax.text(-4.0, 4.65, "y = −x", color=GR, fontsize=11, ha="left")
ax.text(-4.8, -3.9, "x² + y² = 16", color=RJ, fontsize=11)
ax.set_title("Dominio de definición (zona celeste)")
leyenda_abajo(ax, [Patch(color=AZ, alpha=.4, label="franja −x < y < 4 − x, dentro de la circunferencia"), Line2D([], [], c=GR, ls="--", lw=2, label="y = −x e y = 4 − x: bordes excluidos"),
                   Line2D([], [], c=RJ, ls="--", lw=2.2, label="x² + y² = 16: borde excluido")], ncol=1)
guardar(fig, d, "ej1")
