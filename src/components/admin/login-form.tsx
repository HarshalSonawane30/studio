'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Shield } from 'lucide-react';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // In a real application, this would be a call to a secure backend endpoint.
    // For this prototype, we are using the requested hardcoded credentials.
    setTimeout(() => {
      if (id === 'Harshal04' && password === 'H@rshal04') {
        onLoginSuccess();
        toast({
          title: 'Login Successful',
          description: 'Welcome to the Admin Panel.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: 'Invalid credentials. Please try again.',
        });
      }
      setLoading(false);
    }, 500);
  };

  return (
    <Card className="w-full max-w-sm border-0 shadow-2xl shadow-primary/10 md:border">
      <CardHeader className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="mt-4 font-headline text-2xl">Admin Panel</CardTitle>
        <CardDescription>
          Please enter your credentials to access the dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-id">Admin ID</Label>
            <Input
              id="admin-id"
              type="text"
              placeholder="Enter your ID"
              required
              value={id}
              onChange={(e) => setId(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Authenticating...' : 'Login'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
