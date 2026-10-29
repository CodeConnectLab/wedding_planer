/**
 * Uploads the curated Indian-wedding stock photography (Unsplash License — free for
 * commercial use) to Cloudinary under `wahmomentz/site/<key>` and writes the resulting
 * secure URLs to lib/site-images.json, which both the website and the seed script read.
 *
 * Idempotent: images already in Cloudinary are reused, not re-uploaded.
 *
 *   node scripts/upload-site-images.js
 */
require('dotenv').config({ quiet: true });
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const FOLDER = 'wahmomentz/site';
const OUT = path.join(__dirname, '..', 'lib', 'site-images.json');

// key -> Unsplash photo id
const IMAGES = {
  // Hero / wide
  'hero-palace-couple': '1756190564669-215843660e93',
  'hero-mandap': '1587271636175-90d58cdad458',
  'hero-grand-decor': '1708606811579-23b18fc48007',
  'hero-udaipur-night': '1623851293886-e9b3618ae902',
  'hero-mehndi': '1505932794465-147d1f1b2c97',

  // Couples & portraits
  'couple-fairy-lights': '1722952934708-749c22eb2e58',
  'couple-celebration': '1722952908609-4b57e23da1ee',
  'couple-embrace': '1722952908667-f4883b8e6df6',
  'couple-palace-night': '1665960213530-3fb10da1f25e',
  'couple-safa': '1733759414886-6b3a5423ceb3',
  'couple-woods': '1735052712464-9d24b69be5f5',
  'couple-river': '1630526720753-aa4e71acf67d',
  'couple-sikh': '1776085760267-e69edc53bc1f',
  'couple-traditional': '1665960213508-48f07086d49c',
  'couple-newlywed': '1775566417313-e57b7c47716c',
  'couple-canopy': '1727430256509-0f897d6f4765',
  'couple-sherwani': '1599462616558-2b75fd26a283',
  'couple-night': '1611106211090-8f3c79eb8552',
  'couple-decor-seated': '1744804298612-fa9f2ef0e125',
  'couple-stage': '1722953544597-57a8ba8eed44',
  'couple-varmala': '1744804298431-57953e4eaba0',
  'bride-portrait': '1684868268327-7e5590bcfbd6',
  'bride-lehenga': '1654764746225-e63f5e90facd',
  'bride-smile': '1587271315307-eaebc181c749',
  'bride-red': '1610173827043-9db50e0d8ef9',
  'bride-veil': '1600685890506-593fdf55949b',
  'bride-golden': '1610047614301-13c63f00c032',
  'bride-south': '1617627143750-d86bc21e42bb',
  'groom-sherwani': '1759906766080-82b785c61f51',
  'baraat-dance': '1728221052130-810b42a6130e',
  'baraat-carriage': '1781077128735-ee92e7377d78',
  'baraat-horse': '1779252596336-fdf65812ba09',
  'punjabi-groomsmen': '1743757452117-936ea69be6af',

  // Rituals
  'ritual-hands': '1597157639073-69284dc0fdaf',
  'ritual-ballroom': '1587271407850-8d438ca9fdf2',
  'haldi-ceremony': '1681717166573-f71589207785',
  'haldi-bride': '1681717075175-19feb7a6f664',
  'haldi-decor': '1698460918119-7359a8a945a0',
  'sangeet-ladies': '1587012521796-6359d3678f2a',
  'mehndi-closeup': '1730003873829-09b4b16444c1',
  'mehndi-couple-hands': '1621801306185-8c0ccf9c8eb8',
  'mehndi-marigold': '1771992226177-759e116e72f4',
  'mehndi-arm': '1525135850648-b42365991054',

  // Décor
  'decor-floral-stage': '1745573673416-66e829644ae9',
  'decor-mehndi-setup': '1744891471118-f74c0453cd21',
  'decor-outdoor-mehndi': '1744891470493-44321ef136a2',
  'decor-reception-stage': '1601482441062-b9f13131f33a',
  'decor-chandelier-lawn': '1773745060497-4cc1df774c72',
  'decor-aisle': '1772127822552-ce9ef537bdcf',
  'decor-outdoor-setup': '1772127822562-a898d9f5733c',
  'decor-reception-canopy': '1772127822525-7eda37383b9f',
  'decor-marigold-garlands': '1789971649652-ae5dfeeaa7b4',
  'decor-hanging': '1589463349208-95817c91f971',
  'decor-attire-florals': '1783188223242-07c15cabbf18',
  'marigolds': '1765087910207-c3942f93714a',

  // Venues & destinations
  'venue-udaipur-palace': '1589901164570-f9de6556e1c1',
  'venue-lake-palace': '1633702738734-443da2c18f3c',
  'venue-lake-palace-night': '1690708186073-17037cd66467',
  'venue-udaipur-golden': '1695956353120-54ce5e91632b',
  'venue-jal-mahal': '1661924326425-c14a6426d989',
  'venue-jaipur-city-palace': '1667099639128-4b10f464f4a2',
  'venue-hawa-mahal': '1477587458883-47145ed94245',
  'venue-kerala': '1593693411515-c20261bcad6e',
  'venue-kerala-river': '1602216056096-3b40cc0c9944',
  'venue-goa': '1614082242765-7c98ca0f3df3',
  'venue-goa-sunset': '1507525428034-b723cf961d3e',
  'honeymoon-maldives': '1514282401047-d79a71a590e8',
  'honeymoon-beach': '1602002418816-5c0aeef426aa',
  'honeymoon-sunset': '1544473243-618f55d06792',

  // Catering
  'catering-thali': '1742281257687-092746ad6021',
  'catering-thalis': '1742281257707-0c7f7e5ca9c6',
  'catering-platter': '1742281258189-3b933879867a',
  'catering-cuisines': '1559561724-732dbca7be1e',
  'catering-silver-thali': '1589778655375-3e622a9fc91c',

  // Events & celebrations
  'event-corporate': '1730134322176-862f1cf9bc9f',
  'event-corporate-stage': '1617405169156-4cf26e70605c',
  'event-fashion': '1543728069-a3f97c5a2f32',
  'event-fashion-runway': '1762430815537-e140755eedf9',
  'event-gala': '1768396855390-0728fa9c21e1',
  'event-gala-dinner': '1768508950719-4d76978fdf44',
  'event-awards': '1764874298962-ac0c84307fc0',
  'event-conference': '1587825140708-dfaf72ae4b04',
  'event-conference-panel': '1582192730841-2a682d7375f9',
  'event-expo': '1775314054195-85f31de0c944',
  'party-sparklers': '1758523981337-7508dda01c3f',
  'party-sparklers-beach': '1758523981722-357d0a1e0ef0',
  'party-toast': '1699730164892-d7c433524ff3',
  'party-confetti': '1699730185428-d11054059c7f',
  'anniversary-dinner': '1536392706976-e486e2ba97af',
  'anniversary-table': '1740120424442-ccd013ec9581',
  'invitation-suite': '1758825178518-ca48833a6c57',
  'invitation-cards': '1738898179451-b5fc497f9f8e',
};

async function existing(publicId) {
  try {
    return await cloudinary.api.resource(publicId);
  } catch {
    return null;
  }
}

async function uploadOne(key, unsplashId) {
  const publicId = `${FOLDER}/${key}`;
  const found = await existing(publicId);
  if (found) return found.secure_url;

  const source = `https://images.unsplash.com/photo-${unsplashId}?w=2400&q=85&fm=jpg`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await cloudinary.uploader.upload(source, {
        public_id: key,
        folder: FOLDER,
        overwrite: false,
        resource_type: 'image',
        tags: ['wahmomentz', 'site'],
      });
      return res.secure_url;
    } catch (err) {
      if (attempt === 3) throw err;
      await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }
}

(async () => {
  if (!process.env.CLOUDINARY_CLOUD_NAME) throw new Error('CLOUDINARY_* env vars missing');
  const out = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
  const failed = [];
  for (const [key, id] of Object.entries(IMAGES)) {
    try {
      out[key] = await uploadOne(key, id);
      console.log('✓', key);
    } catch (err) {
      failed.push(key);
      console.error('✗', key, err.message || err.error?.message || err);
    }
  }
  const sorted = Object.fromEntries(Object.keys(out).sort().map((k) => [k, out[k]]));
  fs.writeFileSync(OUT, JSON.stringify(sorted, null, 2) + '\n');
  console.log(`\nWrote ${Object.keys(sorted).length} URLs to ${OUT}`);
  if (failed.length) {
    console.error('Failed:', failed.join(', '));
    process.exit(1);
  }
})();
