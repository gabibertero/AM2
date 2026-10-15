# Ej 3 (1R7): región entre y=x²-1 y y=1-x², antihoraria. Uso: python3 figuras/src/1r7_ej3.py
import numpy as np, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from pathlib import Path
out = Path(__file__).resolve().parents[2] / "public/figuras/1r7/ej3.svg"
plt.rcParams.update({"font.size": 12, "svg.fonttype": "none"})
fig, a = plt.subplots(figsize=(7.8, 6.4), facecolor="white")
x = np.linspace(-1, 1, 400)
a.fill_between(x, x**2 - 1, 1 - x**2, color="#9ecae1", alpha=.8)
a.plot(x, x**2 - 1, "C0", lw=2.5, label="C₁: y = x² − 1  (x de −1 a 1)")
a.plot(x, 1 - x**2, "C3", lw=2.5, label="C₂: y = −x² + 1  (x de 1 a −1)")
a.annotate("", xy=(.6, .6**2 - 1), xytext=(.4, .4**2 - 1), arrowprops=dict(arrowstyle="-|>", color="C0", lw=2, mutation_scale=25))
a.annotate("", xy=(-.2, 1 - .04), xytext=(.2, 1 - .04), arrowprops=dict(arrowstyle="-|>", color="C3", lw=2, mutation_scale=25))
a.plot([-1, 1, 0, 0], [0, 0, 1, -1], "ko"); a.text(1.06, .05, "(1, 0)"); a.text(-1.06, .05, "(−1, 0)", ha="right")
a.text(.06, 1.04, "(0, 1)"); a.text(.06, -1.15, "(0, −1)")
a.text(0, 0, "D", fontsize=16, ha="center", va="center"); a.text(0, -.45, "sentido antihorario (+)", ha="center")
a.set_xticks([-2, -1, 0, 1, 2]); a.set_yticks([-1, 0, 1]); a.set_xlim(-2.2, 2.2); a.set_ylim(-1.4, 1.4)
a.set_aspect("equal"); a.grid(alpha=.3)
a.set_xlabel("x"); a.set_ylabel("y"); a.legend(fontsize=11, loc="upper center", bbox_to_anchor=(.5, -.14), frameon=False)
fig.tight_layout(); fig.savefig(out, format="svg", metadata={"Date": None})
