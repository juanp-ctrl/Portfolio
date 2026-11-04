// Structured Data (JSON-LD) for SEO
// For more information on how to implement JSON-LD in your Next.js application, see https://nextjs.org/docs/app/guides/json-ld

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Juan Pablo Jiménez',
  jobTitle: 'Frontend Developer',
  description:
    'Frontend Developer and Creative Engineer specializing in React, Next.js, and TypeScript',
  url: 'https://www.juanpablojimenez.dev',
  image: 'https://www.juanpablojimenez.dev/images/juan_pablo_jimenez.webp',
  sameAs: [
    'https://github.com/juanp-ctrl',
    'https://www.linkedin.com/in/juan-pablo-jimenez-h/',
    'https://twitter.com/JuanPabloJim_',
  ],
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Web Development',
    'Frontend Development',
    'Web Accessibility',
    'Microfrontend Architecture',
  ],
  alumniOf: {
    '@type': 'Organization',
    name: 'Universidad Pontificia Bolivariana',
  },
  workLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Medellín',
      addressCountry: 'Colombia',
    },
  },
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Juan Pablo Jiménez Portfolio',
  url: 'https://www.juanpablojimenez.dev',
  description:
    'Portfolio of Juan Pablo Jiménez, Frontend Developer and Creative Engineer',
  author: {
    '@type': 'Person',
    name: 'Juan Pablo Jiménez',
  },
  inLanguage: ['en', 'es'],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.juanpablojimenez.dev/projects',
    },
    'query-input': 'required name=search_term_string',
  },
}

export const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    name: 'Juan Pablo Jiménez',
    jobTitle: 'Frontend Developer',
    description:
      'Frontend Developer and Creative Engineer specializing in React, Next.js, and TypeScript',
    url: 'https://www.juanpablojimenez.dev',
    image: 'https://www.juanpablojimenez.dev/images/juan_pablo_jimenez.webp',
    sameAs: [
      'https://github.com/juanp-ctrl',
      'https://www.linkedin.com/in/juan-pablo-jimenez-h/',
      'https://twitter.com/JuanPabloJim_',
    ],
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Web Development',
      'Frontend Development',
      'Software Engineering',
      'Full Stack Development',
      'Web Accessibility',
      'Microfrontend Architecture',
    ],
    alumniOf: {
      '@type': 'Organization',
      name: 'Universidad Pontificia Bolivariana',
    },
    workLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Medellín',
        addressCountry: 'Colombia',
      },
    },
  },
  url: 'https://www.juanpablojimenez.dev',
}
