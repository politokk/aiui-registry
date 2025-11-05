"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { MiniBlockPreview } from "./mini-block-preview";

interface RegistryNavigationProps {
  prevComponent?: {
    name: string;
    title: string;
    description?: string;
  } | null;
  nextComponent?: {
    name: string;
    title: string;
    description?: string;
  } | null;
}

export function RegistryNavigation({ prevComponent, nextComponent }: RegistryNavigationProps) {
  return (
    <div className=" bottom-0 bg-white/10 dark:bg-black/10 backdrop-blur-xl border-t border-white/20 dark:border-white/10 shadow-lg mt-auto">
      <div className="container mx-auto px-4 py-1.5 border-t border-border">
        <div className="flex items-center justify-between">
          {prevComponent ? (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="ghost" asChild>
                  <Link href={`/registry/${prevComponent.name}`} className="flex items-center">
                    <ArrowLeft className="mr-2 size-4" />
                    <span className="text-sm text-muted-foreground font-default">{prevComponent.title}</span>
                  </Link>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80" align="start" side="top">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">Previous: {prevComponent.title}</h4>
                    <span className="text-xs text-muted-foreground">/{prevComponent.name}</span>
                  </div>
                  <MiniBlockPreview componentName={prevComponent.name} />
                  {prevComponent.description && (
                    <p className="text-xs text-muted-foreground">{prevComponent.description}</p>
                  )}
                </div>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <div />
          )}
          
          {nextComponent ? (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="ghost" asChild>
                  <Link href={`/registry/${nextComponent.name}`} className="flex items-center">
                    <span className="text-sm text-muted-foreground font-default">{nextComponent.title}</span>
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80" align="end" side="top">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">Next: {nextComponent.title}</h4>
                    <span className="text-xs text-muted-foreground">/{nextComponent.name}</span>
                  </div>
                  <MiniBlockPreview componentName={nextComponent.name} />
                  {nextComponent.description && (
                    <p className="text-xs text-muted-foreground">{nextComponent.description}</p>
                  )}
                </div>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}