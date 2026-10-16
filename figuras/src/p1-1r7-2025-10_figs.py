# 1R7 Oct-25 (7/10/2025): ej1 dominio, ej3 gradiente, ej4 superficie, ej5 Lagrange (caja). Uso: python3 figuras/src/p1-1r7-2025-10_figs.py
import sys; sys.path.insert(0, __import__("os").path.dirname(__file__))
from p1r2_common import *
from mpl_toolkits.mplot3d.art3d import Poly3DCollection
d = salida("p1-1r7-2025-10")

# ---- Ej 1: x²/4+y²/9≤1 ∧ y²−x²<1 ∧ xy>0 ∧ xy≠1
xl, yl = (-3, 3), (-4, 4); X, Y = malla(xl, yl, 1000)
fig, ax = plt.subplots(figsize=(7.8, 7.6), facecolor="white"); ejes(ax, xl, yl)
m = (X**2/4 + Y**2/9 <= 1) & (Y**2 - X**2 < 1) & (X*Y > 0)
region(ax, m, X, Y)
curva(ax, X, Y, X**2/4 + Y**2/9 - 1, True, "k", 2.5)
curva(ax, X, Y, Y**2 - X**2 - 1, False, GR, 1.6)
curva(ax, X, Y, X*Y - 1, False, RJ, 2.2)
ax.plot([0, 0], [-3, 3], c=GR, lw=1.6, ls=(0, (5, 3))); ax.plot([-2, 2], [0, 0], c=GR, lw=1.6, ls=(0, (5, 3)))
ax.text(1.55, -3.35, "elipse x²/4 + y²/9 = 1", fontsize=11, ha="center"); ax.text(1.5, 2.45, "y² − x² = 1", color=GR, fontsize=11)
ax.text(1.55, .72, "xy = 1", color=RJ, fontsize=11); ax.text(.12, 3.1, "(0, 3)", fontsize=11); ax.text(2.05, .15, "(2, 0)", fontsize=11)
ax.set_title("Dominio de definición (zona celeste)")
leyenda_abajo(ax, [Patch(color=AZ, alpha=.4, label="dominio (1.er y 3.er cuadrante)"), Line2D([], [], c="k", lw=2.5, label="elipse: borde incluido (≤)"),
                   Line2D([], [], c=GR, ls="--", label="y² − x² = 1 y ejes: borde excluido"), Line2D([], [], c=RJ, ls="--", lw=2.2, label="xy = 1: puntos excluidos")], ncol=2)
guardar(fig, d, "ej1")

# ---- Ej 3: P(π/3, π/3), ∇z=(−9√2, 6√2), S a 45°
pi3 = np.pi/3; g = (-9*np.sqrt(2), 6*np.sqrt(2)); lim = (-pi3, 5*pi3)
tk = [k*pi3 for k in range(-1, 6)]
fig, ax, u, perp, th = gradiente_fig(d, "ej3", (pi3, pi3), g, .1, lim, lim, tx=tk, ty=tk, S=(1.6*np.cos(np.pi/4), 1.6*np.sin(np.pi/4)), Lnul=2.0)
lab = ["−2π/3", "−π/3", "0", "π/3", "2π/3", "π", "4π/3", "5π/3", "2π"]
ax.set_xticklabels(["−π/3", "0", "π/3", "2π/3", "π", "4π/3", "5π/3"], fontsize=10)
ax.set_yticklabels(["−π/3", "0", "π/3", "2π/3", "π", "4π/3", "5π/3"], fontsize=10)
ax.text(-.95, 4.7, "∇z (dibujado a escala 1/10)\nmáx. crecimiento", color=RJ, fontsize=11, ha="left")
ax.text(2.75, .35, "mín. crecim.", color=AZ, fontsize=11, ha="left", va="bottom")
ax.text(pi3 + 1.25, pi3 + 1.85, "nulo", color=VD, fontsize=11); ax.text(pi3 - 1.7, pi3 - 1.95, "nulo", color=VD, fontsize=11)
ax.text(pi3 + 1.25, pi3 + 1.25, "S (45°)", color="#6a3d9a", fontsize=11); ax.text(pi3 - .3, pi3 - .55, "P", ha="right")
ax.set_title("Gradiente en P(π/3, π/3): ∇z = −9√2 i + 6√2 j")
leyenda_abajo(ax, [Line2D([], [], c=RJ, lw=3, label="∇z (máx. crecimiento), θ ≈ 146,31°"), Line2D([], [], c=AZ, lw=2.4, label="mínimo crecimiento (−∇z)"),
                   Line2D([], [], c=VD, ls="--", lw=2.2, label="crecimiento nulo (⊥ ∇z), tangente a la curva de nivel"), Line2D([], [], c="#6a3d9a", lw=2.6, label="dirección S (α = 45°)")], ncol=2)
guardar(fig, d, "ej3")

# ---- Ej 4
f = lambda X, Y: X**3 - 12*X*Y + 8*Y**3 - 3
pts = [(2, 1, "Mín"), (0, 0, "Silla")]
fig, a, b = extremos_fig(d, "ej4", f, (-2, 3), (-1.5, 2), pts, "", zt=range(-20, 41, 20))
for (px, py, t) in pts: b.text(px + .1, py + .12, f"({px}, {py})", fontsize=11)
guardar(fig, d, "ej4")

# ---- Ej 5: caja de vértice (3,2,1) en el plano x + 3y/2 + 3z = 9
fig = plt.figure(figsize=(7.8, 7.4), facecolor="white"); a = fig.add_subplot(111, projection="3d")
a.add_collection3d(Poly3DCollection([[(9, 0, 0), (0, 6, 0), (0, 0, 3)]], alpha=.25, facecolor=AZ, edgecolor="k"))
x0, y0, z0 = 3, 2, 1
cara = lambda pts_: Poly3DCollection([pts_], alpha=.35, facecolor=RJ, edgecolor="k")
O = (0, 0, 0)
for q in ([(0, 0, 0), (x0, 0, 0), (x0, y0, 0), (0, y0, 0)], [(0, 0, 0), (x0, 0, 0), (x0, 0, z0), (0, 0, z0)], [(0, 0, 0), (0, y0, 0), (0, y0, z0), (0, 0, z0)],
          [(x0, 0, 0), (x0, y0, 0), (x0, y0, z0), (x0, 0, z0)], [(0, y0, 0), (x0, y0, 0), (x0, y0, z0), (0, y0, z0)], [(0, 0, z0), (x0, 0, z0), (x0, y0, z0), (0, y0, z0)]):
    a.add_collection3d(cara(q))
a.scatter([x0], [y0], [z0], c="k", s=60, depthshade=False); a.text(x0 + .3, y0, z0 + .5, "(3, 2, 1)")
a.set_xlim(0, 9); a.set_ylim(0, 6); a.set_zlim(0, 3); a.set_xticks(range(0, 10)); a.set_yticks(range(0, 7)); a.set_zticks(range(0, 4))
a.set_xlabel("x"); a.set_ylabel("y"); a.set_zlabel("z"); a.set_box_aspect((9, 6, 3)); a.view_init(24, 38)
a.set_title("Plano x + (3/2)y + 3z = 9 y la caja de volumen máximo (V = 6)"); guardar(fig, d, "ej5")
