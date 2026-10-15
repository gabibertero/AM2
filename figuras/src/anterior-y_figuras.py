# Parcial Y (T1 y T2), ej 1: disco tangente al eje x (plano) y superficie z = 1/y sobre el disco (3D). Uso: python3 figuras/src/anterior-y_figuras.py
import os, numpy as np, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Patch
from pathlib import Path
root = Path(__file__).resolve().parents[2]; PREV = os.environ.get("PREVIEW")
plt.rcParams.update({"font.size": 12, "svg.fonttype": "none"})

def fig_y(tema, s, zcl):
    """s=+1: disco centrado en (0,2); s=-1: centrado en (0,-2). zcl: tope visual de |z| (la superficie diverge en el origen)."""
    fig = plt.figure(figsize=(7.8, 11.8), facecolor="white")
    a = fig.add_subplot(2, 1, 1)
    t = np.linspace(0, 2*np.pi, 400)
    a.fill(2*np.cos(t), 2*s + 2*np.sin(t), color="#9ecae1", alpha=.85, label="D: disco sombreado")
    a.plot(2*np.cos(t), 2*s + 2*np.sin(t), "C0", lw=2.5, label=f"x² + (y {'−' if s > 0 else '+'} 2)² = 4  (r = {'4 sen θ' if s > 0 else '−4 sen θ'})")
    a.plot([0, 0], [0, 4*s], "ko"); a.plot([0], [2*s], "k+", ms=10)
    a.annotate("(0, 0)", (0, 0), (.5, -.9*s if s > 0 else .7), fontsize=12, arrowprops=dict(arrowstyle="-", lw=.8, color="0.3"))
    a.annotate(f"(0, {4*s})".replace("-", "−"), (0, 4*s), (.6, 4*s + (.4 if s > 0 else -.6)), fontsize=12, arrowprops=dict(arrowstyle="-", lw=.8, color="0.3"))
    a.annotate(f"centro (0, {2*s})".replace("-", "−"), (0, 2*s), (.4, 2*s + .2), fontsize=12)
    a.set_xlim(-4, 4); a.set_ylim(-5, 5); a.set_xticks(range(-4, 5)); a.set_yticks(range(-5, 6))
    a.set_aspect("equal"); a.grid(alpha=.3); a.axhline(0, c="k", lw=.8); a.axvline(0, c="k", lw=.8)
    a.set_xlabel("x"); a.set_ylabel("y"); a.set_title("Región D en el plano xy (tangente al eje x en el origen)")
    a.legend(fontsize=12, loc="upper center", bbox_to_anchor=(.5, -.14), frameon=False, ncol=1)
    b = fig.add_subplot(2, 1, 2, projection="3d")
    R, T = np.meshgrid(np.linspace(0, 1, 60), np.linspace(0, 2*np.pi, 160))
    X = 2*R*np.cos(T); Y = 2*s + 2*R*np.sin(T)
    with np.errstate(divide="ignore"): Z = 1/Y
    Z = np.clip(Z, -zcl, zcl)
    b.plot_surface(X, Y, Z, color="#e34a33", alpha=.75, linewidth=0)
    b.plot_surface(X, Y, 0*X, color="#bdbdbd", alpha=.35, linewidth=0)
    b.set_xlabel("x"); b.set_ylabel("y"); b.set_zlabel("z"); b.view_init(24, -58)
    b.set_xticks([-2, 0, 2]); b.set_yticks([0, 2, 4] if s > 0 else [-4, -2, 0])
    b.set_title(f"Superficie z = 1/y sobre D (recortada en |z| = {zcl}: diverge en el origen)")
    b.legend(handles=[Patch(color="#e34a33", alpha=.75, label="superficie z = 1/y"), Patch(color="#bdbdbd", alpha=.5, label="base D (z = 0)")],
             loc="upper center", bbox_to_anchor=(.5, -.02), fontsize=12, frameon=False)
    fig.tight_layout(); fig.subplots_adjust(hspace=.45); fig.savefig(root / f"public/figuras/anterior-y-{tema}/ej1.svg", format="svg", metadata={"Date": None})
    if PREV: fig.savefig(f"{PREV}/y-{tema}.png", dpi=80)
    plt.close(fig)

fig_y("t1", 1, 6)
fig_y("t2", -1, 6)
