# U8: campo de direcciones de y'=2y con las curvas y=Ce^{2x}. Uso: python3 figuras/src/teoria_u08.py
from teoria_common import *
fig, ax = plt.subplots(figsize=(7.8, 5.2))
g = np.linspace(-2, 2, 21); h = np.linspace(-6, 6, 17); X, Y = np.meshgrid(g, h); S = 2*Y; n = np.hypot(1, S)
ax.quiver(X, Y, 1/n, S/n, color="#a0aec0", pivot="mid", scale=32, width=.003, headwidth=0, headlength=0, headaxislength=0)
x = np.linspace(-2, 2, 300)
for C in (-1, -.25, .25, 1): ax.plot(x, C*np.exp(2*x), AZ, lw=1.5)
ax.plot(x, 4*np.exp(2*x), NA, lw=3, label=r"$y=4e^{2x}$, por $(0,4)$")
ax.plot(0, 4, "o", color=NA); ax.plot(x, 0*x, AZ, lw=1.5, label=r"$y=Ce^{2x}$ (otras $C$)")
ax.set(xlim=(-2, 2), ylim=(-6, 6), xlabel="x", ylabel="y"); ax.set_title("Campo de direcciones de y' = 2y")
ax.legend(loc="upper center", bbox_to_anchor=(.5, -.15), ncol=2, frameon=False)
guardar(fig, "u08-campo-direcciones")
