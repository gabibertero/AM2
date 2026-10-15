# Estilo común de las figuras de teoría (docs/estandar-soluciones.md).
import numpy as np, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from pathlib import Path
OUT = Path(__file__).resolve().parents[2] / "public/figuras/teoria"
OUT.mkdir(parents=True, exist_ok=True)
plt.rcParams.update({"font.size": 12, "svg.fonttype": "none", "figure.facecolor": "white", "axes.facecolor": "white"})
AZ, NA, GR = "#2b6cb0", "#dd6b20", "#555555"
def guardar(fig, nombre):
    fig.savefig(OUT / f"{nombre}.svg", bbox_inches="tight", facecolor="white"); plt.close(fig)
def flecha(ax, p, q, c=GR, lw=2, **k):
    ax.annotate("", xy=q, xytext=p, arrowprops=dict(arrowstyle="-|>", color=c, lw=lw, **k))
