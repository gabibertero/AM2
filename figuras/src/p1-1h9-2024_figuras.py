# 1H9 May-24 (11/05/2024): ej1 dominio (a = 1), ej3 gradiente, ej4 plano tangente y caja. Uso: python3 figuras/src/p1-1h9-2024_figuras.py
import sys; sys.path.insert(0, __import__("os").path.dirname(__file__))
from p1r2_common import *
from mpl_toolkits.mplot3d.art3d import Poly3DCollection
d = salida("p1-1h9-2024-05")
BB = dict(fc="white", ec="none", alpha=.85, pad=1.2)

# ---- Ej 1 (a = 1): [x²/9+y²/4 ≥ 1 ∧ x²−y²/4 < 1] ∨ [x²/9+y²/4 ≤ 1 ∧ x²−y²/4 > 1]
xl, yl = (-4, 4), (-4, 4); X, Y = malla(xl, yl, 1200)
E, H = X**2/9 + Y**2/4 - 1, X**2 - Y**2/4 - 1
fig, ax = plt.subplots(figsize=(7.8, 7.6), facecolor="white"); ejes(ax, xl, yl)
region(ax, ((E >= 0) & (H < 0)) | ((E <= 0) & (H > 0)), X, Y)
curva(ax, X, Y, E, True, "k", 2.4); curva(ax, X, Y, H, False, RJ, 1.9)
ax.text(2.1, -2.75, "elipse x²/9 + y²/4 = 1", fontsize=11, ha="center", bbox=BB); ax.text(-3.6, -3.7, "hipérbola x² − y²/4 = 1", color=RJ, fontsize=11, bbox=BB)
for (px, py) in [(3, 0), (-3, 0), (1, 0), (-1, 0)]: ax.plot([px], [py], "ko", ms=5, zorder=6)
for (t, px, py, h) in [("(3a; 0)", 3.1, .15, "left"), ("(−3a; 0)", -3.1, .15, "right"), ("(a; 0)", .9, -.45, "right"), ("(−a; 0)", -.9, -.45, "left")]:
    ax.text(px, py, t, fontsize=10.5, ha=h, bbox=BB)
ax.plot([0, 0], [2, -2], "ko", ms=0); ax.plot([0], [2], "ko", ms=5, zorder=6); ax.plot([0], [-2], "ko", ms=5, zorder=6)
ax.text(.12, 2.1, "(0; 2a)", fontsize=10.5, bbox=BB); ax.text(.12, -2.35, "(0; −2a)", fontsize=10.5, bbox=BB)
k = 3/np.sqrt(5); m = 4/np.sqrt(5)
for sx in (1, -1):
    for sy in (1, -1): ax.plot([sx*k], [sy*m], "o", c=RJ, ms=5, zorder=6)
ax.text(k + .1, m + .1, "(3a/√5; 4a/√5)", fontsize=10, bbox=BB)
ax.set_title("Dominio con a = 1 (zona celeste); para otro a, todo escala por |a|")
leyenda_abajo(ax, [Patch(color=AZ, alpha=.4, label="dominio"), Line2D([], [], c="k", lw=2.4, label="elipse: borde incluido (N = 0 anula el cociente)"),
                   Line2D([], [], c=RJ, ls="--", lw=1.9, label="hipérbola: borde excluido (denominador 0)")], ncol=1)
guardar(fig, d, "ej1")

# ---- Ej 3: P(π, π/3), ∇z = (−√3, √3/2), S a −30°
p3 = np.pi/3; g = (-np.sqrt(3), np.sqrt(3)/2)
tkx = [k*p3 for k in range(0, 7)]; tky = [k*p3 for k in range(-1, 4)]
fig, ax, u, perp, th = gradiente_fig(d, "ej3", (np.pi, p3), g, 1.0, (0, 2*np.pi + .15), (-1.3, 3.5), tx=tkx, ty=tky, S=(1.8*np.cos(-np.pi/6), 1.8*np.sin(-np.pi/6)), Lnul=1.7)
ax.set_xticklabels(["0", "π/3", "2π/3", "π", "4π/3", "5π/3", "2π"], fontsize=10); ax.set_yticklabels(["−π/3", "0", "π/3", "2π/3", "π"], fontsize=10)
ax.text(1.0, 2.55, "∇z\nmáx. crecimiento", color=RJ, fontsize=11, ha="center")
ax.text(4.8, 2.05, "mín. crecim.", color=AZ, fontsize=11); ax.text(2.0, 2.8, "nulo", color=VD, fontsize=11); ax.text(3.6, -.35, "nulo", color=VD, fontsize=11)
ax.text(4.75, .1, "S (−30°)", color="#6a3d9a", fontsize=11); ax.text(np.pi - .12, p3 - .3, "P", ha="right")
ax.set_title("Gradiente en P(π; π/3): ∇z = −√3 i + (√3/2) j, θ ≈ 153,43°")
leyenda_abajo(ax, [Line2D([], [], c=RJ, lw=3, label="∇z (máx.), θ ≈ 153,43°"), Line2D([], [], c=AZ, lw=2.4, label="mínimo crecimiento (−∇z), θ ≈ 333,43°"),
                   Line2D([], [], c=VD, ls="--", lw=2.2, label="crecimiento nulo (⊥ ∇z): 63,43° y 243,43°"), Line2D([], [], c="#6a3d9a", lw=2.6, label="dirección S (α = −30°)")], ncol=2)
guardar(fig, d, "ej3")

# ---- Ej 4: plano 2x+4y+z=21 y caja (7/2, 7/4, 7)
fig = plt.figure(figsize=(7.8, 7.4), facecolor="white"); a = fig.add_subplot(111, projection="3d")
a.add_collection3d(Poly3DCollection([[(10.5, 0, 0), (0, 5.25, 0), (0, 0, 21)]], alpha=.25, facecolor=AZ, edgecolor="k"))
x0, y0, z0 = 3.5, 1.75, 7
for q in ([(0, 0, 0), (x0, 0, 0), (x0, y0, 0), (0, y0, 0)], [(0, 0, 0), (x0, 0, 0), (x0, 0, z0), (0, 0, z0)], [(0, 0, 0), (0, y0, 0), (0, y0, z0), (0, 0, z0)],
          [(x0, 0, 0), (x0, y0, 0), (x0, y0, z0), (x0, 0, z0)], [(0, y0, 0), (x0, y0, 0), (x0, y0, z0), (0, y0, z0)], [(0, 0, z0), (x0, 0, z0), (x0, y0, z0), (0, y0, z0)]):
    a.add_collection3d(Poly3DCollection([q], alpha=.35, facecolor=RJ, edgecolor="k"))
a.scatter([x0], [y0], [z0], c="k", s=60, depthshade=False); a.text(x0 + .3, y0, z0 + 1.2, "(7/2; 7/4; 7)")
a.set_xlim(0, 10.5); a.set_ylim(0, 5.25); a.set_zlim(0, 21); a.set_xticks(range(0, 11, 2)); a.set_yticks(range(0, 6)); a.set_zticks(range(0, 22, 3))
a.set_xlabel("x"); a.set_ylabel("y"); a.set_zlabel("z"); a.set_box_aspect((10.5, 5.25, 21)); a.view_init(24, 38)
a.set_title("Plano tangente 2x + 4y + z = 21 y la caja de volumen máximo (V = 343/8)"); guardar(fig, d, "ej4")
print("ok figuras 1h9-2024")
