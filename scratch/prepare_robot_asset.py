from PIL import Image
import numpy as np

source_path = r"C:\Users\MADHU\.gemini\antigravity-ide\brain\e458fac1-3d54-4811-a06e-52ffc0859663\.user_uploaded\media_1791967486766.png"
out_path = r"c:\Users\MADHU\OneDrive\Pictures\mintX\public\visuals\robot_launcher.png"

im = Image.open(source_path).convert("RGBA")

box = (520, 742, 715, 937)
crop = im.crop(box)
w, h = crop.size
arr = np.array(crop, dtype=np.uint8)

cx = 104.0
cy = 104.0

# 1. Repaint top region to eliminate all speech bubble border / shadow artifacts
for y in range(0, 30):
    for x in range(0, w):
        dist = np.hypot(x - cx, y - cy)
        if dist <= 84.0:
            fade = min(1.0, max(0.0, (dist - 55.0) / 29.0))
            arr[y, x, 0] = int(238 * (1 - fade) + 252 * fade)
            arr[y, x, 1] = int(246 * (1 - fade) + 254 * fade)
            arr[y, x, 2] = 255
            arr[y, x, 3] = 255

# 2. Antenna is between y=30 and y=60, x between 110 and 135
# Sparks are between y=42 and y=85, x between 146 and 186
mask = np.zeros((h, w), dtype=np.float32)

for y in range(h):
    for x in range(w):
        dist = np.hypot(x - cx, y - cy)
        r, g, b, a = arr[y, x]

        is_antenna = (110 <= x <= 134) and (30 <= y <= 60) and (int(b) - int(r) > 10 or int(r) < 235)
        is_sparks = (146 <= x <= 186) and (42 <= y <= 85) and (int(b) - int(r) > 20)

        if is_antenna or is_sparks:
            mask[y, x] = 1.0
        elif dist <= 83.0:
            mask[y, x] = 1.0
        elif dist <= 87.0:
            mask[y, x] = (87.0 - dist) / 4.0
        else:
            mask[y, x] = 0.0

arr[:, :, 3] = (arr[:, :, 3] * mask).astype(np.uint8)

res = Image.fromarray(arr)
res.save(out_path, format="PNG")
print("Truly perfect robot launcher generated!")
