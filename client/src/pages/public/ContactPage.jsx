import { useState } from "react";

const SERVICES = [
  "General Dentistry",
  "Cosmetic Dentistry",
  "Orthodontics",
  "Oral Surgery",
  "Periodontics",
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const initialForm = {
  name: "",
  email: "",
  service: SERVICES[0],
  message: "",
  company: "",
};

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.message.trim()) next.message = "Please enter a message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("idle");

    if (!validate()) return;
    if (form.company) return;

    setStatus("submitting");
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          service: form.service,
          message: form.message,
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 selection:bg-teal-200 antialiased font-sans">
      <main className="pt-12">
        {/* Hero Section */}
        <section className="relative px-4 md:px-8 py-12 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            <div className="w-full flex flex-col items-start gap-4 min-w-0">
              <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-800 rounded-full text-sm font-medium tracking-wide">
                Contact Our Clinic
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Get in Touch
              </h1>
              <p className="text-lg text-slate-600 max-w-144 leading-relaxed">
                Experience a new standard of dental care. Whether you have questions about a procedure or wish to
                schedule a consultation, our team is here to provide clinical excellence and compassionate support.
              </p>
            </div>
            <div className="hidden lg:block relative">
              <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                <img
                  className="w-full h-full object-cover"
                  alt="Modern dental clinic interior"
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
                />
              </div>
            </div>
          </div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl -z-10" />
        </section>

        {/* Main Contact Grid */}
        <section className="px-4 md:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Form Side */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
                  
                  <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-slate-700">Full Name</label>
                        <input
                          className="w-full h-12 px-4 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all text-base text-slate-900"
                          placeholder="John Doe"
                          type="text"
                          value={form.name}
                          onChange={(e) => updateField("name", e.target.value)}
                        />
                        {errors.name && <p className="text-red-600 text-sm font-medium mt-0.5">{errors.name}</p>}
                      </div>
                      
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-slate-700">Email Address</label>
                        <input
                          className="w-full h-12 px-4 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all text-base text-slate-900"
                          placeholder="john@example.com"
                          type="email"
                          value={form.email}
                          onChange={(e) => updateField("email", e.target.value)}
                        />
                        {errors.email && <p className="text-red-600 text-sm font-medium mt-0.5">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-700">Service Interest</label>
                      <div className="relative">
                        <select
                          className="w-full h-12 px-4 pr-10 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all appearance-none cursor-pointer text-base text-slate-900"
                          value={form.service}
                          onChange={(e) => updateField("service", e.target.value)}
                        >
                          {SERVICES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          arrow_drop_down
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-700">Your Message</label>
                      <textarea
                        className="w-full p-4 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all text-base text-slate-900 resize-none"
                        placeholder="How can we help you today?"
                        rows={4}
                        value={form.message}
                        onChange={(e) => updateField("message", e.target.value)}
                      />
                      {errors.message && <p className="text-red-600 text-sm font-medium mt-0.5">{errors.message}</p>}
                    </div>

                    {/* Honeypot */}
                    <div className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
                      <label htmlFor="company">Company</label>
                      <input
                        id="company"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.company}
                        onChange={(e) => updateField("company", e.target.value)}
                      />
                    </div>

                    {status === "success" && (
                      <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl px-4 py-3 text-sm font-medium">
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        Thanks — your message has been sent. We'll be in touch within 24 hours.
                      </div>
                    )}
                    {status === "error" && (
                      <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-800 rounded-xl px-4 py-3 text-sm font-medium">
                        <span className="material-symbols-outlined text-[18px]">error</span>
                        Something went wrong sending your message. Please try again.
                      </div>
                    )}

                    <button
                      className="w-full md:w-auto self-start px-8 py-3 bg-linear-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-full font-semibold shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer mt-2"
                      type="submit"
                      disabled={status === "submitting"}
                    >
                      {status === "submitting" ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Inquiry"
                      )}
                    </button>
                  </form>
                </div>

                {/* Map Component */}
                <div className="bg-white rounded-2xl overflow-hidden h-[350px] relative border border-slate-200 shadow-sm">
                  <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-xs font-bold text-teal-700 uppercase tracking-wider">Located in Health District</p>
                  </div>
                  <div className="w-full h-full bg-slate-100 relative overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      alt="Map representation"
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <span
                        className="material-symbols-outlined text-teal-600 text-4xl animate-bounce"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        location_on
                      </span>
                      <div className="w-8 h-2 bg-slate-900/20 rounded-full blur-xs mt-0.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Side */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="bg-white rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900">Clinic Information</h2>
                  
                  <div className="flex flex-col gap-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                        <span className="material-symbols-outlined">call</span>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone Support</p>
                        <p className="text-base font-bold text-slate-900 mt-0.5">+1 (555) 234-9000</p>
                        <p className="text-xs text-slate-400 mt-0.5">Mon-Fri, 8am-6pm</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                        <span className="material-symbols-outlined">mail</span>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Inquiry</p>
                        <p className="text-base font-bold text-slate-900 mt-0.5">care@puredent.com</p>
                        <p className="text-xs text-slate-400 mt-0.5">Response within 24h</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                        <span className="material-symbols-outlined">location_on</span>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Our Address</p>
                        <p className="text-base font-bold text-slate-900 mt-0.5">1200 Health Plaza, Suite 400</p>
                        <p className="text-xs text-slate-400 mt-0.5">Central Medical District, NY 10001</p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-rose-50 rounded-xl border border-rose-100 flex items-start gap-4 mt-2">
                      <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                          emergency
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-rose-900">Emergency Care</p>
                        <p className="text-base font-extrabold text-rose-600 mt-0.5">+1 (555) 911-DENT</p>
                        <p className="text-xs text-rose-700/80 mt-0.5">Available 24/7 for urgent cases</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ Sidebar */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Answers</h3>
                  <div className="flex flex-col gap-4">
                    <details className="group cursor-pointer">
                      <summary className="list-none flex justify-between items-center text-sm font-semibold text-slate-800 group-hover:text-teal-600 transition-colors">
                        Do you accept dental insurance?
                        <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform">expand_more</span>
                      </summary>
                      <p className="pt-2 text-xs text-slate-600 leading-relaxed">
                        Yes, we work with all major PPO insurance providers. Contact us to verify your specific coverage.
                      </p>
                    </details>
                    <div className="h-px bg-slate-200" />
                    <details className="group cursor-pointer">
                      <summary className="list-none flex justify-between items-center text-sm font-semibold text-slate-800 group-hover:text-teal-600 transition-colors">
                        What should I bring to my first visit?
                        <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform">expand_more</span>
                      </summary>
                      <p className="pt-2 text-xs text-slate-600 leading-relaxed">
                        Please bring your ID, insurance card, and any previous dental records or X-rays you may have.
                      </p>
                    </details>
                    <div className="h-px bg-slate-200" />
                    <details className="group cursor-pointer">
                      <summary className="list-none flex justify-between items-center text-sm font-semibold text-slate-800 group-hover:text-teal-600 transition-colors">
                        Do you offer parking?
                        <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform">expand_more</span>
                      </summary>
                      <p className="pt-2 text-xs text-slate-600 leading-relaxed">
                        Validated parking is available in the Health Plaza garage for all PureDent patients.
                      </p>
                    </details>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 py-12 max-w-7xl mx-auto">
          <div className="flex flex-col gap-3">
            <div className="text-xl font-black text-slate-900 tracking-tight">PureDent</div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Advancing oral healthcare through technology, empathy, and clinical precision.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Links</h4>
            <ul className="flex flex-col gap-2 text-xs">
              <li><a className="text-slate-600 hover:text-teal-600 transition-colors" href="#">About PureDent</a></li>
              <li><a className="text-slate-600 hover:text-teal-600 transition-colors" href="#">Our Specialists</a></li>
              <li><a className="text-slate-600 hover:text-teal-600 transition-colors" href="#">Technology</a></li>
              <li><a className="text-slate-600 hover:text-teal-600 transition-colors" href="#">Treatments</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Support</h4>
            <ul className="flex flex-col gap-2 text-xs">
              <li><a className="text-slate-600 hover:text-teal-600 transition-colors" href="#">Patient Portal</a></li>
              <li><a className="text-slate-600 hover:text-teal-600 transition-colors" href="#">Terms of Service</a></li>
              <li><a className="text-slate-600 hover:text-teal-600 transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="text-slate-600 hover:text-teal-600 transition-colors" href="#">FAQs</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Follow Us</h4>
            <div className="flex gap-3">
              <a className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-teal-50 hover:text-teal-600 text-slate-600 transition-colors" href="#">
                <span className="material-symbols-outlined text-sm">share</span>
              </a>
              <a className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-teal-50 hover:text-teal-600 text-slate-600 transition-colors" href="#">
                <span className="material-symbols-outlined text-sm">groups</span>
              </a>
            </div>
            <p className="text-xs text-slate-400 mt-2">© 2024 PureDent Dental Clinic. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}