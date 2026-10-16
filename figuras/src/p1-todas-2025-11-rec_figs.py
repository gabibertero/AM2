# Recuperatorio 1° Parcial Nov-25 (20/11/2025): ej1 dominio, ej3 gradiente, ej4 Lagrange (caja). Uso: python3 figuras/src/p1-todas-2025-11-rec_figs.py
import sys; sys.path.insert(0, __import__("os").path.dirname(__file__))
from p1r2_common import *
from mpl_toolkits.mplot3d.art3d import Poly3DCollection
d = salida("p1-todas-2025-11-rec")

# ---- Ej 1: x²−y²+1>0 ∧ x²+y²≤9 ∧ y²−x²+4>0 ∧ x≠0 ∧ y≠0
xl, yl = (-4, 4), (-4, 4); X, Y = malla(xl, yl, 1000)
fig, ax = plt.subplots(figsize=(7.8, 7.8), facecolor="white"); ejes(ax, xl, yl)
region(ax, (X**2 - Y**2 + 1 > 0) & (X**2 + Y**2 <= 9) & (Y**2 - X**2 + 4 > 0) & (X != 0) & (Y != 0), X, Y)
curva(ax, X, Y, X**2 + Y**2 - 9, True, "k", 2.6)
curva(ax, X, Y, Y**2 - X**2 - 1, False, GR, 1.8); curva(ax, X, Y, X**2 - Y**2 - 4, False, RJ, 1.8)
ax.plot([0, 0], [-3, 3], c="k", lw=1.8, ls=(0, (5, 3))); ax.plot([-3, 3], [0, 0], c="k", lw=1.8, ls=(0, (5, 3)))
ax.text(.12, 3.15, "(0, 3)", fontsize=10); ax.text(3.1, .12, "(3, 0)", fontsize=10); ax.text(.12, 1.1, "(0, 1)", fontsize=10); ax.text(2.1, -.4, "(2, 0)", fontsize=10, color=RJ)
ax.text(-2.6, 3.5, "y² − x² = 1", color=GR, fontsize=11); ax.text(.9, 3.5, "x² − y² = 4", color=RJ, fontsize=11); ax.text(-3.2, -3.1, "x² + y² = 9", fontsize=11)
ax.set_title("Dominio de definición (zona celeste)")
leyenda_abajo(ax, [Patch(color=AZ, alpha=.4, label="dominio"), Line2D([], [], c="k", lw=2.6, label="circunferencia x² + y² = 9: borde incluido (≤)"),
                   Line2D([], [], c=GR, ls="--", lw=1.8, label="y² − x² = 1: borde excluido"), Line2D([], [], c=RJ, ls="--", lw=1.8, label="x² − y² = 4: borde excluido"),
                   Line2D([], [], c="k", ls="--", lw=1.8, label="ejes x = 0 e y = 0: excluidos")], ncol=1)
guardar(fig, d, "ej1")

# ---- Ej 3: P(4,5), ∇f=(−1,1)
fig, ax, u, perp, th = gradiente_fig(d, "ej3", (4, 5), (-1, 1), 1.0, (0, 8), (1, 9), Lnul=2.4)
ax.text(2.3, 6.5, "∇f = −i + j (escala 1:1)\nmáx. crecimiento", color=RJ, fontsize=11, ha="center")
ax.text(5.0, 2.9, "mín.\ncrecim.", color=AZ, fontsize=11, ha="left", va="center")
ax.text(5.8, 6.85, "nulo (α = 45°)", color=VD, fontsize=11); ax.text(1.0, 3.0, "nulo (α = 225°)", color=VD, fontsize=11)
ax.text(4.2, 4.5, "P(4, 5)", fontsize=11); ax.text(4.6, 5.35, "θ = 135°", fontsize=11)
ax.set_title("Gradiente en P(4, 5): ∇f = −i + j")
leyenda_abajo(ax, [Line2D([], [], c=RJ, lw=3, label="∇f (máximo crecimiento), θ = 135°"), Line2D([], [], c=AZ, lw=2.4, label="mínimo crecimiento (−∇f)"),
                   Line2D([], [], c=VD, ls="--", lw=2.2, label="derivada direccional nula (⊥ ∇f): α = 45° y 225°")], ncol=1)
guardar(fig, d, "ej3")

# ---- Ej 4: caja de vértice (1,2,3) en el plano 6x+3y+2z=18
fig = plt.figure(figsize=(7.8, 7.4), facecolor="white"); a = fig.add_subplot(111, projection="3d")
a.add_collection3d(Poly3DCollection([[(3, 0, 0), (0, 6, 0), (0, 0, 9)]], alpha=.25, facecolor=AZ, edgecolor="k"))
x0, y0, z0 = 1, 2, 3
for q in ([(0, 0, 0), (x0, 0, 0), (x0, y0, 0), (0, y0, 0)], [(0, 0, 0), (x0, 0, 0), (x0, 0, z0), (0, 0, z0)], [(0, 0, 0), (0, y0, 0), (0, y0, z0), (0, 0, z0)],
          [(x0, 0, 0), (x0, y0, 0), (x0, y0, z0), (x0, 0, z0)], [(0, y0, 0), (x0, y0, 0), (x0, y0, z0), (0, y0, z0)], [(0, 0, z0), (x0, 0, z0), (x0, y0, z0), (0, y0, z0)]):
    a.add_collection3d(Poly3DCollection([q], alpha=.35, facecolor=RJ, edgecolor="k"))
a.scatter([x0], [y0], [z0], c="k", s=60, depthshade=False); a.text(x0 + .2, y0 + .2, z0 + .6, "(1, 2, 3)")
a.set_xlim(0, 3); a.set_ylim(0, 6); a.set_zlim(0, 9); a.set_xticks(range(0, 4)); a.set_yticks(range(0, 7)); a.set_zticks(range(0, 10))
a.set_xlabel("x"); a.set_ylabel("y"); a.set_zlabel("z"); a.set_box_aspect((3, 6, 9)); a.view_init(22, 50)
a.set_title("Plano 6x + 3y + 2z = 18 (cortes 3, 6, 9) y la caja de volumen máximo"); guardar(fig, d, "ej4")
