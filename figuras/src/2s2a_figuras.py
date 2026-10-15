# 2S2 Tema A: ej1 (volumen), ej2 (integral triple, 1er octante), ej3 (región D). Uso: python3 figuras/src/2s2a_figuras.py
import numpy as np, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Patch
from pathlib import Path
out = Path(__file__).resolve().parents[2] / "public/figuras/2s2a"
plt.rcParams.update({"font.size": 12, "svg.fonttype": "none"})
def save(fig, n): fig.tight_layout(); fig.savefig(out / f"{n}.svg", format="svg", metadata={"Date": None}); plt.close(fig)
def leyenda3d(a, hs): a.legend(handles=hs, loc="upper center", bbox_to_anchor=(.5, -.02), fontsize=11, frameon=False)

# ---- Ej 1
fig = plt.figure(figsize=(7.8, 11.5), facecolor="white")
a = fig.add_subplot(2, 1, 1, projection="3d")
rr, tt = np.meshgrid(np.linspace(0, 2, 24), np.linspace(0, 2*np.pi, 60)); X, Y = rr*np.cos(tt), rr*np.sin(tt)
a.plot_surface(X, Y, 8 + rr**2, color="#e34a33", alpha=.55, linewidth=0)
a.plot_surface(X, Y, 4 - rr**2, color="#3182bd", alpha=.7, linewidth=0)
t1 = np.linspace(0, 2*np.pi, 80)[:, None]; s = np.linspace(0, 1, 2)[None, :]
a.plot_surface(2*np.cos(t1)*np.ones_like(s), 2*np.sin(t1)*np.ones_like(s), 0 + (4 + 8*s), color="#bdbdbd", alpha=.3, linewidth=0)
a.set_xlabel("x"); a.set_ylabel("y"); a.set_zlabel("z"); a.view_init(20, -60); a.set_title("Sólido: dentro del cilindro r ≤ 2, entre dos paraboloides")
a.set_xticks([-2, -1, 0, 1, 2]); a.set_yticks([-2, -1, 0, 1, 2]); a.set_zticks(range(0, 13, 2))
leyenda3d(a, [Patch(color="#e34a33", alpha=.6, label="techo: z = 8 + x² + y²"), Patch(color="#3182bd", alpha=.7, label="piso: z = 4 − x² − y²"), Patch(color="#bdbdbd", alpha=.5, label="pared: x² + y² = 4")])
b = fig.add_subplot(2, 1, 2); x = np.linspace(-2, 2, 200)
b.fill_between(x, 4 - x**2, 8 + x**2, color="#9ecae1", alpha=.8)
b.plot(x, 8 + x**2, "C3", lw=2.5); b.plot(x, 4 - x**2, "C0", lw=2.5); b.plot([-2, -2], [0, 12], "k--"); b.plot([2, 2], [0, 12], "k--")
b.text(0, 8.2, "V", ha="center", fontsize=14); b.text(-1.1, 11.2, "z = 8 + r²", color="C3"); b.text(-1.2, 1.2, "z = 4 − r²", color="C0")
b.text(2.1, 2, "r = 2", rotation=90); b.set_xlim(-3, 3); b.set_ylim(0, 13); b.set_xticks(range(-3, 4)); b.set_yticks(range(0, 14)); b.set_aspect("equal"); b.grid(alpha=.3)
b.set_xlabel("x  (corte y = 0; r = |x|)"); b.set_ylabel("z"); b.set_title("Corte con el plano y = 0")
save(fig, "ej1")

# ---- Ej 2
fig = plt.figure(figsize=(7.8, 11.5), facecolor="white")
a = fig.add_subplot(2, 1, 1, projection="3d")
rr, tt = np.meshgrid(np.linspace(0, 2, 20), np.linspace(0, np.pi/2, 30)); X, Y = rr*np.cos(tt), rr*np.sin(tt)
a.plot_surface(X, Y, 8 - rr**2, color="#e34a33", alpha=.55, linewidth=0); a.plot_surface(X, Y, rr**2, color="#3182bd", alpha=.7, linewidth=0)
t1 = np.linspace(0, np.pi/2, 40)[:, None]; s = np.linspace(0, 1, 2)[None, :]
a.plot_surface(2*np.cos(t1)*np.ones_like(s), 2*np.sin(t1)*np.ones_like(s), 4*s, color="#bdbdbd", alpha=.3, linewidth=0)
a.set_xlabel("x"); a.set_ylabel("y"); a.set_zlabel("z"); a.view_init(22, -55); a.set_title("Sólido en el 1.er octante (x, y, z ≥ 0)")
a.set_xticks([0, 1, 2]); a.set_yticks([0, 1, 2]); a.set_zticks(range(0, 9, 2))
leyenda3d(a, [Patch(color="#e34a33", alpha=.6, label="techo: z = 8 − r²"), Patch(color="#3182bd", alpha=.7, label="piso: z = r²"), Patch(color="#bdbdbd", alpha=.5, label="pared: r = 2")])
b = fig.add_subplot(2, 1, 2); r = np.linspace(0, 2, 200)
b.fill_between(r, r**2, 8 - r**2, color="#9ecae1", alpha=.8)
b.plot(r, 8 - r**2, "C3", lw=2.5); b.plot(r, r**2, "C0", lw=2.5); b.plot([2, 2], [0, 8], "k--"); b.plot([2], [4], "ko")
rx = np.linspace(2, np.sqrt(8), 50); b.plot(rx, 8 - rx**2, "C3", lw=1, ls=":"); b.plot(rx, rx**2, "C0", lw=1, ls=":")
b.text(.2, 3.5, "V", fontsize=14); b.text(.05, 5.0, "z = 8 − r²", color="C3"); b.text(1.0, .2, "z = r²", color="C0"); b.text(2.08, 4.2, "(2, 4)")
b.set_xlim(0, 3); b.set_ylim(0, 8.5); b.set_xticks(range(0, 4)); b.set_yticks(range(0, 9)); b.set_aspect("equal"); b.grid(alpha=.3)
b.set_xlabel("r"); b.set_ylabel("z"); b.set_title("Corte meridiano (r ≥ 0)")
save(fig, "ej2")

# ---- Ej 3
fig, a = plt.subplots(figsize=(7.8, 7.6), facecolor="white"); x = np.linspace(-2, 1, 300)
a.fill_between(x, x**2 - 2, -x, color="#9ecae1", alpha=.8)
a.plot(x, x**2 - 2, "C0", lw=2.5, label="C₂: y = x² − 2  (x de −2 a 1)"); a.plot(x, -x, "C3", lw=2.5, label="C₁: y = −x  (x de 1 a −2)")
xx = np.linspace(-2.6, 1.6, 100); a.plot(xx, xx**2 - 2, "C0", lw=.8, ls=":"); a.plot(xx, -xx, "C3", lw=.8, ls=":")
a.annotate("", xy=(-.2, .2**2*0 + (-.2)**2 - 2), xytext=(-.6, .36 - 2), arrowprops=dict(arrowstyle="-|>", color="C0", lw=2, mutation_scale=25))
a.annotate("", xy=(-.5, .5), xytext=(.1, -.1), arrowprops=dict(arrowstyle="-|>", color="C3", lw=2, mutation_scale=25))
a.plot([-2, 1], [2, -1], "ko"); a.text(-2.5, 2.2, "(−2, 2)"); a.text(1.1, -1.35, "(1, −1)"); a.plot([0], [-2], "k.")
a.text(-.7, -.9, "D", fontsize=16); a.text(-2.4, -2.3, "sentido antihorario (+)")
a.set_xlim(-3, 2); a.set_ylim(-3, 3); a.set_xticks(range(-3, 3)); a.set_yticks(range(-3, 4)); a.set_aspect("equal"); a.grid(alpha=.3); a.axhline(0, c="k", lw=.6); a.axvline(0, c="k", lw=.6)
a.set_xlabel("x"); a.set_ylabel("y"); a.legend(fontsize=11, loc="upper center", bbox_to_anchor=(.5, -.13), frameon=False)
save(fig, "ej3")
