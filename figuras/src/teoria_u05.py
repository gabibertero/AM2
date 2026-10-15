# U5: Teorema de Green y campo (-y,x)/(x²+y²) en R²\{0}. Uso: python3 figuras/src/teoria_u05.py
from teoria_common import *
fig, ax = plt.subplots(figsize=(7.8, 5))
x = np.linspace(0.5, 4.5, 200); f1 = 1+0.6*np.sin(x); f2 = 3.2+0.5*np.cos(1.3*x)
ax.fill_between(x, f1, f2, color="#bee3f8"); ax.plot(x, f1, AZ, lw=2.5); ax.plot(x, f2, AZ, lw=2.5)
ax.plot([x[0]]*2, [f1[0], f2[0]], AZ, lw=2.5); ax.plot([x[-1]]*2, [f1[-1], f2[-1]], AZ, lw=2.5)
for i, d in ((100, 1), (60, -1)):
    ff = f1 if d == 1 else f2
    flecha(ax, (x[i], ff[i]), (x[i+d*8], ff[i+d*8]), NA, 3)
flecha(ax, (x[-1], 1.9), (x[-1], 2.6), NA, 3); flecha(ax, (x[0], 2.6), (x[0], 1.9), NA, 3)
i = 150; sl = (f1[i+1]-f1[i-1])/(x[i+1]-x[i-1]); T = np.array([1, sl])/np.hypot(1, sl); N = np.array([T[1], -T[0]])
p = np.array([x[i], f1[i]]); flecha(ax, p, p+0.8*N, GR); flecha(ax, p, p+0.8*T, "k")
ax.text(*(p+0.95*N), "n", fontsize=14); ax.text(*(p+0.95*T+[0.1, 0.1]), "T", fontsize=14)
ax.text(2.5, 2.1, "D", fontsize=18); ax.text(0.1, 4.0, "L = ∂D, antihoraria", color=NA, fontsize=13)
ax.text(1.0, 0.5, "y = f₁(x)", color=AZ); ax.text(2.6, 3.85, "y = f₂(x)", color=AZ)
ax.set(xlim=(0, 5.2), ylim=(-0.2, 4.2), xlabel="x", ylabel="y"); ax.set_aspect("equal")
ax.set_title("Teorema de Green: D queda a la izquierda de L")
guardar(fig, "u05-green")
# --- campo con agujero
fig, ax = plt.subplots(figsize=(7.8, 6))
g = np.linspace(-2, 2, 15); X, Y = np.meshgrid(g, g); R2 = X**2+Y**2; m = R2 > 0.2
R2 = np.where(R2 == 0, 1, R2); U, V = -Y/R2, X/R2; n = np.hypot(U, V)
ax.quiver(X[m], Y[m], (U/n)[m], (V/n)[m], n[m], cmap="Blues", scale=22, width=.004)
t = np.linspace(0, 2*np.pi, 200); ax.plot(np.cos(t), np.sin(t), color=NA, lw=3)
flecha(ax, (np.cos(.3), np.sin(.3)), (np.cos(.45), np.sin(.45)), NA, 3)
ax.plot(0, 0, "o", mfc="white", mec="k", ms=10, zorder=5); ax.text(0.12, -0.3, "(0,0) no está\nen el dominio", fontsize=12)
ax.text(-1.9, 1.75, "C: x = cos t, y = sen t\n∮ F·ds = 2π ≠ 0", color=NA, fontsize=13, va="top", bbox=dict(fc="white", ec="none"))
ax.set(xlim=(-2.2, 2.2), ylim=(-2.2, 2.2), xlabel="x", ylabel="y"); ax.set_aspect("equal")
ax.set_title("F = (−y, x)/(x²+y²) en ℝ²∖{(0,0)}")
guardar(fig, "u05-campo-agujero")
