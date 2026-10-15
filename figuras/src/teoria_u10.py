# U10: modos normales de la cuerda vibrante. Uso: python3 figuras/src/teoria_u10.py
from teoria_common import *
fig, ax = plt.subplots(3, 1, figsize=(7.8, 7.5), sharex=True); x = np.linspace(0, 1, 300)
for n, a in zip((1, 2, 3), ax):
    a.plot(x, np.sin(n*np.pi*x), AZ, lw=2.5); a.plot(x, -np.sin(n*np.pi*x), AZ, lw=1, ls="--")
    a.plot(np.arange(0, n+1)/n, np.zeros(n+1), "o", color=NA, ms=8); a.axhline(0, color="k", lw=.8)
    a.set_ylabel(f"n = {n}"); a.set_ylim(-1.3, 1.3); a.set_title(f"sen(nπx/l), {n-1} nodo(s) interior(es)" if n > 1 else "sen(πx/l), sin nodos interiores", fontsize=12)
ax[2].set_xticks([0, .5, 1], ["0", "l/2", "l"]); ax[2].set_xlabel("x (extremos fijos: u(0,t) = u(l,t) = 0)")
fig.tight_layout()
guardar(fig, "u10-cuerda-modos")
