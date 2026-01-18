-- MIAM.quest Database Schema
-- Core tables for mediation preparation platform
-- Run this migration against your Neon database

-- ============ CASES TABLE ============
-- Represents a mediation case between two parties

CREATE TABLE IF NOT EXISTS cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    party_a_id UUID NOT NULL, -- References Neon Auth users
    party_b_id UUID, -- Optional - other party
    party_b_email VARCHAR(255), -- For invitation
    case_type VARCHAR(50) NOT NULL CHECK (case_type IN ('child_arrangements', 'financial', 'both')),
    status VARCHAR(50) DEFAULT 'preparation' CHECK (status IN ('preparation', 'ready_for_mediation', 'in_mediation', 'completed', 'closed')),
    children_count INTEGER,
    children_ages INTEGER[],
    current_arrangement TEXT,
    main_concerns TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for cases
CREATE INDEX IF NOT EXISTS idx_cases_party_a ON cases(party_a_id);
CREATE INDEX IF NOT EXISTS idx_cases_party_b ON cases(party_b_id);
CREATE INDEX IF NOT EXISTS idx_cases_status ON cases(status);
CREATE INDEX IF NOT EXISTS idx_cases_created ON cases(created_at DESC);


-- ============ POSITION ITEMS TABLE ============
-- Individual items captured during conversation

CREATE TABLE IF NOT EXISTS position_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('must_have', 'priority', 'nice_to_have', 'red_line')),
    topic VARCHAR(50) NOT NULL CHECK (topic IN (
        'living_arrangements', 'school_education', 'holidays_occasions',
        'communication', 'decision_making', 'financial_support',
        'handover_logistics', 'extended_family', 'health_medical',
        'activities_hobbies', 'religious_cultural', 'travel_relocation', 'other'
    )),
    item TEXT NOT NULL,
    context TEXT,
    importance INTEGER CHECK (importance BETWEEN 1 AND 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for position_items
CREATE INDEX IF NOT EXISTS idx_position_items_case ON position_items(case_id);
CREATE INDEX IF NOT EXISTS idx_position_items_user ON position_items(user_id);
CREATE INDEX IF NOT EXISTS idx_position_items_category ON position_items(category);
CREATE INDEX IF NOT EXISTS idx_position_items_topic ON position_items(topic);


-- ============ POSITIONS TABLE ============
-- Aggregated position summary for a user in a case

CREATE TABLE IF NOT EXISTS positions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    raw_transcript TEXT, -- Full conversation transcript
    summary TEXT, -- AI-generated summary
    completeness_score INTEGER CHECK (completeness_score BETWEEN 0 AND 100),
    topics_covered TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(case_id, user_id)
);

-- Indexes for positions
CREATE INDEX IF NOT EXISTS idx_positions_case ON positions(case_id);
CREATE INDEX IF NOT EXISTS idx_positions_user ON positions(user_id);


-- ============ DOCUMENTS TABLE ============
-- Generated preparation documents

CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
    user_id UUID,
    doc_type VARCHAR(50) NOT NULL CHECK (doc_type IN (
        'preparation_summary', 'parenting_plan', 'financial_summary', 'position_statement'
    )),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'final')),
    version INTEGER DEFAULT 1,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for documents
CREATE INDEX IF NOT EXISTS idx_documents_case ON documents(case_id);
CREATE INDEX IF NOT EXISTS idx_documents_user ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(doc_type);
CREATE INDEX IF NOT EXISTS idx_documents_status ON documents(status);


-- ============ MEDIATORS TABLE ============
-- Directory of accredited mediators

CREATE TABLE IF NOT EXISTS mediators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    fmc_accredited BOOLEAN DEFAULT true,
    fmc_number VARCHAR(50),
    specializations TEXT[] DEFAULT '{}',
    location VARCHAR(255),
    postcode VARCHAR(10),
    remote_available BOOLEAN DEFAULT true,
    in_person_available BOOLEAN DEFAULT true,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    website VARCHAR(500),
    bio TEXT,
    hourly_rate INTEGER, -- In pence
    miam_cost INTEGER, -- In pence
    legal_aid_available BOOLEAN DEFAULT false,
    languages TEXT[] DEFAULT '{"English"}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for mediators
CREATE INDEX IF NOT EXISTS idx_mediators_location ON mediators(location);
CREATE INDEX IF NOT EXISTS idx_mediators_postcode ON mediators(postcode);
CREATE INDEX IF NOT EXISTS idx_mediators_fmc ON mediators(fmc_accredited);
CREATE INDEX IF NOT EXISTS idx_mediators_remote ON mediators(remote_available);
CREATE INDEX IF NOT EXISTS idx_mediators_legal_aid ON mediators(legal_aid_available);
CREATE INDEX IF NOT EXISTS idx_mediators_active ON mediators(is_active);
-- Full text search on mediator bio and name
CREATE INDEX IF NOT EXISTS idx_mediators_search ON mediators USING gin(to_tsvector('english', coalesce(name, '') || ' ' || coalesce(bio, '') || ' ' || coalesce(location, '')));


-- ============ CONVERSATION SESSIONS TABLE ============
-- Tracks voice/chat sessions

CREATE TABLE IF NOT EXISTS conversation_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    case_id UUID REFERENCES cases(id) ON DELETE SET NULL,
    session_type VARCHAR(50) NOT NULL CHECK (session_type IN ('voice', 'chat')),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ended_at TIMESTAMP WITH TIME ZONE,
    duration_minutes INTEGER,
    topics_covered TEXT[] DEFAULT '{}',
    items_captured INTEGER DEFAULT 0,
    transcript TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for conversation_sessions
CREATE INDEX IF NOT EXISTS idx_sessions_user ON conversation_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_case ON conversation_sessions(case_id);
CREATE INDEX IF NOT EXISTS idx_sessions_started ON conversation_sessions(started_at DESC);


-- ============ AUTO-UPDATE TRIGGERS ============

-- Generic function for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Cases trigger
DROP TRIGGER IF EXISTS cases_update_timestamp ON cases;
CREATE TRIGGER cases_update_timestamp
    BEFORE UPDATE ON cases
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Position items trigger
DROP TRIGGER IF EXISTS position_items_update_timestamp ON position_items;
CREATE TRIGGER position_items_update_timestamp
    BEFORE UPDATE ON position_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Positions trigger
DROP TRIGGER IF EXISTS positions_update_timestamp ON positions;
CREATE TRIGGER positions_update_timestamp
    BEFORE UPDATE ON positions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Documents trigger
DROP TRIGGER IF EXISTS documents_update_timestamp ON documents;
CREATE TRIGGER documents_update_timestamp
    BEFORE UPDATE ON documents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Mediators trigger
DROP TRIGGER IF EXISTS mediators_update_timestamp ON mediators;
CREATE TRIGGER mediators_update_timestamp
    BEFORE UPDATE ON mediators
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();


-- ============ SEED MEDIATOR DATA ============
-- Initial seed of sample mediators for development/testing

INSERT INTO mediators (name, fmc_accredited, fmc_number, specializations, location, postcode, remote_available, in_person_available, contact_email, website, bio, hourly_rate, miam_cost, legal_aid_available, languages)
VALUES
    ('Sarah Mitchell', true, 'FMC12345', ARRAY['child_arrangements', 'financial'], 'London', 'EC1A', true, true, 'sarah@example.com', 'https://example.com/sarah', 'FMC-accredited mediator with 15 years experience in family mediation. Specializes in child arrangements and financial disputes.', 15000, 12000, true, ARRAY['English', 'French']),
    ('David Chen', true, 'FMC23456', ARRAY['child_arrangements', 'high_conflict'], 'Manchester', 'M1', true, true, 'david@example.com', 'https://example.com/david', 'Experienced mediator focusing on high-conflict cases. Calm and patient approach.', 18000, 15000, false, ARRAY['English', 'Mandarin']),
    ('Emma Williams', true, 'FMC34567', ARRAY['child_arrangements', 'domestic_abuse'], 'Birmingham', 'B1', true, false, 'emma@example.com', 'https://example.com/emma', 'Specialist in sensitive cases involving domestic abuse concerns. Trained in trauma-informed practice.', 16000, 13000, true, ARRAY['English']),
    ('James Taylor', true, 'FMC45678', ARRAY['financial', 'child_arrangements'], 'Bristol', 'BS1', true, true, 'james@example.com', 'https://example.com/james', 'Family solicitor turned mediator with expertise in complex financial matters.', 20000, 15000, false, ARRAY['English']),
    ('Priya Sharma', true, 'FMC56789', ARRAY['child_arrangements', 'international'], 'Leeds', 'LS1', true, true, 'priya@example.com', 'https://example.com/priya', 'Specialist in international family mediation. Experienced with cross-border cases.', 17000, 14000, true, ARRAY['English', 'Hindi', 'Punjabi'])
ON CONFLICT DO NOTHING;


-- ============ VERIFY TABLES ============

SELECT
    'cases' as table_name, COUNT(*) as row_count FROM cases
UNION ALL
SELECT 'position_items', COUNT(*) FROM position_items
UNION ALL
SELECT 'positions', COUNT(*) FROM positions
UNION ALL
SELECT 'documents', COUNT(*) FROM documents
UNION ALL
SELECT 'mediators', COUNT(*) FROM mediators
UNION ALL
SELECT 'conversation_sessions', COUNT(*) FROM conversation_sessions;
