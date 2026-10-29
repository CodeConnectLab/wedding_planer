'use client';

import { usePathname } from 'next/navigation';
import { FaWhatsapp } from 'react-icons/fa';
import useSiteConfig from '@/components/useSiteConfig';
import { whatsappHref } from '@/lib/siteDefaults';

// Floating "chat on WhatsApp" button — the number comes from the admin site settings.
export default function WhatsAppButton() {
  const pathname = usePathname();
  const { settings } = useSiteConfig();

  if (!settings.whatsappNumber || pathname?.startsWith('/admin')) return null;

  return (
    <a
      href={whatsappHref(settings.whatsappNumber, "Hi WAH Momentz, I'd like to plan my wedding with you.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-[150] flex items-center gap-2 rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] pl-4 pr-5 py-3 hover:scale-105 transition-transform duration-300"
    >
      <FaWhatsapp className="text-2xl" />
      <span className="hidden sm:inline font-sans text-sm font-[600]">Chat with us</span>
    </a>
  );
}
