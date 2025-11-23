/**
 * DATA ACCESS LAYER - MOCK DATA MODELS
 * 
 * This file defines the data models for the Image CMS and includes security
 * documentation and best practices for database security.
 */

/**
 * Image metadata model representing stored image records
 */
export interface ImageModel {
    id: string;
    slug: string;
    title: string;
    description: string;
    url: string;
    placeholderDataUrl: string; // Base64 blur placeholder for next/image
    width: number;
    height: number;
    fileSize: number;
    uploadedBy: string; // User ID of uploader
    createdAt: Date;
    updatedAt: Date;
    isPublished: boolean;
}

/**
 * SECURITY BEST PRACTICE: ROW LEVEL SECURITY (RLS)
 * 
 * Row Level Security is a database-level security mechanism that acts as a "defense in depth" approach.
 * It ensures that even if application-level authorization checks are bypassed, the database
 * enforces granular access control at the row level.
 * 
 * EXAMPLE RLS POLICY FOR IMAGES TABLE:
 * 
 * -- Only admins can view/edit all images
 * CREATE POLICY "Admins can manage all images" ON images
 *   FOR ALL
 *   USING (EXISTS (
 *     SELECT 1 FROM user_roles ur
 *     WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
 *   ))
 *   WITH CHECK (EXISTS (
 *     SELECT 1 FROM user_roles ur
 *     WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
 *   ));
 * 
 * -- Users can only view their own uploaded images (if not published)
 * CREATE POLICY "Users can view their own unpublished images" ON images
 *   FOR SELECT
 *   USING (
 *     is_published = true OR uploaded_by = auth.uid()
 *   );
 * 
 * -- Public users can only see published images
 * CREATE POLICY "Public users see only published images" ON images
 *   FOR SELECT
 *   USING (is_published = true);
 * 
 * WHY THIS MATTERS:
 * - Application crashes or bugs cannot expose unauthorized data
 * - Malicious actors cannot directly query the database even with compromised auth tokens
 * - Compliance requirements (GDPR, HIPAA) are satisfied at the database level
 * - Performance: Database can optimize queries based on RLS rules
 * - Auditability: All access is logged at the database level
 */

/**
 * User roles model for RBAC (Role-Based Access Control)
 */
export interface UserRole {
  userId: string;
  role: 'admin' | 'editor' | 'viewer';
  assignedAt: Date;
}

/**
 * AUTHORIZATION CONTEXT:
 * 
 * In a production system, authorization checks should follow this hierarchy:
 * 
 * 1. ROUTE LEVEL: Middleware checks basic auth presence (redirects to login)
 * 2. ACTION LEVEL: Server Actions check user role/permissions (fails fast if unauthorized)
 * 3. DATA LEVEL: RLS policies prevent unauthorized data access (database-enforced)
 * 4. FIELD LEVEL: Consider sensitive field encryption for additional security
 * 
 * This MVP implements checks at ACTION and DATA levels with RLS documentation.
 */