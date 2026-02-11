import { Rocket } from 'lucide-react';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="rounded-lg bg-primary p-2 text-primary-foreground">
        <Rocket className="size-5" />
      </div>
      <span className="font-headline text-lg font-semibold">
        L2L
      </span>
    </Link>
  );
}
