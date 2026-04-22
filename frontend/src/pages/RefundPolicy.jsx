import LegalDocumentShell from '../components/LegalDocumentShell'

function RefundPolicy() {
  return (
    <LegalDocumentShell title="Refund Policy" eyebrow="Legal">
      <section>
        <h2 className="text-lg font-semibold text-slate-900">1. Scope</h2>
        <p className="mt-3">
          This Refund Policy explains how refunds are handled for services, programs, and related
          payments made to Meraaki Founders Club.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">2. Service-based engagements</h2>
        <p className="mt-3">
          Many of our offerings involve expert time, planning, and execution. Once work has started,
          fees paid for completed milestones or delivered work are generally non-refundable.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">3. Eligibility for refunds</h2>
        <p className="mt-3">A refund request may be considered when:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Duplicate payment was charged due to a technical error.</li>
          <li>Payment was made but the service could not be started by us for valid operational reasons.</li>
          <li>A cancellation request is approved before meaningful work begins.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">4. Non-refundable cases</h2>
        <p className="mt-3">Refunds are usually not provided for:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Change of mind after service initiation.</li>
          <li>Delay caused by missing inputs, documents, or approvals from the client side.</li>
          <li>Partially or fully completed deliverables, consultations, or strategy sessions.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">5. Refund request timeline</h2>
        <p className="mt-3">
          If you believe you are eligible, submit a refund request within 7 days of payment with
          transaction details and reason for the request.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">6. Processing</h2>
        <p className="mt-3">
          Approved refunds are processed to the original payment method. Processing timelines may
          vary based on payment provider and banking partners.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">7. Contact</h2>
        <p className="mt-3">
          For refund related queries, contact us at{' '}
          <a
            href="mailto:info@meraakifoundersclub.com"
            className="font-semibold text-emerald-700 hover:text-emerald-600"
          >
            info@meraakifoundersclub.com
          </a>
          .
        </p>
      </section>
    </LegalDocumentShell>
  )
}

export default RefundPolicy
