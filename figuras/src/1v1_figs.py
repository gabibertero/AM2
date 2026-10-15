# Figuras del 1V1 (temas A y B): ej1, ej2 (perspectiva + corte/base) y ej3 (región + sentido).
# Uso: python3 figuras/src/1v1_figs.py   -> public/figuras/1v1-{a,b}/ej{1,2,3}.svg
import numpy as np, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Patch
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2] / "public/figuras"
plt.rcParams.update({"font.size": 12, "svg.fonttype": "none"})
W = 7.8

import os
def save(fig, tema, n):
    if len(fig.axes) < 2: fig.tight_layout()
    fig.savefig(ROOT / f"1v1-{tema}/ej{n}.svg", format="svg", metadata={"Date": None})
    if os.environ.get("PREVIEW"): fig.savefig(f"{os.environ['PREVIEW']}/{tema}{n}.png", dpi=70)   # solo para mirar
    plt.close(fig)

def s3(ax, X, Y, Z, c, al=.55):
    ax.plot_surface(X, Y, Z, color=c, alpha=al, linewidth=0, shade=False)

def ax3(fig, pos, lim, ticks):
    a = fig.add_subplot(pos, projection="3d")
    a.set_xlim(0, lim[0]); a.set_ylim(0, lim[1]); a.set_zlim(0, lim[2])
    a.set_box_aspect((1, 1, .9))                      # cubo de proporciones fijas (la escala real está en el corte 2D)
    a.set_xticks(ticks[0]); a.set_yticks(ticks[1]); a.set_zticks(ticks[2])
    a.set_xlabel("x"); a.set_ylabel("y"); a.set_zlabel("z"); a.view_init(24, -55)
    return a

# ---------- Ej 1 ----------
def ej1(tema, R, lo, hi, nlo, nhi, cut):
    fig = plt.figure(figsize=(W, 11.5), facecolor="white"); gs = fig.add_gridspec(2, 1, height_ratios=[1.3, 1], hspace=.5); fig.subplots_adjust(top=.96, bottom=.1)
    zmax = 4 if tema == "a" else 6
    a = ax3(fig, gs[0], (R, R, zmax), (range(0, R + 1), range(0, R + 1), range(0, zmax + 1)))
    rr, tt = np.meshgrid(np.linspace(0, R, 20), np.linspace(0, np.pi/2, 40))
    X, Y = rr*np.cos(tt), rr*np.sin(tt)
    s3(a, X, Y, hi(X, Y), "#e34a33"); s3(a, X, Y, lo(X, Y), "#3182bd")
    t = np.linspace(0, 1, 2)[None, :]; th = np.linspace(0, np.pi/2, 40)[:, None]
    Xc, Yc = R*np.cos(th)*np.ones_like(t), R*np.sin(th)*np.ones_like(t)
    s3(a, Xc, Yc, lo(Xc, Yc) + t*(hi(Xc, Yc) - lo(Xc, Yc)), "#bdbdbd", .4)
    u = np.linspace(0, R, 20)[:, None]
    for (xf, yf) in ((u, 0*u), (0*u, u)):      # caras y=0 y x=0
        s3(a, xf*np.ones_like(t), yf*np.ones_like(t), lo(xf, yf) + t*(hi(xf, yf) - lo(xf, yf)), "#fdae6b", .35)
    a.set_title("Sólido en el 1º octante (perspectiva)")
    a.legend(handles=[Patch(color="#e34a33", alpha=.6, label=f"techo: z = {nhi}"), Patch(color="#3182bd", alpha=.6, label=f"piso: z = {nlo}"),
                      Patch(color="#bdbdbd", alpha=.6, label=f"pared: cilindro x² + y² = {R*R}"), Patch(color="#fdae6b", alpha=.6, label="caras sobre los planos coordenados")],
             loc="upper center", bbox_to_anchor=(.5, -.06), ncol=2, fontsize=12, frameon=False)
    b = fig.add_subplot(gs[1]); v = np.linspace(0, R, 200)
    zl, zh = lo(*cut(v)), hi(*cut(v))
    b.fill_between(v, zl, zh, color="#9ecae1", alpha=.8); b.plot(v, zh, "C3", lw=2.5, label=f"techo: z = {nhi}"); b.plot(v, zl, "C0", lw=2.5, label=f"piso: z = {nlo}")
    var = "x" if tema == "a" else "y"
    b.set_xlabel(var); b.set_ylabel("z"); b.set_title(f"Corte con el plano {'y = 0' if tema == 'a' else 'x = 0'}  (región entre las dos rectas)")
    b.set_xticks(range(0, R + 1)); b.set_yticks(range(0, zmax + 1)); b.set_aspect("equal"); b.grid(alpha=.3)
    b.set_xlim(-.3, R + .3); b.set_ylim(-.3, zmax + .4)
    b.legend(loc="upper center", bbox_to_anchor=(.5, -.2), ncol=2, fontsize=12, frameon=False)
    save(fig, tema, 1)

ej1("a", 2, lambda x, y: x + 0*y, lambda x, y: 4 - x + 0*y, "x", "4 − x", lambda v: (v, 0*v))
ej1("b", 3, lambda x, y: y + 0*x, lambda x, y: 6 - y + 0*x, "y", "6 − y", lambda v: (0*v, v))

# ---------- Ej 2 ----------
def ej2(tema, h):
    fig = plt.figure(figsize=(W, 12.5), facecolor="white"); gs = fig.add_gridspec(2, 2, height_ratios=[1.2, 1], hspace=.55, wspace=.35, left=.1, right=.97, top=.97, bottom=.2)
    a = ax3(fig, gs[0, :], (1, 1, h), ([0, .5, 1], [0, .5, 1], range(0, h + 1)))
    rr, tt = np.meshgrid(np.linspace(0, 1, 24), np.linspace(0, np.pi/4, 30))
    X, Y = rr*np.cos(tt), rr*np.sin(tt)
    s3(a, X, Y, h*np.sqrt(1 - rr**2), "#3182bd", .6); s3(a, X, Y, 0*X, "#bdbdbd", .4)
    uu, tz = np.meshgrid(np.linspace(0, 1, 24), np.linspace(0, 1, 2))
    for ang, c in ((0, "#fdae6b"), (np.pi/4, "#e34a33")):
        s3(a, uu*np.cos(ang), uu*np.sin(ang), tz*h*np.sqrt(1 - uu**2), c, .4)
    a.set_title("Región en el 1º octante (perspectiva)")
    a.legend(handles=[Patch(color="#3182bd", alpha=.6, label=f"techo: elipsoide z = {h}√(1 − r²)"),
                      Patch(color="#bdbdbd", alpha=.6, label="base: z = 0 (sector)"), Patch(color="#fdae6b", alpha=.6, label="cara y = 0"),
                      Patch(color="#e34a33", alpha=.6, label="cara y = x")], loc="upper center", bbox_to_anchor=(.5, -.06), ncol=2, fontsize=12, frameon=False)
    b = fig.add_subplot(gs[1, 0]); th = np.linspace(0, np.pi/4, 100)
    b.fill(np.r_[0, np.cos(th)], np.r_[0, np.sin(th)], color="#9ecae1", alpha=.8)
    b.plot(np.cos(th), np.sin(th), "C0", lw=2.5, label="r = 1"); b.plot([0, 1/np.sqrt(2)], [0, 1/np.sqrt(2)], "C3", lw=2.5, label="y = x  (θ = π/4)"); b.plot([0, 1], [0, 0], "C2", lw=2.5, label="y = 0  (θ = 0)")
    b.set_xticks([0, .5, 1]); b.set_yticks([0, .5, 1]); b.set_xlim(-.1, 1.15); b.set_ylim(-.1, 1.0); b.set_aspect("equal"); b.grid(alpha=.3)
    b.set_xlabel("x"); b.set_ylabel("y"); b.set_title("Base (plano xy)")
    b.legend(loc="upper center", bbox_to_anchor=(.5, -.25), fontsize=12, frameon=False)
    c = fig.add_subplot(gs[1, 1]); rv = np.linspace(0, 1, 200)
    c.fill_between(rv, 0, h*np.sqrt(1 - rv**2), color="#9ecae1", alpha=.8); c.plot(rv, h*np.sqrt(1 - rv**2), "C0", lw=2.5, label=f"techo: z = {h}√(1 − r²)"); c.plot([0, 1], [0, 0], "C2", lw=2.5, label="base: z = 0")
    c.plot([1], [0], "ko"); c.plot([0], [h], "ko"); c.text(.05, h + .1, f"(0, {h})"); c.text(.62, .12, "(1, 0)")
    c.set_xticks([0, .5, 1]); c.set_yticks(range(0, h + 1)); c.set_xlim(-.1, 1.15); c.set_ylim(-.3, h + .5); c.set_aspect("equal"); c.grid(alpha=.3)
    c.set_xlabel("r"); c.set_ylabel("z"); c.set_title("Corte r–z (a θ fijo)")
    c.legend(loc="upper center", bbox_to_anchor=(.5, -.25), fontsize=12, frameon=False)
    save(fig, tema, 2)
ej2("a", 2); ej2("b", 3)

# ---------- Ej 3 ----------
def arrow(a, p, q, c):
    a.annotate("", xy=q, xytext=p, arrowprops=dict(arrowstyle="-|>", color=c, lw=2, mutation_scale=25))

def ej3_a():
    fig, a = plt.subplots(figsize=(W, 6.0), facecolor="white")
    th = np.linspace(-np.pi/4, 3*np.pi/4, 300); r2 = np.sqrt(2)
    a.fill(np.r_[r2*np.cos(th)], np.r_[r2*np.sin(th)], color="#9ecae1", alpha=.8)
    t = np.linspace(0, 2*np.pi, 300); a.plot(r2*np.cos(t), r2*np.sin(t), color="gray", lw=.8, ls=":")
    a.plot(r2*np.cos(th), r2*np.sin(th), "C3", lw=2.5, label="C₁: x² + y² = 2, de A a B (antihorario)")
    a.plot([-1, 1], [1, -1], "C0", lw=2.5, label="C₂: y = −x, de B a A (x de −1 a 1)")
    arrow(a, (r2*np.cos(.5), r2*np.sin(.5)), (r2*np.cos(.62), r2*np.sin(.62)), "C3"); arrow(a, (-.3, .3), (.1, -.1), "C0")
    a.plot([1, -1], [-1, 1], "ko"); a.text(1.08, -1.2, "A(1, −1)"); a.text(-1.9, 1.1, "B(−1, 1)")
    a.text(.35, .45, "D", fontsize=16, ha="center"); a.text(0, -1.68, "θ de −π/4 a 3π/4", ha="center", fontsize=12)
    a.set_xticks(range(-2, 3)); a.set_yticks(range(-2, 3)); a.set_xlim(-2.2, 2.2); a.set_ylim(-1.85, 2.0); a.set_aspect("equal"); a.grid(alpha=.3)
    a.set_xlabel("x"); a.set_ylabel("y"); a.legend(fontsize=12, loc="upper center", bbox_to_anchor=(.5, -.14), frameon=False)
    save(fig, "a", 3)

def ej3_b():
    fig, a = plt.subplots(figsize=(W, 5.4), facecolor="white")
    x = np.linspace(-1, 1, 300); y = 2*np.sqrt(1 - x**2)
    a.fill_between(x, 0, y, color="#9ecae1", alpha=.8)
    a.plot(x, y, "C3", lw=2.5, label="C₁: x² + y²/4 = 1, arco superior (x de 1 a −1)"); a.plot([-1, 1], [0, 0], "C0", lw=2.5, label="C₂: y = 0 (x de −1 a 1)")
    arrow(a, (.5, 2*np.sqrt(1-.25)), (.3, 2*np.sqrt(1-.09)), "C3"); arrow(a, (-.2, 0), (.2, 0), "C0")
    a.plot([-1, 1], [0, 0], "ko"); a.text(1.05, .08, "(1, 0)"); a.text(-1.75, .08, "(−1, 0)"); a.text(0, 0.8, "D", fontsize=16, ha="center")
    a.set_xticks(range(-2, 3)); a.set_yticks(range(0, 3)); a.set_xlim(-2, 2); a.set_ylim(-.5, 2.4); a.set_aspect("equal"); a.grid(alpha=.3)
    a.set_xlabel("x"); a.set_ylabel("y"); a.legend(fontsize=12, loc="upper center", bbox_to_anchor=(.5, -.14), frameon=False)
    save(fig, "b", 3)
ej3_a(); ej3_b()
