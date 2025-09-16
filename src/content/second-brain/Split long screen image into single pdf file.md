---
publish: true
date: 2025-09-16
slug: split-long-screen-image-into-single-pdf-file
title: Split long screen image into single pdf file
filepath: src/content/second-brain/Split long screen image into single pdf file.md
---

I captured a long table from a website and want to make a PDF file from it. Saving page as HTML or using web clipper does not work since the table resides within a floating modal.

So I captured scrolling region with Cleanshot X and use this script to split the image (4,000 x 73,000 px) into 30 pages PDF. Each page has a dimension of 16:9.

```shell
INPUT=/path/to/screen.png
OUTPUT=/path/to/output.pdf

# Get image width
WIDTH=$(magick identify -format "%w" "$INPUT")

# Calculate height
HEIGHT=$((WIDTH * 9 / 16))

# Convert with ImageMagick
magick convert "$INPUT" -crop "${WIDTH}x${HEIGHT}" +repage "$OUTPUT"
```
