# Ej 1 (1R3): sólido en 3D (arriba) y corte x=0 (abajo). Uso: python3 figuras/src/1r3_ej1.py
import numpy as np, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Patch
from matplotlib.lines import Line2D
from pathlib import Path
out = Path(__file__).resolve().parents[2] / "public/figuras/1r3/ej1.svg"
plt.rcParams.update({"font.size": 12, "svg.fonttype": "none"})
fig = plt.figure(figsize=(7.8, 10.5), facecolor="white")
a = fig.add_subplot(2, 1, 1, projection="3d")
rr, tt = np.meshgrid(np.linspace(0, 2, 24), np.linspace(0, 2*np.pi, 60))
X, Y = rr*np.cos(tt), rr*np.sin(tt)
a.plot_surface(X, Y, Y + 4, color="#e34a33", alpha=.55, linewidth=0)               # techo
a.plot_surface(X, Y, np.sqrt(4 - rr**2), color="#3182bd", alpha=.7, linewidth=0)    # semiesfera (se resta)
zz = np.linspace(0, 1, 2)[None, :]; t1 = np.linspace(0, 2*np.pi, 80)[:, None]
Xc, Yc = 2*np.cos(t1)*np.ones_like(zz), 2*np.sin(t1)*np.ones_like(zz)
a.plot_surface(Xc, Yc, (Yc + 4)*zz, color="#bdbdbd", alpha=.35, linewidth=0)       # cilindro
a.set_xlabel("x"); a.set_ylabel("y"); a.set_zlabel("z"); a.view_init(22, -60)
a.set_title("Sólido: cilindro con un hueco semiesférico")
a.legend(handles=[Patch(color="#e34a33", alpha=.6, label="techo: plano z = y + 4"),
                  Patch(color="#3182bd", alpha=.7, label="piso: semiesfera z = √(4 − r²)  (se resta)"),
                  Patch(color="#bdbdbd", alpha=.5, label="pared: cilindro r = 2")],
         loc="upper center", bbox_to_anchor=(.5, -.02), fontsize=11, frameon=False)
b = fig.add_subplot(2, 1, 2)
y = np.linspace(-2, 2, 400)
b.fill_between(y, np.sqrt(4 - y**2), y + 4, color="#9ecae1", alpha=.8)
b.fill_between(y, 0, np.sqrt(4 - y**2), color="#fdd0a2", alpha=.8, hatch="//", edgecolor="#e6550d")
b.plot(y, y + 4, "C3", lw=2.5); b.plot(y, np.sqrt(4 - y**2), "C0", lw=2.5)
b.plot([-2, -2], [0, 2], "k--"); b.plot([2, 2], [0, 6], "k--")
b.text(0, 4.2, "sólido (se integra)", ha="center", fontsize=12, rotation=0)
b.text(0, .6, "hueco: se resta", ha="center", fontsize=12)
b.text(-1.9, 2.5, "techo", color="C3", fontsize=12); b.text(.9, 1.7, "piso", color="C0", fontsize=12)
b.set_xlabel("y"); b.set_ylabel("z"); b.set_title("Corte con el plano x = 0"); b.set_aspect("equal"); b.grid(alpha=.3)
fig.tight_layout(); fig.savefig(out, format="svg", metadata={"Date": None})
