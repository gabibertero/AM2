# U4: jacobiano (cambio de variables polares) y coordenadas esféricas. Uso: python3 figuras/src/teoria_u04.py
from teoria_common import *
# --- jacobiano: rectángulo en (r,θ) -> sector anular en (x,y)
fig, (a, b) = plt.subplots(1, 2, figsize=(7.8, 3.9))
a.fill([1, 2, 2, 1], [0.5, 0.5, 2.2, 2.2], color="#bee3f8", ec=AZ, lw=2)
a.set(xlim=(0, 2.6), ylim=(0, 2.8), xlabel="r", ylabel="θ"); a.set_title("Plano (r, θ)")
a.set_yticks([0.5, 2.2], ["θ₁", "θ₂"]); a.set_xticks([1, 2], ["r₁", "r₂"])
a.text(1.5, 1.35, "E'", ha="center", fontsize=14)
t = np.linspace(0.5, 2.2, 80)
X = np.r_[np.cos(0.5)*np.array([1, 2]), 2*np.cos(t), 2*np.cos(2.2)*1, np.cos(2.2)*np.array([2, 1]), np.cos(t[::-1])]
Y = np.r_[np.sin(0.5)*np.array([1, 2]), 2*np.sin(t), 2*np.sin(2.2)*1, np.sin(2.2)*np.array([2, 1]), np.sin(t[::-1])]
b.fill(X, Y, color="#fbd38d", ec=NA, lw=2); b.set_aspect("equal"); b.set(xlabel="x", ylabel="y", xlim=(-1.4, 2.4), ylim=(0, 2.4))
b.set_title("Plano (x, y)"); b.text(0.3, 1.2, "D", fontsize=14, ha="center")
b.text(0.9, 0.2, "|J| = r", fontsize=13, color=GR)
fig.tight_layout(); fig.subplots_adjust(wspace=.35)
fig.text(.5, -.02, "Un rectángulo de lados Δr y Δθ se transforma en un sector anular de área ≈ r·Δr·Δθ", ha="center", fontsize=12)
guardar(fig, "u04-jacobiano")
# --- esféricas (cátedra: r, φ desde +z, θ desde +x)
r, ph, th = 1.0, np.radians(50), np.radians(45)
P = r*np.array([np.sin(ph)*np.cos(th), np.sin(ph)*np.sin(th), np.cos(ph)])
Pp = np.array([P[0], P[1], 0])
fig = plt.figure(figsize=(7.8, 6.2)); ax = fig.add_subplot(projection="3d")
L = 1.1
for v, n in ((np.eye(3)[0], "x"), (np.eye(3)[1], "y"), (np.eye(3)[2], "z")):
    ax.plot(*zip(np.zeros(3), L*v), "k", lw=1.5); ax.text(*(L*1.1*v), n, fontsize=14)
ax.plot(*zip(np.zeros(3), P), color=AZ, lw=3); ax.plot(*zip(P, Pp), "--", color=GR); ax.plot(*zip(np.zeros(3), Pp), "--", color=GR)
ax.scatter(*P, color=NA, s=50, zorder=5); ax.text(*(P+[0.04, 0, 0.04]), "P", fontsize=14)
s = np.linspace(0, ph, 30); ax.plot(0.45*np.sin(s)*np.cos(th), 0.45*np.sin(s)*np.sin(th), 0.45*np.cos(s), color=NA, lw=2)
q = np.linspace(0, th, 30); ax.plot(0.35*np.cos(q), 0.35*np.sin(q), 0*q, color=NA, lw=2)
ax.text(0.2, 0.18, 0.5, "φ", color=NA, fontsize=15); ax.text(0.33, 0.1, 0, "θ", color=NA, fontsize=15)
ax.text(*(P/2+[0.05, -0.12, 0]), "r", color=AZ, fontsize=15)
ax.set(xlim=(0, 1.2), ylim=(0, 1.2), zlim=(0, 1.2)); ax.set_axis_off(); ax.view_init(18, 30); ax.set_box_aspect((1, 1, 1), zoom=1.25)
fig.text(.5, .0, "r = |OP|;  φ = ángulo con el eje z (0 ≤ φ ≤ π);\nθ = ángulo desde el eje x de la proyección en xy (0 ≤ θ ≤ 2π)\nx = r senφ cosθ,  y = r senφ senθ,  z = r cosφ,  dV = r² senφ dr dφ dθ", ha="center", fontsize=12)
guardar(fig, "u04-esfericas")
