// src/data/servicesData.js

export const servicesData = {
  // --- General Services ---
  'routine-cleaning': {
    id: 'routine-cleaning',
    title: 'Routine Cleaning',
    category: 'General',
    icon: 'cleaning_services',
    price: '₹80',
    duration: '30 mins',
    badge: 'Best Seller',
    image: "https://static.wixstatic.com/media/9a1060_c43adc1c5146496fa6a0ef01fa8ea31a~mv2.jpg/v1/fill/w_2500,h_1875,al_c/9a1060_c43adc1c5146496fa6a0ef01fa8ea31a~mv2.jpg",
    description: 'Standard cleaning and dental examination.',
    longDescription: 'Routine cleaning removes plaque, tartar, and helps prevent gum disease. Our professional teeth cleaning service removes plaque and stains that regular brushing can\'t reach, ensuring a thorough clean while maintaining optimal oral hygiene.',
    benefits: [
      'Removes plaque and tartar buildup',
      'Prevents gum disease and cavities',
      'Brightens your smile by removing surface stains',
      'Early detection of potential dental issues',
      'Freshens breath'
    ],
    procedure: [
      'Oral examination and physical checkup',
      'Removal of plaque and tartar using scaled instruments',
      'Professional polishing with specialized toothpaste',
      'Expert flossing and rinsing'
    ],
    faqs: [
      {
        question: 'How often should I get a routine cleaning?',
        answer: 'Most patients should have their teeth professionally cleaned every 6 months to maintain optimal oral health.'
      },
      {
        question: 'Does routine cleaning hurt?',
        answer: 'It is generally painless. You might feel a mild scraping sensation, which is completely normal.'
      }
    ],
    relatedServices: ['dental-filling', 'deep-teeth-cleaning']
  },
  'dental-crown': {
    id: 'dental-crown',
    title: 'Dental Crown',
    category: 'General',
    icon: 'shield',
    price: '₹650',
    duration: '75 mins',
    image: "https://images.squarespace-cdn.com/content/v1/5d41bc8e7e87f900017bbb3d/1565367144976-02VOCDND0CH34D5NX5T6/Comprehensive+Exam.jpg",
    description: 'Restore damaged teeth with durable crowns.',
    longDescription: 'Custom ceramic crowns restore strength, function, and appearance. They cap a damaged or decayed tooth to safeguard its structural integrity long-term.',
    benefits: [
      'Restores broken or severely decayed teeth',
      'Matches your natural teeth color seamlessly',
      'Provides exceptional durability and chewing strength',
      'Protects structural vulnerabilities after root canals'
    ],
    procedure: [
      'Tooth reshaping and preparation',
      'Digital scanning or physical impressions',
      'Temporary crown placement',
      'Final placement and permanent bonding of the custom crown'
    ],
    faqs: [
      {
        question: 'How long do dental crowns last?',
        answer: 'Typically between 10 to 15 years, depending on your oral hygiene habits and structural wear.'
      }
    ],
    relatedServices: ['root-canal-treatment', 'dental-filling']
  },
  'braces-consultation': {
    id: 'braces-consultation',
    title: 'Braces Consultation',
    category: 'General',
    icon: 'analytics',
    price: '₹100',
    duration: '40 mins',
    image: "https://uploads-ssl.webflow.com/61e7a911958c1d7dfe2a57d8/63774122ddc4bf0af2aad078_Invisalign%20Trays.jpg",
    description: 'Comprehensive orthodontic assessment.',
    longDescription: 'Consultation to evaluate bite alignment and recommend treatment options. Includes diagnostic imaging to structure an efficient, customized alignment framework.',
    benefits: [
      'Comprehensive spatial evaluation of alignment layout',
      'Tailored tracking layout blueprint options',
      'Clear baseline pricing and timeline breakdowns'
    ],
    procedure: [
      'Visual examination of jaw alignment',
      'Orthodontic structural X-rays',
      'Customized alignment plan overview mapping timeline adjustments'
    ],
    faqs: [
      {
        question: 'Am I too old for traditional braces?',
        answer: 'Not at all! Orthodontic treatments are highly effective for patients of all ages, including adults.'
      }
    ],
    relatedServices: ['invisalign', 'routine-cleaning']
  },
  'pediatric-dental-checkup': {
    id: 'pediatric-dental-checkup',
    title: 'Pediatric Dental Checkup',
    category: 'General',
    icon: 'child_care',
    price: '₹90',
    duration: '30 mins',
    image: "https://static.wixstatic.com/media/9a1060_c43adc1c5146496fa6a0ef01fa8ea31a~mv2.jpg/v1/fill/w_2500,h_1875,al_c/9a1060_c43adc1c5146496fa6a0ef01fa8ea31a~mv2.jpg",
    description: 'Comprehensive dental care for children.',
    longDescription: 'Routine dental examination, cleaning, and preventive treatments for children designed to foster highly comfortable early structural checkups.',
    benefits: [
      'Tracks development mapping of growing teeth structures',
      'Gentle preventive care techniques minimizing future cavities',
      'Fosters early healthy oral hygiene behavior habits'
    ],
    procedure: [
      'Tear-free behavioral pacing assessment',
      'Gentle scaling and polishing treatment',
      'Fluoride varnish treatment for enamel protection'
    ],
    faqs: [
      {
        question: 'When should a child have their first dental visit?',
        answer: 'By their first birthday, or within 6 months after their first primary tooth cuts through the gums.'
      }
    ],
    relatedServices: ['routine-cleaning', 'dental-filling']
  },
  'deep-teeth-cleaning': {
    id: 'deep-teeth-cleaning',
    title: 'Deep Teeth Cleaning',
    category: 'General',
    icon: 'layers',
    price: '₹350',
    duration: '60 mins',
    image: "https://static.wixstatic.com/media/9a1060_c43adc1c5146496fa6a0ef01fa8ea31a~mv2.jpg/v1/fill/w_2500,h_1875,al_c/9a1060_c43adc1c5146496fa6a0ef01fa8ea31a~mv2.jpg",
    description: 'Advanced cleaning for healthier gums.',
    longDescription: 'Deep scaling and root planing to treat gum disease and maintain oral health. Targets complex calculus configurations hidden beneath the gum pockets.',
    benefits: [
      'Arrests the progression of aggressive periodontal disease',
      'Reduces heavy pocket depth levels around vulnerable roots',
      'Eliminates persistent bad breath sources'
    ],
    procedure: [
      'Local numbing options applied for continuous comfort',
      'Advanced root scaling to remove subgingival plaque',
      'Root planing to smooth structural root surfaces'
    ],
    faqs: [
      {
        question: 'How does this differ from a regular routine cleaning?',
        answer: 'Routine cleanings focus on surfaces above the gumline. Deep cleaning explicitly targets structures beneath the gumline to cure advancing infections.'
      }
    ],
    relatedServices: ['routine-cleaning', 'dental-filling']
  },
  'dental-filling': {
    id: 'dental-filling',
    title: 'Dental Filling',
    category: 'General',
    icon: 'texture',
    price: '₹120',
    duration: '40 mins',
    image: "https://images.squarespace-cdn.com/content/v1/5d41bc8e7e87f900017bbb3d/1565367144976-02VOCDND0CH34D5NX5T6/Comprehensive+Exam.jpg",
    description: 'Repair cavities using tooth-colored fillings.',
    longDescription: 'Composite fillings restore decayed teeth while maintaining a natural appearance, utilizing precise minimally invasive drill protocols.',
    benefits: [
      'Stops active decay configurations dead in their tracks',
      'Composite materials blend seamlessly with your natural enamel',
      'Preserves the maximum possible natural tooth framework'
    ],
    procedure: [
      'Localized anesthesia protection',
      'Targeted removal of structural decay properties',
      'Layered filling application cured via specialized light integration'
    ],
    faqs: [
      {
        question: 'Can I eat immediately after a composite filling?',
        answer: 'Yes! Since composite fillings are completely cured instantly using light technology, you can safely eat right after your appointment.'
      }
    ],
    relatedServices: ['routine-cleaning', 'dental-crown']
  },

  // --- Cosmetic Services ---
  'teeth-whitening': {
    id: 'teeth-whitening',
    title: 'Teeth Whitening',
    category: 'Cosmetic',
    icon: 'auto_fix_high',
    price: '₹250',
    duration: '45 mins',
    badge: 'Popular',
    image: "https://www.fashionabc.org/wp-content/uploads/2025/04/Professional-Teeth-Whitening-Before-And-After-Expectations.jpg",
    description: 'Professional in-office whitening for a brighter smile.',
    longDescription: 'Professional whitening treatment that removes stains and brightens teeth by several shades, combining medical-grade gels with state-of-the-art brightness upgrades.',
    benefits: [
      'Noticeably brighter shades achieved in under an hour',
      'Safely monitored and controlled application barriers',
      'Lifts heavy years of clinical staining configurations'
    ],
    procedure: [
      'Enamel shade mapping comparison baseline',
      'Protective lip and gum gel barrier layout',
      'Whitening gel application activated by specialized light frequencies'
    ],
    faqs: [
      {
        question: 'Will this process make my teeth sensitive?',
        answer: 'Minor temporary sensitivity can sometimes surface, fading entirely within 24 to 48 hours.'
      }
    ],
    relatedServices: ['dental-veneers', 'smile-makeover-consultation']
  },
  'dental-veneers': {
    id: 'dental-veneers',
    title: 'Dental Veneers',
    category: 'Cosmetic',
    icon: 'auto_fix_normal',
    price: '₹900',
    duration: '120 mins',
    image: "https://images.unsplash.com/photo-1593022356769-11f762e25ed9?auto=format&fit=crop&q=80&w=800",
    description: 'Transform your smile with porcelain veneers.',
    longDescription: 'Thin porcelain shells placed over teeth for a beautiful smile makeover. Perfect for correcting heavy discoloration, gaps, alignment flaws, and chips.',
    benefits: [
      'Delivers custom, permanent smile transformations',
      'Highly resistant to coffee, wine, and general food staining',
      'Conceals deep spatial structural cosmetic blemishes'
    ],
    procedure: [
      'Minimal-prep tooth enamel micro-shaping',
      'High-resolution structural impressions captured',
      'Custom placement and permanent bonding of durable porcelain shells'
    ],
    faqs: [
      {
        question: 'Are porcelain veneers permanent?',
        answer: 'Yes, because a microscopic layer of enamel is prepared to guarantee a seamless flush fit, the treatment layout is permanent.'
      }
    ],
    relatedServices: ['teeth-whitening', 'smile-makeover-consultation']
  },
  'invisalign': {
    id: 'invisalign',
    title: 'Invisalign',
    category: 'Cosmetic',
    icon: 'straighten',
    price: '₹2800',
    duration: '60 mins',
    image: "https://uploads-ssl.webflow.com/61e7a911958c1d7dfe2a57d8/63774122ddc4bf0af2aad078_Invisalign%20Trays.jpg",
    description: 'Clear aligners for teeth straightening.',
    longDescription: 'Custom clear aligners designed to gradually straighten teeth via progressive digital mapping pathways, preserving aesthetics without metal infrastructure constraints.',
    benefits: [
      'Completely clear, virtually unnoticeable aesthetic profile',
      'Easily removable for stress-free eating and cleaning routines',
      'Fewer emergency appointments compared to metal wires'
    ],
    procedure: [
      '3D structural digital mapping scans captured',
      'Personalized aligner sequence fabrication tracking',
      'Delivery of initial custom alignment structural trays'
    ],
    faqs: [
      {
        question: 'How long do I need to wear the trays daily?',
        answer: 'For optimal transformation velocity, trays must remain in place for 20 to 22 hours each day.'
      }
    ],
    relatedServices: ['braces-consultation', 'teeth-whitening']
  },
  'smile-makeover-consultation': {
    id: 'smile-makeover-consultation',
    title: 'Smile Makeover Consultation',
    category: 'Cosmetic',
    icon: 'face',
    price: '₹150',
    duration: '45 mins',
    image: "https://tse3.mm.bing.net/th/id/OIP.eFUhiQMnAPLekpEIvjvnPgHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    description: 'Personalized smile enhancement consultation.',
    longDescription: 'Comprehensive consultation to create a customized cosmetic dentistry treatment plan matching composite upgrades, whitening, and veneers to structural facial frameworks.',
    benefits: [
      'Customized aesthetic layout visualization previews',
      'Tailored tracking layout blueprint options',
      'Coordinated multiphase cosmetic scheduling layouts'
    ],
    procedure: [
      'High-resolution cosmetic photography diagnostics',
      'Facial profile matching analysis mapping structural layout options',
      'Complete personalized financial roadmap proposal review'
    ],
    faqs: [
      {
        question: 'Can I combine veneers with whitening?',
        answer: 'Absolutely. We regularly whiten surrounding teeth first to perfectly match custom porcelain structures to your brightest smile configuration.'
      }
    ],
    relatedServices: ['dental-veneers', 'teeth-whitening']
  },

  // --- Surgical Services ---
  'dental-implants': {
    id: 'dental-implants',
    title: 'Dental Implants',
    category: 'Surgical',
    icon: 'settings_backup_restore',
    price: '₹1200',
    duration: '90 mins',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhSB0s0crGI96-nwKFPcruCA8hUtHrS5PWyBi7useN_AkXQ7r523-h0E-hwSeBMotr6VNxtyW6vKJqOE_QPYFfK2oHIJg6Yjz-Dh3nxvJO6P4ic3GpgiH4cTpfUdDcGJBd7fqD_tHLNbCZEYBWhwPyjoPv6GkuFce42ceee9dnnnnNAafFDrVQGIpn-0tjhjDQSlWCkXnqSfAXVpiWqTqBtaONm-WOfpUKSrm4L2mYDTLxDcgTnH2M",
    description: 'Permanent tooth replacement with a natural look and feel.',
    longDescription: 'Titanium dental implants that replace missing teeth with a strong, natural-looking solution. Anchors durable titanium frameworks securely into the jaw structure to guard against bone degradation.',
    benefits: [
      'Establishes a lifetime permanent framework tooth replacement',
      'Prevents structural jawbone bone loss configurations',
      'Restores 100% full chewing performance capabilities'
    ],
    procedure: [
      'Advanced bone density architectural imaging evaluation',
      'Surgical precision anchoring of the titanium implant anchor',
      'Abutment integration and custom ceramic crown restoration'
    ],
    faqs: [
      {
        question: 'How long does the whole implant framework process take?',
        answer: 'It normally spans 3 to 6 months to allow the titanium post to fully integrate with the bone structure before final crown placement.'
      }
    ],
    relatedServices: ['dental-crown', 'tooth-extraction']
  },
  'root-canal-treatment': {
    id: 'root-canal-treatment',
    title: 'Root Canal Treatment',
    category: 'Surgical',
    icon: 'healing',
    price: '₹450',
    duration: '90 mins',
    image: "https://tse3.mm.bing.net/th/id/OIP.7F-ILk3WjCKXZnoOGmTnvQHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    description: 'Save infected teeth without extraction.',
    longDescription: 'Removes infected pulp, disinfects canals, and restores the tooth utilizing precise micro-dentistry systems to intercept agonizing structural configurations.',
    benefits: [
      'Safeguards your natural structural tooth framework',
      'Instantly halts agonizing dental pain loops',
      'Blocks deeper systemic infections from moving through jaw zones'
    ],
    procedure: [
      'Targeted local numbing blocks deployed',
      'Microscopic extraction of corrupted inner nerve networks',
      'Biocompatible configuration sealing and preparation for structural crowning'
    ],
    faqs: [
      {
        question: 'Will a root canal kill the tooth completely?',
        answer: 'It removes the internal nerve supply so the tooth no longer feels hot/cold sensations, but the structural anchoring links to your jaw remain active and healthy.'
      }
    ],
    relatedServices: ['dental-crown', 'routine-cleaning']
  },
  'tooth-extraction': {
    id: 'tooth-extraction',
    title: 'Tooth Extraction',
    category: 'Surgical',
    icon: 'remove_circle',
    price: '₹200',
    duration: '45 mins',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7C3_wdW4f9LmXbEwqiSgMvndR2PEFPACBoj9VVOTvnKjsj2LLtvElXm6_hiHjrcawA6g6j21M8R4HgFseNnoyqDm1caWSWfg9B1JaeczJHv4Y22g_ish9LWdFq9oYmOcV8f9-EBVH4FYujOtsqzKEUAQav_nA3Cr0j6udblYd5nxoXJs2ePPrrrBEVj9H1lwOCl2_cz5z26pAxa81xLPkfoDtqSAvMm44fMN8niP4LPkDd7dkeJJu",
    description: 'Safe removal of damaged or impacted teeth.',
    longDescription: 'Simple and surgical tooth extraction procedures with local anesthesia to smoothly extract compromised structural elements while maintaining absolute comfort.',
    benefits: [
      'Instantly relieves pain radiating from non-restorable dental damage',
      'Precludes advanced dangerous infections from mutating adjacent bone layouts',
      'Creates space for necessary orthodontic structural alignment maps'
    ],
    procedure: [
      'Comprehensive root x-ray spatial alignment review',
      'Targeted local nerve desensitization blocking',
      'Gentle luxation and clean structural removal of the tooth system'
    ],
    faqs: [
      {
        question: 'What is the standard structural recovery timeline?',
        answer: 'Initial healing finishes within 7 to 10 days. We provide comprehensive post-care details to prevent dry-socket complications.'
      }
    ],
    relatedServices: ['dental-implants', 'emergency-dental-care']
  },
  'emergency-dental-care': {
    id: 'emergency-dental-care',
    title: 'Emergency Dental Care',
    category: 'Surgical',
    icon: 'emergency',
    price: '₹180',
    duration: '60 mins',
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
    description: 'Immediate treatment for dental emergencies.',
    longDescription: 'Emergency care for severe tooth pain, broken teeth, infections, and trauma, supplying prompt stabilization and gentle immediate management choices.',
    benefits: [
      'Immediate access to pain suppression protocols',
      'Fast action limits extensive structural jaw trajectory damage',
      'Same-day priority allocation openings for crisis scenarios'
    ],
    procedure: [
      'Instant clinical crisis diagnostic tracking scans',
      'Immediate localized structural stabilization treatments',
      'Post-crisis continuous healing structural strategy blueprints'
    ],
    faqs: [
      {
        question: 'What parameters constitute an explicit dental emergency?',
        answer: 'Uncontrollable structural bleeding, agonizing sleep-disrupting nerve pain loops, or sudden facial swelling anomalies.'
      }
    ],
    relatedServices: ['tooth-extraction', 'root-canal-treatment']
  },
  'wisdom-tooth-removal': {
    id: 'wisdom-tooth-removal',
    title: 'Wisdom Tooth Removal',
    category: 'Surgical',
    icon: 'delete_sweep',
    price: '₹500',
    duration: '90 mins',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7C3_wdW4f9LmXbEwqiSgMvndR2PEFPACBoj9VVOTvnKjsj2LLtvElXm6_hiHjrcawA6g6j21M8R4HgFseNnoyqDm1caWSWfg9B1JaeczJHv4Y22g_ish9LWdFq9oYmOcV8f9-EBVH4FYujOtsqzKEUAQav_nA3Cr0j6udblYd5nxoXJs2ePPrrrBEVj9H1lwOCl2_cz5z26pAxa81xLPkfoDtqSAvMm44fMN8niP4LPkDd7dkeJJu",
    description: 'Removal of impacted wisdom teeth.',
    longDescription: 'Surgical extraction of wisdom teeth to prevent pain and future complications, safely resolving heavy spatial crowding conditions at the back of the jaw arches.',
    benefits: [
      'Resolves severe impaction pressure layouts against healthy molars',
      'Precludes cysts and recurring posterior gum infection zones',
      'Stops shifts that threaten orthodontic alignment layouts'
    ],
    procedure: [
      'Advanced 3D panorama imaging alignment breakdown',
      'Deep sedation management options for maximal relaxation comfort',
      'Micro-incisional access and smooth structural third-molar extraction'
    ],
    faqs: [
      {
        question: 'Will I be asleep during wisdom teeth removal?',
        answer: 'We provide various sedation levels, from light local freezing up to deep twilight sedation depending on the complexity of your extraction map.'
      }
    ],
    relatedServices: ['tooth-extraction', 'emergency-dental-care']
  }
};

export const getAllServices = () => Object.values(servicesData);
export const getServicesByCategory = (category) => Object.values(servicesData).filter(service => service.category.toLowerCase() === category.toLowerCase());
export const getServiceById = (id) => servicesData[id] || null;
export const getRelatedServices = (serviceId) => {
  const service = getServiceById(serviceId);
  if (!service || !service.relatedServices) return [];
  return service.relatedServices.map(id => getServiceById(id)).filter(Boolean);
};