/*
  # Doctor Profile Management Schema

  1. New Tables
    - `doctor_profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `phone_number` (text)
      - `medical_license` (text)
      - `specialty` (text)
      - `qualifications` (text)
      - `profile_photo_url` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `doctor_notifications`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `email_notifications` (boolean, default true)
      - `appointment_reminders` (boolean, default true)
      - `urgent_alerts` (boolean, default true)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated doctors to manage their own profiles
    - Add policies for authenticated doctors to manage their own notification settings
*/

-- Create doctor_profiles table
CREATE TABLE IF NOT EXISTS doctor_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text DEFAULT '',
  last_name text DEFAULT '',
  email text DEFAULT '',
  phone_number text DEFAULT '',
  medical_license text DEFAULT '',
  specialty text DEFAULT '',
  qualifications text DEFAULT 'Bachelor of Surgery (MBBS/MBChB)',
  profile_photo_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create doctor_notifications table
CREATE TABLE IF NOT EXISTS doctor_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email_notifications boolean DEFAULT true,
  appointment_reminders boolean DEFAULT true,
  urgent_alerts boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE doctor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_notifications ENABLE ROW LEVEL SECURITY;

-- Policies for doctor_profiles
CREATE POLICY "Doctors can view own profile"
  ON doctor_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Doctors can insert own profile"
  ON doctor_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Doctors can update own profile"
  ON doctor_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Doctors can delete own profile"
  ON doctor_profiles FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for doctor_notifications
CREATE POLICY "Doctors can view own notifications"
  ON doctor_notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Doctors can insert own notifications"
  ON doctor_notifications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Doctors can update own notifications"
  ON doctor_notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Doctors can delete own notifications"
  ON doctor_notifications FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_doctor_profiles_updated_at
  BEFORE UPDATE ON doctor_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_doctor_notifications_updated_at
  BEFORE UPDATE ON doctor_notifications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
  