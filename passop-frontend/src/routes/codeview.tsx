import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiCopy,
  FiCheck,
  FiCode,
  FiArrowLeft,
  FiTerminal,
  FiCpu,
} from "react-icons/fi";
import { SiTypescript, SiReact } from "react-icons/si";

interface CodeSnippet {
  id: string;
  name: string;
  folder: string;
  icon: "ts" | "tsx";
  description: string;
  code: string;
}

const FILES: CodeSnippet[] = [
  {
    id: "useLongPress",
    name: "useLongPress.ts",
    folder: "src/hooks",
    icon: "ts",
    description:
      "Custom touch & pointer event engine providing mobile hold gestures with haptic feedback.",
    code: `import { useRef, useCallback } from "react";

interface LongPressOptions {
  threshold?: number;
  onStart?: () => void;
  onCancel?: () => void;
}

export const useLongPress = (
  callback: () => void,
  { threshold = 500, onStart, onCancel }: LongPressOptions = {}
) => {
  const timerRef = useRef<number | null>(null);
  const isLongPressTriggered = useRef<boolean>(false);

  const start = useCallback(
    (e: React.PointerEvent) => {
      isLongPressTriggered.current = false;
      onStart?.();

      timerRef.current = window.setTimeout(() => {
        isLongPressTriggered.current = true;
        if ("vibrate" in navigator) navigator.vibrate(50);
        callback();
      }, threshold);
    },
    [callback, threshold, onStart]
  );

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    onCancel?.();
  }, [onCancel]);

  return {
    onPointerDown: start,
    onPointerUp: clear,
    onPointerLeave: clear,
    onPointerCancel: clear,
  };
};`,
  },
  {
    id: "context",
    name: "context.ts",
    folder: "src/context",
    icon: "ts",
    description:
      "App-wide state contract managing theme variants, modal visibility, and vault data sync.",
    code: `import { createContext } from "react";

export interface passwords {
  _id: string;
  siteName: string;
  username: string;
  password: string;
}

export interface AppContextType {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  isFormOpen: boolean;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  passes: passwords[] | null;
  setPasses: React.Dispatch<React.SetStateAction<passwords[] | null>>;
  editingPass: passwords | null;
  setEditingPass: React.Dispatch<React.SetStateAction<passwords | null>>;
}

export const AppContext = createContext<AppContextType | null>(null);`,
  },
  {
    id: "home",
    name: "home.tsx",
    folder: "src/routes",
    icon: "tsx",
    description:
      "Primary dashboard view orchestrating the vault layout and add-credential interactions.",
    code: `import CardContainer from "../components/CardContainer";
    import CardForm from "../components/CardForm";
    import { useContext } from "react";
    import { AppContext } from "../context/context";
    
    const Home = () => {
      const context = useContext(AppContext);
      if (!context) return null;
    
      const { isFormOpen, setIsFormOpen } = context;
    
      return (
        <section
          className="
          overflow-y h-[93vh]
          pt-20
          "
        >
          <button
            className={\`formButton
                hidden fixed z-10 top-[76vh] lg:top-[78vh] xl:top-[80vh] right-[10vh]
                md:flex items-center justify-center
                py-2
                \`}
            onClick={() => {
              setTimeout(() => {
                setIsFormOpen(!isFormOpen);
              }, 1400);
            }}
          >
            {isFormOpen ? (
              <lord-icon
                src="/assets/closeAddPassword.json"
                trigger="click"
                className="size-18 lg:size-24 text-dprimary active:scale-110 transition-all duration-150 ease-out
                    bg-dprimary rounded-full"
              ></lord-icon>
            ) : (
              <lord-icon
                src="/assets/addPassword.json"
                trigger="click"
                className="size-18 lg:size-24 text-dprimary active:scale-110 transition-all duration-150 ease-out
                    bg-dprimary rounded-full"
              ></lord-icon>
            )}
          </button>
          <CardForm />
          <CardContainer />
        </section>
      );
    };
    
    export default Home;`,
  },
  {
    id: "about",
    name: "about.tsx",
    folder: "src/routes",
    icon: "tsx",
    description:
      "Architectural overview detailing the tech stack, dual-theme styling, and zero-knowledge persistence model.",
    code: `import { Link } from "react-router-dom";
    import {
      FiShield,
      FiDatabase,
      FiSmartphone,
      FiZap,
      FiLock,
      FiArrowLeft,
      FiCheckCircle,
    } from "react-icons/fi";
    import { SiReact, SiTypescript, SiTailwindcss, SiVite } from "react-icons/si";
    
    export default function About() {
      return (
        <main className="relative min-h-[calc(100vh-5rem)] w-full px-4 py-8 md:py-12 flex flex-col items-center justify-start text-dprimary dark:text-slate-100 font-raleway transition-colors duration-300">
          <div className="w-full max-w-4xl mx-auto space-y-10">
            
            <header className="relative w-full rounded-2xl p-6 mt-12 md:mt-16 lg:mt-24 md:p-10 border border-lsecondary/30 dark:border-dsecondary bg-white/70 dark:bg-dprimary/80 backdrop-blur-md shadow-lg overflow-hidden text-center md:text-left">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-lprimary/20 dark:bg-dsecondary/30 blur-3xl pointer-events-none" />
    
              <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-lprimary/30 dark:bg-dsecondary/50 text-dprimary dark:text-lprimary border border-lsecondary/20">
                    <FiShield className="size-3.5" /> Client-Side Vault
                  </div>
                  <h1 className="font-dm-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-dprimary dark:text-white">
                    About Pass<span className="italic text-lsecondary dark:text-lprimary">OP</span>
                  </h1>
                  <p className="text-sm md:text-base text-dprimary/80 dark:text-slate-300 max-w-xl leading-relaxed">
                    A secure, lightweight credential manager engineered with responsive-first architecture, zero telemetry, and instant local persistence.
                  </p>
                </div>
    
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs md:text-sm bg-dprimary dark:bg-lprimary text-white dark:text-dprimary hover:opacity-90 active:scale-95 transition-all shadow-md self-center md:self-auto"
                >
                  <FiArrowLeft className="size-4" /> Back to Vault
                </Link>
              </div>
            </header>
    
            <section className="space-y-4">
              <h2 className="font-dm-serif text-xl sm:text-2xl text-dprimary dark:text-white px-1">
                Engineered Capabilities
              </h2>
    
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                <article className="p-5 rounded-xl border border-lsecondary/20 dark:border-dsecondary/60 bg-white/50 dark:bg-dprimary/60 backdrop-blur-xs flex flex-col justify-between space-y-3 hover:border-lsecondary/50 transition-colors">
                  <div className="size-10 rounded-lg bg-lprimary/20 dark:bg-dsecondary/40 text-lsecondary dark:text-lprimary flex items-center justify-center text-lg">
                    <FiSmartphone />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-dprimary dark:text-white">Adaptive Viewport UX</h3>
                    <p className="text-xs text-dprimary/75 dark:text-slate-300 leading-normal">
                      Dual-tier presentation: a wide management table for desktop monitors and compact, touch-optimized cards on mobile screens.
                    </p>
                  </div>
                </article>
    
                <article className="p-5 rounded-xl border border-lsecondary/20 dark:border-dsecondary/60 bg-white/50 dark:bg-dprimary/60 backdrop-blur-xs flex flex-col justify-between space-y-3 hover:border-lsecondary/50 transition-colors">
                  <div className="size-10 rounded-lg bg-lprimary/20 dark:bg-dsecondary/40 text-lsecondary dark:text-lprimary flex items-center justify-center text-lg">
                    <FiZap />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-dprimary dark:text-white">Haptic Long-Press</h3>
                    <p className="text-xs text-dprimary/75 dark:text-slate-300 leading-normal">
                      Mobile interactions support touch-and-hold gestures to summon action drawers with hardware vibration cues.
                    </p>
                  </div>
                </article>
    
                <article className="p-5 rounded-xl border border-lsecondary/20 dark:border-dsecondary/60 bg-white/50 dark:bg-dprimary/60 backdrop-blur-xs flex flex-col justify-between space-y-3 hover:border-lsecondary/50 transition-colors">
                  <div className="size-10 rounded-lg bg-lprimary/20 dark:bg-dsecondary/40 text-lsecondary dark:text-lprimary flex items-center justify-center text-lg">
                    <FiLock />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-dprimary dark:text-white">In-Place Form Logic</h3>
                    <p className="text-xs text-dprimary/75 dark:text-slate-300 leading-normal">
                      Individual table rows handle isolated editing flows powered by React Hook Form without unmounting viewport state.
                    </p>
                  </div>
                </article>
    
              </div>
            </section>
            <section className="rounded-2xl p-6 md:p-8 border border-lsecondary/30 dark:border-dsecondary bg-white/60 dark:bg-dprimary/70 backdrop-blur-md space-y-6">
              <div className="space-y-1">
                <h2 className="font-dm-serif text-xl sm:text-2xl text-dprimary dark:text-white">
                  Under the Hood
                </h2>
                <p className="text-xs md:text-sm text-dprimary/70 dark:text-slate-400">
                  PassOP is constructed with modern frontend tools focused on velocity and bundle efficiency.
                </p>
              </div>
    
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-lprimary/10 dark:bg-dsecondary/30 border border-lsecondary/20 dark:border-dsecondary/40 flex items-center gap-3">
                  <SiReact className="text-xl text-[#149eca]" />
                  <div>
                    <p className="font-bold text-xs">React 19</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Context API</p>
                  </div>
                </div>
    
                <div className="p-3.5 rounded-xl bg-lprimary/10 dark:bg-dsecondary/30 border border-lsecondary/20 dark:border-dsecondary/40 flex items-center gap-3">
                  <SiTypescript className="text-xl text-[#3178c6]" />
                  <div>
                    <p className="font-bold text-xs">TypeScript</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Strict Typing</p>
                  </div>
                </div>
    
                <div className="p-3.5 rounded-xl bg-lprimary/10 dark:bg-dsecondary/30 border border-lsecondary/20 dark:border-dsecondary/40 flex items-center gap-3">
                  <SiTailwindcss className="text-xl text-[#06b6d4]" />
                  <div>
                    <p className="font-bold text-xs">Tailwind v4</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Dual Palette</p>
                  </div>
                </div>
    
                <div className="p-3.5 rounded-xl bg-lprimary/10 dark:bg-dsecondary/30 border border-lsecondary/20 dark:border-dsecondary/40 flex items-center gap-3">
                  <SiVite className="text-xl text-[#bd34fe]" />
                  <div>
                    <p className="font-bold text-xs">Vite</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Module Bundler</p>
                  </div>
                </div>
              </div>
    
              <div className="pt-4 border-t border-lsecondary/20 dark:border-dsecondary/40 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-dprimary/80 dark:text-slate-300">
                <div className="flex items-start gap-2">
                  <FiCheckCircle className="mt-0.5 size-4 text-lsecondary dark:text-lprimary shrink-0" />
                  <span><strong>React Hook Form</strong> manages form lifecycles and dirty checks to eliminate superfluous renders.</span>
                </div>
                <div className="flex items-start gap-2">
                  <FiCheckCircle className="mt-0.5 size-4 text-lsecondary dark:text-lprimary shrink-0" />
                  <span><strong>Lordicon JSON Animations</strong> supply motion micro-interactions for delete, edit, and clipboard triggers.</span>
                </div>
              </div>
            </section>
    
            <section className="rounded-xl p-5 mb-12 border-l-4 border-lsecondary bg-lprimary/15 dark:bg-dsecondary/25 text-xs md:text-sm space-y-2">
              <div className="flex items-center gap-2 font-bold text-dprimary dark:text-lprimary">
                <FiDatabase className="size-4" />
                <span>Storage & Security Specification</span>
              </div>
              <p className="text-dprimary/80 dark:text-slate-300 leading-relaxed">
                All passwords saved in this prototype reside strictly inside your local browser storage (<code className="font-mono text-[11px] bg-black/5 dark:bg-black/30 px-1 py-0.5 rounded">localStorage</code>). No data leaves your machine or syncs across an unencrypted wire. For production setups, this can be combined with Client-Side WebCrypto (AES-GCM-256) master encryption.
              </p>
            </section>
    
          </div>
        </main>
      );
    }`,
  },
  {
    id: "contact",
    name: "contact.tsx",
    folder: "src/routes",
    icon: "tsx",
    description:
      "User feedback portal with form validation and developer contact touchpoints.",
    code: `import { useState } from "react";
    import { Link } from "react-router-dom";
    import { useForm, type SubmitHandler } from "react-hook-form";
    import {
      FiMail,
      FiSend,
      FiGithub,
      FiLinkedin,
      FiGlobe,
      FiArrowLeft,
      FiCheckCircle,
      FiMessageSquare,
    } from "react-icons/fi";
    
    interface ContactInputs {
      name: string;
      email: string;
      subject: string;
      message: string;
    }
    
    export default function Contact() {
      const [submitted, setSubmitted] = useState(false);
    
      const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
      } = useForm<ContactInputs>();
    
      const onSubmit: SubmitHandler<ContactInputs> = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        console.log("Feedback / Contact Payload:", data);
        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 5000);
      };
    
      return (
        <main className="relative min-h-[calc(100vh-5rem)] w-full px-4 py-8 md:py-12 flex flex-col items-center justify-start text-dprimary dark:text-slate-100 font-raleway transition-colors duration-300">
          <div className="w-full max-w-4xl mx-auto space-y-8">
            
            <header className="relative w-full rounded-2xl p-6 mt-12 md:mt-16 lg:mt-24 md:p-10 border border-lsecondary/30 dark:border-dsecondary bg-white/70 dark:bg-dprimary/80 backdrop-blur-md shadow-lg overflow-hidden flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-lprimary/20 dark:bg-dsecondary/30 blur-3xl pointer-events-none" />
    
              <div className="relative z-10 space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-lprimary/30 dark:bg-dsecondary/50 text-dprimary dark:text-lprimary border border-lsecondary/20">
                  <FiMessageSquare className="size-3.5" /> Direct Channel
                </div>
                <h1 className="font-dm-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-dprimary dark:text-white">
                  Get in <span className="italic text-lsecondary dark:text-lprimary">Touch</span>
                </h1>
                <p className="text-xs md:text-sm text-dprimary/75 dark:text-slate-300 max-w-md">
                  Have feedback, spotted a bug, or want to discuss password security architectures? Send a direct transmission.
                </p>
              </div>
    
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs md:text-sm bg-dprimary dark:bg-lprimary text-white dark:text-dprimary hover:opacity-90 active:scale-95 transition-all shadow-md self-start md:self-auto"
              >
                <FiArrowLeft className="size-4" /> Back to Vault
              </Link>
            </header>
    
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <aside className="space-y-4">
                <div className="p-6 rounded-2xl border border-lsecondary/30 dark:border-dsecondary bg-white/60 dark:bg-dprimary/70 backdrop-blur-md space-y-15">
                  <div>
                    <h2 className="font-dm-serif text-lg text-dprimary dark:text-white">
                      Developer Hub
                    </h2>
                    <p className="text-xs text-dprimary/70 dark:text-slate-400 mt-1">
                      Connect through developer profiles or source control.
                    </p>
                  </div>
    
                  <div className="space-y-3">
                    <a
                      href="https://github.com/shaadcodes/opencode"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-lprimary/10 dark:bg-dsecondary/30 hover:bg-lprimary/20 dark:hover:bg-dsecondary/50 border border-lsecondary/20 dark:border-dsecondary/40 text-xs font-semibold text-dprimary dark:text-white transition-all group"
                    >
                      <FiGithub className="size-4 text-lsecondary dark:text-lprimary group-hover:scale-110 transition-transform" />
                      <span>GitHub Repository</span>
                    </a>
    
                    <a
                      href="https://linkedin.com/in/shaadcodes"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-lprimary/10 dark:bg-dsecondary/30 hover:bg-lprimary/20 dark:hover:bg-dsecondary/50 border border-lsecondary/20 dark:border-dsecondary/40 text-xs font-semibold text-dprimary dark:text-white transition-all group"
                    >
                      <FiLinkedin className="size-4 text-lsecondary dark:text-lprimary group-hover:scale-110 transition-transform" />
                      <span>LinkedIn Profile</span>
                    </a>
    
                    <a
                      href="mailto:shaadsgfx@gmail.com"
                      className="flex items-center gap-3 p-3 rounded-xl bg-lprimary/10 dark:bg-dsecondary/30 hover:bg-lprimary/20 dark:hover:bg-dsecondary/50 border border-lsecondary/20 dark:border-dsecondary/40 text-xs font-semibold text-dprimary dark:text-white transition-all group"
                    >
                      <FiMail className="size-4 text-lsecondary dark:text-lprimary group-hover:scale-110 transition-transform" />
                      <span>shaadsgfx@gmail.com</span>
                    </a>
                  </div>
                </div>
    
                <div className="p-4 rounded-xl border border-lsecondary/20 dark:border-dsecondary/40 bg-lprimary/10 dark:bg-dsecondary/20 text-xs text-dprimary/80 dark:text-slate-300 flex items-start gap-2.5">
                  <FiGlobe className="size-4 text-lsecondary dark:text-lprimary mt-0.5 shrink-0" />
                  <span>Feedback submitted through this portal does not access or transmit your vault storage.</span>
                </div>
              </aside>
    
              <div className="md:col-span-2 p-6 md:p-8 mb-12 md:mb-0 rounded-2xl border border-lsecondary/30 dark:border-dsecondary bg-white/70 dark:bg-dprimary/80 backdrop-blur-md shadow-md space-y-6">
                
                {submitted && (
                  <div className="p-4 rounded-xl bg-lprimary/30 dark:bg-dsecondary/50 border border-lsecondary dark:border-lprimary text-xs md:text-sm font-semibold flex items-center gap-2.5 text-dprimary dark:text-lprimary">
                    <FiCheckCircle className="size-4 shrink-0" />
                    <span>Transmission received! Thank you for the feedback.</span>
                  </div>
                )}
    
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-dprimary dark:text-slate-300">
                        Your Name
                      </label>
                      <input
                        {...register("name", { required: "Name is required" })}
                        placeholder="Ada Lovelace"
                        className="w-full text-xs md:text-sm p-3 rounded-xl bg-slate-50 dark:bg-[#07191d] border border-lsecondary/30 dark:border-dsecondary focus:border-lsecondary dark:focus:border-lprimary focus:ring-1 focus:ring-lsecondary/50 outline-none transition-all placeholder:text-gray-400"
                      />
                      {errors.name && (
                        <span className="text-[10px] text-red-500 font-semibold">{errors.name.message}</span>
                      )}
                    </div>
    
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-dprimary dark:text-slate-300">
                        Email Address
                      </label>
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email format",
                          },
                        })}
                        placeholder="ada@example.com"
                        className="w-full text-xs md:text-sm p-3 rounded-xl bg-slate-50 dark:bg-[#07191d] border border-lsecondary/30 dark:border-dsecondary focus:border-lsecondary dark:focus:border-lprimary focus:ring-1 focus:ring-lsecondary/50 outline-none transition-all placeholder:text-gray-400"
                      />
                      {errors.email && (
                        <span className="text-[10px] text-red-500 font-semibold">{errors.email.message}</span>
                      )}
                    </div>
                  </div>
    
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-dprimary dark:text-slate-300">
                      Subject
                    </label>
                    <input
                      {...register("subject", { required: "Subject is required" })}
                      placeholder="Bug report / Feature request / Security query"
                      className="w-full text-xs md:text-sm p-3 rounded-xl bg-slate-50 dark:bg-[#07191d] border border-lsecondary/30 dark:border-dsecondary focus:border-lsecondary dark:focus:border-lprimary focus:ring-1 focus:ring-lsecondary/50 outline-none transition-all placeholder:text-gray-400"
                    />
                    {errors.subject && (
                      <span className="text-[10px] text-red-500 font-semibold">{errors.subject.message}</span>
                    )}
                  </div>
    
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-dprimary dark:text-slate-300">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      {...register("message", {
                        required: "Message is required",
                        minLength: { value: 10, message: "Must be at least 10 characters" },
                      })}
                      placeholder="Describe your thoughts, feedback, or steps to reproduce an issue..."
                      className="w-full text-xs md:text-sm p-3 rounded-xl bg-slate-50 dark:bg-[#07191d] border border-lsecondary/30 dark:border-dsecondary focus:border-lsecondary dark:focus:border-lprimary focus:ring-1 focus:ring-lsecondary/50 outline-none transition-all resize-none placeholder:text-gray-400"
                    />
                    {errors.message && (
                      <span className="text-[10px] text-red-500 font-semibold">{errors.message.message}</span>
                    )}
                  </div>
    
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs md:text-sm bg-lsecondary dark:bg-lprimary text-white dark:text-dprimary hover:opacity-90 active:scale-95 disabled:opacity-50 transition-all shadow-md"
                  >
                    <FiSend className="size-4" />
                    <span>{isSubmitting ? "Transmitting..." : "Send Message"}</span>
                  </button>
                </form>
              </div>
    
            </div>
    
          </div>
        </main>
      );
    }`,
  },
  {
    id: "codeview",
    name: "codeview.tsx",
    folder: "src/routes",
    icon: "tsx",
    description:
      "Interactive IDE sandbox showcasing application modules, syntax highlighting, and copy mechanics.",
    code: `import { useState } from "react";
            import { Link } from "react-router-dom";
            import {
              FiCopy,
              FiCheck,
              FiCode,
              FiArrowLeft,
              FiTerminal,
              FiCpu,
            } from "react-icons/fi";
            import { SiTypescript, SiReact } from "react-icons/si";

            interface CodeSnippet {
              id: string;
              name: string;
              folder: string;
              icon: "ts" | "tsx";
              description: string;
              code: string;
            }

            const FILES: CodeSnippet[] = [
              {
                id: "useLongPress",
                name: "useLongPress.ts",
                folder: "src/hooks",
                icon: "ts",
                description:
                  "Custom touch & pointer event engine providing mobile hold gestures with haptic feedback.",
                code: \`import { useRef, useCallback } from "react";

                interface LongPressOptions {
                  threshold?: number;
                  onStart?: () => void;
                  onCancel?: () => void;
                }

                export const useLongPress = (
                  callback: () => void,
                  { threshold = 500, onStart, onCancel }: LongPressOptions = {}
                ) => {
                  const timerRef = useRef<number | null>(null);
                  const isLongPressTriggered = useRef<boolean>(false);

                  const start = useCallback(
                    (e: React.PointerEvent) => {
                      isLongPressTriggered.current = false;
                      onStart?.();

                      timerRef.current = window.setTimeout(() => {
                        isLongPressTriggered.current = true;
                        if ("vibrate" in navigator) navigator.vibrate(50);
                        callback();
                      }, threshold);
                    },
                    [callback, threshold, onStart]
                  );

                  const clear = useCallback(() => {
                    if (timerRef.current) {
                      clearTimeout(timerRef.current);
                      timerRef.current = null;
                    }
                    onCancel?.();
                  }, [onCancel]);

                  return {
                    onPointerDown: start,
                    onPointerUp: clear,
                    onPointerLeave: clear,
                    onPointerCancel: clear,
                  };
              };\`,
            {Other objects...},
            {Other objects...},
            {Other objects...},
  },

];

export default function CodeView() {
  const [activeFileId, setActiveFileId] = useState<string>("useLongPress");
  const [copied, setCopied] = useState<boolean>(false);

  const currentFile = FILES.find((f) => f.id === activeFileId) || FILES[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = currentFile.code.split("\n");

  return (
    <main className="relative min-h-[calc(100vh-5rem)] w-full px-4 py-6 mt-14 md:mt-18 lg:mt-24 md:py-10 flex flex-col items-center font-raleway text-dprimary dark:text-slate-100 transition-colors duration-300">
      <div className="w-full max-w-5xl mx-auto space-y-6">
        <header className="relative w-full rounded-2xl p-5 md:p-8 border border-lsecondary/30 dark:border-dsecondary bg-white/70 dark:bg-dprimary/80 backdrop-blur-md shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-lprimary/30 dark:bg-dsecondary/50 text-dprimary dark:text-lprimary border border-lsecondary/20">
              <FiTerminal className="size-3.5" /> Workspace Inspection
            </div>
            <h1 className="font-dm-serif text-3xl sm:text-4xl text-dprimary dark:text-white">
              Source{" "}
              <span className="italic text-lsecondary dark:text-lprimary">
                Explorer
              </span>
            </h1>
            <p className="text-xs md:text-sm text-dprimary/75 dark:text-slate-300 max-w-xl">
              Inspect the core logic modules driving PassOP's reactive storage
              sync and gesture interactions.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-xs md:text-sm bg-dprimary dark:bg-lprimary text-white dark:text-dprimary hover:opacity-90 active:scale-95 transition-all shadow-md self-start md:self-auto"
          >
            <FiArrowLeft className="size-4" /> Back to Vault
          </Link>
        </header>

        <div className="w-full rounded-2xl border border-lprimary dark:border-lsecondary/30 bg-[#07191d] shadow-2xl overflow-hidden flex flex-col">
          <div className="h-11 px-4 bg-white/90 dark:bg-[#051316] border-b border-dsecondary/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors cursor-pointer" />
              <div className="size-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors cursor-pointer" />
              <div className="size-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors cursor-pointer" />
              <span className="ml-3 text-[11px] font-mono text-gray-400 hidden sm:inline-block">
                passop-core-engine
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-lprimary font-mono truncate max-w-[50%]">
              <FiCpu className="size-3.5 shrink-0" />
              <span className="truncate">
                {currentFile.folder}/{currentFile.name}
              </span>
            </div>

            <button
              onClick={handleCopyCode}
              type="button"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white hover:bg-lprimary hover:text-white dark:bg-dsecondary/60 dark:hover:bg-dsecondary text-lprimary border border-lsecondary/30 active:scale-95 transition-all"
            >
              {copied ? (
                <FiCheck className="size-3.5 text-white dark:text-emerald-400" />
              ) : (
                <FiCopy className="size-3.5" />
              )}
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 min-h-115 md:h-130">
            <aside className="p-3 bg-white/90 dark:bg-[#06171b] border-b md:border-b-0 md:border-r border-dsecondary/40 flex flex-col gap-1 text-xs">
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Explorer
              </div>

              {FILES.map((file) => {
                const isActive = file.id === activeFileId;
                return (
                  <button
                    key={file.id}
                    onClick={() => setActiveFileId(file.id)}
                    className={\`w-full flex flex-col items-center justify-between px-2.5 py-2 rounded-lg text-left transition-all \${
                      isActive
                        ? "bg-white dark:bg-dsecondary/70 text-lprimary font-semibold border-l-2 border-lprimary"
                        : "text-gray-400 hover:bg-white/5 hover:text-gray-500"
                    }\`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {file.icon === "tsx" ? (
                        <SiReact className="size-3.5 text-[#149eca] shrink-0" />
                      ) : (
                        <SiTypescript className="size-3.5 text-[#3178c6] shrink-0" />
                      )}
                      <span className="truncate text-xs font-mono">
                        {file.name}
                      </span>
                    </div>
                  </button>
                );
              })}

              <div className="mt-auto p-2.5 rounded-xl bg-white/70 dark:bg-dprimary/60 border border-lprimary/70 dark:border-dsecondary/40 text-[11px] text-gray-500 dark:text-gray-300 leading-relaxed hidden md:block">
                <span className="font-bold text-lprimary block mb-1">
                  Module Purpose:
                </span>
                {currentFile.description}
              </div>
            </aside>

            <section className="md:col-span-3 flex flex-col bg-white/90 dark:bg-[#07191d] overflow-hidden">
              <div className="flex items-center bg-white/50 dark:bg-[#051316] border-b border-lprimary/30 dark:border-dsecondary/30 px-3 pt-2 gap-1 overflow-x-auto">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-t-lg bg-lprimary text-white dark:bg-[#07191d] border-t border-x border-lprimary dark:border-dsecondary/40 text-xs font-mono dark:text-lprimary font-semibold">
                  <FiCode className="size-3" />
                  <span>{currentFile.name}</span>
                </div>
              </div>

              <div
                key={currentFile.id}
                className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed text-slate-200 selection:bg-lsecondary/40"
              >
                <pre className="min-w-full">
                  <code>
                    {lines.map((line, idx) => (
                      <div key={idx} className="flex hover:bg-white/5 py-0.5">
                        <span className="w-10 shrink-0 select-none pr-4 text-right text-gray-500 border-r border-dsecondary/30">
                          {idx + 1}
                        </span>

                        <span className="pl-4 text-lsecondary/80 dark:text-emerald-100/90 whitespace-pre">
                          {line || " "}
                        </span>
                      </div>
                    ))}
                  </code>
                </pre>
              </div>

              <footer className="h-6 px-3 bg-white/90 dark:bg-[#051316] border-t border-lprimary dark:border-dsecondary/30 flex items-center justify-between text-[10px] text-gray-400 font-mono">
                <div className="flex items-center gap-3">
                  <span>UTF-8</span>
                  <span>TypeScript JSX</span>
                </div>
                <div>{lines.length} lines</div>
              </footer>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
    }`,
  },
  {
    id: "cardContainer",
    name: "CardContainer.tsx",
    folder: "src/components",
    icon: "tsx",
    description:
      "Responsive orchestrator that switches between mobile card list and desktop table representations.",
    code: `import { useContext, useEffect } from "react";
import { AppContext } from "../context/context";
import PasswordField from "./PasswordField";
import MobileCard from "./MobileCard";

interface Inputs {
    _id: string;
    siteName: string;
    username: string;
    password: string;
  };

const CardContainer = () => {
  const context = useContext(AppContext);
  if (!context) return null;

  const { setIsFormOpen, isFormOpen, passes, setPasses, setEditingPass } = context;

  useEffect(() => {
    const saved = localStorage.getItem("passes");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPasses(Array.isArray(parsed) ? parsed : []);
      } catch {
        setPasses([]);
      }
    } else {
      setPasses([]);
    }
  }, [setPasses]);

  const handleDelete = (id: string) => {
    const updated = (passes || []).filter((p) => p._id !== id);
    setPasses(updated);
    localStorage.setItem("passes", JSON.stringify(updated));
  };

  const handleEdit = (pass: Inputs) => {
    setEditingPass(pass);
    setIsFormOpen(true);
  };

  return (
    <>
      <div
        className={\`block md:hidden space-y-2 w-[90vw] mx-auto \${isFormOpen ? "blur-xs" : ""} transition-all duration-300\`}
      >
        <h1 className="title ml-[3vw] text-dprimary dark:text-lprimary">Your Passwords</h1>
        {Array.isArray(passes) && passes.length > 0 ? (
          passes.map((pass) => (
            <MobileCard key={pass._id} pass={pass} onDelete={handleDelete} onEdit={handleEdit}/>
          ))
        ) : (
          <p className="text-xs text-gray-500 text-center py-4">
            No passwords stored yet.
          </p>
        )}
      </div>

      <div className="hidden md:block"></div>
      <div
        className={\`cardContainer hidden
        md:flex flex-col
        w-[90vw] h-[75vh]
        mx-auto mt-[5vh] lg:mt-[10vh]
        border border-dprimary/40 rounded-xl
        bg-lprimary/70 backdrop-blur-xs shadow-lg
        \${isFormOpen ? "blur-xs" : ""} transition-all duration-300
        dark:bg-dprimary/30 dark:border-lprimary/30\`}
      >
        <h1 className="py-1 px-4 my-2 text-dprimary dark:text-lprimary">Your Passwords</h1>
        <div
          className="infoBand
          flex justify-around
          py-2
          text-[10px]
          border-t border-dprimary/50
          bg-dprimary/90 text-lprimary
          dark:bg-lsecondary/50"
        >
          <h1 className="w-[25%] text-center">Website</h1>
          <h1 className="w-[25%] text-center">Username</h1>
          <h1 className="w-[25%] text-center">Password</h1>
          <h1 className="w-[25%] text-center">Actions</h1>
        </div>
        {Array.isArray(passes) && passes.length > 0 ? (
          passes.map((pass) => <PasswordField key={pass._id} pass={pass} />)
        ) : (
          <p>No passes</p>
        )}
      </div>
    </>
  );
};

export default CardContainer;
          `,
  },
  {
    id: "cardForm",
    name: "CardForm.tsx",
    folder: "src/components",
    icon: "tsx",
    description:
      "Modal form powered by React Hook Form for inserting and editing encrypted credential entries.",
    code: `
    import { useForm, type SubmitHandler } from "react-hook-form";
    import { useContext, useEffect } from "react";
    import { AppContext } from "../context/context";
    
    interface Inputs {
        _id: string;
        siteName: string;
        username: string;
        password: string;
      };
    
    const CardForm = () => {
      const context = useContext(AppContext);
      if (!context) return null;
    
      const { isFormOpen, setIsFormOpen, passes, setPasses, editingPass, setEditingPass } = context;
    
      const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
      } = useForm<Inputs>();
    
      useEffect(() => {
          if(editingPass){
            reset({
              siteName: editingPass.siteName,
              username: editingPass.username,
              password: editingPass.password,
            });
          }
          else {
            reset({
              siteName: "",
              username: "",
              password: "",
            })
          }
        }, [editingPass, reset]);
    
        const handleClose = () => {
          setEditingPass(null);
          setIsFormOpen(false);
        }
    
      const onSubmit: SubmitHandler<Inputs> = (data) => {
        const currrentList = Array.isArray(passes) ? passes : [];
        let nextList: Inputs[];
    
        if(editingPass) {
          nextList = currrentList.map(pass => pass._id === editingPass._id ? {...pass, siteName: data.siteName, username: data.username, password: data.password} : pass);
        }
        else {
          const newPass: Inputs = {
            _id: crypto.randomUUID(),
            siteName: data.siteName,
            username: data.username,
            password: data.password,
          };
          nextList = [...currrentList, newPass];
        }
    
        setPasses(nextList);
        localStorage.setItem("passes", JSON.stringify(nextList));
    
        handleClose();
      };
    
      if(!isFormOpen) return null;
    
      console.log(watch("username"));
      return (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={
            absolute z-10 inset-x-0 inset-y-0 my-auto
            flex flex-col justify-between gap-4
            mx-auto px-3 lg:px-6 py-4 lg:py-6 w-[90vw] md:w-[50vw] h-fit lg:h-[50vh]
            border rounded-xl
            bg-lprimary/70 backdrop-blur-xl
            transition-all duration-300 ease-in-out
            \${isFormOpen ? "scale-100" : "scale-0 transform translate-y-52"}
            dark:bg-dprimary/50 dark:border-lprimary/30}
        >
          <div className="inputFields flex flex-col gap-4">
            <div className="webName flex flex-col gap-1">
              <label htmlFor="websiteName" className="text-xs lg:text-xl ml-2">
                Website:{" "}
              </label>
              <input
                {...register("siteName")}
                className="website
              px-4 py-1 lg:px-6 lg:py-3
              bg-white
              font-raleway text-xs
              rounded-xl lg:rounded-full
              focus:border border-dprimary focus:outline-none
              dark:bg-dsecondary/30 dark:border-lprimary/30"
              />
            </div>
    
            <div className="username flex flex-col gap-1">
              <label htmlFor="username" className="text-xs lg:text-xl ml-2">
                Username:{" "}
              </label>
              <input
                {...register("username", { required: true })}
                className="username
              px-4 py-1 lg:px-6 lg:py-3
              font-raleway text-xs
              lg:rounded-full
              bg-white
              focus:border border-dprimary focus:outline-none rounded-xl
              dark:bg-dsecondary/30 dark:border-lprimary/30"
              />
              {errors.username && (
                <span className="text-xs lg:text-xl text-red-600 ml-2 italic">
                  This field is required
                </span>
              )}
            </div>
            <div className="password flex flex-col gap-1">
              <label htmlFor="password" className="text-xs lg:text-xl ml-2">
                Password:{" "}
              </label>
              <input
                {...register("password", { required: true })}
                className="username
                lg:rounded-full
                px-4 py-1 lg:px-6 lg:py-3
                bg-white
                font-raleway text-xs
                focus:border border-dprimary focus:outline-none rounded-xl
                dark:bg-dsecondary/30 dark:border-lprimary/30"
                type="password"
              />
              {errors.password && (
                <span className="text-xs lg:text-xl text-red-600 ml-2 italic">
                  This field is required
                </span>
              )}
            </div>
          </div>
    
          <button
            type="submit"
            className="submit
            cursor-pointer
            px-4 lg:px-6 py-1 lg:py-4 mx-auto mt-3 lg:m-3
            rounded-full lg:rounded-none
            text-lprimary bg-dprimary active:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] active:scale-105 transition-all duration-300
            dark:bg-dsecondary/50 dark:active:shadow-[1px_1px_0px_0px_#009c65]"
            onClick={() => {
              
            }}
          >
            {editingPass ? "Update Password" : "Add Password"}
          </button>
        </form>
      );
    };
    
    export default CardForm;
    `,
  },
  {
    id: "mobileCard",
    name: "MobileCard.tsx",
    folder: "src/components",
    icon: "tsx",
    description:
      "Touch-optimized mobile card utilizing long-press gestures and haptics to reveal action drawers.",
    code: `
    import React, { useState } from "react";
    import { useLongPress } from "../hooks/useLongPress";
    import { MdClose } from "react-icons/md";
    
    interface Inputs {
      _id: string;
      siteName: string;
      username: string;
      password: string;
    }
    
    interface MobileCardProps {
      pass: Inputs;
      onDelete: (id: string) => void;
      onEdit: (pass: Inputs) => void;
    }
    
    const MobileCard = ({ pass, onDelete, onEdit }: MobileCardProps) => {
      const [isPressing, setIsPressing] = useState(false);
      const [showActionSheet, setShowActionSheet] = useState(false);
      const [copied, setCopied] = useState(false);
    
      const longPressEvents = useLongPress(() => setShowActionSheet(true), {
        threshold: 500,
        onStart: () => setIsPressing(true),
        onCancel: () => setIsPressing(false),
      });
    
      const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(pass.password);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      };
    
      return (
        <>
          <div
            {...longPressEvents}
            key={pass._id}
            className={"relative select-none touch-none p-3.5 w-full mx-auto bg-white/60 dark:bg-dprimary border dark:border-lsecondary/30 rounded-xl transition-all duration-300 cursor-pointer \${isPressing ? "scale-95 bg-lprimary/20 border-lsecondary ring-2 ring-lsecondary/50" : "active:scale-[0.98]"}"}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="size-8 border dark:border-lsecondary/30 rounded-full bg-lprimary/20 text-dprimary dark:text-lprimary flex items-center justify-center font-bold text-xs uppercase">
                  {pass.siteName.slice(0, 1)}
                </div>
                <div>
                  <p className="font-semibold text-sm leading-tight">
                    {pass.siteName}
                  </p>
                  <p className="text-xs text-gray-500">{pass.username}</p>
                </div>
              </div>
              <div className="right flex flex-col gap-1">
              <button
                type="button"
                className={flex items-center border text-[10px] gap-1 px-3 py-2 rounded-full transition-all duration-150 active:scale-95 \${
                  copied
                    ? "bg-lprimary/40 text-dprimary font-bold border-lsecondary/50"
                    : "bg-dprimary text-lprimary font-semibold border-transparent"
                }}
                onClick={handleCopy}
              >
                <lord-icon
                  src="/assets/copy.json"
                  trigger="click"
                  className={"size-4"}
                />
                <p className={copied ? "text-lsecondary dark:text-lprimary" : ""}>{copied ? "Copied!" : "Copy"}</p>
              </button>
              <div className="text-[9px] font-raleway text-gray-400 mt-1.5">
                Hold for options
              </div>
              </div>
            </div>
          </div>
    
          {showActionSheet && (
            <div
              className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs animate-in fade-in duration-300"
              onClick={() => setShowActionSheet(false)}
            >
              <div
                className="w-[95vw] mb-4 bg-white dark:bg-dprimary rounded-2xl p-4 shadow-2xl border border-lsecondary/40 flex flex-col gap-2 animate-in slide-in-from-bottom-5 duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h3 className="font-bold text-sm text-dprimary dark:text-white">
                      {pass.siteName}
                    </h3>
                    <p className="text-xs text-gray-400">{pass.username}</p>
                  </div>
                  <button
                    onClick={() => setShowActionSheet(false)}
                    className="p-1 text-gray-400 hover:text-dprimary dark:hover:text-white"
                  >
                    <MdClose className="size-5" />
                  </button>
                </div>
                <button
                  onClick={() => {
                    setShowActionSheet(false);
                    onEdit(pass);
                  }}
                  className="flex items-center gap-3 w-full p-3 text-sm font-raleway font-semibold text-teal-700 dark:text-lprimary hover:bg-lprimary/10 rounded-xl transition-colors"
                >
                  <lord-icon
                    src="/assets/edit.json"
                    trigger="click"
                    className="size-5"
                  />
                  <span>Edit Password</span>
                </button>
                <button
                  onClick={() => {
                    setShowActionSheet(false);
                    if (window.confirm("Delete password for \${pass.siteName}?")) {
                      onDelete(pass._id);
                    }
                  }}
                  className="flex items-center gap-3 w-full p-3 text-sm font-semibold font-raleway text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors"
                >
                  <lord-icon
                    src="/assets/delete.json"
                    trigger="click"
                    className="size-5"
                  />
                  <span>Delete Password</span>
                </button>
              </div>
            </div>
          )}
        </>
      );
    };
    
    export default MobileCard;
    
    `,
  },
  {
    id: "navbar",
    name: "navbar.tsx",
    folder: "src/components",
    icon: "tsx",
    description:
      "Global navigation header featuring responsive routing links, quick actions, and the dark mode switch.",
    code: `
    import { useContext } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import About from "../routes/about";
import Contact from "../routes/contact";
import CodeView from "../routes/codeview";
import Home from "../routes/home";
import Switch from "./switch";
import { AppContext } from "../context/context";

const Navbar = () => {
  const context = useContext(AppContext);
  if (!context) return null;

  const { darkMode, setDarkMode, isFormOpen, setIsFormOpen } = context;

  return (
    <BrowserRouter>
      <div
        className={\`container
        fixed z-10 inset-x-0
        md:my-6 md:max-w-[75vw]
        flex items-center justify-between
        w-[90vw] h-fit
        mx-auto my-3 border border-dprimary rounded-xl
        bg-lprimary/70 backdrop-blur-2xl
        \${isFormOpen ? "blur-xs" : ""}
        transition-all duration-300
        dark:bg-dprimary/70 dark:border-lsecondary/30\`}
      >
        <div
          className="logoandtitle 
          flex flex-col justify-center gap-0.5
          m-2 lg:m-4
          "
        >
          <Link
            to="/"
            className="logo
            group
            flex items-center
            text-lg
            lg:text-3xl
            "
          >
            {darkMode ? (
              <lord-icon src="/assets/logo.json" trigger="click" />
            ) : (
              <lord-icon src="/assets/darklogo.json" trigger="click" />
            )}
            <h1 className="ml-1">Pass</h1>
            <span className="italic group-hover:text-lsecondary group-active:text-lsecondary transition-all duration-200">
              OP
            </span>
          </Link>
          <p
            className="text-[8px]
            px-1
            lg:text-sm
            hidden md:flex"
          >
            Seamless Passwords Manager
          </p>
        </div>
        <div
          className="navigation
          flex justify-between items-center"
        >
          <ul
            className="hidden 
            text-[10px] text-dprimary
            md:flex md:justify-between md:items-center
            lg:text-xs
            xl:text-xl
            "
          >
            <Link
              to="/"
              className="flex group justify-center items-center grow
              border-r border-lsecondary px-4 text-lsecondary
              dark:border-lprimary/30"
            >
              {darkMode ? <lord-icon
                src="/assets/darkhome.json"
                trigger="click"
                colors="primary:currentColor, secondary:currentColor"
                className="size-4 xl:size-6 invert-40 group-hover:invert-20 group-active:scale-110 transition-all duration-150 ease-out"
              /> : <lord-icon
                src="/assets/darkhome.json"
                trigger="click"
                className="size-4 xl:size-6 group-hover:invert-20 group-active:scale-110 transition-all duration-150 ease-out"
              />}
              <h1 className="hidden ml-2 min-[375px]:flex group-hover:text-dsecondary transition-all duration-150 ease-out dark:text-lprimary">
                Home
              </h1>
            </Link>
            <Link
              to="/about"
              className="flex group justify-center items-center grow
              px-4 text-lsecondary"
            >
              {darkMode ? <lord-icon
                src="/assets/about.json"
                trigger="click"
                colors="primary:currentColor, secondary:currentColor"
                className="size-4 xl:size-6 invert-40 group-hover:invert-20 group-active:scale-110 transition-all duration-150 ease-out"
              /> : <lord-icon
                src="/assets/darkabout.json"
                trigger="click"
                className="size-4 xl:size-6 group-hover:invert-20 group-active:scale-110 transition-all duration-150 ease-out"
              />}
              <h1 className="hidden ml-2 min-[375px]:flex group-hover:text-dsecondary transition-all duration-150 ease-out
              dark:text-lprimary">
                About
              </h1>
            </Link>
            <Link
              to="/contact"
              className="flex group justify-center items-center grow
              border-l border-lsecondary px-4 text-lsecondary
              dark:border-lprimary/30"
            >
              {darkMode ? <lord-icon
                src="/assets/contact.json"
                trigger="click"
                colors="primary:currentColor, secondary:currentColor"
                className="size-4 xl:size-6 invert-40 group-hover:invert-20 group-active:scale-110 transition-all duration-150 ease-out"
              /> : <lord-icon
                src="/assets/darkcontact.json"
                trigger="click"
                className="size-4 xl:size-6 group-hover:invert-20 group-active:scale-110 transition-all duration-150 ease-out"
              />}
              <h1 className="hidden ml-2 min-[375px]:flex group-hover:text-dsecondary transition-all duration-150 ease-out
              dark:text-lprimary">
                Contact
              </h1>
            </Link>
            <Link
              to="/codeview"
              className="flex group justify-center items-center grow
              border-l border-lsecondary px-4 text-lsecondary
              dark:border-lprimary/30"
            >
              {darkMode ? <lord-icon
                src="/assets/codeview.json"
                trigger="click"
                colors="primary:currentColor, secondary:currentColor"
                className="size-4 xl:size-6 invert-40 group-hover:invert-20 group-active:scale-110 transition-all duration-150 ease-out"
              /> : <lord-icon
                src="/assets/darkcodeview.json"
                trigger="click"
                className="size-4 xl:size-6 group-hover:invert-20 group-active:scale-110 transition-all duration-150 ease-out"
              />}
              <h1 className="hidden ml-2 min-[375px]:flex group-hover:text-dsecondary transition-all duration-150 ease-out
              dark:text-lprimary">
                Code View
              </h1>
            </Link>
          </ul>
          <div
            className="switch
            mr-6
            "
          >
            <Switch
              condition={darkMode}
              setCondition={setDarkMode}
              height="h-4 lg:h-6"
              width="w-7 lg:w-11"
              knob="bg-white size-3 lg:size-4.5"
              stickerInactive={
                <MdOutlineDarkMode className="size-2 lg:size-3 text-lsecondary" />
              }
              stickerActive={
                <MdOutlineLightMode className="size-2 lg:size-3 text-dprimary" />
              }
              activebg="bg-lsecondary"
              inactivebg="bg-dsecondary"
            />
          </div>
        </div>
      </div>
      <div
        className={\`container
        md:hidden
        fixed inset-x-0 bottom-0 z-10
        w-dvw
        mx-auto border-t border-lsecondary
        bg-lprimary/50 backdrop-blur-xl shadow-2xl
        dark:bg-dprimary/50 dark:border-lprimary/30\`}
      >
        <ul
          className="flex justify-around items-center
          text-[8px] min-[545px]:text-xs text-dprimary
          "
        >
          <Link
            to="/"
            className="flex items-center justify-center grow
            py-2 w-[20%]"
          >
            {darkMode ? (
              <lord-icon
                src="/assets/home.json"
                trigger="click"
                className="size-4 min-[375px]:size-3 min-[545px]:size-4 text-dprimary active:scale-110 transition-all duration-150 ease-out"
              />
            ) : (
              <lord-icon
                src="/assets/darkhome.json"
                trigger="click"
                className="size-4 min-[375px]:size-3 min-[545px]:size-4 text-dprimary active:scale-110 transition-all duration-150 ease-out"
              />
            )}
            <h1 className="hidden ml-2 min-[375px]:flex dark:text-lprimary">
              Home
            </h1>
          </Link>
          <Link
            to="/about"
            className="flex items-center justify-center grow
            border-x border-lsecondary py-2 w-[20%]
            dark:border-lprimary/30"
          >
            {darkMode ? (
              <lord-icon
                src="/assets/about.json"
                trigger="click"
                className="size-4 min-[375px]:size-3 min-[545px]:size-4 text-dprimary active:scale-110 transition-all duration-150 ease-out"
              />
            ) : (
              <lord-icon
                src="/assets/darkabout.json"
                trigger="click"
                className="size-4 min-[375px]:size-3 min-[545px]:size-4 text-dprimary active:scale-110 transition-all duration-150 ease-out"
              />
            )}
            <h1 className="hidden ml-2 min-[375px]:flex dark:text-lprimary">
              About
            </h1>
          </Link>
          <button
            className={\`formButton
            flex items-center justify-center grow
            py-2 w-[20%]
            \`}
            onClick={() => {
              setTimeout(() => {
                setIsFormOpen(!isFormOpen);
              }, 1400);
            }}
          >
            {isFormOpen ? (
              <lord-icon
                src="/assets/closeAddPassword.json"
                trigger="click"
                className="size-8 min-[425px]:size-10 text-dprimary active:scale-110 transition-all duration-150 ease-out
                bg-dprimary rounded-full"
              ></lord-icon>
            ) : (
              <lord-icon
                src="/assets/addPassword.json"
                trigger="click"
                className="size-8 min-[425px]:size-10 text-dprimary active:scale-110 transition-all duration-150 ease-out
                bg-dprimary rounded-full"
              ></lord-icon>
            )}
          </button>
          <Link
            to="/contact"
            className="flex items-center justify-center grow
            border-x border-lsecondary dark:border-lprimary/30 py-2 w-[20%]"
          >
            {darkMode ? (
              <lord-icon
                src="/assets/contact.json"
                trigger="click"
                className="size-4 min-[375px]:size-3 min-[545px]:size-4 text-dprimary active:scale-110 transition-all duration-150 ease-out"
              />
            ) : (
              <lord-icon
                src="/assets/darkcontact.json"
                trigger="click"
                className="size-4 min-[375px]:size-3 min-[545px]:size-4 text-dprimary active:scale-110 transition-all duration-150 ease-out"
              />
            )}
            <h1 className="hidden ml-2 min-[375px]:flex dark:text-lprimary">
              Contact
            </h1>
          </Link>
          <Link
            to="/codeview"
            className="flex items-center justify-center grow
            py-2 w-[20%]"
          >
            {darkMode ? (
              <lord-icon
                src="/assets/codeview.json"
                trigger="click"
                className="size-4 min-[375px]:size-3 min-[545px]:size-4 text-dprimary active:scale-110 transition-all duration-150 ease-out"
              />
            ) : (
              <lord-icon
                src="/assets/darkcodeview.json"
                trigger="click"
                className="size-4 min-[375px]:size-3 min-[545px]:size-4 text-dprimary active:scale-110 transition-all duration-150 ease-out"
              />
            )}
            <h1 className="hidden ml-2 min-[375px]:flex dark:text-lprimary">
              Code View
            </h1>
          </Link>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/codeview" element={<CodeView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navbar;

    `,
  },
  {
    id: "passwordField",
    name: "PasswordField.tsx",
    folder: "src/components",
    icon: "tsx",
    description:
      "Desktop table row component supporting localized, in-place edit states and clipboard operations.",
    code: `
    import { useContext, useState } from "react";
    import { AppContext } from "../context/context";
    import { useForm, type SubmitHandler } from "react-hook-form";
    import { MdCancel } from "react-icons/md";
    
    interface Inputs {
      _id: string;
      siteName: string;
      username: string;
      password: string;
    }
    
    interface PassFieldProps {
      pass: Inputs;
    }
    
    const PasswordField = ({ pass }: PassFieldProps) => {
      const context = useContext(AppContext);
      if (!context) return null;
    
      const { passes, setPasses, darkMode } = context;
    
      const [isEditing, setIsEditing] = useState<boolean>(false);
    
      const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
      } = useForm<Inputs>({
        defaultValues: {
          _id: pass._id,
          siteName: pass.siteName,
          username: pass.username,
          password: pass.password,
        },
      });
    
      const handleEdit = () => {
        if(window.confirm("Editing will reveal the password. Continue?"))
        {
          reset({
            _id: pass._id,
            siteName: pass.siteName,
            username: pass.username,
            password: pass.password,
          });
          setIsEditing(true);
        }
      };
    
      const handleCancel = () => {
        reset();
        setIsEditing(false);
      };
    
      const onSubmit: SubmitHandler<Inputs> = (data) => {
        setPasses((prevPasses) => {
          const next = (prevPasses || []).map((p) =>
            p._id === pass._id
              ? {
                  ...p,
                  siteName: data.siteName,
                  username: data.username,
                  password: data.password,
                }
              : p
          );
          localStorage.setItem("passes", JSON.stringify(next));
          return next;
        });
    
        setIsEditing(false);
      };
    
      const handleDelete = (passId: string) => {
        if (window.confirm("Do you want to delete this password?")) {
          const updatedPasses = (passes || []).filter((p) => p._id !== passId);
          setPasses(updatedPasses);
          localStorage.setItem("passes", JSON.stringify(updatedPasses));
        }
        return;
      };
    
      if (!isEditing) {
        return (
          <div
            className="card
                        flex items-center
                        px-6 text-xs lg:text-sm xl:text-base text-dprimary
                        h-12 lg:h-16 xl:h-18 bg-white border-b border-dprimary/50
                        dark:bg-dprimary dark:text-lprimary/70 dark:border-lprimary/30"
          >
            <h1
              className="site
                        flex items-center
                        border-r border-dprimary/50 px-4 h-full
                        w-[25%]
                        dark:border-lprimary/30"
            >
              {pass.siteName}
            </h1>
            <p
              className="user
                        flex items-center
                        border-r border-dprimary/50 px-4 h-full
                        w-[25%]
                        dark:border-lprimary/30"
            >
              {pass.username}
            </p>
            <p
              className="pass
                        flex items-center
                        border-r border-dprimary/50 px-4 h-full
                        w-[25%]
                        dark:border-lprimary/30"
            >
              {"*".repeat(pass.password.length)}
            </p>
            <div
              className="act
                        text-[8px] lg:text-xs xl:text-base
                        flex items-center gap-2 justify-around px-4 h-full
                        w-[25%] font-raleway"
            >
              <button
                className="delete
                            flex items-center gap-1
                            border border-transparent px-3 py-1.5 font-bold rounded-full text-red-600
                            hover:bg-red-300 active:bg-red-300 hover:border-red-500/50 active:border-red-500/50
                            transition-all duration-300 ease-in-out
                            dark:text-red-700"
                onClick={() => handleDelete(pass._id)}
              >
                {darkMode ? <lord-icon
                  src="/assets/delete.json"
                  trigger="hover"
                  className="size-4 lg:size-5 xl:size-6"
                /> : <lord-icon
                  src="/assets/darkdelete.json"
                  trigger="hover"
                  className="size-4 lg:size-5 xl:size-6"
                />}
                <p className="pt-0.5">Delete</p>
              </button>
              <button
                className="edit
                            flex items-center gap-1.5
                            border border-transparent px-3 py-1.5 text-teal-600 font-bold rounded-full
                            hover:bg-teal-300 active:bg-teal-300 hover:border-teal-500/50 active:border-teal-500/50
                            transition-all duration-300 ease-in-out"
                onClick={() => handleEdit()}
              >
                <lord-icon
                  src="/assets/edit.json"
                  trigger="hover"
                  className="size-4 lg:size-5 xl:size-6"
                />
                <p className="pt-0.5">Edit</p>
              </button>
            </div>
          </div>
        );
      }
    
      return (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card
          animate-in fade-in-0 animate-out fade-out-10
          flex items-center
          px-6 text-[10px] text-dprimary font-raleway
          h-12 lg:h-14 xl:h-16 bg-white border border-dprimary/50
          scale-105 transition-all duration-300
          dark:bg-dprimary/50 dark:border-lprimary/30 dark:text-lprimary"
        >
          <div
            className="site
                group
                flex justify-center flex-col
                border-r border-dprimary/50 h-full
                w-[25%] font-dm-serif
                dark:border-lprimary/30"
          >
            <input
              {...register("siteName", { required: true })}
              className="py-1 px-2 focus:outline-none"
            />
            <div
              className="w-0 group-focus-within:w-[90%] h-px bg-dprimary/50 
            group-focus-within:animate-pulse transition-all duration-300"
            />
            {errors.siteName && <span className="text-[9px] text-red-500">Required</span>}
          </div>
    
          <div
            className="user
                group
                flex justify-center items-center flex-col
                border-r border-dprimary/50 px-3 h-full
                w-[25%]
                dark:border-lprimary/30"
          >
            <input
              {...register("username", { required: true })}
              className="py-1 px-2 focus:outline-none"
            />
            <div
              className="w-0 group-focus-within:w-[90%] h-px bg-dprimary/50 
            group-focus-within:animate-pulse transition-all duration-300"
            />
            {errors.username && <span className="text-[9px] text-red-500">Required</span>}
          </div>
    
          <div
            className="pass
                group
                flex justify-center items-center flex-col
                border-r border-dprimary/50 px-3 h-full
                w-[25%]
                dark:border-lprimary/30"
          >
            <input
              {...register("password", { required: true })}
              className="py-1 px-2 focus:outline-none"
            />
            <div
              className="w-0 group-focus-within:w-[90%] h-px bg-dprimary/50 
            group-focus-within:animate-pulse transition-all duration-300"
            />
            {errors.password && <span>This field is required!</span>}
          </div>
    
          <div
            className="act
              text-[8px]
              flex items-center gap-2 justify-around px-4 h-full
              w-[25%] font-raleway"
          >
            <button
              type="button"
              className="cancel
                flex items-center gap-1
                border border-transparent px-3 py-1.5 font-bold rounded-full text-red-600
                bg-red-300 hover:border-red-5 active:border-red-500/50
                transition-all duration-300 ease-in-out
                dark:bg-[#a31539] dark:text-red-400"
              onClick={handleCancel}
            >
              <MdCancel className="size-4" />
              <p className="pt-0.5">Cancel</p>
            </button>
            <button
              type="submit"
              className="save
                flex gap-1 border border-transparent
                text-teal-600 font-bold px-3 py-1.5 rounded-full
                bg-teal-300 hover:border-teal-5 active:border-teal-500/50
                transition-all duration-300 ease-in-out
                dark:bg-teal-800 disabled:bg-transparent"
              disabled={!isDirty}
            >
              <lord-icon
                src="/assets/save.json"
                trigger="hover"
                className="size-4"
              />
              <p className="pt-0.5">Save</p>
            </button>
          </div>
        </form>
      );
    };
    
    export default PasswordField;
    
    `,
  },
];

export default function CodeView() {
  const [activeFileId, setActiveFileId] = useState<string>("useLongPress");
  const [copied, setCopied] = useState<boolean>(false);

  const currentFile = FILES.find((f) => f.id === activeFileId) || FILES[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = currentFile.code.split("\n");

  return (
    <main className="relative min-h-[calc(100vh-5rem)] w-full px-4 py-6 mt-14 md:mt-18 lg:mt-28 md:py-10 flex flex-col items-center font-raleway text-dprimary dark:text-slate-100 transition-colors duration-300">
      <div className="w-full max-w-5xl mx-auto space-y-6">
        <header className="relative w-full rounded-2xl p-5 md:p-8 border border-lsecondary/30 dark:border-dsecondary bg-white/70 dark:bg-dprimary/80 backdrop-blur-md shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-lprimary/30 dark:bg-dsecondary/50 text-dprimary dark:text-lprimary border border-lsecondary/20">
              <FiTerminal className="size-3.5" /> Workspace Inspection
            </div>
            <h1 className="font-dm-serif text-3xl sm:text-4xl text-dprimary dark:text-white">
              Source{" "}
              <span className="italic text-lsecondary dark:text-lprimary">
                Explorer
              </span>
            </h1>
            <p className="text-xs md:text-sm text-dprimary/75 dark:text-slate-300 max-w-xl">
              Inspect the core logic modules driving PassOP's reactive storage
              sync and gesture interactions.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-xs md:text-sm bg-dprimary dark:bg-lprimary text-white dark:text-dprimary hover:opacity-90 active:scale-95 transition-all shadow-md self-start md:self-auto"
          >
            <FiArrowLeft className="size-4" /> Back to Vault
          </Link>
        </header>

        <div className="w-full mb-10 md:mb-0 rounded-2xl border border-lprimary dark:border-lsecondary/30 bg-[#07191d] shadow-2xl overflow-hidden flex flex-col">
          <div className="h-11 px-4 bg-white/90 dark:bg-[#051316] border-b border-dsecondary/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors cursor-pointer" />
              <div className="size-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors cursor-pointer" />
              <div className="size-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors cursor-pointer" />
              <span className="ml-3 text-[11px] font-mono text-gray-400 hidden sm:inline-block">
                passop-core-engine
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-lprimary font-mono truncate max-w-[50%]">
              <FiCpu className="size-3.5 shrink-0" />
              <span className="truncate">
                {currentFile.folder}/{currentFile.name}
              </span>
            </div>

            <button
              onClick={handleCopyCode}
              type="button"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white hover:bg-lprimary hover:text-white dark:bg-dsecondary/60 dark:hover:bg-dsecondary text-lprimary border border-lsecondary/30 active:scale-95 transition-all"
            >
              {copied ? (
                <FiCheck className="size-3.5 text-white dark:text-emerald-400" />
              ) : (
                <FiCopy className="size-3.5" />
              )}
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 min-h-115 md:h-130">
            <aside className="p-3 bg-white/90 dark:bg-[#06171b] border-b md:border-b-0 md:border-r border-dsecondary/40 flex flex-col gap-1 text-xs">
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Explorer
              </div>

              <div className="flex flex-col scroll-auto">
                {FILES.map((file) => {
                  const isActive = file.id === activeFileId;
                  return (
                    <button
                      key={file.id}
                      onClick={() => setActiveFileId(file.id)}
                      className={`w-full flex flex-col items-center justify-between px-2.5 py-2 rounded-lg text-left transition-all ${
                        isActive
                          ? "bg-white dark:bg-dsecondary/70 text-lprimary font-semibold border-l-2 border-lprimary"
                          : "text-gray-400 hover:bg-white/5 hover:text-gray-500"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        {file.icon === "tsx" ? (
                          <SiReact className="size-3.5 text-[#149eca] shrink-0" />
                        ) : (
                          <SiTypescript className="size-3.5 text-[#3178c6] shrink-0" />
                        )}
                        <span className="truncate text-xs font-mono">
                          {file.name}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-auto p-2.5 rounded-xl bg-white/70 dark:bg-dprimary/60 border border-lprimary/70 dark:border-dsecondary/40 text-[11px] text-gray-500 dark:text-gray-300 leading-relaxed hidden md:block">
                <span className="font-bold text-lprimary block mb-1">
                  Module Purpose:
                </span>
                {currentFile.description}
              </div>
            </aside>

            <section className="md:col-span-3 flex flex-col bg-white/90 dark:bg-[#07191d] overflow-hidden">
              <div className="flex items-center bg-white/50 dark:bg-[#051316] border-b border-lprimary/30 dark:border-dsecondary/30 px-3 pt-2 gap-1 overflow-x-auto">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-t-lg bg-lprimary text-white dark:bg-[#07191d] border-t border-x border-lprimary dark:border-dsecondary/40 text-xs font-mono dark:text-lprimary font-semibold">
                  <FiCode className="size-3" />
                  <span>{currentFile.name}</span>
                </div>
              </div>

              <div
                key={currentFile.id}
                className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed text-slate-200
                selection:bg-lsecondary/40"
              >
                <pre className="min-w-full">
                  <code>
                    {lines.map((line, idx) => (
                      <div key={idx} className="flex hover:bg-white/5 py-0.5">
                        <span className="w-10 shrink-0 select-none pr-4 text-right text-gray-500 border-r border-dsecondary/30">
                          {idx + 1}
                        </span>

                        <span className="pl-4 text-lsecondary/80 dark:text-emerald-100/90 whitespace-pre">
                          {line || " "}
                        </span>
                      </div>
                    ))}
                  </code>
                </pre>
              </div>

              <footer className="h-6 px-3 bg-white/90 dark:bg-[#051316] border-t border-lprimary dark:border-dsecondary/30 flex items-center justify-between text-[10px] text-gray-400 font-mono">
                <div className="flex items-center gap-3">
                  <span>UTF-8</span>
                  <span>TypeScript JSX</span>
                </div>
                <div>{lines.length} lines</div>
              </footer>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
