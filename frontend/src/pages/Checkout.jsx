import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useOutletContext } from 'react-router-dom'

const API_BASE_URL = import.meta.env.VITE_API_URL

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })

function Checkout() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, authUser, onOpenAuth, setAuthUser } = useOutletContext()
  const [isPaying, setIsPaying] = useState(false)
  const [paymentError, setPaymentError] = useState('')

  const selectedPlan = useMemo(() => state?.plan || null, [state])
  const amount = useMemo(
    () => Number(selectedPlan?.disccountedPrice ?? selectedPlan?.price ?? 0),
    [selectedPlan],
  )

  useEffect(() => {
    if (!isAuthenticated) {
      onOpenAuth()
      navigate('/memberships')
      return
    }

    if (!selectedPlan) {
      navigate('/memberships')
    }
  }, [isAuthenticated, navigate, onOpenAuth, selectedPlan])

  const startPayment = async () => {
    if (!selectedPlan || !authUser?._id) return
    setPaymentError('')
    setIsPaying(true)

    try {
      const sdkLoaded = await loadRazorpayScript()
      if (!sdkLoaded) {
        setPaymentError('Unable to load Razorpay. Please try again.')
        return
      }

      const orderResponse = await fetch(`${API_BASE_URL}/create-membership-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: authUser._id,
          planName: selectedPlan.planName,
          amount,
        }),
      })
      const orderData = await orderResponse.json()
      if (!orderResponse.ok) {
        setPaymentError(orderData.message || 'Failed to create order.')
        return
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'Meraaki Founders Club',
        description: `${selectedPlan.planName} Membership`,
        order_id: orderData.order.id,
        prefill: {
          name: authUser.name,
          email: authUser.email,
          contact: authUser.phone,
        },
        handler: async (response) => {
          const verifyResponse = await fetch(`${API_BASE_URL}/verify-membership-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: authUser._id,
              planName: selectedPlan.planName,
              ...response,
            }),
          })
          const verifyData = await verifyResponse.json()
          if (!verifyResponse.ok) {
            setPaymentError(verifyData.message || 'Payment verification failed.')
            return
          }

          setAuthUser({
            plan: verifyData.user?.plan || selectedPlan.planName,
            status: verifyData.user?.status || 'active',
          })
          navigate('/user/dashboard')
        },
        theme: { color: '#F26527' },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.on('payment.failed', () => {
        setPaymentError('Payment was not completed. Please try again.')
      })
      razorpay.open()
    } catch {
      setPaymentError('Something went wrong while processing payment.')
    } finally {
      setIsPaying(false)
    }
  }

  if (!selectedPlan) return null

  return (
    <main className="min-h-screen bg-[#FAFAF8] px-4 py-14 md:px-8 md:py-20">
      <section className="mx-auto w-full max-w-3xl rounded-3xl border border-[#ebe8e4] bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#F26527]">Checkout</p>
        <h1 className="mt-2 text-3xl font-extrabold text-[#0f0f0d]">Confirm your membership plan</h1>
        <p className="mt-2 text-sm text-slate-600">
          Complete payment to activate your membership and access your dashboard.
        </p>

        <div className="mt-8 rounded-2xl border border-[#efece8] bg-[#fcfcfb] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#0f0f0d]">{selectedPlan.planName}</h2>
              <p className="text-sm text-slate-500">{selectedPlan.renewal}</p>
            </div>
            <p className="text-2xl font-extrabold text-[#0f0f0d]">Rs. {amount}</p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-[#efece8] bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Payment Method</p>
          <label className="mt-3 flex items-center justify-between rounded-xl border border-[#F26527]/35 bg-[#F26527]/5 px-4 py-3">
            <span className="text-sm font-semibold text-slate-800">Pay Online (Razorpay)</span>
            <input type="radio" checked readOnly className="h-4 w-4 accent-[#F26527]" />
          </label>
        </div>

        {paymentError ? (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {paymentError}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={isPaying}
            onClick={startPayment}
            className="rounded-full bg-[#F26527] px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPaying ? 'Processing...' : 'Pay & Activate Plan'}
          </button>
          <Link
            to="/memberships"
            className="rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700"
          >
            Back to plans
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Checkout
