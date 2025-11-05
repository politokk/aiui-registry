"use client";

import { Check, Copy, ExternalLink, Package } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Component } from "@/lib/registry";

interface ComponentActionsProps {
  component: Component;
  markdown: string;
}

export function ComponentActions({ component, markdown }: ComponentActionsProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy markdown: ", err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Copy markdown button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
            >
              {copied ? (
                <>
                  <Check className="size-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="size-4 mr-2" />
                  Copy Markdown
                </>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy component details as markdown</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* AI platforms dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <ExternalLink className="size-4 mr-2" />
            Open in AI
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Open in AI Platform</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <a
              href={`https://claude.ai/new?q=${encodeURIComponent(`Help me implement this component:\n\n${markdown}`)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Package className="size-4 mr-2" />
              Claude
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a
              href={`https://chat.openai.com/?q=${encodeURIComponent(`Help me implement this component:\n\n${markdown}`)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Package className="size-4 mr-2" />
              ChatGPT
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a
              href={`https://gemini.google.com/app?q=${encodeURIComponent(`Help me implement this component:\n\n${markdown}`)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Package className="size-4 mr-2" />
              Gemini
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a
              href={`https://copilot.microsoft.com/?q=${encodeURIComponent(`Help me implement this component:\n\n${markdown}`)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Package className="size-4 mr-2" />
              Copilot
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
