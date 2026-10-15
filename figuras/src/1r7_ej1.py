# Ej 1 (1R7): sólido entre cono y paraboloide, 3D (arriba) y corte x=0 (abajo). Uso: python3 figuras/src/1r7_ej1.py
import numpy as np, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Patch
from pathlib import Path
out = Path(__file__).resolve().parents[2] / "public/figuras/1r7/ej1.svg"
plt.rcParams.update({"font.size": 12, "svg.fonttype": "none"})
fig = plt.figure(figsize=(7.8, 10.5), facecolor="white")
a = fig.add_subplot(2, 1, 1, projection="3d")
rr, tt = np.meshgrid(np.linspace(0, 2, 24), np.linspace(0, 2*np.pi, 60))
X, Y = rr*np.cos(tt), rr*np.sin(tt)
a.plot_surface(X, Y, 6 - rr**2, color="#e34a33", alpha=.55, linewidth=0)
a.plot_surface(X, Y, rr, color="#3182bd", alpha=.65, linewidth=0)
c = np.linspace(0, 2*np.pi, 100); a.plot(2*np.cos(c), 2*np.sin(c), 2, "k", lw=2)
a.set_xticks([-2, -1, 0, 1, 2]); a.set_yticks([-2, -1, 0, 1, 2]); a.set_zticks(range(0, 7))
a.set_xlabel("x"); a.set_ylabel("y"); a.set_zlabel("z"); a.view_init(20, -60)
a.set_title("Sólido entre el cono y el paraboloide")
a.legend(handles=[Patch(color="#e34a33", alpha=.6, label="techo: paraboloide z = 6 − r²"),
                  Patch(color="#3182bd", alpha=.7, label="piso: cono z = r"),
                  Patch(color="k", label="intersección: r = 2, z = 2")],
         loc="upper center", bbox_to_anchor=(.5, -.02), fontsize=11, frameon=False)
b = fig.add_subplot(2, 1, 2)
y = np.linspace(-2, 2, 400)
b.fill_between(y, np.abs(y), 6 - y**2, color="#9ecae1", alpha=.8)
b.plot(y, 6 - y**2, "C3", lw=2.5); b.plot(y, np.abs(y), "C0", lw=2.5)
b.plot(y, 6 - y**2, "C3", lw=0); b.plot([-2, 2], [2, 2], "ko")
b.plot(np.linspace(-3, -2, 20), 6 - np.linspace(-3, -2, 20)**2, "C3", lw=1, ls=":")
b.plot(np.linspace(2, 3, 20), 6 - np.linspace(2, 3, 20)**2, "C3", lw=1, ls=":")
b.plot([-3, -2], [3, 2], "C0", lw=1, ls=":"); b.plot([2, 3], [2, 3], "C0", lw=1, ls=":")
b.text(0, 3.5, "V", fontsize=16, ha="center")
b.text(-1.9, 5.6, "techo z = 6 − r²", color="C3", fontsize=12, ha="center")
b.text(0, -.55, "piso z = r  (cono)", color="C0", fontsize=12, ha="center")
b.text(2.15, 1.45, "(r=2, z=2)", fontsize=12)
b.set_xticks(range(-3, 4)); b.set_yticks(range(-1, 7)); b.set_xlim(-3.2, 3.4); b.set_ylim(-1, 6.5)
b.set_xlabel("y"); b.set_ylabel("z"); b.set_title("Corte con el plano x = 0"); b.set_aspect("equal"); b.grid(alpha=.3)
fig.tight_layout(); fig.savefig(out, format="svg", metadata={"Date": None})
