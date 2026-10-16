# 2S2 Tema B Jun-25 (27/06/2025): ej1 dominio, ej3 gradiente, ej4 superficie. Uso: python3 figuras/src/p1-2s2-2025-06-b_figs.py
import sys; sys.path.insert(0, __import__("os").path.dirname(__file__))
from p1r2_common import *
d = salida("p1-2s2-2025-06-b")

# ---- Ej 1: −x < y < 4−x ∧ x²+y²>16
xl, yl = (-7, 7), (-7, 7); X, Y = malla(xl, yl, 1000)
fig, ax = plt.subplots(figsize=(7.8, 7.6), facecolor="white"); ejes(ax, xl, yl)
region(ax, (X + Y > 0) & (X + Y < 4) & (X**2 + Y**2 > 16), X, Y)
curva(ax, X, Y, X + Y, False, GR, 2); curva(ax, X, Y, X + Y - 4, False, GR, 2); curva(ax, X, Y, X**2 + Y**2 - 16, False, RJ, 2.2)
for (px, py, t, dx, dy) in [(4, 0, "(4, 0)", .15, -.7), (0, 4, "(0, 4)", .2, .1), (2*np.sqrt(2), -2*np.sqrt(2), "(2√2, −2√2)", .3, -.2), (-2*np.sqrt(2), 2*np.sqrt(2), "(−2√2, 2√2)", -3.6, -.7)]:
    ax.plot([px], [py], "ko", ms=5); ax.text(px + dx, py + dy, t, fontsize=10)
ax.text(4.9, -.2, "y = 4 − x", rotation=-45, color=GR, fontsize=11); ax.text(-6.4, 4.7, "y = −x", rotation=-45, color=GR, fontsize=11)
ax.text(-3.2, -3.8, "x² + y² = 16", color=RJ, fontsize=11, rotation=45)
ax.set_title("Dominio de definición (zona celeste)")
leyenda_abajo(ax, [Patch(color=AZ, alpha=.4, label="franja −x < y < 4 − x, fuera de la circunferencia"), Line2D([], [], c=GR, ls="--", lw=2, label="y = −x e y = 4 − x: bordes excluidos"),
                   Line2D([], [], c=RJ, ls="--", lw=2.2, label="x² + y² = 16: borde excluido")], ncol=1)
guardar(fig, d, "ej1")

# ---- Ej 3: P(1,3), Q(2,−1), ∇z=(−4,11)
fig, ax, u, perp, th = gradiente_fig(d, "ej3", (1, 3), (-4, 11), .5, (-5, 5), (-3, 9), S=(1, -4), Lnul=2.5,
                                    curva_nivel=lambda X, Y: -X*Y + 2*Y**2 - X)
ax.plot([2], [-1], "s", c="#6a3d9a", ms=8, zorder=6); ax.text(2.15, -1.1, "Q(2, −1)", color="#6a3d9a", fontsize=11, va="top")
ax.text(-4.8, 8.3, "∇z (dibujado a escala 1/2)\nmáx. crecimiento", color=RJ, fontsize=11)
ax.text(2.25, 1.9, "mín.\ncrecim.", color=AZ, fontsize=11, ha="left", va="top")
ax.text(-1.9, 1.7, "nulo", color=VD, fontsize=11); ax.text(3.7, 4.4, "nulo", color=VD, fontsize=11)
ax.text(2.4, .3, "S = PQ", color="#6a3d9a", fontsize=11, ha="left"); ax.text(.8, 3.5, "P(1, 3)", fontsize=11, ha="right")
ax.set_title("Gradiente en P(1, 3): ∇z = −4 i + 11 j")
leyenda_abajo(ax, [Line2D([], [], c=RJ, lw=3, label="∇z (máx. crecimiento), θ ≈ 110°"), Line2D([], [], c=AZ, lw=2.4, label="mínimo crecimiento (−∇z)"),
                   Line2D([], [], c=VD, ls="--", lw=2.2, label="crecimiento nulo (⊥ ∇z)"), Line2D([], [], c="#6a3d9a", lw=2.6, label="dirección S: segmento PQ"),
                   Line2D([], [], c=GR, ls=":", label="curva de nivel por P")], ncol=2)
guardar(fig, d, "ej3")

# ---- Ej 4
f = lambda X, Y: X**3 + Y**3 + 3*X**2 - 3*Y - 9*X - 10
pts = [(1, 1, "Mín"), (-3, -1, "Máx"), (1, -1, "Silla"), (-3, 1, "Silla")]
fig, a, b = extremos_fig(d, "ej4", f, (-4.5, 2.5), (-2.5, 2.5), pts, "", zt=range(-20, 41, 20))
for (px, py, t) in pts: b.text(px + .15, py + .2, f"({px}, {py})", fontsize=11)
guardar(fig, d, "ej4")
