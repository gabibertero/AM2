# U9: tres familias de y_h. Uso: python3 figuras/src/teoria_u09.py
from teoria_common import *
fig, ax = plt.subplots(3, 1, figsize=(7.8, 9)); x = np.linspace(0, 3, 400)
ax[0].plot(x, np.exp(-x)+0.5*np.exp(x), AZ, lw=2.5, label=r"$C_1e^{k_1x}+C_2e^{k_2x}$"); ax[0].plot(x, np.exp(-x), "--", color=GR); ax[0].plot(x, .5*np.exp(x), "--", color=GR)
ax[0].set_title("Raíces reales distintas (k₁ = −1, k₂ = 1)"); ax[0].set_ylim(-1, 12)
ax[1].plot(x, (1+1.5*x)*np.exp(-x), AZ, lw=2.5, label=r"$(C_1+C_2x)e^{kx}$"); ax[1].plot(x, np.exp(-x), "--", color=GR)
ax[1].set_title("Raíz doble (k = −1)")
ax[2].plot(x, np.exp(-.5*x)*np.cos(4*x), AZ, lw=2.5, label=r"$e^{\alpha x}(C_1\cos\beta x+C_2\sin\beta x)$")
ax[2].plot(x, np.exp(-.5*x), "--", color=NA, label=r"envolvente $\pm e^{\alpha x}$"); ax[2].plot(x, -np.exp(-.5*x), "--", color=NA)
ax[2].set_title("Raíces complejas k = α ± βi (α = −0,5; β = 4)")
for a in ax:
    a.axhline(0, color="k", lw=.8); a.set(xlabel="x", ylabel="y"); a.legend(loc="upper right", frameon=False)
fig.tight_layout(h_pad=2)
guardar(fig, "u09-yh-tres-casos")
