# Ej 2 (1R3): región entre paraboloides en 3D (arriba) y corte meridiano (abajo). Uso: python3 figuras/src/1r3_ej2.py
import numpy as np, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Patch
from pathlib import Path
out = Path(__file__).resolve().parents[2] / "public/figuras/1r3/ej2.svg"
plt.rcParams.update({"font.size": 12, "svg.fonttype": "none"})
fig = plt.figure(figsize=(7.8, 10.5), facecolor="white")
a = fig.add_subplot(2, 1, 1, projection="3d")
rr, tt = np.meshgrid(np.linspace(0, 2, 24), np.linspace(0, 2*np.pi, 60))
X, Y = rr*np.cos(tt), rr*np.sin(tt)
a.plot_surface(X, Y, 5 - rr**2, color="#e34a33", alpha=.6, linewidth=0)
a.plot_surface(X, Y, rr**2 - 3, color="#3182bd", alpha=.6, linewidth=0)
c = np.linspace(0, 2*np.pi, 100); a.plot(2*np.cos(c), 2*np.sin(c), 1, "k", lw=2)
a.set_xlabel("x"); a.set_ylabel("y"); a.set_zlabel("z"); a.view_init(18, -60)
a.set_title("Región V entre los dos paraboloides")
a.legend(handles=[Patch(color="#e34a33", alpha=.6, label="techo: z = 5 − r²"),
                  Patch(color="#3182bd", alpha=.6, label="piso: z = r² − 3"),
                  Patch(color="k", label="intersección: r = 2, z = 1")],
         loc="upper center", bbox_to_anchor=(.5, -.02), fontsize=11, frameon=False)
b = fig.add_subplot(2, 1, 2)
r = np.linspace(-2, 2, 400)
b.fill_between(r, r**2 - 3, 5 - r**2, color="#9ecae1", alpha=.8)
b.plot(r, r**2 - 3, "C0", lw=2.5); b.plot(r, 5 - r**2, "C3", lw=2.5)
b.plot([-2, 2], [1, 1], "ko"); b.text(0, 1, "V", fontsize=16, ha="center", va="center")
b.text(0, 5.3, "techo z = 5 − r²", ha="center", color="C3", fontsize=12)
b.text(0, -3.7, "piso z = r² − 3", ha="center", color="C0", fontsize=12)
b.text(2.1, 1.4, "r = 2\nz = 1", fontsize=12)
b.set_xlim(-2.8, 3.2); b.set_ylim(-4.2, 6)
b.set_xlabel("r  (se dibuja ±r: es un corte por el eje z)"); b.set_ylabel("z"); b.set_title("Corte meridiano"); b.grid(alpha=.3)
fig.tight_layout(); fig.savefig(out, format="svg", metadata={"Date": None})
