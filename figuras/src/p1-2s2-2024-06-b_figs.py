# 2S2 Jun-24 Tema B: ej1 dominio, ej2 tronco de cono, ej3 gradiente 3D, ej4 extremos, ej5 caja sin tapa. Uso: python3 figuras/src/p1-2s2-2024-06-b_figs.py
import sys; sys.path.insert(0, __import__("os").path.dirname(__file__))
from p1r2_common import *
from mpl_toolkits.mplot3d.art3d import Poly3DCollection
d = salida("p1-2s2-2024-06-b")

# ---- Ej 1: y²−x²<1 ∧ −1≤x≤1 ∧ x²/4+y²/9≤1
xl, yl = (-3, 3), (-4, 4); X, Y = malla(xl, yl, 1000)
fig, ax = plt.subplots(figsize=(7.8, 7.6), facecolor="white"); ejes(ax, xl, yl)
region(ax, (Y**2 - X**2 < 1) & (np.abs(X) <= 1) & (X**2/4 + Y**2/9 <= 1), X, Y)
curva(ax, X, Y, X**2/4 + Y**2/9 - 1, True, "k", 2.2)
curva(ax, X, Y, Y**2 - X**2 - 1, False, GR, 1.8)
for s in (-1, 1): ax.plot([s, s], [-4, 4], c=RJ, lw=2.2)
ax.text(1.12, 3.5, "x = 1", color=RJ, fontsize=11); ax.text(-1.95, 3.5, "x = −1", color=RJ, fontsize=11)
ax.text(1.3, -3.4, "elipse x²/4 + y²/9 = 1", fontsize=11); ax.text(1.35, 2.75, "y² − x² = 1", color=GR, fontsize=11)
ax.text(.1, 3.05, "(0, 3)", fontsize=11); ax.text(2.05, .15, "(2, 0)", fontsize=11)
ax.set_title("Dominio de definición (zona celeste)")
leyenda_abajo(ax, [Patch(color=AZ, alpha=.4, label="dominio"), Line2D([], [], c=RJ, lw=2.2, label="x = ±1: borde incluido (≤)"),
                   Line2D([], [], c="k", lw=2.2, label="elipse: borde incluido (≤)"), Line2D([], [], c=GR, ls="--", label="y² − x² = 1: borde excluido (<)")], ncol=2)
guardar(fig, d, "ej1")

# ---- Ej 2: corte del tronco de cono (cm)
fig, ax = plt.subplots(figsize=(7.8, 6.2), facecolor="white")
ax.add_patch(plt.Polygon([(-20, 0), (20, 0), (10, 30), (-10, 30)], fc=AZ, alpha=.3, ec="k", lw=2))
ax.plot([0, 0], [0, 30], c=GR, lw=1.2, ls="--"); ax.plot([0, 20], [0, 0], c=RJ, lw=3); ax.plot([0, 10], [30, 30], c=VD, lw=3)
ax.text(10, -2.6, "R = 20 cm", color=RJ, ha="center", fontsize=12); ax.text(5, 31.2, "r = 10 cm", color=VD, ha="center", fontsize=12); ax.text(1, 14, "h = 30 cm", color=GR, fontsize=12)
ejes(ax, (-25, 25), (-6, 36), tx=range(-20, 21, 10), ty=range(0, 31, 10), lx="x (cm)", ly="altura (cm)")
ax.set_title("Corte del tronco de cono: r = 10, R = 20, h = 30")
guardar(fig, d, "ej2")

# ---- Ej 3: en M(1,6,2): s = MN = (3,4,12) y ∇u = (−12,−1,12) (a escala 1/2)
fig = plt.figure(figsize=(7.8, 7.8), facecolor="white"); a = fig.add_subplot(111, projection="3d")
M = np.array([1, 6, 2]); s = np.array([3, 4, 12]); g = np.array([-12, -1, 12])
a.quiver(*M, *s, color="#6a3d9a", lw=2.6, arrow_length_ratio=.08); a.quiver(*M, *(g/2), color=RJ, lw=2.6, arrow_length_ratio=.1)
a.scatter(*M, c="k", s=50, depthshade=False); a.text(M[0]+.3, M[1]+.3, M[2]-.8, "M(1, 6, 2)")
a.scatter(*(M+s), c="k", s=30, depthshade=False); a.text(4.2, 10, 13, "N(4, 10, 14)")
a.set_xlim(-6, 6); a.set_ylim(0, 12); a.set_zlim(0, 14); a.set_xticks(range(-6, 7, 2)); a.set_yticks(range(0, 13, 2)); a.set_zticks(range(0, 15, 2))
a.set_xlabel("x"); a.set_ylabel("y"); a.set_zlabel("z"); a.set_box_aspect((12, 12, 14)); a.view_init(22, -58)
a.set_title("En M: dirección s = MN y gradiente ∇u = −12 i − j + 12 k")
a.legend(handles=[Line2D([], [], c="#6a3d9a", lw=2.6, label="s = MN = (3, 4, 12), módulo 13"), Line2D([], [], c=RJ, lw=2.6, label="∇u (dibujado a escala 1/2), módulo 17")], loc="upper center", bbox_to_anchor=(.5, -.02), frameon=False, fontsize=11)
guardar(fig, d, "ej3")

# ---- Ej 4
f = lambda X, Y: 2*X**3/3 - 18*X - 4*Y**3/3 + 16*Y
pts = [(3, 2, "Silla"), (3, -2, "Mín"), (-3, 2, "Máx"), (-3, -2, "Silla")]
fig, a, b = extremos_fig(d, "ej4", f, (-4, 4), (-3, 3), pts, "", zt=range(-200, 201, 100))
for (p, q, t) in pts: b.text(p + .12, q + .18, f"({p}, {q})", fontsize=11)
guardar(fig, d, "ej4")

# ---- Ej 5: caja sin tapa 4 × 4 × 2
fig = plt.figure(figsize=(7.8, 6.6), facecolor="white"); a = fig.add_subplot(111, projection="3d")
X0, Y0, Z0 = 4, 4, 2
for q in ([(0, 0, 0), (X0, 0, 0), (X0, Y0, 0), (0, Y0, 0)], [(0, 0, 0), (X0, 0, 0), (X0, 0, Z0), (0, 0, Z0)], [(0, 0, 0), (0, Y0, 0), (0, Y0, Z0), (0, 0, Z0)],
          [(X0, 0, 0), (X0, Y0, 0), (X0, Y0, Z0), (X0, 0, Z0)], [(0, Y0, 0), (X0, Y0, 0), (X0, Y0, Z0), (0, Y0, Z0)]):
    a.add_collection3d(Poly3DCollection([q], alpha=.35, facecolor=RJ, edgecolor="k"))
a.plot([0, X0, X0, 0, 0], [0, 0, Y0, Y0, 0], [Z0]*5, c="k", ls="--", lw=1.2)
a.text(2, 2, Z0 + .5, "abierta (sin tapa)", ha="center", fontsize=11)
a.set_xlim(0, 5); a.set_ylim(0, 5); a.set_zlim(0, 3); a.set_xticks(range(0, 6)); a.set_yticks(range(0, 6)); a.set_zticks(range(0, 4))
a.set_xlabel("x"); a.set_ylabel("y"); a.set_zlabel("z"); a.set_box_aspect((5, 5, 3)); a.view_init(38, 36)
a.set_title("Caja sin tapa óptima: x = 4, y = 4, z = 2 (V = 32, S = 48)")
guardar(fig, d, "ej5")
