# Parcial W (T1 y T2), ej 1: región D en el plano (arriba) y sólido entre superficies (abajo). Uso: python3 figuras/src/anterior-w_figuras.py
import numpy as np, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Patch
from pathlib import Path
root = Path(__file__).resolve().parents[2]
import os; PREV = os.environ.get("PREVIEW")  # solo para mirar la figura
plt.rcParams.update({"font.size": 12, "svg.fonttype": "none"})

def fig_w(tema, a_, b_, pts, surf_techo, surf_piso, lab_techo, lab_piso, lab_recta, xmax):
    """a_,b_: pendiente y ordenada de la recta; [1, b_] = x entre 1 y b_; techo/piso: funciones (x,y)->z."""
    out = root / f"public/figuras/anterior-w-{tema}"
    fig = plt.figure(figsize=(7.8, 11.8), facecolor="white")
    a = fig.add_subplot(2, 1, 1)
    xs = np.linspace(.3, xmax + .8, 300); xl = np.linspace(-2, xmax + .8, 50)
    xd = np.linspace(1, b_, 200)
    a.fill_between(xd, 0, 1/xd, color="#9ecae1", alpha=.85, label="D: región sombreada")
    a.plot(xs, 1/xs, "C3", lw=2.5, label="y = 1/x")
    a.plot(xl, a_*xl + .5*0 + RB[tema], "C0", lw=2.5, label=lab_recta)
    for xv in (1, b_): a.plot([xv, xv], [-1.5, 3.5], "k--", lw=1.3)
    a.plot([c[0] for c in pts], [c[1] for c in pts], "ko")
    for (px, py, t, dx, dy) in LAB[tema]: a.annotate(t, (px, py), (px + dx, py + dy), fontsize=12, arrowprops=dict(arrowstyle="-", lw=.8, color="0.3"))
    a.text(1.5, .15, "D", fontsize=16)
    a.set_xlim(-2, xmax + 1); a.set_ylim(-1.5, 3.5); a.set_xticks(range(-2, xmax + 2)); a.set_yticks([-1, 0, 1, 2, 3])
    a.set_aspect("equal"); a.grid(alpha=.3); a.axhline(0, c="k", lw=.8); a.axvline(0, c="k", lw=.8)
    a.set_xlabel("x"); a.set_ylabel("y"); a.set_title("Región D en el plano xy")
    a.legend(fontsize=12, loc="upper center", bbox_to_anchor=(.5, -.14), frameon=False, ncol=3)
    b = fig.add_subplot(2, 1, 2, projection="3d")
    X, S = np.meshgrid(np.linspace(1, b_, 30), np.linspace(0, 1, 20)); Y = S/X
    b.plot_surface(X, Y, surf_techo(X, Y), color="#e34a33", alpha=.6, linewidth=0)
    b.plot_surface(X, Y, surf_piso(X, Y), color="#3182bd", alpha=.7, linewidth=0)
    xc = np.linspace(1, b_, 60); yc = 1/xc
    t = np.linspace(0, 1, 2)[None, :]
    zt, zp = surf_techo(xc, yc)[:, None], surf_piso(xc, yc)[:, None]
    b.plot_surface(xc[:, None]*np.ones_like(t), yc[:, None]*np.ones_like(t), zp + (zt - zp)*t, color="#bdbdbd", alpha=.35, linewidth=0)
    b.set_xlabel("x"); b.set_ylabel("y"); b.set_zlabel("z"); b.view_init(22, -62)
    b.set_xticks(range(1, b_ + 1)); b.set_yticks([0, .5, 1]); b.set_title("Sólido sobre D")
    b.legend(handles=[Patch(color="#e34a33", alpha=.6, label=lab_techo), Patch(color="#3182bd", alpha=.7, label=lab_piso),
                      Patch(color="#bdbdbd", alpha=.5, label="pared sobre y = 1/x")], loc="upper center", bbox_to_anchor=(.5, -.02), fontsize=12, frameon=False)
    fig.tight_layout(); fig.savefig(out / "ej1.svg", format="svg", metadata={"Date": None})
    if PREV: fig.savefig(f"{PREV}/w-{tema}.png", dpi=80)
    plt.close(fig)

RB = {"t1": -1, "t2": .5}
LAB = {"t1": [(0, -1, "(0, −1)", .3, -.4), (2, 3, "(2, 3)", .1, -.1), (1, 1, "(1, 1)", -1.3, .6), (3, 1/3, "(3, 1/3)", .1, .4)],
       "t2": [(0, .5, "(0, 1/2)", -1.5, .6), (-1, 0, "(−1, 0)", -.7, -.5), (1, 1, "(1, 1)", -1.3, .6), (2, .5, "(2, 1/2)", .1, .35)]}
fig_w("t1", 2, 3, [(0, -1), (2, 3), (1, 1), (3, 1/3)], lambda x, y: x**2*y, lambda x, y: -x + 0*y,
      "techo: z₂ = x²y", "piso: z₁ = −x", "recta y = 2x − 1", 3)
fig_w("t2", .5, 2, [(0, .5), (-1, 0), (1, 1), (2, .5)], lambda x, y: x + 0*y, lambda x, y: x**2*y,
      "techo: z₂ = x", "piso: z₁ = x²y", "recta y = (x + 1)/2", 3)
