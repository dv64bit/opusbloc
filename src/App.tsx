import { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Icon,
  Logo,
  Notice,
  OtpInput,
  Progress,
  Screen,
  Sheet,
  TextField,
} from "./components";
import { mockServices } from "./services/mockServices";
import type { AppState, KycStatus, PanDetails, Route } from "./types";

import HERO from "../assets/hero.jpg";
import PROPERTY_2 from "../assets/crescent-residences.jpg";
import PROPERTY_3 from "../assets/aurum-business-house.jpg";

// Shown by <Toast /> (components.tsx); avoids window.alert, which embedded viewers block.
const demoNotice = (message: string) =>
  window.dispatchEvent(new CustomEvent("opus-notice", { detail: message }));

const countries = [
  { name: "India", dial: "+91", flag: "IN", length: 10 },
  { name: "United Arab Emirates", dial: "+971", flag: "AE", length: 9 },
  { name: "Singapore", dial: "+65", flag: "SG", length: 8 },
  { name: "United Kingdom", dial: "+44", flag: "GB", length: 10 },
  { name: "United States", dial: "+1", flag: "US", length: 10 },
];

// v2: KYC moved out of onboarding — progress saved by the old flow is discarded.
const PROGRESS_KEY = "opus-progress-v2";

const initialState: AppState = {
  mobileVerified: false,
  emailVerified: false,
  accountCreated: false,
  referralApplied: false,
  kycStatus: "not-started",
  biometricEnabled: false,
  onboardingCompleted: false,
};

function getSaved(): AppState {
  try {
    return { ...initialState, ...JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}") };
  } catch {
    return initialState;
  }
}

function routeFromHash(): Route {
  const value = location.hash.replace("#/", "") as Route;
  const valid: Route[] = [
    "intro",
    "phone",
    "phone-otp",
    "email",
    "email-otp",
    "account-ready",
    "referral",
    "kyc-intro",
    "pan",
    "upload",
    "preview",
    "processing",
    "biometric",
    "home",
    "market",
    "activity",
    "profile",
    "security",
    "property",
  ];
  return valid.includes(value) ? value : "intro";
}

export default function App() {
  const [splash, setSplash] = useState(!sessionStorage.getItem("opus-seen"));
  const [route, setRoute] = useState<Route>(routeFromHash());
  const [state, setState] = useState<AppState>(getSaved);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pan, setPan] = useState<PanDetails>({ pan: "", name: "", dob: "" });
  const [document, setDocument] = useState<{ file: File; url: string } | null>(null);

  useEffect(() => {
    if (!splash) return;
    const t = setTimeout(() => {
      sessionStorage.setItem("opus-seen", "1");
      setSplash(false);
    }, 1500);
    return () => clearTimeout(t);
  }, [splash]);
  useEffect(() => {
    const listener = () => setRoute(routeFromHash());
    window.addEventListener("hashchange", listener);
    return () => window.removeEventListener("hashchange", listener);
  }, []);
  useEffect(() => localStorage.setItem(PROGRESS_KEY, JSON.stringify(state)), [state]);

  const go = (next: Route) => {
    location.hash = `/${next}`;
    setRoute(next);
    window.scrollTo(0, 0);
  };
  const patch = (next: Partial<AppState>) => setState((old) => ({ ...old, ...next }));
  const guardedRoute = useMemo<Route>(() => {
    if (["email", "email-otp"].includes(route) && !state.mobileVerified) return "phone";
    if (
      [
        "account-ready",
        "referral",
        "kyc-intro",
        "pan",
        "upload",
        "preview",
        "processing",
        "biometric",
        "home",
        "market",
        "activity",
        "profile",
        "security",
        "property",
      ].includes(route) &&
      !state.accountCreated
    )
      return state.mobileVerified ? "email" : "phone";
    return route;
  }, [route, state.mobileVerified, state.accountCreated]);

  if (splash)
    return (
      <div className="splash">
        <div className="splash-glow" />
        <Logo />
        <p>Property, thoughtfully owned.</p>
      </div>
    );

  const common = {
    go,
    state,
    patch,
    phone,
    setPhone,
    email,
    setEmail,
    pan,
    setPan,
    document,
    setDocument,
  };
  switch (guardedRoute) {
    case "intro":
      return <Intro go={go} />;
    case "phone":
      return <Phone {...common} />;
    case "phone-otp":
      return (
        <OtpScreen
          kind="mobile"
          value={phone}
          go={go}
          onVerified={() => {
            patch({ mobileVerified: true });
            go("email");
          }}
        />
      );
    case "email":
      return <Email {...common} />;
    case "email-otp":
      return (
        <OtpScreen
          kind="email"
          value={email}
          go={go}
          onVerified={() => {
            patch({ emailVerified: true, accountCreated: true });
            go("account-ready");
          }}
        />
      );
    case "account-ready":
      return <AccountReady go={go} />;
    case "referral":
      return <Referral go={go} patch={patch} />;
    case "kyc-intro":
      return <KycIntro go={go} />;
    case "pan":
      return <Pan {...common} />;
    case "upload":
      return <Upload {...common} />;
    case "preview":
      return <Preview {...common} />;
    case "processing":
      return <Processing go={go} state={state} patch={patch} />;
    case "biometric":
      return <Biometric go={go} state={state} patch={patch} />;
    case "market":
    case "activity":
    case "profile":
    case "security":
    case "property":
    case "home":
      return <MainApp route={guardedRoute} go={go} state={state} patch={patch} />;
  }
}

function Intro({ go }: { go: (r: Route) => void }) {
  const [sheet, setSheet] = useState(false);
  return (
    <Screen noPad>
      <section className="intro-hero">
        <nav>
          <Logo light />
          <span className="nav-note">Private access</span>
        </nav>
        <div
          className="hero-image"
          style={{
            backgroundImage: `linear-gradient(180deg,transparent 25%,var(--scrim)),linear-gradient(180deg,transparent 45%,var(--scrim)),linear-gradient(180deg,transparent 60%,var(--scrim)),url(${HERO})`,
          }}
        >
          <div className="hero-copy">
            <p className="eyebrow light">Fractional real estate</p>
            <h1>
              Own a piece of what was <em>once out of reach.</em>
            </h1>
            <p>
              Discover premium real estate opportunities, own fractional shares, and track your
              holdings and income — all from one place.
            </p>
          </div>
        </div>
      </section>
      <section className="intro-body">
        <div className="intro-actions">
          <Button onClick={() => go("phone")}>
            Get started <Icon name="arrow" />
          </Button>
          <Button variant="secondary" onClick={() => setSheet(true)}>
            How it works
          </Button>
        </div>
        <p className="risk-note">
          Investments carry risk. Projected returns are estimates, not guarantees.
        </p>
      </section>
      {sheet && (
        <Sheet title="How fractional ownership works" close={() => setSheet(false)}>
          <p className="eyebrow">What you get</p>
          <dl className="value-list">
            {[
              ["Access", "Explore premium opportunities without purchasing an entire property."],
              ["Ownership", "Build fractional ownership in eligible properties."],
              ["Tracking", "Monitor your investments, income, and portfolio activity."],
            ].map(([t, d]) => (
              <div key={t}>
                <dt>{t}</dt>
                <dd>{d}</dd>
              </div>
            ))}
          </dl>
          <p className="eyebrow">Four steps</p>
          <ol className="how-list">
            <li>
              <b>Explore</b>
              <span>Review property, ownership and risk information.</span>
            </li>
            <li>
              <b>Choose a fraction</b>
              <span>Select an eligible investment amount.</span>
            </li>
            <li>
              <b>Complete checks</b>
              <span>Verify your identity before investment actions.</span>
            </li>
            <li>
              <b>Track</b>
              <span>See holdings, documents and income activity in one place.</span>
            </li>
          </ol>
          <div className="trust-row">
            {["Transparent information", "Clear documentation", "Secure account access"].map(
              (t) => (
                <div key={t}>
                  <Icon name="check" size={16} />
                  {t}
                </div>
              ),
            )}
          </div>
          <Button
            onClick={() => {
              setSheet(false);
              go("phone");
            }}
          >
            Continue
          </Button>
        </Sheet>
      )}
    </Screen>
  );
}

function FormShell({
  children,
  back,
  eyebrow,
  title,
  copy,
  progress,
}: {
  children: React.ReactNode;
  back: () => void;
  eyebrow?: string;
  title: string;
  copy: string;
  progress?: React.ReactNode;
}) {
  return (
    <Screen back={back} label="logo">
      <div className="form-layout">
        <aside className="form-visual">
          <div>
            <Logo light />
            <p className="eyebrow light">OPUS BLOC</p>
            <h2>A considered path to property ownership.</h2>
          </div>
        </aside>
        <section className="form-panel">
          {progress}
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="screen-title">{title}</h1>
          <p className="screen-copy">{copy}</p>
          {children}
        </section>
      </div>
    </Screen>
  );
}

function Phone({
  go,
  phone,
  setPhone,
}: {
  go: (r: Route) => void;
  phone: string;
  setPhone: (v: string) => void;
}) {
  const [country, setCountry] = useState(countries[0]);
  const [search, setSearch] = useState("");
  const [selecting, setSelecting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const valid = phone.length === country.length;
  const submit = async () => {
    if (!valid) return setError(`Enter a valid ${country.length}-digit mobile number.`);
    setLoading(true);
    setError("");
    try {
      await mockServices.sendMobileOtp(phone);
      go("phone-otp");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <FormShell
      back={() => go("intro")}
      eyebrow="Account setup · Step 1 of 2"
      title="Your journey starts here."
      copy="Enter your mobile number to create your account or securely access an existing one."
      progress={<Progress process="Account setup" step={1} total={2} />}
    >
      <div className="phone-field">
        <button onClick={() => setSelecting(true)} aria-label="Choose country">
          <span>{country.flag}</span>
          <b>{country.dial}</b>
          <span>⌄</span>
        </button>
        <input
          aria-label="Mobile number"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="Mobile number"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value.replace(/\D/g, "").slice(0, country.length));
            setError("");
          }}
        />
      </div>
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
      <div className="reassurance">
        <Icon name="shield" />
        <p>
          <b>Used to secure your account</b>
          <span>We’ll also use it for essential account updates.</span>
        </p>
      </div>
      <Button disabled={!valid} loading={loading} onClick={submit}>
        Send verification code <Icon name="arrow" />
      </Button>
      <p className="legal">
        By continuing, you agree to our{" "}
        <button onClick={() => demoNotice("Our Terms of Service will be available here shortly.")}>
          Terms
        </button>{" "}
        and acknowledge our{" "}
        <button onClick={() => demoNotice("Our Privacy Policy will be available here shortly.")}>
          Privacy Policy
        </button>
        .
      </p>
      {selecting && (
        <Sheet title="Select country" close={() => setSelecting(false)}>
          <input
            className="search"
            placeholder="Search countries"
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="country-list">
            {countries
              .filter(
                (c) =>
                  c.name.toLowerCase().includes(search.toLowerCase()) || c.dial.includes(search),
              )
              .map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    setCountry(c);
                    setPhone("");
                    setSelecting(false);
                  }}
                >
                  <span>{c.flag}</span>
                  <b>{c.name}</b>
                  <span>{c.dial}</span>
                </button>
              ))}
          </div>
        </Sheet>
      )}
    </FormShell>
  );
}

function OtpScreen({
  kind,
  value,
  go,
  onVerified,
}: {
  kind: "mobile" | "email";
  value: string;
  go: (r: Route) => void;
  onVerified: () => void;
}) {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(45);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setInterval(() => setCountdown((n) => n - 1), 1000);
    return () => clearInterval(t);
  }, [countdown]);
  const masked =
    kind === "mobile"
      ? `+91 ${value.slice(0, 2)}XXX ${value.slice(-5)}`
      : `${value.slice(0, 1)}${"*".repeat(Math.min(4, value.indexOf("@") - 1))}${value.slice(value.indexOf("@"))}`;
  const verify = async () => {
    setLoading(true);
    setError("");
    try {
      await mockServices.verifyOtp(otp);
      onVerified();
    } catch (e) {
      setError((e as Error).message);
      setOtp("");
    } finally {
      setLoading(false);
    }
  };
  return (
    <FormShell
      back={() => go(kind === "mobile" ? "phone" : "email")}
      eyebrow={kind === "mobile" ? "Secure verification" : "Account setup · Step 2 of 2"}
      title={kind === "mobile" ? "Enter your code." : "Verify your email."}
      copy={`Enter the 6-digit verification code sent to ${masked}.`}
      progress={
        kind === "email" ? <Progress process="Account setup" step={2} total={2} /> : undefined
      }
    >
      <div className="change-row">
        <span>{masked}</span>
        <button onClick={() => go(kind === "mobile" ? "phone" : "email")}>
          {kind === "mobile" ? "Change number" : "Edit email"}
        </button>
      </div>
      <OtpInput
        value={otp}
        onChange={(v) => {
          setOtp(v);
          setError("");
        }}
        error={error}
      />
      <div className="resend">
        {sent ? (
          <span className="success-text">A new code was sent.</span>
        ) : countdown > 0 ? (
          <span>Request another code in 0:{String(countdown).padStart(2, "0")}</span>
        ) : (
          <button
            onClick={() => {
              setSent(true);
              setCountdown(45);
              setTimeout(() => setSent(false), 2500);
            }}
          >
            Resend code
          </button>
        )}
      </div>
      <Button disabled={otp.length !== 6} loading={loading} onClick={verify}>
        {kind === "mobile" ? "Verify & continue" : "Verify email"}
      </Button>
    </FormShell>
  );
}

function Email({
  go,
  email,
  setEmail,
}: {
  go: (r: Route) => void;
  email: string;
  setEmail: (v: string) => void;
}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const submit = async () => {
    if (!valid) return setError("Enter a valid email address.");
    setLoading(true);
    try {
      await mockServices.sendEmailOtp(email.trim());
      go("email-otp");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <FormShell
      back={() => go("phone")}
      title="Let's connect your email."
      copy="Your verified email keeps important documents, receipts, purchase agreements, and account updates in one place."
      progress={<Progress process="Account setup" step={2} total={2} />}
    >
      <Button
        variant="secondary"
        onClick={() => {
          setEmail("aarav.sharma@gmail.com");
          setError("");
        }}
      >
        <span className="google-g">G</span> Continue with Google
      </Button>
      <div className="divider">
        <span>Or continue with email</span>
      </div>
      <TextField
        id="email"
        label="Email address"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        error={error}
        onChange={(e) => {
          setEmail(e.target.value.trimStart());
          setError("");
        }}
      />
      <Button disabled={!valid} loading={loading} onClick={submit}>
        Send verification code
      </Button>
      <p className="support-copy">
        Your mobile number remains your sign-in method. Your email is used for important account
        documents and updates.
      </p>
    </FormShell>
  );
}

function AccountReady({ go }: { go: (r: Route) => void }) {
  return (
    <FormShell
      back={() => go("email")}
      eyebrow="Account created"
      title="Your account is ready."
      copy="Your mobile and email are verified. Take your time to explore. We’ll only ask for identity verification when you’re ready to invest."
    >
      <div className="completed-list">
        <div>
          <Icon name="phone" />
          <span>
            <b>Mobile verified</b>
            <small>Your secure sign-in method</small>
          </span>
          <Icon name="check" />
        </div>
        <div>
          <Icon name="mail" />
          <span>
            <b>Email verified</b>
            <small>Documents and important updates</small>
          </span>
          <Icon name="check" />
        </div>
      </div>
      <Button onClick={() => go("referral")}>
        Continue <Icon name="arrow" />
      </Button>
      <Notice>
        No PAN or documents needed now. You’ll complete KYC from your home screen, before your first
        investment.
      </Notice>
    </FormShell>
  );
}

function Referral({
  go,
  patch,
}: {
  go: (r: Route) => void;
  patch: (s: Partial<AppState>) => void;
}) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [camera, setCamera] = useState(false);
  const apply = async () => {
    if (!code) return setError("Enter a referral code, or skip this step.");
    setLoading(true);
    try {
      await mockServices.validateReferral(code);
      patch({ referralApplied: true });
      go("biometric");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <FormShell
      back={() => go("account-ready")}
      eyebrow="Optional"
      title="Do you have a referral?"
      copy="If someone shared a referral link or code with you, enter it here to connect your account."
    >
      <TextField
        id="referral"
        label="Referral link or code"
        placeholder="e.g. OPUS2025"
        value={code}
        error={error}
        onChange={(e) => {
          setCode(e.target.value);
          setError("");
        }}
      />
      <button className="action-row" onClick={() => setCamera(true)}>
        <Icon name="qr" />
        <span>
          <b>Scan a QR code</b>
          <small>Camera access is requested only after you continue</small>
        </span>
        <Icon name="chevron" />
      </button>
      <Button disabled={!code} loading={loading} onClick={apply}>
        Apply referral
      </Button>
      <Button variant="text" onClick={() => go("biometric")}>
        Skip for now
      </Button>
      {camera && (
        <Sheet title="Camera access" close={() => setCamera(false)}>
          <div className="permission-icon">
            <Icon name="camera" size={34} />
          </div>
          <p className="sheet-copy">
            Opus Bloc uses your camera only to scan a referral QR code. Scanning isn’t available in
            your browser yet, so enter the code instead.
          </p>
          <Button onClick={() => setCamera(false)}>Enter code instead</Button>
        </Sheet>
      )}
    </FormShell>
  );
}

function KycIntro({ go }: { go: (r: Route) => void }) {
  return (
    <FormShell
      back={() => go("home")}
      eyebrow="Identity verification"
      title="Let's verify your identity."
      copy="Complete two clear steps to verify your identity and access eligible investment features."
      progress={<Progress process="Identity verification" step={0} total={2} />}
    >
      <div className="step-list">
        <div>
          <span>1</span>
          <p>
            <b>Personal details</b>
            <small>PAN, full name and date of birth</small>
          </p>
        </div>
        <div>
          <span>2</span>
          <p>
            <b>Document upload</b>
            <small>A clear image of your PAN card</small>
          </p>
        </div>
      </div>
      <div className="why-card">
        <h3>Before you continue</h3>
        <p>
          We request these details to confirm your identity and maintain accurate investor records.
          You can review your document before submission.
        </p>
        <div className="data-chips">
          {["PAN number", "Name on PAN", "Date of birth", "PAN image"].map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
        <button className="support-link" onClick={() => demoNotice("Support chat is coming soon.")}>
          <Icon name="help" /> Contact support
        </button>
      </div>
      <Button onClick={() => go("pan")}>
        Continue <Icon name="arrow" />
      </Button>
    </FormShell>
  );
}

function Pan({
  go,
  pan,
  setPan,
}: {
  go: (r: Route) => void;
  pan: PanDetails;
  setPan: (v: PanDetails) => void;
}) {
  const [errors, setErrors] = useState<Partial<PanDetails>>({});
  const validPan = /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan.pan);
  const age = pan.dob ? Math.floor((Date.now() - new Date(pan.dob).getTime()) / 31557600000) : 0;
  const submit = () => {
    const next: Partial<PanDetails> = {};
    if (!validPan) next.pan = "Enter a valid PAN in the format ABCDE1234F.";
    if (pan.name.trim().length < 3) next.name = "Enter your full name as shown on your PAN.";
    if (!pan.dob || new Date(pan.dob) > new Date()) next.dob = "Choose a valid date of birth.";
    else if (age < 18) next.dob = "You must be at least 18 to invest.";
    setErrors(next);
    if (!Object.keys(next).length) go("upload");
  };
  return (
    <FormShell
      back={() => go("kyc-intro")}
      title="Verify your PAN."
      copy="Enter your details exactly as they appear on your PAN card."
      progress={<Progress process="Identity verification" step={1} total={2} />}
    >
      <TextField
        id="pan"
        required
        label="PAN number"
        placeholder="ABCDE1234F"
        maxLength={10}
        value={pan.pan}
        error={errors.pan}
        onChange={(e) => {
          setPan({ ...pan, pan: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "") });
          setErrors({ ...errors, pan: "" });
        }}
      />
      <TextField
        id="name"
        required
        label="Full name as printed on PAN"
        placeholder="Your full legal name"
        value={pan.name}
        error={errors.name}
        onChange={(e) => {
          setPan({ ...pan, name: e.target.value.replace(/[^A-Za-z .'-]/g, "") });
          setErrors({ ...errors, name: "" });
        }}
        hint="This must match the name on your PAN record."
      />
      <TextField
        id="dob"
        required
        label="Date of birth"
        type="date"
        max={new Date().toISOString().split("T")[0]}
        value={pan.dob}
        error={errors.dob}
        onChange={(e) => {
          setPan({ ...pan, dob: e.target.value });
          setErrors({ ...errors, dob: "" });
        }}
      />
      <Notice>
        Your information is used for identity verification and processed according to our Privacy
        Policy.
      </Notice>
      <Button onClick={submit}>Continue to document upload</Button>
    </FormShell>
  );
}

function Upload({
  go,
  setDocument,
}: {
  go: (r: Route) => void;
  setDocument: (v: { file: File; url: string } | null) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const choose = (file?: File) => {
    if (!file) return;
    if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type))
      return setError("Unsupported file. Choose a JPG, PNG or PDF.");
    if (file.size > 5 * 1024 * 1024) return setError("This file is larger than the 5 MB limit.");
    if (file.type === "application/pdf") {
      const blob = new Blob(
        [
          `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="100%" height="100%" fill="#f5f5f5"/><text x="50%" y="45%" text-anchor="middle" font-size="32" fill="#1a1919">PAN document</text><text x="50%" y="55%" text-anchor="middle" font-size="20" fill="#717170">${file.name}</text></svg>`,
        ],
        { type: "image/svg+xml" },
      );
      setDocument({ file, url: URL.createObjectURL(blob) });
    } else setDocument({ file, url: URL.createObjectURL(file) });
    go("preview");
  };
  return (
    <FormShell
      back={() => go("pan")}
      title="Upload your PAN card."
      copy="Choose a clear image so your identity details can be reviewed."
      progress={<Progress process="Identity verification" step={2} total={2} />}
    >
      <button className="upload-zone" onClick={() => input.current?.click()}>
        <span>
          <Icon name="file" size={30} />
        </span>
        <b>Select your PAN document</b>
        <small>JPG, PNG or PDF · Maximum 5 MB</small>
      </button>
      <input
        ref={input}
        hidden
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={(e) => choose(e.target.files?.[0])}
      />
      {error && <Notice type="error">{error}</Notice>}
      <div className="upload-actions">
        <button
          onClick={() => {
            setError(
              "Camera capture isn’t available in your browser. Choose an existing image instead.",
            );
            input.current?.click();
          }}
        >
          <Icon name="camera" />
          <span>
            <b>Take a photo</b>
            <small>Capture the card with your camera</small>
          </span>
        </button>
        <button onClick={() => input.current?.click()}>
          <Icon name="upload" />
          <span>
            <b>Choose from device</b>
            <small>Gallery or existing file</small>
          </span>
        </button>
      </div>
      <div className="quality">
        <h3>For a clear submission</h3>
        <ul>
          <li>Show the entire document and all four corners</li>
          <li>Avoid glare, blur and heavy shadows</li>
          <li>Keep text readable and the card horizontal</li>
        </ul>
      </div>
      <Button disabled>Continue</Button>
    </FormShell>
  );
}

function Preview({
  go,
  document,
  setDocument,
  patch,
}: {
  go: (r: Route) => void;
  document: { file: File; url: string } | null;
  setDocument: (v: null) => void;
  patch: (s: Partial<AppState>) => void;
}) {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const upload = async () => {
    if (!document) return go("upload");
    setError("");
    try {
      await mockServices.uploadDocument(document.file, setProgress);
      const result = await mockServices.submitKyc();
      patch({ kycStatus: result.status });
      go("processing");
    } catch (e) {
      setError((e as Error).message);
      setProgress(0);
    }
  };
  if (!document) return <Upload go={go} setDocument={() => {}} />;
  return (
    <FormShell
      back={() => go("upload")}
      title="Review your document."
      copy="Make sure this is the correct PAN card and every detail is clear before submitting."
    >
      <div className="document-preview">
        <img src={document.url} alt="Selected PAN document preview" />
        <div>
          <span>{document.file.name}</span>
          <b>{(document.file.size / 1024 / 1024).toFixed(2)} MB</b>
        </div>
      </div>
      {progress > 0 && (
        <div className="upload-progress">
          <div>
            <span>Uploading securely</span>
            <b>{progress}%</b>
          </div>
          <i>
            <span style={{ width: `${progress}%` }} />
          </i>
        </div>
      )}
      {error && <Notice type="error">{error}</Notice>}
      <div className="preview-actions">
        <Button variant="secondary" onClick={() => go("upload")}>
          Replace image
        </Button>
        <Button
          variant="text"
          onClick={() => {
            setDocument(null);
            go("upload");
          }}
        >
          Remove
        </Button>
      </div>
      <Button disabled={progress > 0} loading={progress > 0 && progress < 100} onClick={upload}>
        Submit for review
      </Button>
    </FormShell>
  );
}

const statusContent: Record<
  KycStatus,
  { eyebrow: string; title: string; copy: string; type: "info" | "success" | "warning" | "error" }
> = {
  pending: {
    eyebrow: "Review in progress",
    title: "Your details are being reviewed.",
    copy: "We have received your information. You can check your verification status here.",
    type: "info",
  },
  verified: {
    eyebrow: "Verification complete",
    title: "Your identity has been verified.",
    copy: "Eligible investment-related actions are now available on your account.",
    type: "success",
  },
  "action-required": {
    eyebrow: "Action required",
    title: "We need a little more information.",
    copy: "The document image was not clear enough to complete verification. Upload a new image to continue.",
    type: "warning",
  },
  rejected: {
    eyebrow: "Verification incomplete",
    title: "We could not complete verification.",
    copy: "The submitted details did not match the document. Review your information or contact support.",
    type: "error",
  },
};

function Processing({
  go,
  state,
  patch,
}: {
  go: (r: Route) => void;
  state: AppState;
  patch: (s: Partial<AppState>) => void;
}) {
  const status = state.kycStatus === "not-started" ? "pending" : state.kycStatus;
  const c = statusContent[status];
  return (
    <FormShell back={() => go("home")} eyebrow={c.eyebrow} title={c.title} copy={c.copy}>
      <div className={`status-orb status-${c.type}`}>
        <Icon
          name={status === "verified" ? "check" : status === "pending" ? "eye" : "help"}
          size={34}
        />
      </div>
      <Notice type={c.type}>
        {status === "pending"
          ? "Your verification is being processed. We’ll notify you as soon as it’s complete."
          : c.copy}
      </Notice>
      {(status === "action-required" || status === "rejected") && (
        <Button onClick={() => go(status === "action-required" ? "upload" : "pan")}>
          Review and resubmit
        </Button>
      )}
      <Button variant={status === "verified" ? "primary" : "secondary"} onClick={() => go("home")}>
        {status === "verified" ? "Continue" : "Back to home"}
      </Button>
      <button
        className="support-link centered-link"
        onClick={() => demoNotice("Support chat is coming soon.")}
      >
        <Icon name="help" /> Contact support
      </button>
    </FormShell>
  );
}

function Biometric({
  go,
  state,
  patch,
}: {
  go: (r: Route) => void;
  state: AppState;
  patch: (s: Partial<AppState>) => void;
}) {
  const [message, setMessage] = useState("");
  const finish = (enabled = false) => {
    patch({ biometricEnabled: enabled, onboardingCompleted: true });
    setMessage(
      enabled ? "Fingerprint sign-in enabled." : "You can enable this later in Profile → Security.",
    );
    setTimeout(() => go("home"), 700);
  };
  return (
    <FormShell
      back={() => go("referral")}
      eyebrow="Account security"
      title="Secure your account."
      copy="Use your device's biometric authentication for an additional layer of convenient account protection."
    >
      <div className="fingerprint">
        <span />
        <Icon name="fingerprint" size={74} />
      </div>
      {message && <Notice type="success">{message}</Notice>}
      <Button onClick={() => finish(true)}>Enable fingerprint</Button>
      <Button variant="text" onClick={() => finish(false)}>
        Not now
      </Button>
    </FormShell>
  );
}

function MainApp({
  route,
  go,
  state,
  patch,
}: {
  route: Route;
  go: (r: Route) => void;
  state: AppState;
  patch: (s: Partial<AppState>) => void;
}) {
  if (route === "property") return <PropertyDetail go={go} state={state} />;
  const tab = route === "security" ? "profile" : route;
  return (
    <div className="app-shell">
      <main className="dashboard">
        {route === "home" && <Home go={go} state={state} />}
        {route === "market" && <Market go={go} />}
        {route === "activity" && <Activity state={state} />}
        {route === "profile" && <Profile go={go} state={state} />}
        {route === "security" && <Security go={go} state={state} patch={patch} />}
      </main>
      <BottomNav active={tab} go={go} />
    </div>
  );
}

function DashboardHeader({
  title = "Good morning,",
  name = "Aarav",
}: {
  title?: string;
  name?: string;
}) {
  return (
    <header className="dash-header">
      <div className="avatar">AS</div>
      <div>
        <span>{title}</span>
        <h1>{name}</h1>
      </div>
      <button
        className="icon-btn notification"
        aria-label="Notifications"
        onClick={() => demoNotice("You’re all caught up.")}
      >
        <Icon name="bell" />
        <i />
      </button>
    </header>
  );
}

function Home({ go, state }: { go: (r: Route) => void; state: AppState }) {
  return (
    <>
      <DashboardHeader />
      <section className="portfolio-card">
        <div className="portfolio-top">
          <p>
            <span>Portfolio value</span>
          </p>
          <button
            aria-label="Portfolio visibility"
            onClick={() => demoNotice("Balance privacy controls are coming soon.")}
          >
            <Icon name="eye" />
          </button>
        </div>
        <h2>₹12,84,600</h2>
        <p className="gain">↑ ₹84,600 all-time gain</p>
        <div className="portfolio-stats">
          <div>
            <span>Total invested</span>
            <b>₹12,00,000</b>
          </div>
          <div>
            <span>Income paid</span>
            <b>₹42,300</b>
          </div>
          <div>
            <span>Est. upcoming*</span>
            <b>₹8,250</b>
          </div>
        </div>
      </section>
      {state.kycStatus !== "verified" && (
        <button
          className="kyc-banner"
          onClick={() => go(state.kycStatus === "not-started" ? "kyc-intro" : "processing")}
        >
          <span>
            <Icon name="shield" />
          </span>
          <p>
            <b>
              {state.kycStatus === "not-started"
                ? "Complete your KYC"
                : state.kycStatus === "pending"
                  ? "Your KYC is in review"
                  : "Your KYC needs attention"}
            </b>
            <small>
              {state.kycStatus === "not-started"
                ? "Verify your identity before your first investment"
                : state.kycStatus === "pending"
                  ? "Check your verification status"
                  : "Review and resubmit your details"}
            </small>
          </p>
          <Icon name="chevron" />
        </button>
      )}
      <section className="overview">
        <div className="section-head">
          <div>
            <p className="eyebrow">Your overview</p>
            <h2>Built for clarity.</h2>
          </div>
        </div>
        <div className="metric-grid">
          <article>
            <span>02</span>
            <p>Total holdings</p>
          </article>
          <article>
            <span>01</span>
            <p>Pre-booking</p>
          </article>
          <article>
            <span>04</span>
            <p>Hot properties</p>
          </article>
        </div>
      </section>
      <Properties go={go} />
      <section className="support-card">
        <div>
          <p className="eyebrow light">Help & support</p>
          <h2>Questions deserve clear answers.</h2>
          <button onClick={() => demoNotice("Support chat is coming soon.")}>
            Speak to our support team <Icon name="arrow" />
          </button>
        </div>
      </section>
      <p className="disclaimer">*Estimated income may change and is not guaranteed.</p>
    </>
  );
}

function Properties({ go }: { go: (r: Route) => void }) {
  const items = [
    {
      img: "",
      name: "OB Urban Living PG",
      loc: "Visakhapatnam, Andhra Pradesh",
      type: "Land",
      min: "₹10.1K",
      detail: true,
    },
    {
      img: PROPERTY_2,
      name: "The Crescent Residences",
      loc: "Bengaluru, Karnataka",
      type: "Residential",
      min: "₹2,50,000",
    },
    {
      img: PROPERTY_3,
      name: "Aurum Business House",
      loc: "Mumbai, Maharashtra",
      type: "Commercial",
      min: "₹5,00,000",
    },
  ];
  return (
    <section className="properties">
      <div className="section-head">
        <div>
          <p className="eyebrow">Featured properties</p>
          <h2>Considered opportunities.</h2>
        </div>
        <button onClick={() => demoNotice("More properties are coming soon.")}>View all</button>
      </div>
      <div className="property-scroll">
        {items.map((x) => (
          <article className="property-card" key={x.name}>
            {x.img ? (
              <div className="property-image" style={{ backgroundImage: `url(${x.img})` }}>
                <span>{x.type}</span>
              </div>
            ) : (
              <div className="property-image property-image--plot">
                <span>{x.type}</span>
                <b aria-hidden="true">
                  400<small>sq. yd</small>
                </b>
              </div>
            )}
            <div className="property-info">
              <p>{x.loc}</p>
              <h3>{x.name}</h3>
              <div>
                <span>Min. investment</span>
                <b>{x.min}</b>
              </div>
              <button
                onClick={() =>
                  "detail" in x
                    ? go("property")
                    : demoNotice(`Full details for ${x.name} are coming soon.`)
                }
              >
                View details <Icon name="arrow" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PropertyDetail({ go, state }: { go: (r: Route) => void; state: AppState }) {
  const [saved, setSaved] = useState(false);
  const verified = state.kycStatus === "verified";
  const back = () => (history.length > 1 ? history.back() : go("market"));
  return (
    <main className="pd">
      <header className="pd-hero">
        <div className="pd-bar">
          <button className="icon-btn on-dark" onClick={back} aria-label="Go back">
            <Icon name="back" />
          </button>
          <div>
            <button
              className="icon-btn on-dark"
              aria-label="Share property"
              onClick={() => demoNotice("Sharing is coming soon.")}
            >
              <Icon name="share" />
            </button>
            <button
              className={`icon-btn on-dark ${saved ? "is-saved" : ""}`}
              aria-label="Save property"
              aria-pressed={saved}
              onClick={() => setSaved(!saved)}
            >
              <Icon name="heart" />
            </button>
          </div>
        </div>
        <p className="pd-plot" aria-hidden="true">
          400<small>sq. yd</small>
        </p>
        <div className="pd-title">
          <p className="eyebrow light">Land · Primary offering</p>
          <h1>OB Urban Living PG</h1>
          <p className="pd-loc">
            <Icon name="pin" size={16} /> Duvvada, Visakhapatnam
          </p>
        </div>
      </header>

      <div className="pd-body">
        <dl className="pd-figures">
          <div>
            <dt>Projected rental yield*</dt>
            <dd className="is-brand">Up to 12%</dd>
          </div>
          <div>
            <dt>Projected 5-year return*</dt>
            <dd className="is-brand">~86%</dd>
          </div>
          <div>
            <dt>Minimum investment</dt>
            <dd>₹10.1K</dd>
          </div>
          <div>
            <dt>Plot size</dt>
            <dd>400 sq. yd</dd>
          </div>
        </dl>

        <section className="pd-section">
          <p className="eyebrow">Overview</p>
          <h2>A corner plot built for student living.</h2>
          <p className="pd-lead">
            A development-ready 400 sq. yd corner plot in Duvvada, planned for a modern paying-guest
            residence for students and SEZ professionals.
          </p>
          <p className="pd-copy">
            Demand is already proven: an operating PG stands next door, and the university, railway
            station and special economic zone are all within a kilometre.
          </p>
        </section>

        <section className="pd-section">
          <p className="eyebrow">Location</p>
          <h2>Everything within a kilometre.</h2>
          <ol className="pd-places">
            {[
              ["Vignan University", "1 km"],
              ["Duvvada Railway Station", "1 km"],
              ["VSEZ & APIIC Apparel Park", "Under 1 km"],
              ["Pharma SEZ & Visakhapatnam Steel Plant", "Nearby"],
            ].map(([place, distance], i) => (
              <li key={place}>
                <span>[{i + 1}]</span>
                <b>{place}</b>
                <small>{distance}</small>
              </li>
            ))}
          </ol>
        </section>

        <section className="pd-section">
          <p className="eyebrow">Why it works</p>
          <h2>Demand you can see.</h2>
          <dl className="value-list">
            {[
              ["Proven demand", "An operating PG next door already serves the area."],
              [
                "Built-in tenants",
                "Students and SEZ workers need housing within walking distance.",
              ],
              ["Ready to build", "A development-ready, south-east facing corner plot."],
            ].map(([t, d]) => (
              <div key={t}>
                <dt>{t}</dt>
                <dd>{d}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="pd-section">
          <p className="eyebrow">Plot details</p>
          <dl className="pd-specs">
            {[
              ["Property type", "Land"],
              ["Total area", "400 sq. yd"],
              ["Facing", "South-East"],
              ["Corner plot", "Yes"],
              ["Pincode", "530049"],
              ["Offering", "Primary"],
              ["Listed", "28 Sep 2026"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <button
            className="action-row"
            onClick={() => demoNotice("Title and legal documents are coming soon.")}
          >
            <Icon name="file" />
            <span>
              <b>Title & legal documents</b>
              <small>Review before you invest</small>
            </span>
            <Icon name="chevron" />
          </button>
        </section>

        <p className="disclaimer">
          *Projected yield and returns are estimates based on assumptions that may not hold.
          Property investments carry risk, including loss of capital and limited liquidity.
        </p>
      </div>

      <div className="pd-cta">
        <p>
          <small>Min. investment</small>
          <b>₹10.1K</b>
        </p>
        <Button
          onClick={() =>
            verified
              ? demoNotice("Investments in this offering open soon.")
              : go(state.kycStatus === "not-started" ? "kyc-intro" : "processing")
          }
        >
          {verified ? "Invest now" : "Verify to invest"} <Icon name="arrow" />
        </Button>
      </div>
    </main>
  );
}

function Market({ go }: { go: (r: Route) => void }) {
  return (
    <>
      <DashboardHeader title="Explore" name="The market" />
      <section className="page-intro">
        <p className="eyebrow">Curated opportunities</p>
        <h2>Property with perspective.</h2>
        <p>Review the details, risks and ownership structure before making any decision.</p>
      </section>
      <Properties go={go} />
      <Notice>
        Projected returns are estimates, not guarantees. Review each property’s risks before
        investing.
      </Notice>
    </>
  );
}
function Activity({ state }: { state: AppState }) {
  return (
    <>
      <DashboardHeader title="Your account" name="Activity" />
      <section className="page-intro">
        <p className="eyebrow">Documents & updates</p>
        <h2>A clear record.</h2>
      </section>
      <div className="activity-list">
        <div>
          <span className="activity-icon">
            <Icon name="shield" />
          </span>
          <p>
            <b>Identity verification</b>
            <small>Status changed to {state.kycStatus.replace("-", " ")}</small>
          </p>
          <time>Today</time>
        </div>
        <div>
          <span className="activity-icon">
            <Icon name="mail" />
          </span>
          <p>
            <b>Contact details verified</b>
            <small>Mobile and email confirmed</small>
          </p>
          <time>Today</time>
        </div>
      </div>
    </>
  );
}
function Profile({ go, state }: { go: (r: Route) => void; state: AppState }) {
  return (
    <>
      <DashboardHeader title="Account" name="Profile" />
      <div className="profile-card">
        <div className="big-avatar">AS</div>
        <h2>Aarav Sharma</h2>
        <p>Investor account</p>
        <span className={state.kycStatus === "verified" ? "verified" : ""}>
          {state.kycStatus === "verified"
            ? "Identity verified"
            : "Verification " + state.kycStatus.replace("-", " ")}
        </span>
      </div>
      <div className="settings-list">
        <button onClick={() => go(state.kycStatus === "not-started" ? "kyc-intro" : "processing")}>
          <Icon name="shield" />
          <span>
            <b>Identity verification</b>
            <small>View status and next steps</small>
          </span>
          <Icon name="chevron" />
        </button>
        <button onClick={() => go("security")}>
          <Icon name="lock" />
          <span>
            <b>Security</b>
            <small>Biometrics and account access</small>
          </span>
          <Icon name="chevron" />
        </button>
        <button
          onClick={() =>
            demoNotice("Your agreements and receipts will appear here after your first investment.")
          }
        >
          <Icon name="file" />
          <span>
            <b>Documents</b>
            <small>Agreements and receipts</small>
          </span>
          <Icon name="chevron" />
        </button>
        <button onClick={() => demoNotice("Support chat is coming soon.")}>
          <Icon name="help" />
          <span>
            <b>Help & support</b>
            <small>Get answers and assistance</small>
          </span>
          <Icon name="chevron" />
        </button>
      </div>
    </>
  );
}
function Security({
  go,
  state,
  patch,
}: {
  go: (r: Route) => void;
  state: AppState;
  patch: (s: Partial<AppState>) => void;
}) {
  return (
    <>
      <div className="sub-header">
        <button className="icon-btn" onClick={() => go("profile")}>
          <Icon name="back" />
        </button>
        <h1>Security</h1>
      </div>
      <section className="page-intro">
        <p className="eyebrow">Account protection</p>
        <h2>Security that stays in your control.</h2>
      </section>
      <div className="settings-list">
        <button onClick={() => patch({ biometricEnabled: !state.biometricEnabled })}>
          <Icon name="fingerprint" />
          <span>
            <b>Fingerprint access</b>
            <small>Sign in with your fingerprint</small>
          </span>
          <i className={`toggle ${state.biometricEnabled ? "on" : ""}`}>
            <span />
          </i>
        </button>
        <button onClick={() => demoNotice("Your verified mobile number is your sign-in method.")}>
          <Icon name="phone" />
          <span>
            <b>Mobile number</b>
            <small>Verified sign-in method</small>
          </span>
          <Icon name="check" />
        </button>
      </div>
    </>
  );
}

function BottomNav({ active, go }: { active: string; go: (r: Route) => void }) {
  const items: [Route, string, string][] = [
    ["home", "home", "Home"],
    ["market", "market", "Market"],
    ["activity", "activity", "Activity"],
    ["profile", "user", "Profile"],
  ];
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {items.map(([r, i, l]) => (
        <button key={r} className={active === r ? "active" : ""} onClick={() => go(r)}>
          <Icon name={i} />
          <span>{l}</span>
        </button>
      ))}
    </nav>
  );
}
