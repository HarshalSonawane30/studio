import { Rocket } from 'lucide-react';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 p-2">
      <div className="rounded-lg bg-sidebar-primary p-2 text-sidebar-primary-foreground">
        <Rocket className="size-5" />
      </div>
      <span className="font-headline text-lg font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
        Emergent
      </span>
    </Link>
  );
}
