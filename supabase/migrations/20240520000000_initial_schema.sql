-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create disputes table
CREATE TABLE IF NOT EXISTS public.disputes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  type TEXT CHECK (type IN ('general', 'divorce')) NOT NULL,
  facts TEXT,
  is_mediator_involved BOOLEAN DEFAULT FALSE,
  divorce_details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create resolutions table
CREATE TABLE IF NOT EXISTS public.resolutions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  dispute_id UUID REFERENCES public.disputes ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  legal_codes JSONB DEFAULT '[]'::jsonb,
  proverbs JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resolutions ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Disputes Policies
CREATE POLICY "Users can view their own disputes" 
  ON public.disputes FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own disputes" 
  ON public.disputes FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Resolutions Policies
CREATE POLICY "Users can view resolutions for their disputes" 
  ON public.resolutions FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.disputes 
      WHERE disputes.id = resolutions.dispute_id 
      AND disputes.user_id = auth.uid()
    )
  );

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_disputes_user_id ON public.disputes(user_id);
CREATE INDEX IF NOT EXISTS idx_resolutions_dispute_id ON public.resolutions(dispute_id);