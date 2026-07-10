import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — WAH Momentz',
  description: 'How WAH Momentz collects, uses, and protects your personal information.',
};

const sections = [
  {
    title: 'Information We Collect',
    content: `We collect information you provide directly to us, including:<br/><br/>
      <strong>Contact and Enquiry Information:</strong> Name, email address, phone number, wedding date, venue, guest count, budget, and any other details you submit via our enquiry or contact forms.<br/><br/>
      <strong>Account Information:</strong> If you create an account (for returning clients or event portals), we collect your login credentials and preferences.<br/><br/>
      <strong>Communications:</strong> Records of correspondence — emails, WhatsApp messages, meeting notes — exchanged between you and WAH Momentz in the course of planning your event.<br/><br/>
      <strong>Usage Data:</strong> We automatically collect standard server log information, browser type, referring URLs, and pages visited on our website via analytics tools (Google Analytics). This data is anonymised and used solely to improve our website experience.`,
  },
  {
    title: 'How We Use Your Information',
    content: `We use the information we collect to:<br/><br/>
      <ul class="list-disc list-inside space-y-2 text-warmgray">
        <li>Respond to your enquiries and provide our wedding planning services</li>
        <li>Prepare and send proposals, contracts, and invoices</li>
        <li>Coordinate with vendors, venues, and suppliers on your behalf</li>
        <li>Send you updates, reminders, and information relevant to your wedding</li>
        <li>Improve our website and service quality</li>
        <li>Comply with our legal and regulatory obligations</li>
        <li>Send occasional marketing communications (only with your consent; you may opt out at any time)</li>
      </ul>`,
  },
  {
    title: 'Sharing Your Information',
    content: `We do not sell your personal information to third parties. We share your information only in the following circumstances:<br/><br/>
      <strong>Service Vendors:</strong> We share necessary details (names, dates, venue information) with vendors working on your event — photographers, caterers, decorators, entertainment providers — solely to deliver your wedding services.<br/><br/>
      <strong>Legal Compliance:</strong> We may disclose information when required by law, court order, or to protect our legal rights.<br/><br/>
      <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction, with equivalent privacy protections maintained.`,
  },
  {
    title: 'Photography and Testimonials',
    content: `With your permission, we may use photographs and videos from your wedding on our website, social media, and marketing materials to showcase our portfolio. We always ask for explicit consent before doing so. We may also request testimonials — participation is entirely voluntary. If you consented but later change your mind, please contact us and we will remove your content promptly.`,
  },
  {
    title: 'Data Security',
    content: `We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. These include encrypted data storage, restricted access controls, and secure communication practices. While we strive to protect your data, no internet transmission is completely secure — please contact us immediately if you suspect any security issue.`,
  },
  {
    title: 'Data Retention',
    content: `We retain your personal information for as long as necessary to provide our services and fulfil the purposes described in this policy, or as required by law. Client data related to completed events is typically retained for 7 years for accounting and legal compliance purposes, then securely deleted.`,
  },
  {
    title: 'Cookies',
    content: `Our website uses cookies to improve your browsing experience. Essential cookies are required for the website to function. Analytics cookies (which you may opt out of) help us understand how visitors use our site. You can control cookie settings via your browser. Blocking certain cookies may affect your experience on our site.`,
  },
  {
    title: 'Your Rights',
    content: `You have the right to:<br/><br/>
      <ul class="list-disc list-inside space-y-2 text-warmgray">
        <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
        <li><strong>Correction:</strong> Request that we correct inaccurate or incomplete information</li>
        <li><strong>Deletion:</strong> Request deletion of your personal information (subject to our legal retention obligations)</li>
        <li><strong>Restriction:</strong> Request that we limit processing of your data in certain circumstances</li>
        <li><strong>Portability:</strong> Request a machine-readable copy of your data</li>
        <li><strong>Object:</strong> Object to processing of your data for direct marketing purposes</li>
      </ul><br/>
      To exercise any of these rights, please contact us at <a href="mailto:wahmomentz@gmail.com" class="text-accent hover:text-burgundy transition-colors">wahmomentz@gmail.com</a>.`,
  },
  {
    title: 'Third-Party Links',
    content: `Our website may contain links to third-party websites (such as venue websites or social media platforms). We are not responsible for the privacy practices of those sites. We encourage you to review their privacy policies before providing any personal information.`,
  },
  {
    title: 'Children\'s Privacy',
    content: `Our services are intended for adults (18 years and older). We do not knowingly collect personal information from minors. If you believe we have inadvertently collected information from a person under 18, please contact us immediately.`,
  },
  {
    title: 'Changes to This Policy',
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of significant changes by posting the updated policy on our website with a new effective date. Your continued use of our website or services after the update constitutes acceptance of the revised policy.`,
  },
  {
    title: 'Contact Us',
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:<br/><br/>
      <strong>WAH Momentz</strong><br/>
      Email: <a href="mailto:wahmomentz@gmail.com" class="text-accent hover:text-burgundy transition-colors">wahmomentz@gmail.com</a><br/>
      Phone: <a href="tel:+919891106761" class="text-accent hover:text-burgundy transition-colors">+91 98911 06761</a><br/>
      New Delhi, India`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 bg-ivory min-h-screen">
        {/* Hero */}
        <section className="py-16 bg-primary text-center">
          <div className="container-custom">
            <div className="eyebrow text-champagne/70 mb-4">Legal</div>
            <h1 className="font-cormorant text-5xl sm:text-6xl font-[300] italic text-white mb-4">
              Privacy <span className="font-[600] not-italic text-champagne">Policy</span>
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
                At WAH Momentz, we respect your privacy and are committed to protecting
                the personal information you share with us. This Privacy Policy explains how we collect, use,
                store, and protect your data when you use our website or engage our services. Please read
                this policy carefully.
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
                  <div
                    className="font-sans text-warmgray leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </div>
              ))}
            </div>

            {/* Links */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4" data-aos="fade-up">
              <div className="p-6 glass-card rounded-2xl text-center">
                <h3 className="font-cormorant text-xl font-[600] text-primary mb-2">Terms &amp; Conditions</h3>
                <p className="font-sans text-sm text-warmgray mb-4">Our service terms and policies.</p>
                <Link href="/terms" className="font-sans text-sm font-[600] text-accent hover:text-burgundy transition-colors">
                  Read Terms →
                </Link>
              </div>
              <div className="p-6 glass-card rounded-2xl text-center">
                <h3 className="font-cormorant text-xl font-[600] text-primary mb-2">Get In Touch</h3>
                <p className="font-sans text-sm text-warmgray mb-4">Privacy concerns? We're here to help.</p>
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
