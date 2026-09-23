import { useState } from "react";
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
              Get in{" "}
              <span className="italic text-lsecondary dark:text-lprimary">
                Touch
              </span>
            </h1>
            <p className="text-xs md:text-sm text-dprimary/75 dark:text-slate-300 max-w-md">
              Have feedback, spotted a bug, or want to discuss password security
              architectures? Send a direct transmission.
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
              <span>
                Feedback submitted through this portal does not access or
                transmit your vault storage.
              </span>
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
                    <span className="text-[10px] text-red-500 font-semibold">
                      {errors.name.message}
                    </span>
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
                    <span className="text-[10px] text-red-500 font-semibold">
                      {errors.email.message}
                    </span>
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
                  <span className="text-[10px] text-red-500 font-semibold">
                    {errors.subject.message}
                  </span>
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
                    minLength: {
                      value: 10,
                      message: "Must be at least 10 characters",
                    },
                  })}
                  placeholder="Describe your thoughts, feedback, or steps to reproduce an issue..."
                  className="w-full text-xs md:text-sm p-3 rounded-xl bg-slate-50 dark:bg-[#07191d] border border-lsecondary/30 dark:border-dsecondary focus:border-lsecondary dark:focus:border-lprimary focus:ring-1 focus:ring-lsecondary/50 outline-none transition-all resize-none placeholder:text-gray-400"
                />
                {errors.message && (
                  <span className="text-[10px] text-red-500 font-semibold">
                    {errors.message.message}
                  </span>
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
}
