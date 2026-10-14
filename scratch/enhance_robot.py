import os
from PIL import Image, ImageEnhance, ImageFilter

def enhance_robot_asset():
    src = "public/visuals/robot_card.jpg"
    img = Image.open(src).convert("RGB")
    w, h = img.size
    print(f"Enhancing robot asset: {w}x{h}")

    # 1. Subtle unsharp mask for pristine edge sharpness on mechanical chassis & sensors
    sharp1 = img.filter(ImageFilter.UnsharpMask(radius=1.2, percent=120, threshold=2))
    
    # 2. Subtle contrast enhancement (+4%) to make the white chassis pop against the dark backdrop
    enhancer_contrast = ImageEnhance.Contrast(sharp1)
    contrast_enhanced = enhancer_contrast.enhance(1.04)

    # 3. Subtle color saturation boost (+5%) for rich LED blue/cyan tones
    enhancer_color = ImageEnhance.Color(contrast_enhanced)
    final_img = enhancer_color.enhance(1.05)

    # Save enhanced asset
    out_path = "public/visuals/robot_card_enhanced.jpg"
    final_img.save(out_path, "JPEG", quality=96, subsampling=0)
    print(f"Saved: {out_path} ({os.path.getsize(out_path):,} bytes)")

    # Also save as WebP for lightning-fast loading
    webp_path = "public/visuals/robot_card.webp"
    final_img.save(webp_path, "WEBP", quality=96, method=6)
    print(f"Saved: {webp_path} ({os.path.getsize(webp_path):,} bytes)")

if __name__ == "__main__":
    enhance_robot_asset()
