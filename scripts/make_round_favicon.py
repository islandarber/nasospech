"""Generate a round, lightweight favicon from the logo.

Browsers render a favicon exactly as the image file is, so to make the icon
appear round we cut the corners out (transparent) with a circular alpha mask.
We supersample the mask for smooth (anti-aliased) edges, then downscale.
"""
from PIL import Image, ImageDraw
import os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SRC = os.path.join(ROOT, "src", "assets", "logo.png")
OUT_PNG = os.path.join(ROOT, "public", "favicon.png")
OUT_ICO = os.path.join(ROOT, "public", "favicon.ico")

SIZE = 180          # output px
SS = SIZE * 4       # supersample factor for a smooth circle

img = Image.open(SRC).convert("RGBA")

# Center-crop to a square (logo is already square, but be safe).
w, h = img.size
m = min(w, h)
left, top = (w - m) // 2, (h - m) // 2
img = img.crop((left, top, left + m, top + m)).resize((SS, SS), Image.LANCZOS)

# Circular mask.
mask = Image.new("L", (SS, SS), 0)
ImageDraw.Draw(mask).ellipse((0, 0, SS, SS), fill=255)
img.putalpha(mask)

img = img.resize((SIZE, SIZE), Image.LANCZOS)
img.save(OUT_PNG)
img.save(OUT_ICO, sizes=[(16, 16), (32, 32), (48, 48)])

print(f"Wrote {OUT_PNG} ({os.path.getsize(OUT_PNG)} bytes)")
print(f"Wrote {OUT_ICO} ({os.path.getsize(OUT_ICO)} bytes)")
