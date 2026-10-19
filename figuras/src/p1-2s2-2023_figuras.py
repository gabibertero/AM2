# 2S2 Jul-23 (7/7/2023): ej1 dominio, ej3 gradiente, ej4 superficie con puntos críticos con H = 0.
# Uso: python3 figuras/src/p1-2s2-2023_figuras.py
import sys; sys.path.insert(0, __import__("os").path.dirname(__file__))
from p1r2_common import *
d = salida("p1-2s2-2023-07")

# ---- Ej 1: x²/4 + y²/9 ≤ 1  ∧  x² + y² > 1
xl, yl = (-3, 3), (-4, 4); X, Y = malla(xl, yl, 1000)
fig, ax = plt.subplots(figsize=(7.8, 8.6), facecolor="white"); ejes(ax, xl, yl)
region(ax, (X**2/4 + Y**2/9 <= 1) & (X**2 + Y**2 > 1), X, Y)
curva(ax, X, Y, X**2/4 + Y**2/9 - 1, True, "k", 2.5)
curva(ax, X, Y, X**2 + Y**2 - 1, False, RJ, 2.2)
for (px, py, tx, ty, ha) in [(2, 0, 2.08, .2, "left"), (-2, 0, -2.08, .2, "right"), (0, 3, .12, 3.1, "left"), (0, -3, .12, -3.35, "left"), (1, 0, 1.05, -.45, "left"), (-1, 0, -1.05, -.45, "right"), (0, 1, .12, 1.12, "left"), (0, -1, .12, -1.4, "left")]:
    ax.plot([px], [py], "o", mfc="k" if (px, py) in [(2, 0), (-2, 0), (0, 3), (0, -3)] else "white", mec="k", ms=6, zorder=6); ax.text(tx, ty, f"({px}; {py})".replace("-", "−"), fontsize=11, ha=ha)
ax.text(1.55, 2.7, "x²/4 + y²/9 = 1", fontsize=11); ax.text(0, -.4, "x² + y² = 1", color=RJ, fontsize=11, ha="center", bbox=dict(fc="white", ec="none", alpha=.85, pad=1))
ax.set_title("Dominio de definición (zona celeste)")
leyenda_abajo(ax, [Patch(color=AZ, alpha=.4, label="dominio: dentro de la elipse y fuera de la circunferencia"), Line2D([], [], c="k", lw=2.5, label="elipse: borde incluido (≤)"),
                   Line2D([], [], c=RJ, ls="--", lw=2.2, label="circunferencia x² + y² = 1: borde excluido (>)")], ncol=1)
guardar(fig, d, "ej1")

# ---- Ej 3: P(1,2), ∇f = i − j/2, S a 135° (bisectriz del 2.º cuadrante)
fig, ax, u, perp, th = gradiente_fig(d, "ej3", (1, 2), (1, -.5), 1.0, (-2, 4), (-1, 4), S=(1.8*np.cos(3*np.pi/4), 1.8*np.sin(3*np.pi/4)), Lnul=1.8)
ax.text(2.1, .9, "∇f = i − j/2\n(máx. crecimiento)", color=RJ, fontsize=11, ha="left")
ax.text(-1.95, 2.75, "mín. crecim.", color=AZ, fontsize=11); ax.text(1.9, 3.55, "nulo", color=VD, fontsize=11); ax.text(-.2, .15, "nulo", color=VD, fontsize=11, ha="right")
ax.text(-.2, 3.45, "S (135°)", color="#6a3d9a", fontsize=11, ha="center"); ax.text(1.08, 2.15, "P(1; 2)", fontsize=11); ax.text(1.75, 2.35, f"θ ≈ {th:.2f}°".replace(".", ",").replace("-", "−"), fontsize=11)
ax.set_title("Gradiente en P(1; 2): ∇f = i − (1/2) j")
leyenda_abajo(ax, [Line2D([], [], c=RJ, lw=3, label="∇f (máx. crecimiento, escala 1:1)"), Line2D([], [], c=AZ, lw=2.4, label="mínimo crecimiento (−∇f)"),
                   Line2D([], [], c=VD, ls="--", lw=2.2, label="crecimiento nulo (⊥ ∇f)"), Line2D([], [], c="#6a3d9a", lw=2.6, label="dirección S (α = 135°)")], ncol=2)
guardar(fig, d, "ej3")

# ---- Ej 4: z = 4/3 x³ + 1/3 y³ − 6x² + y² + 9x − 2; H = 0 en (3/2, 0) y (3/2, −2)
f = lambda X, Y: 4/3*X**3 + Y**3/3 - 6*X**2 + Y**2 + 9*X - 2
pts = [(1.5, 0, "Silla"), (1.5, -2, "Silla")]
fig, a, b = extremos_fig(d, "ej4", f, (0, 3), (-3, 1), pts, "")
b.text(1.6, .12, "(3/2; 0)", fontsize=11); b.text(1.6, -1.88, "(3/2; −2)", fontsize=11)
guardar(fig, d, "ej4")
