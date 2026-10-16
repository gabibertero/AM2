# 1º parcial 1H9 2025: G1, G2 y recuperatorio. Uso: python3 figuras/src/p1-1h9-2025_figuras.py
# Salida: public/figuras/p1-1h9-2025-05-g1/ej{1,2,3}.svg, ...-05-g2/..., ...-07-rec/...
import numpy as np, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Patch
from matplotlib.lines import Line2D
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2] / "public/figuras"
plt.rcParams.update({"font.size": 12, "svg.fonttype": "none"})
SH = "#9ecae1"
BB = dict(fc="white", ec="none", alpha=.85, pad=1.5)


def out(idx, n, fig):
    d = ROOT / idx
    d.mkdir(parents=True, exist_ok=True)
    fig.tight_layout()
    fig.savefig(d / f"{n}.svg", format="svg", metadata={"Date": None}, bbox_inches="tight", facecolor="white")
    import os
    if os.environ.get("PREVIEW"): fig.savefig(f"{os.environ['PREVIEW']}/{idx}_{n}.png", dpi=80, bbox_inches="tight", facecolor="white")
    plt.close(fig)


def ejes(a, xl, yl, tx=1, ty=1, xlab="x", ylab="y"):
    a.set_xlim(*xl); a.set_ylim(*yl)
    a.set_xticks(np.arange(np.ceil(xl[0]), xl[1] + .01, tx)); a.set_yticks(np.arange(np.ceil(yl[0]), yl[1] + .01, ty))
    a.set_aspect("equal"); a.grid(alpha=.3); a.axhline(0, c="k", lw=.8); a.axvline(0, c="k", lw=.8)
    a.set_xlabel(xlab); a.set_ylabel(ylab)


def region(a, f, xl, yl, n=900):
    X, Y = np.meshgrid(np.linspace(*xl, n), np.linspace(*yl, n))
    with np.errstate(all="ignore"):
        M = f(X, Y)
    a.contourf(X, Y, M.astype(float), levels=[.5, 1.5], colors=[SH], alpha=.85)


def leyenda(a, hs, ncol=2):
    a.legend(handles=hs, loc="upper center", bbox_to_anchor=(.5, -.12), fontsize=12, frameon=False, ncol=ncol)


def flecha(a, p, v, color, lw=2.2, ls="-", z=5):
    a.annotate("", xy=(p[0] + v[0], p[1] + v[1]), xytext=p,
               arrowprops=dict(arrowstyle="-|>", color=color, lw=lw, ls=ls, mutation_scale=22, shrinkA=0, shrinkB=0), zorder=z)


def direcciones(a, P, g, largo, solo_texto=None, extra=None):
    """Gradiente (true size), máx, mín y nulos con la notación de cátedra."""
    g = np.array(g, float); u = g / np.hypot(*g); n = np.array([-u[1], u[0]])
    flecha(a, P, g, "C3", lw=3)
    flecha(a, P, largo * u, "C3", lw=1.4, ls=(0, (4, 2)))
    flecha(a, P, -largo * u, "C0", lw=2)
    flecha(a, P, largo * n, "C2", lw=2); flecha(a, P, -largo * n, "C2", lw=2)
    a.plot(*P, "ko", ms=7, zorder=6)
    return u, n


# ---------------------------------------------------------------- G1
ID = "p1-1h9-2025-05-g1"
# Ej 1: ln(1-x²/4-y²)+√(x²-y²-1) sobre √(2xy)
fig, a = plt.subplots(figsize=(7.8, 6.6), facecolor="white")
region(a, lambda x, y: (x**2/4 + y**2 < 1) & (x**2 - y**2 >= 1) & (x*y > 0), (-3, 3), (-2, 2))
t = np.linspace(0, 2*np.pi, 400); a.plot(2*np.cos(t), np.sin(t), "C0", ls="--", lw=2)
yy = np.linspace(-2, 2, 400)
a.plot(np.sqrt(1 + yy**2), yy, "C3", lw=2.4); a.plot(-np.sqrt(1 + yy**2), yy, "C3", lw=2.4)
a.plot([-3, 3], [0, 0], "k--", lw=1.2, zorder=3); a.plot([0, 0], [-2, 2], "k--", lw=1.2, zorder=3)
for s in (1, -1):
    a.plot([s*np.sqrt(8/5)], [s*np.sqrt(3/5)], "ko", ms=6, zorder=6)
a.text(1.4, 1.05, "(√(8/5); √(3/5))", fontsize=11, bbox=BB); a.text(-2.9, -1.2, "(−√(8/5); −√(3/5))", fontsize=11, bbox=BB)
a.text(1.55, .28, "D", fontsize=16); a.text(-1.9, -.4, "D", fontsize=16)
ejes(a, (-3, 3), (-2, 2))
leyenda(a, [Patch(color=SH, label="dominio D"),
            Line2D([], [], color="C3", lw=2.4, label="x² − y² = 1 (incluida, ≥)"),
            Line2D([], [], color="C0", ls="--", lw=2, label="x²/4 + y² = 1 (excluida, <)"),
            Line2D([], [], color="k", ls="--", label="ejes x·y = 0 (excluidos, >)")])
out(ID, "ej1", fig)

# Ej 2: z = sen³(x−y), P(π; π/4); curvas de nivel x−y = c
P = (np.pi, np.pi/4); g = (-3*np.sqrt(2)/4, 3*np.sqrt(2)/4)
fig, a = plt.subplots(figsize=(7.8, 7.6), facecolor="white")
X, Y = np.meshgrid(np.linspace(-1, 6, 500), np.linspace(-1.5, 3.5, 500)); Z = np.sin(X - Y)**3
cs = a.contour(X, Y, Z, levels=[-.9, -.5, -.1, .1, .5, .9], colors="0.55", linewidths=1)
a.contour(X, Y, X - Y, levels=[3*np.pi/4], colors="C2", linewidths=2.6)   # curva de nivel por P (z = (√2/2)³)
direcciones(a, P, g, 1.5)
a.text(1.75, .55, "P(π; π/4)", fontsize=12, bbox=BB)
a.text(1.35, 2.05, "∇z", color="C3", fontsize=14, fontweight="bold")
a.text(1.35, 2.75, "θ_máx = 135°", color="C3", fontsize=11, bbox=BB); a.text(4.0, -.55, "θ_mín = 315°", color="C0", fontsize=11, bbox=BB)
a.text(4.55, 1.25, "θ_nulo = 45°", color="C2", fontsize=11, bbox=BB); a.text(1.1, .05, "θ_nulo = 225°", color="C2", fontsize=11, bbox=BB)
ejes(a, (-1, 6), (-1, 3))
a.set_ylim(-1.5, 3.5)
leyenda(a, [Line2D([], [], color="C3", lw=3, label="∇z(P) (a escala)"),
            Line2D([], [], color="C3", lw=1.4, ls="--", label="dirección de máx. crecimiento (= s, α=135°)"),
            Line2D([], [], color="C0", lw=2, label="dirección de mín. crecimiento"),
            Line2D([], [], color="C2", lw=2, label="direcciones nulas (tangentes a la curva de nivel)")], ncol=1)
out(ID, "ej2", fig)

# Ej 3: z = x² + y²/2 + x²y ; PC (0,0) mín; (1,−1) y (−1,−1) sillas
f3 = lambda x, y: x**2 + y**2/2 + x**2*y
fig = plt.figure(figsize=(7.8, 11.5), facecolor="white")
DZ = .25
a = fig.add_subplot(2, 1, 1, projection="3d")
Xs, Ys = np.meshgrid(np.linspace(-2, 2, 70), np.linspace(-2.5, 1.5, 70)); Zs = f3(Xs, Ys)
a.plot_surface(Xs, Ys, np.clip(Zs, -1, 5), cmap="Blues", alpha=.75, linewidth=0)
pts = [((0, 0), "mín (0; 0)", "C3"), ((1, -1), "silla (1; −1)", "C1"), ((-1, -1), "silla (−1; −1)", "C1")]
for (px, py), _, c in pts:
    a.scatter([px], [py], [f3(px, py) + DZ], color=c, s=100, depthshade=False, edgecolor="k")
a.set_zlim(-1, 5); a.set_xticks([-2, -1, 0, 1, 2]); a.set_yticks([-2, -1, 0, 1]); a.set_zticks(range(-1, 6))
a.set_xlabel("x"); a.set_ylabel("y"); a.set_zlabel("z"); a.view_init(25, -55); a.set_title("z = x² + y²/2 + x²y (recortada en z ≤ 5)")
b = fig.add_subplot(2, 1, 2); Xc, Yc = np.meshgrid(np.linspace(-2, 2, 400), np.linspace(-2.5, 1.5, 400))
cs = b.contour(Xc, Yc, f3(Xc, Yc), levels=[-.5, -.25, .25, .5, 1, 2, 4], colors="0.55", linewidths=1); b.clabel(cs, fmt="%.2g", fontsize=10)
for (px, py), lab, c in pts:
    b.plot(px, py, "o", color=c, ms=9, zorder=6)
b.text(.12, .12, "mín (0; 0)", color="C3"); b.text(1.0, -1.3, "silla (1; −1)", color="C1", ha="center"); b.text(-1.0, -1.3, "silla (−1; −1)", color="C1", ha="center")
ejes(b, (-2, 2), (-2, 1)); b.set_ylim(-2.5, 1.5); b.set_yticks(range(-2, 2))
b.set_title("Curvas de nivel y puntos críticos")
out(ID, "ej3", fig)

# ---------------------------------------------------------------- G2
ID = "p1-1h9-2025-05-g2"
# Ej 1: [log(x²−y²−1) − √(1−x²/9−y²/4)] / arcsen(y)
fig, a = plt.subplots(figsize=(7.8, 6.6), facecolor="white")
region(a, lambda x, y: (x**2 - y**2 > 1) & (x**2/9 + y**2/4 <= 1) & (np.abs(y) <= 1) & (np.abs(y) > 1e-9), (-4, 4), (-3, 3), 1200)
t = np.linspace(0, 2*np.pi, 400); a.plot(3*np.cos(t), 2*np.sin(t), "C0", lw=2.4)
yy = np.linspace(-3, 3, 400)
a.plot(np.sqrt(1 + yy**2), yy, "C3", ls="--", lw=2); a.plot(-np.sqrt(1 + yy**2), yy, "C3", ls="--", lw=2)
a.plot([-4, 4], [1, 1], "C2", lw=2.2); a.plot([-4, 4], [-1, -1], "C2", lw=2.2); a.plot([-4, 4], [0, 0], "k--", lw=1.4, zorder=3)
a.text(1.8, .45, "D", fontsize=16); a.text(-2.2, .45, "D", fontsize=16); a.text(1.8, -.7, "D", fontsize=16); a.text(-2.2, -.7, "D", fontsize=16)
ejes(a, (-4, 4), (-3, 3))
leyenda(a, [Patch(color=SH, label="dominio D (4 trozos)"),
            Line2D([], [], color="C0", lw=2.4, label="x²/9 + y²/4 = 1 (incluida, ≤)"),
            Line2D([], [], color="C3", ls="--", lw=2, label="x² − y² = 1 (excluida, >)"),
            Line2D([], [], color="C2", lw=2.2, label="y = ±1 (incluidas)"),
            Line2D([], [], color="k", ls="--", label="y = 0 (excluida, arcsen y ≠ 0)")], ncol=2)
out(ID, "ej1", fig)

# Ej 2: z = Ln((x²+2)/y²), P(1;−2), s = PQ, Q(4;−6)
P = (1, -2); g = (2/3, 1); s = np.array([3, -4]) / 5
fig, a = plt.subplots(figsize=(7.8, 8.6), facecolor="white")
X, Y = np.meshgrid(np.linspace(-2, 5, 600), np.linspace(-7, 1, 600))
with np.errstate(all="ignore"):
    Z = np.log((X**2 + 2) / Y**2)
cs = a.contour(X, Y, Z, levels=[-1.5, -1, -.5, 0, .5, 1], colors="0.55", linewidths=1); a.contour(X, Y, Z, levels=[np.log(3/4)], colors="C2", linewidths=2.6)
u, n = direcciones(a, P, g, 1.8)
flecha(a, P, 2.2*s, "C4", lw=2.4)
a.plot([4], [-6], "ks", ms=7); a.text(4.1, -6.5, "Q(4; −6)", fontsize=12, bbox=BB)
a.annotate("P(1; −2)", xy=P, xytext=(-1.8, -1.75), fontsize=12, arrowprops=dict(arrowstyle="-", color="k", lw=.8), bbox=BB)
a.text(1.9, -.15, "∇z", color="C3", fontsize=14, fontweight="bold"); a.text(-1.9, 0.45, "θ_máx ≈ 56,3°", color="C3", fontsize=11, bbox=BB)
a.text(-1.9, -4.2, "θ_mín ≈ 236,3°", color="C0", fontsize=11, bbox=BB)
a.text(-1.9, -.5, "θ_nulo ≈ 146,3°", color="C2", fontsize=11, bbox=BB); a.text(2.5, -4.1, "θ_nulo ≈ 326,3°", color="C2", fontsize=11, bbox=BB)
a.text(2.6, -4.9, "s = PQ", color="C4", fontsize=12, bbox=BB)
ejes(a, (-2, 5), (-7, 1))
leyenda(a, [Line2D([], [], color="C3", lw=3, label="∇z(P) (a escala)"),
            Line2D([], [], color="C3", lw=1.4, ls="--", label="dirección de máx. crecimiento"),
            Line2D([], [], color="C0", lw=2, label="dirección de mín. crecimiento"),
            Line2D([], [], color="C2", lw=2, label="nulas (tangentes a la curva de nivel z = Ln(3/4))"),
            Line2D([], [], color="C4", lw=2.4, label="dirección s del segmento PQ")], ncol=1)
out(ID, "ej2", fig)

# Ej 3: z = 2/3 x³ − 18x − 4/3 y³ + 16y
f3 = lambda x, y: 2/3*x**3 - 18*x - 4/3*y**3 + 16*y
fig = plt.figure(figsize=(7.8, 11.5), facecolor="white")
DZ = 6
a = fig.add_subplot(2, 1, 1, projection="3d")
Xs, Ys = np.meshgrid(np.linspace(-4.5, 4.5, 70), np.linspace(-3.5, 3.5, 70))
a.plot_surface(Xs, Ys, f3(Xs, Ys), cmap="Blues", alpha=.7, linewidth=0)
pts = [((3, 2), "silla", "C1"), ((-3, -2), "silla", "C1"), ((3, -2), "mín", "C3"), ((-3, 2), "máx", "C2")]
for (px, py), _, c in pts:
    a.scatter([px], [py], [f3(px, py) + DZ], color=c, s=100, depthshade=False, edgecolor="k")
a.set_xticks(range(-4, 5, 2)); a.set_yticks(range(-3, 4)); a.set_xlabel("x"); a.set_ylabel("y"); a.set_zlabel("z"); a.view_init(25, -55)
a.set_title("z = 2/3·x³ − 18x − 4/3·y³ + 16y")
b = fig.add_subplot(2, 1, 2); Xc, Yc = np.meshgrid(np.linspace(-4.5, 4.5, 500), np.linspace(-3.5, 3.5, 500))
cs = b.contour(Xc, Yc, f3(Xc, Yc), levels=np.arange(-80, 81, 20), colors="0.6", linewidths=1); b.clabel(cs, fmt="%d", fontsize=9)
for (px, py), lab, c in pts:
    b.plot(px, py, "o", color=c, ms=9, zorder=6)
    b.text(px + .2, py + .25, f"{lab} ({px}; {py})", color=c, fontsize=11)
ejes(b, (-4, 4), (-3, 3)); b.set_title("Curvas de nivel y puntos críticos")
out(ID, "ej3", fig)

# ---------------------------------------------------------------- Recuperatorio
ID = "p1-1h9-2025-07-rec"
# Ej 1: arccos(y/x³) / (36−4x²−9y²)^(1/4)
fig, a = plt.subplots(figsize=(7.8, 6.6), facecolor="white")
region(a, lambda x, y: (np.abs(y) <= np.abs(x)**3) & (x**2/9 + y**2/4 < 1) & (np.abs(x) > 1e-9), (-3.5, 3.5), (-2.5, 2.5), 1200)
t = np.linspace(0, 2*np.pi, 400); a.plot(3*np.cos(t), 2*np.sin(t), "C0", ls="--", lw=2)
xx = np.linspace(-1.4, 1.4, 400); a.plot(xx, xx**3, "C3", lw=2.4); a.plot(xx, -xx**3, "C2", lw=2.4)
a.plot([0, 0], [-2.5, 2.5], "k--", lw=1.4, zorder=3)
a.plot([0], [0], "o", mfc="white", mec="k", ms=8, zorder=7)
a.plot([1.2224, 1.2224, -1.2224, -1.2224], [1.8265, -1.8265, 1.8265, -1.8265], "ko", ms=5, zorder=6)
a.text(1.35, 2.0, "(1,22; 1,83)", fontsize=11, bbox=BB); a.text(1.35, -2.25, "(1,22; −1,83)", fontsize=11, bbox=BB)
a.text(1.8, .3, "D", fontsize=16); a.text(-2.2, .3, "D", fontsize=16)
ejes(a, (-3.5, 3.5), (-2.5, 2.5))
leyenda(a, [Patch(color=SH, label="dominio D (|y| ≤ |x|³, dentro de la elipse)"),
            Line2D([], [], color="C3", lw=2.4, label="y = x³ (incluida)"),
            Line2D([], [], color="C2", lw=2.4, label="y = −x³ (incluida)"),
            Line2D([], [], color="C0", ls="--", lw=2, label="x²/9 + y²/4 = 1 (excluida, <)"),
            Line2D([], [], color="k", ls="--", label="x = 0 (excluido); el origen también")], ncol=1)
out(ID, "ej1", fig)

# Ej 2: z = (y²−x³)/(xy), P(1;−1): curva de nivel z=0 → y² = x³
P = (1, -1); g = (3, 2); sd = np.array([1, -1]) / np.sqrt(2)
fig, a = plt.subplots(figsize=(7.8, 8.0), facecolor="white")
X, Y = np.meshgrid(np.linspace(-2, 5, 700), np.linspace(-4, 3, 700))
with np.errstate(all="ignore"):
    Z = (Y**2 - X**3) / (X*Y)
Z[np.abs(Z) > 50] = np.nan
cs = a.contour(X, Y, Z, levels=[-4, -2, 2, 4, 6], colors="0.6", linewidths=1); xx = np.linspace(0, 5, 300); a.plot(xx, -xx**1.5, "C2", lw=2.6); a.plot(xx, xx**1.5, "C2", lw=2.6)   # y² = x³ (z = 0)
u, n = direcciones(a, P, g, 2.2)
flecha(a, P, 2.2*sd, "C4", lw=2.4)
a.annotate("P(1; −1)", xy=P, xytext=(-1.8, -1.0), fontsize=12, arrowprops=dict(arrowstyle="-", color="k", lw=.8), bbox=BB)
a.text(3.6, 1.2, "∇z", color="C3", fontsize=14, fontweight="bold"); a.text(1.5, 1.45, "θ_máx ≈ 33,7°", color="C3", fontsize=11, bbox=BB)
a.text(-1.9, -2.9, "θ_mín ≈ 213,7°", color="C0", fontsize=11, bbox=BB)
a.text(-1.9, 0.3, "θ_nulo ≈ 123,7°", color="C2", fontsize=11, bbox=BB); a.text(3.2, -3.4, "θ_nulo ≈ 303,7°", color="C2", fontsize=11, bbox=BB)
a.text(2.9, -2.2, "s (α = −45°)", color="C4", fontsize=12, bbox=BB)
ejes(a, (-2, 5), (-4, 3))
leyenda(a, [Line2D([], [], color="C3", lw=3, label="∇z(P) = 3i + 2j (a escala)"),
            Line2D([], [], color="C3", lw=1.4, ls="--", label="dirección de máx. crecimiento"),
            Line2D([], [], color="C0", lw=2, label="dirección de mín. crecimiento"),
            Line2D([], [], color="C2", lw=2, label="nulas (tangentes a la curva de nivel z = 0: y² = x³)"),
            Line2D([], [], color="C4", lw=2.4, label="dirección s de la tangente a la parábola")], ncol=1)
out(ID, "ej2", fig)

# Ej 3: z = x³ + y³ + 48/y + 3/x ; PC (1;2) mín, (−1;−2) máx, (1;−2) y (−1;2) sillas
f3 = lambda x, y: x**3 + y**3 + 48/y + 3/x
fig, a = plt.subplots(figsize=(7.8, 7.4), facecolor="white")
X, Y = np.meshgrid(np.linspace(-3, 3, 900), np.linspace(-4, 4, 900))
with np.errstate(all="ignore"):
    Z = f3(X, Y)
Z[np.abs(Z) > 120] = np.nan
for lv, c in [(28, "#e6550d"), (40, "#fd8d3c"), (60, "#fdae6b"), (-28, "#3182bd"), (-40, "#6baed6"), (-60, "#9ecae1")]:
    a.contour(X, Y, Z, levels=[lv], colors=c, linewidths=1.6)
pts = [((1, 2), "mín", "C3"), ((-1, -2), "máx", "C2"), ((1, -2), "silla", "C1"), ((-1, 2), "silla", "C1")]
for (px, py), lab, c in pts:
    a.plot(px, py, "o", color=c, ms=9, zorder=6)
    a.text(px + .12, py + (.3 if py > 0 else -.55), f"{lab} ({px}; {py})", color=c, fontsize=11, bbox=BB)
ejes(a, (-3, 3), (-4, 4)); a.axhline(0, c="k", ls="--", lw=1.2); a.axvline(0, c="k", ls="--", lw=1.2)
a.set_title("Curvas de nivel z = 28, 40, 60 (naranja) y z = −28, −40, −60 (azul)")
leyenda(a, [Line2D([], [], color="k", ls="--", label="ejes x = 0 e y = 0 (z no definida)")], ncol=1)
out(ID, "ej3", fig)
print("ok")
