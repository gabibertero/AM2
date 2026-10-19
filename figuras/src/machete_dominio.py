import numpy as np, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.lines import Line2D
from matplotlib.patches import Patch
plt.rcParams.update({"svg.fonttype": "none", "font.size": 12, "mathtext.fontset": "dejavusans", "figure.facecolor": "white", "axes.facecolor": "white"})
AZ, NA = "#1f5fa8", "#d9822b"
OUT = "public/figuras/machetes/"

def base(xl, yl, tx, ty):
    fig, ax = plt.subplots(figsize=(7.8, 7.8 * (yl[1]-yl[0]) / (xl[1]-xl[0]) + 0.9))
    ax.set_xlim(xl); ax.set_ylim(yl); ax.set_aspect("equal")
    ax.set_xticks(tx); ax.set_yticks(ty); ax.grid(alpha=.25)
    ax.set_xlabel("$x$"); ax.set_ylabel("$y$")
    ax.axhline(0, c="k", lw=.8); ax.axvline(0, c="k", lw=.8)
    return fig, ax

def grid(xl, yl):
    return np.meshgrid(np.linspace(*xl, 1200), np.linspace(*yl, 1200))

def leyenda(ax, h):
    ax.legend(handles=h, loc="upper center", bbox_to_anchor=(.5, -.14), ncol=2, frameon=False, fontsize=12)

def save(fig, n):
    fig.savefig(OUT + n, format="svg", bbox_inches="tight"); plt.close(fig)

# Figura 1: y>=x^2 y x^2+y^2>1
xl, yl = (-2.6, 2.6), (-1, 3)
fig, ax = base(xl, yl, range(-2, 3), range(-1, 4))
X, Y = grid(xl, yl)
ax.contourf(X, Y, ((Y >= X**2) & (X**2 + Y**2 > 1)).astype(float), levels=[.5, 1.5], colors=[AZ], alpha=.3)
x = np.linspace(-1.74, 1.74, 400); ax.plot(x, x**2, c=AZ, lw=2)
t = np.linspace(0, 2*np.pi, 400); ax.plot(np.cos(t), np.sin(t), c=NA, lw=2, ls=(0, (3, 3)))
yc = (-1 + 5**.5) / 2; xc = yc**.5
for s in (-1, 1):
    ax.plot(s*xc, yc, "ko", ms=5)
    ax.annotate(f"$({s*xc:.3f};\\ {yc:.3f})$".replace(".", "{,}"), (s*xc, yc), xytext=(s*1.25, 0.15), textcoords="data",
                ha="left" if s > 0 else "right", arrowprops=dict(arrowstyle="-", color="k"))
leyenda(ax, [Line2D([], [], c=AZ, lw=2, label="$y=x^2$ (llena, incluida)"),
             Line2D([], [], c=NA, lw=2, ls=(0, (3, 3)), label="$x^2+y^2=1$ (punteada, excluida)"),
             Patch(fc=AZ, alpha=.3, label="$D_f$")])
save(fig, "dominio-1.svg")

# Figura 2: a=1
xl, yl = (-5, 5), (-4, 4)
fig, ax = base(xl, yl, range(-5, 6), range(-4, 5))
X, Y = grid(xl, yl)
N = X**2/9 + Y**2/4 - 1; D = 1 - X**2 + Y**2/4
ax.contourf(X, Y, (((N >= 0) & (D > 0)) | ((N <= 0) & (D < 0))).astype(float), levels=[.5, 1.5], colors=[AZ], alpha=.3)
t = np.linspace(0, 2*np.pi, 600); ax.plot(3*np.cos(t), 2*np.sin(t), c=AZ, lw=2)
u = np.linspace(-1.9, 1.9, 400)
for s in (-1, 1): ax.plot(s*np.cosh(u), 2*np.sinh(u), c=NA, lw=2, ls=(0, (3, 3)))
px, py = 3/5**.5, 4/5**.5
for sx in (-1, 1):
    for sy in (-1, 1):
        ax.plot(sx*px, sy*py, "ko", ms=5)
        ax.annotate(f"$({sx*px:.2f};\\ {sy*py:.2f})$".replace(".", "{,}"), (sx*px, sy*py),
                    xytext=(sx*38, sy*22), textcoords="offset points", ha="center", va="center", fontsize=12,
                    arrowprops=dict(arrowstyle="-", color="k"))
leyenda(ax, [Line2D([], [], c=AZ, lw=2, label="elipse $N=0$ (llena, incluida)"),
             Line2D([], [], c=NA, lw=2, ls=(0, (3, 3)), label="hipérbola $D=0$ (punteada, excluida)"),
             Patch(fc=AZ, alpha=.3, label="$D_f$ ($a=1$)")])
save(fig, "dominio-2.svg")
