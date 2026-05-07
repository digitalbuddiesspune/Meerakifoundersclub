import { useMemo, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

function ContactForm({ services = [] }) {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const serviceOptions = useMemo(
    () =>
      Array.isArray(services)
        ? services.map((service) => ({
            id: service?._id || service?.name,
            name: service?.name || "Service",
          }))
        : [],
    [services]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResponseMessage("");
    setIsSubmitting(true);

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        service: form.service.trim(),
        message: form.message.trim(),
      };

      const response = await fetch(`${API_BASE_URL}/service-details/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.message || "Unable to submit inquiry right now.");
      }

      setResponseMessage("Inquiry submitted successfully.");
      setForm(initialForm);
    } catch (error) {
      setResponseMessage(error.message || "Failed to submit inquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6"
    >
      <h3 className="text-lg font-bold text-slate-900">Send Us a Message</h3>
      <p className="mt-1 text-sm text-slate-600">
        Share your requirement and our team will get back to you quickly.
      </p>

      <div className="mt-5 space-y-3">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          required
        />
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          required
        />
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          required
        >
          <option value="">Select a service</option>
          {serviceOptions.map((service) => (
            <option key={service.id} value={service.name}>
              {service.name}
            </option>
          ))}
        </select>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your requirement"
          rows={4}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          required
        />
      </div>

      {responseMessage ? (
        <p className="mt-3 text-sm text-slate-700">{responseMessage}</p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Submitting..." : "Submit Inquiry"}
      </button>
    </form>
  );
}

export default ContactForm;
