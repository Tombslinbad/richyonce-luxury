/**
 * RICHYONCE CLOTHING - CENTRAL BRAND ASSET & AUTHENTIC PHOTOGRAPHY MANIFEST
 * Integrates the client's actual photography from their completed garments and fashion albums.
 * No AI-generated or stock models. Deterministic, permanent asset mapping.
 */

export interface ClientPhotoRecord {
  id: string;
  sourceFilename: string;
  localPath: string;
  title: string;
  garmentType: string;
  category: 'editorial' | 'collections' | 'traditional' | 'bespoke' | 'details' | 'accessories';
  description: string;
  craftsmanshipNotes: string;
}

export const CLIENT_PHOTOGRAPHY_CATALOG: ClientPhotoRecord[] = [
  {
    id: 'photo-01-monarch-throne',
    sourceFilename: 'photo_5953842579965153436_y.jpg',
    localPath: '/assets/richyonce/editorial/monarch-throne.jpg',
    title: 'The Sovereign Monarch Throne Portrait',
    garmentType: 'Bespoke Velvet Royal Robe & Embroidered Crown',
    category: 'editorial',
    description: 'A distinguished Nigerian man seated upon a carved throne, wearing an opulent deep burgundy velvet royal robe with bullion gold embroidery on the sleeves, matching embroidered velvet Fila crown, holding an ebony ceremonial staff.',
    craftsmanshipNotes: 'Crushed German cotton velvet, hand-guided gold metallic filigree, custom royal Fila cap.',
  },
  {
    id: 'photo-02-royal-red-wedding',
    sourceFilename: 'photo_5953842579965153453_x.jpg',
    localPath: '/assets/richyonce/traditional/royal-red-wedding-couple.jpg',
    title: 'Royal Crimson Igbo Ceremonial Regalia',
    garmentType: 'Ceremonial White Tunic, Red Waistcoat & Long Silk Skirt',
    category: 'traditional',
    description: 'Regal traditional wedding couple. Groom in crisp white structured linen with red ceremonial open-front tunic, sweeping red George silk wrapper, raw coral bead crown and heavy neckpieces. Bride in wine velvet off-shoulder bridal gown.',
    craftsmanshipNotes: 'Pure silk damask wrapper, authentic Benin coral beads, structured bridal velvet.',
  },
  {
    id: 'photo-03-bronze-isiagu-couple',
    sourceFilename: 'photo_5953842579965153448_y.jpg',
    localPath: '/assets/richyonce/traditional/bronze-isiagu-couple.jpg',
    title: 'The Chocolate Bronze Isiagu Wedding Ensemble',
    garmentType: 'Embroidered Chocolate Isiagu Tunic & Gold Sequin Bridal Gown',
    category: 'traditional',
    description: 'Groom in rich chocolate brown Isiagu tunic featuring the majestic lion crest and tassel finishes, paired with ebony staff and royal coral beads. Bride in resplendent architectural gold sequin and hand-beaded lace gown with bronze Gele.',
    craftsmanshipNotes: 'Tasseled Isiagu placket, multi-layered sequin hand beading, custom carved serpent staff.',
  },
  {
    id: 'photo-04-outdoor-lion-court',
    sourceFilename: 'photo_5953842579965153458_y.jpg',
    localPath: '/assets/richyonce/collections/lion-court-wedding.jpg',
    title: 'The Sovereign Lion Court',
    garmentType: 'Black & White Royal Lionhead Isiagu Tunic',
    category: 'collections',
    description: 'Outdoor garden royal court. Groom in contrasting white long-sleeve under-tunic with structured black over-vest featuring the iconic golden embroidered lion head crest, feathered black velvet cap, and carved wooden fan.',
    craftsmanshipNotes: 'High-density gold bullion lion embroidery, authentic eagle feather mount, carved custom fan.',
  },
  {
    id: 'photo-05-chartreuse-imperial-couple',
    sourceFilename: 'photo_5953842579965153455_y.jpg',
    localPath: '/assets/richyonce/traditional/chartreuse-imperial-agbada.jpg',
    title: 'Chartreuse Imperial Grand Agbada & Bridal Harmony',
    garmentType: 'Grand Chartreuse Silk Agbada with Jade Coral Adornments',
    category: 'traditional',
    description: 'Couple in radiant chartreuse / lime-emerald silk ensemble. Groom in voluminous three-piece Agbada with deep green geometric chevron chest embroidery, matching Fila cap, and hand-strung jade beads.',
    craftsmanshipNotes: 'Raw silk faille weave, 70,000 stitches of chevron needlework, custom carved lion totem staff.',
  },
  {
    id: 'photo-06-red-lionhead-isiagu',
    sourceFilename: 'photo_5953842579965153452_y.jpg',
    localPath: '/assets/richyonce/collections/red-lionhead-isiagu-tunic.jpg',
    title: 'The Contemporary Red Lionhead Isiagu Tunic',
    garmentType: 'Short-Sleeve Printed Red Isiagu Silk Shirt',
    category: 'collections',
    description: 'Modern African gentleman in vibrant crimson Isiagu print tunic with white shirt collar, paired with black royal beads, eagle feather cap, sunglasses, and leather hand fan.',
    craftsmanshipNotes: 'Engineered pattern placement of the sovereign lion motif, breathable lightweight tailoring.',
  },
  {
    id: 'photo-07-twilight-mercedes-agbada',
    sourceFilename: 'photo_5953842579965153450_y.jpg',
    localPath: '/assets/richyonce/editorial/twilight-mercedes-agbada.jpg',
    title: 'Twilight Automotive Campaign: The Chartreuse Agbada',
    garmentType: 'Ceremonial Three-Piece Chartreuse Agbada with Vintage Mercedes',
    category: 'editorial',
    description: 'Cinematic dusk editorial featuring the groom in the chartreuse royal Agbada standing with carved lion staff beside a classic vintage moss-green Mercedes sedan decorated with blush pink roses.',
    craftsmanshipNotes: 'Architectural shoulder lines, heavy drape fabric recovery, automotive campaign grading.',
  },
  {
    id: 'photo-08-wine-velvet-profile',
    sourceFilename: 'photo_5953842579965153449_y.jpg',
    localPath: '/assets/richyonce/details/wine-velvet-profile.jpg',
    title: 'The Velvet Sovereign: Silhouette & Profile Study',
    garmentType: 'Bespoke Burgundy Velvet Robe Lateral View',
    category: 'details',
    description: 'Side profile of the distinguished gentleman in burgundy velvet robe and gold embroidered Fila, showcasing the seamless sleeve attachment and tailored length.',
    craftsmanshipNotes: 'Zero-drag hemline, reinforced shoulder pads, hand-guided golden bullion cuff.',
  },
  {
    id: 'photo-09-emerald-agbada-eagle-staff',
    sourceFilename: 'photo_5953842579965153435_y.jpg',
    localPath: '/assets/richyonce/editorial/hero-sovereign-emerald.jpg',
    title: 'The Sovereign Emerald Velvet Agbada with Eagle Totem Staff',
    garmentType: 'Deep Forest Emerald Velvet Agbada with Studded Star Detailing',
    category: 'editorial',
    description: 'African gentleman of immense presence wearing a deep emerald green crushed velvet Agbada sprinkled with hand-set crystal studs, white inner collar embroidery, and holding a carved staff with an eagle totem.',
    craftsmanshipNotes: 'Hand-studded crystal constellation motif, ivory silk thread neckline, carved eagle finial.',
  },
  {
    id: 'photo-10-royal-red-coral-regalia',
    sourceFilename: 'photo_5953842579965153454_y.jpg',
    localPath: '/assets/richyonce/traditional/royal-red-coral-regalia.jpg',
    title: 'The Sovereign Coral Regalia: Frontal Study',
    garmentType: 'Red Open-Front Tailored Waistcoat & Full Skirt',
    category: 'traditional',
    description: 'Direct frontal studio portrait of the groom in vibrant red open waistcoat, white inner tunic, sweeping red skirt, authentic royal red coral crown, and heavy ceremonial coral necklaces.',
    craftsmanshipNotes: 'Symmetric lapel cuts, triple-tier raw cylindrical coral beads, ceremonial ebony staff.',
  },
  {
    id: 'photo-11-crimson-blazer-architectural',
    sourceFilename: 'photo_5953842579965153451_y.jpg',
    localPath: '/assets/richyonce/collections/crimson-blazer-bespoke.jpg',
    title: 'The Crimson Architectural Double-Breasted Blazer',
    garmentType: 'Bespoke Red Double-Breasted Wool Blazer & Tailored Trousers',
    category: 'bespoke',
    description: 'Sharp modern menswear silhouette. African gentleman on an architectural colonnade balcony wearing a razor-sharp red double-breasted tailored blazer with gold buttons, black tailored trousers, and gold wireframe sunglasses.',
    craftsmanshipNotes: 'Savile Row full canvas construction, horn gold-rimmed buttons, roped shoulder expression.',
  },
  {
    id: 'photo-12-crimson-textured-tunic',
    sourceFilename: 'photo_5953842579965153434_y.jpg',
    localPath: '/assets/richyonce/collections/crimson-ceremonial-tunic.jpg',
    title: 'Crimson Textured Ceremonial Tunic & Ebony Staff',
    garmentType: 'Textured Red Jacquard Tunic with Coral Cap',
    category: 'traditional',
    description: 'Distinguished gentleman in a rich diamond-textured red ceremonial tunic, matching coral beaded cap, gold spectacles, black beaded necklaces, and carved ebony staff.',
    craftsmanshipNotes: 'Textured diamond jacquard relief, scalloped bead edge cap, carved staff.',
  },
  {
    id: 'photo-13-twilight-mercedes-flowers',
    sourceFilename: 'photo_5953842579965153460_y.jpg',
    localPath: '/assets/richyonce/editorial/twilight-mercedes-flowers.jpg',
    title: 'Chartreuse Agbada Twilight Perspective with Floral Installation',
    garmentType: 'Ceremonial Agbada Automotive Editorial',
    category: 'editorial',
    description: 'Atmospheric twilight view of the groom with the vintage Mercedes and blush floral installation.',
    craftsmanshipNotes: 'Cinematic lighting, high-sheen raw silk drapery under dusk ambient sky.',
  },
  {
    id: 'photo-14-red-train-back-embroidery',
    sourceFilename: 'photo_5953842579965153457_y.jpg',
    localPath: '/assets/richyonce/details/red-train-back-embroidery.jpg',
    title: 'Red Ceremonial Train & Back Drapery Study',
    garmentType: 'Full Back View of Red Ceremonial Regalia',
    category: 'details',
    description: 'Back view revealing the sweeping floor-length red George silk train, architectural cape back, and intricate tone-on-tone embroidery across the dorsal panel.',
    craftsmanshipNotes: 'Floor-length waterfall train, tone-on-tone dorsal bullion stitchwork, coral cap rim.',
  },
  {
    id: 'photo-15-bespoke-hand-kiss',
    sourceFilename: 'photo_5953842579965153445_y.jpg',
    localPath: '/assets/richyonce/bespoke/bespoke-hand-kiss.jpg',
    title: 'The Hand-Kissing Ceremony in Chocolate Isiagu & Gold Lace',
    garmentType: 'Groom & Bride Bespoke Traditional Wedding Look',
    category: 'bespoke',
    description: 'An intimate, emotional editorial moment of the groom bowing to kiss the bride’s hand in their bespoke chocolate brown Isiagu and gold sequin ensemble.',
    craftsmanshipNotes: 'Matched bridal and groom color grading, architectural shoulder epaulettes on bridal gown.',
  },
  {
    id: 'photo-16-royal-red-couple-holding-hands',
    sourceFilename: 'photo_5953842579965153456_y.jpg',
    localPath: '/assets/richyonce/traditional/royal-red-wedding-couple.jpg',
    title: 'Sovereign Union: Royal Red Regalia Full Portrait',
    garmentType: 'Ceremonial Red Robes & Bridal Velvet Gown',
    category: 'traditional',
    description: 'Full-length portrait of the bride and groom standing hand in hand, exuding majestic African royalty in crimson, white, and wine velvet.',
    craftsmanshipNotes: 'Synchronized regalia palette, high-contrast cultural tailoring.',
  },
  {
    id: 'photo-17-lionhead-isiagu-masterpiece',
    sourceFilename: 'photo_5953842579965153459_y.jpg',
    localPath: '/assets/richyonce/collections/lion-crest-isiagu-masterpiece.jpg',
    title: 'The Golden Lionhead Isiagu Masterpiece (Full Stance)',
    garmentType: 'Black & White Isiagu Long Tunic with Ceremonial Fan',
    category: 'collections',
    description: 'Commanding full-length portrait of the groom standing in the black and white Isiagu tunic with prominent gold lion crest, holding the carved feather fan on draped green fabric.',
    craftsmanshipNotes: 'Masterpiece 100,000-stitch lion crest, structured tunic vents, custom fan lettering.',
  },
];

export const BRAND_ASSETS = {
  // Brand Logos & Vector Identity
  logo: '/assets/richyonce-logo.svg',
  logoDark: '/assets/richyonce-logo-dark.svg',

  // Hero Campaign Photography (Authentic Client Masterpieces)
  heroAgbada: '/assets/richyonce/editorial/hero-sovereign-emerald.jpg',
  heroTwilightMercedes: '/assets/richyonce/editorial/twilight-mercedes-agbada.jpg',
  heroMonarchThrone: '/assets/richyonce/editorial/monarch-throne.jpg',

  // Editorial Narrative Showcase
  editorialWeddingCouple: '/assets/richyonce/traditional/royal-red-wedding-couple.jpg',
  editorialBronzeCouple: '/assets/richyonce/traditional/bronze-isiagu-couple.jpg',
  editorialChartreuseCouple: '/assets/richyonce/traditional/chartreuse-imperial-agbada.jpg',
  editorialCrimsonBlazer: '/assets/richyonce/collections/crimson-blazer-bespoke.jpg',

  // ASCENT & Current Collection (Authentic Client Creations)
  ascentPants: '/assets/richyonce/collections/crimson-blazer-bespoke.jpg',
  ascentHoodie: '/assets/richyonce/collections/red-lionhead-isiagu-tunic.jpg',
  ascentCargo: '/assets/richyonce/collections/lion-crest-isiagu-masterpiece.jpg',
  ascentShirts: '/assets/richyonce/collections/crimson-ceremonial-tunic.jpg',
  limitedPieces: '/assets/richyonce/editorial/hero-sovereign-emerald.jpg',

  // Category Matrix
  categoryReadyToWear: '/assets/richyonce/collections/red-lionhead-isiagu-tunic.jpg',
  categoryTraditional: '/assets/richyonce/traditional/chartreuse-imperial-agbada.jpg',
  categoryBespoke: '/assets/richyonce/collections/crimson-blazer-bespoke.jpg',
  categoryAccessories: '/assets/category-accessories.jpg',

  // Craftsmanship & Details
  craftsmanshipLionCrest: '/assets/richyonce/collections/lion-crest-isiagu-masterpiece.jpg',
  craftsmanshipRedTrain: '/assets/richyonce/details/red-train-back-embroidery.jpg',
  craftsmanshipWineProfile: '/assets/richyonce/details/wine-velvet-profile.jpg',
  craftsmanshipMercedesNight: '/assets/richyonce/editorial/twilight-mercedes-agbada.jpg',

  // Bespoke Atelier
  bespokeSenator: '/assets/richyonce/collections/crimson-blazer-bespoke.jpg',
  atelierDetail: '/assets/richyonce/details/red-train-back-embroidery.jpg',
  bespokeHandKiss: '/assets/richyonce/bespoke/bespoke-hand-kiss.jpg',

  // Fabric Swatch Textures
  fabrics: {
    ankara: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=400&q=80',
    brocade: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80',
    asoOke: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80',
    cotton: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=400&q=80',
    linen: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=400&q=80',
    velvet: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=400&q=80',
  },
} as const;
