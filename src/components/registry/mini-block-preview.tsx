"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface MiniBlockPreviewProps {
  componentName: string;
  className?: string;
}

export function MiniBlockPreview({ componentName, className = "" }: MiniBlockPreviewProps) {
  const renderComponentPreview = () => {
    switch (componentName.toLowerCase()) {
      case 'button':
        return (
          <div className="space-y-2">
            <Button size="sm">Primary</Button>
            <Button variant="outline" size="sm">Outline</Button>
          </div>
        );
      
      case 'card':
        return (
          <Card className="w-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Card Title</CardTitle>
              <CardDescription className="text-xs">Card description here</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground">Card content...</p>
            </CardContent>
          </Card>
        );
      
      case 'badge':
        return (
          <div className="flex gap-1 flex-wrap">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        );
      
      case 'input':
        return (
          <div className="space-y-2">
            <Input placeholder="Enter text..." className="h-8 text-xs" />
            <Input placeholder="Disabled" disabled className="h-8 text-xs" />
          </div>
        );
      
      case 'switch':
        return (
          <div className="flex items-center space-x-2">
            <Switch id="demo-switch" />
            <label htmlFor="demo-switch" className="text-xs">Toggle me</label>
          </div>
        );
      
      case 'avatar':
        return (
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
              A
            </div>
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs">
              B
            </div>
          </div>
        );
      
      case 'progress':
        return (
          <div className="space-y-2">
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-primary h-2 rounded-full w-3/4"></div>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-primary h-2 rounded-full w-1/2"></div>
            </div>
          </div>
        );
      
      case 'alert':
        return (
          <div className="border rounded-lg p-2 bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
            <div className="flex gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500 flex-shrink-0 mt-0.5"></div>
              <div>
                <p className="text-xs font-medium">Info</p>
                <p className="text-xs text-muted-foreground">This is an alert message</p>
              </div>
            </div>
          </div>
        );
      
      case 'tabs':
        return (
          <div className="space-y-2">
            <div className="flex gap-1 border-b">
              <div className="px-2 py-1 text-xs border-b-2 border-primary">Tab 1</div>
              <div className="px-2 py-1 text-xs text-muted-foreground">Tab 2</div>
            </div>
            <div className="p-2 text-xs">Tab content here</div>
          </div>
        );
      
      default:
        return (
          <div className="flex items-center justify-center h-16 bg-muted rounded border-2 border-dashed">
            <p className="text-xs text-muted-foreground">{componentName}</p>
          </div>
        );
    }
  };

  return (
    <div className={`p-3 bg-background rounded-lg border min-h-[80px] flex items-center justify-center ${className}`}>
      <div className="w-full max-w-full overflow-hidden">
        {renderComponentPreview()}
      </div>
    </div>
  );
}