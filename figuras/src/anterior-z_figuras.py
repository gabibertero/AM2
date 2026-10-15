# Parcial Z (T1 y T2), ej 1: región entre la parábola y las dos rectas. Uso: python3 figuras/src/anterior-z_figuras.py
import os, numpy as np, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from pathlib import Path
root = Path(__file__).resolve().parents[2]; PREV = os.environ.get("PREVIEW")
plt.rcParams.update({"font.size": 12, "svg.fonttype": "none"})

def fig_z(tema, par, l1, l2, xs, lab, pts, xlim, ylim, xcruce):
    """xs=(x_izq, x_cruce, x_der): tramos de integración; l1 va de x_izq a x_cruce, l2 de x_cruce a x_der."""
    fig, a = plt.subplots(figsize=(7.8, 9.4), facecolor="white")
    xa = np.linspace(xs[0], xs[1], 300); xb = np.linspace(xs[1], xs[2], 300)
    a.fill_between(xa, par(xa), l1[0](xa), color="#9ecae1", alpha=.85, label="región sombreada: tramo 1")
    a.fill_between(xb, par(xb), l2[0](xb), color="#fdae6b", alpha=.85, label="región sombreada: tramo 2")
    xx = np.linspace(xlim[0], xlim[1], 500)
    a.plot(xx, par(xx), "C3", lw=2.5, label=lab[0]); a.plot(xx, l1[0](xx), "C0", lw=2.5, label=l1[1]); a.plot(xx, l2[0](xx), "C2", lw=2.5, label=l2[1])
    a.axvline(xs[1], color="k", ls="--", lw=1.2)
    a.plot([p[0] for p in pts], [p[1] for p in pts], "ko")
    for (px, py, s, dx, dy) in [(p[0], p[1], p[2], p[3], p[4]) for p in pts]:
        a.annotate(s, (px, py), (px + dx, py + dy), fontsize=12, arrowprops=dict(arrowstyle="-", lw=.8, color="0.3"))
    a.set_xlim(*xlim); a.set_ylim(*ylim); a.set_xticks(range(xlim[0], xlim[1] + 1)); a.set_yticks(range(ylim[0], ylim[1] + 1))
    a.set_aspect("equal"); a.grid(alpha=.3); a.axhline(0, c="k", lw=.8); a.axvline(0, c="k", lw=.8)
    a.set_xlabel("x"); a.set_ylabel("y"); a.legend(fontsize=12, loc="upper center", bbox_to_anchor=(.5, -.12), frameon=False, ncol=2)
    fig.tight_layout(); fig.subplots_adjust(bottom=.22); fig.savefig(root / f"public/figuras/anterior-z-{tema}/ej1.svg", format="svg", metadata={"Date": None})
    if PREV: fig.savefig(f"{PREV}/z-{tema}.png", dpi=80)
    plt.close(fig)

fig_z("t1", lambda x: x**2 - x - 1, (lambda x: x + 2, "recta y = x + 2"), (lambda x: -2*x + 5, "recta y = −2x + 5"), (-1, 1, 2),
      ["parábola y = x² − x − 1"],
      [(-1, 1, "(−1, 1)", -2.6, .6), (0, -1, "(0, −1)", -1.8, -.8), (1, -1, "(1, −1)", .4, -.9), (1, 3, "(1, 3)", .4, .4), (2, 1, "(2, 1)", .5, .3)],
      (-4, 5), (-3, 6), 1)
fig_z("t2", lambda x: x**2 + x - 1, (lambda x: 2*x + 5, "recta y = 2x + 5"), (lambda x: -x + 2, "recta y = −x + 2"), (-2, -1, 1),
      ["parábola y = x² + x − 1"],
      [(-2, 1, "(−2, 1)", -2.6, .6), (-1, -1, "(−1, −1)", -2.2, -.8), (0, -1, "(0, −1)", -.6, -1.1), (1, 1, "(1, 1)", .5, .4), (-1, 3, "(−1, 3)", -2.6, .4)],
      (-5, 4), (-3, 6), -1)
