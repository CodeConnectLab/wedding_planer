const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

// ── Schemas ───────────────────────────────────────────────────────────────────

const categorySchema = new mongoose.Schema({ name: String, slug: String });

const projectSchema = new mongoose.Schema({
  title: String, slug: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  images: [String], description: String, location: String,
  clientName: String, year: Number,
  brideName: String, groomName: String, weddingDate: Date,
  venue: String, weddingStyle: String, guestCount: Number,
  isFeatured: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true },
  createdAt: Date,
});

const sliderSchema = new mongoose.Schema({
  image: String, title: String, subtitle: String, order: Number,
});

const testimonialSchema = new mongoose.Schema({
  name: String, text: String, image: String,
  rating: { type: Number, default: 5 },
  serviceType: { type: String, default: 'Wedding Planning' },
  isPublished: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
});

const faqSchema = new mongoose.Schema({
  question: String, answer: String,
  category: { type: String, default: 'General' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
});

const serviceSchema = new mongoose.Schema({
  title: String, description: String, features: [String],
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  icon: String, slug: String,
});

const themeSchema = new mongoose.Schema({
  primaryColor: { type: String, default: '#1C1410' },
  secondaryColor: { type: String, default: '#FDF6EE' },
  accentColor: { type: String, default: '#C9A96E' },
  roseColor: { type: String, default: '#C0737A' },
  burgundyColor: { type: String, default: '#7B2D42' },
  champagneColor: { type: String, default: '#EDD9A3' },
  ivoryColor: { type: String, default: '#FFFCF5' },
  isActive: { type: Boolean, default: true },
});

const footerSchema = new mongoose.Schema({
  companyName: String, companyDescription: String, logo: String,
  phone: String, email: String, address: String,
  facebookUrl: String, instagramUrl: String, linkedinUrl: String,
  youtubeUrl: String, pinterestUrl: String, whatsappNumber: String,
  copyrightText: String,
});

const adminSchema = new mongoose.Schema({ email: String, password: String });

const Category  = mongoose.models.Category  || mongoose.model('Category', categorySchema);
const Project   = mongoose.models.Project   || mongoose.model('Project', projectSchema);
const Slider    = mongoose.models.Slider    || mongoose.model('Slider', sliderSchema);
const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);
const FAQ       = mongoose.models.FAQ       || mongoose.model('FAQ', faqSchema);
const Service   = mongoose.models.Service   || mongoose.model('Service', serviceSchema);
const ThemeSettings = mongoose.models.ThemeSettings || mongoose.model('ThemeSettings', themeSchema);
const FooterSettings = mongoose.models.FooterSettings || mongoose.model('FooterSettings', footerSchema);
const Admin     = mongoose.models.Admin     || mongoose.model('Admin', adminSchema);

// ── Seed ─────────────────────────────────────────────────────────────────────

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear
    await Promise.all([
      Category.deleteMany({}), Project.deleteMany({}),
      Slider.deleteMany({}), Testimonial.deleteMany({}),
      FAQ.deleteMany({}), Service.deleteMany({}),
      ThemeSettings.deleteMany({}), FooterSettings.deleteMany({}),
      Admin.deleteMany({}),
    ]);
    console.log('🗑️  Cleared existing data');

    // ── Categories (wedding styles) ───────────────────────────────────────
    const categories = await Category.insertMany([
      { name: 'Royal Heritage', slug: 'royal-heritage' },
      { name: 'Destination Wedding', slug: 'destination-wedding' },
      { name: 'Garden Wedding', slug: 'garden-wedding' },
      { name: 'Modern Luxury', slug: 'modern-luxury' },
      { name: 'Intimate Ceremony', slug: 'intimate-ceremony' },
      { name: 'Beach Wedding', slug: 'beach-wedding' },
    ]);
    console.log('📁 Created categories');

    // ── Wedding Portfolio ─────────────────────────────────────────────────
    const weddings = [
      {
        title: 'A Royal Udaipur Affair', slug: 'royal-udaipur-affair',
        clientName: 'Ananya & Vikram Mehta', brideName: 'Ananya', groomName: 'Vikram',
        location: 'Udaipur, Rajasthan', venue: 'Taj Lake Palace', year: 2024,
        weddingStyle: 'Royal Heritage', guestCount: 350, isFeatured: true,
        images: [
          'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
        ],
        description: 'An opulent 3-day royal wedding at Taj Lake Palace with handcrafted floral installations, traditional Rajput ceremonies, and a magnificent reception on the lake.',
        category: categories[0]._id,
      },
      {
        title: 'Garden Enchantment in Bangalore', slug: 'garden-enchantment-bangalore',
        clientName: 'Priya & Arjun Kapoor', brideName: 'Priya', groomName: 'Arjun',
        location: 'Bangalore, Karnataka', venue: 'The Leela Palace', year: 2024,
        weddingStyle: 'Garden Wedding', guestCount: 200, isFeatured: true,
        images: [
          'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop',
        ],
        description: 'A romantic garden wedding with cascading florals, candlelit pathways, and an intimate ceremony under a custom floral canopy.',
        category: categories[2]._id,
      },
      {
        title: 'Goa Shores — A Beach Romance', slug: 'goa-beach-romance',
        clientName: 'Meera & Rohit Sharma', brideName: 'Meera', groomName: 'Rohit',
        location: 'Goa', venue: 'The Lalit Resort', year: 2024,
        weddingStyle: 'Beach Wedding', guestCount: 150, isFeatured: true,
        images: [
          'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=800&h=600&fit=crop',
        ],
        description: 'A sun-kissed beach wedding at sunset with shell-adorned mandap, barefoot ceremony, and a reception under fairy lights on the sand.',
        category: categories[5]._id,
      },
      {
        title: 'Palace of Dreams — Jaipur', slug: 'palace-of-dreams-jaipur',
        clientName: 'Kavya & Siddharth Nair', brideName: 'Kavya', groomName: 'Siddharth',
        location: 'Jaipur, Rajasthan', venue: 'Rambagh Palace', year: 2023,
        weddingStyle: 'Royal Heritage', guestCount: 500, isFeatured: true,
        images: [
          'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop',
        ],
        description: 'A grand 4-day celebration at the iconic Rambagh Palace — elephant processions, classical performances, and 5 distinct function themes.',
        category: categories[0]._id,
      },
      {
        title: 'Kerala Backwaters Romance', slug: 'kerala-backwaters-romance',
        clientName: 'Nisha & Pranav Menon', brideName: 'Nisha', groomName: 'Pranav',
        location: 'Alleppey, Kerala', venue: 'Kumarakom Lake Resort', year: 2023,
        weddingStyle: 'Destination Wedding', guestCount: 120, isFeatured: false,
        images: [
          'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
        ],
        description: 'An intimate Kerala-style wedding on a houseboat with traditional pookalam, kathakali performances, and a Sadhya feast for guests.',
        category: categories[1]._id,
      },
      {
        title: 'Heritage Haveli — Jodhpur', slug: 'heritage-haveli-jodhpur',
        clientName: 'Deepa & Rahul Gupta', brideName: 'Deepa', groomName: 'Rahul',
        location: 'Jodhpur, Rajasthan', venue: 'Umaid Bhawan Palace', year: 2022,
        weddingStyle: 'Royal Heritage', guestCount: 280, isFeatured: false,
        images: [
          'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop',
        ],
        description: 'A spectacular heritage wedding at Umaid Bhawan with blue city views, royal Rajput rituals, and an unforgettable baraat procession.',
        category: categories[0]._id,
      },
    ];

    for (const w of weddings) {
      await Project.create({ ...w, createdAt: new Date() });
    }
    console.log('💍 Created wedding portfolio');

    // ── Hero Slider ───────────────────────────────────────────────────────
    await Slider.insertMany([
      {
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop',
        title: 'Where Love Stories Become Legends',
        subtitle: "India's premier luxury wedding planning studio — crafting emotionally rich, visually stunning celebrations tailored to your unique love story.",
        order: 1,
      },
      {
        image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&h=1080&fit=crop',
        title: 'Royal Ceremonies, Timeless Memories',
        subtitle: 'From palace weddings in Udaipur to beach ceremonies in Goa — we create the celebration of your dreams.',
        order: 2,
      },
      {
        image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1920&h=1080&fit=crop',
        title: 'Every Detail, Perfectly Crafted',
        subtitle: 'Our team of 40+ specialists brings unparalleled attention to every element of your celebration.',
        order: 3,
      },
    ]);
    console.log('🎠 Created hero slider');

    // ── Testimonials ──────────────────────────────────────────────────────
    await Testimonial.insertMany([
      { name: 'Ananya & Vikram Mehta', text: 'WAH Momentz transformed our wedding into a fairy tale. Every detail was beyond what we could have imagined — the floral mandap, the lighting, the timing of every moment. Our guests still talk about it.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face', rating: 5, serviceType: 'Destination Wedding — Udaipur', isFeatured: true, order: 1 },
      { name: 'Priya & Arjun Kapoor', text: 'We had been dreaming of a Goa beach wedding for years. The team made it effortless — handling everything from vendor coordination to guest logistics while we simply enjoyed every precious moment.', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face', rating: 5, serviceType: 'Beach Wedding — Goa', isFeatured: true, order: 2 },
      { name: 'Kavya & Siddharth Nair', text: 'The décor team created something so beautiful I cried the moment I walked in. They understood our vision perfectly and delivered something even more special than we had imagined.', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=face', rating: 5, serviceType: 'Wedding Décor — Delhi', isFeatured: true, order: 3 },
      { name: 'Meera & Rahul Sharma', text: 'From our first consultation call to the final farewell at the reception, WAH Momentz was thoughtful, professional, and genuinely invested in making our day perfect.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face', rating: 5, serviceType: 'Full Wedding Planning — Jaipur', isFeatured: true, order: 4 },
    ]);
    console.log('⭐ Created testimonials');

    // ── FAQs ──────────────────────────────────────────────────────────────
    await FAQ.insertMany([
      { question: 'How far in advance should we book WAH Momentz?', answer: 'We recommend booking at least 12–18 months in advance for destination weddings and 8–12 months for local weddings. Popular dates (especially winter and spring) fill quickly. That said, we do accommodate shorter timelines — reach out and we\'ll see what\'s possible.', category: 'Planning', order: 1 },
      { question: 'What services are included in full wedding planning?', answer: 'Our full planning package covers everything from initial concept and design to vendor selection, budget management, timeline creation, guest management, décor coordination, and on-day execution. We essentially become your dedicated wedding team from day one to the final farewell.', category: 'Services', order: 2 },
      { question: 'Do you plan destination weddings outside India?', answer: 'Yes! We have successfully planned weddings in Bali, Tuscany, Dubai, Thailand, Sri Lanka, Maldives, and several European destinations. We have a curated network of trusted local vendors in 15+ countries.', category: 'Destination', order: 3 },
      { question: 'How does your pricing work?', answer: 'Our pricing is customised based on the scope of your wedding, number of guests, destination, and services required. We offer full planning packages, partial planning (for couples who need support with specific elements), and day-of coordination. Contact us for a personalised quote.', category: 'Pricing', order: 4 },
      { question: 'Can you work with a specific budget?', answer: 'Absolutely. We work across a range of budgets and will always be transparent about what is achievable. We\'re skilled at maximising impact within budget constraints without compromising on elegance or quality.', category: 'Pricing', order: 5 },
      { question: 'Do you handle both Hindu and other community weddings?', answer: 'Yes — our team has extensive experience with Hindu, Muslim, Christian, Sikh, and inter-faith weddings, as well as destination weddings that blend multiple traditions. We deeply respect every cultural nuance and work with your family and priests/clergy closely.', category: 'Planning', order: 6 },
    ]);
    console.log('❓ Created FAQs');

    // ── Services ──────────────────────────────────────────────────────────
    await Service.insertMany([
      { title: 'Full Wedding Planning', description: 'Comprehensive end-to-end management from concept to execution, covering every aspect of your wedding journey.', features: ['Concept development', 'Vendor management', 'Budget planning', 'Timeline creation', 'Guest management', 'On-day coordination'], order: 1, slug: 'full-wedding-planning', icon: '💍' },
      { title: 'Destination Weddings', description: 'Seamlessly curated destination weddings across India and 15+ international locations.', features: ['Venue selection', 'Travel coordination', 'Legal documentation', 'International vendor network', 'Guest logistics', 'Local expertise'], order: 2, slug: 'destination-weddings', icon: '✈️' },
      { title: 'Wedding Décor & Design', description: 'Award-winning décor team creating breathtaking visual environments for your celebration.', features: ['Floral artistry', 'Lighting design', 'Mandap design', 'Stage design', 'Themed installations', 'Table styling'], order: 3, slug: 'wedding-decor', icon: '🌸' },
      { title: 'Photography & Cinematography', description: 'Artistic photographers and cinematic filmmakers who capture every precious moment.', features: ['Pre-wedding shoots', 'Wedding day coverage', 'Drone videography', 'Same-day edit', 'Fine art albums', 'Online gallery'], order: 4, slug: 'photography', icon: '📸' },
      { title: 'Catering Excellence', description: 'Curated culinary experiences spanning regional Indian and international cuisines.', features: ['Multi-cuisine menus', 'Live cooking stations', 'Bar management', 'Dietary accommodations', 'Styled presentation', 'Custom cakes'], order: 5, slug: 'catering', icon: '🍽️' },
      { title: 'Mehndi & Bridal Beauty', description: 'Award-winning mehndi artists and bridal beauty teams for the bride and her party.', features: ['Bridal mehndi', 'Bridesmaids mehndi', 'Bridal makeup', 'Hairstyling', 'Trial sessions', 'Skin prep consultation'], order: 6, slug: 'mehndi', icon: '🌿' },
    ]);
    console.log('🎯 Created services');

    // ── Theme Settings ────────────────────────────────────────────────────
    await ThemeSettings.create({
      primaryColor: '#1C1410',
      secondaryColor: '#FDF6EE',
      accentColor: '#C9A96E',
      roseColor: '#C0737A',
      burgundyColor: '#7B2D42',
      champagneColor: '#EDD9A3',
      ivoryColor: '#FFFCF5',
      isActive: true,
    });
    console.log('🎨 Created theme settings');

    // ── Footer Settings ───────────────────────────────────────────────────
    await FooterSettings.create({
      companyName: 'WAH Momentz',
      companyDescription: "India's premier luxury wedding planning studio. We craft bespoke celebrations that honour your love story — from intimate ceremonies to grand royal weddings.",
      logo: '/logo.svg',
      phone: '+91 98911 06761',
      email: 'wahmomentz@gmail.com',
      address: 'H5-16, Sector 11, Rohini\nNew Delhi — 110085',
      facebookUrl: 'https://facebook.com/wahmomentz',
      instagramUrl: 'https://instagram.com/wahmomentz',
      linkedinUrl: 'https://linkedin.com/company/wahmomentz',
      youtubeUrl: 'https://youtube.com/@wahmomentz',
      pinterestUrl: 'https://pinterest.com/wahmomentz',
      whatsappNumber: '919891106761',
      copyrightText: 'WAH Momentz. All Rights Reserved.',
    });
    console.log('🦶 Created footer settings');

    // ── Admin User ────────────────────────────────────────────────────────
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await Admin.create({ email: 'admin@wahmomentz.com', password: hashedPassword });
    console.log('👤 Created admin user');
    console.log('   Email:    admin@wahmomentz.com');
    console.log('   Password: admin123');

    console.log('\n🎉 Wedding seed completed successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();
