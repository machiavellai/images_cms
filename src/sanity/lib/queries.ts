import { defineQuery } from "next-sanity";

/**
 * GROQ QUERIES FOR IMAGES
 * 
 * These queries fetch image data from Sanity CMS.
 * They are typed automatically through TypeScript inference via defineQuery.
 * Using defineQuery enables live content updates via sanityFetch.
 */

/**
 * Get all published images, ordered by newest first
 * Used by the gallery index page to display a list of images
 */
export const IMAGES_QUERY = defineQuery(`
  *[_type == "galleryImage" && defined(slug.current)] | order(_createdAt desc) {
    _id,
    title,
    slug
  }
`);

/**
 * Get a single image by slug with full details
 * Used by the detail/modal page
 */
export const IMAGE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "galleryImage" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    "url": image.asset->url,
    "placeholderDataUrl": image.asset->metadata.lqip,
    "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height,
    fileSize,
    uploadedBy,
    createdAt,
    updatedAt
  }
`);

/**
 * Get count of all images
 * Used for pagination calculations
 */
export const IMAGES_COUNT_QUERY = defineQuery(`
  count(*[_type == "galleryImage" && defined(slug.current)])
`);
