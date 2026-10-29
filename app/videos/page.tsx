import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VideoSection from '@/components/VideoSection';

export const metadata = {
  title: 'Wedding Films — WAH Momentz',
  description: 'Watch wedding films, highlight reels and couple stories from celebrations planned by WAH Momentz across India.',
  keywords: 'Indian wedding films, wedding highlight video, destination wedding video, WAH Momentz videos',
};

export default function VideosPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="bg-primary text-white py-20">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Weddings
              <span className="block text-champagne mt-2">In Motion</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Relive the colour, music and emotion of the celebrations we have planned — from haldi mornings
              to grand palace receptions.
            </p>
          </div>
        </section>

        {/* Video Section */}
        <VideoSection 
          title="Wedding Films & Highlights"
          subtitle="Stories, rituals and celebrations captured by our film partners"
          showCategories={true}
          maxVideos={12}
        />

        {/* CTA Section */}
        <section className="py-20 bg-accent text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Own Success Story?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let&apos;s create something extraordinary together. Your dream wedding is just a conversation away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center bg-white text-accent px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl"
              >
                Get Free Consultation
              </a>
              <a
                href="/gallery"
                className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-accent transition-all duration-300"
              >
                View Our Portfolio
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}