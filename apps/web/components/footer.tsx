import Image from 'next/image';
import Link from 'next/link';
import {
  addressData,
  facebookData,
  instagramData,
  programsData,
  quickLinks,
  whatsappData,
  youtubeData,
} from '../utils/consts';

const Footer = () => {
  return (
    <footer className="bg-peach w-full relative overflow-hidden">
      <div className="absolute bg-background top-0 right-0">
        <Image src="/shapes/top-shape-1.svg" alt="Top Shape" width={1920} height={137} className="w-full h-full object-cover" />
      </div>
      {/* Background container for soft feel */}
      <div className="container mx-auto relative z-10 flex flex-col">

        {/* Top Section: Logo & Subtitle */}
        <div className="flex flex-col items-center md:items-start mb-8 md:mb-12">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="WizKids Logo"
              width={160}
              height={56}
              className="mb-2 object-contain"
            />
          </Link>
          <p className="text-xs md:text-sm text-foreground/70 font-medium text-center md:text-left max-w-[250px] md:max-w-none mt-2">
            Nurturing Little Minds, Building Bright Futures
          </p>
        </div>

        {/* Middle Section: 4 Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 mb-10 md:mb-12">

          {/* Col 1: Quick Links */}
          <div className="flex flex-col px-2 md:px-4 col-span-1">
            <h3 className="font-bold text-foreground text-base md:text-lg mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-3 text-sm md:text-base text-foreground/80 font-medium">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.link} className="hover:text-primary transition-colors flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-skyblue-strong inline-block"></span> {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Programs */}
          <div className="flex flex-col px-2 md:px-4 lg:border-l border-foreground/10 col-span-1">
            <h3 className="font-bold text-foreground text-base md:text-lg mb-4">Programs</h3>
            <ul className="flex flex-col gap-3 text-sm md:text-base text-foreground/80 font-medium">
              {programsData.map((prog, idx) => (
                <li key={idx}>
                  <Link href={prog.link} className="hover:text-primary transition-colors flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span> {prog.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact Us */}
          <div className="flex flex-col px-2 md:px-4 lg:border-l border-foreground/10 col-span-2 lg:col-span-1">
            <h3 className="font-bold text-foreground text-base md:text-lg mb-4">Contact Us</h3>
            <ul className="flex flex-col gap-4 text-sm md:text-base text-foreground/80 font-medium">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-0.5 text-lg leading-none">
                  <addressData.icons.address size={18} />
                </span>
                <span className="leading-tight wrap-break-word">{addressData.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-primary text-lg leading-none">
                  <addressData.icons.phone size={18} />
                </span>
                <span className="break-all">{addressData.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-primary text-lg leading-none">
                  <addressData.icons.email size={18} />
                </span>
                <span className="break-all">{addressData.email}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Follow Us */}
          <div className="flex flex-col px-2 md:px-4 lg:border-l border-foreground/10 col-span-2 lg:col-span-1">
            <h3 className="font-bold text-foreground text-base md:text-lg mb-4">Follow Us</h3>
            <div className="flex flex-row flex-wrap gap-3 md:gap-4">
              {[facebookData, instagramData, youtubeData, whatsappData].map((social, idx) => (
                <Link key={idx} href={social.link} className="hover:scale-105 transition-transform rounded-full shadow-sm overflow-hidden flex items-center justify-center w-9 h-9 md:w-10 md:h-10 bg-white">
                  <Image src={social.image} alt="Social icon" width={40} height={40} className="w-full h-full object-contain" />
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
      {/* ── Decorative floating elements ─────────────────────────────── */}

      {/* grad-cloud — top right */}
      <div className="absolute top-4 -right-4 md:top-15 md:-right-10 pointer-events-none z-0">
        <Image
          src="/icons/grad-cloud-1.png"
          alt=""
          width={120}
          height={80}
          className="w-24 h-auto md:w-[180px] animate-float-slow opacity-90"
        />
      </div>

      {/* cloud-2 — upper-left area */}
      <div className="absolute top-20 right-20 md:top-10 md:right-20 pointer-events-none z-0">
        <Image
          src="/icons/cloud-2.png"
          alt=""
          width={100}
          height={60}
          className="w-16 h-auto md:w-[100px] animate-drift opacity-80"
          style={{ animationDelay: '1.2s' }}
        />
      </div>

      {/* cloud-1 — mid-left */}
      <div className="absolute bottom-16 left-2 md:bottom-20 md:left-8 pointer-events-none z-0">
        <Image
          src="/icons/cloud-1.png"
          alt=""
          width={80}
          height={50}
          className="w-12 h-auto md:w-[80px] animate-float opacity-70"
          style={{ animationDelay: '2.5s' }}
        />
      </div>

      {/* star — bottom right */}
      <div className="absolute bottom-6 right-4 md:bottom-10 md:right-10 pointer-events-none z-0">
        <Image
          src="/icons/star.png"
          alt=""
          width={56}
          height={56}
          className="w-16 h-auto md:w-14 animate-bob"
          style={{ animationDelay: '0.8s' }}
        />
      </div>

      {/* ── Bottom copyright bar ──────────────────────────────────────── */}
      <div className="relative z-10 border-t border-foreground/10 mt-8 mx-4 md:mx-auto md:max-w-7xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 py-4 text-xs text-foreground/50 font-medium">
          <p>© {new Date().getFullYear()} WizKids. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <span className="w-px h-3 bg-foreground/20 inline-block" />
            <Link href="/cookie-policy" className="hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;