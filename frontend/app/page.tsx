import Hero from '@/components/home/Hero';
import FeaturedCollection from '@/components/home/FeaturedCollection';
import SocietyGrid from '@/components/home/SocietyGrid';
import WhyUs from '@/components/home/WhyUs';
import OverseasSection from '@/components/home/OverseasSection';
import Testimonials from '@/components/home/Testimonials';
import FinalCTA from '@/components/home/FinalCTA';
import { Property, Society, Testimonial } from '@/lib/types';

// Demo data for properties
const demoProperties: Property[] = [
  {
    title: '1 Kanal Luxury House in DHA Phase 6',
    slug: '1-kanal-luxury-house-dha-phase-6',
    price: 75000000,
    priceType: 'negotiable',
    phase: 'Phase 6',
    propertyType: 'house',
    sizeValue: 1,
    sizeUnit: 'kanal',
    bedrooms: 5,
    bathrooms: 6,
    description: 'A stunning 1 Kanal luxury house featuring modern architecture and premium finishes.',
    investmentHighlights: 'Prime location with excellent appreciation potential.',
    status: 'available',
    featured: true,
    coordinates: null,
    seoTitle: '1 Kanal Luxury House DHA Phase 6',
    seoDescription: 'Premium 1 Kanal house for sale in DHA Phase 6 Lahore',
    society: { data: { id: 1, attributes: { name: 'DHA Lahore', slug: 'dha-lahore', overview: '', investmentInsight: '', familyInsight: '', averagePricePerMarla: 2500000, appreciationPercent: 15, mapEmbed: '', featured: true, seoTitle: '', seoDescription: '', coverImage: { data: null }, createdAt: '', updatedAt: '' } } },
    featuredImage: { data: null },
    gallery: { data: [] },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    title: '10 Marla Plot in Bahria Town Phase 8',
    slug: '10-marla-plot-bahria-town-phase-8',
    price: 18000000,
    priceType: 'fixed',
    phase: 'Phase 8',
    propertyType: 'plot',
    sizeValue: 10,
    sizeUnit: 'marla',
    bedrooms: 0,
    bathrooms: 0,
    description: 'Ideal 10 Marla plot in the prime location of Bahria Town Phase 8.',
    investmentHighlights: 'Ready for construction with all utilities available.',
    status: 'available',
    featured: true,
    coordinates: null,
    seoTitle: '10 Marla Plot Bahria Town Phase 8',
    seoDescription: '10 Marla residential plot for sale in Bahria Town Phase 8',
    society: { data: { id: 2, attributes: { name: 'Bahria Town', slug: 'bahria-town', overview: '', investmentInsight: '', familyInsight: '', averagePricePerMarla: 1800000, appreciationPercent: 12, mapEmbed: '', featured: true, seoTitle: '', seoDescription: '', coverImage: { data: null }, createdAt: '', updatedAt: '' } } },
    featuredImage: { data: null },
    gallery: { data: [] },
    createdAt: '2024-01-02',
    updatedAt: '2024-01-02',
  },
  {
    title: '2 Kanal Farmhouse on Bedian Road',
    slug: '2-kanal-farmhouse-bedian-road',
    price: 120000000,
    priceType: 'negotiable',
    phase: 'Zone 5',
    propertyType: 'farmhouse',
    sizeValue: 2,
    sizeUnit: 'kanal',
    bedrooms: 4,
    bathrooms: 4,
    description: 'Exquisite 2 Kanal farmhouse with lush gardens and modern amenities.',
    investmentHighlights: 'Perfect for weekend retreats and high rental yields.',
    status: 'available',
    featured: true,
    coordinates: null,
    seoTitle: '2 Kanal Farmhouse Bedian Road',
    seoDescription: 'Luxury farmhouse for sale on Bedian Road Lahore',
    society: { data: { id: 3, attributes: { name: 'Bedian Road', slug: 'bedian-road', overview: '', investmentInsight: '', familyInsight: '', averagePricePerMarla: 1500000, appreciationPercent: 18, mapEmbed: '', featured: false, seoTitle: '', seoDescription: '', coverImage: { data: null }, createdAt: '', updatedAt: '' } } },
    featuredImage: { data: null },
    gallery: { data: [] },
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03',
  },
  {
    title: '500 Sqft Commercial Space Gulberg III',
    slug: '500-sqft-commercial-gulberg-iii',
    price: 32000000,
    priceType: 'on-request',
    phase: 'Main Boulevard',
    propertyType: 'commercial',
    sizeValue: 500,
    sizeUnit: 'sqft',
    bedrooms: 0,
    bathrooms: 2,
    description: 'Prime commercial space on Gulberg Main Boulevard with high footfall.',
    investmentHighlights: 'Excellent rental yield in the commercial hub of Lahore.',
    status: 'available',
    featured: true,
    coordinates: null,
    seoTitle: 'Commercial Space Gulberg III',
    seoDescription: 'Prime commercial property for sale in Gulberg III Lahore',
    society: { data: { id: 4, attributes: { name: 'Gulberg', slug: 'gulberg', overview: '', investmentInsight: '', familyInsight: '', averagePricePerMarla: 8000000, appreciationPercent: 10, mapEmbed: '', featured: true, seoTitle: '', seoDescription: '', coverImage: { data: null }, createdAt: '', updatedAt: '' } } },
    featuredImage: { data: null },
    gallery: { data: [] },
    createdAt: '2024-01-04',
    updatedAt: '2024-01-04',
  },
  {
    title: '5 Marla Modern House DHA Phase 9',
    slug: '5-marla-modern-house-dha-phase-9',
    price: 21000000,
    priceType: 'fixed',
    phase: 'Phase 9',
    propertyType: 'house',
    sizeValue: 5,
    sizeUnit: 'marla',
    bedrooms: 3,
    bathrooms: 3,
    description: 'Brand new 5 Marla modern house with contemporary design.',
    investmentHighlights: 'Move-in ready with premium fixtures and fittings.',
    status: 'available',
    featured: true,
    coordinates: null,
    seoTitle: '5 Marla House DHA Phase 9',
    seoDescription: 'Modern 5 Marla house for sale in DHA Phase 9',
    society: { data: { id: 1, attributes: { name: 'DHA Lahore', slug: 'dha-lahore', overview: '', investmentInsight: '', familyInsight: '', averagePricePerMarla: 2500000, appreciationPercent: 15, mapEmbed: '', featured: true, seoTitle: '', seoDescription: '', coverImage: { data: null }, createdAt: '', updatedAt: '' } } },
    featuredImage: { data: null },
    gallery: { data: [] },
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05',
  },
];

// Demo data for societies
const demoSocieties: Society[] = [
  {
    name: 'DHA Lahore',
    slug: 'dha-lahore',
    overview: 'Defence Housing Authority Lahore is the most prestigious residential community in Pakistan.',
    investmentInsight: 'Consistently high appreciation with strong rental demand.',
    familyInsight: 'World-class amenities including parks, schools, and healthcare facilities.',
    averagePricePerMarla: 2500000,
    appreciationPercent: 15,
    mapEmbed: '',
    featured: true,
    seoTitle: 'DHA Lahore Properties',
    seoDescription: 'Luxury properties for sale in DHA Lahore',
    coverImage: { data: null },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    name: 'Bahria Town',
    slug: 'bahria-town',
    overview: 'Pakistan\'s largest private real estate development with world-class infrastructure.',
    investmentInsight: 'Modern amenities and planned community with excellent ROI.',
    familyInsight: 'Secure gated community with schools, hospitals, and entertainment.',
    averagePricePerMarla: 1800000,
    appreciationPercent: 12,
    mapEmbed: '',
    featured: true,
    seoTitle: 'Bahria Town Lahore Properties',
    seoDescription: 'Properties for sale in Bahria Town Lahore',
    coverImage: { data: null },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    name: 'Gulberg',
    slug: 'gulberg',
    overview: 'The commercial and residential heart of Lahore with premium properties.',
    investmentInsight: 'Prime commercial location with highest rental yields.',
    familyInsight: 'Central location with access to top dining and shopping.',
    averagePricePerMarla: 8000000,
    appreciationPercent: 10,
    mapEmbed: '',
    featured: true,
    seoTitle: 'Gulberg Lahore Properties',
    seoDescription: 'Premium properties in Gulberg Lahore',
    coverImage: { data: null },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
];

// Demo testimonials
const demoTestimonials: Testimonial[] = [
  {
    clientName: 'Ahmed Khan',
    location: 'Manchester, UK',
    review: 'Working with Fort Era made buying property in Lahore from abroad incredibly smooth. Their virtual tours and documentation support was exceptional.',
    featured: true,
    photo: { data: null },
    createdAt: '2024-01-01',
  },
  {
    clientName: 'Sarah Malik',
    location: 'Dubai, UAE',
    review: 'The team understood exactly what I was looking for and found me the perfect investment property in DHA. Highly professional service throughout.',
    featured: true,
    photo: { data: null },
    createdAt: '2024-01-02',
  },
  {
    clientName: 'Faisal Rahman',
    location: 'Lahore, Pakistan',
    review: 'Sold my property through them and got an excellent price. Their market knowledge and network of buyers is truly impressive.',
    featured: true,
    photo: { data: null },
    createdAt: '2024-01-03',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCollection properties={demoProperties} />
      <SocietyGrid societies={demoSocieties} />
      <WhyUs />
      <OverseasSection />
      <Testimonials testimonials={demoTestimonials} />
      <FinalCTA />
    </>
  );
}
