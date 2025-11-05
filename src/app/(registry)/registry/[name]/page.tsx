import {
  type LucideIcon,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ComponentCard } from "@/components/registry/component-card";
import { ComponentActions } from "@/components/registry/component-actions";
import { RegistryNavigation } from "@/components/registry/registry-navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getRegistryItem, getRegistryItems } from "@/lib/registry";
import { getPrompt } from "@/lib/utils";

// Function to get icon component from registry data
function getIconComponent(component: any): LucideIcon | null {
  if (component.icon && LucideIcons[component.icon as keyof typeof LucideIcons]) {
    return LucideIcons[component.icon as keyof typeof LucideIcons] as LucideIcon;
  }
  return null;
}

export async function generateStaticParams() {
  const components = getRegistryItems();

  return components.map(({ name }) => ({
    name,
  }));
}

export default async function RegistryItemPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const component = getRegistryItem(name);
  const allComponents = getRegistryItems();
  
  if (!component) {
    notFound();
  }

  // Get the icon component from the registry data
  const IconComponent = getIconComponent(component);

  // Find current component index and get prev/next
  const currentIndex = allComponents.findIndex(c => c.name === name);
  const prevComponent = currentIndex > 0 ? allComponents[currentIndex - 1] : null;
  const nextComponent = currentIndex < allComponents.length - 1 ? allComponents[currentIndex + 1] : null;

  // Component metadata for markdown
  const componentUrl = `${process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : ''}/registry/${component.name}`;
  const registryUrl = `${process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : ''}/r/${component.name}.json`;
  const npxCommand = `npx shadcn@latest add ${registryUrl}`;

  // Generate markdown for copying
  const markdown = `# ${component.title}

${component.description || ''}

## Installation

\`\`\`bash
${npxCommand}
\`\`\`

## Component Details

- **Type**: ${component.type}
- **Name**: ${component.name}
- **URL**: [${componentUrl}](${componentUrl})
- **Registry**: [${registryUrl}](${registryUrl})
`;

  return (
    <div className="flex flex-col min-h-full w-full">
      <div className="flex-1 p-5 md:p-10">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Registry</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{component.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header with title, badges, and actions */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <h1 className="font-medium text-2xl tracking-tight text-subtle-foreground/85 flex items-center gap-3">
              {IconComponent && <IconComponent className="size-6 text-muted-foreground/90" />}
              {component.title}
            </h1>
           {/*   <div className="flex gap-2">
              <Badge variant="secondary" className="capitalize">
                {component.type.replace('registry:', '')}
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Hash className="size-3" />
                {component.name}
              </Badge>
            </div>*/}
          </div>
          
          {/* Action buttons 
          <ComponentActions component={component} markdown={markdown} />*/}
        </div>

        {/* Description */}
        {component.description && (
          <p className="text-muted-foreground font-default max-w-3xl">
            {component.description}
          </p>
        )}
      </div>

      {/* Component preview card */}
      <ComponentCard
        component={component}
        baseUrl={process.env.VERCEL_PROJECT_PRODUCTION_URL ?? ""}
        prompt={getPrompt()}
      />
      </div>

      {/* Footer navigation - sticky at bottom of content */}
      <RegistryNavigation 
        prevComponent={prevComponent}
        nextComponent={nextComponent}
      />
    </div>
  );
}
