"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, ShieldAlert } from "lucide-react";
import confetti from "canvas-confetti";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [honeypot, setHoneypot] = useState(""); // anti-spam
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      // Bot detected!
      setStatus("success");
      return;
    }

    if (!form.name || !form.email || !form.message) {
      setErrorMsg("Please fill out all required fields.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
        // Celebrate with premium confetti!
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#00E5FF", "#7C3AED", "#FFFFFF"],
        });
      } else {
        throw new Error("Failed to send message.");
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "An error occurred. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-secondary-dark/10 grid-overlay">
      <div className="absolute left-0 top-1/4 w-80 h-80 bg-primary-cyan/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] tracking-[0.3em] text-primary-cyan uppercase font-bold">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2 mb-6">
            Let&apos;s Collaborate on Something Great
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-primary-cyan to-accent-purple mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <h3 className="text-2xl font-display font-bold text-white mb-2">
              Contact Details
            </h3>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Have a freelance requirement, a technical problem to discuss, or just want to connect? Reach out via any of these channels!
            </p>

            {/* Email */}
            <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 hover:border-primary-cyan/25 transition-all duration-300">
              <div className="p-3 bg-primary-cyan/10 rounded-xl text-primary-cyan">
                <Mail size={20} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-text-muted">Email</span>
                <p className="text-white text-sm font-semibold mt-0.5">
                  sushma.sharma.it@gmail.com
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 hover:border-accent-purple/25 transition-all duration-300">
              <div className="p-3 bg-accent-purple/10 rounded-xl text-accent-purple">
                <Phone size={20} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-text-muted">Phone</span>
                <p className="text-white text-sm font-semibold mt-0.5">
                  +91 (000) 000-0000
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 hover:border-white/20 transition-all duration-300">
              <div className="p-3 bg-white/5 rounded-xl text-white">
                <MapPin size={20} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-text-muted">Location</span>
                <p className="text-white text-sm font-semibold mt-0.5">
                  Uttar Pradesh, India
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel-glow p-8 rounded-3xl relative overflow-hidden bg-secondary-dark/40">
              
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle size={56} className="text-primary-cyan mb-4 animate-bounce" />
                  <h4 className="text-xl font-bold text-white mb-2">Message Sent Successfully!</h4>
                  <p className="text-text-muted text-xs max-w-sm">
                    Thank you for reaching out, Sushma will review your inquiry and get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold text-white transition-all duration-300"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Honeypot field (hidden) */}
                  <input
                    type="text"
                    name="honeypot"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    autoComplete="off"
                  />

                  {/* Name */}
                  <div className="flex flex-col">
                    <label htmlFor="name" className="text-[10px] uppercase font-mono tracking-widest text-text-muted mb-2">
                      Your Name <span className="text-primary-cyan">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full bg-white/5 border border-white/10 focus:border-primary-cyan rounded-2xl px-4 py-3 text-sm text-white outline-none transition-all duration-300 hover:border-white/20"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-[10px] uppercase font-mono tracking-widest text-text-muted mb-2">
                      Your Email <span className="text-primary-cyan">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane.doe@example.com"
                      className="w-full bg-white/5 border border-white/10 focus:border-primary-cyan rounded-2xl px-4 py-3 text-sm text-white outline-none transition-all duration-300 hover:border-white/20"
                    />
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col">
                    <label htmlFor="subject" className="text-[10px] uppercase font-mono tracking-widest text-text-muted mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Freelance Project / Collaboration Opportunity"
                      className="w-full bg-white/5 border border-white/10 focus:border-primary-cyan rounded-2xl px-4 py-3 text-sm text-white outline-none transition-all duration-300 hover:border-white/20"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col">
                    <label htmlFor="message" className="text-[10px] uppercase font-mono tracking-widest text-text-muted mb-2">
                      Message <span className="text-primary-cyan">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      className="w-full bg-white/5 border border-white/10 focus:border-primary-cyan rounded-2xl px-4 py-3 text-sm text-white outline-none transition-all duration-300 hover:border-white/20 resize-none"
                    />
                  </div>

                  {/* Error Notification */}
                  {status === "error" && (
                    <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-2xl">
                      <ShieldAlert size={14} className="shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary-cyan to-accent-purple text-background-dark font-bold text-sm hover:scale-[1.01] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <span className="w-5 h-5 rounded-full border-2 border-background-dark border-t-transparent animate-spin" />
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
