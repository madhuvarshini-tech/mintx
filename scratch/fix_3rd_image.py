import os
from PIL import Image, ImageFilter, ImageEnhance

input_path = r"C:\Users\MADHU\.gemini\antigravity-ide\brain\f72bd81b-84d9-4d17-ada2-6d45c188ce15\mintxqr_phone_sharp_1791883713905.jpg"
if not os.path.exists(input_path):
    print("Error: input file not found")
    exit(1)

# Open image
img = Image.open(input_path).convert("RGB")
print("Original size:", img.size)

# Apply gentle high-frequency sharpening for razor-sharp typography and screen elements
sharp_img = img.filter(ImageFilter.UnsharpMask(radius=1.1, percent=140, threshold=0))

# Subtly enhance contrast (+2%)
enhancer = ImageEnhance.Contrast(sharp_img)
final_img = enhancer.enhance(1.02)

# Save to public/visuals/mintxqr-phone.jpg (high quality 95)
output_jpg = "public/visuals/mintxqr-phone.jpg"
final_img.save(output_jpg, "JPEG", quality=95, optimize=True)
print(f"Saved: {output_jpg} ({os.path.getsize(output_jpg):,} bytes)")

# Save to public/visuals/mintxqr-phone.webp
output_webp = "public/visuals/mintxqr-phone.webp"
final_img.save(output_webp, "WEBP", quality=98, method=6)
print(f"Saved: {output_webp} ({os.path.getsize(output_webp):,} bytes)")

print("Successfully updated 3rd image to crystal-clear high-definition!")
