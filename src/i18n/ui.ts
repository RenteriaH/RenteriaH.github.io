export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];

export const ui = {
  es: {
    'meta.title': 'Guillermo Rentería · Desarrollador de software',
    'meta.description':
      'Desarrollador de software en Torreón, México. Integraciones con APIs, modelado de datos y automatización con IA sobre sistemas en producción.',
    'nav.skip': 'Saltar al contenido',
    'nav.work': 'Trabajo',
    'nav.experience': 'Experiencia',
    'nav.skills': 'Tecnologías',
    'nav.about': 'Sobre mí',
    'nav.cv': 'CV',
    'nav.contact': 'Contacto',
    'nav.switch': 'English',
    'nav.switchLabel': 'Ver el sitio en inglés',
    'hero.kicker': 'Desarrollador de software · Torreón, México',
    'hero.title': 'Construyo integraciones para sistemas que no se pueden apagar.',
    'hero.lede':
      'Estudiante de Ingeniería en Sistemas Computacionales. En mi residencia profesional desarrollo sobre una tienda Shopify Plus en producción: interfaces en Liquid y JavaScript, APIs REST y GraphQL, modelado de datos y rendimiento web, con agentes de IA y verificación de cada cambio.',
    'hero.ctaWork': 'Leer el caso de estudio',
    'hero.ctaCv': 'Descargar CV',
    'ledger.title': 'Un cambio seguro',
    'ledger.caption': 'Leo antes de escribir y vuelvo a leer después. Si algo no coincide, me detengo.',
    'evidence.legend': 'Cómo leer las etiquetas',
    'evidence.legendText':
      'Cada cifra lleva su origen. «Verificado» tiene documento y medición; «laboratorio» se midió fuera de usuarios reales; «con IA» indica código escrito por agentes bajo mi dirección.',
    'work.title': 'Trabajo seleccionado',
    'work.intro': 'Pocos proyectos, contados con lo que se puede comprobar.',
    'work.readCase': 'Leer el caso',
    'work.private': 'Repositorio privado',
    'work.privateNote': 'El código no es público. Puedo explicarlo en una entrevista.',
    'work.status': 'Estado',
    'work.myRole': 'Mi papel',
    'exp.title': 'Experiencia',
    'skills.title': 'Tecnologías',
    'skills.intro':
      'Ordenadas por dónde las he usado, no por cuánto me gustan. Producción pesa más que proyecto; proyecto más que aula.',
    'skills.prod': 'En producción',
    'skills.proj': 'En proyectos propios',
    'skills.acad': 'En formación académica',
    'about.title': 'Sobre mí',
    'edu.title': 'Formación',
    'contact.title': 'Contacto',
    'contact.text': 'Busco un primer puesto como desarrollador de software: integraciones, backend o full stack. Presencial en La Laguna, híbrido o remoto.',
    'footer.source': 'Código de este sitio',
    'footer.built': 'Sitio estático hecho con Astro. Sin rastreadores.',
    'case.back': 'Volver al inicio',
    'case.role': 'Papel',
    'case.period': 'Periodo',
    'case.stack': 'Tecnologías',
    'cv.title': 'Currículum',
    'cv.download': 'Descargar PDF',
    'notfound.title': 'Esta página no existe',
    'notfound.text': 'Puede que el enlace esté mal escrito. Vuelve al inicio para ver el trabajo.',
  },
  en: {
    'meta.title': 'Guillermo Rentería · Software Developer',
    'meta.description':
      'Software developer in Torreón, Mexico. API integrations, data modeling and AI-assisted automation on production systems.',
    'nav.skip': 'Skip to content',
    'nav.work': 'Work',
    'nav.experience': 'Experience',
    'nav.skills': 'Skills',
    'nav.about': 'About',
    'nav.cv': 'Résumé',
    'nav.contact': 'Contact',
    'nav.switch': 'Español',
    'nav.switchLabel': 'View the site in Spanish',
    'hero.kicker': 'Software developer · Torreón, Mexico',
    'hero.title': 'I build integrations for systems that can’t be switched off.',
    'hero.lede':
      'Computer Systems Engineering student. In my professional internship I build on a production Shopify Plus store: Liquid and JavaScript interfaces, REST and GraphQL APIs, data modeling and web performance, using AI agents and verifying every change.',
    'hero.ctaWork': 'Read the case study',
    'hero.ctaCv': 'Download résumé',
    'ledger.title': 'A safe change',
    'ledger.caption': 'I read before writing and read back after. If something doesn’t match, I stop.',
    'evidence.legend': 'How to read the labels',
    'evidence.legendText':
      'Every figure carries its source. “Verified” has a document and a measurement; “lab” was measured outside real users; “AI-built” marks code written by agents under my direction.',
    'work.title': 'Selected work',
    'work.intro': 'A few projects, told with what can be checked.',
    'work.readCase': 'Read the case study',
    'work.private': 'Private repository',
    'work.privateNote': 'The code isn’t public. I can walk through it in an interview.',
    'work.status': 'Status',
    'work.myRole': 'My role',
    'exp.title': 'Experience',
    'skills.title': 'Skills',
    'skills.intro':
      'Grouped by where I have used them, not by how much I like them. Production outweighs projects; projects outweigh coursework.',
    'skills.prod': 'In production',
    'skills.proj': 'In my own projects',
    'skills.acad': 'In coursework',
    'about.title': 'About',
    'edu.title': 'Education',
    'contact.title': 'Contact',
    'contact.text': 'I’m looking for a first role as a software developer: integrations, backend or full stack. On-site in La Laguna, hybrid or remote.',
    'footer.source': 'Source of this site',
    'footer.built': 'Static site built with Astro. No trackers.',
    'case.back': 'Back to home',
    'case.role': 'Role',
    'case.period': 'Period',
    'case.stack': 'Stack',
    'cv.title': 'Résumé',
    'cv.download': 'Download PDF',
    'notfound.title': 'This page doesn’t exist',
    'notfound.text': 'The link may be mistyped. Go back home to see the work.',
  },
} as const;

export type UIKey = keyof (typeof ui)['es'];

export function t(lang: Locale, key: UIKey): string {
  return ui[lang][key];
}

/** Ruta equivalente en el otro idioma. El español va sin prefijo. */
export function localePath(lang: Locale, path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === 'es' ? clean : `/en${clean === '/' ? '/' : clean}`;
}
