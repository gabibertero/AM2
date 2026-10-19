# 1H10 (B) 2024: ej1 dominio, ej2 gradiente, ej3 extremos, ej4 Lagrange. Uso: python3 figuras/src/p1-1h10-2024-b_figs.py
import sys; sys.path.insert(0, __import__("os").path.dirname(__file__))
from p1r2_common import *
d = salida("p1-1h10-2024-b")

# ---- Ej 1: x²+y²<4 ∧ −1+x ≤ y ≤ 1+x
xl, yl = (-3, 3), (-3, 3); X, Y = malla(xl, yl, 1000)
fig, ax = plt.subplots(figsize=(7.8, 7.6), facecolor="white"); ejes(ax, xl, yl)
region(ax, (X**2 + Y**2 < 4) & (Y - X >= -1) & (Y - X <= 1), X, Y)
curva(ax, X, Y, X**2 + Y**2 - 4, False, GR, 2)
t = np.linspace(-3, 3, 10); ax.plot(t, t + 1, c="k", lw=2.2); ax.plot(t, t - 1, c="k", lw=2.2)
ax.text(-.4, -2.7, "y = x − 1", fontsize=11); ax.text(-2.9, 0.3, "y = x + 1", fontsize=11)
ax.text(1.3, -2.45, "x² + y² = 4", color=GR, fontsize=11)
ax.set_title("Dominio de definición (zona celeste)")
leyenda_abajo(ax, [Patch(color=AZ, alpha=.4, label="dominio: disco ∩ banda"), Line2D([], [], c="k", lw=2.2, label="rectas y = x ± 1: borde incluido (≤)"),
                   Line2D([], [], c=GR, ls="--", label="circunferencia r = 2: borde excluido (<)")], ncol=1)
guardar(fig, d, "ej1")

# ---- Ej 2 (lectura 5x²): P(1,1), ∇z=(6,−6), S a 135° (= sentido de mínimo crecimiento)
px, py = 1, 1; gx, gy = 6, -6; esc = 1/3
fig, ax = plt.subplots(figsize=(7.8, 7.6), facecolor="white"); lim = (-3, 5); ejes(ax, (-3, 5), (-3, 4))
def fl(v, c, lw, o=(px, py)): ax.annotate("", xy=(o[0]+v[0], o[1]+v[1]), xytext=o, arrowprops=dict(arrowstyle="-|>", color=c, lw=lw, mutation_scale=22), zorder=5)
fl((esc*gx, esc*gy), RJ, 3)
ax.plot([px, px+esc*gx], [py, py], c=RJ, lw=1, ls="--"); ax.plot([px+esc*gx, px+esc*gx], [py, py+esc*gy], c=RJ, lw=1, ls="--")
u = np.array([1, -1])/np.sqrt(2); pp = np.array([1, 1])/np.sqrt(2)
ax.plot([px - 2.2*pp[0], px + 2.2*pp[0]], [py - 2.2*pp[1], py + 2.2*pp[1]], c=VD, lw=2.2, ls=(0, (6, 3)), zorder=4)
fl(-1.9*u, AZ, 2.6); fl(1.6*np.array([-np.sqrt(2)/2, np.sqrt(2)/2]), "#6a3d9a", 2.4, (px, py))
ax.plot([px], [py], "ko", ms=7, zorder=6)
ax.add_patch(Arc((px, py), 1.6, 1.6, theta1=-45, theta2=0, color="k", lw=1.5, zorder=4)); ax.text(px + .9, py - .45, "θ = −45°", fontsize=11)
ax.text(3.15, -.9, "∇z (a escala 1/3)\nmáx. crecimiento", color=RJ, fontsize=11)
ax.text(px - 2.9, py + 1.65, "mín. crecim. y S (135°)", color=AZ, fontsize=11)
ax.text(px + 1.75, py + 1.8, "nulo", color=VD, fontsize=11); ax.text(-1.5, -1.0, "nulo", color=VD, fontsize=11); ax.text(px - .25, py + .15, "P", ha="right")
ax.set_title("Gradiente en P(1, 1): ∇z = 6 i − 6 j")
leyenda_abajo(ax, [Line2D([], [], c=RJ, lw=3, label="∇z (máx. crecimiento), θ = −45° = 315°"), Line2D([], [], c=AZ, lw=2.6, label="mínimo crecimiento (−∇z) = dirección S (135°)"),
                   Line2D([], [], c=VD, ls="--", lw=2.2, label="crecimiento nulo (⊥ ∇z)")], ncol=1)
guardar(fig, d, "ej2")

# ---- Ej 3
f = lambda X, Y: 4*X**3/3 + Y**3/3 - 2*X**2 - Y - 10
pts = [(0, 1, "Silla"), (0, -1, "Máx"), (1, 1, "Mín"), (1, -1, "Silla")]
fig, a, b = extremos_fig(d, "ej3", f, (-1, 2), (-2, 2), pts, "", zt=range(-30, 1, 10))
for (p, q, t) in pts: b.text(p + .06, q + .1, f"({p}, {q})", fontsize=11)
guardar(fig, d, "ej3")

# ---- Ej 4: curvas de nivel de z = x²/2 + y² + x − y, recta x + y = 1, mínimo (0,1)
xl, yl = (-3, 3), (-2, 3); X, Y = malla(xl, yl, 700); Z = X**2/2 + Y**2 + X - Y
fig, ax = plt.subplots(figsize=(7.8, 7.0), facecolor="white"); ejes(ax, xl, yl)
ax.contour(X, Y, Z, levels=[-.5, .5, 1.5, 3, 5], colors=[GR], linewidths=1, linestyles="dotted")
ax.contour(X, Y, Z, levels=[0], colors=[RJ], linewidths=2.4)
t = np.linspace(-3, 3, 10); ax.plot(t, 1 - t, c=AZ, lw=2.4)
ax.plot([0], [1], "ko", ms=8, zorder=6); ax.text(.15, 1.15, "Mín (0, 1)", fontsize=12)
ax.text(1.7, -.95, "x + y = 1", color=AZ, fontsize=11); ax.text(-2.9, 2.6, "z = 0 (tangente a la recta)", color=RJ, fontsize=11, bbox=dict(fc="white", ec="none", alpha=.9, pad=1))
ax.set_title("Curvas de nivel de z y la restricción x + y = 1")
leyenda_abajo(ax, [Line2D([], [], c=AZ, lw=2.4, label="restricción x + y = 1"), Line2D([], [], c=RJ, lw=2.4, label="curva de nivel z = 0 (por el mínimo)"),
                   Line2D([], [], c=GR, ls=":", label="otras curvas de nivel")], ncol=1)
guardar(fig, d, "ej4")
