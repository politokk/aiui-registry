"use client";

import { Check, Copy, GripVertical, Component as ComponentIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useState, useEffect, useRef } from "react";

import { OpenInV0Button } from "@/components/registry/open-in-v0";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import type { Component } from "@/lib/registry";

interface ComponentCardProps {
  component: Component;
  baseUrl: string;
  prompt: string;
}

export function ComponentCard({
  component,
  baseUrl,
  prompt,
}: ComponentCardProps) {
  const [copied, setCopied] = useState(false);

  const registryUrl = `https://${baseUrl}/r/${component.name}.json`;
  const npxCommand = `npx shadcn@latest add ${registryUrl}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(npxCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Get the icon component dynamically from the component data
  const IconComponent = component.icon && LucideIcons[component.icon as keyof typeof LucideIcons]
    ? (LucideIcons[component.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>)
    : ComponentIcon;

  return (
    <section className="w-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full"
      >
        <ResizablePanel 
          id={`${component.name}-panel-left`}
          defaultSize={0}
          minSize={0}
          maxSize={40}
        >
          {/* Empty resizable space */}
        </ResizablePanel>
        <ResizableHandle className="group relative w-4 bg-transparent hover:bg-transparent data-[panel-group-direction=vertical]:h-4 data-[panel-group-direction=vertical]:w-full">
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex h-6 w-4 items-center justify-center rounded border bg-background shadow-md">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </ResizableHandle>
        <ResizablePanel 
          id={`${component.name}-panel-center`}
          defaultSize={100}
          minSize={30}
          maxSize={100}
        >
          <Card id="starting-kit" className="border-none my-0 p-0 shadow-none h-full">
            <CardContent className="flex flex-col items-center justify-center gap-4 rounded-full px-6 py-4">
              <div
                className={
                  "w-full overflow-hidden rounded-xl border border-border"
                }
              >
                <CardHeader className="px-4 py-3 border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-sm font-normal text-muted-foreground">
                      <IconComponent className="h-4 w-4 text-muted-foreground" />
                      {component.title || component.name}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipContent className="font-mono">
                            Copy npx command
                          </TooltipContent>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={copyToClipboard}
                              variant="outline"
                              className="p-2"
                              size="iconSm"
                              aria-label="Copy npx command to clipboard"
                            >
                              {copied ? (
                                <Check className="size-4" />
                              ) : (
                                <Copy className="size-4" />
                              )}
                            </Button>
                          </TooltipTrigger>
                        </Tooltip>
                      </TooltipProvider>

                      <OpenInV0Button
                        registryUrl={registryUrl}
                        title={`${component.title} Kit`}
                        prompt={prompt}
                      />
                    </div>
                  </div>
                </CardHeader>
                <div className="p-4">
                  <iframe
                    id="iframe"
                    src={`/demo/${component.name}`}
                    className="w-full h-[400px]"
                    title="Page Preview"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </ResizablePanel>
        <ResizableHandle className="group relative w-4 bg-transparent hover:bg-transparent data-[panel-group-direction=vertical]:h-4 data-[panel-group-direction=vertical]:w-full">
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex h-6 w-4 items-center justify-center rounded border bg-background shadow-md">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </ResizableHandle>
        <ResizablePanel 
          id={`${component.name}-panel-right`}
          defaultSize={0}
          minSize={0}
          maxSize={40}
        >
          {/* Empty resizable space */}
        </ResizablePanel>
      </ResizablePanelGroup>
    </section>
  );
}