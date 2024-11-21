"use client";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Power, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/authOptions";
import { signIn, signOut } from "next-auth/react";
import { LoadingPage } from "../../app/components/LoadingPage";
import { SidebarRoutes } from "../SidebarRoutes";
import { ToggleTheme } from "../ToggleTheme";
import { ThemeColorToggle } from "@/app/components/theme-color-toggle";

export default function Navbar() {
  const { data: session, status } = useSession();
  // const session = await getServerSession(authOptions);
  const urlImage = session?.user?.image;

  if (status === "loading") {
    return <LoadingPage />;
  }

  return (
    <nav className={session?.user?.name ? "block" : "hidden"}>
      <div className="flex items-center px-2 gap-x-4 md:px-6 justify-between w-full bg-background border-b h-20">
        <div className="block xl:hidden">
          <Sheet>
            <SheetTrigger className="flex items-center">
              <Menu />
            </SheetTrigger>
            <SheetContent side="left">
              <SidebarRoutes />
            </SheetContent>
          </Sheet>
        </div>
        <div className="relative w-[300px]">
          <Input placeholder="Buscar..." className="rounded-lg" />
          <Search strokeWidth={1} className="absolute top-2 right-2" />
        </div>
        <div className="flex gap-x-2 items-center">
          <div className="flex mr-2">
            <div className="flex gap-2 items-center justify-center">
              <div className="hidden md:block">
                <ThemeColorToggle />
              </div>
              <ToggleTheme />
            </div>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={
                        urlImage ? urlImage : "https://github.com/shadcn.png"
                      }
                      alt="User Image"
                    />
                    <AvatarFallback>
                      {session?.user?.name?.toUpperCase()[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session?.user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session?.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <div className={session?.user?.name ? "hidden" : "block"}>
                    <DropdownMenuItem>
                      <div onClick={() => signIn()}>Iniciar</div>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuItem>Configuraciones</DropdownMenuItem>
                  <DropdownMenuItem>Ayuda</DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="md:hidden block">
                      <ThemeColorToggle />
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <div
                    onClick={() => signOut()}
                    className="flex justify-between"
                  >
                    <p>Salir</p>
                    <Power className="h-10 w-10 mr-5" />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
