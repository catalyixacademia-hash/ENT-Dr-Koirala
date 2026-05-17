/**
 * Creates the admin user in Supabase Auth and admin_profiles table.
 * Run: npm run create-admin
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../.env');

function loadEnv() {
  if (!existsSync(envPath)) {
    console.error('Missing .env file at', envPath);
    process.exit(1);
  }
  const lines = readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.env.ADMIN_EMAIL ?? 'dr.koirala@entportal.np';
const password = process.env.ADMIN_PASSWORD ?? 'ENTDrKoirala@2026';
const fullName = process.env.ADMIN_FULL_NAME ?? 'Dr. Koirala';

if (!url || !serviceRole) {
  console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(url, serviceRole, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data: listData } = await supabase.auth.admin.listUsers();
const existing = listData?.users?.find((u) => u.email === email);

let userId = existing?.id;

if (existing) {
  console.log('Admin user already exists:', email);
  const { error: updateError } = await supabase.auth.admin.updateUserById(existing.id, {
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName, role: 'admin' },
  });
  if (updateError) {
    console.error('Failed to update admin password:', updateError.message);
    process.exit(1);
  }
  console.log('Admin password/metadata updated.');
} else {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName, role: 'admin' },
  });
  if (error) {
    console.error('Failed to create admin user:', error.message);
    process.exit(1);
  }
  userId = data.user.id;
  console.log('Admin user created:', email);
}

const { error: profileError } = await supabase.from('admin_profiles').upsert(
  {
    id: userId,
    email,
    full_name: fullName,
    role: 'admin',
    updated_at: new Date().toISOString(),
  },
  { onConflict: 'id' },
);

if (profileError) {
  console.warn(
    'admin_profiles upsert failed (run supabase/migrations/001_admin_profiles.sql first):',
    profileError.message,
  );
} else {
  console.log('admin_profiles row saved for', email);
}

console.log('\nAdmin login credentials:');
console.log('  Email:   ', email);
console.log('  Password:', password);
console.log('  Login URL: /sign-up-login-screen');
