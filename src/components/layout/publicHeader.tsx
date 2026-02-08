import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import SearchBox from '../post/SearchBox';
import { Button } from '../ui/button';

export default function PublicHeader() {
  return (
    <div>
      <header className="border-b bg-blue-200">
        <div className="container mx-auto flex items-center justify-between p-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className="
                      text-xl font-bold
                      hover:bg-blue-300 hover:text-blue-500
                    "
                  >
                    Blog
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-4">
            <SearchBox />
            <Button variant="outline" asChild>
              <Link href="/login">ログイン</Link>
            </Button>
            <Button asChild>
              <Link href="/register">登録</Link>
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
}
