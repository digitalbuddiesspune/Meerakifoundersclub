import LegalDocumentShell from '../components/LegalDocumentShell'

function TermsAndConditions() {
  return (
    <LegalDocumentShell title="Terms & Conditions" eyebrow="Legal">
      <section>
        <h2 className="text-lg font-semibold text-slate-900">1. Agreement</h2>
        <p className="mt-3">
          By accessing or using the Meraaki Founders Club website and related services (“Services”),
          you agree to these Terms & Conditions. If you do not agree, please do not use the
          Services.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">2. Services</h2>
        <p className="mt-3">
          We provide information, community, and founder-focused programmes as described on our site.
          Features may change over time. We aim to keep information accurate but do not warrant that
          all content is complete or up to date.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">3. Accounts and conduct</h2>
        <p className="mt-3">
          Where registration is required, you agree to provide accurate information and keep
          credentials confidential. You must not misuse the Services, attempt unauthorised access,
          or use them in violation of law or third-party rights.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">4. Intellectual property</h2>
        <p className="mt-3">
          Content on the site (including text, graphics, and logos) is owned by Meraaki Founders Club
          or its licensors unless stated otherwise. You may not copy or redistribute such content
          without permission, except as allowed by law or for personal, non-commercial use.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">5. Disclaimer</h2>
        <p className="mt-3">
          The Services are provided “as is” without warranties of any kind, to the fullest extent
          permitted by law. Nothing on the site constitutes legal, financial, or investment advice;
          you should consult qualified professionals for decisions affecting your business.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">6. Limitation of liability</h2>
        <p className="mt-3">
          To the maximum extent permitted by applicable law, Meraaki Founders Club and its team will
          not be liable for indirect, incidental, or consequential damages arising from your use of
          the Services.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">7. Changes</h2>
        <p className="mt-3">
          We may update these terms from time to time. Continued use after changes constitutes
          acceptance of the revised terms. The “Last updated” date at the top of this page will
          reflect material changes.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">8. Contact</h2>
        <p className="mt-3">
          For questions about these Terms & Conditions:{' '}
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

export default TermsAndConditions
