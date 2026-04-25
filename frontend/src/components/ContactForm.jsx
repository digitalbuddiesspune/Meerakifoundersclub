import { useMemo, useState } from 'react'

function ContactForm({ services = [] }) {
  const [result, setResult] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const serviceOptions = useMemo(() => {
    return services
      .map((service) => service?.name)
      .filter((name) => typeof name === 'string' && name.trim().length > 0)
  }, [services])

  const onSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setResult('')

    const formData = new FormData(event.target)
    formData.append('access_key', 'bf814e16-a693-44fe-b0c6-cd03128e40c7')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (data.success) {
        setResult('Message sent successfully. We will call back soon.')
        setShowSuccessToast(true)
        setTimeout(() => {
          setShowSuccessToast(false)
        }, 3200)
        event.target.reset()
      } else {
        setResult('Something went wrong. Please try again.')
      }
    } catch (error) {
      setResult('Unable to send message right now. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative rounded-2xl border border-slate-200 bg-slate-50 p-4 md:p-5">
      <div
        className={`pointer-events-none absolute right-4 top-4 z-20 w-[260px] rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 shadow-md transition-all duration-500 ${
          showSuccessToast ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        }`}
      >
        Message sent successfully. We will call back soon.
      </div>

      <h2 className="text-xl font-bold text-slate-900 md:text-2xl">Send Us a Message</h2>
      <p className="mt-1.5 text-sm text-slate-600">
        Share your details and requirement. Our team will get back to you quickly.
      </p>

      <form onSubmit={onSubmit} className="mt-4 space-y-2.5">
        <div className="grid gap-2.5 md:grid-cols-2">
          <div>
            <label htmlFor="contactEmail" className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="contactEmail"
              type="email"
              name="email"
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-slate-900 outline-none transition focus:border-[#F26527]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="contactPhone" className="mb-1 block text-sm font-medium text-slate-700">
              Phone Number
            </label>
            <input
              id="contactPhone"
              type="tel"
              name="phone"
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-slate-900 outline-none transition focus:border-[#F26527]"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        <div>
          <label htmlFor="serviceNeed" className="mb-1 block text-sm font-medium text-slate-700">
            Service You Need
          </label>
          <select
            id="serviceNeed"
            name="service"
            required
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-slate-900 outline-none transition focus:border-[#F26527]"
            defaultValue=""
          >
            <option value="" disabled>
              Select interested service
            </option>
            {serviceOptions.map((serviceName) => (
              <option key={serviceName} value={serviceName}>
                {serviceName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="contactMessage" className="mb-1 block text-sm font-medium text-slate-700">
            Message
          </label>
          <textarea
            id="contactMessage"
            name="message"
            required
            rows="3"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-slate-900 outline-none transition focus:border-[#F26527]"
            placeholder="Tell us how we can help your startup."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-xl bg-[#F26527] px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>

        {result ? <p className="text-sm text-slate-700">{result}</p> : null}
      </form>
    </div>
  )
}

export default ContactForm
