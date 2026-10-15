# 2S2 Tema B: ej1 (volumen), ej2 (integral triple), ej3 (región entre parábolas). Uso: python3 figuras/src/2s2b_figuras.py
import numpy as np, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Patch
from pathlib import Path
out = Path(__file__).resolve().parents[2] / "public/figuras/2s2b"
plt.rcParams.update({"font.size": 12, "svg.fonttype": "none"})
def save(fig, n): fig.tight_layout(); fig.savefig(out / f"{n}.svg", format="svg", metadata={"Date": None}); plt.close(fig)
def leyenda3d(a, hs): a.legend(handles=hs, loc="upper center", bbox_to_anchor=(.5, -.02), fontsize=11, frameon=False)

# ---- Ej 1
fig = plt.figure(figsize=(7.8, 11.5), facecolor="white")
a = fig.add_subplot(2, 1, 1, projection="3d")
xs, ts = np.meshgrid(np.linspace(-1, 1, 40), np.linspace(0, 1, 20)); Y = ts*(1 - xs**2)
a.plot_surface(xs, Y, Y + 2, color="#e34a33", alpha=.55, linewidth=0); a.plot_surface(xs, Y, np.ones_like(Y), color="#3182bd", alpha=.6, linewidth=0)
xw = np.linspace(-1, 1, 40)[:, None]; s = np.linspace(0, 1, 2)[None, :]; yw = (1 - xw**2)*np.ones_like(s)
a.plot_surface(xw*np.ones_like(s), yw, 1 + s*(yw + 1), color="#bdbdbd", alpha=.35, linewidth=0)
a.set_xlabel("x"); a.set_ylabel("y"); a.set_zlabel("z"); a.view_init(22, -65); a.set_title("Sólido: bajo el plano z = y + 2, sobre z = 1")
a.set_xticks([-1, 0, 1]); a.set_yticks([0, 1]); a.set_zticks([1, 2, 3])
leyenda3d(a, [Patch(color="#e34a33", alpha=.6, label="techo: z = y + 2"), Patch(color="#3182bd", alpha=.6, label="piso: z = 1"), Patch(color="#bdbdbd", alpha=.5, label="pared: cilindro parabólico y = 1 − x²")])
b = fig.add_subplot(2, 1, 2); x = np.linspace(-1, 1, 200)
b.fill_between(x, 0, 1 - x**2, color="#9ecae1", alpha=.8); b.plot(x, 1 - x**2, "C0", lw=2.5); b.plot([-1.3, 1.3], [0, 0], "C3", lw=2.5)
b.plot([-1, 1, 0], [0, 0, 1], "ko"); b.text(-.1, .3, "D", fontsize=16); b.text(.05, 1.03, "(0, 1)"); b.text(.7, .7, "y = 1 − x²", color="C0"); b.text(-1.28, .05, "(−1, 0)"); b.text(.88, .05, "(1, 0)")
b.text(-1.25, -.2, "y = 0  (lado inferior)", color="C3")
b.set_xlim(-1.5, 1.5); b.set_ylim(-.3, 1.3); b.set_xticks([-1, 0, 1]); b.set_yticks([0, 1]); b.set_aspect("equal"); b.grid(alpha=.3)
b.set_xlabel("x"); b.set_ylabel("y"); b.set_title("Proyección D sobre el plano xy")
save(fig, "ej1")

# ---- Ej 2
fig = plt.figure(figsize=(7.8, 11.5), facecolor="white")
a = fig.add_subplot(2, 1, 1, projection="3d")
rr, tt = np.meshgrid(np.linspace(0, 1, 20), np.linspace(0, 2*np.pi, 60)); X, Y = rr*np.cos(tt), rr*np.sin(tt)
a.plot_surface(X, Y, rr**2 + 2, color="#e34a33", alpha=.55, linewidth=0); a.plot_surface(X, Y, np.sqrt(4 - rr**2), color="#3182bd", alpha=.7, linewidth=0)
t1 = np.linspace(0, 2*np.pi, 80)[:, None]; s = np.linspace(0, 1, 2)[None, :]
a.plot_surface(np.cos(t1)*np.ones_like(s), np.sin(t1)*np.ones_like(s), np.sqrt(3) + s*(3 - np.sqrt(3)), color="#bdbdbd", alpha=.3, linewidth=0)
a.set_xlabel("x"); a.set_ylabel("y"); a.set_zlabel("z"); a.view_init(20, -60); a.set_title("Sólido: dentro del cilindro r ≤ 1, sobre la esfera y bajo el paraboloide")
a.set_xticks([-1, 0, 1]); a.set_yticks([-1, 0, 1]); a.set_zticks([0, 1, 2, 3])
leyenda3d(a, [Patch(color="#e34a33", alpha=.6, label="techo: z = r² + 2"), Patch(color="#3182bd", alpha=.7, label="piso: esfera z = √(4 − r²)"), Patch(color="#bdbdbd", alpha=.5, label="pared: r = 1")])
b = fig.add_subplot(2, 1, 2); r = np.linspace(0, 1, 200)
b.fill_between(r, np.sqrt(4 - r**2), r**2 + 2, color="#9ecae1", alpha=.8); b.plot(r, r**2 + 2, "C3", lw=2.5); b.plot(r, np.sqrt(4 - r**2), "C0", lw=2.5); b.plot([1, 1], [0, 3.4], "k--")
re = np.linspace(1, 2, 50); b.plot(re, np.sqrt(4 - re**2), "C0", lw=1, ls=":"); b.plot(r, np.sqrt(4 - r**2)*0, "w", lw=0)
b.plot([1, 1], [np.sqrt(3), 3], "ko"); b.text(1.04, 3.05, "(1, 3)"); b.text(1.04, 1.55, "(1, √3)"); b.text(.12, 2.55, "V", fontsize=14)
b.text(.05, 3.0, "z = r² + 2", color="C3"); b.text(.1, 1.6, "esfera", color="C0"); b.text(1.04, .3, "r = 1")
b.set_xlim(0, 2.2); b.set_ylim(0, 3.6); b.set_xticks([0, 1, 2]); b.set_yticks([0, 1, 2, 3]); b.set_aspect("equal"); b.grid(alpha=.3)
b.set_xlabel("r"); b.set_ylabel("z"); b.set_title("Corte meridiano (r ≥ 0)")
save(fig, "ej2")

# ---- Ej 3
fig, a = plt.subplots(figsize=(7.8, 6.6), facecolor="white"); x = np.linspace(-2, 2, 300)
a.fill_between(x, -x**2/2 + 2, -x**2 + 4, color="#9ecae1", alpha=.8)
a.plot(x, -x**2 + 4, "C3", lw=2.5, label="C₁: y = −x² + 4  (x de 2 a −2)"); a.plot(x, -x**2/2 + 2, "C0", lw=2.5, label="C₂: y = −x²/2 + 2  (x de −2 a 2)")
xx = np.linspace(-2.5, 2.5, 100); a.plot(xx, -xx**2 + 4, "C3", lw=.8, ls=":"); a.plot(xx, -xx**2/2 + 2, "C0", lw=.8, ls=":")
a.annotate("", xy=(1.1, -1.21/2 + 2), xytext=(.7, -.49/2 + 2), arrowprops=dict(arrowstyle="-|>", color="C0", lw=2, mutation_scale=25))
a.annotate("", xy=(-1.2, -1.44 + 4), xytext=(-.8, -.64 + 4), arrowprops=dict(arrowstyle="-|>", color="C3", lw=2, mutation_scale=25))
a.plot([-2, 2, 0, 0], [0, 0, 4, 2], "ko"); a.text(-2.4, .2, "(−2, 0)"); a.text(2.05, .2, "(2, 0)"); a.text(.1, 4.1, "(0, 4)"); a.text(.1, 1.6, "(0, 2)")
a.text(-.3, 2.8, "D", fontsize=16); a.text(-1.2, -.7, "sentido antihorario (+)")
a.set_xlim(-3, 3); a.set_ylim(-1, 4.8); a.set_xticks(range(-3, 4)); a.set_yticks(range(-1, 5)); a.set_aspect("equal"); a.grid(alpha=.3)
a.set_xlabel("x"); a.set_ylabel("y"); a.legend(fontsize=11, loc="upper center", bbox_to_anchor=(.5, -.14), frameon=False)
save(fig, "ej3")
