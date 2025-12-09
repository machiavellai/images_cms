import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { IMAGES_QUERY } from "@/sanity/lib/queries";
import { urlFor } from '@/sanity/lib/image'
import { ImageModel } from '@/app/lib/data/model'
import GalleryClient from "../../../components/GalleryClient";


/**
 * Gallery Home Page — Server Component with Live Updates
 *
 * This page fetches images directly from Sanity CMS using sanityFetch.
 * Live updates are enabled via the SanityLive component in the layout.
 *
 * BENEFITS:
 * - Live content updates: When you publish changes in Sanity Studio, they appear instantly
 * - No caching: Always fresh content from Sanity
 * - Type-safe: GROQ query response is automatically typed
 * - SEO optimized: Images are in the HTML
 */

export default async function Home() {
  const { data: images } = await sanityFetch({ query: IMAGES_QUERY });

  // Map Sanity response to app's ImageModel shape used by the client components
  const transformed: ImageModel[] = (images || []).map((img: any) => ({
    id: img._id,
    slug: img?.slug?.current || img.slug || img._id,
    title: img?.title || 'Untitled',
    description: img?.description || '',
    url: img?.image ? urlFor(img.image).auto('format').width(1200).url() : img?.url || '',
    placeholderDataUrl: img?.placeholderDataUrl || (img?.image?.asset?.metadata?.lqip ?? ''),
    width: img?.width || img?.image?.asset?.metadata?.dimensions?.width || 1200,
    height: img?.height || img?.image?.asset?.metadata?.dimensions?.height || 800,
    fileSize: img?.fileSize || 0,
    uploadedBy: img?.uploadedBy || '',
    createdAt: img?._createdAt ? new Date(img._createdAt) : new Date(),
    updatedAt: img?.updatedAt ? new Date(img.updatedAt) : new Date(),
    isPublished: !!img?.isPublished,
  }))

  return (
    <main className="min-h-screen bg-background">
      {/* Header Section */}
      <header className="border-b border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold text-card-foreground">Image Gallery</h1>
          <p className="mt-2 text-muted-foreground">
            Explore our curated collection of high-quality images
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        {transformed && transformed.length > 0 ? (
          <GalleryClient images={transformed} />
        ) : (
          <div className="flex h-96 items-center justify-center text-center">
            <div>
              <p className="text-muted-foreground">No images published yet.</p>
              <Link href="/admin" className="mt-4 inline-block text-primary hover:underline">
                Go to admin to add images →
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
