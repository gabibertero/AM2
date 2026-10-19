# 1H9 May-23 (13/05/2023) y Recup. 1H9 Jul-23 (08/07/2023): dominios, gradientes, extremos, Lagrange (plano).
# Uso: python3 figuras/src/p1-1h9-2023_figs.py
import sys; sys.path.insert(0, __import__("os").path.dirname(__file__))
from p1r2_common import *
from mpl_toolkits.mplot3d.art3d import Poly3DCollection
BB = dict(fc="white", ec="none", alpha=.85, pad=1.2)
PU = "#6a3d9a"
s2 = np.sqrt(2)

# ================= May-23 =================
d = salida("p1-1h9-2023-05")
# Ej 1: 1 < x²+y² < 9 (ambas circunferencias excluidas)
xl = yl = (-4, 4); X, Y = malla(xl, yl, 1000); R2 = X**2 + Y**2
fig, ax = plt.subplots(figsize=(7.8, 7.6), facecolor="white"); ejes(ax, xl, yl)
region(ax, (R2 > 1) & (R2 < 9), X, Y)
curva(ax, X, Y, R2 - 1, False, RJ, 1.9); curva(ax, X, Y, R2 - 9, False, RJ, 1.9)
for (px, py, t, h) in [(1, 0, "1", "left"), (3, 0, "3", "left")]: ax.plot([px], [py], "ko", ms=5, zorder=6)
ax.text(1.1, .2, "(1; 0)", fontsize=11, bbox=BB); ax.text(3.1, .2, "(3; 0)", fontsize=11, bbox=BB)
ax.text(0, 2.0, "dominio", ha="center", fontsize=12, bbox=BB)
ax.set_title("Dominio: 1 < x² + y² < 9 (corona circular, bordes excluidos)")
leyenda_abajo(ax, [Patch(color=AZ, alpha=.4, label="dominio"), Line2D([], [], c=RJ, ls="--", lw=1.9, label="x² + y² = 1 y x² + y² = 9: bordes excluidos")], ncol=1)
guardar(fig, d, "ej1")

# Ej 3: z = x³ + 3x/y + 4y², P(1; −1), ∇z = −11 j, S a 60°
fig, ax, u, perp, th = gradiente_fig(d, "ej3", (1, -1), (0, -11), .25, (-3, 5), (-5, 3), S=(1.8*np.cos(np.pi/3), 1.8*np.sin(np.pi/3)), Lnul=1.6)
ax.text(.45, -1.35, "P(1; −1)", fontsize=11, ha="right", bbox=BB)
ax.text(1.15, -3.2, "∇z = −11 j\n(máx. crecim., 270°)", color=RJ, fontsize=11)
ax.text(.9, 0.35, "mín. crecim. (90°)", color=AZ, fontsize=11, ha="right")
ax.text(2.7, -.8, "nulo (0°)", color=VD, fontsize=11); ax.text(-2.6, -.8, "nulo (180°)", color=VD, fontsize=11)
ax.text(1.95, .75, "S (60°)", color=PU, fontsize=11)
ax.set_title("Gradiente en P(1; −1): ∇z = −11 j (dibujado a escala 1/4)")
leyenda_abajo(ax, [Line2D([], [], c=RJ, lw=3, label="∇z (máx.): módulo 11, θ = 270° (−90°)"), Line2D([], [], c=AZ, lw=2.4, label="mínimo crecimiento (−∇z): 90°"),
                   Line2D([], [], c=VD, ls="--", lw=2.2, label="crecimiento nulo (⊥ ∇z): 0° y 180°"), Line2D([], [], c=PU, lw=2.6, label="dirección S (α = 60°)")], ncol=2)
guardar(fig, d, "ej3")

# Ej 4: z = x²/2 + xy + y³/3: silla (0;0), mín (−1;1)
f = lambda X, Y: X**2/2 + X*Y + Y**3/3
pts = [(0, 0, "Silla"), (-1, 1, "Mín")]
fig, a, b = extremos_fig(d, "ej4", f, (-2.5, 2.5), (-2.5, 2.5), pts, "", zt=range(-4, 9, 4))
b.text(.15, -.45, "(0; 0)", fontsize=11); b.text(-1.0, 1.25, "(−1; 1)", fontsize=11)
guardar(fig, d, "ej4")

# ================= Jul-23 (recuperatorio) =================
d = salida("p1-1h9-2023-07-rec")
# Ej 1 (lectura de la oficial: 36 − 4x² + 9y²): x²/9 − y²/4 ≤ 1 y x²+y² > 4
xl, yl = (-7, 7), (-5, 5); X, Y = malla(xl, yl, 1400)
H = X**2/9 - Y**2/4 - 1; C = X**2 + Y**2 - 4
fig, ax = plt.subplots(figsize=(7.8, 5.9), facecolor="white"); ejes(ax, xl, yl)
region(ax, (H <= 0) & (C > 0), X, Y)
curva(ax, X, Y, H, True, "k", 2.4); curva(ax, X, Y, C, False, RJ, 1.9)
xs = np.array(xl); ax.plot(xs, 2/3*xs, c=GR, ls=":", lw=1.3); ax.plot(xs, -2/3*xs, c=GR, ls=":", lw=1.3)
for (px, py) in [(3, 0), (-3, 0), (2, 0), (-2, 0), (0, 2), (0, -2)]: ax.plot([px], [py], "ko", ms=5, zorder=6)
ax.text(3.1, -.75, "(3; 0)", fontsize=10.5, bbox=BB); ax.text(-3.1, -.75, "(−3; 0)", fontsize=10.5, ha="right", bbox=BB)
ax.text(.12, 2.1, "(0; 2)", fontsize=10.5, bbox=BB); ax.text(.12, -2.5, "(0; −2)", fontsize=10.5, bbox=BB)
ax.text(5.0, 2.3, "y = (2/3)x", color=GR, fontsize=10.5, bbox=BB); ax.text(5.0, -2.8, "y = −(2/3)x", color=GR, fontsize=10.5, bbox=BB)
ax.text(-6.9, 4.3, "hipérbola x²/9 − y²/4 = 1", fontsize=10.5, bbox=BB); ax.text(-6.9, -4.7, "circunferencia x² + y² = 4", color=RJ, fontsize=10.5, bbox=BB)
ax.set_title("Dominio: x²/9 − y²/4 ≤ 1 y x² + y² > 4")
leyenda_abajo(ax, [Patch(color=AZ, alpha=.4, label="dominio"), Line2D([], [], c="k", lw=2.4, label="hipérbola: borde incluido (raíz = 0)"),
                   Line2D([], [], c=RJ, ls="--", lw=1.9, label="circunferencia r = 2: borde excluido (ln 0)")], ncol=1)
guardar(fig, d, "ej1")

# Ej 3: f = ln(x/y), P(2; 1), ∇f = (1/2; −1), S a 135°
fig, ax, u, perp, th = gradiente_fig(d, "ej3", (2, 1), (.5, -1), 1.0, (-1, 5), (-2, 4), S=(1.5*np.cos(3*np.pi/4), 1.5*np.sin(3*np.pi/4)), Lnul=1.7)
ax.text(1.55, 1.15, "P", fontsize=12, ha="right"); ax.text(2.6, -.4, "∇z (máx.)", color=RJ, fontsize=11)
ax.text(1.0, 2.2, "mín. crecim.", color=AZ, fontsize=11, ha="right"); ax.text(3.25, 2.45, "nulo", color=VD, fontsize=11); ax.text(.5, -.1, "nulo", color=VD, fontsize=11)
ax.text(.55, 1.85, "S (135°)", color=PU, fontsize=11, ha="center")
ax.set_title("Gradiente en P(2; 1): ∇z = (1/2) i − j, θ ≈ −63,43°")
leyenda_abajo(ax, [Line2D([], [], c=RJ, lw=3, label="∇z (máx.), θ ≈ −63,43° (296,57°)"), Line2D([], [], c=AZ, lw=2.4, label="mínimo crecimiento (−∇z), ≈ 116,57°"),
                   Line2D([], [], c=VD, ls="--", lw=2.2, label="crecimiento nulo (⊥ ∇z): ≈ 26,57° y 206,57°"), Line2D([], [], c=PU, lw=2.6, label="dirección S (bisectriz 2.º cuadrante, 135°)")], ncol=1)
guardar(fig, d, "ej3")

# Ej 4: z = x⁴ + y⁴ − x² − y² − 1, 9 puntos críticos
f = lambda X, Y: X**4 + Y**4 - X**2 - Y**2 - 1
r = s2/2
pts = [(0, 0, "Máx")] + [(0, r, "Silla"), (0, -r, "Silla"), (r, 0, "Silla"), (-r, 0, "Silla")] + [(sx*r, sy*r, "Mín") for sx in (1, -1) for sy in (1, -1)]
fig, a, b = extremos_fig(d, "ej4", f, (-1.5, 1.5), (-1.5, 1.5), pts, "", zt=[-3, -2, -1, 0, 1])
tk = [-1.5, -r, 0, r, 1.5]; lab = ["−1,5", "−√2/2", "0", "√2/2", "1,5"]
b.set_xticks(tk); b.set_xticklabels(lab, fontsize=9); b.set_yticks(tk); b.set_yticklabels(lab, fontsize=9)
for (px, py, t) in pts: b.text(px + .06, py + .08, f"{'' if t!='Máx' else ''}", fontsize=9)
guardar(fig, d, "ej4")

# Ej 5: plano 2x + 3y + 6z = 49, punto (2; 3; 6)
fig = plt.figure(figsize=(7.8, 7.4), facecolor="white"); a = fig.add_subplot(111, projection="3d")
a.add_collection3d(Poly3DCollection([[(24.5, 0, 0), (0, 49/3, 0), (0, 0, 49/6)]], alpha=.3, facecolor=AZ, edgecolor="k"))
a.plot([0, 2], [0, 3], [0, 6], c=RJ, lw=3); a.scatter([2], [3], [6], c=RJ, s=70, depthshade=False); a.scatter(0, 0, 0, c="k", s=40)
a.text(3, 3.5, 6.8, "Q = (2; 3; 6),  d = 7", color=RJ); a.text(-1, -3, -.8, "O", fontsize=12)
a.set_xlim(0, 25); a.set_ylim(0, 17); a.set_zlim(0, 9); a.set_xticks(range(0, 26, 5)); a.set_yticks(range(0, 18, 4)); a.set_zticks(range(0, 10, 3))
a.set_xlabel("x"); a.set_ylabel("y"); a.set_zlabel("z"); a.view_init(22, 40); a.set_box_aspect((25, 17, 9))
a.set_title("Plano 2x + 3y + 6z = 49 (cortes 49/2, 49/3, 49/6) y el punto más cercano al origen"); guardar(fig, d, "ej5")
print("ok figuras 1h9-2023")
