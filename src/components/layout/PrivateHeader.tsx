import { auth } from '@/auth';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Setting from './Setting';

export default async function PrivateHeader() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect('/login');
  }
  return (
    <header className="border-b bg-blue-200">
      <div className="container mx-auto flex items-center justify-between p-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/dashboard" className="text-xl font-bold">
                  管理ページ
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Setting session={session} />
      </div>
    </header>
  );
}
