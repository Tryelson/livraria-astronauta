"use client";

import {
  TriangleAlertIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  Rocket,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const toastClassNames = {
  toast: "astronaut-toast",
  title: "astronaut-toast-title",
  description: "astronaut-toast-description",
  content: "astronaut-toast-content",
  icon: "astronaut-toast-icon",
  actionButton: "astronaut-toast-action",
  cancelButton: "astronaut-toast-cancel",
  closeButton: "astronaut-toast-close",
};

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="astronaut-toaster group"
      gap={14}
      offset={20}
      icons={{
        success: <Rocket className="size-4" aria-hidden />,
        info: <InfoIcon className="size-4" aria-hidden />,
        warning: <TriangleAlertIcon className="size-4" aria-hidden />,
        error: <OctagonXIcon className="size-4" aria-hidden />,
        loading: <Loader2Icon className="size-4 animate-spin" aria-hidden />,
      }}
      style={
        {
          "--normal-bg": "transparent",
          "--normal-text": "var(--brand-cream)",
          "--normal-border": "transparent",
          "--border-radius": "calc(var(--radius) * 1.4)",
          "--success-bg": "transparent",
          "--success-text": "var(--brand-cream)",
          "--success-border": "transparent",
          "--error-bg": "transparent",
          "--error-text": "var(--brand-cream)",
          "--error-border": "transparent",
        } as React.CSSProperties
      }
      toastOptions={{
        unstyled: true,
        classNames: toastClassNames,
      }}
      {...props}
    />
  );
};

export { Toaster };
