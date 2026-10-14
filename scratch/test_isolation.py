from PIL import Image
import numpy as np

# Load robot_card.jpg
img = Image.open('public/visuals/robot_card.jpg')
rgb = np.array(img, dtype=np.float32)
r, g, b = rgb[:, :, 0], rgb[:, :, 1], rgb[:, :, 2]

# The robot is white plastic with gray/black mechanical parts.
# The background is a purple/blue studio gradient.
# Let's inspect brightness and saturation:
max_c = np.maximum(np.maximum(r, g), b)
min_c = np.minimum(np.minimum(r, g), b)
delta = max_c - min_c
# Saturation in [0, 1]
sat = np.zeros_like(delta)
mask_non_zero = max_c > 1e-5
sat[mask_non_zero] = delta[mask_non_zero] / max_c[mask_non_zero]

print('Sample robot chassis (center-chest ~ y=1000, x=950):')
print('RGB:', rgb[1000, 950], 'Sat:', sat[1000, 950], 'Max:', max_c[1000, 950])

print('Sample background (top-left y=100, x=100):')
print('RGB:', rgb[100, 100], 'Sat:', sat[100, 100], 'Max:', max_c[100, 100])

print('Sample background (top-right y=100, x=1800):')
print('RGB:', rgb[100, 1800], 'Sat:', sat[100, 1800], 'Max:', max_c[100, 1800])
