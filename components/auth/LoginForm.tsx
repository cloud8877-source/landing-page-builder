'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { hasDemoDataToConvert } from '@/lib/demo-mode';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn, signUp, signInWithGoogle } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('🔐 Starting authentication...');
      console.log('Email:', email);
      console.log('Mode:', isSignUp ? 'Sign Up' : 'Sign In');

      if (isSignUp) {
        await signUp(email, password, displayName);
      } else {
        await signIn(email, password);
      }

      console.log('✅ Authentication successful, waiting for auth state update...');

      // Add a small delay to let auth state update
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Check if there's demo data to convert
      if (hasDemoDataToConvert()) {
        console.log('🔄 Redirecting to complete signup...');
        router.push('/complete-signup');
      } else {
        console.log('🏠 Redirecting to dashboard...');
        router.push('/dashboard');
      }
    } catch (err: any) {
      console.error('❌ Login form error:', err);
      console.error('Error code:', err.code);
      console.error('Error message:', err.message);

      let userFriendlyError = err.message || 'An error occurred';

      // Provide more user-friendly error messages
      if (err.code === 'auth/user-not-found') {
        userFriendlyError = 'No account found with this email address.';
      } else if (err.code === 'auth/wrong-password') {
        userFriendlyError = 'Incorrect password. Please try again.';
      } else if (err.code === 'auth/email-already-in-use') {
        userFriendlyError = 'An account with this email already exists.';
      } else if (err.code === 'auth/weak-password') {
        userFriendlyError = 'Password should be at least 6 characters.';
      } else if (err.code === 'auth/invalid-email') {
        userFriendlyError = 'Please enter a valid email address.';
      } else if (err.code === 'auth/configuration-not-found') {
        userFriendlyError = 'Authentication service is not configured. Please contact support.';
      }

      setError(userFriendlyError);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setError('');
    setLoading(true);

    try {
      console.log('🔐 Starting Google sign-in...');
      await signInWithGoogle();

      console.log('✅ Google authentication successful, waiting for auth state update...');

      // Add a small delay to let auth state update
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Check if there's demo data to convert
      if (hasDemoDataToConvert()) {
        console.log('🔄 Redirecting to complete signup...');
        router.push('/complete-signup');
      } else {
        console.log('🏠 Redirecting to dashboard...');
        router.push('/dashboard');
      }
    } catch (err: any) {
      console.error('❌ Google sign-in error:', err);
      console.error('Error code:', err.code);
      console.error('Error message:', err.message);

      let userFriendlyError = err.message || 'An error occurred during Google sign-in.';

      if (err.code === 'auth/popup-closed-by-user') {
        userFriendlyError = 'Sign-in popup was closed before completion.';
      } else if (err.code === 'auth/popup-blocked') {
        userFriendlyError = 'Sign-in popup was blocked by the browser. Please allow popups.';
      } else if (err.code === 'auth/configuration-not-found') {
        userFriendlyError = 'Authentication service is not configured. Please contact support.';
      }

      setError(userFriendlyError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader className="space-y-4">
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
        </div>
        <div className="text-center">
          <CardTitle className="text-2xl">{isSignUp ? 'Create Account' : 'Welcome Back'}</CardTitle>
          <CardDescription className="mt-2">
            {isSignUp
              ? 'Create your property landing page builder account'
              : 'Sign in to build stunning property landing pages'}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="displayName">Full Name</Label>
              <Input
                id="displayName"
                type="text"
                placeholder="John Doe"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
          </Button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Sign in with Google
        </Button>

        <div className="mt-4 text-center text-sm">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            className="text-primary hover:underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
