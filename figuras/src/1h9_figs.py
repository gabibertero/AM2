# 1H9 (jun-2026, temas A y B): ej1 A (cono), ej1 B (paraboloide), ej2 (región entre parábolas, común a A y B).
# Uso: python3 figuras/src/1h9_figs.py  -> public/figuras/1h9/{ej1a,ej1b,ej2}.svg
import numpy as np, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Patch
from pathlib import Path
OUT = Path(__file__).resolve().parents[2] / "public/figuras/1h9"
OUT.mkdir(parents=True, exist_ok=True)
plt.rcParams.update({"font.size": 12, "svg.fonttype": "none"})

def solido(nombre, f, rmax, zmax, titulo3d, lab_sup, lab_surf, xt, zt, extra_ticks=None):
    fig = plt.figure(figsize=(7.8, 10.5), facecolor="white")
    a = fig.add_subplot(2, 1, 1, projection="3d")
    rr, tt = np.meshgrid(np.linspace(0, rmax, 26), np.linspace(0, 2*np.pi, 60))
    X, Y = rr*np.cos(tt), rr*np.sin(tt)
    a.plot_surface(X, Y, f(rr), color="#3182bd", alpha=.6, linewidth=0)
    a.plot_surface(X, Y, np.full_like(rr, zmax), color="#e34a33", alpha=.5, linewidth=0)
    c = np.linspace(0, 2*np.pi, 120)
    a.plot(rmax*np.cos(c), rmax*np.sin(c), zmax, "k", lw=2)
    a.set_xlabel("x"); a.set_ylabel("y"); a.set_zlabel("z"); a.view_init(20, -60)
    k = list(range(-int(rmax), int(rmax) + 1)); a.set_xticks(k); a.set_yticks(k); a.set_zticks(range(0, int(zmax) + 1))
    a.set_title(titulo3d)
    a.legend(handles=[Patch(color="#3182bd", alpha=.6, label=lab_surf),
                      Patch(color="#e34a33", alpha=.5, label=lab_sup)],
             loc="upper center", bbox_to_anchor=(.5, -.02), fontsize=11, frameon=False)
    b = fig.add_subplot(2, 1, 2)
    r = np.linspace(-rmax, rmax, 400)
    b.fill_between(r, f(np.abs(r)), zmax, color="#9ecae1", alpha=.8)
    b.plot(r, f(np.abs(r)), "C0", lw=2.5); b.plot([-rmax, rmax], [zmax, zmax], "C3", lw=2.5)
    b.text(0, (zmax + f(0))/2 + zmax*.25, "R", fontsize=16, ha="center", va="center")
    b.set_aspect("equal"); b.set_xticks(xt); b.set_yticks(zt)
    if extra_ticks:
        b.set_xticks(sorted(set(xt) | set(extra_ticks[0]))); b.set_xticklabels(
            [extra_ticks[1].get(v, f"{v:g}") for v in sorted(set(xt) | set(extra_ticks[0]))])
    b.set_xlim(-rmax - .6, rmax + .6); b.set_ylim(min(zt) - .3, max(zt) + .5)
    b.set_xlabel("r  (se dibuja ±r: es un corte por el eje z)"); b.set_ylabel("z")
    b.set_title("Corte meridiano (plano xz)"); b.grid(alpha=.3)
    return fig, b

# --- Ej 1 A: cono z = r, 0 <= z <= 4 ---
fig, b = solido("ej1a", lambda r: r, 4, 4, "Región R: dentro del cono z² = x² + y², hasta z = 4",
                "tapa: z = 4", "cono: z = r", list(range(-4, 5)), list(range(0, 5)))
b.text(-2.9, 1.0, "z = r", color="C0", fontsize=12, ha="center")
b.text(0, 4.15, "tapa z = 4 (r hasta 4)", color="C3", fontsize=12, ha="center")
fig.tight_layout(); fig.savefig(OUT/"ej1a.svg", format="svg", metadata={"Date": None})

# --- Ej 1 B: paraboloide z = r², 0 <= z <= 3 ---
s3 = np.sqrt(3)
fig, b = solido("ej1b", lambda r: r**2, s3, 3, "Región R: dentro del paraboloide z = x² + y², hasta z = 3",
                "tapa: z = 3", "paraboloide: z = r²", [-1, 0, 1], list(range(0, 4)),
                ([-s3, s3], {-s3: "−√3", s3: "√3"}))
b.text(1.45, 0.6, "z = r²", color="C0", fontsize=12)
b.text(0, 3.15, "tapa z = 3 (r hasta √3)", color="C3", fontsize=12, ha="center")
fig.tight_layout(); fig.savefig(OUT/"ej1b.svg", format="svg", metadata={"Date": None})

# --- Ej 2: región entre y = x² − x (C1) y x = y² − y (C2), recorrido antihorario ---
fig, a = plt.subplots(figsize=(7.8, 7.8), facecolor="white")
t = np.linspace(0, 2, 300)
y2 = np.linspace(0, 2, 300)
yy = np.linspace(-.25, 2, 600)        # D incluye el "gajo" bajo el eje x (y entre −1/4 y 0)
sq = np.sqrt(np.maximum(1 + 4*yy, 0))
# D: franjas horizontales, entre x = y² − y (C2) y x = (1+√(1+4y))/2 (C1 invertida)
a.fill_betweenx(yy, np.where(yy < 0, (1 - sq)/2, yy**2 - yy), (1 + sq)/2, color="#fdd0a2", alpha=.8)
a.plot(t, t**2 - t, "C0", lw=2.5); a.plot(y2**2 - y2, y2, "C3", lw=2.5)
def flecha(p, q, col):
    a.annotate("", xy=q, xytext=p, arrowprops=dict(arrowstyle="-|>", color=col, lw=2.5, mutation_scale=22))
flecha((1.45, 1.45**2 - 1.45), (1.55, 1.55**2 - 1.55), "C0")        # C1: de (0,0) a (2,2)
flecha((0.0 - .001 + (1.55**2 - 1.55), 1.55), (1.45**2 - 1.45, 1.45), "C3")   # C2: de (2,2) a (0,0)
for (px, py, lab, dx, dy) in [(0, 0, "(0, 0)", -.55, -.35), (2, 2, "(2, 2)", .1, .15),
                              (1, 0, "(1, 0)", .1, -.35), (0, 1, "(0, 1)", -.7, .1)]:
    a.plot(px, py, "ko"); a.text(px + dx, py + dy, lab, fontsize=12)
a.text(1.65, .35, "C₁: y = x² − x", color="C0", fontsize=12)
a.text(-.95, 2.1, "C₂: x = y² − y", color="C3", fontsize=12)
a.text(.85, .8, "D", fontsize=18, ha="center")
a.text(2.05, 2.5, "sentido +\n(antihorario)", fontsize=12)
a.set_aspect("equal"); a.set_xlim(-1.5, 3.5); a.set_ylim(-1, 3.5)
a.set_xticks(range(-1, 4)); a.set_yticks(range(-1, 4)); a.grid(alpha=.3)
a.axhline(0, color="k", lw=.8); a.axvline(0, color="k", lw=.8)
a.set_xlabel("x"); a.set_ylabel("y"); a.set_title("Curva cerrada C = C₁ ∪ C₂ y región D")
fig.tight_layout(); fig.savefig(OUT/"ej2.svg", format="svg", metadata={"Date": None})
