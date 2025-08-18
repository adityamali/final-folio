"use client";
import React, { JSX, useEffect, useMemo, useRef, useState } from "react";

type BaseField = {
  id: string;
  question: string;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  options?: string[];
};

type TextField = BaseField & { type: "text" | "email" | "textarea" };
type SelectField = BaseField & { type: "select" | "multiselect"; options: string[] };
type RatingField = BaseField & { type: "rating"; scale?: number };

export type FormField = TextField | SelectField | RatingField;
export type FormValues = Record<string, string | string[] | number | undefined>;

type Props = {
  fields: FormField[];
  title?: string;
  description?: string;
  onSubmit: (values: FormValues) => void | Promise<void>;
};


export default function FormBuilder({ fields, title, onSubmit }: Props) {
  const total = fields.length;
  const [index, setIndex] = useState(0);
  const [values, setValues] = useState<FormValues>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [animating, setAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  // init defaults
  useEffect(() => {
    const init: FormValues = {};
    fields.forEach((f) => {
      if (f.type === "multiselect") init[f.id] = [];
      else if (f.type === "rating") init[f.id] = 0;
      else init[f.id] = "";
    });
    setValues((prev) => ({ ...init, ...prev }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields.map((f) => f.id).join("|")]);

  useEffect(() => {
    const el = inputRef.current;
    if (el && document.activeElement !== el) {
      el.focus();
      if ("select" in el) {
        // noop
      } else {
        try {
          (el as HTMLInputElement).setSelectionRange(
            (el as HTMLInputElement).value.length,
            (el as HTMLInputElement).value.length
          );
        } catch {}
      }
    }
  }, [values]); // Ensure this effect runs when values change

  const update = (id: string, value: FormValues[string]) => {
    setValues((v) => ({ ...v, [id]: value }));
    setTouched((t) => ({ ...t, [id]: true }));
  };

  const toggleMulti = (id: string, option: string) => {
    setValues((v) => {
      const current = (v[id] as string[]) || [];
      if (current.includes(option)) return { ...v, [id]: current.filter((o) => o !== option) };
      return { ...v, [id]: [...current, option] };
    });
    setTouched((t) => ({ ...t, [id]: true }));
  };

  const validate = (f: FormField) => {
    const val = values[f.id];
    if (!f.required) return true;
    if (f.type === "multiselect") return Array.isArray(val) && val.length > 0;
    if (f.type === "rating") return typeof val === "number" && val > 0;
    return val !== undefined && String(val).trim().length > 0;
  };

  const goTo = (newIndex: number, dir: "next" | "prev" = "next") => {
    if (animating || newIndex < 0 || newIndex >= total) return;
    // validate when moving forward
    if (dir === "next" && !validate(fields[index])) {
      setTouched((t) => ({ ...t, [fields[index].id]: true }));
      return;
    }
    setAnimating(true);
    // subtle exit animation then change index
    setTimeout(() => {
      setIndex(newIndex);
      setAnimating(false);
    }, 300);
  };

  const onNext = () => goTo(Math.min(index + 1, total - 1), "next");
  const onPrev = () => goTo(Math.max(0, index - 1), "prev");

  const handleSubmit = async () => {
    // full validation
    const allValid = fields.every(validate);
    setTouched(Object.fromEntries(fields.map((f) => [f.id, true])));
    if (!allValid) {
      const firstInvalid = fields.findIndex((f) => !validate(f));
      if (firstInvalid >= 0) goTo(firstInvalid, firstInvalid > index ? "next" : "prev");
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  };

  const pct = useMemo(() => Math.round(((index + 1) / total) * 100), [index, total]);

  // keyboard: Enter advances (except textarea)
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const tag = (e.target as HTMLElement).tagName.toLowerCase();
      if (tag === "textarea") return;
      e.preventDefault();
      if (index < total - 1) onNext();
      else handleSubmit();
    }
    if (e.key === "Escape") onPrev();
  };

  /* Renderers - Typeform-like big UI */
  const inputCommon =
    "block w-full bg-transparent text-2xl md:text-3xl placeholder:opacity-60 focus:outline-none";

  const renderText = (f: TextField) => {
    if (f.type === "textarea") {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement | null>}
          value={String(values[f.id] ?? "")}
          placeholder={f.placeholder ?? ""}
          onChange={(e) => {
            const cursorPosition = e.target.selectionStart;
            update(f.id, e.target.value);
            setTimeout(() => {
              const el = inputRef.current;
              if (el) {
                el.setSelectionRange(cursorPosition, cursorPosition);
              }
            }, 0);
          }}
          onKeyDown={onKeyDown}
          rows={6}
          className={`${inputCommon} resize-none leading-relaxed p-0`}
        />
      );
    }
    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        value={String(values[f.id] ?? "")}
        placeholder={f.placeholder ?? ""}
        onChange={(e) => update(f.id, e.target.value)}
        onKeyDown={onKeyDown}
        type={f.type}
        className={`${inputCommon} p-0`}
        inputMode={f.type === "email" ? "email" : "text"}
      />
    );
  };

  const renderOptions = (f: SelectField) => {
    const single = f.type === "select";
    const selected = (values[f.id] as string[]) || [];
    return (
      <div className="w-full flex flex-col gap-4">
        {f.options!.map((opt) => {
          const active = single ? values[f.id] === opt : selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => {
                if (single) {
                  update(f.id, opt);
                  // auto-advance after short delay to mimic Typeform
                  setTimeout(() => {
                    if (index < total - 1) onNext();
                    else handleSubmit();
                  }, 180);
                } else {
                  toggleMulti(f.id, opt);
                }
              }}
              className={`w-full text-left py-5 px-6 rounded-xl text-lg md:text-xl transition-shadow border ${
                active
                  ? "bg-primary text-white shadow-lg border-primary"
                  : "bg-white/6 dark:bg-neutral-800 border-transparent hover:shadow-md"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    );
  };

  const renderRating = (f: RatingField) => {
    const scale = f.scale ?? 5;
    const val = Number(values[f.id] ?? 0);
    return (
      <div className="flex gap-3">
        {Array.from({ length: scale }).map((_, i) => {
          const v = i + 1;
          const active = v <= val;
          return (
            <button
              key={v}
              onClick={() => {
                update(f.id, v);
                setTimeout(() => {
                  if (index < total - 1) onNext();
                  else handleSubmit();
                }, 180);
              }}
              className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center font-semibold transition ${
                active ? "bg-amber-400 text-black shadow-lg scale-105" : "bg-white/6 dark:bg-neutral-800 border border-transparent"
              }`}
            >
              {v}
            </button>
          );
        })}
      </div>
    );
  };

  // big centered Typeform-like card content
  const Card = ({ field, state }: { field: FormField; state: "enter" | "center" | "exit" }) => {
    const hidden = state === "exit";
    const baseTransform =
      state === "enter" ? "translate-y-6 opacity-0 scale-98" : state === "exit" ? "translate-y-6 opacity-0 scale-98" : "translate-y-0 opacity-100 scale-100";
    return (
      <div
        aria-hidden={hidden}
        className={`inset-0 flex items-center justify-center p-6 md:p-12 transition-all duration-300 ${baseTransform}`}
        style={{ pointerEvents: hidden ? "none" : "auto" }}
      >
        <div className="w-full max-w-2xl bg-white/5 dark:bg-neutral-900/60 backdrop-blur-md rounded-3xl p-10 md:p-16 shadow-2xl border border-transparent">
          <div className="max-w-prose mx-auto text-center">
            <div className="text-sm uppercase tracking-wide text-muted-foreground mb-3">{title}</div>
            <div className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">{field.question}</div>
            {field.hint && <div className="text-sm text-muted-foreground mb-6">{field.hint}</div>}

            <div className="mt-6">
              {field.type === "text" || field.type === "email" || field.type === "textarea" ? (
                <div className="border-b border-white/8 pb-4">
                  {renderText(field as TextField)}
                  {touched[field.id] && !validate(field) && <div className="text-sm text-red-500 mt-3">This field is required</div>}
                </div>
              ) : null}

              {field.type === "select" || field.type === "multiselect" ? renderOptions(field as SelectField) : null}
              {field.type === "rating" ? renderRating(field as RatingField) : null}
            </div>

            {/* footer helper */}
            <div className="mt-8 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">{index + 1} / {total}</div>
              <div className="text-sm text-muted-foreground">{pct}%</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // decide states for current and incoming card (simple: current center, prev/next enter/exit)
  const renderAnimatedCards = () => {
    const items: JSX.Element[] = [];
    // previous (if animating and moving prev)
    const prevIndex = Math.max(0, index - 1);
    const nextIndex = Math.min(total - 1, index + 1);

    // center card
    items.push(<Card key={`c-${index}`} field={fields[index]} state={animating ? "exit" : "center"} />);

    // if animating show incoming depending on direction
    // we approximate by showing next card briefly on animation start
    if (animating) {
      // when animating we show both current (exiting) and target (entering)
      // determine target: if we moved forward index already updated after timeout; we assume animation shows next/prev
      // Show both neighbor cards for smoothness
      if (index > 0) items.push(<Card key={`p-${prevIndex}`} field={fields[prevIndex]} state={"enter"} />);
      if (index < total - 1) items.push(<Card key={`n-${nextIndex}`} field={fields[nextIndex]} state={"enter"} />);
    }

    return <div className="relative w-full h-full">{items}</div>;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black/40">
      <div className="w-full max-w-5xl p-4">
        {/* center stage */}
        <div className="h-full">{renderAnimatedCards()}</div>

        {/* floating controls */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onPrev}
            disabled={index === 0 || submitting}
            aria-label="Previous question"
            className={`px-3 py-2 rounded-md text-sm font-medium transition ${index === 0 ? "opacity-40 pointer-events-none" : "bg-white/6 hover:bg-white/8"}`}
          >
            ← Back
          </button>

          {index < total - 1 ? (
            <div className="flex items-center gap-2">
            <span className="font-extralight font-sans">Press Enter</span>
            <button
              onClick={onNext}
              disabled={submitting}
              className="w-16 h-16 rounded-full bg-primary text-white shadow-xl flex items-center justify-center text-lg font-semibold"
              aria-label="Next question"
            >
              →
            </button>
            </div>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-semibold shadow-xl"
              aria-label="Submit form"
            >
              {submitting ? "Saving..." : "Submit"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
