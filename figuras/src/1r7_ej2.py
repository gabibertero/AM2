# Ej 2 (1R7): región del 1.er cuadrante entre z=1-x² y z=2+y², dentro de x²+y²<=1. Uso: python3 figuras/src/1r7_ej2.py
import numpy as np, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Patch
from pathlib import Path
out = Path(__file__).resolve().parents[2] / "public/figuras/1r7/ej2.svg"
plt.rcParams.update({"font.size": 12, "svg.fonttype": "none"})
fig = plt.figure(figsize=(7.8, 10.5), facecolor="white")
a = fig.add_subplot(2, 1, 1, projection="3d")
rr, tt = np.meshgrid(np.linspace(0, 1, 20), np.linspace(0, np.pi/2, 30))
X, Y = rr*np.cos(tt), rr*np.sin(tt)
a.plot_surface(X, Y, 2 + Y**2, color="#e34a33", alpha=.55, linewidth=0)
a.plot_surface(X, Y, 1 - X**2, color="#3182bd", alpha=.65, linewidth=0)
t = np.linspace(0, np.pi/2, 40); zz = np.linspace(0, 1, 2)[None, :]
Xc, Yc = np.cos(t)[:, None]*np.ones_like(zz), np.sin(t)[:, None]*np.ones_like(zz)
Zc = (1 - Xc**2) + (3 + Yc**2 - 1 + Xc**2 - 1 + 0*Xc)*zz   # pared: de z=1-x² a z=2+y²
Zc = (1 - Xc**2) + ((2 + Yc**2) - (1 - Xc**2))*zz
a.plot_surface(Xc, Yc, Zc, color="#bdbdbd", alpha=.35, linewidth=0)
a.set_xticks([0, .5, 1]); a.set_yticks([0, .5, 1]); a.set_zticks([0, 1, 2, 3])
a.set_xlabel("x"); a.set_ylabel("y"); a.set_zlabel("z"); a.view_init(22, 35)
a.set_title("Región V (1.er cuadrante, r ≤ 1)")
a.legend(handles=[Patch(color="#e34a33", alpha=.6, label="techo: z = 2 + y²"),
                  Patch(color="#3182bd", alpha=.7, label="piso: z = 1 − x²"),
                  Patch(color="#bdbdbd", alpha=.5, label="pared: cilindro r = 1")],
         loc="upper center", bbox_to_anchor=(.5, -.02), fontsize=11, frameon=False)
b = fig.add_subplot(2, 1, 2)
th = np.linspace(0, np.pi/2, 200)
b.fill(np.r_[0, np.cos(th), 0], np.r_[0, np.sin(th), 0], color="#9ecae1", alpha=.8)
b.plot(np.cos(th), np.sin(th), "C3", lw=2.5); b.plot([0, 1], [0, 0], "C0", lw=2.5); b.plot([0, 0], [0, 1], "C0", lw=2.5)
b.annotate("", xy=(.55, .55*np.tan(.6)), xytext=(.2, .2*np.tan(.6)), arrowprops=dict(arrowstyle="-|>", color="k", lw=1.5))
b.text(.1, .6, "0 ≤ r ≤ 1", fontsize=12); b.text(.45, .06, "0 ≤ θ ≤ π/2", fontsize=12)
b.text(.72, .78, "r = 1", color="C3", fontsize=12)
b.set_xticks([0, .25, .5, .75, 1]); b.set_yticks([0, .25, .5, .75, 1]); b.set_xlim(-.1, 1.15); b.set_ylim(-.1, 1.15)
b.set_xlabel("x"); b.set_ylabel("y"); b.set_title("Base: proyección sobre el plano xy"); b.set_aspect("equal"); b.grid(alpha=.3)
fig.tight_layout(); fig.savefig(out, format="svg", metadata={"Date": None})
