import { Router } from 'express';
import { SystemSetting } from '../models/SystemSetting.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = Router();
const FESTIVAL_WISH_SETTING_KEY = 'festival_wish';
const FESTIVAL_PRESETS_SETTING_KEY = 'festival_presets';

export const DEFAULT_FESTIVAL_PRESETS = {
  freedom: {
    festivalKey: 'freedom',
    occasion: 'FREEDOM DAY (15th August)',
    title: '🇮🇳 Happy Independence Day from IT HUNT!',
    tagline: 'Freedom to Learn, Code & Innovate for a Digital India',
    message: 'On this Independence Day, celebrate true freedom by mastering next-generation software technologies. Build production-level MERN, AI, and mobile apps with 1-on-1 industry mentorship.',
    specialOffer: '🇮🇳 Freedom Tech Scholarship: Up to 25% Fee Waiver on All Advanced Batches!',
    ctaText: 'Claim Freedom Scholarship 🚀',
    ctaAction: 'admission',
    theme: 'freedom',
    locationScope: 'All Locations & Campuses (Holagarh, Prayagraj & Online)',
    isActive: true
  },
  diwali: {
    festivalKey: 'diwali',
    occasion: 'DIWALI (Festival of Lights)',
    title: '🪔 Shubh Deepawali & Happy Diwali from IT HUNT!',
    tagline: 'Illuminating Your Career with Knowledge, Code & Technology',
    message: 'May the divine light of Diwali illuminate your future with endless career opportunities, technical mastery, and good fortune. Wishing all our students, interns, and partners a joyful and prosperous celebration!',
    specialOffer: '🪔 Diwali Special: Free Certification Voucher & Up to 20% Course Discount!',
    ctaText: 'Explore Courses & Batches 🪔',
    ctaAction: 'courses',
    theme: 'diwali',
    locationScope: 'All Locations & Campuses (Holagarh, Prayagraj & Online)',
    isActive: true
  },
  republic: {
    festivalKey: 'republic',
    occasion: 'REPUBLIC DAY (26th January)',
    title: '🇮🇳 Happy Republic Day from IT HUNT!',
    tagline: 'Empowering India’s Future Software Engineers & Builders',
    message: 'Saluting the spirit of the Constitution of India! We are committed to building tech self-reliance through top-grade computer science education, NIELIT diplomas, and software craftsmanship.',
    specialOffer: '🇮🇳 Republic Day Special: Complimentary Industry Aptitude & Career Kit',
    ctaText: 'Apply for Next Batch ➜',
    ctaAction: 'admission',
    theme: 'republic',
    locationScope: 'All Locations & Campuses (Holagarh, Prayagraj & Online)',
    isActive: true
  },
  holi: {
    festivalKey: 'holi',
    occasion: 'HOLI (Festival of Colors)',
    title: '🎨 Happy Holi from IT HUNT SoftTech!',
    tagline: 'Splash Vibrant Colors into Your Tech Career',
    message: 'Wishing you and your loved ones a joyful, safe, and colorful Holi! May your journey ahead be enriched with the vibrant colors of innovation, problem-solving, and continuous learning.',
    specialOffer: '🎨 Holi Bonanza: Flat ₹2,000 Off on Full-Stack MERN & Python Internships!',
    ctaText: 'Explore Internship Tracks ➜',
    ctaAction: 'internships',
    theme: 'holi',
    locationScope: 'All Locations & Campuses (Holagarh, Prayagraj & Online)',
    isActive: true
  },
  eid: {
    festivalKey: 'eid',
    occasion: 'EID MUBARAK (Blessed Celebration)',
    title: '🌙 Eid Mubarak from IT HUNT!',
    tagline: 'Wishing Peace, Prosperity & Technical Excellence',
    message: 'May this blessed occasion shower happiness, peace, and abundance upon you and your family. Elevate your technical journey with our accredited software and computer courses.',
    specialOffer: '🌙 Festive Gift: Free Access to Web Development Foundations Toolkit',
    ctaText: 'Enroll Online Today 🚀',
    ctaAction: 'admission',
    theme: 'eid',
    locationScope: 'All Locations & Campuses (Holagarh, Prayagraj & Online)',
    isActive: true
  },
  newyear: {
    festivalKey: 'newyear',
    occasion: 'NEW YEAR 2026',
    title: '🎆 Happy New Year 2026 from IT HUNT!',
    tagline: 'A New Year of Breakthrough Growth & High-Tech Careers',
    message: 'Welcome 2026! Make this year the turning point of your career by building real-world software, AI products, and apps. Join our 100% placement-assisted batches.',
    specialOffer: '🎆 New Year Resolution: Guaranteed 1-on-1 Mentorship & Placement Sprint!',
    ctaText: 'Apply for 2026 Batch 🚀',
    ctaAction: 'admission',
    theme: 'newyear',
    locationScope: 'All Locations & Campuses (Holagarh, Prayagraj & Online)',
    isActive: true
  },
  custom: {
    festivalKey: 'custom',
    occasion: 'SPECIAL CELEBRATION',
    title: '🎉 Warm Festive Wishes from IT HUNT!',
    tagline: 'Celebrating Knowledge, Innovation & Progress',
    message: 'Sending heartfelt greetings and best wishes to our students, faculty, and tech community. Unlock your full potential with IT HUNT Software Solutions & Academy.',
    specialOffer: '🎁 Limited-Period Special Offer Available for New Enrollments!',
    ctaText: 'Explore Opportunities 🚀',
    ctaAction: 'admission',
    theme: 'custom',
    locationScope: 'All Locations & Campuses (Holagarh, Prayagraj & Online)',
    isActive: true
  }
};

export const AVAILABLE_LOCATION_SCOPES = [
  'All Locations & Campuses (Holagarh, Prayagraj & Online)',
  'Holagarh Prayagraj Campus',
  'Prayagraj Main Tech Studio',
  'Online / Remote Students Only'
];

/**
 * GET /api/festival-wish
 * Public endpoint: Fetches current active festival settings and presets dynamically from MongoDB Atlas
 */
router.get('/', async (req, res) => {
  try {
    const [wishSetting, presetsSetting] = await Promise.all([
      SystemSetting.findOne({ key: FESTIVAL_WISH_SETTING_KEY }).lean().catch(() => null),
      SystemSetting.findOne({ key: FESTIVAL_PRESETS_SETTING_KEY }).lean().catch(() => null)
    ]);

    const activeWish = wishSetting?.value || DEFAULT_FESTIVAL_PRESETS.diwali;
    const presets = {
      ...DEFAULT_FESTIVAL_PRESETS,
      ...(presetsSetting?.value || {})
    };

    return res.json({
      success: true,
      data: {
        ...activeWish,
        locationScope: activeWish.locationScope || AVAILABLE_LOCATION_SCOPES[0]
      },
      presets,
      locationScopes: AVAILABLE_LOCATION_SCOPES
    });
  } catch (error) {
    console.error('[API] Error loading festival wish:', error.message);
    return res.status(200).json({
      success: true,
      data: DEFAULT_FESTIVAL_PRESETS.diwali,
      presets: DEFAULT_FESTIVAL_PRESETS,
      locationScopes: AVAILABLE_LOCATION_SCOPES,
      fallback: true
    });
  }
});

/**
 * PUT/POST /api/festival-wish
 * Updates active festival wish in database dynamically across all locations
 */
const updateFestivalWishHandler = async (req, res) => {
  try {
    const body = req.body || {};
    if (!body || typeof body !== 'object') {
      return res.status(400).json({ success: false, message: 'Invalid festival wish payload.' });
    }

    const normalizedWish = {
      festivalKey: String(body.festivalKey || 'custom').trim(),
      occasion: String(body.occasion || 'CELEBRATION').trim(),
      title: String(body.title || 'Festive Wishes from IT HUNT!').trim(),
      tagline: String(body.tagline || '').trim(),
      message: String(body.message || '').trim(),
      specialOffer: String(body.specialOffer || '').trim(),
      ctaText: String(body.ctaText || 'Explore Courses 🚀').trim(),
      ctaAction: String(body.ctaAction || 'admission').trim(),
      theme: String(body.theme || 'diwali').trim(),
      locationScope: String(body.locationScope || AVAILABLE_LOCATION_SCOPES[0]).trim(),
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
      startDate: body.startDate || null,
      endDate: body.endDate || null,
      updatedAt: new Date().toISOString()
    };

    const setting = await SystemSetting.findOneAndUpdate(
      { key: FESTIVAL_WISH_SETTING_KEY },
      { $set: { value: normalizedWish } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).lean();

    return res.json({
      success: true,
      message: 'Festival wish dynamically saved and live across all locations!',
      data: setting.value
    });
  } catch (error) {
    console.error('[API] Error saving festival wish:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

router.put('/', verifyToken, requireAdmin, updateFestivalWishHandler);
router.post('/', verifyToken, requireAdmin, updateFestivalWishHandler);

/**
 * GET /api/festival-wish/presets
 * Returns all dynamic festival presets
 */
router.get('/presets', async (req, res) => {
  try {
    const setting = await SystemSetting.findOne({ key: FESTIVAL_PRESETS_SETTING_KEY }).lean().catch(() => null);
    const presets = {
      ...DEFAULT_FESTIVAL_PRESETS,
      ...(setting?.value || {})
    };
    return res.json({ success: true, data: presets });
  } catch (error) {
    return res.json({ success: true, data: DEFAULT_FESTIVAL_PRESETS, fallback: true });
  }
});

/**
 * PUT/POST /api/festival-wish/presets
 * Saves or updates dynamic festival presets list
 */
const updatePresetsHandler = async (req, res) => {
  try {
    const presets = req.body?.presets || req.body;
    if (!presets || typeof presets !== 'object') {
      return res.status(400).json({ success: false, message: 'Valid presets dictionary is required.' });
    }

    const mergedPresets = {
      ...DEFAULT_FESTIVAL_PRESETS,
      ...presets
    };

    const setting = await SystemSetting.findOneAndUpdate(
      { key: FESTIVAL_PRESETS_SETTING_KEY },
      { $set: { value: mergedPresets } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).lean();

    return res.json({
      success: true,
      message: 'Festival presets successfully saved to database.',
      data: setting.value
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

router.put('/presets', verifyToken, requireAdmin, updatePresetsHandler);
router.post('/presets', verifyToken, requireAdmin, updatePresetsHandler);

export default router;
