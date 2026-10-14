# Ej 3 (1R3): región cerrada entre y=x² y x²+y²=2 (arco superior), sentido antihorario. Uso: python3 figuras/src/1r3_ej3.py
import numpy as np, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from pathlib import Path
out = Path(__file__).resolve().parents[2] / "public/figuras/1r3/ej3.svg"
plt.rcParams.update({"font.size": 12, "svg.fonttype": "none"})
fig, a = plt.subplots(figsize=(7.8, 6.4), facecolor="white")
x = np.linspace(-1, 1, 400)
a.fill_between(x, x**2, np.sqrt(2 - x**2), color="#9ecae1", alpha=.8)
a.plot(x, x**2, "C0", lw=2.5, label="C₂: y = x²  (x de −1 a 1)")
a.plot(x, np.sqrt(2 - x**2), "C3", lw=2.5, label="C₁: x² + y² = 2, arco superior  (x de 1 a −1)")
th = np.linspace(0, 2*np.pi, 300); a.plot(np.sqrt(2)*np.cos(th), np.sqrt(2)*np.sin(th), color="gray", lw=.8, ls=":")
a.annotate("", xy=(.55, .55**2), xytext=(.4, .4**2), arrowprops=dict(arrowstyle="-|>", color="C0", lw=2, mutation_scale=25))
a.annotate("", xy=(-.12, np.sqrt(2-.0144)), xytext=(.12, np.sqrt(2-.0144)), arrowprops=dict(arrowstyle="-|>", color="C3", lw=2, mutation_scale=25))
a.plot([-1, 1], [1, 1], "ko"); a.text(1.06, .93, "(1, 1)"); a.text(-1.55, .93, "(−1, 1)")
a.text(0, .75, "D\n(3y > 0)", fontsize=14, ha="center"); a.text(0, -.1, "sentido antihorario (+)", ha="center")
a.set_xlim(-1.8, 1.8); a.set_ylim(-.2, 1.7); a.set_aspect("equal"); a.grid(alpha=.3)
a.set_xlabel("x"); a.set_ylabel("y"); a.legend(fontsize=11, loc="upper center", bbox_to_anchor=(.5, -.14), frameon=False)
fig.tight_layout(); fig.savefig(out, format="svg")
