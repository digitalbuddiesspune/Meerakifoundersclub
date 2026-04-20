import LegalDocumentShell from '../components/LegalDocumentShell'

function PrivacyPolicy() {
  return (
    <LegalDocumentShell title="Privacy Policy" eyebrow="Legal">
      <section>
        <h2 className="text-lg font-semibold text-slate-900">1. Introduction</h2>
        <p className="mt-3">
          Meraaki Founders Club (“we”, “us”, “our”) respects your privacy. This Privacy Policy
          explains how we collect, use, disclose, and safeguard information when you visit our
          website or use our services.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">2. Information we collect</h2>
        <p className="mt-3">We may collect:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <span className="font-medium text-slate-800">Contact and account details</span> — such
            as name, email address, and phone number when you register, subscribe, or contact us.
          </li>
          <li>
            <span className="font-medium text-slate-800">Usage data</span> — such as pages viewed,
            approximate location (country/region), device type, and referral source, where permitted.
          </li>
          <li>
            <span className="font-medium text-slate-800">Communications</span> — messages you send
            to us (for example via email or forms).
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">3. How we use your information</h2>
        <p className="mt-3">We use information to:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Provide and improve our programs, events, and founder services.</li>
          <li>Respond to enquiries and communicate updates you have opted into.</li>
          <li>Analyse usage to improve the website experience and security.</li>
          <li>Comply with applicable law and protect our users and operations.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">4. Sharing of information</h2>
        <p className="mt-3">
          We do not sell your personal information. We may share information with trusted service
          providers who assist us (e.g. hosting, analytics) under appropriate safeguards, or when
          required by law or to protect our rights.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">5. Data retention and security</h2>
        <p className="mt-3">
          We retain information only as long as needed for the purposes described above or as
          required by law. We use reasonable administrative, technical, and organisational measures
          to protect your data; no method of transmission over the internet is fully secure.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">6. Your choices</h2>
        <p className="mt-3">
          Depending on applicable law, you may have rights to access, correct, delete, or restrict
          processing of your personal data, or to object to certain processing. Contact us using
          the details below to exercise these rights.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">7. Contact</h2>
        <p className="mt-3">
          Questions about this Privacy Policy:{' '}
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

export default PrivacyPolicy
