# Recup. 1H10 Oct-23 (07/10/2023): dominio, gradiente, extremos. Uso: python3 figuras/src/p1-1h10-2023_figs.py
import sys; sys.path.insert(0, __import__("os").path.dirname(__file__))
from p1r2_common import *
d = salida("p1-1h10-2023-10-rec")
BB = dict(fc="white", ec="none", alpha=.85, pad=1.2)
PU = "#6a3d9a"; NA = "#fdae6b"

# Ej 1: z = ln|x²/4+y²−1|·log(xy)/√(1−x²−y²/4): xy>0, x²+y²/4<1, x²/4+y²≠1
xl = yl = (-3, 3); X, Y = malla(xl, yl, 1400)
E1 = X**2/4 + Y**2 - 1; E2 = X**2 + Y**2/4 - 1
base = (X*Y > 0) & (E2 < 0)
fig, ax = plt.subplots(figsize=(7.8, 7.6), facecolor="white"); ejes(ax, xl, yl)
region(ax, base & (E1 > 0), X, Y); region(ax, base & (E1 < 0), X, Y, color=NA, alpha=.55)
curva(ax, X, Y, E1, False, RJ, 1.9); curva(ax, X, Y, E2, False, "k", 2.0)
for (px, py) in [(2, 0), (0, 1), (1, 0), (0, 2)]: ax.plot([px], [py], "ko", ms=5, zorder=6)
k = 2/np.sqrt(5)
for sx in (1, -1): ax.plot([sx*k], [sx*k], "o", c=RJ, ms=5, zorder=6)
ax.text(k + .1, k + .12, "(2/√5; 2/√5)", fontsize=10, bbox=BB); ax.text(-k - .1, -k - .3, "(−2/√5; −2/√5)", fontsize=10, ha="right", bbox=BB)
ax.text(.1, 2.1, "(0; 2)", fontsize=10.5, bbox=BB); ax.text(1.05, -.4, "(1; 0)", fontsize=10.5, bbox=BB); ax.text(2.05, -.4, "(2; 0)", fontsize=10.5, bbox=BB); ax.text(.1, .8, "(0; 1)", fontsize=10.5, bbox=BB)
ax.text(1.0, 1.6, "x² + y²/4 = 1", fontsize=10.5, bbox=BB); ax.text(-2.95, .25, "x²/4 + y² = 1", color=RJ, fontsize=10.5, bbox=BB)
ax.set_title("Dominio: 1.º y 3.º cuadrante, dentro de x² + y²/4 = 1, sin la curva x²/4 + y² = 1")
leyenda_abajo(ax, [Patch(color=AZ, alpha=.4, label="dominio, fuera de la elipse x²/4 + y² = 1"), Patch(color=NA, alpha=.55, label="dominio, dentro de x²/4 + y² = 1 (por el módulo)"),
                   Line2D([], [], c=RJ, ls="--", lw=1.9, label="x²/4 + y² = 1: excluida (ln 0)"), Line2D([], [], c="k", ls="--", lw=2.0, label="x² + y²/4 = 1: excluida (denominador 0)")], ncol=1)
guardar(fig, d, "ej1")

# Ej 3: P(3; 4), ∇z = (8/3; −21/4), S a −45°
g = (8/3, -21/4)
fig, ax, u, perp, th = gradiente_fig(d, "ej3", (3, 4), g, .3, (-1, 8), (-1, 8), S=(1.8*np.cos(-np.pi/4), 1.8*np.sin(-np.pi/4)), Lnul=2.2)
ax.text(3.2, 4.3, "P(3; 4)", fontsize=11, bbox=BB)
ax.text(3.55, 2.1, "∇z (máx.)", color=RJ, fontsize=11); ax.text(1.0, 5.9, "mín. crecim.", color=AZ, fontsize=11, ha="right")
ax.text(5.35, 5.0, "nulo", color=VD, fontsize=11); ax.text(.45, 3.1, "nulo", color=VD, fontsize=11)
ax.text(4.6, 3.35, "S (−45°)", color=PU, fontsize=11)
ax.set_title("Gradiente en P(3; 4): ∇z = (8/3) i − (21/4) j (dibujado a escala 0,3)")
leyenda_abajo(ax, [Line2D([], [], c=RJ, lw=3, label="∇z (máx.), θ ≈ −63,07° (296,93°)"), Line2D([], [], c=AZ, lw=2.4, label="mínimo crecimiento (−∇z), ≈ 116,93°"),
                   Line2D([], [], c=VD, ls="--", lw=2.2, label="crecimiento nulo (⊥ ∇z): ≈ 26,93° y 206,93°"), Line2D([], [], c=PU, lw=2.6, label="dirección S (α = −45°)")], ncol=1)
guardar(fig, d, "ej3")

# Ej 4: z = x³ + 3xy² − 15x − 12y + 1
f = lambda X, Y: X**3 + 3*X*Y**2 - 15*X - 12*Y + 1
pts = [(2, 1, "Mín"), (-2, -1, "Máx"), (1, 2, "Silla"), (-1, -2, "Silla")]
fig, a, b = extremos_fig(d, "ej4", f, (-3, 3), (-3, 3), pts, "", zt=range(-60, 61, 30))
for (px, py, t) in pts: b.text(px + .15, py + .2, f"({px}; {py})", fontsize=11)
guardar(fig, d, "ej4")
print("ok figuras 1h10-2023")
