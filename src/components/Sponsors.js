import React, {useMemo, useState} from 'react';

// Simple in-file data model; replace with real sponsors/logos as needed
const defaultSponsors = [
    {
        id: 'acme',
        name: 'ACME Corp',
        logo: process.env.PUBLIC_URL + 'images/sponsors/acme.webp',
        blurb: 'Proud supporters of NC Valkyries Fastpitch Softball.',
        url: 'https://example.com',
        location: "San Francisco, CA",
        contact: "(123) 456-7890",
    }, {
        id: 'acme',
        name: 'ACME Corp',
        logo: process.env.PUBLIC_URL + 'images/sponsors/acme.webp',
        blurb: 'Proud supporters of NC Valkyries Fastpitch Softball.',
        url: 'https://example.com'
    }
];

const AccordionItem = ({title, isOpen, onToggle, children}) => (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
            type="button"
            onClick={onToggle}
            className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100"
        >
            <span className="font-medium text-gray-800">{title}</span>
            <span className="text-gray-500">{isOpen ? '−' : '+'}</span>
        </button>
        {isOpen && <div className="p-4 bg-white">{children}</div>}
    </div>
);

const Modal = ({open, onClose, children}) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
                aria-hidden="true"
            />
            <div className="relative bg-white w-[min(100%,1000px)] max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none text-3xl leading-none"
                    aria-label="Close"
                    type="button"
                >
                    ×
                </button>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
};

// Half-screen Drawer for sponsor profile with smooth slide/fade transitions
const Drawer = ({open, onClose, children}) => {
    const [mounted, setMounted] = useState(open);
    const [visible, setVisible] = useState(false);
    const [entering, setEntering] = useState(false); // longer enter than exit
    const panelRef = React.useRef(null);
    const overlayRef = React.useRef(null);

    const prefersReducedMotion = React.useMemo(() => {
        if (typeof window === 'undefined' || !window.matchMedia) return false;
        try {
            return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        } catch {
            return false;
        }
    }, []);

    const DURATION_IN = prefersReducedMotion ? 0 : 700; // ms — slower open per request
    const DURATION_OUT = prefersReducedMotion ? 0 : 500; // ms — keep current close speed

    // Step 1: ensure mounted follows `open` (mount on open, unmount handled later)
    React.useEffect(() => {
        if (open && !mounted) setMounted(true);
    }, [open, mounted]);

    // Step 2: coordinate enter/exit once mounted
    React.useLayoutEffect(() => {
        if (!mounted) return;

        let raf1 = 0, raf2 = 0, tEnter = 0, tExit = 0;

        if (open) {
            if (prefersReducedMotion) {
                setVisible(true);
                setEntering(false);
                return;
            }

            setEntering(true);

            // rAF 1: allow initial off-screen styles to commit
            raf1 = requestAnimationFrame(() => {
                // Force layout on the actual panel element to ensure the browser registers starting transform
                try {
                    panelRef.current && panelRef.current.getBoundingClientRect();
                } catch {
                }
                try {
                    overlayRef.current && overlayRef.current.getBoundingClientRect();
                } catch {
                }
                // rAF 2: next frame, toggle visible to trigger transition
                raf2 = requestAnimationFrame(() => setVisible(true));
            });

            // Clear entering flag after the enter duration
            tEnter = window.setTimeout(() => setEntering(false), DURATION_IN);
        } else {
            // Exit path
            if (prefersReducedMotion) {
                setVisible(false);
                setMounted(false);
                return;
            }
            setVisible(false);
            tExit = window.setTimeout(() => setMounted(false), DURATION_OUT);
        }

        return () => {
            if (raf1) cancelAnimationFrame(raf1);
            if (raf2) cancelAnimationFrame(raf2);
            if (tEnter) clearTimeout(tEnter);
            if (tExit) clearTimeout(tExit);
        };
    }, [mounted, open, prefersReducedMotion, DURATION_IN, DURATION_OUT]);

    // Lock body scroll while mounted
    React.useEffect(() => {
        if (!mounted) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, [mounted]);

    // Close on Escape
    React.useEffect(() => {
        if (!mounted) return;
        const onKey = (e) => {
            if (e.key === 'Escape') onClose?.();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [mounted, onClose]);

    if (!mounted) return null;

    const overlayTransition = prefersReducedMotion ? '' : `transition-opacity ${entering ? 'duration-700' : 'duration-500'}`;
    const panelTransition = prefersReducedMotion ? '' : `transition-transform ${entering ? 'duration-700' : 'duration-500'} ease-out`;

    return (
        <div className="fixed inset-0 z-50">
            {/* Overlay with fade */}
            <div
                ref={overlayRef}
                className={`absolute inset-0 bg-black/50 ${overlayTransition} ${visible ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
                aria-hidden="true"
            />
            {/* Sliding panel */}
            <div
                ref={panelRef}
                className={`absolute right-0 top-0 h-full w-full md:w-1/2 bg-white shadow-2xl overflow-y-auto transform ${panelTransition} will-change-transform ${visible ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 focus:outline-none text-3xl leading-none"
                    aria-label="Close"
                    type="button"
                >
                    ×
                </button>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
};

const SponsorProfileCard = ({ sponsor }) => {
    if (!sponsor) return null;

    const { name, logo, blurb, url, location } = sponsor;

    return (
        <div className="w-full max-w-3xl mx-auto text-slate-900">
            {/* Top heading */}
            <header className="mb-6">
                <p className="text-xs font-semibold tracking-wide text-sky-600 uppercase">
                    Sponsor
                </p>
                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                    {name}
                </h2>
            </header>

            {/* Main band: logo + primary info */}
            <section className="mb-8 rounded-2xl bg-sky-50/80 px-6 py-5 flex flex-col gap-6 lg:flex-row lg:items-center">
                {/* Logo */}
                <div className="flex-shrink-0 flex items-center justify-center">
                    <div className="h-32 w-32 md:h-40 md:w-40 rounded-xl bg-white flex items-center justify-center shadow-sm">
                        <img
                            src={logo}
                            alt={name}
                            className="max-h-28 max-w-full object-contain md:max-h-32"
                        />
                    </div>
                </div>

                {/* Name + CTA */}
                <div className="flex-1 space-y-3">
                    <div>
                        <h3 className="text-xl font-semibold text-slate-900">
                            {name}
                        </h3>
                        {blurb && (
                            <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                                {blurb}
                            </p>
                        )}
                    </div>

                    {url && (
                        <div className="pt-1">
                            <a
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
                            >
                                Visit website
                            </a>
                        </div>
                    )}
                </div>
            </section>

            {/* Detail rows – blended into drawer */}
            <section className="space-y-4">
                {/* About */}
                <div className="border-t border-sky-100 pt-4">
                    <h4 className="text-sm font-semibold text-slate-800">
                        About this sponsor
                    </h4>
                    <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                        {blurb || 'Proud sponsor of NC Valkyries Fastpitch Softball.'}
                    </p>
                </div>

                {/* Website */}
                {url && (
                    <div className="border-t border-sky-100 pt-4">
                        <h4 className="text-sm font-semibold text-slate-800">
                            Website
                        </h4>
                        <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1 inline-flex text-sm text-sky-700 hover:underline"
                        >
                            {url.replace(/^https?:\/\//, '')}
                        </a>
                    </div>
                )}

                {/* Location (below website) */}
                {location && (
                    <div className="border-t border-sky-100 pt-4">
                        <h4 className="text-sm font-semibold text-slate-800">
                            Location
                        </h4>
                        <p className="mt-1 text-sm text-slate-700">
                            {location}
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
};



const Sponsors = ({sponsors}) => {
    const data = useMemo(() => sponsors && sponsors.length ? sponsors : defaultSponsors, [sponsors]);
    const [activeSponsor, setActiveSponsor] = useState(null);
    const [paymentOpen, setPaymentOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('stripe');
    const [openAccordions, setOpenAccordions] = useState({venmo: false, cash: false});

    const stripePaymentLink = process.env.REACT_APP_STRIPE_PAYMENT_LINK || '';

    return (
        <section className="py-16 bg-white" id="sponsors">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Our Team Sponsors</h2>

                {/* Logo grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
                    {data.map((s) => (
                        <button
                            key={s.id}
                            type="button"
                            onClick={() => setActiveSponsor(s)}
                            className="group border rounded-xl p-4 flex items-center justify-center hover:bg-blue-50 transition"
                            aria-label={`Open profile for ${s.name}`}
                        >
                            <img
                                src={s.logo}
                                alt={s.name}
                                className="h-16 md:h-24 object-contain opacity-90 group-hover:opacity-100"
                            />
                        </button>
                    ))}
                </div>

                {/* Profile drawer (half screen) */}
                <Drawer open={!!activeSponsor} onClose={() => setActiveSponsor(null)}>
                    <div className="space-y-6">
                        <br/>
                        <SponsorProfileCard sponsor={activeSponsor}/>
                    </div>
                </Drawer>

                {/* Bottom-right CTA */}
                <div className="mt-10 flex justify-end">
                    <button
                        type="button"
                        onClick={() => setPaymentOpen(true)}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-white font-semibold shadow hover:brightness-95"
                        style={{backgroundColor: 'var(--light-blue)'}}
                    >
                        Become a sponsor
                    </button>
                </div>

                {/* Payment modal */}
                <Modal open={paymentOpen} onClose={() => setPaymentOpen(false)}>
                    {activeTab === 'stripe' && (
                        <div className="space-y-6">
                            {/* Stripe controls at the top: same-window redirect + open in new tab */}
                            <div>
                                {stripePaymentLink ? (
                                    <div className="w-full">
                                        <p className="text-gray-700">
                                            For security, Stripe Checkout opens on Stripe. Choose how you want to
                                            continue.
                                        </p>
                                        <div className="mt-4 flex flex-wrap items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    window.location.href = stripePaymentLink;
                                                }}
                                                className="px-5 py-2.5 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                                                aria-label="Proceed to secure Stripe Checkout"
                                            >
                                                Pay with Stripe (Same window)
                                            </button>
                                            <a
                                                href={stripePaymentLink}
                                                target="_blank"
                                                rel="noreferrer noopener"
                                                className="px-4 py-2 rounded-md border border-blue-200 text-blue-700 hover:bg-blue-50"
                                            >
                                                Open in new tab
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-4 border rounded-lg bg-yellow-50 text-yellow-900 text-sm">
                                        Stripe payment link not configured. Please set REACT_APP_STRIPE_PAYMENT_LINK in
                                        your environment.
                                    </div>
                                )}
                            </div>

                            <div className="pt-2 space-y-3">
                                <AccordionItem
                                    title="Venmo"
                                    isOpen={openAccordions.venmo}
                                    onToggle={() =>
                                        setOpenAccordions((s) => ({venmo: !s.venmo, cash: false}))
                                    }
                                >
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={process.env.PUBLIC_URL + '/images/sponsors/venmo.jpg'}
                                            alt="Venmo QR"
                                            className="w-40 h-40 object-contain border rounded"
                                        />
                                        <div className="text-gray-700">
                                            <p>Scan the QR code with the Venmo app to donate/sponsor.</p>
                                        </div>
                                    </div>
                                </AccordionItem>
                                <AccordionItem
                                    title="Cash / Check"
                                    isOpen={openAccordions.cash}
                                    onToggle={() =>
                                        setOpenAccordions((s) => ({cash: !s.cash, venmo: false}))
                                    }
                                >
                                    <p className="text-gray-700">
                                        To send cash or check, please email
                                        {' '}<a className="text-blue-600 hover:underline"
                                                href="mailto:coach@valkyries-softball.org">coach@valkyries-softball.org</a>.
                                    </p>
                                </AccordionItem>
                            </div>
                        </div>
                    )}

                    {activeTab === 'venmo' && (
                        <div className="flex items-center justify-center">
                            <img
                                src={process.env.PUBLIC_URL + '/venmo.jpg'}
                                alt="Venmo QR"
                                className="w-64 h-64 object-contain border rounded"
                            />
                        </div>
                    )}

                    {activeTab === 'cash' && (
                        <div className="text-gray-700">
                            <p>
                                To send cash or check, please email
                                {' '}<a className="text-blue-600 hover:underline"
                                        href="mailto:coach@valkyries-softball.org">coach@valkyries-softball.org</a>.
                            </p>
                        </div>
                    )}
                </Modal>
            </div>
        </section>
    );
};

export default Sponsors;
