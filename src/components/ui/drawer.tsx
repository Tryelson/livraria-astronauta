"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type DrawerSide = "top" | "right" | "bottom" | "left";

type DrawerProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: DrawerSide;
  /**
   * Largura do painel — Tailwind normal (`w-full`, `max-w-*`, `sm:max-w-*`).
   * Padrão sem `className`: `w-full sm:max-w-[28rem]`.
   */
  className?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
};

const drawerPanelBase = [
  "flex flex-col gap-0 p-0",
  "[&_[data-slot=sheet-close]]:top-5 [&_[data-slot=sheet-close]]:right-5",
  "sm:[&_[data-slot=sheet-close]]:right-6",
];

const drawerPanelWidthDefault = "w-full sm:max-w-[28rem]";

const drawerBodyBase = [
  "flex min-h-0 flex-1 flex-col",
  "px-5 pt-6 pb-[max(1.25rem,env(safe-area-inset-bottom))]",
  "sm:px-6 sm:pt-7 sm:pb-8",
];

function DrawerRoot({
  open,
  onOpenChange,
  side = "right",
  className,
  children,
  showCloseButton = true,
}: DrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={side}
        showCloseButton={showCloseButton}
        className={cn(drawerPanelBase, drawerPanelWidthDefault, className)}
      >
        {children}
      </SheetContent>
    </Sheet>
  );
}

type DrawerSectionProps = {
  className?: string;
  children: React.ReactNode;
};

function DrawerBody({ className, children }: DrawerSectionProps) {
  return <div className={cn(drawerBodyBase, className)}>{children}</div>;
}

function DrawerHeader({ className, children }: DrawerSectionProps) {
  return (
    <SheetHeader className={cn("mb-4 space-y-0 p-0 pr-10", className)}>
      {children}
    </SheetHeader>
  );
}

function DrawerFooter({ className, children }: DrawerSectionProps) {
  return (
    <SheetFooter
      className={cn("mt-5 gap-4 border-t border-border p-0 pt-5", className)}
    >
      {children}
    </SheetFooter>
  );
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetTitle>) {
  return (
    <SheetTitle
      className={cn("flex items-center gap-2 text-lg", className)}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetDescription>) {
  return <SheetDescription className={cn("text-sm", className)} {...props} />;
}

export const Drawer = Object.assign(DrawerRoot, {
  Body: DrawerBody,
  Header: DrawerHeader,
  Footer: DrawerFooter,
  Title: DrawerTitle,
  Description: DrawerDescription,
});

export type { DrawerProps, DrawerSide };
