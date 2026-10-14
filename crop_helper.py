import os
from PIL import Image, ImageFilter, ImageEnhance

def generate_crystal_clear_hero():
    source_path = "public/visuals/hero-devices-transparent.backup.png"
    if not os.path.exists(source_path):
        print(f"Error: {source_path} not found")
        return

    # 1. Load Original Master Source Asset (1024 x 661 RGBA)
    img = Image.open(source_path).convert("RGBA")
    orig_w, orig_h = img.size
    print(f"Loaded master source image: {orig_w}x{orig_h}")

    # 2. 2X Retina High-Resolution Upscaling (2048 x 1322)
    target_w = 2048
    target_h = int(orig_h * (target_w / orig_w))
    print(f"Upscaling to 2K Retina: {target_w}x{target_h}...")

    # Upscale with Lanczos resampling
    upscaled = img.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # Split channels
    r, g, b, a = upscaled.split()
    rgb = Image.merge("RGB", (r, g, b))

    # 3. Clean Alpha Channel
    # Ensure all transparent areas are 100% clean alpha = 0 (no halo/fringing)
    a_pixels = a.load()
    aw, ah = a.size
    for y in range(ah):
        for x in range(aw):
            val = a_pixels[x, y]
            if val < 6:
                a_pixels[x, y] = 0

    # 4. Multi-Stage Contrast & Micro-Sharpening for Crisp Hardware & Typography
    # First stage: Micro unsharp mask (radius 1.0, percent 135) to crispen letterforms and device borders
    rgb_stage1 = rgb.filter(ImageFilter.UnsharpMask(radius=1.0, percent=135, threshold=0))
    
    # Second stage: Fine edge detail enhancement (radius 0.6, percent 60) for screen text
    rgb_stage2 = rgb_stage1.filter(ImageFilter.UnsharpMask(radius=0.6, percent=60, threshold=1))

    # Enhance contrast subtly (+3%) to make text pop against dark screens & white cards
    enhancer = ImageEnhance.Contrast(rgb_stage2)
    rgb_crisp = enhancer.enhance(1.03)

    # Recombine crisp RGB with clean Alpha
    final_rgba = Image.merge("RGBA", (rgb_crisp.split()[0], rgb_crisp.split()[1], rgb_crisp.split()[2], a))

    # 5. Save Assets in WebP and PNG
    webp_path = "public/visuals/hero-devices-sharp.webp"
    final_rgba.save(webp_path, "WEBP", quality=98, method=6)
    print(f"Saved: {webp_path} ({os.path.getsize(webp_path):,} bytes, size: {final_rgba.size})")

    png_targets = [
        "public/visuals/hero-devices-sharp.png",
        "public/visuals/hero-devices.png",
        "public/visuals/hero-devices-clean.png"
    ]
    for target in png_targets:
        final_rgba.save(target, "PNG", optimize=True)
        print(f"Saved: {target} ({os.path.getsize(target):,} bytes)")

    print("Successfully produced crystal-clear 2K hero-devices assets!")

if __name__ == "__main__":
    generate_crystal_clear_hero()
