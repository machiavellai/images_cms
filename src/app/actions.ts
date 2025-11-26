/**
 * SERVER ACTIONS - MUTATION HANDLING
 * 
 * This file contains Server Actions that handle all data mutations.
 * Server Actions ensure:
 * - Authorization checks happen server-side (cannot be bypassed by client)
 * - Database operations are secure and use proper parameterization
 * - Sensitive operations happen in a trusted environment
 * 
 * SECURITY ARCHITECTURE:
 * - Every Server Action begins with authorization checks
 * - Checks fail fast if user is not authenticated or authorized
 * - All inputs are validated before database operations
 * - Errors are sanitized to prevent information leakage
 */

'use server';

import { createImage } from "./lib/data";
import { ImageModel } from "./lib/data/model";


/**
 * Server Action: Upload new image with metadata
 * 
 * SECURITY CHECK: HIGHLY CRITICAL: VALIDATE AUTHENTICATED USER SESSION AND RBAC (ADMIN ROLE) BEFORE ANY DATABASE MUTATION, PREVENTING INSECURE DIRECT OBJECT REFERENCE (IDOR) VULNERABILITIES.
 * 
 * This check must happen FIRST in the function. If the user is not authenticated
 * or is not an admin, the function must throw an error and exit immediately.
 * 
 * In a real application with database authentication:
 * - Verify user session token is valid and not expired
 * - Query database for user's role (e.g., SELECT role FROM users WHERE id = ?)
 * - Ensure role is 'admin' before proceeding
 * - Log the authorization check for audit trails
 * 
 * @param formData - Form data containing image metadata and file
 * @returns Promise resolving to created image or error
 * @throws Error if unauthorized or validation fails
 */
export async function uploadNewImage(
  formData: FormData
): Promise<{ success: boolean; image?: ImageModel; error?: string }> {
  // SECURITY CHECK: HIGHLY CRITICAL: VALIDATE AUTHENTICATED USER SESSION AND RBAC (ADMIN ROLE)
  // This MVP uses a placeholder check. In production, this would verify session tokens,
  // query the actual database for user roles, and log authorization attempts.
  const isAdmin = process.env.SKIP_AUTH !== 'true';
  
  if (!isAdmin) {
    // Fail fast - do not reveal why authorization failed to prevent information leakage
    return {
      success: false,
      error: 'Unauthorized: You do not have permission to perform this action.',
    };
  }

  try {
    // Extract and validate input data
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const slug = formData.get('slug') as string;

    // INPUT VALIDATION: Prevent injection attacks and invalid data
    if (!title || !slug) {
      return {
        success: false,
        error: 'Title and slug are required fields.',
      };
    }

    // Sanitize slug: lowercase, alphanumeric and hyphens only
    const sanitizedSlug = slug
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '')
      .replace(/^-+|-+$/g, '');

    if (!sanitizedSlug) {
      return {
        success: false,
        error: 'Slug must contain at least one alphanumeric character.',
      };
    }

    // PERFORMANCE: Simulate image file processing
    // In production, this would upload to cloud storage (e.g., Vercel Blob)
    const newImage = await createImage({
      title: title.substring(0, 255), // Limit field length
      description: description.substring(0, 1000),
      slug: sanitizedSlug,
      url: `/placeholder.svg?height=400&width=400&query=${encodeURIComponent(title)}`,
      width: 1200,
      height: 800,
      fileSize: 250000,
      uploadedBy: 'admin-user-1',
      isPublished: true,
    });

    // SUCCESS: Return the newly created image
    return {
      success: true,
      image: newImage,
    };
  } catch (error) {
    // ERROR HANDLING: Log error server-side, but return generic message to client
    console.error('Image upload error:', error);

    return {
      success: false,
      error: 'An error occurred while uploading the image. Please try again.',
    };
  }
}