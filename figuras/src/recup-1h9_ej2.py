# Ej 2 (recup 1H9): región entre y=x-2 e y=-x²+4, antihoraria. Uso: python3 figuras/src/recup-1h9_ej2.py
import numpy as np, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from pathlib import Path
out = Path(__file__).resolve().parents[2] / "public/figuras/recup-1h9/ej2.svg"
plt.rcParams.update({"font.size": 12, "svg.fonttype": "none"})
fig, a = plt.subplots(figsize=(7.8, 7.8), facecolor="white")
x = np.linspace(-3, 2, 400)
a.fill_between(x, x - 2, 4 - x**2, color="#9ecae1", alpha=.8)
xx = np.linspace(-4, 3, 50); a.plot(xx, xx - 2, "C0", lw=1, ls=":"); a.plot(np.linspace(-3.4, 2.4, 100), 4 - np.linspace(-3.4, 2.4, 100)**2, "C3", lw=1, ls=":")
a.plot(x, x - 2, "C0", lw=2.5, label="C₁: y = x − 2  (x de −3 a 2)")
a.plot(x, 4 - x**2, "C3", lw=2.5, label="C₂: y = −x² + 4  (x de 2 a −3)")
a.annotate("", xy=(-.4, -2.4), xytext=(-1.0, -3.0), arrowprops=dict(arrowstyle="-|>", color="C0", lw=2, mutation_scale=25))
a.annotate("", xy=(-1.6, 4 - 1.6**2), xytext=(-1.2, 4 - 1.2**2), arrowprops=dict(arrowstyle="-|>", color="C3", lw=2, mutation_scale=25))
a.plot([-3, 2], [-5, 0], "ko"); a.text(-2.9, -5.6, "(−3, −5)"); a.text(2.1, .15, "(2, 0)"); a.plot([0], [4], "k.")
a.text(.1, 4.15, "(0, 4)")
a.text(-.6, .5, "D", fontsize=16, ha="center"); a.text(.9, -4.5, "sentido antihorario (+)", ha="center")
a.set_xticks(range(-4, 4)); a.set_yticks(range(-6, 6)); a.set_xlim(-4.2, 3.4); a.set_ylim(-6.2, 5.4)
a.set_aspect("equal"); a.grid(alpha=.3)
a.set_xlabel("x"); a.set_ylabel("y"); a.legend(fontsize=11, loc="upper center", bbox_to_anchor=(.5, -.1), frameon=False)
fig.tight_layout(); fig.savefig(out, format="svg", metadata={"Date": None})
