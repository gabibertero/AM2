#!/usr/bin/env python3
"""Genera public/escaneos/<id>/p<N>.webp desde los PDFs originales (../<fuente>) segun docs/escaneos.json.
Por pagina: "rot" (grados, opcional), "cajas" [[x0,y0,x1,y1,motivo],...] en coords relativas 0-1 de la pagina
(ya rotada) a tapar con gris, y "crop" [x0,y0,x1,y1] opcional (se aplica DESPUES de tapar).
Uso: python3 scripts/escaneos.py [id ...]   (sin args: todos). Idempotente: pisa los .webp."""
import json, os, sys
import fitz
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAXW = 1400

def main(ids):
    man = json.load(open(os.path.join(ROOT, "docs/escaneos.json"), encoding="utf-8"))
    for i in ids or man:
        doc = fitz.open(os.path.join(ROOT, "..", man[i]["fuente"]))
        os.makedirs(os.path.join(ROOT, "public/escaneos", i), exist_ok=True)
        for n, cfg in man[i]["paginas"].items():
            page = doc[int(n) - 1]
            pm = page.get_pixmap(matrix=fitz.Matrix(MAXW / page.rect.width, MAXW / page.rect.width), alpha=False)
            im = Image.frombytes("RGB", (pm.width, pm.height), pm.samples)
            if cfg.get("rot"):
                im = im.rotate(-cfg["rot"], expand=True)
            d = ImageDraw.Draw(im)
            for x0, y0, x1, y1, _motivo in cfg.get("cajas", []):
                b = [x0 * im.width, y0 * im.height, x1 * im.width, y1 * im.height]
                d.rectangle(b, fill="#9a9a9a")
                f = ImageFont.load_default(size=max(10, min(16, int((b[3] - b[1]) / 3))))
                d.text((b[0] + 6, b[1] + 4), "dato personal oculto", fill="#333333", font=f)
            if cfg.get("crop"):
                x0, y0, x1, y1 = cfg["crop"]
                im = im.crop((int(x0 * im.width), int(y0 * im.height), int(x1 * im.width), int(y1 * im.height)))
            if im.width > MAXW:
                im = im.resize((MAXW, round(im.height * MAXW / im.width)), Image.LANCZOS)
            im.save(os.path.join(ROOT, "public/escaneos", i, f"p{n}.webp"), "WEBP", quality=70)
        print(i, "ok", flush=True)

if __name__ == "__main__":
    main(sys.argv[1:])
