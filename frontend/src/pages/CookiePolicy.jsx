import LegalDocumentShell from '../components/LegalDocumentShell'

function CookiePolicy() {
  return (
    <LegalDocumentShell title="Cookie Policy" eyebrow="Legal">
      <section>
        <h2 className="text-lg font-semibold text-slate-900">1. What are cookies?</h2>
        <p className="mt-3">
          Cookies are small text files stored on your device when you visit a website. They help the
          site function, remember preferences, and understand how visitors use our pages.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">2. How we use cookies</h2>
        <p className="mt-3">Meraaki Founders Club may use cookies to:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <span className="font-medium text-slate-800">Essential operation</span> — keep the site
            secure and enable core features (for example session or load balancing).
          </li>
          <li>
            <span className="font-medium text-slate-800">Preferences</span> — remember choices such
            as language or display options where applicable.
          </li>
          <li>
            <span className="font-medium text-slate-800">Analytics</span> — understand traffic and
            improve content and usability (often through aggregated, non-identifying data).
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">3. Third-party cookies</h2>
        <p className="mt-3">
          Some cookies may be set by third-party services we use (for example embedded media,
          analytics, or fonts). Those providers have their own policies governing their cookies.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">4. Managing cookies</h2>
        <p className="mt-3">
          Most browsers let you block or delete cookies via settings. Blocking essential cookies may
          affect how the website works. For browser-specific instructions, refer to your browser’s
          help documentation.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">5. Updates</h2>
        <p className="mt-3">
          We may update this Cookie Policy when our practices or regulations change. Check this page
          periodically; the “Last updated” date reflects the latest revision.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">6. Contact</h2>
        <p className="mt-3">
          Questions about cookies or this policy:{' '}
          <a
            href="mailto:info@meraakifoundersclub.com"
            className="font-semibold text-emerald-700 hover:text-emerald-600"
          >
            info@meraakifoundersclub.com
          </a>
        </p>
      </section>
    </LegalDocumentShell>
  )
}

export default CookiePolicy
