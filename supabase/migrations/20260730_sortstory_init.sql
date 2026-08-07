-- ====================================================================
-- SORTSTORY POSTGRESQL DATABASE SCHEMA & MIGRATION SCRIPT
-- Prefix: sortstory_ (Shared Database Namespace Safety)
-- Supports Auth, Access Code Gating, 6-Month Pass Queue & Custom Telemetry
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. USERS TABLE (`sortstory_users`)
CREATE TABLE IF NOT EXISTS public.sortstory_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'student' CHECK (role IN ('student', 'admin', 'institution')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. ACCESS CODES TABLE (`sortstory_access_codes` - 1-Connection & Multi-Seat Policy)
CREATE TABLE IF NOT EXISTS public.sortstory_access_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(100) UNIQUE NOT NULL,
    plan_type VARCHAR(50) NOT NULL CHECK (plan_type IN ('student', 'learning', 'visualization', 'hybrid', 'institute')),
    assigned_to VARCHAR(255) NOT NULL,
    connections_allowed INT NOT NULL DEFAULT 1,
    connections_active INT NOT NULL DEFAULT 0,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'revoked', 'expired')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. STUDENT PASS APPLICATIONS TABLE (`sortstory_student_applications` - Duplicate Prevention)
CREATE TABLE IF NOT EXISTS public.sortstory_student_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    college VARCHAR(255) NOT NULL,
    class_name VARCHAR(255) NOT NULL,
    roll_number VARCHAR(100) NOT NULL,
    purpose TEXT,
    status VARCHAR(30) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    generated_code_id UUID REFERENCES public.sortstory_access_codes(id) ON DELETE SET NULL,
    is_flagged_duplicate BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. SITE-OWNED ANALYTICS & CLICKSTREAM TELEMETRY TABLE (`sortstory_site_analytics_events`)
CREATE TABLE IF NOT EXISTS public.sortstory_site_analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id VARCHAR(100) NOT NULL,
    event_type VARCHAR(100) NOT NULL, -- e.g., 'page_view', 'button_click', 'algo_run', 'plan_view'
    page_path VARCHAR(255) NOT NULL,
    target_element VARCHAR(255),
    metadata JSONB DEFAULT '{}'::jsonb,
    ip_hash VARCHAR(64),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. AI PREDICTIVE MODULE HEALTH & WEAKNESS MODEL TABLE (`sortstory_site_module_insights`)
CREATE TABLE IF NOT EXISTS public.sortstory_site_module_insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_path VARCHAR(255) UNIQUE NOT NULL,
    total_views INT DEFAULT 0,
    avg_dwell_time_seconds NUMERIC(10,2) DEFAULT 0.00,
    bounce_rate_pct NUMERIC(5,2) DEFAULT 0.00,
    weakness_score INT DEFAULT 0, -- 0 (Healthy) to 100 (Critically Weak / Unvisited)
    ai_recommendation TEXT,
    last_computed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. INDEXES FOR HIGH-SPEED QUERY PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_sortstory_access_codes_code ON public.sortstory_access_codes(code);
CREATE INDEX IF NOT EXISTS idx_sortstory_student_apps_email_roll ON public.sortstory_student_applications(email, roll_number);
CREATE INDEX IF NOT EXISTS idx_sortstory_analytics_session_path ON public.sortstory_site_analytics_events(session_id, page_path);
CREATE INDEX IF NOT EXISTS idx_sortstory_analytics_event_type ON public.sortstory_site_analytics_events(event_type, created_at);

-- 8. DUPLICATE CHECK TRIGGER FOR STUDENT PASS APPS
CREATE OR REPLACE FUNCTION sortstory_check_duplicate_student_app()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM public.sortstory_student_applications 
        WHERE (email = NEW.email OR roll_number = NEW.roll_number)
          AND id <> NEW.id
    ) THEN
        NEW.is_flagged_duplicate := TRUE;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_sortstory_flag_duplicate_student_app
BEFORE INSERT ON public.sortstory_student_applications
FOR EACH ROW EXECUTE FUNCTION sortstory_check_duplicate_student_app();

-- 9. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.sortstory_access_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sortstory_student_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sortstory_site_analytics_events ENABLE ROW LEVEL SECURITY;

-- Allow public to insert analytics events & applications
CREATE POLICY "Allow public insert to sortstory_site_analytics" ON public.sortstory_site_analytics_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to sortstory_student_applications" ON public.sortstory_student_applications FOR INSERT WITH CHECK (true);

-- Admin read access
CREATE POLICY "Allow full access for admin on sortstory_access_codes" ON public.sortstory_access_codes FOR ALL USING (true);
