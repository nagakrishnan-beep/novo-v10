import { useEffect, useRef, useState } from "react";

type Target = HTMLElement | null;

function isEditableText(el: HTMLElement): boolean {
  if (!el || el.closest("[data-copy-editor-ui]")) return false;
  // must contain text
  const text = (el.textContent ?? "").trim();
  if (!text) return false;
  // prefer leaf-ish text nodes
  const tag = el.tagName.toLowerCase();
  if (["html", "body", "script", "style", "svg", "path"].includes(tag)) return false;
  return true;
}

export function InlineCopyEditor() {
  const [enabled, setEnabled] = useState(false);
  const [target, setTarget] = useState<Target>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [fontSize, setFontSize] = useState(16);
  const [color, setColor] = useState("#ffffff");
  const hoverOutlineRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled) {
      if (hoverOutlineRef.current) {
        hoverOutlineRef.current.style.outline = "";
        hoverOutlineRef.current = null;
      }
      return;
    }

    const onMove = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (!el || el.closest("[data-copy-editor-ui]")) return;
      if (hoverOutlineRef.current && hoverOutlineRef.current !== el) {
        hoverOutlineRef.current.style.outline = "";
      }
      if (isEditableText(el)) {
        el.style.outline = "1px dashed #34d399";
        hoverOutlineRef.current = el;
      }
    };

    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (!el || el.closest("[data-copy-editor-ui]")) return;
      if (!isEditableText(el)) return;
      e.preventDefault();
      e.stopPropagation();
      selectTarget(el);
    };

    document.addEventListener("mousemove", onMove, true);
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("mousemove", onMove, true);
      document.removeEventListener("click", onClick, true);
      if (hoverOutlineRef.current) {
        hoverOutlineRef.current.style.outline = "";
        hoverOutlineRef.current = null;
      }
    };
  }, [enabled]);

  const selectTarget = (el: HTMLElement) => {
    if (target && target !== el) target.style.outline = "";
    el.style.outline = "2px solid #34d399";
    el.setAttribute("contenteditable", "true");
    el.focus();
    const cs = window.getComputedStyle(el);
    setFontSize(parseFloat(cs.fontSize) || 16);
    // convert rgb to hex
    const rgb = cs.color.match(/\d+/g);
    if (rgb && rgb.length >= 3) {
      const hex =
        "#" +
        rgb
          .slice(0, 3)
          .map((n) => Number(n).toString(16).padStart(2, "0"))
          .join("");
      setColor(hex);
    }
    setTarget(el);
    setRect(el.getBoundingClientRect());
  };

  const clearTarget = () => {
    if (target) {
      target.style.outline = "";
      target.removeAttribute("contenteditable");
    }
    setTarget(null);
    setRect(null);
  };

  useEffect(() => {
    if (!target) return;
    target.style.fontSize = `${fontSize}px`;
  }, [fontSize, target]);

  useEffect(() => {
    if (!target) return;
    target.style.color = color;
  }, [color, target]);

  useEffect(() => {
    const onScroll = () => {
      if (target) setRect(target.getBoundingClientRect());
    };
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [target]);

  return (
    <div data-copy-editor-ui>
      <button
        onClick={() => {
          setEnabled((v) => {
            if (v) clearTarget();
            return !v;
          });
        }}
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 2147483000,
          padding: "8px 12px",
          borderRadius: 999,
          background: enabled ? "#34d399" : "rgba(20,20,20,0.85)",
          color: enabled ? "#02110a" : "#e5e7eb",
          border: "1px solid rgba(255,255,255,0.15)",
          fontSize: 12,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        }}
      >
        {enabled ? "Editing • Exit" : "Edit copy"}
      </button>

      {enabled && target && rect && (
        <div
          style={{
            position: "fixed",
            top: Math.max(8, rect.top - 90),
            left: Math.min(window.innerWidth - 280, Math.max(8, rect.left)),
            zIndex: 2147483000,
            width: 268,
            padding: 10,
            borderRadius: 10,
            background: "rgba(10,12,16,0.96)",
            color: "#e5e7eb",
            border: "1px solid rgba(255,255,255,0.12)",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            fontSize: 12,
            boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.6 }}>
              {target.tagName.toLowerCase()}
            </span>
            <button
              onClick={clearTarget}
              style={{
                background: "transparent",
                color: "#9ca3af",
                border: "none",
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              ✕
            </button>
          </div>

          <label style={{ display: "block", marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span>Size</span>
              <span style={{ opacity: 0.7 }}>{fontSize.toFixed(0)}px</span>
            </div>
            <input
              type="range"
              min={8}
              max={160}
              step={1}
              value={fontSize}
              onChange={(e) => setFontSize(parseFloat(e.target.value))}
              style={{ width: "100%" }}
            />
          </label>

          <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <span>Color</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{ width: 32, height: 24, background: "transparent", border: "none", cursor: "pointer" }}
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{
                  width: 90,
                  padding: "4px 6px",
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.06)",
                  color: "#e5e7eb",
                  border: "1px solid rgba(255,255,255,0.12)",
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 11,
                }}
              />
            </div>
          </label>

          <p style={{ margin: "10px 0 0", opacity: 0.55, lineHeight: 1.4 }}>
            Text is editable inline. Changes live on this session only.
          </p>
        </div>
      )}
    </div>
  );
}
