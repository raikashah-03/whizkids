"use client"

import { ChevronDown, ChevronRight, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { NAVIGATION_LINKS } from "@/config/navigation"
import { cn } from "@/lib/utils"

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeSubmenu, setActiveSubmenu] = React.useState<string | null>("Programs")

  React.useEffect(() => {
    if (isOpen) {
      setActiveSubmenu("Programs")
    } else {
      setActiveSubmenu(null)
    }
  }, [isOpen])

  const handleToggleSubmenu = (title: string) => {
    setActiveSubmenu(activeSubmenu === title ? null : title)
  }

  return (
    <>
    <header className="fixed container top-4 left-1/2 -translate-x-1/2 z-50 w-full bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60 shadow-sm rounded-3xl">
      <div className="flex h-20 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Whizkids Logo"
              width={140}
              height={50}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              {NAVIGATION_LINKS.map((link) => (
                <NavigationMenuItem key={link.title}>
                  {link.subLinks ? (
                    <>
                      <NavigationMenuTrigger className="bg-transparent font-bold text-foreground hover:text-primary">
                        {link.title.replace(" ▼", "")}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white shadow-md rounded-3xl">
                          {link.subLinks.map((subLink) => (
                            <ListItem
                              key={subLink.title}
                              title={subLink.title}
                              href={subLink.href}
                            >
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={link.href} legacyBehavior passHref>
                      <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent font-bold text-foreground hover:text-primary transition-colors")}>
                        {link.title}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right CTA / Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/contact" passHref>
            <Button variant="default" className="cursor-pointer rounded-full px-6 font-bold text-base h-11 bg-primary text-white">
              Book a Visit <ChevronRight className="ml-1 size-4" />
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation Trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <Link href="/contact" passHref>
            <Button variant="default" className="cursor-pointer rounded-full px-6 font-bold text-base h-11 bg-primary text-white">
              Book a Visit <ChevronRight className="ml-1 size-4" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsOpen(true)}>
            <Menu className="h-10 w-10" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </div>
    </header>

    {/* Mobile Navigation Overlay & Sidebar (moved outside header to prevent top-4 offset caused by translate-x transform) */}
    {/* Overlay */}
    <div
      className={`fixed inset-0 z-60 bg-black/20 transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={() => setIsOpen(false)}
    />

    {/* Sidebar */}
    <div
      className="fixed top-0 right-0 z-70 h-screen w-[300px] sm:w-[350px] bg-white shadow-2xl flex flex-col pt-16 pb-10 px-6 overflow-y-auto"
      style={{
        transition: "transform 400ms cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
      }}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4"
        onClick={() => setIsOpen(false)}
      >
        <X className="h-6 w-6" />
      </Button>

      <nav className="flex flex-col gap-5 mt-6">
        {NAVIGATION_LINKS.map((link) => {
          const hasSubLinks = !!link.subLinks
          const isSubmenuOpen = activeSubmenu === link.title

          return (
            <div key={link.title} className="flex flex-col space-y-2">
              <div className="flex items-center justify-between w-full">
                {link.href === "#" ? (
                  <button
                    onClick={() => handleToggleSubmenu(link.title)}
                    className="text-lg font-bold text-left hover:text-primary transition-colors w-full flex items-center justify-between py-1"
                  >
                    <span>{link.title}</span>
                    <ChevronDown className={cn("h-5 w-5 transition-transform duration-200 text-foreground/50", isSubmenuOpen && "rotate-180")} />
                  </button>
                ) : (
                  <>
                    <Link
                      href={link.href}
                      className="text-lg font-bold hover:text-primary transition-colors py-1 flex-1"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.title.replace(" ▼", "")}
                    </Link>
                    {hasSubLinks && (
                      <button
                        onClick={() => handleToggleSubmenu(link.title)}
                        className="p-2 text-foreground/50 hover:text-primary"
                        aria-label={`Toggle ${link.title} submenu`}
                      >
                        <ChevronDown className={cn("h-5 w-5 transition-transform duration-200", isSubmenuOpen && "rotate-180")} />
                      </button>
                    )}
                  </>
                )}
              </div>

              {hasSubLinks && isSubmenuOpen && (
                <div className="flex flex-col space-y-3 pl-4 ml-2 border-l border-foreground/5 animate-in fade-in slide-in-from-top-1 duration-200">
                  {link.subLinks!.map((subLink) => (
                    <Link
                      key={subLink.title}
                      href={subLink.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors py-0.5"
                      onClick={() => setIsOpen(false)}
                    >
                      {subLink.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </div>
    </>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group",
            className
          )}
          {...props}
        >
          <div className="text-sm font-bold leading-none mb-1 group-hover:text-primary">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default Header