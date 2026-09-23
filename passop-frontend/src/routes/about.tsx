import { Link } from "react-router-dom";
import {
  FiShield,
  FiDatabase,
  FiSmartphone,
  FiZap,
  FiArrowLeft,
  FiCheckCircle,
  FiServer,
  FiKey,
} from "react-icons/fi";
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiVite,
  SiGo,
  SiPostgresql,
} from "react-icons/si";

export default function About() {
  return (
    <main className="relative min-h-[calc(100vh-5rem)] w-full px-4 py-8 md:py-12 flex flex-col items-center justify-start text-dprimary dark:text-slate-100 font-raleway transition-colors duration-300">
      <div className="w-full max-w-4xl mx-auto space-y-10">
        <header className="relative w-full rounded-2xl p-6 mt-12 md:mt-16 lg:mt-24 md:p-10 border border-lsecondary/30 dark:border-dsecondary bg-white/70 dark:bg-dprimary/80 backdrop-blur-md shadow-lg overflow-hidden text-center md:text-left">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-lprimary/20 dark:bg-dsecondary/30 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-lprimary/30 dark:bg-dsecondary/50 text-dprimary dark:text-lprimary border border-lsecondary/20">
                <FiShield className="size-3.5" /> Full-Stack Vault
              </div>
              <h1 className="font-dm-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-dprimary dark:text-white">
                About Pass
                <span className="italic text-lsecondary dark:text-lprimary">
                  OP
                </span>
              </h1>
              <p className="text-sm md:text-base text-dprimary/80 dark:text-slate-300 max-w-xl leading-relaxed">
                A secure, lightweight credential manager engineered with
                responsive-first architecture, zero telemetry, and robust
                cryptographic backend integration.
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

        <section className="relative rounded-2xl p-6 md:p-8 border-2 border-teal-500/40 bg-linear-to-br from-teal-500/10 to-transparent dark:from-teal-900/20 shadow-sm overflow-hidden">
          <div className="absolute -right-10 -top-10 opacity-10">
            <FiShield className="size-48" />
          </div>
          <div className="relative">
            <span className="inline-block px-3 py-1 mb-4 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30">
              Latest Release • v2.0 Architecture
            </span>
            <h2 className="font-dm-serif text-2xl sm:text-3xl text-dprimary dark:text-white mb-2">
              Zero-Knowledge Backend Migration
            </h2>
            <p className="text-sm text-dprimary/80 dark:text-slate-300 mb-6 max-w-2xl leading-relaxed">
              PassOP has evolved from a local-only prototype into a secure,
              full-stack application. Data no longer resides in vulnerable
              browser storage. We've introduced a highly concurrent Go backend,
              PostgreSQL persistence, and military-grade client-side encryption.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/50 dark:bg-dprimary/60 border border-teal-500/20 backdrop-blur-sm">
                <FiKey className="size-6 text-teal-600 dark:text-teal-400 mb-2" />
                <h3 className="font-bold text-sm text-dprimary dark:text-white mb-1">
                  AES-GCM Encryption
                </h3>
                <p className="text-[11px] text-dprimary/75 dark:text-slate-300">
                  Passwords are encrypted in the browser using the native Web
                  Crypto API before ever reaching the network. The server only
                  sees ciphertext.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/50 dark:bg-dprimary/60 border border-teal-500/20 backdrop-blur-sm">
                <SiGo className="size-6 text-[#00ADD8] mb-2" />
                <h3 className="font-bold text-sm text-dprimary dark:text-white mb-1">
                  Go REST API
                </h3>
                <p className="text-[11px] text-dprimary/75 dark:text-slate-300">
                  Engineered a lightweight, highly concurrent backend utilizing
                  Golang's native net/http and structured routing for
                  sub-millisecond API responses.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/50 dark:bg-dprimary/60 border border-teal-500/20 backdrop-blur-sm">
                <SiPostgresql className="size-6 text-[#336791] mb-2" />
                <h3 className="font-bold text-sm text-dprimary dark:text-white mb-1">
                  PostgreSQL DB
                </h3>
                <p className="text-[11px] text-dprimary/75 dark:text-slate-300">
                  Migrated from localStorage to a relational PostgreSQL database
                  featuring strict user constraints, UUID tracking, and
                  relational integrity.
                </p>
              </div>
            </div>
          </div>
        </section>

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
                <h3 className="font-bold text-sm text-dprimary dark:text-white">
                  Adaptive Viewport UX
                </h3>
                <p className="text-xs text-dprimary/75 dark:text-slate-300 leading-normal">
                  Dual-tier presentation: a wide management table for desktop
                  monitors and compact, touch-optimized cards on mobile screens.
                </p>
              </div>
            </article>

            <article className="p-5 rounded-xl border border-lsecondary/20 dark:border-dsecondary/60 bg-white/50 dark:bg-dprimary/60 backdrop-blur-xs flex flex-col justify-between space-y-3 hover:border-lsecondary/50 transition-colors">
              <div className="size-10 rounded-lg bg-lprimary/20 dark:bg-dsecondary/40 text-lsecondary dark:text-lprimary flex items-center justify-center text-lg">
                <FiZap />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-dprimary dark:text-white">
                  Haptic Long-Press
                </h3>
                <p className="text-xs text-dprimary/75 dark:text-slate-300 leading-normal">
                  Mobile interactions support touch-and-hold gestures to summon
                  action drawers with hardware vibration cues.
                </p>
              </div>
            </article>

            <article className="p-5 rounded-xl border border-lsecondary/20 dark:border-dsecondary/60 bg-white/50 dark:bg-dprimary/60 backdrop-blur-xs flex flex-col justify-between space-y-3 hover:border-lsecondary/50 transition-colors">
              <div className="size-10 rounded-lg bg-lprimary/20 dark:bg-dsecondary/40 text-lsecondary dark:text-lprimary flex items-center justify-center text-lg">
                <FiServer />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-dprimary dark:text-white">
                  In-Memory Keys
                </h3>
                <p className="text-xs text-dprimary/75 dark:text-slate-300 leading-normal">
                  Authentication derives cryptographic keys stored entirely in
                  RAM. Refreshing the browser instantly wipes the active
                  decryption context.
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
              PassOP is constructed with modern frontend tools focused on
              velocity and bundle efficiency.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-lprimary/10 dark:bg-dsecondary/30 border border-lsecondary/20 dark:border-dsecondary/40 flex items-center gap-3">
              <SiReact className="text-xl text-[#149eca]" />
              <div>
                <p className="font-bold text-xs">React 19</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">
                  Context API
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-lprimary/10 dark:bg-dsecondary/30 border border-lsecondary/20 dark:border-dsecondary/40 flex items-center gap-3">
              <SiTypescript className="text-xl text-[#3178c6]" />
              <div>
                <p className="font-bold text-xs">TypeScript</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">
                  Strict Typing
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-lprimary/10 dark:bg-dsecondary/30 border border-lsecondary/20 dark:border-dsecondary/40 flex items-center gap-3">
              <SiTailwindcss className="text-xl text-[#06b6d4]" />
              <div>
                <p className="font-bold text-xs">Tailwind v4</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">
                  Dual Palette
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-lprimary/10 dark:bg-dsecondary/30 border border-lsecondary/20 dark:border-dsecondary/40 flex items-center gap-3">
              <SiVite className="text-xl text-[#bd34fe]" />
              <div>
                <p className="font-bold text-xs">Vite</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">
                  Module Bundler
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-lsecondary/20 dark:border-dsecondary/40 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-dprimary/80 dark:text-slate-300">
            <div className="flex items-start gap-2">
              <FiCheckCircle className="mt-0.5 size-4 text-lsecondary dark:text-lprimary shrink-0" />
              <span>
                <strong>React Hook Form</strong> manages form lifecycles and
                dirty checks to eliminate superfluous renders.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <FiCheckCircle className="mt-0.5 size-4 text-lsecondary dark:text-lprimary shrink-0" />
              <span>
                <strong>Lordicon JSON Animations</strong> supply motion
                micro-interactions for delete, edit, and clipboard triggers.
              </span>
            </div>
          </div>
        </section>

        <section className="rounded-xl p-5 mb-12 border-l-4 border-teal-500 bg-lprimary/15 dark:bg-dsecondary/25 text-xs md:text-sm space-y-2">
          <div className="flex items-center gap-2 font-bold text-dprimary dark:text-lprimary">
            <FiDatabase className="size-4" />
            <span>Storage & Security Specification</span>
          </div>
          <p className="text-dprimary/80 dark:text-slate-300 leading-relaxed">
            PassOP operates on a strict Zero-Knowledge proof system. The master
            password you use to log in derives an encryption key stored securely
            in memory. Your vault data is encrypted inside the browser using{" "}
            <code className="font-mono text-[11px] bg-black/5 dark:bg-black/30 px-1 py-0.5 rounded">
              AES-GCM-256
            </code>{" "}
            before it is transmitted to the database. The server never receives,
            stores, or processes plaintext passwords.
          </p>
        </section>
      </div>
    </main>
  );
}
