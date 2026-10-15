# Recup 20/11/2025: ej1 (esféricas, 3D + corte) y ej2 (cicloide). Uso: python3 figuras/src/recup-2025_figs.py
import numpy as np, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from pathlib import Path
out = Path(__file__).resolve().parents[2] / "public/figuras/recup-2025-11-20"
plt.rcParams.update({"font.size": 12, "svg.fonttype": "none"})

# ---------- Ej 1 ----------
fig = plt.figure(figsize=(7.8, 11), facecolor="white")
a = fig.add_subplot(2, 1, 1, projection="3d")
th = np.linspace(0, np.pi/2, 40)
# esfera r=2 y r=1 (parte con z >= cono, o sea phi <= pi/4), en el 1º octante
ph = np.linspace(0, np.pi/4, 25)
T, P = np.meshgrid(th, ph)
for R, col in ((2, "#3182bd"), (1, "#e6550d")):
    a.plot_surface(R*np.sin(P)*np.cos(T), R*np.sin(P)*np.sin(T), R*np.cos(P), color=col, alpha=.55, linewidth=0)
# cono z = r para phi = pi/4, entre rho=1 y rho=2
rho = np.linspace(1, 2, 8); T2, R2 = np.meshgrid(th, rho)
a.plot_surface(R2*np.sin(np.pi/4)*np.cos(T2), R2*np.sin(np.pi/4)*np.sin(T2), R2*np.cos(np.pi/4)+0*T2, color="#31a354", alpha=.55, linewidth=0)
# planos x=0 e y=0 (tapas del 1º octante)
for ang in (0, np.pi/2):
    P2, R3 = np.meshgrid(ph, rho)
    a.plot_surface(R3*np.sin(P2)*np.cos(ang), R3*np.sin(P2)*np.sin(ang), R3*np.cos(P2), color="#bdbdbd", alpha=.45, linewidth=0)
a.set_xlabel("x"); a.set_ylabel("y"); a.set_zlabel("z"); a.view_init(24, 35)
a.set_xticks([0, 1, 2]); a.set_yticks([0, 1, 2]); a.set_zticks([0, 1, 2]); a.set_box_aspect((1, 1, 1))
a.set_title("Región V: 1º octante, entre las esferas ρ=1 y ρ=2, sobre el cono")
from matplotlib.patches import Patch
a.legend(handles=[Patch(color="#3182bd", alpha=.6, label="esfera ρ = 2 (techo)"), Patch(color="#e6550d", alpha=.6, label="esfera ρ = 1 (piso)"),
                  Patch(color="#31a354", alpha=.6, label="cono z = √(x²+y²)  (φ = π/4)"), Patch(color="#bdbdbd", alpha=.6, label="planos x = 0 e y = 0")],
         loc="upper center", bbox_to_anchor=(.5, -.06), frameon=False, fontsize=11, ncol=2)
b = fig.add_subplot(2, 1, 2)
p = np.linspace(0, np.pi/4, 100)
b.fill(np.r_[2*np.sin(p), 1*np.sin(p[::-1])], np.r_[2*np.cos(p), np.cos(p[::-1])], color="#9ecae1", alpha=.8)
b.plot(2*np.sin(p), 2*np.cos(p), "C0", lw=2.5); b.plot(np.sin(p), np.cos(p), "C1", lw=2.5)
b.plot([0, 2.3], [0, 2.3], "C2", lw=2.5); b.plot([0, 0], [0, 2.3], "k", lw=1)
b.text(.15, 1.45, "región\n(se integra)", fontsize=12, ha="left")
b.text(1.75, 2.12, "φ = π/4", color="C2", fontsize=12, rotation=0)
b.text(1.15, 1.95, "ρ = 2", color="C0", fontsize=12); b.text(.35, .72, "ρ = 1", color="C1", fontsize=12, ha="right")
b.set_xticks([0, 1, 2]); b.set_yticks([0, 1, 2]); b.set_xlim(-.2, 2.4); b.set_ylim(-.2, 2.4); b.set_aspect("equal"); b.grid(alpha=.3)
b.set_xlabel("r = √(x²+y²)  (distancia al eje z)"); b.set_ylabel("z"); b.set_title("Corte con un semiplano θ = constante")
fig.tight_layout(); fig.savefig(out/"ej1.svg", format="svg", metadata={"Date": None}); plt.close(fig)

# ---------- Ej 2 ----------
fig, c = plt.subplots(figsize=(7.8, 4.4), facecolor="white")
t = np.linspace(0, 2*np.pi, 400)
c.plot(t - np.sin(t), 1 - np.cos(t), "C0", lw=2.8)
for tt in (np.pi/2, 3*np.pi/2):
    x0, y0 = tt-np.sin(tt), 1-np.cos(tt); d = np.array([1-np.cos(tt), np.sin(tt)]); d = d/np.hypot(*d)
    c.annotate("", xy=(x0+.12*d[0], y0+.12*d[1]), xytext=(x0-.12*d[0], y0-.12*d[1]), arrowprops=dict(arrowstyle="-|>", color="C0", lw=2, mutation_scale=18))
pts = {"θ = 0": (0, 0, -.1, -.25, "center"), "θ = π": (np.pi, 2, 0, .12, "center"), "θ = 2π": (2*np.pi, 0, 0, -.25, "center")}
for k, (x0, y0, dx, dy, ha) in pts.items():
    c.plot(x0, y0, "ko"); c.text(x0+dx, y0+dy, k, ha=ha, fontsize=12)
c.text(np.pi, .7, "sentido de recorrido: θ creciente (→)", fontsize=11, ha="center")
c.set_xticks(range(0, 7)); c.set_yticks([0, 1, 2]); c.set_xlim(-.6, 6.9); c.set_ylim(-.6, 2.5); c.set_aspect("equal"); c.grid(alpha=.3)
c.set_xlabel("x = θ − sen θ"); c.set_ylabel("y = 1 − cos θ"); c.set_title("Un arco de cicloide, 0 ≤ θ ≤ 2π  (π ≈ 3,14; 2π ≈ 6,28)")
fig.tight_layout(); fig.savefig(out/"ej2.svg", format="svg", metadata={"Date": None})
