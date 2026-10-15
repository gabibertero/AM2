# Recup 1H10: ej1 (cono), ej2 (paraboloide), ej3 (region entre parábolas). Uso: python3 figuras/src/recup-1h10_figs.py
import numpy as np, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Patch
from pathlib import Path
out = Path(__file__).resolve().parents[2] / "public/figuras/recup-1h10"
plt.rcParams.update({"font.size": 12, "svg.fonttype": "none"})
th = np.linspace(0, 2*np.pi, 70)

def solido(fname, R, zfun, ztop, titulo, leg, zt, corte):
    fig = plt.figure(figsize=(7.8, 10.5), facecolor="white")
    a = fig.add_subplot(2, 1, 1, projection="3d")
    r, T = np.meshgrid(np.linspace(0, R, 25), th)
    a.plot_surface(r*np.cos(T), r*np.sin(T), zfun(r), color="#3182bd", alpha=.55, linewidth=0)
    a.plot_surface(r*np.cos(T), r*np.sin(T), ztop + 0*r, color="#e34a33", alpha=.45, linewidth=0)
    a.set_xlabel("x"); a.set_ylabel("y"); a.set_zlabel("z"); a.view_init(22, -55)
    a.set_xticks(range(-int(R), int(R)+1, 1 if R <= 3 else 1)); a.set_yticks(range(-int(R), int(R)+1)); a.set_zticks(zt); a.set_box_aspect((1, 1, 1))
    a.set_title(titulo)
    a.legend(handles=[Patch(color="#3182bd", alpha=.6, label=leg), Patch(color="#e34a33", alpha=.5, label=f"tapa: plano z = {ztop}")],
             loc="upper center", bbox_to_anchor=(.5, -.04), frameon=False, fontsize=11)
    b = fig.add_subplot(2, 1, 2)
    x = np.linspace(-R, R, 300)
    b.fill_between(x, zfun(np.abs(x)), ztop, color="#9ecae1", alpha=.85)
    b.plot(x, zfun(np.abs(x)), "C0", lw=2.5); b.plot([-R, R], [ztop, ztop], "C3", lw=2.5)
    b.plot([R, R], [0, ztop], "k--"); b.plot([-R, -R], [0, ztop], "k--")
    corte(b)
    b.set_xticks(range(-int(R), int(R)+1)); b.set_yticks(zt); b.set_aspect("equal"); b.grid(alpha=.3)
    b.set_xlim(-R-.5, R+.5); b.set_ylim(-.5, ztop+.7)
    b.set_xlabel("x  (corte con y = 0; vale igual en y)"); b.set_ylabel("z"); b.set_title("Corte con el plano y = 0")
    fig.tight_layout(); fig.savefig(out/fname, format="svg", metadata={"Date": None}); plt.close(fig)

def c1(b):
    b.text(0, 2.0, "sólido\n(se integra)", ha="center", fontsize=12)
    b.text(-2.9, 1.25, "cono z = r\n(piso)", color="C0", fontsize=12, ha="center")
    b.text(0, 3.25, "tapa z = 3", color="C3", fontsize=12, ha="center")
    b.text(2.75, 1.0, "r = 3", fontsize=12, ha="center")
solido("ej1.svg", 3, lambda r: r, 3, "Sólido: cono z = √(x²+y²) cerrado por z = 3", "cono z = √(x²+y²)  (piso)", [0, 1, 2, 3], c1)
def c2(b):
    b.text(0, 2.2, "sólido\n(se integra)", ha="center", fontsize=12)
    b.text(1.25, .3, "piso z = r²", color="C0", fontsize=12, ha="center")
    b.text(0, 4.25, "tapa z = 4", color="C3", fontsize=12, ha="center")
solido("ej2.svg", 2, lambda r: r**2, 4, "Sólido: paraboloide z = x²+y² cerrado por z = 4", "paraboloide z = x²+y²  (piso)", [0, 1, 2, 3, 4], c2)

# ---- Ej 3 ----
fig, c = plt.subplots(figsize=(7.8, 5.6), facecolor="white")
x = np.linspace(0, 1, 300); lo, hi = x**2 - x, -2*x**2 + 2*x
c.fill_between(x, lo, hi, color="#9ecae1", alpha=.8)
c.plot(x, lo, "C0", lw=2.8); c.plot(x, hi, "C3", lw=2.8)
def flecha(xf, f, df, col):
    d = np.array([1, df(xf)]); d = d/np.hypot(*d)
    c.annotate("", xy=(xf+.04*d[0]*(1 if col == "C0" else -1), f(xf)+.04*d[1]*(1 if col == "C0" else -1)), xytext=(xf, f(xf)),
               arrowprops=dict(arrowstyle="-|>", color=col, lw=2, mutation_scale=18))
flecha(.5, lambda t: t*t-t, lambda t: 2*t-1, "C0"); flecha(.5, lambda t: -2*t*t+2*t, lambda t: -4*t+2, "C3")
c.plot([0, 1], [0, 0], "ko")
c.text(-.02, .07, "(0, 0)", ha="right", fontsize=12); c.text(1.02, .07, "(1, 0)", ha="left", fontsize=12)
c.text(.5, .03, "región D", ha="center", fontsize=12)
c.text(.5, -.34, "C₁: y = x(x−1)  (de 0 a 1)", color="C0", fontsize=12, ha="center")
c.text(.5, .56, "C₂: y = −2x²+2x  (de 1 a 0)", color="C3", fontsize=12, ha="center")
c.set_xticks(np.arange(-.25, 1.51, .25)); c.set_yticks(np.arange(-.5, .76, .25)); c.set_aspect("equal"); c.grid(alpha=.3)
c.set_xlim(-.25, 1.35); c.set_ylim(-.4, .68)
c.set_xlabel("x"); c.set_ylabel("y"); c.set_title("Trayectoria cerrada, sentido antihorario (+)")
fig.tight_layout(); fig.savefig(out/"ej3.svg", format="svg", metadata={"Date": None})
