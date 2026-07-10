import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions — WAH Momentz',
  description: 'Terms and conditions governing the use of WAH Momentz services and website.',
};

const sections = [
  {
    title: 'Acceptance of Terms',
    content: `By accessing our website or engaging our services, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please do not use our website or services.`,
  },
  {
    title: 'Services',
    content: `WAH Momentz provides wedding planning, event management, and related consultancy services. The specific scope of services for each client is agreed upon in writing via a signed Service Agreement prior to commencement of any work. Nothing on this website constitutes a binding offer of services.`,
  },
  {
    title: 'Enquiries and Consultations',
    content: `Submitting an enquiry form on our website does not create a contractual relationship between you and WAH Momentz. A contract is formed only when both parties sign a written Service Agreement and a deposit is received. We reserve the right to decline any booking at our discretion.`,
  },
  {
    title: 'Deposits and Payments',
    content: `A non-refundable booking deposit (as specified in your Service Agreement) is required to secure your wedding date. This deposit is applied toward the total service fee. The payment schedule for the remaining balance will be outlined in your Service Agreement. Failure to make payments on schedule may result in suspension of services.`,
  },
  {
    title: 'Cancellation Policy',
    content: `<strong>Client Cancellation:</strong> If you cancel your event, the booking deposit is non-refundable. Cancellations made 12+ months before the wedding date: 25% of the total fee is payable. Cancellations 6–12 months before: 50% of the total fee. Cancellations less than 6 months before: 75% of the total fee. All cancellations must be received in writing.<br/><br/><strong>Unforeseen Circumstances:</strong> In the event of cancellation due to government-declared emergencies, natural disasters, or circumstances entirely beyond either party's control, we will work with you compassionately to defer dates or find equitable solutions, consistent with our force majeure provisions.`,
  },
  {
    title: 'Rescheduling',
    content: `Rescheduling of a confirmed event date is subject to availability and may incur a rescheduling fee as specified in your Service Agreement. We will make every reasonable effort to accommodate rescheduling requests.`,
  },
  {
    title: 'Vendor Management',
    content: `While WAH Momentz carefully curates and vets all recommended vendors, we act as an intermediary between you and third-party suppliers (photographers, caterers, venues, entertainment, etc.). WAH Momentz is not liable for the acts, omissions, or failures of third-party vendors. Contracts with vendors are typically entered into directly by you, or by WAH Momentz on your behalf — this will be clearly specified in your Service Agreement.`,
  },
  {
    title: 'Photography and Intellectual Property',
    content: `All photographs, videos, designs, proposals, mood boards, and planning documents created by WAH Momentz or commissioned on your behalf remain the intellectual property of WAH Momentz until full payment is received. Upon receipt of full payment, you are granted a personal, non-commercial licence to use these materials. WAH Momentz retains the right to use event photographs and videos for portfolio and marketing purposes unless you have requested otherwise in writing.`,
  },
  {
    title: 'Website Use',
    content: `All content on this website — including text, images, logos, and designs — is the property of WAH Momentz and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use any content from this website without prior written permission.`,
  },
  {
    title: 'Limitation of Liability',
    content: `WAH Momentz' maximum liability in connection with our services is limited to the total fees paid by you under your Service Agreement. We are not liable for any indirect, consequential, or incidental damages. We strongly recommend that all clients obtain wedding insurance to cover unforeseen circumstances beyond WAH Momentz' control.`,
  },
  {
    title: 'Governing Law',
    content: `These Terms and Conditions are governed by the laws of India. Any disputes arising from these terms or the services we provide shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.`,
  },
  {
    title: 'Amendments',
    content: `We reserve the right to update these Terms and Conditions at any time. Changes will be posted on this page with an updated revision date. Your continued use of our website or services after changes are posted constitutes acceptance of the revised terms.`,
  },
  {
    title: 'Contact',
    content: `For questions regarding these Terms and Conditions, please contact us at <a href="mailto:wahmomentz@gmail.com" class="text-accent hover:text-burgundy transition-colors">wahmomentz@gmail.com</a> or call us at <a href="tel:+919891106761" class="text-accent hover:text-burgundy transition-colors">+91 98911 06761</a>.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 bg-ivory min-h-screen">
        {/* Hero */}
        <section className="py-16 bg-primary text-center">
          <div className="container-custom">
            <div className="eyebrow text-champagne/70 mb-4">Legal</div>
            <h1 className="font-cormorant text-5xl sm:text-6xl font-[300] italic text-white mb-4">
              Terms &amp; <span className="font-[600] not-italic text-champagne">Conditions</span>
            </h1>
            <p className="font-sans text-warmgray/80 text-sm">Last Updated: January 2025</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-section">
          <div className="container-custom max-w-3xl">
            {/* Intro */}
            <div className="mb-12 p-8 glass-card rounded-2xl" data-aos="fade-up">
              <p className="font-sans text-warmgray leading-relaxed">
                Please read these Terms and Conditions carefully before using our website or engaging our
                wedding planning services. These terms govern your use of the WAH Momentz
                website and the professional relationship between you (the client) and WAH Momentz Wedding
                Planners ("WAH Momentz," "we," "us," or "our").
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-10">
              {sections.map((section, i) => (
                <div key={i} data-aos="fade-up" data-aos-delay={i * 20}>
                  <h2 className="font-cormorant text-2xl font-[600] text-primary mb-3">
                    {i + 1}. {section.title}
                  </h2>
                  <div className="h-px bg-champagne/30 mb-4" />
                  <p
                    className="font-sans text-warmgray leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </div>
              ))}
            </div>

            {/* Links to related legal pages */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4" data-aos="fade-up">
              <div className="p-6 glass-card rounded-2xl text-center">
                <h3 className="font-cormorant text-xl font-[600] text-primary mb-2">Privacy Policy</h3>
                <p className="font-sans text-sm text-warmgray mb-4">Learn how we handle your personal data.</p>
                <Link href="/privacy-policy" className="font-sans text-sm font-[600] text-accent hover:text-burgundy transition-colors">
                  Read Privacy Policy →
                </Link>
              </div>
              <div className="p-6 glass-card rounded-2xl text-center">
                <h3 className="font-cormorant text-xl font-[600] text-primary mb-2">Get In Touch</h3>
                <p className="font-sans text-sm text-warmgray mb-4">Questions about our terms? We're happy to explain.</p>
                <Link href="/contact" className="font-sans text-sm font-[600] text-accent hover:text-burgundy transition-colors">
                  Contact Us →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
