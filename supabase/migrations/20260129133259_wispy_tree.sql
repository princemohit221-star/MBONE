/*
  # Add User Profile Fields

  1. Modified Tables
    - `users` - Add new columns for complete user profile
      - `first_name` (text, user's first name)
      - `last_name` (text, user's last name)
      - `address_line_1` (text, primary address)
      - `address_line_2` (text, secondary address)
      - `area_locality` (text, area/locality)
      - `city` (text, city)
      - `state_province` (text, state/province)
      - `country` (text, country)
      - `zip_code` (text, postal/zip code)

  2. Security
    - Maintain existing RLS policies
    - Add indexes for new fields

  3. Updates
    - Update existing functions to handle new fields
*/

-- Add new columns to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS first_name text,
ADD COLUMN IF NOT EXISTS last_name text,
ADD COLUMN IF NOT EXISTS address_line_1 text,
ADD COLUMN IF NOT EXISTS address_line_2 text,
ADD COLUMN IF NOT EXISTS area_locality text,
ADD COLUMN IF NOT EXISTS city text,
ADD COLUMN IF NOT EXISTS state_province text,
ADD COLUMN IF NOT EXISTS country text,
ADD COLUMN IF NOT EXISTS zip_code text;

-- Add constraints for data validation
ALTER TABLE users 
ADD CONSTRAINT users_first_name_length CHECK (char_length(first_name) >= 2 OR first_name IS NULL),
ADD CONSTRAINT users_last_name_length CHECK (char_length(last_name) >= 2 OR last_name IS NULL),
ADD CONSTRAINT users_zip_code_format CHECK (zip_code ~ '^[A-Za-z0-9\s\-]{3,10}$' OR zip_code IS NULL);

-- Create indexes for better performance on new fields
CREATE INDEX IF NOT EXISTS idx_users_first_name ON users(first_name);
CREATE INDEX IF NOT EXISTS idx_users_last_name ON users(last_name);
CREATE INDEX IF NOT EXISTS idx_users_city ON users(city);
CREATE INDEX IF NOT EXISTS idx_users_state_province ON users(state_province);
CREATE INDEX IF NOT EXISTS idx_users_country ON users(country);
CREATE INDEX IF NOT EXISTS idx_users_zip_code ON users(zip_code);

-- Update the handle_new_user function to include new fields
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, username, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'username',
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;