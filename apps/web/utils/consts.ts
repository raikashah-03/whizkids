import { Mail, MapPin, Phone } from 'lucide-react';

import facebook from '@/public/icons/facebook.png';
import instagram from '@/public/icons/instagram.png';
import whatsapp from '@/public/icons/whatsapp.png';
import youtube from '@/public/icons/youtube.png';

export const instagramData = {
  image: instagram,
  link: "https://instagram.com"
}

export const facebookData = {
  image: facebook,
  link: "https://facebook.com"
}

export const youtubeData = {
  image: youtube,
  link: "https://youtube.com"
}

export const whatsappData = {
  image: whatsapp,
  link: "https://whatsapp.com"
}

// ─── Floating WhatsApp contact number ─────────────────────────────────────────
// Replace with the actual WhatsApp number (include country code, no spaces/dashes)
export const whatsappNumber = "+919876543210"

export const addressData = {
  address: "12/2, 1st main, Nandi Durga Rd, Jayamahal, Bengaluru, Karnataka 560046",
  phone: "+91 9876543210",
  email: "info@jayamahal.com",
  icons: {
    address: MapPin,
    phone: Phone,
    email: Mail
  }
}

export const iframeMaplink = "https://maps.google.com/"

export const quickLinks = [
  { title: 'Home', link: '/' },
  { title: 'About', link: '/about' },
  { title: 'Programs', link: '/programs' },
  { title: 'Curriculum', link: '/curriculum' },
  { title: 'Activities', link: '/activities' },
  { title: 'Admissions', link: '/admissions' }
]

export const programsData = [
  { title: 'Playgroup', link: '/programs/playgroup' },
  { title: 'Nursery', link: '/programs/nursery' },
  { title: 'Jr KG', link: '/programs/jr-kg' },
  { title: 'Sr KG', link: '/programs/sr-kg' },
  { title: 'Daycare', link: '/programs/daycare' },
  { title: 'Summer Camp', link: '/programs/summer-camp' }
]