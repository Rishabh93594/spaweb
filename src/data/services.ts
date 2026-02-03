
export interface Service {
  id: string;
  name: string;
  price: number;
  duration?: string; // string mainly because some have "with consultation" or ranges in potential future
  description?: string;
  category: string;
  isPackage?: boolean;
}

export const servicesData: Service[] = [
  // --- Massage Therapy & Bodywork ---
  { id: 'post-op-lymphatic', name: 'Post-Op Lymphatic Drainage', price: 200.00, duration: '90 min', category: 'Massage Therapy & Bodywork', description: 'with consultation' },
  { id: 'post-op-lymphatic-package', name: 'Post-Op Lymphatic Drainage (10-Package)', price: 1550.00, category: 'Massage Therapy & Bodywork', isPackage: true },
  { id: 'lymphatic-consultation', name: 'Lymphatic Drainage & Consultation', price: 175.00, duration: '60 min', category: 'Massage Therapy & Bodywork' },
  { id: 'swedish-massage', name: 'Swedish Massage', price: 175.00, duration: '60 min', category: 'Massage Therapy & Bodywork' },
  { id: 'asian-massage', name: 'Asian Massage', price: 150.00, category: 'Massage Therapy & Bodywork', description: 'Price upon request' }, // No price listed in prompt
  { id: 'bamboo-massage', name: 'Bamboo Massage', price: 150.00, duration: '60 min', category: 'Massage Therapy & Bodywork' },
  { id: 'deep-tissue', name: 'Deep Tissue Massage', price: 200.00, duration: '60 min', category: 'Massage Therapy & Bodywork' },
  { id: 'feather-touch', name: 'Feather Touch Massage', price: 150.00, category: 'Massage Therapy & Bodywork' },
  { id: 'acupuncture', name: 'Acupuncture', price: 125.00, duration: '60 min', category: 'Massage Therapy & Bodywork' },
  { id: 'acupressure', name: 'Acupressure', price: 75.00, duration: '60 min', category: 'Massage Therapy & Bodywork' },
  { id: 'reflexology', name: 'Reflexology', price: 150.00, duration: '60 min', category: 'Massage Therapy & Bodywork' },

  // --- Facial & Advanced Skincare ---
  { id: 'express-facials', name: 'Express Facials', price: 155.00, category: 'Facial & Advanced Skincare', description: 'Monday–Wednesday only' },
  { id: 'signature-facial', name: 'Signature Facial Anti-Aging', price: 155.00, category: 'Facial & Advanced Skincare' },
  { id: 'facial-peels', name: 'Facial Peels', price: 125.00, category: 'Facial & Advanced Skincare', description: 'Consultation' },
  { id: 'vita-c-facial', name: 'Vita-C Facial', price: 160.00, category: 'Facial & Advanced Skincare' },
  { id: 'photo-facial', name: 'Photo Facial', price: 175.00, category: 'Facial & Advanced Skincare' },
  { id: 'pearl-mineral', name: 'Pearl Mineral Brightening & Hydration', price: 155.00, category: 'Facial & Advanced Skincare' },
  { id: 'enhanced-derma', name: 'Enhanced Derma Facial', price: 160.00, category: 'Facial & Advanced Skincare', description: 'Plump & hydrate instantly' },
  { id: 'microneedling', name: 'Microneedling', price: 150.00, category: 'Facial & Advanced Skincare', description: 'Consultation & Session' },
  { id: 'hydro-facial', name: 'Hydro Facial', price: 200.00, category: 'Facial & Advanced Skincare', description: 'Consultation & Treatment' },
  { id: 'microdermabrasion', name: 'Microdermabrasion', price: 150.00, category: 'Facial & Advanced Skincare', description: 'Consultation & Session' },
  { id: 'face', name: 'Face', price: 200.00, category: 'Facial & Advanced Skincare' },
  { id: 'skin-resurfacing', name: 'Skin Resurfacing', price: 150.00, category: 'Facial & Advanced Skincare', description: 'Next level exfoliation' },

  // --- Laser Treatments ---
  { id: 'laser-tag-small', name: 'Laser Skin Tag Removal - Small Area', price: 175.00, category: 'Laser Treatments' },
  { id: 'laser-tag-large', name: 'Laser Skin Tag Removal - Large Area', price: 250.00, category: 'Laser Treatments' },
  { id: 'scars-small', name: 'Scars - Small', price: 175.00, category: 'Laser Treatments' },
  { id: 'scars-large', name: 'Scars - Large', price: 250.00, category: 'Laser Treatments' },
  { id: 'stretch-marks-small', name: 'Stretch Marks - Small Area', price: 350.00, category: 'Laser Treatments' },
  { id: 'stretch-marks-large', name: 'Stretch Marks - Large Area', price: 550.00, category: 'Laser Treatments' },

  // --- Injectables & Medical ---
  { id: 'botox', name: 'Botox', price: 8.00, category: 'Injectables & Medical', description: 'per unit' },
  { id: 'injection-glp1', name: 'Injection: GLP-1 / Insulin', price: 150.00, category: 'Injectables & Medical' },
  { id: 'juvederm', name: 'Juvederm', price: 6.00, category: 'Injectables & Medical', description: 'per unit' },
  { id: 'restylane', name: 'Restylane', price: 6.00, category: 'Injectables & Medical', description: 'per unit' },
  { id: 'lemon-drop', name: 'Lemon Drop', price: 125.00, category: 'Injectables & Medical', description: 'per treatment' },
  { id: 'kybella', name: 'Kybella', price: 6.00, category: 'Injectables & Medical', description: 'per unit' },
  { id: 'teeth-whitening', name: 'Teeth Whitening', price: 550.00, category: 'Injectables & Medical', description: '3 sessions' },

  // --- Body Wraps, Scrubs & Detox Therapies ---
  { id: 'seaweed', name: 'Seaweed', price: 160.00, category: 'Body Wraps, Scrubs & Detox' },
  { id: 'shea-butter', name: 'Shea Butter', price: 150.00, category: 'Body Wraps, Scrubs & Detox' },
  { id: 'marine-body-wrap', name: 'Marine Body Wrap', price: 150.00, category: 'Body Wraps, Scrubs & Detox' },
  { id: 'chocolate-detox', name: 'Chocolate Detox', price: 200.00, category: 'Body Wraps, Scrubs & Detox' },
  { id: 'post-radiation-clay', name: 'Post-Radiation TX Clay Wrap', price: 250.00, category: 'Body Wraps, Scrubs & Detox' },
  { id: 'colonic-detox', name: 'Colonic Detox Series', price: 650.00, category: 'Body Wraps, Scrubs & Detox' },
  { id: 't-consultation', name: 'T-Consultation', price: 50.00, category: 'Body Wraps, Scrubs & Detox' },
  { id: 'weight-loss-wraps', name: 'Weight Loss Body Wraps', price: 550.00, category: 'Body Wraps, Scrubs & Detox', description: '10 Package' },
  { id: 'wellness-functional', name: 'Wellness / Functional Medicine', price: 200.00, category: 'Body Wraps, Scrubs & Detox' },
  { id: 'weight-loss-holistic', name: 'Weight Loss & Holistic Care', price: 200.00, category: 'Body Wraps, Scrubs & Detox' },

  // --- Body Contouring & Aesthetics ---
  { id: 'body-contouring', name: 'Body Contouring', price: 350.00, category: 'Body Contouring & Aesthetics', description: 'with consultation' },
  { id: 'non-surgical-face-lift', name: 'Non-Surgical Face Lift', price: 3500.00, category: 'Body Contouring & Aesthetics', description: '10 sessions' },
  { id: 'non-surgical-butt-lift', name: 'Non-Surgical Butt Lift', price: 3500.00, category: 'Body Contouring & Aesthetics', description: '10 sessions' },
  { id: 'laser-hair-removal', name: 'Laser Hair Removal', price: 100.00, category: 'Body Contouring & Aesthetics' },


];

export const addOns: Service[] = [
  // --- Additional Services ---
  { id: 'sauna-bed-small', name: 'Sauna Bed - Small Session', price: 150.00, category: 'Additional Services' },
  { id: 'sauna-bed-large', name: 'Sauna Bed - Large Session', price: 350.00, category: 'Additional Services' },
  { id: 'add-facial', name: 'Facial', price: 75.00, category: 'Additional Services' },
  { id: 'red-light', name: 'Red Light Therapies', price: 50.00, category: 'Additional Services' },
  { id: 'detox-foot-bath', name: 'Detox Foot Bath', price: 65.00, category: 'Additional Services' },
  { id: 'foot-detox-30', name: '30-minute Foot Detox', price: 45.00, category: 'Additional Services' },
  { id: 'swedish-30', name: '30-minute Swedish Massage', price: 85.00, category: 'Additional Services' },
  { id: 'aromatherapy', name: 'Aromatherapy', price: 30.00, category: 'Additional Services' },
  { id: 'hot-stones', name: 'Hot Stones', price: 30.00, category: 'Additional Services' },
];

export const categories = [
  'Massage Therapy & Bodywork',
  'Facial & Advanced Skincare',
  'Laser Treatments',
  'Injectables & Medical',
  'Body Wraps, Scrubs & Detox', // Shortened for UI if needed
  'Body Contouring & Aesthetics',
  'Additional Services'
];
