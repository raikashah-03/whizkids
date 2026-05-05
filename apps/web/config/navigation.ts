export const NAVIGATION_LINKS = [
  { title: 'Home', href: '/' },
  {
    title: 'About',
    href: '/about',
    // subLinks: [ 
    //   { title: 'About Us', href: '/about/us' }, 
    //   { title: 'Reviews', href: '/about/reviews' }, 
    //   { title: 'Awards & Certifications', href: '/about/awards' } 
    // ] 
  },
  {
    title: 'Programs',
    href: '/programs',
    subLinks: [
      { title: 'Playgroup', href: '/programs#playgroup' },
      { title: 'Nursery', href: '/programs#nursery' },
      { title: 'Jr KG', href: '/programs#jr-kg' },
      { title: 'Sr KG', href: '/programs#sr-kg' },
      { title: 'Daycare', href: '/programs#daycare' },
      { title: 'Summer Camp', href: '/programs#summer-camp' }
    ]
  },
  { title: 'Curriculum', href: '/curriculum' },
  { title: 'Testimonials', href: '/testimonials' },
  { title: 'Gallery', href: '/gallery' }
];
