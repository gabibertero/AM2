# 1R3 Sep-23 (29/09/2023), grupos A y B: dominios (ej1), gradiente (ej5) y extremos (ej6).
# Uso: python3 figuras/src/p1-1r3-2023_figuras.py
import sys; sys.path.insert(0, __import__("os").path.dirname(__file__))
from p1r2_common import *

# ================= GRUPO A =================
dA = salida("p1-1r3-2023-09-a")
# ---- Ej 1: x²/4 + y² > 1  ∧  x² + y²/16 < 1
xl, yl = (-3, 3), (-5, 5); X, Y = malla(xl, yl, 1000)
fig, ax = plt.subplots(figsize=(7.8, 9.2), facecolor="white"); ejes(ax, xl, yl)
region(ax, (X**2/4 + Y**2 > 1) & (X**2 + Y**2/16 < 1), X, Y)
curva(ax, X, Y, X**2/4 + Y**2 - 1, False, RJ, 2.2)
curva(ax, X, Y, X**2 + Y**2/16 - 1, False, VD, 2.2)
ix, iy = 2*np.sqrt(105)/21, 4*np.sqrt(21)/21
for sx in (1, -1):
    for sy in (1, -1): ax.plot([sx*ix], [sy*iy], "o", mfc="white", mec="k", ms=7, zorder=6)
for (px, py, tx, ty, ha) in [(0, 1, .12, .6, "left"), (0, -1, .12, -.85, "left"), (0, 4, .12, 4.05, "left"), (0, -4, .12, -4.4, "left"),
                              (2, 0, 2.05, .2, "left"), (-2, 0, -2.05, .2, "right"), (1, 0, 1.05, -.45, "left"), (-1, 0, -1.05, -.45, "right")]:
    ax.plot([px], [py], "o", mfc="white", mec="k", ms=6, zorder=6); ax.text(tx, ty, f"({px}; {py})".replace("-", "−"), fontsize=11, ha=ha)
ax.text(1.12, 1.3, "(±0,98; ±0,87)", fontsize=11); ax.text(1.3, -1.6, "x²/4 + y² = 1", color=RJ, fontsize=11)
ax.text(1.1, 3.3, "x² + y²/16 = 1", color=VD, fontsize=11)
ax.set_title("Dominio de definición (dos piezas celestes)")
leyenda_abajo(ax, [Patch(color=AZ, alpha=.4, label="dominio: fuera de la 1.ª elipse y dentro de la 2.ª"), Line2D([], [], c=RJ, ls="--", lw=2.2, label="x²/4 + y² = 1 (borde excluido)"),
                   Line2D([], [], c=VD, ls="--", lw=2.2, label="x² + y²/16 = 1 (borde excluido)")], ncol=1)
guardar(fig, dA, "ej1")

# ---- Ej 5: P(4,3), ∇f = −i − 3j, S a 225°
fig, ax, u, perp, th = gradiente_fig(dA, "ej5", (4, 3), (-1, -3), 1.0, (-1, 7), (-1, 6), S=(1.6*np.cos(5*np.pi/4), 1.6*np.sin(5*np.pi/4)), Lnul=2.5)
ax.text(0.1, 0.8, "∇f = −i − 3j\n(máx. crecimiento)", color=RJ, fontsize=11, ha="left")
ax.text(4.9, 5.35, "mín. crecim.", color=AZ, fontsize=11); ax.text(0.9, 3.95, "nulo", color=VD, fontsize=11); ax.text(6.5, 2.1, "nulo", color=VD, fontsize=11)
ax.text(1.5, 1.5, "S (225°)", color="#6a3d9a", fontsize=11); ax.text(4.2, 2.55, "P(4; 3)", fontsize=11); ax.text(5.0, 3.5, f"θ ≈ {th % 360:.2f}°".replace(".", ","), fontsize=11)
ax.set_title("Gradiente en P(4; 3): ∇f = −i − 3j")
leyenda_abajo(ax, [Line2D([], [], c=RJ, lw=3, label="∇f (máx. crecimiento, escala 1:1)"), Line2D([], [], c=AZ, lw=2.4, label="mínimo crecimiento (−∇f)"),
                   Line2D([], [], c=VD, ls="--", lw=2.2, label="crecimiento nulo (⊥ ∇f)"), Line2D([], [], c="#6a3d9a", lw=2.6, label="dirección S (α = 225°)")], ncol=2)
guardar(fig, dA, "ej5")

# ---- Ej 6: z = 3xy − x³ − (3/2)y² − 5
f = lambda X, Y: 3*X*Y - X**3 - 1.5*Y**2 - 5
pts = [(0, 0, "Silla"), (1, 1, "Máx")]
fig, a, b = extremos_fig(dA, "ej6", f, (-1, 2), (-1, 2), pts, "")
b.text(.12, -.3, "(0; 0)", fontsize=11); b.text(1.1, 1.12, "(1; 1)", fontsize=11)
guardar(fig, dA, "ej6")

# ================= GRUPO B =================
dB = salida("p1-1r3-2023-09-b")
# ---- Ej 1: x² + y²/4 < 1  ∧  −1 − x ≤ y ≤ 1 − x
xl, yl = (-2, 2), (-3, 3); X, Y = malla(xl, yl, 1000)
fig, ax = plt.subplots(figsize=(7.8, 8.4), facecolor="white"); ejes(ax, xl, yl)
region(ax, (X**2 + Y**2/4 < 1) & (Y >= -1 - X) & (Y <= 1 - X), X, Y)
curva(ax, X, Y, X**2 + Y**2/4 - 1, False, "k", 2.2)
xs = np.linspace(-2, 2, 50); ax.plot(xs, 1 - xs, c=RJ, lw=2.2); ax.plot(xs, -1 - xs, c=VD, lw=2.2)
for (px, py, tx, ty, ha) in [(1, 0, 1.08, -.35, "left"), (-1, 0, -1.08, .12, "right"), (-.6, 1.6, -.5, 1.75, "left"), (.6, -1.6, .15, -1.95, "left")]:
    ax.plot([px], [py], "o", mfc="white", mec="k", ms=7, zorder=6)
ax.text(1.08, -.35, "(1; 0)", fontsize=11); ax.text(-1.1, .12, "(−1; 0)", fontsize=11, ha="right")
ax.text(-1.95, 1.45, "(−3/5; 8/5)", fontsize=11); ax.text(.75, -1.75, "(3/5; −8/5)", fontsize=11)
ax.text(1.05, 1.9, "x² + y²/4 = 1", fontsize=11); ax.text(-1.95, 2.5, "y = 1 − x", color=RJ, fontsize=11); ax.text(.1, -2.65, "y = −1 − x", color=VD, fontsize=11)
ax.set_title("Dominio de definición (zona celeste)")
leyenda_abajo(ax, [Patch(color=AZ, alpha=.4, label="dominio: dentro de la elipse y entre las rectas"), Line2D([], [], c="k", ls="--", lw=2.2, label="elipse: borde excluido (<)"),
                   Line2D([], [], c=RJ, lw=2.2, label="rectas y = 1 − x e y = −1 − x: borde incluido (≤)")], ncol=1)
guardar(fig, dB, "ej1")

# ---- Ej 5: P(1,1), ∇f = 6i − 5j, S a 135°
fig, ax, u, perp, th = gradiente_fig(dB, "ej5", (1, 1), (6, -5), .5, (-3, 6), (-4, 5), S=(1.6*np.cos(3*np.pi/4), 1.6*np.sin(3*np.pi/4)), Lnul=3.0)
ax.text(1.9, -2.6, "∇f = 6i − 5j\n(máx. crecimiento,\ndibujado a escala 1/2)", color=RJ, fontsize=11, ha="left")
ax.text(-2.7, 3.2, "mín. crecim.", color=AZ, fontsize=11); ax.text(3.0, 3.4, "nulo", color=VD, fontsize=11); ax.text(-1.5, -1.8, "nulo", color=VD, fontsize=11)
ax.text(-.9, 2.4, "S (135°)", color="#6a3d9a", fontsize=11, ha="right"); ax.annotate("P(1; 1)", xy=(1, 1), xytext=(-1.9, .2), fontsize=11, arrowprops=dict(arrowstyle="-", color="k", lw=.8)); ax.text(2.3, .5, f"θ ≈ {th:.2f}°".replace(".", ",").replace("-", "−"), fontsize=11)
ax.set_title("Gradiente en P(1; 1): ∇f = 6i − 5j")
leyenda_abajo(ax, [Line2D([], [], c=RJ, lw=3, label="∇f (máx. crecimiento)"), Line2D([], [], c=AZ, lw=2.4, label="mínimo crecimiento (−∇f)"),
                   Line2D([], [], c=VD, ls="--", lw=2.2, label="crecimiento nulo (⊥ ∇f)"), Line2D([], [], c="#6a3d9a", lw=2.6, label="dirección S (α = 135°)")], ncol=2)
guardar(fig, dB, "ej5")

# ---- Ej 6: f = 4/3 x³ + 1/3 y³ − 2x² − y
f = lambda X, Y: 4/3*X**3 + Y**3/3 - 2*X**2 - Y
pts = [(0, 1, "Silla"), (0, -1, "Máx"), (1, 1, "Mín"), (1, -1, "Silla")]
fig, a, b = extremos_fig(dB, "ej6", f, (-1, 2), (-2, 2), pts, "")
for (px, py, t) in pts: b.text(px + .08, py + .12, f"({px}; {py})".replace("-", "−"), fontsize=11)
guardar(fig, dB, "ej6")
