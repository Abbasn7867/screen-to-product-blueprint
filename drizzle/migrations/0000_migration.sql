CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  business_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  website text,
  locations text,
  software text,
  problems text[] NOT NULL DEFAULT '{}',
  pain_ids text[] NOT NULL DEFAULT '{}',
  sample_questions text[] NOT NULL DEFAULT '{}',
  niche text NOT NULL DEFAULT 'medical-practices',
  consent_sms_account boolean NOT NULL DEFAULT false,
  consent_marketing boolean NOT NULL DEFAULT false,
  consent_text text,
  consent_at timestamptz,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  ref_code text,
  plan text,
  billing text,
  status text NOT NULL DEFAULT 'new'
);
GRANT INSERT ON public.leads TO anon, authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can submit leads" ON public.leads FOR INSERT TO anon, authenticated
WITH CHECK (status = 'new' AND niche = 'medical-practices' AND length(name) <= 100 AND length(business_name) <= 150 AND length(email) <= 255);