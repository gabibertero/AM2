#!/usr/bin/env python3
"""Genera public/escaneos/<id>/f<NNN>.webp desde ../fotos-clase/2026-08-28 foto NNN.jpeg segun docs/fotos.json.
Por imagen: "rot" (grados antihorarios), "cajas" [[x0,y0,x1,y1,motivo],...] (coords 0-1 de la imagen rotada, se tapan
con gris ANTES de recortar) y "crop" [x0,y0,x1,y1]. Uso: python3 scripts/fotos.py [id ...]. Idempotente."""
import json, os, sys
from PIL import Image, ImageDraw, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAXW = 1400

def main(ids):
    man = json.load(open(os.path.join(ROOT, "docs/fotos.json"), encoding="utf-8"))
    for i in ids or man:
        out = os.path.join(ROOT, "public/escaneos", i)
        os.makedirs(out, exist_ok=True)
        for nombre, cfg in man[i].items():
            im = ImageOps.exif_transpose(Image.open(os.path.join(ROOT, "..", "fotos-clase", f"2026-08-28 foto {cfg['foto']}.jpeg"))).convert("RGB")
            if cfg.get("rot"):
                im = im.rotate(cfg["rot"], expand=True)
            d = ImageDraw.Draw(im)
            for x0, y0, x1, y1, _m in cfg.get("cajas", []):
                d.rectangle([x0 * im.width, y0 * im.height, x1 * im.width, y1 * im.height], fill="#9a9a9a")
            if cfg.get("crop"):
                x0, y0, x1, y1 = cfg["crop"]
                im = im.crop((int(x0 * im.width), int(y0 * im.height), int(x1 * im.width), int(y1 * im.height)))
            if im.width > MAXW:
                im = im.resize((MAXW, round(im.height * MAXW / im.width)), Image.LANCZOS)
            im.save(os.path.join(out, f"{nombre}.webp"), "WEBP", quality=75)
        print(i, "ok", flush=True)

if __name__ == "__main__":
    main(sys.argv[1:])
