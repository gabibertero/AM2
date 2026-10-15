# U6: Stokes y divergencia (Gauss). Uso: python3 figuras/src/teoria_u06.py
from teoria_common import *
fig = plt.figure(figsize=(7.8, 6)); ax = fig.add_subplot(projection="3d")
rr, tt = np.meshgrid(np.linspace(0, 1, 20), np.linspace(0, 2*np.pi, 60))
ax.plot_surface(rr*np.cos(tt), rr*np.sin(tt), 1-rr**2, color="#90cdf4", alpha=.55, linewidth=0)
c = np.linspace(0, 2*np.pi, 200); ax.plot(np.cos(c), np.sin(c), 0*c, color=NA, lw=3)
for a0 in (0.5, 2.5, 4.3):   # flechas de sentido antihorario sobre el borde
    ax.quiver(np.cos(a0), np.sin(a0), 0, -np.sin(a0)*.4, np.cos(a0)*.4, 0, color=NA, lw=3, arrow_length_ratio=.5)
for (x, y) in ((0.3, 0.2), (-0.4, 0.3), (0.1, -0.5)):
    z = 1-x*x-y*y; n = np.array([2*x, 2*y, 1]); n = .45*n/np.linalg.norm(n)
    ax.quiver(x, y, z, *n, color="k", lw=2.5, arrow_length_ratio=.25)
ax.text(0.45, 0.3, 1.0, "n", fontsize=15); ax.text(1.0, 0.4, 0.05, "L = ∂S", color=NA, fontsize=14); ax.text(-0.5, -0.1, 0.55, "S", fontsize=16)
ax.set_axis_off(); ax.view_init(28, -55); ax.set_box_aspect((1, 1, .6))
fig.text(.5, .1, "Mano derecha: pulgar en n, los dedos recorren L en sentido\nantihorario visto desde la punta de n.  Circulación de F sobre L = flujo de rot F por S", ha="center", fontsize=12)
guardar(fig, "u06-stokes")
# --- divergencia: cubito con flujo saliente
fig = plt.figure(figsize=(7.8, 6)); ax = fig.add_subplot(projection="3d")
import itertools
V = np.array(list(itertools.product((0, 1), repeat=3)), float)
for p, q in itertools.combinations(V, 2):
    if np.sum(p != q) == 1: ax.plot(*zip(p, q), color=GR, lw=2)
c0 = np.array([.5, .5, .5])
for k in range(3):
    for s in (-1, 1):
        d = np.zeros(3); d[k] = s
        ax.quiver(*(c0+.5*d), *(.6*d), color=NA, lw=3, arrow_length_ratio=.25)
ax.text(.5, .5, .5, "ΔV", fontsize=15, ha="center"); ax.text(1.6, .5, .5, "F·n > 0", color=NA, fontsize=13)
ax.text(-.5, .5, 1.3, "flujo saliente por cada cara", color=NA, fontsize=13)
ax.set_axis_off(); ax.set_xlim(-.7, 1.7); ax.set_ylim(-.7, 1.7); ax.set_zlim(-.7, 1.7); ax.view_init(22, -60)
fig.text(.5, .1, "div F = flujo saliente neto por unidad de volumen\nFlujo saliente por S = integral de div F sobre V (n exterior)", ha="center", fontsize=12)
guardar(fig, "u06-divergencia")
