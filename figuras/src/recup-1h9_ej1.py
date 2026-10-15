# Ej 1 (recup 1H9): región entre z=x²+y² y z=2, 3D (arriba) y corte x=0 (abajo). Uso: python3 figuras/src/recup-1h9_ej1.py
import numpy as np, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Patch
from pathlib import Path
out = Path(__file__).resolve().parents[2] / "public/figuras/recup-1h9/ej1.svg"
plt.rcParams.update({"font.size": 12, "svg.fonttype": "none"})
R = np.sqrt(2)
fig = plt.figure(figsize=(7.8, 10.5), facecolor="white")
a = fig.add_subplot(2, 1, 1, projection="3d")
rr, tt = np.meshgrid(np.linspace(0, R, 24), np.linspace(0, 2*np.pi, 60))
X, Y = rr*np.cos(tt), rr*np.sin(tt)
a.plot_surface(X, Y, 2 + 0*X, color="#e34a33", alpha=.5, linewidth=0)
a.plot_surface(X, Y, rr**2, color="#3182bd", alpha=.65, linewidth=0)
a.set_xticks([-1, 0, 1]); a.set_yticks([-1, 0, 1]); a.set_zticks([0, 1, 2])
a.set_xlabel("x"); a.set_ylabel("y"); a.set_zlabel("z"); a.view_init(20, -60)
a.set_title("Sólido entre el paraboloide y el plano")
a.legend(handles=[Patch(color="#e34a33", alpha=.6, label="techo: plano z = 2"),
                  Patch(color="#3182bd", alpha=.7, label="piso: paraboloide z = r²  (corte en r = √2)")],
         loc="upper center", bbox_to_anchor=(.5, -.02), fontsize=11, frameon=False)
b = fig.add_subplot(2, 1, 2)
y = np.linspace(-R, R, 400)
b.fill_between(y, y**2, 2, color="#9ecae1", alpha=.8)
b.plot(y, y**2, "C0", lw=2.5); b.plot([-2, 2], [2, 2], "C3", lw=2.5); b.plot([-R, R], [2, 2], "ko")
b.text(0, 1.5, "V", fontsize=16, ha="center"); b.text(0, 2.12, "techo z = 2", color="C3", ha="center")
b.text(-.15, -.4, "piso z = r²", color="C0", ha="right"); b.text(R + .05, 1.65, "r = √2", fontsize=12)
b.set_xticks([-2, -1, 0, 1, 2]); b.set_yticks([-1, 0, 1, 2, 3]); b.set_xlim(-2.2, 2.6); b.set_ylim(-.8, 2.6)
b.set_xlabel("y"); b.set_ylabel("z"); b.set_title("Corte con el plano x = 0"); b.set_aspect("equal"); b.grid(alpha=.3)
fig.tight_layout(); fig.savefig(out, format="svg", metadata={"Date": None})
