
-- Fix 1: user_roles missing INSERT/DELETE policies - restrict to admins only
CREATE POLICY "Admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Fix 2: Replace permissive WITH CHECK (true) on public submission tables
-- with validated checks (length/format) so policies aren't unconditionally true.
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;
CREATE POLICY "Anyone can submit contact form"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 200
  AND length(btrim(email)) BETWEEN 3 AND 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(btrim(message)) BETWEEN 1 AND 5000
  AND (company IS NULL OR length(company) <= 200)
  AND (country IS NULL OR length(country) <= 100)
);

DROP POLICY IF EXISTS "Anyone can submit quote request" ON public.quote_requests;
CREATE POLICY "Anyone can submit quote request"
ON public.quote_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 200
  AND length(btrim(email)) BETWEEN 3 AND 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (message IS NULL OR length(message) <= 5000)
  AND (company IS NULL OR length(company) <= 200)
  AND (country IS NULL OR length(country) <= 100)
  AND (phone IS NULL OR length(phone) <= 50)
  AND (product IS NULL OR length(product) <= 300)
  AND (quantity IS NULL OR length(quantity) <= 100)
  AND status = 'new'
  AND is_read = false
);
