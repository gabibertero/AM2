# 1H10 Sep-25 (27/09/2025): ej1 dominio, ej3 gradiente, ej4 superficie, ej5 Lagrange. Uso: python3 figuras/src/p1-1h10-2025-09_figs.py
import sys; sys.path.insert(0, __import__("os").path.dirname(__file__))
from p1r2_common import *
d = salida("p1-1h10-2025-09")

# ---- Ej 1: x²−y²>1, x²+4y²≠4, y≠0 (x≠0 queda implícito)
xl, yl = (-5, 5), (-4, 4); X, Y = malla(xl, yl, 1000)
fig, ax = plt.subplots(figsize=(7.8, 6.6), facecolor="white"); ejes(ax, xl, yl)
region(ax, (X**2 - Y**2 > 1), X, Y)
curva(ax, X, Y, X**2 - Y**2 - 1, False, "k"); curva(ax, X, Y, X**2 + 4*Y**2 - 4, False, RJ)
ax.plot([-5, -1], [0, 0], c=RJ, lw=2, ls=(0, (5, 3)), zorder=4); ax.plot([1, 5], [0, 0], c=RJ, lw=2, ls=(0, (5, 3)), zorder=4)
ax.plot([-1, 1], [0, 0], "ko", ms=6, ls=""); ax.text(1.1, .25, "(1, 0)"); ax.text(-2.4, .25, "(−1, 0)")
ax.plot([2, -2], [0, 0], "o", c=RJ, ms=6, mfc="white"); ax.text(2.05, -.55, "(2, 0)", color=RJ)
ax.text(2.2, 3.3, "x² − y² = 1", rotation=52, fontsize=11); ax.text(0, 1.3, "x² + 4y² = 4 (elipse)", color=RJ, fontsize=11, ha="center")
ax.set_title("Dominio de definición (zona celeste)")
leyenda_abajo(ax, [Patch(color=AZ, alpha=.4, label="x² − y² > 1  (raíz en el denominador)"), Line2D([], [], c="k", ls="--", label="hipérbola x² − y² = 1 (no incluida)"),
                   Line2D([], [], c=RJ, ls="--", label="elipse x² + 4y² = 4 y eje x: puntos excluidos")], ncol=1)
guardar(fig, d, "ej1")

# ---- Ej 3: P(1,1), ∇z=(4e,3e)
e = np.e
fig, ax, u, perp, th = gradiente_fig(d, "ej3", (1, 1), (4*e, 3*e), .25, (-3, 5), (-3, 5), S=(2*np.cos(np.pi/3), 2*np.sin(np.pi/3)), Lnul=2.4,
                                    curva_nivel=lambda X, Y: X**3*Y*np.exp(X*Y**2))
ax.text(3.2, 3.6, "∇z (dibujado a escala 1/4)\nmáx. crecimiento", color=RJ, fontsize=11, ha="left")
ax.text(-.7, -.5, "mín.\ncrecim.", color=AZ, fontsize=11, ha="center", va="top")
ax.text(-.5, 3.2, "nulo", color=VD, fontsize=11, ha="center"); ax.text(2.5, -1.3, "nulo", color=VD, fontsize=11)
ax.text(2.1, 2.9, "S (α = 60°)", color="#6a3d9a", fontsize=11, ha="left"); ax.text(1.9, 1.17, "θ ≈ 37°", fontsize=11)
ax.text(.85, 1.15, "P(1, 1)", ha="right"); ax.set_title("Gradiente en P(1, 1): ∇z = 4e i + 3e j")
leyenda_abajo(ax, [Line2D([], [], c=RJ, lw=3, label="∇z (máximo crecimiento)"), Line2D([], [], c=AZ, lw=2.4, label="mínimo crecimiento (−∇z)"),
                   Line2D([], [], c=VD, ls="--", lw=2.2, label="crecimiento nulo (⊥ ∇z)"), Line2D([], [], c="#6a3d9a", lw=2.6, label="dirección S (α = 60°)"),
                   Line2D([], [], c=GR, ls=":", label="curva de nivel por P")], ncol=2)
guardar(fig, d, "ej3")

# ---- Ej 4
f = lambda X, Y: X**3 + 3*Y**2 - 3*X - 9*Y + Y**3
fig, a, b = extremos_fig(d, "ej4", f, (-2.5, 2.5), (-4.5, 2.5), [(1, 1, "Mín"), (-1, -3, "Máx"), (1, -3, "Silla"), (-1, 1, "Silla")], "", zt=range(-20, 60, 20))
for (px, py, t) in [(1, 1, "Mín"), (-1, -3, "Máx"), (1, -3, "Silla"), (-1, 1, "Silla")]:
    b.text(px + .15, py + .2, f"({px}, {py})", fontsize=11)
guardar(fig, d, "ej4")

# ---- Ej 5: distancia mínima del origen al plano x+3y+6z=49
fig = plt.figure(figsize=(7.8, 7.4), facecolor="white"); a = fig.add_subplot(111, projection="3d")
from mpl_toolkits.mplot3d.art3d import Poly3DCollection
V = [(49, 0, 0), (0, 49/3, 0), (0, 0, 49/6)]; a.add_collection3d(Poly3DCollection([V], alpha=.3, facecolor=AZ, edgecolor="k"))
Q = np.array([1, 3, 6])*49/46; a.plot([0, Q[0]], [0, Q[1]], [0, Q[2]], c=RJ, lw=3); a.scatter(*Q, c=RJ, s=70, depthshade=False); a.scatter(0, 0, 0, c="k", s=40)
a.text(*(Q + np.array([4, 0, 2.5])), "Q = (49/46)(1, 3, 6)", color=RJ); a.text(1, -3, -1, "O", fontsize=12)
a.set_xlim(0, 50); a.set_ylim(0, 20); a.set_zlim(0, 10); a.set_xticks(range(0, 51, 10)); a.set_yticks(range(0, 21, 5)); a.set_zticks(range(0, 11, 2))
a.set_xlabel("x"); a.set_ylabel("y"); a.set_zlabel("z"); a.view_init(22, 35); a.set_title("Plano x + 3y + 6z = 49 (cortes 49, 49/3, 49/6) y el punto más cercano")
a.set_box_aspect((50, 20, 10)); guardar(fig, d, "ej5")
