import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

function Nva() {
  return (
    <div className="w-full mx-auto bg-black shadow-lg">
      <NavigationMenu className="w-full bg-black p-4 shadow-lg">
        <NavigationMenuList className="flex space-x-6 w-full justify-center lg:justify-between max-w-screen-xl mx-auto">
          
          <NavigationMenuItem>
            <NavigationMenuTrigger className="hover:text-red-500 transition-all duration-300">
              <NavigationMenuLink href="/signup" className={navigationMenuTriggerStyle()}>
                Signup
              </NavigationMenuLink>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-gray-800 p-4 rounded-lg shadow-md">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Signup
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger className="hover:text-red-500 transition-all duration-300">
              <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
                Login
              </NavigationMenuLink>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-gray-800 p-4 rounded-lg shadow-md">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Login
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="hover:text-red-500 transition-all duration-300">
              <NavigationMenuLink href="/help" className={navigationMenuTriggerStyle()}>
                Help
              </NavigationMenuLink>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-gray-800 p-4 rounded-lg shadow-md">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Help
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="hover:text-red-500 transition-all duration-300">
              <NavigationMenuLink href="/about" className={navigationMenuTriggerStyle()}>
                About
              </NavigationMenuLink>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-gray-800 p-4 rounded-lg shadow-md">
              <NavigationMenuLink className="m-5 text-white hover:text-red-700 transition-colors duration-300">
                About
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default Nva;
