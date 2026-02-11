'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/firebase';
import Logo from '@/components/logo';
import { Rocket } from 'lucide-react';

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
        <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 21.2 177 61.2l-66.8 66.8c-23.5-23.5-56.3-38.3-94.2-38.3-70.3 0-129.2 57.2-129.2 128s58.9 128 129.2 128c79.3 0 119.5-57.2 124.8-89.2H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path>
    </svg>
);

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
        toast({
            variant: 'destructive',
            title: 'Signup Failed',
            description: 'Authentication service is not available.',
        });
        return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name,
        });
      }
      toast({
        title: 'Signup Successful',
        description: "Welcome! You can now log in.",
      });
      router.push('/login');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
        <div className="lg:w-1/2 bg-secondary flex-col justify-between p-8 text-secondary-foreground hidden lg:flex">
            <Logo />
            <div className="space-y-4">
                <Rocket className="w-12 h-12" />
                <h1 className="font-headline text-4xl font-bold">Join Emergent Today</h1>
                <p className="text-lg text-muted-foreground">
                    Create an account to start your journey. Connect, learn, and grow with a community of passionate builders.
                </p>
            </div>
            <footer className="text-sm">
                © {new Date().getFullYear()} Emergent. All rights reserved.
            </footer>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
             <div className="w-full max-w-md space-y-6">
                 <div className="text-center lg:text-left">
                    <h1 className="font-headline text-3xl font-bold">Create an account</h1>
                    <p className="text-muted-foreground">
                        Enter your information to get started.
                    </p>
                </div>
                 <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Alex Johnson"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Creating account...' : 'Create Account'}
                    </Button>
                </form>

                 <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>
                
                 <Button variant="outline" className="w-full">
                    <GoogleIcon />
                    Sign up with Google
                </Button>
                
                 <div className="mt-4 text-center text-sm">
                    Already have an account?{' '}
                    <Link href="/login" className="underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    </div>
  );
}
