export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  section: 'construction' | 'architectural' | 'green';
  manufacturer: string;
  location: string;
  price: string;
  priceVal: number; // For filtering
  unit: string;
  moq: string;
  leadTime: string;
  isGreen: boolean;
  isFireRated: boolean;
  isAcoustic: boolean;
  isStructural: boolean;
  isLEED: boolean;
  isIGBC: boolean;
  description: string;
  specifications: { [key: string]: string };
}

export interface Category {
  id: string;
  label: string;
  slug: string;
  description: string;
  technicalGuide: {
    standards: string;
    testingCriteria: string;
    sourcingKey: string;
  };
}

export interface Section {
  id: 'construction' | 'architectural' | 'green';
  title: string;
  categories: Category[];
}

export const sections: Section[] = [
  {
    id: 'construction',
    title: 'Construction Materials',
    categories: [
      {
        id: 'cement-concrete',
        label: 'Cement & Concrete',
        slug: 'cement-concrete',
        description: 'Foundational materials powering residential, commercial, industrial, and infrastructure development.',
        technicalGuide: {
          standards: 'IS 269:2015 (OPC 33/43/53), IS 1489:2015 Part 1 & 2 (PPC), IS 455:2015 (PSC), IS 4926:2003 (RMC), IS 456:2000 (Plain & Reinforced Concrete)',
          testingCriteria: 'Compressive strength (3/7/28 days, IS 4031-6), initial/final setting time (IS 4031-5), soundness (Le-Chatelier/Autoclave, IS 4031-3), fineness by Blaine\'s air permeability (IS 4031-2), and slump retention (IS 1199).',
          sourcingKey: 'Verify grade (43 vs 53) and cement type against design mix requirements. RMC batching must conform to IS 4926 with concrete discharge within 2 hours of batching (or use retarders). Inspect manufacturer mill test certificate (MTC).'
        }
      },
      {
        id: 'structural-steel',
        label: 'Structural Steel',
        slug: 'structural-steel',
        description: 'High-tensile reinforcement rebars, structural beams, columns, and hollow sections.',
        technicalGuide: {
          standards: 'IS 1786:2008 (TMT Rebars), IS 2062:2011 (Hot Rolled Medium & High Tensile Structural Steel), IS 800:2007 (General Construction in Steel), IS 1608:2005 (Tensile Testing)',
          testingCriteria: 'Yield strength (Re), Ultimate Tensile strength (Rm), Yield-to-Tensile ratio (Rm/Re >= 1.15 for seismic design), total elongation at max force (Uniform Elongation), bend and rebend testing (IS 1599).',
          sourcingKey: 'Specify Fe 500D, Fe 550D, or Fe 600 grade rebars for earthquake-prone zones (Zone III/IV/V) to ensure high ductility. Ensure Carbon Equivalent (CE) is < 0.42% for weldability. Verify anticorrosive coating thickness (Epoxy/Galvanized) where specified.'
        }
      },
      {
        id: 'aggregates-sand',
        label: 'Aggregates & Sand',
        slug: 'aggregates-sand',
        description: 'Coarse aggregates, fine gravel, manufactured sand (M-Sand), and plastering sand.',
        technicalGuide: {
          standards: 'IS 383:2016 (Coarse & Fine Aggregates Specification), IS 2386:1963 Parts 1 to 8 (Methods of Test for Aggregates)',
          testingCriteria: 'Sieve analysis (Grading Zones I-IV), Silt/Clay content (Max 3% for natural sand, 10% for M-Sand), Aggregate Crushing Value (ACV < 30%), Aggregate Impact Value (AIV < 30%), Flakiness & Elongation Index (combined < 35%), and Water Absorption (Max 2%).',
          sourcingKey: 'Transition to washed Manufactured Sand (M-Sand Zone II) for concrete to eliminate organic silt impurities. Verify combined flakiness and elongation indices for coarse aggregates to prevent weak planes in structural concrete.'
        }
      },
      {
        id: 'masonry-enclosures',
        label: 'Masonry & Enclosures',
        slug: 'masonry-enclosures',
        description: 'AAC blocks, light-weight blocks, red clay bricks, fly ash bricks, and designer concrete masonry.',
        technicalGuide: {
          standards: 'IS 2185:2005 Part 1 (Concrete Blocks), IS 2185:2001 Part 3 (AAC Blocks), IS 1077:1992 (Common Burnt Clay Bricks), IS 12894:2002 (Fly Ash Bricks), IS 15658:2006 (Concrete Pavers), IS 2250:1981 (Masonry Mortar Preparation)',
          testingCriteria: 'Compressive strength, bulk density, water absorption (Max 10% for AAC, Max 20% for clay bricks), and drying shrinkage (Max 0.05% for AAC to prevent structural plaster cracking).',
          sourcingKey: 'Autoclaved Aerated Concrete (AAC) blocks must have a minimum density of 551-650 kg/m³ (Grade I) and compressive strength of >= 4.0 N/mm²; specify polymeric thin-bed mortars (3mm joint) to eliminate thermal bridging and crack lines.'
        }
      },
      {
        id: 'waterproofing',
        label: 'Waterproofing Systems',
        slug: 'waterproofing',
        description: 'Liquid PU membranes, SBS/APP bituminous membranes, crystalline coatings, and sealants.',
        technicalGuide: {
          standards: 'IS 16471:2017 (PU Waterproofing guidelines), ASTM C836 (Cold Liquid-Applied Elastomeric Membrane), IS 1346:1991 (APP/SBS Bituminous Membranes), IS 2645:2003 (Integral Waterproofing Compounds)',
          testingCriteria: 'Tensile strength (ASTM D412), elongation at break (Min 300% for PU, 400% for SBS), crack-bridging capacity (ASTM C1305, Min 2mm), adhesion strength (ASTM D4541), and hydrostatic pressure resistance (DIN 1048).',
          sourcingKey: 'Select cold liquid-applied polyurethane (PU) membranes for complex roof geometry/active joints. Enforce SBS modified bituminous membranes for buried basements. Conduct 72-hour pond testing to verify seal integrity prior to screed protection.'
        }
      },
      {
        id: 'roofing-systems',
        label: 'Roofing Systems',
        slug: 'roofing-systems',
        description: 'Metal standing seam profiles, sandwich insulated panels, and protective roof shingles.',
        technicalGuide: {
          standards: 'IS 277:2018 (Galvanized Steel Sheets), IS 14246:2013 (Prepainted Galvanized/Galvalume Sheets), ASTM A792 (Alu-Zinc Alloy Coated), UL 580 (Wind Uplift Resistance Rating)',
          testingCriteria: 'Coating mass verification (triple spot test, min AZ150/G90), paint dry film thickness (DFT), T-bend adhesion, salt spray corrosion testing (ASTM B117), and wind-load uplift capacity.',
          sourcingKey: 'Use standing seam metal profiles (minimum 0.50mm base metal thickness) with concealed clips for zero-penetration to eliminate leak risks. Specify Galvalume AZ150 coating (55% Al, 43.5% Zn) for industrial projects requiring > 20-year durability.'
        }
      },
      {
        id: 'insulation-materials',
        label: 'Insulation Materials',
        slug: 'insulation-materials',
        description: 'Thermal and acoustic insulation boards including Rockwool, Glass Wool, and Expanded Polystyrene.',
        technicalGuide: {
          standards: 'IS 8183:1993 (Bonded Mineral Wool), IS 9842:1994 (Glass Fiber Insulation), IS 4671:1984 (Expanded Polystyrene Boards), BS 476 Part 4 (Non-combustibility Test for Materials)',
          testingCriteria: 'Thermal conductivity (K-value <= 0.035 W/mK), density verification, moisture absorption, non-combustibility (Class A1/Euroclass), and Noise Reduction Coefficient (NRC >= 0.80).',
          sourcingKey: 'For commercial wall assemblies and shaft enclosures, enforce non-combustible bonded mineral rockwool (density >= 64 kg/m³ for thermal, >= 96 kg/m³ for acoustic/fire stops). Ensure zero flame-spread and zero smoke-developed indices.'
        }
      },
      {
        id: 'pipes-plumbing',
        label: 'Pipes & Plumbing',
        slug: 'pipes-plumbing',
        description: 'CPVC, UPVC, PPR, and HDPE piping systems for water supply, drainage, and utility networks.',
        technicalGuide: {
          standards: 'IS 15801:2012 (CPVC Pipes for Hot/Cold Water), IS 4985:2021 (uPVC Pressure Pipes), IS 13592:2013 (uPVC Soil & Waste Pipes), IS 4984:2016 (HDPE Water Pipes), IS 14333:1996 (HDPE Sewerage)',
          testingCriteria: 'Hydrostatic pressure test (IS 12235-8), reversion test, impact strength, opacity, and joint tightness (solvent weld or electrofusion thermal weld).',
          sourcingKey: 'Use CPVC SDR-11/13.5 (Class 1 & 2) for high-temperature hot water lines (up to 82°C). Specify uPVC Class 5 (PN-10) for internal cold water pipelines, and heavy-wall HDPE PN-16 with butt-welded joints for municipal mains.'
        }
      }
    ]
  },
  {
    id: 'architectural',
    title: 'Architectural Systems',
    categories: [
      {
        id: 'cladding-systems',
        label: 'Cladding Systems',
        slug: 'cladding-systems',
        description: 'Aluminum Composite Panels (ACP), High-Pressure Laminates (HPL), natural stone facades, and terracotta tiles.',
        technicalGuide: {
          standards: 'IS 17682:2021 (Aluminum Composite Panels specification), ASTM E84 (Surface Burning), EN 13501-1 (Fire Classification Class A2/B-s1, d0), ASTM E330 (Structural Performance by Uniform Static Air Pressure)',
          testingCriteria: 'Core composition analysis, peel strength (min 4.0 N/mm), flame spread and smoke generation index, wind load deflection, and accelerated weathering (UV exposure, dE < 2.0 over 5000 hours).',
          sourcingKey: 'Enforce Class A2 (non-combustible mineral core) or Class B-s1,d0 (fire retardant) ACP for buildings over 15 meters to prevent vertical fire spread. Verify panel structural calculation against local wind zone velocity (IS 875 Part 3).'
        }
      },
      {
        id: 'glass-glazing',
        label: 'Glass & Glazing',
        slug: 'glass-glazing',
        description: 'High-performance DGU, laminated glass, structural glazing systems, and acoustic partitions.',
        technicalGuide: {
          standards: 'IS 2553:2018 Part 1 (Safety Glass for Buildings), IS 16200:2015 (Structural Use of Glass code), ASTM C1048 (Heat-Treated/Fully Tempered Glass), EN 1279 (Insulating Glass Units)',
          testingCriteria: 'Thermal transmittance (U-Value), Solar Heat Gain Coefficient (SHGC), Light Transmission (VLT), center-of-glass deflection, and impact test performance (ANSI Z97.1).',
          sourcingKey: 'Double Glazed Units (DGU) must have tempered Low-E glass outer panes, argon gas-filled spacers, and laminated inner safety panes. SHGC must be aligned with ECBC/GRIHA requirements (typically < 0.25 for hot/dry zones).'
        }
      },
      {
        id: 'doors-partitions',
        label: 'Doors & Partitions',
        slug: 'doors-partitions',
        description: 'uPVC door frames, structural aluminum entries, acoustic glass partitions, and specialized fire doors.',
        technicalGuide: {
          standards: 'IS 3614:2021 (Fire Resistant Door Assemblies), IS 4020:1998 Parts 1 to 16 (Methods of Test for Wooden Door Shutters), IS 1038:1983 (Steel Doors/Windows), BS EN 1634-1 (Fire Resistance for Doors)',
          testingCriteria: 'Fire integrity & thermal insulation rating (60/120 minutes), acoustic transmission loss (STC/Rw), slam testing (min 100,000 cycles), end immersion, and screw-holding capacity.',
          sourcingKey: 'Fire doors must be certified by CBRI/UL under IS 3614:2021 for integrity and insulation. Acoustic partitions in meeting rooms must target STC >= 45 dB with perimeter drop-seal gaskets to prevent sound leakage.'
        }
      },
      {
        id: 'ceiling-systems',
        label: 'Ceiling Systems',
        slug: 'ceiling-systems',
        description: 'Mineral fiber tiles, acoustic gypsum ceilings, metal grid systems, and wood veneer ceiling layouts.',
        technicalGuide: {
          standards: 'IS 2095:2011 Part 1 (Gypsum Plaster Boards), ASTM C635 (Metal Suspension Systems for Acoustical Tile), EN 13964 (Suspended Ceilings - Requirements & Test Methods)',
          testingCriteria: 'Deflection limit under load (L/360), Noise Reduction Coefficient (NRC), Light Reflectance (LR >= 85%), mold/mildew resistance (ASTM D3273), and hanger wire load carrying capacity.',
          sourcingKey: 'In high-humidity spaces (kitchens, washrooms), specify moisture-resistant (RH99) ceiling tiles. Suspend grid using galvanised wire hangers (min 12 gauge) anchored directly to the slab, not to MEP services or ducting.'
        }
      },
      {
        id: 'acoustic-systems',
        label: 'Acoustic Systems',
        slug: 'acoustic-systems',
        description: 'Sound-absorbing wall paneling, hanging ceiling baffles, fabric panels, and bass traps.',
        technicalGuide: {
          standards: 'IS 9901:1981 Parts 1 to 3 (Measurement of Sound Insulation), ASTM C423 (Sound Absorption by Reverberation Room Method), ASTM E90 (Laboratory Measurement of Airborne Sound Transmission)',
          testingCriteria: 'Noise Reduction Coefficient (NRC, target 0.75-0.95), Sound Transmission Class (STC), air flow resistivity (ASTM C522), and flame spread index (Class 1/Class A under ASTM E84).',
          sourcingKey: 'For auditoriums and meeting rooms, balance low-frequency sound absorption (grooved wood panels with air gap + mineral wool backing) and high-frequency control. Map layout to achieve design Reverberation Time (RT60) < 0.6 seconds.'
        }
      },
      {
        id: 'lighting-solutions',
        label: 'Lighting Solutions',
        slug: 'lighting-solutions',
        description: 'Commercial LED grids, smart linear lighting, architectural spots, and automated lighting controls.',
        technicalGuide: {
          standards: 'IS 16107:2012 Part 2 Section 1 (LED Luminaire Performance), IS 16102:2012 (Self-Ballasted LED Lamps Safety), IEC 60598-1 (Luminaires - General Safety Requirements), BEE Star Labeling Guidelines',
          testingCriteria: 'Luminous efficacy (min 120 lm/W), Color Rendering Index (CRI >= 80, R9 > 50 for retail/office), Unified Glare Rating (UGR < 19), Total Harmonic Distortion (THD < 10%), and power factor (> 0.95).',
          sourcingKey: 'Specify electronic drivers with ripple-free constant current outputs (flicker percentage < 5%). Require surge protection (min 4kV for indoor, 10kV for outdoor/street lighting). Ensure UGR < 19 for corporate work planes.'
        }
      },
      {
        id: 'flooring-systems',
        label: 'Flooring Systems',
        slug: 'flooring-systems',
        description: 'Epoxy coatings, self-leveling screeds, vitrified tiling, engineered wood, and access flooring.',
        technicalGuide: {
          standards: 'IS 15622:2017 (Ceramic & Vitrified Tiles Specification), IS 4631:1968 (Code of Practice for Laying Epoxy Flooring), ASTM D4060 (Taber Abrasion Resistance), ASTM C1028 (Static Coefficient of Friction)',
          testingCriteria: 'Compressive & flexural strength, water absorption (< 0.5% for vitrified, 0% for epoxy), slip resistance (R9-R12 rating), and Taber wear resistance (mass loss mg).',
          sourcingKey: 'Specify 2.0mm to 3.0mm solvent-free self-leveling epoxy flooring (compressive strength > 60 N/mm²) for cleanrooms and heavy warehouses. Vitrified floor tiles in high-traffic corridors must have scratch resistance of MOHS scale >= 7.'
        }
      },
      {
        id: 'louvers-facades',
        label: 'Louvers & Facades',
        slug: 'louvers-facades',
        description: 'Architectural aluminum louvers, double-skin dynamic envelopes, and ventilated terracotta screens.',
        technicalGuide: {
          standards: 'AAMA 501.1 (Dynamic Water Penetration Test), ASTM E331 (Water Penetration by Static Pressure), ASTM E283 (Rate of Air Leakage), BS 8414 (Fire Performance of External Cladding)',
          testingCriteria: 'Structural integrity under wind load, water penetration limits (zero leakage at 500 Pa pressure), thermal transmittance (U-frame), and acoustic attenuation.',
          sourcingKey: 'Verify dynamic structural calculations for brackets and mullions against peak local wind pressures. Dynamic water testing (AAMA 501.1) must be certified by facade laboratories for custom curtain wall assemblies.'
        }
      }
    ]
  },
  {
    id: 'green',
    title: 'Green Building Materials',
    categories: [
      {
        id: 'recycled-materials',
        label: 'Recycled Materials',
        slug: 'recycled-materials',
        description: 'Structural steel with post-consumer recycled content, fly-ash bricks, and recycled rubber flooring.',
        technicalGuide: {
          standards: 'ISO 14021:2016 (Environmental Labels and Declarations - Self-Declared Claims), ISO 14025 (Type III Environmental Product Declarations - EPD), GRIHA & LEED Material Credit Guidelines',
          testingCriteria: 'Post-consumer and pre-consumer recycled content percentages, structural load performance verification (tensile, flexural, yield), and VOC emission rates (ASTM D5116).',
          sourcingKey: 'Validate the Environmental Product Declaration (EPD) and third-party green certifications (IGBC/GRIHA/GreenPro) to ensure the recycled content claims (e.g. recycled steel > 75%, recycled plastic wood composites) are verified.'
        }
      },
      {
        id: 'low-carbon-concrete',
        label: 'Low Carbon Concrete',
        slug: 'low-carbon-concrete',
        description: 'Geopolymer concrete mixes, fly-ash blended concrete, GGBS blends, and carbon-cured blocks.',
        technicalGuide: {
          standards: 'IS 456:2000 (Plain & Reinforced Concrete Code), IS 3812:2013 Part 1 (Fly Ash Specification), IS 10897:1982 (GGBS binder specification), ASTM C1202 (Rapid Chloride Permeability Test - RCPT)',
          testingCriteria: 'Embodied carbon reduction (kg CO2-eq/m3 vs baseline), compressive strength development curve (GGBS/Fly Ash mixes gain strength slower, requiring 56-day targets), durability index (RCPT < 1000 Coulombs).',
          sourcingKey: 'Enforce geopolymer concrete mixes or high-volume cement replacements (up to 70% GGBS / 35% Fly Ash) for foundation structures. Allow 56-day compressive strength design verification to optimize slag activation.'
        }
      },
      {
        id: 'bio-composites',
        label: 'Bio-Composites',
        slug: 'bio-composites',
        description: 'Natural fiber composite boards, hemp-lime insulation blocks, and agricultural residue panels.',
        technicalGuide: {
          standards: 'IS 12406:2021 (Medium Density Fibre Boards specification), EN 717-1 (Formaldehyde Release Chamber Method), ASTM D7031 (Physical Properties of Wood-Plastic Composites)',
          testingCriteria: 'Formaldehyde emission rating (must meet Class E1 <= 0.1 ppm or E0 <= 0.05 ppm), modulus of rupture (MOR), internal bond strength, and moisture expansion rate under immersion.',
          sourcingKey: 'Specify agricultural-residue bio-composite boards (bagasse, straw) utilizing zero-formaldehyde binder resins (MDI) for interior paneling, matching Class E0 indoor air quality safety standards.'
        }
      },
      {
        id: 'engineered-bamboo',
        label: 'Engineered Bamboo',
        slug: 'engineered-bamboo',
        description: 'Structural bamboo beams, columns, laminated bamboo panels, and heavy strand-woven bamboo flooring.',
        technicalGuide: {
          standards: 'National Building Code (NBC) 2016 Part 6 Section 3B (Structural Design Using Bamboo), ISO 22156:2021 (Bamboo Structures - Structural Design), ASTM D5456 (Structural Composite Lumber Evaluation)',
          testingCriteria: 'Tensile strength parallel to grain, bending/flexural strength, compression parallel to grain, moisture content (target 8-12%), and preservative retention (borate treatment verification).',
          sourcingKey: 'Strand-woven structural bamboo must be treated against fungal and insect attack (borate pressure impregnation). Ensure design parameters align with NBC 2016 structural design curves for structural members.'
        }
      },
      {
        id: 'sustainable-insulation',
        label: 'Sustainable Insulation',
        slug: 'sustainable-insulation',
        description: 'Natural cork insulation boards, recycled denim batts, cellulose spray insulation, and wood fiber panels.',
        technicalGuide: {
          standards: 'EN 13170 (Factory Made Products of Expanded Cork - Specification), ASTM C518 (Steady-State Thermal Transmission), BS 476 Part 7 (Surface Spread of Flame)',
          testingCriteria: 'Thermal conductivity (K-value: 0.036 - 0.040 W/mK), density (110-130 kg/m3), dimensional stability under temperature/moisture variations, and fire class evaluation.',
          sourcingKey: 'For exterior thermal envelopes, select 100% natural expanded cork insulation boards (ICB) which offer positive ecological footprints. Verify thermal insulation thickness based on overall envelope U-value targets.'
        }
      },
      {
        id: 'green-facade-systems',
        label: 'Green Facade Systems',
        slug: 'green-facade-systems',
        description: 'Double-skin dynamic facades, modular living green walls, and integrated solar photovoltaic cladding.',
        technicalGuide: {
          standards: 'CWCT Standards for Systemized Building Envelopes, BS 8414 (Fire Performance of External Cladding Systems), IEC 61730 (Photovoltaic Module Safety Qualification for BIPV)',
          testingCriteria: 'Wind drag coefficient, irrigation runoff containment, structural load capacity of planter modules, solar module cell efficiency, and flame propagation index of green wall backing panels.',
          sourcingKey: 'Green living walls must incorporate automatic drip-irrigation with moisture-sensor feedback and use fire-retardant (Class B-s1,d0) support panels. BIPV panels must be qualified under IEC 61215/61730 for structural glazing safety.'
        }
      },
      {
        id: 'water-conservation',
        label: 'Water Conservation Systems',
        slug: 'water-conservation',
        description: 'Rooftop rainwater harvesting systems, modular greywater recycling plants, and ultra-low flow utility fittings.',
        technicalGuide: {
          standards: 'IS 15797:2008 (Roof Rainwater Harvesting - Guidelines), IS 1172:1993 (Basic Requirements for Water Supply, Drainage and Sanitation), UPC-I (Uniform Plumbing Code - India)',
          testingCriteria: 'Filtration efficiency (pore size in microns, target < 100 microns for primary filters), flow rate limits (gpm/lpm for water-saving aerators), and potable water displacement percentage.',
          sourcingKey: 'Specify dual-piping configurations for toilets and landscape irrigation fed by modular decentralized greywater treatment plants. Fixtures must be certified under WEP-I (Water Efficient Products India) with flow rates < 6 lpm at 3 bar pressure.'
        }
      },
      {
        id: 'cd-waste-products',
        label: 'C&D Waste Products',
        slug: 'cd-waste-products',
        description: 'Reprocessed demolition concrete aggregates, recycled aggregate concrete tiles, and sub-base materials.',
        technicalGuide: {
          standards: 'IS 383:2016 (Revision incorporating recycled aggregates up to 25% for structural and 100% for non-structural concrete), CPWD Guidelines on the Use of Recycled Aggregates in Construction',
          testingCriteria: 'Aggregate Crushing Value, aggregate water absorption (recycled aggregates absorb 3-5x more water, requiring mix adjustments), and heavy metal leaching/chemical soundness tests.',
          sourcingKey: 'Enforce Recycled Concrete Aggregate (RCA) and Recycled Aggregate (RA) blends in road base (GSB), sub-bases, non-structural paving blocks, and kerb stones. Require adjusted water-cement ratios and plasticizers to compensate for absorption.'
        }
      }
    ]
  }
];

export const products: Product[] = [
  // CEMENT & CONCRETE
  {
    id: 'cement-opc-53',
    name: 'OPC Cement 53 Grade',
    category: 'Cement & Concrete',
    categorySlug: 'cement-concrete',
    section: 'construction',
    manufacturer: 'UltraTech Cement Ltd',
    location: 'Hyderabad, TS',
    price: '₹365',
    priceVal: 365,
    unit: 'bag',
    moq: '500 Bags',
    leadTime: '2-4 Days',
    isGreen: false,
    isFireRated: false,
    isAcoustic: false,
    isStructural: true,
    isLEED: false,
    isIGBC: false,
    description: 'High early strength Ordinary Portland Cement engineered for structural concrete elements like columns, beams, and slabs.',
    specifications: {
      'Compressive Strength': '53 MPa at 28 days',
      'Initial Setting Time': '45 Minutes',
      'Final Setting Time': '240 Minutes',
      'Density': '1440 kg/m³',
      'IS Standard': 'IS 269:2015'
    }
  },
  {
    id: 'cement-ppc',
    name: 'PPC Cement (Fly-Ash Blended)',
    category: 'Cement & Concrete',
    categorySlug: 'cement-concrete',
    section: 'construction',
    manufacturer: 'Sagar Cements Ltd',
    location: 'Nalgonda, TS',
    price: '₹345',
    priceVal: 345,
    unit: 'bag',
    moq: '300 Bags',
    leadTime: '2-3 Days',
    isGreen: true,
    isFireRated: false,
    isAcoustic: false,
    isStructural: true,
    isLEED: true,
    isIGBC: true,
    description: 'Pozzolana Portland Cement blended with premium fly ash. Offers low heat of hydration, reduced crack risk, and long-term durability.',
    specifications: {
      'Compressive Strength': '43 MPa at 28 days',
      'Fly-Ash Content': '28% (Post-Industrial Recycled)',
      'Initial Setting Time': '60 Minutes',
      'Density': '1380 kg/m³',
      'IS Standard': 'IS 1489 Part 1'
    }
  },
  {
    id: 'concrete-rmc-m25',
    name: 'Ready Mix Concrete M25',
    category: 'Cement & Concrete',
    categorySlug: 'cement-concrete',
    section: 'construction',
    manufacturer: 'Aparna RMC',
    location: 'Gachibowli, Hyd',
    price: '₹4,850',
    priceVal: 4850,
    unit: 'm³',
    moq: '6 m³ (1 Transit Mixer)',
    leadTime: '24 Hours',
    isGreen: false,
    isFireRated: false,
    isAcoustic: false,
    isStructural: true,
    isLEED: false,
    isIGBC: false,
    description: 'Factory-controlled, computer-batched ready mix concrete. Formulated for high durability, structural integrity, and prompt site dispatch.',
    specifications: {
      'Compressive Strength': '25 MPa at 28 days',
      'Slump Value': '120-150 mm (Pumpable)',
      'Aggregates Used': '20mm & 10mm crushed stone',
      'Water-Cement Ratio': '0.45',
      'IS Standard': 'IS 4926 / IS 456'
    }
  },

  // STRUCTURAL STEEL
  {
    id: 'steel-tmt-500d',
    name: 'Fe500D TMT Reinforcement Bars',
    category: 'Structural Steel',
    categorySlug: 'structural-steel',
    section: 'construction',
    manufacturer: 'Tata Tiscon',
    location: 'Secunderabad, TS',
    price: '₹58,500',
    priceVal: 58500,
    unit: 'ton',
    moq: '5 Tons',
    leadTime: '3-5 Days',
    isGreen: false,
    isFireRated: false,
    isAcoustic: false,
    isStructural: true,
    isLEED: false,
    isIGBC: false,
    description: 'Thermo-Mechanically Treated high-ductility steel rebars. Specially designed for seismic zones with enhanced elongation and yield metrics.',
    specifications: {
      'Yield Strength': '500 MPa (Min)',
      'Tensile Strength': '565 MPa',
      'Elongation': '16%',
      'Carbon Equivalent': '0.42% (Max)',
      'IS Standard': 'IS 1786:2008'
    }
  },
  {
    id: 'steel-h-beam',
    name: 'Structural H-Beam (Heavy)',
    category: 'Structural Steel',
    categorySlug: 'structural-steel',
    section: 'construction',
    manufacturer: 'Jindal Steel & Power Ltd',
    location: 'Patancheru, Hyd',
    price: '₹64,000',
    priceVal: 64000,
    unit: 'ton',
    moq: '10 Tons',
    leadTime: '5-7 Days',
    isGreen: false,
    isFireRated: false,
    isAcoustic: false,
    isStructural: true,
    isLEED: false,
    isIGBC: false,
    description: 'Parallel flange structural H-sections. Ideal for multi-story heavy industrial framing, flyover sections, and steel column assemblies.',
    specifications: {
      'Yield Strength': '250 - 350 MPa',
      'Tensile Strength': '410 - 485 MPa',
      'Flange Width': '200 mm - 400 mm',
      'Thickness': '8 mm - 16 mm',
      'IS Standard': 'IS 2062:2011'
    }
  },

  // AGGREGATES & SAND
  {
    id: 'aggregate-msand',
    name: 'Manufactured Sand (M-Sand) Concrete Grade',
    category: 'Aggregates & Sand',
    categorySlug: 'aggregates-sand',
    section: 'construction',
    manufacturer: 'Robo Silicon Pvt Ltd',
    location: 'Miyapur, Hyd',
    price: '₹1,200',
    priceVal: 1200,
    unit: 'ton',
    moq: '10 Tons (1 Tipper)',
    leadTime: '1-2 Days',
    isGreen: true,
    isFireRated: false,
    isAcoustic: false,
    isStructural: false,
    isLEED: true,
    isIGBC: true,
    description: 'Crushed granite sand processed through vertical shaft impactor. Cubical particle shapes with zero silt, ideal for high-performance concrete.',
    specifications: {
      'Grading Zone': 'Zone II (Fine Aggregate)',
      'Silt Content': '0% (Washed)',
      'Specific Gravity': '2.65',
      'Water Absorption': '1.2%',
      'IS Standard': 'IS 383:2016'
    }
  },
  {
    id: 'aggregate-20mm',
    name: 'Coarse Aggregate 20mm',
    category: 'Aggregates & Sand',
    categorySlug: 'aggregates-sand',
    section: 'construction',
    manufacturer: 'Telangana Blue Metals',
    location: 'Medchal, TS',
    price: '₹1,500',
    priceVal: 1500,
    unit: 'ton',
    moq: '10 Tons',
    leadTime: '1-2 Days',
    isGreen: false,
    isFireRated: false,
    isAcoustic: false,
    isStructural: true,
    isLEED: false,
    isIGBC: false,
    description: 'Angular crushed granite stone aggregates. Sized precisely at 20mm, providing optimal interlocking structure for cast-in-situ concrete.',
    specifications: {
      'Crushing Value': '18% (Excellent)',
      'Impact Value': '14%',
      'Flakiness Index': '12%',
      'Elongation Index': '15%',
      'IS Standard': 'IS 383'
    }
  },

  // MASONRY & ENCLOSURES
  {
    id: 'masonry-aac-blocks',
    name: 'AAC Blocks (Autoclaved Aerated Concrete)',
    category: 'Masonry & Enclosures',
    categorySlug: 'masonry-enclosures',
    section: 'construction',
    manufacturer: 'Biltech Building Elements Ltd',
    location: 'Hyderabad, TS',
    price: '₹3,900',
    priceVal: 3900,
    unit: 'm³',
    moq: '15 m³ (Truck Load)',
    leadTime: '3-4 Days',
    isGreen: true,
    isFireRated: true,
    isAcoustic: true,
    isStructural: false,
    isLEED: true,
    isIGBC: true,
    description: 'Lightweight structural wall blocks. Provides superior thermal insulation, high speed of execution, and exceptional fire resistance.',
    specifications: {
      'Compressive Strength': '4.0 N/mm²',
      'Density': '650 kg/m³',
      'Thermal Conductivity': '0.16 W/mK',
      'Fire Rating': '4 Hours (Class A1)',
      'IS Standard': 'IS 2185 Part 3'
    }
  },

  // WATERPROOFING
  {
    id: 'waterproofing-pu',
    name: 'Liquid PU Waterproofing Membrane',
    category: 'Waterproofing',
    categorySlug: 'waterproofing',
    section: 'construction',
    manufacturer: 'Dr. Fixit (Pidilite)',
    location: 'Mumbai, MH',
    price: '₹320',
    priceVal: 320,
    unit: 'sqft',
    moq: '1000 sqft',
    leadTime: '2-4 Days',
    isGreen: false,
    isFireRated: false,
    isAcoustic: false,
    isStructural: false,
    isLEED: false,
    isIGBC: false,
    description: 'Elastomeric polyurethane liquid waterproofing membrane. Cures to form a seamless, highly elastic, UV-resistant protective envelope.',
    specifications: {
      'Crack Bridging Capacity': '2.0 mm',
      'Elongation at Break': '> 450%',
      'Tensile Strength': '5.5 N/mm²',
      'Solid Content': '92%',
      'Curing Time': '24 Hours'
    }
  },

  // ROOFING SYSTEMS
  {
    id: 'roof-standing-seam',
    name: 'Standing Seam Metal Roof System',
    category: 'Roofing Systems',
    categorySlug: 'roofing-systems',
    section: 'construction',
    manufacturer: 'Tata BlueScope Steel',
    location: 'Pune, MH',
    price: '₹220',
    priceVal: 220,
    unit: 'sqft',
    moq: '2000 sqft',
    leadTime: '5-7 Days',
    isGreen: false,
    isFireRated: false,
    isAcoustic: false,
    isStructural: false,
    isLEED: false,
    isIGBC: false,
    description: 'Premium profile metal roofing sheets with interlocking seams. Features zero-penetration clip fasteners, removing leak opportunities.',
    specifications: {
      'Sheet Material': 'Alu-Zinc Coated Steel (Galvalume)',
      'Thickness': '0.50 mm - 0.60 mm',
      'Yield Strength': '550 MPa',
      'Coating Mass': 'AZ150 (150 g/m²)',
      'Wind Load Capacity': 'Up to 2.5 kPa'
    }
  },

  // INSULATION MATERIALS
  {
    id: 'insulation-rockwool',
    name: 'Rockwool Thermal Insulation Board',
    category: 'Insulation Materials',
    categorySlug: 'insulation-materials',
    section: 'construction',
    manufacturer: 'Saint-Gobain India',
    location: 'Chennai, TN',
    price: '₹120',
    priceVal: 120,
    unit: 'sqft',
    moq: '800 sqft',
    leadTime: '4-6 Days',
    isGreen: true,
    isFireRated: true,
    isAcoustic: true,
    isStructural: false,
    isLEED: true,
    isIGBC: true,
    description: 'High-density mineral rockwool slab. Engineered for structural thermal envelope systems and commercial fire barrier installations.',
    specifications: {
      'Thermal Conductivity': '0.034 W/mK',
      'Density': '48 kg/m³ - 96 kg/m³',
      'Fire Rating': 'Non-combustible (Class A1)',
      'Melting Point': '> 1000°C',
      'IS Standard': 'IS 8183'
    }
  },

  // PIPES & PLUMBING
  {
    id: 'pipe-cpvc-sdr11',
    name: 'CPVC Plumbing Pipe SDR 11',
    category: 'Pipes & Plumbing',
    categorySlug: 'pipes-plumbing',
    section: 'construction',
    manufacturer: 'Ashirvad Pipes Pvt Ltd',
    location: 'Bengaluru, KA',
    price: '₹210',
    priceVal: 210,
    unit: 'meter',
    moq: '150 Meters',
    leadTime: '1-3 Days',
    isGreen: false,
    isFireRated: true,
    isAcoustic: false,
    isStructural: false,
    isLEED: false,
    isIGBC: false,
    description: 'Chlorinated Polyvinyl Chloride pipes. Engineered for hot and cold water utility networks, offering low thermal expansion and high scale resistance.',
    specifications: {
      'Pressure Rating': 'PN 20 at 27°C / PN 6 at 82°C',
      'Thermal Conductivity': '0.14 W/mK',
      'Material Grade': 'SDR 11 CPVC',
      'Jointing Method': 'Solvent Cement Weld',
      'IS Standard': 'IS 15801:2012'
    }
  },

  // CLADDING SYSTEMS
  {
    id: 'cladding-acp-fr',
    name: 'ACP Cladding Panel (FR-Grade)',
    category: 'Cladding Systems',
    categorySlug: 'cladding-systems',
    section: 'architectural',
    manufacturer: 'Aludecor Lamination Pvt Ltd',
    location: 'Kolkata, WB',
    price: '₹165',
    priceVal: 165,
    unit: 'sqft',
    moq: '1000 sqft',
    leadTime: '5-8 Days',
    isGreen: false,
    isFireRated: true,
    isAcoustic: false,
    isStructural: false,
    isLEED: false,
    isIGBC: false,
    description: 'Aluminum composite panel with a fire retardant mineral core. Perfect for modern external building envelopes, storefronts, and interior paneling.',
    specifications: {
      'Thickness': '4.0 mm',
      'Skin Thickness': '0.50 mm Aluminum Alloy',
      'Fire Safety rating': 'Class B-s1, d0 (EN 13501)',
      'UV Resistance': 'dE < 2.0 (10 Years)',
      'Tensile Strength': '130 MPa'
    }
  },
  {
    id: 'cladding-hpl',
    name: 'High-Pressure Laminate (HPL) Facade',
    category: 'Cladding Systems',
    categorySlug: 'cladding-systems',
    section: 'architectural',
    manufacturer: 'Fundermax India Pvt Ltd',
    location: 'Bengaluru, KA',
    price: '₹290',
    priceVal: 290,
    unit: 'sqft',
    moq: '500 sqft',
    leadTime: '7-10 Days',
    isGreen: true,
    isFireRated: true,
    isAcoustic: false,
    isStructural: false,
    isLEED: true,
    isIGBC: true,
    description: 'Premium wood-texture exterior architectural panels. Extremely weather resilient, impact resistant, and self-supporting structural elements.',
    specifications: {
      'Thickness': '6.0 mm - 8.0 mm',
      'Density': '1350 kg/m³',
      'Fire Rating': 'Class B-s1, d0',
      'Modulus of Elasticity': '> 9000 MPa',
      'Standard': 'EN 438-6'
    }
  },

  // GLASS & GLAZING
  {
    id: 'glass-dgu-lowe',
    name: 'Double Glazed Unit (DGU) Low-E',
    category: 'Glass & Glazing',
    categorySlug: 'glass-glazing',
    section: 'architectural',
    manufacturer: 'AIS Glass (Asahi India)',
    location: 'Chennai, TN',
    price: '₹480',
    priceVal: 480,
    unit: 'sqft',
    moq: '500 sqft',
    leadTime: '8-12 Days',
    isGreen: true,
    isFireRated: false,
    isAcoustic: true,
    isStructural: false,
    isLEED: true,
    isIGBC: true,
    description: 'High-performance double glazed unit featuring a Low-E reflective coating. Designed to optimize heat reflection and maximize day-lighting.',
    specifications: {
      'Configuration': '6mm Tempered + 12mm Air Spacer + 6mm Tempered',
      'U-Value': '1.6 W/m²K',
      'SHGC': '0.28 (Optimized)',
      'Light Transmission': '42%',
      'Acoustic Reduction': 'STC 38 dB'
    }
  },

  // DOORS & PARTITIONS
  {
    id: 'door-upvc-slider',
    name: 'uPVC Sliding Balcony Door System',
    category: 'Doors & Partitions',
    categorySlug: 'doors-partitions',
    section: 'architectural',
    manufacturer: 'Fenesta Building Systems',
    location: 'Gurugram, HR',
    price: '₹9,500',
    priceVal: 9500,
    unit: 'unit',
    moq: '5 Units',
    leadTime: '10-15 Days',
    isGreen: false,
    isFireRated: false,
    isAcoustic: true,
    isStructural: false,
    isLEED: false,
    isIGBC: false,
    description: 'Steel-reinforced uPVC multi-track sliding door profiles. Features high wind-load threshold, double airtight seals, and structural durability.',
    specifications: {
      'Toggle Frame Material': 'High-Impact uPVC (Lead-Free)',
      'Wind Resistance': 'Up to 3.0 kPa',
      'Acoustic Insulation': 'STC 32 dB',
      'Water Tightness': '300 Pa',
      'Reinforcement': '1.5mm Galvanized Steel Profiles'
    }
  },

  // CEILING SYSTEMS
  {
    id: 'ceiling-mineral-fiber',
    name: 'Mineral Fiber Acoustic Ceiling Tiles',
    category: 'Ceiling Systems',
    categorySlug: 'ceiling-systems',
    section: 'architectural',
    manufacturer: 'Armstrong World Industries',
    location: 'Mumbai, MH',
    price: '₹85',
    priceVal: 85,
    unit: 'sqft',
    moq: '1200 sqft',
    leadTime: '3-5 Days',
    isGreen: true,
    isFireRated: true,
    isAcoustic: true,
    isStructural: false,
    isLEED: true,
    isIGBC: true,
    description: 'High-absorption mineral fiber ceiling tiles. Standard grid layouts offering excellent echo reduction, light reflection, and sag resistance.',
    specifications: {
      'NRC Rating': '0.70',
      'Light Reflectance': '85%',
      'Humidity Resistance': 'RH 95 (Sag Resistant)',
      'Fire Rating': 'Class O / Class A',
      'IS Standard': 'IS 12932'
    }
  },

  // ACOUSTIC SYSTEMS
  {
    id: 'acoustic-wood-panel',
    name: 'Acoustic Grooved Wood Paneling',
    category: 'Acoustic Systems',
    categorySlug: 'acoustic-systems',
    section: 'architectural',
    manufacturer: 'Anutone Acoustics',
    location: 'Bengaluru, KA',
    price: '₹185',
    priceVal: 185,
    unit: 'sqft',
    moq: '600 sqft',
    leadTime: '6-8 Days',
    isGreen: false,
    isFireRated: true,
    isAcoustic: true,
    isStructural: false,
    isLEED: false,
    isIGBC: false,
    description: 'Grooved acoustic paneling for architectural interior wall treatment. Delivers precise sound absorption and premium wood finishes.',
    specifications: {
      'NRC Rating': '0.85',
      'Base Material': '16mm FR-Grade MDF Board',
      'Core Density': '750 kg/m³',
      'Groove Type': '16/2 (Groove spacing/width)',
      'Fire Class': 'Class B-s1, d0'
    }
  },

  // LIGHTING SOLUTIONS
  {
    id: 'light-led-2x2',
    name: 'Recessed Commercial LED Panel 2x2',
    category: 'Lighting Solutions',
    categorySlug: 'lighting-solutions',
    section: 'architectural',
    manufacturer: 'Wipro Lighting',
    location: 'Aurangabad, MH',
    price: '₹1,850',
    priceVal: 1850,
    unit: 'unit',
    moq: '50 Units',
    leadTime: '4-6 Days',
    isGreen: false,
    isFireRated: false,
    isAcoustic: false,
    isStructural: false,
    isLEED: false,
    isIGBC: false,
    description: 'Sleek glare-free office LED luminaire panels. Formulated for grid ceilings with low glare UGR ratings and high driver efficacy.',
    specifications: {
      'Luminous Efficacy': '120 Lm/W',
      'Color Rendering Index': 'CRI > 85',
      'Unified Glare Rating': 'UGR < 19',
      'Driver Lifespan': '50,000 Hours',
      'Power Consumption': '36W'
    }
  },

  // FLOORING SYSTEMS
  {
    id: 'floor-epoxy-2mm',
    name: 'Heavy-Duty Epoxy Flooring System 2mm',
    category: 'Flooring Systems',
    categorySlug: 'flooring-systems',
    section: 'architectural',
    manufacturer: 'Fosroc Chemicals India',
    location: 'Bengaluru, KA',
    price: '₹110',
    priceVal: 110,
    unit: 'sqft',
    moq: '1500 sqft',
    leadTime: '3-5 Days',
    isGreen: false,
    isFireRated: false,
    isAcoustic: false,
    isStructural: false,
    isLEED: false,
    isIGBC: false,
    description: 'Multi-layer self-leveling industrial epoxy resin system. Provides a high gloss, seamless floor with extreme chemical and heavy-traffic resilience.',
    specifications: {
      'Compressive Strength': '70 N/mm²',
      'Flexural Strength': '30 N/mm²',
      'Adhesion to Concrete': 'Concrete Failure (> 3 N/mm²)',
      'Taber Abrasion Loss': '60 mg (CS17 Wheel, 1kg load)',
      'Application Thickness': '2.0 mm'
    }
  },

  // LOUVERS & FACADES
  {
    id: 'louver-terracotta',
    name: 'Ventilated Terracotta Facade Screen',
    category: 'Louvers & Facades',
    categorySlug: 'louvers-facades',
    section: 'architectural',
    manufacturer: 'Clayman Facades',
    location: 'Chennai, TN',
    price: '₹580',
    priceVal: 580,
    unit: 'sqft',
    moq: '500 sqft',
    leadTime: '12-18 Days',
    isGreen: true,
    isFireRated: true,
    isAcoustic: false,
    isStructural: false,
    isLEED: true,
    isIGBC: true,
    description: 'Natural clay-based ventilated terracotta cladding modules. Provides thermal shading, moisture control, and modern aesthetic screens.',
    specifications: {
      'Thickness': '30 mm',
      'Water Absorption': '< 6%',
      'Fire Rating': 'Class A1 (Non-combustible)',
      'Wind Load Resistance': 'Passed CWCT up to 2.4 kPa',
      'Material': '100% Organic Terracotta Clay'
    }
  },

  // GREEN BUILDING MATERIALS: RECYCLED MATERIALS
  {
    id: 'green-recycled-steel',
    name: 'Recycled Structural H-Beams',
    category: 'Recycled Materials',
    categorySlug: 'recycled-materials',
    section: 'green',
    manufacturer: 'JSW Steel (Eco Range)',
    location: 'Bellary, KA',
    price: '₹54,000',
    priceVal: 54000,
    unit: 'ton',
    moq: '10 Tons',
    leadTime: '5-7 Days',
    isGreen: true,
    isFireRated: false,
    isAcoustic: false,
    isStructural: true,
    isLEED: true,
    isIGBC: true,
    description: 'Eco-certified structural hot rolled steel sections manufactured from electric arc furnaces with > 80% recycled content.',
    specifications: {
      'Recycled Content': '85% (Post-Consumer + Post-Industrial)',
      'Embodied Carbon': '0.45 kg CO₂/kg Steel (70% Lower)',
      'Yield Strength': '250 - 350 MPa',
      'IS Standard': 'IS 2062:2011',
      'LEED Eligibility': 'Eligible for Recycled Content Credits'
    }
  },

  // ENGINEERED BAMBOO
  {
    id: 'green-bamboo-beam',
    name: 'Engineered Bamboo Structural Beam',
    category: 'Engineered Bamboo',
    categorySlug: 'engineered-bamboo',
    section: 'green',
    manufacturer: 'EcoForest Bamboo',
    location: 'Guwahati, AS',
    price: '₹420',
    priceVal: 420,
    unit: 'sqft',
    moq: '300 sqft',
    leadTime: '10-15 Days',
    isGreen: true,
    isFireRated: true,
    isAcoustic: false,
    isStructural: true,
    isLEED: true,
    isIGBC: true,
    description: 'High-density strand-woven engineered structural bamboo. Features carbon-negative cultivation profiles matching structural timber in mechanical properties.',
    specifications: {
      'Tensile Strength': '145 MPa (Parallel to Grain)',
      'Modulus of Elasticity': '12,500 MPa',
      'Density': '1050 kg/m³',
      'Thermal Conductivity': '0.13 W/mK',
      'LEED Eligibility': 'Eligible for Rapidly Renewable Material'
    }
  },

  // LOW CARBON CONCRETE
  {
    id: 'green-geopolymer-concrete',
    name: 'Geopolymer Low Carbon Concrete M30',
    category: 'Low Carbon Concrete',
    categorySlug: 'low-carbon-concrete',
    section: 'green',
    manufacturer: 'Aparna RMC (EcoBlend)',
    location: 'Gachibowli, Hyd',
    price: '₹6,500',
    priceVal: 6500,
    unit: 'm³',
    moq: '6 m³',
    leadTime: '24 Hours',
    isGreen: true,
    isFireRated: true,
    isAcoustic: false,
    isStructural: true,
    isLEED: true,
    isIGBC: true,
    description: 'Geopolymer concrete entirely replacing Portland cement with industrial fly ash and slag binders. Achieves massive carbon savings.',
    specifications: {
      'Compressive Strength': '30 MPa at 28 days',
      'CO₂ Footprint reduction': '65% vs Standard OPC Concrete',
      'Heat of Hydration': 'Low (Mass Pour Optimized)',
      'Durability Class': 'Very High (Sulfate Resistant)',
      'LEED Eligibility': 'Regional Materials & Waste Credits'
    }
  },

  // BIO-COMPOSITES
  {
    id: 'green-bio-board',
    name: 'Natural Fiber Bio-Composite Board',
    category: 'Bio-Composites',
    categorySlug: 'bio-composites',
    section: 'green',
    manufacturer: 'BioBoard India',
    location: 'Visakhapatnam, AP',
    price: '₹260',
    priceVal: 260,
    unit: 'sqft',
    moq: '500 sqft',
    leadTime: '6-8 Days',
    isGreen: true,
    isFireRated: true,
    isAcoustic: true,
    isStructural: false,
    isLEED: true,
    isIGBC: true,
    description: 'Eco-boards manufactured from agricultural waste and natural fibers bonded with organic bio-resins. Formaldehyde-free indoor paneling.',
    specifications: {
      'Recycled Content': '90% Agricultural By-Products',
      'Formaldehyde Emissions': '0.00 mg/L (Zero Emissions)',
      'Modulus of Rupture': '24 N/mm²',
      'Water Absorption': '< 8% (24 Hours)',
      'Density': '780 kg/m³'
    }
  },

  // C&D WASTE PRODUCTS
  {
    id: 'green-cd-aggregates',
    name: 'Recycled Concrete Aggregates (RCA)',
    category: 'C&D Waste Products',
    categorySlug: 'cd-waste-products',
    section: 'green',
    manufacturer: 'Hyderabad C&D Recycling Plant',
    location: 'Jeedimetla, Hyd',
    price: '₹800',
    priceVal: 800,
    unit: 'ton',
    moq: '10 Tons',
    leadTime: '1-2 Days',
    isGreen: true,
    isFireRated: false,
    isAcoustic: false,
    isStructural: false,
    isLEED: true,
    isIGBC: true,
    description: 'Graded recycled aggregates crushed and washed from construction and demolition waste materials. Optimized for road base layers and concrete pavements.',
    specifications: {
      'Reprocessed Content': '100% C&D Waste',
      'Aggregate Crushing Value': '24%',
      'Silt Content': '0.5%',
      'Applicable Code': 'IS 383 (Annexure G Compliant)',
      'LEED Eligibility': 'Construction Waste Management Credits'
    }
  },

  // SUSTAINABLE INSULATION
  {
    id: 'green-cork-insulation',
    name: 'Expanded Natural Cork Insulation Board',
    category: 'Sustainable Insulation',
    categorySlug: 'sustainable-insulation',
    section: 'green',
    manufacturer: 'Amorim Cork India',
    location: 'Mumbai, MH',
    price: '₹310',
    priceVal: 310,
    unit: 'sqft',
    moq: '400 sqft',
    leadTime: '10-15 Days',
    isGreen: true,
    isFireRated: true,
    isAcoustic: true,
    isStructural: false,
    isLEED: true,
    isIGBC: true,
    description: '100% organic expanded cork boards. High-performance thermal barrier with positive ecological footprint and sound absorption properties.',
    specifications: {
      'Thermal Conductivity': '0.038 W/mK',
      'Embodied Carbon': 'Negative (-1.5 kg CO₂-eq/kg)',
      'Fire Safety Rating': 'Class B-s1, d0 (Euroclass)',
      'NRC Rating': '0.55',
      'Thickness': '50 mm'
    }
  },

  // GREEN FACADE SYSTEMS
  {
    id: 'green-living-wall',
    name: 'Modular Living Wall Facade System',
    category: 'Green Facade Systems',
    categorySlug: 'green-facade-systems',
    section: 'green',
    manufacturer: 'BioFacade Systems',
    location: 'Bengaluru, KA',
    price: '₹2,200',
    priceVal: 2200,
    unit: 'sqft',
    moq: '200 sqft',
    leadTime: '15-20 Days',
    isGreen: true,
    isFireRated: false,
    isAcoustic: true,
    isStructural: false,
    isLEED: true,
    isIGBC: true,
    description: 'Pre-vegetated modular green wall cassettes. Features automatic drip-irrigation networks, organic planting matrices, and structural facade brackets.',
    specifications: {
      'System Type': 'Modular Tray/Cassette System',
      'Irrigation Feed': 'Automated Recirculatory Drip Feed',
      'Structural Brackets': 'Marine-grade T6 Aluminum Support',
      'Acoustic Attenuation': 'STC 12 dB reduction',
      'Green Building Credits': 'LEED Sustainable Sites & Water Use'
    }
  },

  // WATER CONSERVATION SYSTEMS
  {
    id: 'green-rainwater-filter',
    name: 'Commercial Rooftop Rainwater Filtration System',
    category: 'Water Conservation Systems',
    categorySlug: 'water-conservation',
    section: 'green',
    manufacturer: 'Wavin India',
    location: 'Hyderabad, TS',
    price: '₹45,000',
    priceVal: 45000,
    unit: 'unit',
    moq: '1 Unit',
    leadTime: '3-5 Days',
    isGreen: true,
    isFireRated: false,
    isAcoustic: false,
    isStructural: false,
    isLEED: true,
    isIGBC: true,
    description: 'High-throughput mechanical filtration module designed for corporate and multi-story rooftop rainwater harvesting lines.',
    specifications: {
      'Filtration Capacity': '15,000 Liters/Hour',
      'Rooftop Area Coverage': 'Up to 2000 m²',
      'Filter Element': 'Dual-layer Stainless Steel Mesh (50 microns)',
      'Water Displacement Ratio': 'Up to 70% potable water savings',
      'Compliance': 'LEED / IGBC Rainwater Harvesting Mandates'
    }
  },

  // EXPANDED GREEN BUILDING MATERIALS: RECYCLED MATERIALS & C&D WASTE STREAM
  {
    id: 'green-recycled-aggregates-20mm',
    name: 'Recycled Aggregates (20mm Coarse)',
    category: 'Recycled Materials',
    categorySlug: 'recycled-materials',
    section: 'green',
    manufacturer: 'Metro C&D Recyclers',
    location: 'Hyderabad, TS',
    price: '₹850',
    priceVal: 850,
    unit: 'ton',
    moq: '10 Tons',
    leadTime: '2-3 Days',
    isGreen: true,
    isFireRated: false,
    isAcoustic: false,
    isStructural: false,
    isLEED: true,
    isIGBC: true,
    description: 'Processed coarse aggregates sourced from crushed concrete C&D waste streams, washed and graded for non-structural concrete applications.',
    specifications: {
      'Recycled Content': '90% Reprocessed concrete',
      'Aggregate Impact Value': '22%',
      'Water Absorption': '3.2%',
      'IS Standard': 'IS 383:2016 Compliant',
      'LEED Eligibility': 'Waste Management Credits'
    }
  },
  {
    id: 'green-cd-waste-aggregates',
    name: 'C&D Waste Aggregates (Sub-base Grade)',
    category: 'Recycled Materials',
    categorySlug: 'recycled-materials',
    section: 'green',
    manufacturer: 'Telangana C&D Recyclers',
    location: 'Medchal, TS',
    price: '₹750',
    priceVal: 750,
    unit: 'ton',
    moq: '15 Tons',
    leadTime: '1-2 Days',
    isGreen: true,
    isFireRated: false,
    isAcoustic: false,
    isStructural: false,
    isLEED: true,
    isIGBC: true,
    description: 'Sieve-graded sub-base aggregates recovered entirely from masonry and concrete demolition waste. High compaction, perfect for sub-grades.',
    specifications: {
      'Recycled Content': '100% C&D Waste',
      'Dry Density': '1650 kg/m³',
      'Aggregate Crushing Value': '26%',
      'IS Standard': 'IS 383',
      'GRIHA Alignment': 'Up to 2 Credits'
    }
  },
  {
    id: 'green-recycled-pavement-tiles',
    name: 'Recycled Pavement Tiles (Heavy Duty)',
    category: 'Recycled Materials',
    categorySlug: 'recycled-materials',
    section: 'green',
    manufacturer: 'GreenCrete Eco Pavers',
    location: 'Visakhapatnam, AP',
    price: '₹45',
    priceVal: 45,
    unit: 'sqft',
    moq: '500 sqft',
    leadTime: '4-6 Days',
    isGreen: true,
    isFireRated: true,
    isAcoustic: false,
    isStructural: false,
    isLEED: true,
    isIGBC: true,
    description: 'Aesthetic and durable pedestrian walkway pavement tiles made with 50% recycled demolition waste aggregates and fly-ash binders.',
    specifications: {
      'Recycled Content': '50% Reprocessed inputs',
      'Compressive Strength': '30 MPa',
      'Thickness': '60 mm',
      'Abrasion Resistance': 'High (Class I)',
      'Fire Rating': 'Class A1 Non-combustible'
    }
  },
  {
    id: 'green-cd-waste-paver-blocks',
    name: 'C&D Waste Paver Blocks (80mm)',
    category: 'Recycled Materials',
    categorySlug: 'recycled-materials',
    section: 'green',
    manufacturer: 'Deccan C&D Pavers',
    location: 'Nalgonda, TS',
    price: '₹12',
    priceVal: 12,
    unit: 'block',
    moq: '2000 Blocks',
    leadTime: '3-5 Days',
    isGreen: true,
    isFireRated: true,
    isAcoustic: false,
    isStructural: false,
    isLEED: true,
    isIGBC: true,
    description: 'Interlocking concrete paver blocks for vehicular driveways, molded with 60% construction waste aggregates and carbon-curing technology.',
    specifications: {
      'Recycled Content': '60% Reprocessed concrete',
      'Compressive Strength': '40 MPa',
      'Thickness': '80 mm',
      'Water Absorption': '< 5%',
      'Standards': 'IS 15658 Compliant'
    }
  },
  {
    id: 'green-recycled-wall-putty',
    name: 'Recycled Mineral Wall Putty',
    category: 'Recycled Materials',
    categorySlug: 'recycled-materials',
    section: 'green',
    manufacturer: 'EcoCoat Putty Ltd',
    location: 'Mumbai, MH',
    price: '₹420',
    priceVal: 420,
    unit: 'bag',
    moq: '100 Bags',
    leadTime: '2-4 Days',
    isGreen: true,
    isFireRated: false,
    isAcoustic: false,
    isStructural: false,
    isLEED: true,
    isIGBC: true,
    description: 'Smooth white wall putty containing 20% recycled mineral dust recovered from stone quarrying and processing plants.',
    specifications: {
      'Recycled Content': '20% Quarry waste dust',
      'Coverage': '12 sqft/kg/mm',
      'Pot Life': '2 Hours',
      'VOC Emissions': 'Zero (Low-VOC certified)',
      'Standards': 'IS 8662 Compliant'
    }
  },
  {
    id: 'green-recycled-concrete-products',
    name: 'Recycled Precast Concrete Blocks',
    category: 'Recycled Materials',
    categorySlug: 'recycled-materials',
    section: 'green',
    manufacturer: 'Aparna Eco Blocks',
    location: 'Gachibowli, Hyd',
    price: '₹110',
    priceVal: 110,
    unit: 'block',
    moq: '200 Blocks',
    leadTime: '3-4 Days',
    isGreen: true,
    isFireRated: true,
    isAcoustic: false,
    isStructural: true,
    isLEED: true,
    isIGBC: true,
    description: 'Solid concrete masonry blocks for structural load-bearing walls, using recycled concrete aggregates to minimize virgin sand consumption.',
    specifications: {
      'Compressive Strength': '15 N/mm²',
      'Density': '2100 kg/m³',
      'Recycled Aggregate %': '40%',
      'Thermal Performance': 'Moderate',
      'IS Standard': 'IS 2185 Part 1'
    }
  },
  {
    id: 'green-fly-ash-bricks',
    name: 'Fly Ash Bricks (Class I)',
    category: 'Recycled Materials',
    categorySlug: 'recycled-materials',
    section: 'green',
    manufacturer: 'Birla Fly Ash Bricks',
    location: 'Patancheru, Hyd',
    price: '₹8',
    priceVal: 8,
    unit: 'block',
    moq: '3000 Bricks',
    leadTime: '2-3 Days',
    isGreen: true,
    isFireRated: true,
    isAcoustic: false,
    isStructural: true,
    isLEED: true,
    isIGBC: true,
    description: 'Eco-friendly alternative to red clay bricks, using fly ash from local thermal power stations to create highly uniform load-bearing bricks.',
    specifications: {
      'Recycled Fly Ash': '60%',
      'Compressive Strength': '7.5 N/mm²',
      'Water Absorption': '12%',
      'Density': '1700 kg/m³',
      'IS Standard': 'IS 12894:2002'
    }
  },
  {
    id: 'green-fly-ash-blocks',
    name: 'Fly Ash Cellular Blocks',
    category: 'Recycled Materials',
    categorySlug: 'recycled-materials',
    section: 'green',
    manufacturer: 'Sagar EcoBlocks',
    location: 'Nalgonda, TS',
    price: '₹65',
    priceVal: 65,
    unit: 'block',
    moq: '500 Blocks',
    leadTime: '3-4 Days',
    isGreen: true,
    isFireRated: true,
    isAcoustic: true,
    isStructural: false,
    isLEED: true,
    isIGBC: true,
    description: 'Large-format cellular blocks using fly ash and slag binders. Exceptional thermal shielding and 3x faster wall laying speed.',
    specifications: {
      'Fly Ash & Slag': '55%',
      'Size': '400 x 200 x 200 mm',
      'Density': '1200 kg/m³',
      'Thermal Resistance': '0.24 W/mK',
      'Fire Rating': '4 Hours (Class A1)'
    }
  },
  {
    id: 'green-recycled-kerb-stones',
    name: 'Recycled Concrete Kerb Stones',
    category: 'Recycled Materials',
    categorySlug: 'recycled-materials',
    section: 'green',
    manufacturer: 'Vaishnavi Eco-Products',
    location: 'Medchal, TS',
    price: '₹280',
    priceVal: 280,
    unit: 'block',
    moq: '100 Stones',
    leadTime: '4-6 Days',
    isGreen: true,
    isFireRated: false,
    isAcoustic: false,
    isStructural: false,
    isLEED: true,
    isIGBC: true,
    description: 'Roadside structural kerb stones cast from M30 concrete containing 40% reprocessed pavement aggregates.',
    specifications: {
      'Recycled Content': '40% Reprocessed aggregate',
      'Compressive Strength': '30 MPa',
      'Size': '300 x 150 x 450 mm',
      'Durability': 'High freeze-thaw resistance',
      'IS Standard': 'IS 5758 Compliant'
    }
  },
  {
    id: 'green-recycled-interlocking-pavers',
    name: 'Recycled Interlocking Pavers',
    category: 'Recycled Materials',
    categorySlug: 'recycled-materials',
    section: 'green',
    manufacturer: 'Vaishnavi Eco-Pavers',
    location: 'Hyderabad, TS',
    price: '₹55',
    priceVal: 55,
    unit: 'sqft',
    moq: '1000 sqft',
    leadTime: '3-5 Days',
    isGreen: true,
    isFireRated: false,
    isAcoustic: false,
    isStructural: false,
    isLEED: true,
    isIGBC: true,
    description: 'Heavy-duty interlocking paving stones for commercial parking lots and plazas, containing reprocessed concrete aggregate.',
    specifications: {
      'Recycled Aggregate %': '45%',
      'Compressive Strength': '45 MPa',
      'Thickness': '80 mm',
      'Interlock Profile': 'Uni-Paver standard',
      'LEED Credits': 'MR Credit 4 (Recycled Content)'
    }
  },
  {
    id: 'green-recycled-subbase',
    name: 'Recycled Sub-Base Material (GSB)',
    category: 'Recycled Materials',
    categorySlug: 'recycled-materials',
    section: 'green',
    manufacturer: 'Rachakonda Recyclers',
    location: 'Malkajgiri, TS',
    price: '₹650',
    priceVal: 650,
    unit: 'ton',
    moq: '20 Tons',
    leadTime: '1-2 Days',
    isGreen: true,
    isStructural: true,
    isFireRated: false,
    isAcoustic: false,
    isLEED: true,
    isIGBC: true,
    description: 'Granular Sub-Base (GSB) material recycled from masonry and concrete demolition waste. Exceptional compaction density and load bearing.',
    specifications: {
      'Recycled Content': '95% Demolition waste',
      'Compaction Level': '98% Modified Proctor',
      'Liquid Limit': '< 25%',
      'Plasticity Index': 'Non-plastic',
      'Standard': 'MORT&H Specifications Compliant'
    }
  },
  {
    id: 'green-sustainable-plaster',
    name: 'Sustainable Plaster System',
    category: 'Recycled Materials',
    categorySlug: 'recycled-materials',
    section: 'green',
    manufacturer: 'Berger EcoPlaster',
    location: 'Visakhapatnam, AP',
    price: '₹290',
    priceVal: 290,
    unit: 'bag',
    moq: '150 Bags',
    leadTime: '3-4 Days',
    isGreen: true,
    isFireRated: false,
    isAcoustic: false,
    isStructural: false,
    isLEED: true,
    isIGBC: true,
    description: 'Ready-mix wall plastering mortar formulated with 30% recycled sand alternatives and mineral additives, preventing shrinkage cracks.',
    specifications: {
      'Recycled Content': '30% Washed sand alternative',
      'Coverage': '15 sqft/bag at 12mm',
      'Pot Life': '90 Minutes',
      'Water Retention': '> 95%',
      'IS Standard': 'IS 1542 Compliant'
    }
  },
  {
    id: 'green-eco-mortar',
    name: 'Eco-Friendly Thin Joint Mortar',
    category: 'Recycled Materials',
    categorySlug: 'recycled-materials',
    section: 'green',
    manufacturer: 'UltraTech EcoChoice',
    location: 'Patancheru, Hyd',
    price: '₹310',
    priceVal: 310,
    unit: 'bag',
    moq: '100 Bags',
    leadTime: '2-3 Days',
    isGreen: true,
    isFireRated: false,
    isAcoustic: false,
    isStructural: false,
    isLEED: true,
    isIGBC: true,
    description: 'Thin-bed jointing mortar for AAC blocks, formulated with 25% post-industrial slag/ash content and water-retention polymers.',
    specifications: {
      'Recycled Content': '25% Industrial byproducts',
      'Tensile Adhesion': '1.2 N/mm² at 28 days',
      'Joint Thickness': '3 - 5 mm',
      'Coverage': '120 sqft/bag (for 150mm blocks)',
      'Standards': 'ASTM C1660 Compliant'
    }
  },
  {
    id: 'green-recycled-sand',
    name: 'Recycled Sand Alternative (EcoSand)',
    category: 'Recycled Materials',
    categorySlug: 'recycled-materials',
    section: 'green',
    manufacturer: 'Robo EcoSand',
    location: 'Miyapur, Hyd',
    price: '₹950',
    priceVal: 950,
    unit: 'ton',
    moq: '10 Tons',
    leadTime: '1-2 Days',
    isGreen: true,
    isFireRated: false,
    isAcoustic: false,
    isStructural: false,
    isLEED: true,
    isIGBC: true,
    description: 'Reprocessed sand alternative derived from crushed concrete waste and washed glass dust. Zero ecological extraction footprint.',
    specifications: {
      'Recycled Content': '100% Reprocessed minerals',
      'Silt Content': '0% (Triple-Washed)',
      'Grading Zone': 'Zone II Fine aggregate',
      'Specific Gravity': '2.62',
      'IS Standard': 'IS 383'
    }
  },
  {
    id: 'green-cement-eco',
    name: 'Green Cement Product (EcoGreen 53)',
    category: 'Recycled Materials',
    categorySlug: 'recycled-materials',
    section: 'green',
    manufacturer: 'ACC EcoGreen',
    location: 'Secunderabad, TS',
    price: '₹330',
    priceVal: 330,
    unit: 'bag',
    moq: '400 Bags',
    leadTime: '2-4 Days',
    isGreen: true,
    isFireRated: false,
    isAcoustic: false,
    isStructural: true,
    isLEED: true,
    isIGBC: true,
    description: 'Eco-certified cement formulated with high-volume slag and calcined clay binders, lowering embodied CO2 footprints by 35%.',
    specifications: {
      'CO₂ Footprint reduction': '35% vs Standard OPC',
      'Slag / Clay Blends': '50% (Post-Industrial Recycled)',
      'Compressive Strength': '53 MPa at 28 days',
      'Initial Setting': '50 Minutes',
      'IS Standard': 'IS 455 (PSC Grade)'
    }
  },
  {
    id: 'green-cd-waste-blocks',
    name: 'Construction Waste-Based Masonry Blocks',
    category: 'Recycled Materials',
    categorySlug: 'recycled-materials',
    section: 'green',
    manufacturer: 'Municipal Recycling Corp',
    location: 'Jeedimetla, Hyd',
    price: '₹40',
    priceVal: 40,
    unit: 'block',
    moq: '400 Blocks',
    leadTime: '3-4 Days',
    isGreen: true,
    isFireRated: true,
    isAcoustic: false,
    isStructural: false,
    isLEED: true,
    isIGBC: true,
    description: 'Hollow masonry partition blocks using 70% crushed C&D brick and concrete dust waste, cured with geothermal solar chambers.',
    specifications: {
      'C&D Waste Content': '70% Reprocessed dust',
      'Compressive Strength': '5 N/mm²',
      'Size': '300 x 150 x 150 mm',
      'Density': '1450 kg/m³',
      'Fire Rating': '3 Hours'
    }
  },
  {
    id: 'green-upcycled-panels',
    name: 'Upcycled Composite Building Panels',
    category: 'Recycled Materials',
    categorySlug: 'recycled-materials',
    section: 'green',
    manufacturer: 'ReWood Panels',
    location: 'Visakhapatnam, AP',
    price: '₹280',
    priceVal: 280,
    unit: 'sqft',
    moq: '400 sqft',
    leadTime: '5-8 Days',
    isGreen: true,
    isFireRated: true,
    isAcoustic: true,
    isStructural: false,
    isLEED: true,
    isIGBC: true,
    description: 'Sustainable composite wall partition panels made from 90% upcycled plastic bottles and municipal wood scrap fibers.',
    specifications: {
      'Upcycled Content': '90% Recycled plastic & wood',
      'Density': '850 kg/m³',
      'Modulus of Elasticity': '3200 MPa',
      'Acoustic Attenuation': 'STC 18 dB',
      'Fire Class': 'Class B-s1, d0'
    }
  },
  {
    id: 'green-recycled-landscape',
    name: 'Recycled Landscape Timber Edging',
    category: 'Recycled Materials',
    categorySlug: 'recycled-materials',
    section: 'green',
    manufacturer: 'Bio-Landscape Systems',
    location: 'Hyderabad, TS',
    price: '₹750',
    priceVal: 750,
    unit: 'block',
    moq: '50 Blocks',
    leadTime: '4-6 Days',
    isGreen: true,
    isFireRated: false,
    isAcoustic: false,
    isStructural: false,
    isLEED: true,
    isIGBC: true,
    description: 'Hardscape landscape borders molded from 80% recycled post-consumer plastics, UV-resistant and weather stable.',
    specifications: {
      'Recycled Content': '80% Post-consumer plastic',
      'Tensile Strength': '28 N/mm²',
      'UV Resistance': 'dE < 1.0 (15 Years)',
      'Water Absorption': '0% (Non-porous)',
      'LEED Compatibility': 'Materials & Resources credits'
    }
  }
];

