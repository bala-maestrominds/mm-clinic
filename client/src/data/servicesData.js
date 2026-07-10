// src/data/servicesData.js
export const servicesData = {
  // General Dentistry Services
  'teeth-cleaning': {
    id: 'teeth-cleaning',
    title: 'Teeth Cleaning',
    category: 'General Dentistry',
    icon: 'cleaning_services',
    price: '$85',
    duration: '45 mins',
    badge: 'Best Seller',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCR6ScyjJ26p4ZTiNccQzQveC4DEVy5oZIDq3XpDtPM8w2T2qR52DSF7h8XY299SGZOFofPawWSBTB0MGWWvpGh_zzF-HvyYdEN8bVaHmY0DHXkVHOGcnQ1ahuxFc60riaritnu0lkTunya5l9kksEJZaix23MJTK5q2XO9v2gSORuN8F2kWQCQVYkY08YtcflLhbF9mKc5Ez_huAWvx9GMjhpD0lHEvS7eDIbhmoMRO70qhqkc9C0e',
    description: 'Comprehensive scaling and polishing to maintain optimal oral hygiene and prevent gum disease.',
    longDescription: 'Our professional teeth cleaning service removes plaque, tartar, and stains that regular brushing can\'t reach. Using advanced ultrasonic scalers and hand instruments, we ensure a thorough clean while checking for any signs of decay or gum disease. Regular cleanings are essential for maintaining healthy teeth and gums.',
    benefits: [
      'Removes plaque and tartar buildup',
      'Prevents gum disease and cavities',
      'Brightens your smile by removing surface stains',
      'Early detection of dental issues',
      'Freshens breath'
    ],
    procedure: [
      'Oral examination and X-rays if needed',
      'Removal of plaque and tartar using ultrasonic scaler',
      'Professional polishing with special paste',
      'Flossing and final rinse',
      'Fluoride treatment (optional)'
    ],
    faqs: [
      {
        question: 'How often should I get my teeth cleaned?',
        answer: 'Most patients should have their teeth professionally cleaned every 6 months. However, your dentist may recommend more frequent visits if you have gum disease or other risk factors.'
      },
      {
        question: 'Does teeth cleaning hurt?',
        answer: 'Teeth cleaning is generally painless. Some patients may experience mild sensitivity, especially if there is significant tartar buildup. We use local anesthesia if needed for patient comfort.'
      }
    ],
    relatedServices: ['root-canal', 'comprehensive-exam']
  },
  'root-canal': {
    id: 'root-canal',
    title: 'Root Canal',
    category: 'General Dentistry',
    icon: 'healing',
    price: '$450',
    duration: '90 mins',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBx57cZR1HS_5x2bxh0Pjr_gAw41EHUmZjYImMYJvsVRvkC49jzCqhbllODnPbZmLhrrv68RgtlAhqC0TfZZQBAaTL2RJu8seeDAvlFHePiAOhalMrU05uIq3m2bivIJMz95_oBJjYw5Ezs1ZukF-o7ft5yrj2OQzb6GzWq-4_poY4sfnQ-WQ8XBbi7QMLzb09xkdG-Mr9VfpYVAqFUZSIBx2-JrhW8AXeMqqzYSvR4lTiyqJ0tZPPc',
    description: 'Pain-free therapy to save infected teeth and restore their functional structure with precision.',
    longDescription: 'Root canal treatment is a safe and effective procedure that saves infected or damaged teeth. We remove the infected pulp, clean and disinfect the root canal system, and seal it to prevent further infection. With modern techniques and anesthesia, the procedure is comfortable and pain-free.',
    benefits: [
      'Saves your natural tooth',
      'Relieves tooth pain and infection',
      'Prevents spread of infection to other teeth',
      'Restores normal chewing function',
      'Preserves your natural smile'
    ],
    procedure: [
      'Local anesthesia for comfort',
      'Removal of infected pulp tissue',
      'Cleaning and shaping of root canals',
      'Filling with biocompatible material',
      'Crown placement for protection'
    ],
    faqs: [
      {
        question: 'Is root canal treatment painful?',
        answer: 'With modern anesthesia and techniques, root canal treatment is no more painful than getting a filling. The procedure actually relieves pain caused by infection.'
      },
      {
        question: 'How long does a root canal last?',
        answer: 'With proper care, a root canal can last a lifetime. Regular checkups and good oral hygiene are essential for long-term success.'
      }
    ],
    relatedServices: ['teeth-cleaning', 'comprehensive-exam']
  },
  'comprehensive-exam': {
    id: 'comprehensive-exam',
    title: 'Comprehensive Exam',
    category: 'General Dentistry',
    icon: 'clinical_notes',
    price: '$95',
    duration: '30 mins',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
    description: 'Routine checkups, digital X-rays, and oral cancer screening for complete oral health monitoring.',
    longDescription: 'Our comprehensive dental examination goes beyond just checking for cavities. We perform a complete oral health assessment including digital X-rays, oral cancer screening, gum health evaluation, and bite analysis. This thorough approach helps detect issues early when they\'re most treatable.',
    benefits: [
      'Early detection of dental problems',
      'Prevention of serious conditions',
      'Customized treatment planning',
      'Oral cancer screening',
      'Peace of mind about your oral health'
    ],
    procedure: [
      'Medical history review',
      'Digital X-rays (if needed)',
      'Visual examination of teeth and gums',
      'Oral cancer screening',
      'Bite and jaw assessment',
      'Treatment recommendations'
    ],
    faqs: [
      {
        question: 'How often should I get a dental exam?',
        answer: 'We recommend a comprehensive exam every 6-12 months, depending on your oral health needs and risk factors.'
      },
      {
        question: 'Are digital X-rays safe?',
        answer: 'Yes, digital X-rays use up to 90% less radiation than traditional film X-rays. We take necessary precautions to ensure your safety.'
      }
    ],
    relatedServices: ['teeth-cleaning', 'emergency-visit']
  },
  'emergency-visit': {
    id: 'emergency-visit',
    title: 'Emergency Visit',
    category: 'General Dentistry',
    icon: 'emergency',
    price: '$150',
    duration: '45 mins',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
    description: 'Same-day relief for acute pain, broken teeth, or dental trauma when you need it most.',
    longDescription: 'Dental emergencies can be stressful and painful. Our emergency dental service provides immediate care for acute pain, broken teeth, knocked-out teeth, or other dental trauma. We prioritize emergency patients and offer same-day appointments to get you the relief you need quickly.',
    benefits: [
      'Immediate pain relief',
      'Same-day appointments',
      'Prevention of further damage',
      'Expert emergency care',
      'Peace of mind during emergencies'
    ],
    procedure: [
      'Immediate pain assessment',
      'Diagnostic imaging if needed',
      'Emergency treatment plan',
      'Pain management',
      'Follow-up care planning'
    ],
    faqs: [
      {
        question: 'What should I do if I knock out a tooth?',
        answer: 'Keep the tooth moist (in milk or saline), avoid touching the root, and come to our clinic immediately. Time is critical for saving knocked-out teeth.'
      },
      {
        question: 'Do you offer after-hours emergency care?',
        answer: 'Yes, we offer emergency appointments during business hours and have an on-call service for after-hours emergencies.'
      }
    ],
    relatedServices: ['comprehensive-exam', 'root-canal']
  },
  // Cosmetic Dentistry Services
  'teeth-whitening': {
    id: 'teeth-whitening',
    title: 'Teeth Whitening',
    category: 'Cosmetic Dentistry',
    icon: 'auto_fix_high',
    price: '$299',
    duration: '60 mins',
    badge: 'Popular',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7g5eHPtx_Do26_JZeREKY_DalmP5GjzrFZfGCf-JkPXP06cArVclQP1LePLMEw9Dr06O5JnonRQ3SQit_a3zWsx6VmkIhWKMkfcoigj-YSYbIhWHW8r0GLfknm9xqpwLfis0Wsn-umOGXq8dz-xhEqk3lcrydjC5gBMDgs7fdjHNjc3rWbUGd6sb9GgK-ED-_cUsCIWr7iTtLCLU-740YqXD9dzUw6q1Q_Cqm3tnuMF0uucJhIdnp',
    description: 'Advanced laser whitening technology that brightens your smile by several shades in just one visit.',
    longDescription: 'Transform your smile with our professional teeth whitening treatment. Using advanced light-activated technology, we can brighten your teeth by several shades in a single 60-minute session. This safe and effective treatment is perfect for removing years of staining from coffee, tea, wine, and aging.',
    benefits: [
      'Noticeably whiter teeth in one visit',
      'Safe and controlled professional treatment',
      'Long-lasting results with proper care',
      'Confidence-boosting smile transformation',
      'Customized to your desired shade'
    ],
    procedure: [
      'Initial shade assessment',
      'Gum and lip protection',
      'Application of whitening gel',
      'Activation with special light',
      'Multiple gel applications as needed',
      'Final shade comparison'
    ],
    faqs: [
      {
        question: 'How long does teeth whitening last?',
        answer: 'Results can last from 6 months to 2 years, depending on your diet and oral hygiene habits. Touch-up treatments can maintain results.'
      },
      {
        question: 'Will whitening damage my teeth?',
        answer: 'Professional whitening is safe when performed by a dental professional. We use products that are safe for tooth enamel and take precautions to protect your gums.'
      }
    ],
    relatedServices: ['veneer-placement', 'invisalign']
  },
  'invisalign': {
    id: 'invisalign',
    title: 'Invisalign',
    category: 'Cosmetic Dentistry',
    icon: 'straighten',
    price: '$2,500',
    duration: 'Flex Plan',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCxpZoPLftTgC7KqyCBMrBaSCWtZKf0wIdLDfDv_DECg3gr3wPHEsUTLdjwxMyS2LyJG5F4wAebyr3F6dtFOLd5C7tcwCDXDOafCW2dN9cZdgwcbkMRmXbIjztsCW05geMXB7JRnkcwmB4xpcncxWYG2yinChqb5y1ITr63fkdkBnqhEehaxmvNC0vp0yuZszxASw0R8leGO14dHX1zK1EBrQDs89Vp7rp9Cyo1Jb-jtu74-D3MnDH',
    description: 'Straighten your teeth discreetly with custom-made clear aligners for a perfect smile.',
    longDescription: 'Invisalign offers a modern, discreet alternative to traditional braces. Using a series of clear, custom-made aligners, we gradually straighten your teeth without the metal wires and brackets. The aligners are removable, comfortable, and virtually invisible, allowing you to achieve your perfect smile with minimal disruption to your lifestyle.',
    benefits: [
      'Virtually invisible treatment',
      'Removable for eating and brushing',
      'Comfortable with no metal brackets',
      'Predictable results with digital planning',
      'Fewer dental visits than traditional braces'
    ],
    procedure: [
      'Digital scanning and 3D imaging',
      'Custom treatment plan creation',
      'Series of aligners produced',
      'Regular checkups every 6-8 weeks',
      'Final results after completing treatment'
    ],
    faqs: [
      {
        question: 'How long does Invisalign treatment take?',
        answer: 'Treatment time varies from 6 to 18 months depending on the complexity of your case. Your dentist will provide a personalized timeline.'
      },
      {
        question: 'Can I eat normally with Invisalign?',
        answer: 'Yes, you can remove the aligners before eating, so there are no dietary restrictions. Just remember to brush before putting them back on.'
      }
    ],
    relatedServices: ['veneer-placement', 'teeth-whitening']
  },
  'veneer-placement': {
    id: 'veneer-placement',
    title: 'Porcelain Veneers',
    category: 'Cosmetic Dentistry',
    icon: 'auto_fix_high',
    price: '$1,200',
    duration: '120 mins',
    image: 'https://images.unsplash.com/photo-1593022356769-11f762e25ed9?auto=format&fit=crop&q=80&w=800',
    description: 'Custom-crafted shells for a perfect, natural-looking smile transformation and alignment.',
    longDescription: 'Porcelain veneers are thin, custom-made shells that cover the front surface of your teeth to improve appearance. They can correct discoloration, chips, gaps, and misalignment while providing a natural-looking, durable smile transformation. Each veneer is crafted to match your natural teeth perfectly.',
    benefits: [
      'Natural-looking smile transformation',
      'Stain-resistant porcelain material',
      'Corrects multiple cosmetic issues',
      'Durable and long-lasting',
      'Minimal tooth preparation'
    ],
    procedure: [
      'Initial consultation and design',
      'Tooth preparation and impressions',
      'Custom veneer fabrication',
      'Temporary veneers if needed',
      'Final veneer placement',
      'Adjustment and polishing'
    ],
    faqs: [
      {
        question: 'How long do porcelain veneers last?',
        answer: 'With proper care, porcelain veneers can last 10-15 years or more. Regular checkups and good oral hygiene are essential for longevity.'
      },
      {
        question: 'Are veneers reversible?',
        answer: 'Veneers typically require minimal enamel removal, making the procedure irreversible. Your dentist will discuss all options during consultation.'
      }
    ],
    relatedServices: ['teeth-whitening', 'invisalign']
  },
  // Restorative Dentistry Services
  'dental-implants': {
    id: 'dental-implants',
    title: 'Dental Implants',
    category: 'Restorative Dentistry',
    icon: 'settings_backup_restore',
    price: '$1,200',
    duration: '2-3 Visits',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhSB0s0crGI96-nwKFPcruCA8hUtHrS5PWyBi7useN_AkXQ7r523-h0E-hwSeBMotr6VNxtyW6vKJqOE_QPYFfK2oHIJg6Yjz-Dh3nxvJO6P4ic3GpgiH4cTpfUdDcGJBd7fqD_tHLNbCZEYBWhwPyjoPv6GkuFce42ceee9dnnnnNAafFDrVQGIpn-0tjhjDQSlWCkXnqSfAXVpiWqTqBtaONm-WOfpUKSrm4L2mYDTLxDcgTnH2M',
    description: 'Permanent solution for missing teeth that feels and looks completely natural.',
    longDescription: 'Dental implants are the gold standard for tooth replacement, providing a permanent, natural-looking solution for missing teeth. The implant consists of a titanium post that integrates with your jawbone, topped with a custom crown that matches your natural teeth. This solution restores full chewing function and prevents bone loss.',
    benefits: [
      'Permanent tooth replacement',
      'Preserves jawbone structure',
      'Natural look and feel',
      'Full chewing function restored',
      'Prevents shifting of adjacent teeth'
    ],
    procedure: [
      'Initial consultation and imaging',
      'Surgical placement of implant post',
      'Healing and integration period (3-6 months)',
      'Custom crown fabrication',
      'Crown placement and adjustment'
    ],
    faqs: [
      {
        question: 'Is dental implant surgery painful?',
        answer: 'The procedure is performed under local anesthesia and is generally comfortable. Most patients experience minimal discomfort during recovery.'
      },
      {
        question: 'How successful are dental implants?',
        answer: 'Dental implants have a success rate of over 95% when properly maintained. Regular checkups and good oral hygiene are key to long-term success.'
      }
    ],
    relatedServices: ['full-dentures', 'root-canal']
  },
  'full-dentures': {
    id: 'full-dentures',
    title: 'Full Dentures',
    category: 'Restorative Dentistry',
    icon: 'diversity_1',
    price: '$1,800',
    duration: '4 Weeks',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7C3_wdW4f9LmXbEwqiSgMvndR2PEFPACBoj9VVOTvnKjsj2LLtvElXm6_hiHjrcawA6g6j21M8R4HgFseNnoyqDm1caWSWfg9B1JaeczJHv4Y22g_ish9LWdFq9oYmOcV8f9-EBVH4FYujOtsqzKEUAQav_nA3Cr0j6udblYd5nxoXJs2ePPrrrBEVj9H1lwOCl2_cz5z26pAxa81xLPkfoDtqSAvMm44fMN8niP4LPkDd7dkeJJu',
    description: 'Complete smile restoration with custom-fitted dentures for comfort and natural look.',
    longDescription: 'Full dentures are a comprehensive solution for replacing all teeth in an arch. Our custom-fitted dentures are designed to provide optimal comfort, function, and aesthetics. Using advanced materials and precise fitting techniques, we create dentures that look natural and fit securely, restoring your smile and confidence.',
    benefits: [
      'Full smile restoration',
      'Custom-fitted for comfort',
      'Natural appearance',
      'Restored chewing ability',
      'Improved speech and confidence'
    ],
    procedure: [
      'Initial consultation and measurements',
      'Impressions and bite registration',
      'Try-in appointment for fit and aesthetics',
      'Final denture fabrication',
      'Placement and adjustments'
    ],
    faqs: [
      {
        question: 'How long does it take to get used to dentures?',
        answer: 'It typically takes 2-4 weeks to adjust to new dentures. During this time, you may experience minor speech and eating adjustments.'
      },
      {
        question: 'Can I sleep with my dentures in?',
        answer: 'It\'s recommended to remove your dentures at night to allow your gums to rest and maintain oral health.'
      }
    ],
    relatedServices: ['dental-implants', 'root-canal']
  }
};

// Get all services as an array
export const getAllServices = () => {
  return Object.values(servicesData);
};

// Get services by category
export const getServicesByCategory = (category) => {
  return Object.values(servicesData).filter(service => service.category === category);
};

// Get service by ID
export const getServiceById = (id) => {
  return servicesData[id] || null;
};

// Get related services
export const getRelatedServices = (serviceId) => {
  const service = getServiceById(serviceId);
  if (!service || !service.relatedServices) return [];
  return service.relatedServices.map(id => getServiceById(id)).filter(Boolean);
};