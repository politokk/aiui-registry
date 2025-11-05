"use client";

import dynamic from "next/dynamic";

const MCPTabs = dynamic(
  () => import("@/components/registry/mcp-tabs").then((mod) => mod.MCPTabs),
  {
    ssr: false,
    loading: () => <div className="h-[200px] animate-pulse bg-muted rounded-lg" />,
  }
);

export function MCPTabsWrapper({ rootUrl }: { rootUrl: string }) {
  return <MCPTabs rootUrl={rootUrl} />;
}
