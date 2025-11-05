"use client"

import * as React from "react"
import { ChevronsUpDown, Plus, type LucideIcon } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function TeamSwitcher({
  teams,
  activeTeam,
  setActiveTeam,
}: {
  teams: {
    name: string
    logo: LucideIcon
    plan: string
  }[]
  activeTeam: {
    name: string
    logo: LucideIcon
    plan: string
  }
  setActiveTeam: React.Dispatch<React.SetStateAction<{
    name: string
    logo: LucideIcon
    plan: string
  }>>
}) {
  const { isMobile } = useSidebar()

  if (!activeTeam) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="group data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div 
                className="text-white flex aspect-square size-8 items-center justify-center rounded-lg"
                style={{
                  background: activeTeam.name === "Components" 
                    ? "linear-gradient(90deg, hsla(154, 100%, 76%, 1) 0%, hsla(234, 100%, 83%, 1) 50%, hsla(288, 100%, 81%, 1) 100%)"
                    : activeTeam.name === "UI Primitives"
                    ? "linear-gradient(90deg, hsla(39, 100%, 76%, 1) 0%, hsla(14, 100%, 83%, 1) 50%, hsla(344, 100%, 81%, 1) 100%)"
                    : "linear-gradient(90deg, hsla(200, 100%, 76%, 1) 0%, hsla(170, 100%, 83%, 1) 50%, hsla(140, 100%, 81%, 1) 100%)"
                }}
              >
                <activeTeam.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeTeam.name}</span>
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto opacity-0 transition-opacity group-hover:opacity-100" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className="gap-2 p-2"
              >
                <div 
                  className="flex size-6 items-center justify-center rounded-md text-white"
                  style={{
                    background: team.name === "Components" 
                      ? "linear-gradient(90deg, hsla(154, 100%, 76%, 1) 0%, hsla(234, 100%, 83%, 1) 50%, hsla(288, 100%, 81%, 1) 100%)"
                      : team.name === "UI Primitives"
                      ? "linear-gradient(90deg, hsla(39, 100%, 76%, 1) 0%, hsla(14, 100%, 83%, 1) 50%, hsla(344, 100%, 81%, 1) 100%)"
                      : "linear-gradient(90deg, hsla(200, 100%, 76%, 1) 0%, hsla(170, 100%, 83%, 1) 50%, hsla(140, 100%, 81%, 1) 100%)"
                  }}
                >
                  <team.logo className="size-3.5 shrink-0" />
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
