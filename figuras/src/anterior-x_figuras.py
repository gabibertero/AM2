# Parcial X (T1 y T2), ej 1: región sombreada (parábola, círculo, ejes). Uso: python3 figuras/src/anterior-x_figuras.py
import os, numpy as np, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from pathlib import Path
root = Path(__file__).resolve().parents[2]; PREV = os.environ.get("PREVIEW")  # PREVIEW: solo para mirar
plt.rcParams.update({"font.size": 12, "svg.fonttype": "none"})

def fig_x(tema, circ_arriba, R, par, x_ini, x_fin, xlim, ylim, lab_par, pts, lab_a):
    fig, a = plt.subplots(figsize=(7.8, 8.4), facecolor="white")
    th = np.linspace(0, np.pi/2, 200)
    xc = np.linspace(x_ini, x_fin, 600); yp = par(xc)
    ycirc = np.where(xc <= R, np.sqrt(np.clip(R**2 - xc**2, 0, None)), 0)
    lo, hi = (np.maximum(yp, 0), ycirc) if circ_arriba else (ycirc, yp)
    a.fill_between(xc, lo, hi, color="#9ecae1", alpha=.85, label="región sombreada")
    xx = np.linspace(xlim[0], xlim[1], 500); a.plot(xx, par(xx), "C3", lw=2.5, label=lab_par)
    t = np.linspace(0, 2*np.pi, 400); a.plot(R*np.cos(t), R*np.sin(t), "C0", lw=2.5, label=f"círculo x² + y² = {R**2}")
    a.plot([c[0] for c in pts], [c[1] for c in pts], "ko")
    for (px, py, s, dx, dy) in lab_a: a.annotate(s, (px, py), (px + dx, py + dy), fontsize=12, arrowprops=dict(arrowstyle="-", lw=.8, color="0.3"))
    a.set_xlim(*xlim); a.set_ylim(*ylim); a.set_xticks(range(xlim[0], xlim[1] + 1)); a.set_yticks(range(ylim[0], ylim[1] + 1))
    a.set_aspect("equal"); a.grid(alpha=.3); a.axhline(0, c="k", lw=.8); a.axvline(0, c="k", lw=.8)
    a.set_xlabel("x"); a.set_ylabel("y"); a.legend(fontsize=12, loc="upper center", bbox_to_anchor=(.5, -.12), frameon=False, ncol=1)
    fig.tight_layout(); fig.savefig(root / f"public/figuras/anterior-x-{tema}/ej1.svg", format="svg", metadata={"Date": None})
    if PREV: fig.savefig(f"{PREV}/x-{tema}.png", dpi=80)
    plt.close(fig)

fig_x("t1", True, 3, lambda x: -x**2 - 2*x + 3, 0, 3, (-4, 4), (-3, 5), "parábola y = −x² − 2x + 3",
      [(0, 3), (1, 0), (3, 0), (-3, 0), (-1, 4)],
      [(0, 3, "(0, 3)", .3, .5), (1, 0, "(1, 0)", .1, -.7), (3, 0, "(3, 0)", .1, -.7), (-3, 0, "(−3, 0)", -.6, -.8), (-1, 4, "vértice (−1, 4)", -2.6, .3)])
fig_x("t2", False, 2, lambda x: -.5*x**2 + 1.5*x + 2, 0, 4, (-2, 5), (-2, 4), "parábola y = −½x² + (3/2)x + 2",
      [(0, 2), (2, 0), (4, 0), (-1, 0), (1.5, 25/8)],
      [(0, 2, "(0, 2)", -1.5, .5), (2, 0, "(2, 0)", -.4, -.8), (4, 0, "(4, 0)", .1, -.7), (-1, 0, "(−1, 0)", -.6, -.8), (1.5, 25/8, "vértice (3/2, 25/8)", -.5, .5)])
