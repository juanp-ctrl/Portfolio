const CONTACT_EMAIL = 'juanpablojimenez.dev@gmail.com'

export const PRIVACY_LAST_UPDATED = '2026-11-04'

export interface PrivacySection {
  title: string
  paragraphs?: string[]
  items?: string[]
}

export interface StorageEntry {
  name: string
  type: string
  purpose: string
  duration: string
}

export interface PrivacyContent {
  title: string
  lastUpdated: string
  intro: string
  sections: PrivacySection[]
  storageTitle: string
  storageHeaders: [string, string, string, string]
  storage: StorageEntry[]
  manageTitle: string
  manageText: string
  manageButton: string
}

const en: PrivacyContent = {
  title: 'Privacy & Cookies',
  lastUpdated: 'Last updated',
  intro:
    'This page explains what data this portfolio collects, why, and how you can control it. I keep it to the minimum needed to understand how the site is used. No ads, no data selling.',
  sections: [
    {
      title: 'Who is responsible',
      paragraphs: [
        `Juan Pablo Jiménez Heredia, Medellín, Colombia. Contact: ${CONTACT_EMAIL}.`,
      ],
    },
    {
      title: 'What I collect and why',
      paragraphs: [
        'I use PostHog, a product analytics tool, to understand which pages and content are useful and to improve the site. If you accept analytics cookies, the following is recorded under a random, anonymous identifier:',
      ],
      items: [
        'Pages visited, time on page, referring site and campaign parameters (UTM).',
        'Interactions such as clicks on links and buttons (for example, downloading my CV or opening a contact link).',
        'Technical data: browser, operating system, device type, screen size and language.',
        'Approximate location (country and city) derived from your IP address. The IP address itself is not stored.',
      ],
    },
    {
      title: 'Visitor profiles',
      paragraphs: [
        'With your consent, these events are grouped into an anonymous visitor profile so I can see things like returning visits, how people navigate through the site, and which content they are interested in. I do not know who you are: no name or email is collected, and the profile is not used for advertising or any automated decision about you.',
      ],
    },
    {
      title: "If you decline or haven't chosen yet",
      paragraphs: [
        'Until you accept, and if you decline, no cookies or identifiers are stored on your device. Page views and basic interactions are counted in aggregate using a hash calculated on PostHog servers from your IP address and browser, combined with a salt that rotates daily. This does not allow you to be recognized across days and does not create a profile.',
      ],
    },
    {
      title: 'Legal basis',
      paragraphs: [
        'Analytics cookies and visitor profiles are based on your consent, which you can withdraw at any time. Aggregate cookieless counting of visits (before you choose or after you decline) is based on my legitimate interest in knowing basic site traffic, using a method that does not store anything on your device.',
      ],
    },
    {
      title: 'Who processes the data',
      paragraphs: [
        'Data is processed by PostHog Inc. as a data processor and stored in its United States cloud. This means your data is transferred outside your country; PostHog provides contractual safeguards (Data Processing Agreement and Standard Contractual Clauses) for these transfers. Data is not shared with anyone else.',
      ],
    },
    {
      title: 'How long it is kept',
      paragraphs: [
        'Analytics data is kept only as long as it is useful for the purposes above, within PostHog retention limits, and is then deleted. The cookie that stores your anonymous identifier expires after one year.',
      ],
    },
    {
      title: 'Your rights',
      paragraphs: [
        `You can access, correct, delete or object to the processing of your data, and withdraw your consent at any time, under the GDPR (if you are in the EU/EEA) and Colombia's Law 1581 of 2012 (Habeas Data). Write to ${CONTACT_EMAIL}. You can also file a complaint with your data protection authority (in Colombia, the Superintendencia de Industria y Comercio).`,
      ],
    },
  ],
  storageTitle: 'Cookies and local storage',
  storageHeaders: ['Name', 'Type', 'Purpose', 'Duration'],
  storage: [
    {
      name: 'ph_<project>_posthog',
      type: 'Cookie / localStorage',
      purpose:
        'Anonymous visitor and session identifier for analytics. Only after you accept.',
      duration: '1 year',
    },
    {
      name: '__ph_opt_in_out_<project>',
      type: 'localStorage',
      purpose: 'Remembers whether you accepted or declined analytics.',
      duration: 'Until you clear it',
    },
    {
      name: 'lng',
      type: 'localStorage',
      purpose: 'Remembers your language preference. Strictly necessary.',
      duration: 'Until you clear it',
    },
  ],
  manageTitle: 'Change your choice',
  manageText:
    'You can change your cookie preferences at any time. You can also delete cookies from your browser settings.',
  manageButton: 'Cookie preferences',
}

const es: PrivacyContent = {
  title: 'Privacidad y Cookies',
  lastUpdated: 'Última actualización',
  intro:
    'Esta página explica qué datos recoge este portafolio, para qué y cómo puedes controlarlos. Solo recojo lo mínimo para entender cómo se usa el sitio. Sin anuncios y sin venta de datos.',
  sections: [
    {
      title: 'Responsable',
      paragraphs: [
        `Juan Pablo Jiménez Heredia, Medellín, Colombia. Contacto: ${CONTACT_EMAIL}.`,
      ],
    },
    {
      title: 'Qué datos recojo y para qué',
      paragraphs: [
        'Uso PostHog, una herramienta de analítica de producto, para entender qué páginas y contenidos son útiles y mejorar el sitio. Si aceptas las cookies de analítica, se registra lo siguiente bajo un identificador aleatorio y anónimo:',
      ],
      items: [
        'Páginas visitadas, tiempo en cada página, sitio de procedencia y parámetros de campaña (UTM).',
        'Interacciones como clics en enlaces y botones (por ejemplo, descargar mi CV o abrir un enlace de contacto).',
        'Datos técnicos: navegador, sistema operativo, tipo de dispositivo, tamaño de pantalla e idioma.',
        'Ubicación aproximada (país y ciudad) obtenida a partir de tu dirección IP. La IP en sí no se guarda.',
      ],
    },
    {
      title: 'Perfiles de visitante',
      paragraphs: [
        'Con tu consentimiento, estos eventos se agrupan en un perfil de visitante anónimo para ver, por ejemplo, visitas recurrentes, cómo se navega por el sitio y qué contenidos interesan. No sé quién eres: no se recoge nombre ni email, y el perfil no se usa para publicidad ni para tomar decisiones automatizadas sobre ti.',
      ],
    },
    {
      title: 'Si rechazas o aún no has elegido',
      paragraphs: [
        'Mientras no aceptes, y si rechazas, no se guardan cookies ni identificadores en tu dispositivo. Las páginas vistas y las interacciones básicas se cuentan de forma agregada mediante un hash calculado en los servidores de PostHog a partir de tu IP y navegador, combinado con un valor aleatorio que cambia cada día. Esto no permite reconocerte de un día para otro ni crea un perfil.',
      ],
    },
    {
      title: 'Base legal',
      paragraphs: [
        'Las cookies de analítica y los perfiles de visitante se basan en tu consentimiento, que puedes retirar en cualquier momento. El conteo agregado y sin cookies de visitas (antes de que elijas o si rechazas) se basa en mi interés legítimo en conocer el tráfico básico del sitio, con un método que no guarda nada en tu dispositivo.',
      ],
    },
    {
      title: 'Quién trata los datos',
      paragraphs: [
        'Los datos los trata PostHog Inc. como encargado del tratamiento y se almacenan en su nube de Estados Unidos. Esto implica una transferencia internacional de datos; PostHog ofrece garantías contractuales (Acuerdo de Tratamiento de Datos y Cláusulas Contractuales Tipo) para estas transferencias. Los datos no se comparten con nadie más.',
      ],
    },
    {
      title: 'Cuánto tiempo se conservan',
      paragraphs: [
        'Los datos de analítica se conservan solo mientras sean útiles para las finalidades descritas, dentro de los límites de retención de PostHog, y después se eliminan. La cookie con tu identificador anónimo caduca al cabo de un año.',
      ],
    },
    {
      title: 'Tus derechos',
      paragraphs: [
        `Puedes conocer, actualizar, rectificar y suprimir tus datos, oponerte a su tratamiento y revocar tu consentimiento en cualquier momento, conforme al RGPD (si estás en la UE/EEE) y a la Ley 1581 de 2012 de Colombia (Habeas Data). Escríbeme a ${CONTACT_EMAIL}. También puedes presentar una queja ante tu autoridad de protección de datos (en Colombia, la Superintendencia de Industria y Comercio).`,
      ],
    },
  ],
  storageTitle: 'Cookies y almacenamiento local',
  storageHeaders: ['Nombre', 'Tipo', 'Finalidad', 'Duración'],
  storage: [
    {
      name: 'ph_<project>_posthog',
      type: 'Cookie / localStorage',
      purpose:
        'Identificador anónimo de visitante y sesión para analítica. Solo si aceptas.',
      duration: '1 año',
    },
    {
      name: '__ph_opt_in_out_<project>',
      type: 'localStorage',
      purpose: 'Recuerda si aceptaste o rechazaste la analítica.',
      duration: 'Hasta que lo borres',
    },
    {
      name: 'lng',
      type: 'localStorage',
      purpose: 'Recuerda tu idioma. Estrictamente necesario.',
      duration: 'Hasta que lo borres',
    },
  ],
  manageTitle: 'Cambiar tu elección',
  manageText:
    'Puedes cambiar tus preferencias de cookies en cualquier momento. También puedes borrar las cookies desde la configuración de tu navegador.',
  manageButton: 'Preferencias de cookies',
}

export const privacyContent = { en, es }
