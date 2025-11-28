# ROUGHAN - Design Guidelines

## Design Approach
**Contemporary Art Museum Aesthetic** - Strict minimalism with gallery-like presentation, high contrast, and premium feel.

## Visual Language

### Color Palette
- **Exclusive black and white only** - No grays, no colors except in brooch product images
- High contrast throughout all interfaces
- Black backgrounds for gallery moments, white for readability

### Typography
- **Modernist, geometric, sharp typefaces** (e.g., Futura, Akzidenz-Grotesk, or similar)
- "ROUGHAN" logo: Bold, architectural, statement typography
- Strict hierarchy with large size jumps between levels
- Sharp, clean letterforms with generous tracking

### Layout System
- **Strict grid alignment** - Everything snaps to grid
- **Sharp angles only** - No rounded corners anywhere
- **Large whitespace** - Breathing room is essential
- Tailwind spacing: Use 8, 12, 16, 24, 32 units for consistent rhythm
- Maximum content width: 1400px for gallery grid, 800px for text content

## Page Structures

### Homepage
- "ROUGHAN" logo: Centered, large (h1 equivalent), top of page
- **Grid layout of ready-made brooches**: 3-4 columns on desktop, masonry-style if needed
- Each brooch card: Product photo (square format), price (80-100 EUR), minimal hover state
- "Create Your Brooch" CTA: Prominent, architectural button placement
- Worldwide shipping banner: Sticky top or integrated into header

### Product Pages (Ready Brooches)
- **Large hero image**: Full-width or 2/3 viewport, sharp product photography
- Product details sidebar: Black background, white text, price prominent
- "Order via Email" button: Opens email with auto-attached photo and pre-filled template
- Minimal navigation back to grid

### Custom Brooch Generator
- **Two-step interface**: Configuration panel → Generated preview
- Configuration panel layout:
  - Size selector: S / M / L / XL (radio buttons, geometric shapes)
  - Shape selector: Visual grid of silhouettes (insects, animals, abstract forms)
  - Color picker: Multiple selection allowed, displayed as clean swatches
  - Description field: Large text area for creative input
  - "Generate Layout" button: Primary CTA
- Generated preview: Full-screen image display with "Order this Brooch" CTA
- Loading state during AI generation: Minimal, elegant spinner

### Shipping/Info Page
- Clean typography-focused layout
- Transparent policies in structured lists
- Return policy clearly outlined

## Component Library

### Buttons
- **Primary CTA**: Black background, white text, sharp rectangular
- **Secondary**: White background, black border, black text
- No rounded corners, generous padding (px-8 py-4 minimum)
- Hover: Subtle opacity shift or invert colors

### Cards (Brooch Grid)
- Sharp rectangular containers
- Product image: 1:1 aspect ratio, full bleed
- Price typography: Bold, positioned bottom-right or centered below
- Minimal border: 1px black when needed

### Forms (Generator)
- Clean input fields: White background, black border, sharp corners
- Radio/checkbox selectors: Custom geometric shapes
- Text area: Generous size, clear typography

### Navigation
- Minimal header: Logo left, language toggle (EN/DE) right
- Sticky behavior optional but clean
- No hamburger menu - direct links in horizontal layout

### Email Templates
- Auto-populate with product/generated image
- EN template: "I would like to order [brooch name/custom design]. Please confirm availability and shipping details to [address]."
- DE template: "Ich möchte [Brosche/eigenes Design] bestellen. Bitte bestätigen Sie Verfügbarkeit und Versanddetails nach [Adresse]."

## Language Toggle
- Prominent EN/DE switch in header
- All content, buttons, forms duplicated
- URL structure: `/en/` and `/de/` paths or query parameter

## Images

### Product Photography
- **Hero images**: Full-width brooch photography on product pages, sharp focus, white or black backgrounds
- **Grid thumbnails**: Square format, consistent lighting, high resolution
- **AI-generated previews**: Photorealistic render of custom brooch based on user parameters

### Image Placement
- Homepage: Grid of 12-20 brooch photos
- Product pages: 1 large hero image (2000x2000px minimum)
- Generator results: Full-screen AI-generated brooch image

## Technical Notes
- OpenAI DALL-E prompt structure: "Photorealistic handmade beaded brooch, [shape], [size], [colors], [user description], professional jewelry photography, white background, sharp focus"
- Fully responsive: Grid collapses to 2 columns tablet, 1 column mobile
- Email integration: `mailto:` links with pre-filled subject/body and image attachment capability

## Accessibility
- High contrast already built into black/white palette
- Ensure text minimum 16px base size
- Clear focus states for keyboard navigation