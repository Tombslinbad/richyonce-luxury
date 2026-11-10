-- Supabase / PostgreSQL Production Schema for Richyonce 3D Luxury E-Commerce Atelier
-- Migration: 001_initial_schema.sql

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE (Supports JWT auth, admin RBAC, and client profiles)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  full_name VARCHAR(255),
  phone VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index on email and role
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- 2. PRODUCTS TABLE (3D model metadata, category, price, stock, textures)
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(100) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  description TEXT NOT NULL,
  price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
  currency VARCHAR(10) NOT NULL DEFAULT 'USD',
  category VARCHAR(100) NOT NULL,
  model_url TEXT,
  texture_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  stock_status VARCHAR(50) DEFAULT 'IN STOCK',
  sizes TEXT[] DEFAULT ARRAY['S', 'M', 'L', 'XL']::TEXT[],
  details TEXT[] DEFAULT ARRAY[]::TEXT[],
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index on category and stock
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_stock ON products(stock);

-- 3. ORDERS TABLE (Stripe checkout session, shipping steps, customer items)
CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(100) PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  shipping_address JSONB NOT NULL,
  total_amount NUMERIC(12, 2) NOT NULL CHECK (total_amount >= 0),
  currency VARCHAR(10) NOT NULL DEFAULT 'USD',
  payment_method VARCHAR(50) DEFAULT 'Stripe',
  payment_status VARCHAR(50) NOT NULL DEFAULT 'Pending' CHECK (payment_status IN ('Pending', 'Paid', 'Failed', 'Refunded')),
  shipping_status VARCHAR(50) NOT NULL DEFAULT 'Pending' CHECK (shipping_status IN ('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled')),
  tracking_number VARCHAR(100),
  items_json JSONB NOT NULL,
  stripe_session_id VARCHAR(255),
  stripe_payment_intent_id VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_shipping_status ON orders(shipping_status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);

-- 4. LANDING_ASSETS TABLE (CMS content manager for dynamic hero banners, 3D titles, texture maps)
CREATE TABLE IF NOT EXISTS landing_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_key VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  subtext TEXT,
  image_url TEXT,
  model_url TEXT,
  texture_map_url TEXT,
  meta_json JSONB DEFAULT '{}'::JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_landing_assets_section ON landing_assets(section_key);

-- Seed Initial CMS Content & 3D Outfits
INSERT INTO landing_assets (section_key, title, subtext, image_url, meta_json)
VALUES 
  ('hero_3d', 'Sovereignty in 3D Motion', 'Scroll to witness real-time architectural outfit metamorphosis and PBR fabric tailoring.', '/assets/richyonce/editorial/hero-sovereign-emerald.jpg', '{"activePreset": "city", "mannequinStyle": "procedural"}'::JSONB),
  ('editorial_spotlight', 'The Sovereign Atelier', 'From Lagos to London, each ceremonial garment is designed for becoming.', '/assets/richyonce/editorial/monarch-throne.jpg', '{"author": "Master Tailor"}'::JSONB)
ON CONFLICT (section_key) DO NOTHING;

-- Seed Default Admin User (Password is 'admin123' hashed with bcrypt: $2a$10$wTf7q9lF...)
INSERT INTO users (id, email, password_hash, role, full_name)
VALUES 
  ('a0000000-0000-0000-0000-000000000001', 'admin@richyonce.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'admin', 'Atelier Director')
ON CONFLICT (email) DO NOTHING;
