import { defineQuery } from "next-sanity";


export const IMAGES_QUERY = defineQuery(`*[_type == "galleryImage" && defined(slug.current)]{
  _id, title, slug
}`)

// *[_type == "galleryImage" && defined(slug.current)]{
//   _id, title, slug
// }

// export const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
//   title, body, mainImage
// }`)

export const IMAGE_QURY = defineQuery(`*[_type == "galleryImage" && slug.current == $slug][0]{
  title, description, image
}`)