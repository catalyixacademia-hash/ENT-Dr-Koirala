import { redirect } from 'next/navigation';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const params = await searchParams;
  const redirectTo = params?.redirect ? `?redirect=${encodeURIComponent(params.redirect)}` : '';
  redirect(`/sign-up-login-screen${redirectTo}`);
}
