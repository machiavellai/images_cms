import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { IMAGES_QUERY } from "@/sanity/lib/queries";


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
        {images && images.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6 divide-y divide-border">
            {images.map((image) => (
              <li key={image._id}>
                <Link
                  className="block p-4 hover:text-primary transition-colors"
                  href={`/images/${image?.slug?.current}`}
                >
                  <h2 className="text-2xl font-semibold">{image?.title}</h2>
                </Link>
              </li>
            ))}
          </ul>
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
