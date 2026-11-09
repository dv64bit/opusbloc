import { useEffect, useState } from "react";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import logoMark from "../assets/image.png";

export function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    back: (
      <>
        <path d="m15 18-6-6 6-6" />
        <path d="M9 12h10" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    shield: (
      <>
        <path d="M12 3 5 6v5c0 4.5 2.8 8.5 7 10 4.2-1.5 7-5.5 7-10V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    phone: <path d="M7 3h10v18H7zM10 18h4" />,
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    camera: (
      <>
        <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
        <circle cx="12" cy="13" r="3" />
      </>
    ),
    upload: (
      <>
        <path d="M12 16V4m-5 5 5-5 5 5" />
        <path d="M5 20h14" />
      </>
    ),
    file: (
      <>
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v5h5M9 13h6M9 17h6" />
      </>
    ),
    // Lucide "fingerprint" (ISC)
    fingerprint: (
      <>
        <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
        <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
        <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
        <path d="M2 12a10 10 0 0 1 18-6" />
        <path d="M2 16h.01" />
        <path d="M21.8 16c.2-2 .131-5.354 0-6" />
        <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
        <path d="M8.65 22c.21-.66.45-1.32.57-2" />
        <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10M9 20v-6h6v6" />
      </>
    ),
    market: (
      <>
        <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      </>
    ),
    activity: (
      <>
        <path d="M4 6h16M4 12h10M4 18h13" />
        <circle cx="18" cy="12" r="2" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.8 9a2.4 2.4 0 1 1 3 2.3c-.8.3-.8 1-.8 1.7M12 17h.01" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    qr: (
      <>
        <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v6h-6v-2" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    chevron: <path d="m9 6 6 6-6 6" />,
    // Lucide "share", "heart", "map-pin" (ISC)
    share: (
      <>
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <path d="m16 6-4-4-4 4M12 2v13" />
      </>
    ),
    heart: (
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    ),
    pin: (
      <>
        <path d="M20 10c0 5-5.5 10.2-7.4 11.8a1 1 0 0 1-1.2 0C9.5 20.2 4 15 4 10a8 8 0 0 1 16 0" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className={`logo ${light ? "logo-light" : ""}`} aria-label="Opus Bloc">
      <img className="logo-mark" src={logoMark} alt="" />
      <span>
        OPUS <b>BLOC</b>
      </span>
    </div>
  );
}

export function Button({
  children,
  variant = "primary",
  loading,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "text";
  loading?: boolean;
}) {
  return (
    <button className={`btn btn-${variant}`} {...props} disabled={props.disabled || loading}>
      {loading ? <span className="spinner" aria-label="Loading" /> : children}
    </button>
  );
}

export function TextField({
  label,
  error,
  hint,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; hint?: string }) {
  return (
    <label className="field">
      <span className="field-label">
        {label}
        {props.required && <b> *</b>}
      </span>
      <input
        aria-invalid={!!error}
        aria-describedby={error ? `${props.id}-error` : undefined}
        {...props}
      />
      {error ? (
        <span className="field-error" id={`${props.id}-error`}>
          {error}
        </span>
      ) : hint ? (
        <span className="field-hint">{hint}</span>
      ) : null}
    </label>
  );
}

export function OtpInput({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const onKey = (index: number, key: string) => {
    if (/^\d$/.test(key)) {
      const next = (value + "      ").split("");
      next[index] = key;
      onChange(next.join("").replace(/\s/g, "").slice(0, 6));
      setTimeout(() => document.getElementById(`otp-${Math.min(index + 1, 5)}`)?.focus());
    } else if (key === "Backspace") {
      onChange(value.slice(0, Math.max(0, index)));
      setTimeout(() => document.getElementById(`otp-${Math.max(index - 1, 0)}`)?.focus());
    }
  };
  return (
    <div>
      <div
        className="otp-group"
        onPaste={(e) => {
          const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
          if (digits) {
            e.preventDefault();
            onChange(digits);
          }
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <input
            key={i}
            id={`otp-${i}`}
            aria-label={`Digit ${i + 1}`}
            inputMode="numeric"
            value={value[i] || ""}
            onChange={() => {}}
            onKeyDown={(e) => onKey(i, e.key)}
            className={error ? "has-error" : ""}
          />
        ))}
      </div>
      {error && (
        <p className="field-error centered" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function Progress({
  process,
  step,
  total,
}: {
  process: string;
  step: number;
  total: number;
}) {
  return (
    <div className="progress-wrap">
      <div className="progress-label">
        <span>{process}</span>
        <span>
          Step {step} of {total}
        </span>
      </div>
      <div className="progress-track">
        <span style={{ width: `${(step / total) * 100}%` }} />
      </div>
    </div>
  );
}

export function Notice({
  type = "info",
  children,
}: {
  type?: "info" | "success" | "error" | "warning";
  children: ReactNode;
}) {
  return (
    <div className={`notice notice-${type}`} role={type === "error" ? "alert" : "status"}>
      <Icon
        name={
          type === "success"
            ? "check"
            : type === "error"
              ? "close"
              : type === "warning"
                ? "help"
                : "shield"
        }
        size={18}
      />
      <span>{children}</span>
    </div>
  );
}

export function Screen({
  children,
  back,
  label,
  noPad = false,
}: {
  children: ReactNode;
  back?: () => void;
  label?: string;
  noPad?: boolean;
}) {
  return (
    <main className={`screen ${noPad ? "screen-no-pad" : ""}`}>
      {(back || label) && (
        <header className="screen-top">
          {back ? (
            <button className="icon-btn" onClick={back} aria-label="Go back">
              <Icon name="back" />
            </button>
          ) : (
            <span />
          )}
          {label && <Logo />}
        </header>
      )}
      {children}
    </main>
  );
}

export function Sheet({
  title,
  children,
  close,
}: {
  title: string;
  children: ReactNode;
  close: () => void;
}) {
  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <section className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
        <div className="sheet-handle" />
        <div className="sheet-title">
          <h2 id="sheet-title">{title}</h2>
          <button className="icon-btn" onClick={close} aria-label="Close">
            <Icon name="close" />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

export function Toast() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const show = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail);
      clearTimeout(timer);
      timer = setTimeout(() => setMessage(""), 3200);
    };
    window.addEventListener("opus-notice", show);
    return () => {
      window.removeEventListener("opus-notice", show);
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="toast" role="status" aria-live="polite">
      {message && <p key={message}>{message}</p>}
    </div>
  );
}
