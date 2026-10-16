"""Utilidades compartidas por los scripts de figuras de p1-1h10-2025-09, p1-1r7-2025-10, p1-2s2-2025-06-b y p1-todas-2025-11-rec."""
import os, numpy as np, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.lines import Line2D
from matplotlib.patches import Patch, Arc
from pathlib import Path
plt.rcParams.update({"font.size": 12, "svg.fonttype": "none"})
ROOT = Path(__file__).resolve().parents[2] / "public/figuras"
AZ, RJ, VD, GR = "#3182bd", "#e34a33", "#31a354", "#636363"

def salida(idf):
    d = ROOT / idf; d.mkdir(parents=True, exist_ok=True); return d

def guardar(fig, d, n):
    fig.tight_layout(); fig.savefig(d / f"{n}.svg", format="svg", metadata={"Date": None}, bbox_inches="tight")
    if os.environ.get("PNG"): fig.savefig(f"/private/tmp/claude-501/p1r2/{d.name}_{n}.png", dpi=70, bbox_inches="tight")   # solo para revisar a ojo
    plt.close(fig)

def ejes(ax, xlim, ylim, tx=None, ty=None, lx="x", ly="y"):
    ax.set_xlim(*xlim); ax.set_ylim(*ylim); ax.set_aspect("equal"); ax.grid(alpha=.3)
    ax.set_xticks(tx if tx is not None else range(int(np.ceil(xlim[0])), int(np.floor(xlim[1])) + 1))
    ax.set_yticks(ty if ty is not None else range(int(np.ceil(ylim[0])), int(np.floor(ylim[1])) + 1))
    ax.axhline(0, c="k", lw=.8); ax.axvline(0, c="k", lw=.8); ax.set_xlabel(lx); ax.set_ylabel(ly)

def malla(xlim, ylim, n=900):
    return np.meshgrid(np.linspace(*xlim, n), np.linspace(*ylim, n))

def region(ax, mask, X, Y, color=AZ, alpha=.35):
    ax.contourf(X, Y, mask.astype(float), levels=[.5, 1.5], colors=[color], alpha=alpha, zorder=0)

def curva(ax, X, Y, F, incluido, color="k", lw=2):
    ax.contour(X, Y, F, levels=[0], colors=[color], linewidths=lw, linestyles=["solid"] if incluido else [(0, (5, 3))], zorder=3)

def leyenda_abajo(ax, hs, ncol=2):
    ax.legend(handles=hs, loc="upper center", bbox_to_anchor=(.5, -.12), ncol=ncol, fontsize=11, frameon=False)

def gradiente_fig(d, n, P, g, esc, xlim, ylim, tx=None, ty=None, S=None, Slab="S", Lnul=2.0, curva_nivel=None, tit="", unidad_ang=None, extra=None):
    """P punto, g=(zx,zy), esc=factor con el que se dibuja el gradiente (1/esc de su largo real = 1)."""
    fig, ax = plt.subplots(figsize=(7.8, 7.8), facecolor="white"); px, py = P; gx, gy = g
    ejes(ax, xlim, ylim, tx, ty)
    if curva_nivel is not None:
        X, Y = malla(xlim, ylim, 700); ax.contour(X, Y, curva_nivel(X, Y), levels=[curva_nivel(px, py)], colors=[GR], linewidths=1.4, linestyles=["dotted"], zorder=1)
    nrm = np.hypot(gx, gy); u = np.array([gx, gy]) / nrm; perp = np.array([-u[1], u[0]])
    def flecha(v, c, lw=2.4, ms=22): ax.annotate("", xy=(px + v[0], py + v[1]), xytext=(px, py), arrowprops=dict(arrowstyle="-|>", color=c, lw=lw, mutation_scale=ms), zorder=5)
    flecha(esc * np.array([gx, gy]), RJ, 3)
    ax.plot([px, px + esc*gx], [py, py], c=RJ, lw=1, ls="--"); ax.plot([px + esc*gx, px + esc*gx], [py, py + esc*gy], c=RJ, lw=1, ls="--")
    for s in (+1, -1): ax.plot([px, px + s*Lnul*perp[0]], [py, py + s*Lnul*perp[1]], c=VD, lw=2.2, ls=(0, (6, 3)), zorder=4)
    ax.plot([px, px - Lnul*u[0]], [py, py - Lnul*u[1]], c=AZ, lw=2.4, zorder=4)
    ax.annotate("", xy=(px - Lnul*u[0], py - Lnul*u[1]), xytext=(px - .4*Lnul*u[0], py - .4*Lnul*u[1]), arrowprops=dict(arrowstyle="-|>", color=AZ, lw=2.4, mutation_scale=22), zorder=5)
    if S is not None:
        sx, sy = S; flecha(np.array([sx, sy]), "#6a3d9a", 2.6)
    ax.plot([px], [py], "ko", ms=7, zorder=6)
    th = np.degrees(np.arctan2(gy, gx))
    r = .35*Lnul; ax.add_patch(Arc((px, py), 2*r, 2*r, theta1=0, theta2=th % 360 if th % 360 < 180 else th % 360, color="k", lw=1.5, zorder=4))
    return fig, ax, u, perp, th

def extremos_fig(d, n, f, xlim, ylim, pts, tit, zt=None, view=(24, -62)):
    """f(X,Y); pts=[(x,y,'Mín'|'Máx'|'Silla')]. Panel 3D arriba y curvas de nivel abajo."""
    col = {"Mín": AZ, "Máx": RJ, "Silla": VD}; mar = {"Mín": "v", "Máx": "^", "Silla": "D"}
    fig = plt.figure(figsize=(7.8, 12.5), facecolor="white"); a = fig.add_subplot(2, 1, 1, projection="3d")
    X, Y = np.meshgrid(np.linspace(*xlim, 70), np.linspace(*ylim, 70)); Z = f(X, Y)
    a.plot_surface(X, Y, Z, cmap="Greys", alpha=.55, linewidth=0, antialiased=True)
    for (px, py, t) in pts: a.scatter([px], [py], [f(px, py)], color=col[t], marker=mar[t], s=90, depthshade=False)
    a.set_xlabel("x"); a.set_ylabel("y"); a.set_zlabel("z"); a.view_init(*view); a.set_title("Superficie z = f(x, y) con sus puntos críticos")
    a.set_xticks(range(int(np.ceil(xlim[0])), int(np.floor(xlim[1])) + 1)); a.set_yticks(range(int(np.ceil(ylim[0])), int(np.floor(ylim[1])) + 1))
    if zt is not None: a.set_zticks(zt)
    b = fig.add_subplot(2, 1, 2); ejes(b, xlim, ylim)
    Xg, Yg = malla(xlim, ylim, 400); cs = b.contour(Xg, Yg, f(Xg, Yg), levels=18, cmap="Greys", linewidths=1, zorder=1)
    for (px, py, t) in pts: b.plot([px], [py], marker=mar[t], color=col[t], ms=11, ls="", zorder=5)
    b.set_title("Curvas de nivel y puntos críticos")
    hs = [Line2D([], [], marker=mar[t], color=col[t], ls="", ms=10, label=t if t != "Silla" else "Punto silla (ensilladura)") for t in ("Mín", "Máx", "Silla") if any(p[2] == t for p in pts)]
    b.legend(handles=hs, loc="upper center", bbox_to_anchor=(.5, -.14), ncol=3, fontsize=11, frameon=False)
    return fig, a, b
