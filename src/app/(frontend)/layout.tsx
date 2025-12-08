import { SanityLive } from '@/sanity/lib/live'

/**
 * Frontend Layout
 * 
 * This layout wraps all frontend routes (public gallery, details, etc.)
 * It is separate from the root layout to allow the Studio to have
 * its own layout without affecting public routes.
 * 
 * SanityLive enables visual editing in the Sanity Studio.
 */

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <SanityLive />
    </>
  );
}
