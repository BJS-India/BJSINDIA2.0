# Resources images and articles

Add original images here as PNG, JPG, JPEG, or WebP (uppercase extensions work too). Refresh after saving. The page automatically detects these filename stems:

| Image | Filename stem |
| --- | --- |
| October 2026 Darpan | darpan-2026-10 |
| September 2026 Darpan | darpan-2026-09 |
| August 2026 Darpan | darpan-2026-08 |
| July 2026 Darpan | darpan-2026-07 |
| June 2026 Darpan | darpan-2026-06 |
| Article photos | article-1, article-2, article-3 |
| Video thumbnail | media-videos |
| Press clipping | media-press |
| Gallery photo | media-gallery |
| Report cover | collateral-reports |
| Program brochure | collateral-program-brochures |
| VVIPs video | collateral-vvip-videos |
| Brochure cover | collateral-brochures |

Darpan's right arrow and cover cards open the existing `/alldarpans` library. Its PDF data remains in `src/Darpan/DarpanData.js`.

Articles' right arrow and overview cards open `/resources/articles`. This page uses Darpan-style search, year and sorting controls. Article records are in `src/resourcesData.js`; the initial three cards repeat the supplied reference's sample title and date. Add the approved titles, dates, and content when ready. A matching PDF (for example `article-1.pdf`) enables the article's read arrow. Until then it is disabled with a “coming soon” label.

Media Centre and Collaterals are overview sections only. Their content actions remain disabled until documents are added; their dedicated pages will be built later. The Collaterals carousel can still be browsed.
