import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LoginButton } from '@/components/auth/login-button';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600']
});

export default function Home() {
  console.log('i am here');
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="space-y-6 text-center">
        <div className={cn('text-6xl font-semibold drop-shadow-md', font.className)}>Journey-bites
        </div>
        <div>簡易登入範例</div>
        <LoginButton>
          <Button size="lg">登入</Button>
        </LoginButton>
      </div>
    </div>
  );
}
