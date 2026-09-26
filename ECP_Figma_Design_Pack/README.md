# ECP Voter Education — Website Design

Website layouts adapted from the three supplied references, preserving their original illustrations, ECP emblem, and green, blue, purple, and yellow visual palette.

## Included

- Learn about voting: desktop (1440 px) and mobile (390 px).
- Voter awareness quiz: desktop and mobile.
- Your voting journey: desktop and mobile.
- Design system: color palette, typography, buttons, and answer-option states.
- Original JPEG references, unchanged.
- Separate SVG layouts, PNG previews, and a native Figma layer importer.

## Quick import: SVG layouts

1. Open a Figma Design file.
2. Drag the seven files from `svg/` onto the canvas.
3. Arrange the desktop and mobile frames as desired.

SVG import preserves shapes and embedded graphics, but Figma may outline SVG text. Use the native importer below when you need editable text and component instances.

## Native Figma layers: recommended for editing

1. Open the **Figma desktop app** and create or open a Design file.
2. Choose **Plugins → Development → New Plugin**, then choose **Figma Design** and a **Run once** template. Save the plugin folder.
3. Replace the generated `code.js` with `figma-plugin/code.js` from this pack. Keep Figma's generated `manifest.json` and its assigned `id`. No compilation is required.
4. Check that the generated manifest points `main` to `code.js`, sets `editorType` to `["figma"]`, and sets `documentAccess` to `"dynamic-page"`. The bundled `manifest-settings.json` lists the intended settings; merge these settings into the generated manifest while retaining its Figma-assigned `id`.
5. Run the new plugin from **Plugins → Development**. It creates a new page named **ECP • Website design**, with six website layouts, a design-system sheet, reusable button components, color styles, and the three original references.

The importer embeds the original images and needs no network access. It creates new content without changing existing pages. Primary home-page buttons link to the quiz and game layouts.

Figma documentation: https://help.figma.com/hc/en-us/articles/360042786733-Create-a-classic-plugin-for-development
Plugin API: https://developers.figma.com/docs/plugins/

## Editing details

- Website headings, descriptions, options, labels, buttons, cards, and progress bars are individual editable nodes in the native import.
- Images are the supplied JPEGs in editable clipping frames; embedded lettering within those images remains raster artwork. No regenerated illustrations are used.
- The importer uses Inter; the PNG previews use the locally available sans-serif fallback, so minor text-metric differences can occur.
- The SVGs and native frames are design mockups, not a deployed website. The native importer includes basic navigation links, not quiz scoring or a working game.
- Desktop shows all quiz questions and the eight-step journey. Mobile shows one active question/stage with progress and journey navigation.
- Copy has been lightly shortened for website layout, including “assigned polling station.”

## Verification

All seven layouts were rendered and visually checked. Text widths and frame bounds were checked. The three bundled source JPEGs match the uploads byte for byte. The importer passed JavaScript syntax validation; direct execution in Figma could not be verified because the Figma creation tools were not exposed in this session.

## Source

`source/design-data.json` holds the layout descriptions and embedded artwork. `source/build_design.py` creates the SVGs from the uploaded references; `source/figma-runtime.js` is the native Figma layer builder.
