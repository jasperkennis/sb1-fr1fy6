'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Loader2 } from 'lucide-react';

export function AuthButtons() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignIn = async (provider: string) => {
    try {
      setIsLoading(true);
      const result = await signIn(provider, {
        redirect: false,
        callbackUrl: '/dashboard',
      });

      if (result?.error) {
        toast({
          variant: 'destructive',
          title: 'Authentication failed',
          description: 'Please try again later.',
        });
      } else if (result?.ok) {
        router.push('/dashboard');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleSignIn('credentials')}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Mail className="mr-2 h-4 w-4" />
        )}
        Continue with Email
      </Button>
    </div>
  );
}