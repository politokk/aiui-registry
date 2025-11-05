"use client";

import {
  Blocks,
  ChevronRight,
  Component,
  CreditCard,
  Database,
  FileText,
  Home,
  Image,
  Layers,
  LayoutDashboard,
  List,
  LogIn,
  Lightbulb,
  Menu,
  MessageSquare,
  Package,
  PieChart,
  RectangleHorizontal,
  Search,
  ShoppingBag,
  Palette,
  Sparkles,
  Square,
  SquareStack,
  Table2,
  Terminal,
  ToggleLeft,
  ToyBrick,
  Type,
  X,
  AlertCircle,
  Navigation,
  MousePointerClick,
  Box,
  Table,
  Minus,
  Sliders,
  Bell,
  PanelTop,
  Settings2,
  UserCircle,
  Sidebar as SidebarIcon,
  Badge as BadgeIcon,
  ListChecks,
  Layout,
  type LucideIcon,
  Command,
  AudioWaveform,
  GalleryVerticalEnd,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TeamSwitcher } from "./team-switcher";
import { RegistryLogo } from "@/components/registry/registry-logo";
import { ModeToggle } from "@/components/registry/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { getBlocks, getComponents, getUIPrimitives } from "@/lib/registry";
import { Nav } from "react-day-picker";
import { NavUser } from "./nav-user";

const data = {
  user: {
    name: "Linder",
    email: "linder@example.com",
    avatar: "/linderavatar.png",
  },
  teams: [
    {
      name: "Components",
      logo: Component,
      plan: "Enterprise",
    },
    {
      name: "UI Primitives",
      logo: ToyBrick,
      plan: "Startup",
    },
    {
      name: "Blocks",
      logo: FileText,
      plan: "Free",
    },
  ],
};

const uiItems = getUIPrimitives();
const componentItems = getComponents();
const blockItems = getBlocks();

// Function to get icon component from registry data
function getIconComponent(component: any): LucideIcon {
  if (component.icon && LucideIcons[component.icon as keyof typeof LucideIcons]) {
    return LucideIcons[component.icon as keyof typeof LucideIcons] as LucideIcon;
  }
  
  // Fallback icons based on component type
  switch (component.type) {
    case "registry:block":
      return FileText;
    case "registry:component":
      return Component;
    case "registry:ui":
      return ToyBrick;
    default:
      return FileText;
  }
}

export const gettingStartedItems = [
  { title: "Home", path: "/", icon: Home },
  { title: "Design Tokens", path: "/tokens", icon: Palette },
];


export function MobileSidebarTrigger() {
  const { setOpenMobile } = useSidebar();

  return (
    <div className="absolute top-8 right-4 md:hidden">
      <Button aria-label="Open menu" onClick={() => setOpenMobile(true)}>
        <Menu className="size-5" />
      </Button>
    </div>
  );
}

export function RegistrySidebar() {
  const pathname = usePathname();

  const { setOpenMobile } = useSidebar();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUiItems, setFilteredUiItems] = useState(uiItems);
  const [filteredComponents, setFilteredComponents] = useState(componentItems);
  const [filteredBlocks, setFilteredBlocks] = useState(blockItems);
  const [activeTeam, setActiveTeam] = useState(data.teams[0]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredUiItems(
        uiItems.filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
      setFilteredComponents(
        componentItems.filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
      setFilteredBlocks(
        blockItems.filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    } else {
      setFilteredUiItems(uiItems);
      setFilteredComponents(componentItems);
      setFilteredBlocks(blockItems);
    }
  }, [searchTerm]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} activeTeam={activeTeam} setActiveTeam={setActiveTeam} />
      </SidebarHeader>

       {/* <div className="px-2 py-2 opacity-100 transition-all duration-200">
          <div className="relative">
            <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>// 
        </div>*/}

      <SidebarContent>
        <ScrollArea className="h-full w-full pr-2">
          <Collapsible defaultOpen={true} className="group/collapsible">
            <SidebarGroup>
              <CollapsibleTrigger className="w-full">
                <SidebarGroupLabel className="flex cursor-pointer items-center justify-between">
                  <div className="flex min-w-0 items-center gap-1">
                     <Lightbulb className="size-3 flex-shrink-0 text-muted-foreground" />
                    <span className="opacity-100 transition-all duration-200 text-muted-foreground font-default">
                      Getting Started
                    </span>
                  </div>
                  <ChevronRight className="size-3.5 text-muted-foreground flex-shrink-0 opacity-100 transition-all duration-200 group-data-[state=open]/collapsible:opacity-0" />
                </SidebarGroupLabel>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {gettingStartedItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <SidebarMenuItem key={item.path}>
                          <SidebarMenuButton
                            asChild
                            isActive={pathname === item.path}
                          >
                            <Link
                              onClick={() => setOpenMobile(false)}
                              href={item.path}
                              className="flex items-center gap-2"
                            >
                              <Icon className="size-4" />
                              {item.title}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>

          {activeTeam.name === "Blocks" && (
            <Collapsible defaultOpen={true} className="group/collapsible">
              <SidebarGroup>
                <CollapsibleTrigger className="w-full">
                  <SidebarGroupLabel className="flex cursor-pointer items-center justify-between">
                    <div className="flex min-w-0 items-center gap-1">
                      <Blocks className="size-3 text-muted-foreground flex-shrink-0" />
                      <span className="transition-all duration-200 text-muted-foreground text-normal">
                        Blocks
                      </span>
                    </div>
                    <ChevronRight className="size-3.5 text-muted-foreground flex-shrink-0 opacity-100 transition-all duration-200 group-data-[state=open]/collapsible:opacity-0" />
                  </SidebarGroupLabel>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {filteredBlocks.map((item) => {
                        const Icon = getIconComponent(item);
                        return (
                          <SidebarMenuItem key={item.name}>
                            <SidebarMenuButton
                              asChild
                              isActive={pathname === `/registry/${item.name}`}
                            >
                              <Link
                                onClick={() => setOpenMobile(false)}
                                href={`/registry/${item.name}`}
                                className="flex items-center gap-2"
                              >
                                <Icon className="size-4" />
                                {item.title}
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          )}

          {activeTeam.name === "Components" && (
            <Collapsible defaultOpen={true} className="group/collapsible">
              <SidebarGroup>
                <CollapsibleTrigger className="w-full">
                  <SidebarGroupLabel className="flex cursor-pointer items-center justify-between">
                    <div className="flex min-w-0 items-center gap-1">
                      <Component className="size-3 text-muted-foreground flex-shrink-0" />
                      <span className="transition-all duration-200 text-muted-foreground text-normal">
                        Components
                      </span>
                    </div>
                    <ChevronRight className="size-3.5 text-muted-foreground flex-shrink-0 opacity-100 transition-all duration-200 group-data-[state=open]/collapsible:opacity-0" />
                  </SidebarGroupLabel>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {filteredComponents.map((item) => {
                        const Icon = getIconComponent(item);
                        return (
                          <SidebarMenuItem key={item.name}>
                            <SidebarMenuButton
                              asChild
                              isActive={pathname === `/registry/${item.name}`}
                            >
                              <Link
                                onClick={() => setOpenMobile(false)}
                                href={`/registry/${item.name}`}
                                className="flex items-center gap-2"
                              >
                                <Icon className="size-4" />
                                {item.title}
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          )}

          {activeTeam.name === "UI Primitives" && (
            <Collapsible defaultOpen={true} className="group/collapsible">
              <SidebarGroup>
                <CollapsibleTrigger className="w-full">
                  <SidebarGroupLabel className="flex cursor-pointer items-center justify-between">
                    <div className="flex min-w-0 items-center gap-1">
                      <ToyBrick className="size-3 text-muted-foreground flex-shrink-0" />
                      <span className="transition-all duration-200 text-muted-foreground text-normal">
                        UI Primitives
                      </span>
                    </div>
                    <ChevronRight className="size-3.5 text-muted-foreground flex-shrink-0 opacity-100 transition-all duration-200 group-data-[state=open]/collapsible:opacity-0" />
                  </SidebarGroupLabel>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {filteredUiItems.map((item) => {
                        const Icon = getIconComponent(item);
                        return (
                          <SidebarMenuItem key={item.name}>
                            <SidebarMenuButton
                              asChild
                              isActive={pathname === `/registry/${item.name}`}
                            >
                              <Link
                                onClick={() => setOpenMobile(false)}
                                href={`/registry/${item.name}`}
                                className="flex items-center gap-2"
                              >
                                <Icon className="size-4" />
                                {item.title}
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          )}
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border px-1 py-0">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
