import { RoutePath } from '@/data/route-path';
import { formatRoutePath } from '@/utils/router';
import { redirect } from 'next/navigation';

export default function Index(): void {
  // Perform a redirect to pokemon route until a homepage is created, using a redirect keeps
  // user history intact after the index route is replaced with an actual page.
  redirect(formatRoutePath(RoutePath.PokemonIndex));
}
