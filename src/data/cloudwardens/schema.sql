-- =====================================================================
-- CLOUDWARDENS (O DOMÍNIO DE ÂMBAR) — SCHEMA RELACIONAL MULTI-CLOUD
-- Compatível com: Oracle Autonomous Database (ATP), PostgreSQL & OCI
-- Preparado para: Modo Carreira, Simulados, Inventário e Futuro Multiplayer
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. MÓDULO DE USUÁRIOS E PERFIL (Integrado ao AWS Cognito sub)
-- ---------------------------------------------------------------------
CREATE TABLE users (
    id VARCHAR2(64) PRIMARY KEY, -- AWS Cognito User Pool 'sub' (UUID)
    email VARCHAR2(255) NOT NULL UNIQUE,
    display_name VARCHAR2(100) NOT NULL,
    role VARCHAR2(20) DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin')),
    tier VARCHAR2(20) DEFAULT 'free' CHECK (tier IN ('free', 'pro_student', 'lifetime')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_profiles (
    user_id VARCHAR2(64) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    avatar_url VARCHAR2(500),
    title VARCHAR2(100) DEFAULT 'Aprendiz das Fronteiras',
    total_xp NUMBER DEFAULT 0,
    current_streak_days NUMBER DEFAULT 0,
    faction_id VARCHAR2(50),
    clan_id VARCHAR2(50),
    elo_rating NUMBER DEFAULT 1200
);

-- ---------------------------------------------------------------------
-- 2. MÓDULO DO MODO CARREIRA (TRILHAS, CAPÍTULOS E NÓS DE SKILL)
-- ---------------------------------------------------------------------
CREATE TABLE career_tracks (
    id VARCHAR2(50) PRIMARY KEY, -- ex: 'track-aws-clf02', 'track-azure-az900'
    cloud_provider VARCHAR2(30) NOT NULL CHECK (cloud_provider IN ('aws', 'azure', 'gcp', 'multicloud')),
    exam_code VARCHAR2(30) NOT NULL, -- 'CLF-C02', 'AZ-900', 'SAA-C03'
    title VARCHAR2(200) NOT NULL,
    description CLOB,
    level VARCHAR2(30) DEFAULT 'foundational' CHECK (level IN ('foundational', 'associate', 'professional')),
    is_active NUMBER(1) DEFAULT 1
);

CREATE TABLE career_nodes (
    id VARCHAR2(50) PRIMARY KEY, -- ex: 'node-iam-security'
    track_id VARCHAR2(50) REFERENCES career_tracks(id) ON DELETE CASCADE,
    node_order NUMBER NOT NULL,
    category VARCHAR2(50) NOT NULL, -- 'security', 'compute', 'storage', etc.
    title VARCHAR2(200) NOT NULL,
    lore_narrative CLOB,
    technical_theory CLOB,
    reward_card_id VARCHAR2(50) NOT NULL,
    target_anomaly_id VARCHAR2(50) NOT NULL
);

CREATE TABLE user_node_progress (
    id VARCHAR2(64) PRIMARY KEY,
    user_id VARCHAR2(64) REFERENCES users(id) ON DELETE CASCADE,
    node_id VARCHAR2(50) REFERENCES career_nodes(id) ON DELETE CASCADE,
    status VARCHAR2(20) DEFAULT 'locked' CHECK (status IN ('locked', 'unlocked', 'completed')),
    best_score NUMBER DEFAULT 0,
    completed_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT unq_user_node UNIQUE (user_id, node_id)
);

-- ---------------------------------------------------------------------
-- 3. MÓDULO DO BANCO DE QUESTÕES E SIMULADOS
-- ---------------------------------------------------------------------
CREATE TABLE exam_questions (
    id VARCHAR2(50) PRIMARY KEY,
    track_id VARCHAR2(50) REFERENCES career_tracks(id) ON DELETE CASCADE,
    node_id VARCHAR2(50) REFERENCES career_nodes(id),
    domain_category VARCHAR2(50) NOT NULL,
    difficulty VARCHAR2(20) DEFAULT 'standard' CHECK (difficulty IN ('intro', 'standard', 'advanced')),
    scenario_text CLOB NOT NULL,
    official_explanation CLOB NOT NULL,
    is_pro_only NUMBER(1) DEFAULT 0
);

CREATE TABLE exam_question_options (
    id VARCHAR2(64) PRIMARY KEY,
    question_id VARCHAR2(50) REFERENCES exam_questions(id) ON DELETE CASCADE,
    option_letter VARCHAR2(2) NOT NULL, -- 'A', 'B', 'C', 'D'
    option_text CLOB NOT NULL,
    is_correct NUMBER(1) DEFAULT 0
);

-- Histórico de tentativas do simulado
CREATE TABLE simulation_attempts (
    id VARCHAR2(64) PRIMARY KEY,
    user_id VARCHAR2(64) REFERENCES users(id) ON DELETE CASCADE,
    track_id VARCHAR2(50) REFERENCES career_tracks(id),
    mode VARCHAR2(30) DEFAULT 'full_exam' CHECK (mode IN ('node_quiz', 'full_exam', 'rapid_fire')),
    score NUMBER NOT NULL,
    total_questions NUMBER NOT NULL,
    percentage_score NUMBER NOT NULL,
    passed NUMBER(1) NOT NULL,
    duration_seconds NUMBER,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Respostas individuais para alimentar o "Radar de Fraquezas por Domínio"
CREATE TABLE simulation_attempt_answers (
    id VARCHAR2(64) PRIMARY KEY,
    attempt_id VARCHAR2(64) REFERENCES simulation_attempts(id) ON DELETE CASCADE,
    question_id VARCHAR2(50) REFERENCES exam_questions(id),
    selected_option_id VARCHAR2(64),
    is_correct NUMBER(1) NOT NULL,
    time_spent_seconds NUMBER
);

-- ---------------------------------------------------------------------
-- 4. MÓDULO DE INVENTÁRIO DE CARTAS
-- ---------------------------------------------------------------------
CREATE TABLE user_cards_inventory (
    id VARCHAR2(64) PRIMARY KEY,
    user_id VARCHAR2(64) REFERENCES users(id) ON DELETE CASCADE,
    card_slug VARCHAR2(50) NOT NULL, -- ex: 'guardian-s3'
    card_level NUMBER DEFAULT 1 CHECK (card_level IN (1, 2, 3)),
    is_foil NUMBER(1) DEFAULT 0,
    times_played NUMBER DEFAULT 0,
    acquired_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unq_user_card UNIQUE (user_id, card_slug)
);

-- ---------------------------------------------------------------------
-- 5. MÓDULO FINANCEIRO (SEM DADOS DE CARTÃO — 100% STRIPE/PIX)
-- ---------------------------------------------------------------------
CREATE TABLE financial_orders (
    id VARCHAR2(64) PRIMARY KEY,
    user_id VARCHAR2(64) REFERENCES users(id),
    payment_gateway VARCHAR2(30) NOT NULL, -- 'stripe', 'pix', 'mercadopago'
    gateway_charge_id VARCHAR2(255) NOT NULL UNIQUE,
    package_slug VARCHAR2(50) NOT NULL,
    amount_cents NUMBER NOT NULL,
    currency VARCHAR2(10) DEFAULT 'BRL',
    status VARCHAR2(30) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------
-- 6. MÓDULO FUTURO MULTIPLAYER: FACÇÕES, CLÃS E RANKING
-- ---------------------------------------------------------------------
CREATE TABLE factions (
    id VARCHAR2(50) PRIMARY KEY, -- 'ordo-arcanum', 'sentinelas-forjados'
    name VARCHAR2(100) NOT NULL,
    description CLOB,
    crest_icon_url VARCHAR2(500),
    total_reputation NUMBER DEFAULT 0
);

CREATE TABLE clans (
    id VARCHAR2(50) PRIMARY KEY,
    name VARCHAR2(100) NOT NULL UNIQUE,
    tag VARCHAR2(10) NOT NULL, -- ex: '[AWS]', '[TERRA]'
    faction_id VARCHAR2(50) REFERENCES factions(id),
    leader_user_id VARCHAR2(64) REFERENCES users(id),
    clan_level NUMBER DEFAULT 1,
    trophies NUMBER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clan_members (
    id VARCHAR2(64) PRIMARY KEY,
    clan_id VARCHAR2(50) REFERENCES clans(id) ON DELETE CASCADE,
    user_id VARCHAR2(64) REFERENCES users(id) ON DELETE CASCADE,
    clan_role VARCHAR2(20) DEFAULT 'member' CHECK (clan_role IN ('leader', 'officer', 'member')),
    contributed_xp NUMBER DEFAULT 0,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unq_clan_user UNIQUE (clan_id, user_id)
);

CREATE TABLE pvp_matches (
    id VARCHAR2(64) PRIMARY KEY,
    player1_user_id VARCHAR2(64) REFERENCES users(id),
    player2_user_id VARCHAR2(64) REFERENCES users(id),
    winner_user_id VARCHAR2(64) REFERENCES users(id),
    season_id VARCHAR2(30) DEFAULT 'season-1',
    p1_deck_snapshot CLOB,
    p2_deck_snapshot CLOB,
    match_duration_seconds NUMBER,
    played_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------
-- 7. TABELA DE MONITORAMENTO / HEARTBEAT DO EVENTBRIDGE
-- ---------------------------------------------------------------------
CREATE TABLE system_heartbeats (
    id NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY PRIMARY KEY,
    pinged_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    source VARCHAR2(50) DEFAULT 'aws-eventbridge-lambda'
);
