"use client";

import { useCallback, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown, Tag } from "lucide-react";
import { categories } from "@/lib/books";
import { getCategorySelectionLabel } from "@/lib/filter-labels";
import { useFloatingPanel } from "@/hooks/use-floating-panel";
import type { RecalibratePhase } from "@/hooks/use-catalog-recalibrate";
import { cn } from "@/lib/utils";

type CategoryMultiSelectProps = {
  value: string[];
  onChange: (slugs: string[]) => void;
  recalibratePhase?: RecalibratePhase;
};

export function CategoryMultiSelect({
  value,
  onChange,
  recalibratePhase = "idle",
}: CategoryMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const isOpen = open && recalibratePhase === "idle";
  const close = useCallback(() => setOpen(false), []);

  const { position: panelPosition } = useFloatingPanel({
    isOpen,
    onClose: close,
    triggerRef,
    rootRef,
    panelId: listId,
  });

  function toggle(slug: string) {
    if (value.includes(slug)) {
      onChange(value.filter((s) => s !== slug));
      return;
    }
    onChange([...value, slug]);
  }

  function handleTriggerClick() {
    if (recalibratePhase !== "idle") return;
    setOpen((prev) => !prev);
  }

  const allSelected = value.length === categories.length;

  const panel = isOpen && panelPosition && (
    <div
      id={listId}
      role="listbox"
      aria-multiselectable="true"
      aria-label="Selecionar categorias"
      className="book-filters__category-panel book-filters__category-panel--floating"
      style={{
        top: panelPosition.top,
        left: panelPosition.left,
        width: panelPosition.width,
      }}
    >
      <div className="book-filters__category-panel-actions">
        <button
          type="button"
          className="book-filters__category-panel-action"
          disabled={allSelected}
          onClick={() => onChange(categories.map((c) => c.slug))}
        >
          Marcar todas
        </button>
        <button
          type="button"
          className="book-filters__category-panel-action"
          disabled={value.length === 0}
          onClick={() => onChange([])}
        >
          Limpar
        </button>
      </div>
      <ul className="book-filters__category-list">
        {categories.map((cat) => {
          const selected = value.includes(cat.slug);
          return (
            <li key={cat.slug}>
              <button
                type="button"
                role="option"
                aria-selected={selected}
                className={cn(
                  "book-filters__category-option",
                  selected && "book-filters__category-option--selected",
                )}
                onClick={() => toggle(cat.slug)}
              >
                <span className="book-filters__category-check" aria-hidden>
                  {selected && <Check className="size-3" />}
                </span>
                <span className="book-filters__category-option-label">
                  {cat.name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        "book-filters__category-select",
        isOpen && "book-filters__category-select--open",
      )}
    >
      <button
        ref={triggerRef}
        type="button"
        id="filter-category"
        className={cn(
          "book-filters__trigger w-full",
          isOpen && "book-filters__trigger--open",
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listId}
        disabled={recalibratePhase !== "idle"}
        onClick={handleTriggerClick}
      >
        <span className="book-filters__trigger-icon" aria-hidden>
          <Tag className="size-3.5" />
        </span>
        <span className="book-filters__trigger-value truncate">
          {getCategorySelectionLabel(value)}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform",
            isOpen && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      {typeof document !== "undefined" &&
        panel &&
        createPortal(panel, document.body)}
    </div>
  );
}
