import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { projects, experience, skills, education, person } from '../src/data/profile';
import { ui } from '../src/i18n/ui';

/**
 * Pruebas de integridad del contenido: protegen las reglas de publicación del proyecto
 * (sin cifras internas, sin afirmaciones no verificadas, ambos idiomas completos).
 */

const casesDir = join(__dirname, '..', 'src', 'content', 'cases');
const caseFiles = ['es', 'en'].flatMap((lang) =>
  readdirSync(join(casesDir, lang)).map((f) => ({ lang, file: f, text: readFileSync(join(casesDir, lang, f), 'utf8') })),
);
const dataText = readFileSync(join(__dirname, '..', 'src', 'data', 'profile.ts'), 'utf8');
const uiText = readFileSync(join(__dirname, '..', 'src', 'i18n', 'ui.ts'), 'utf8');
const allPublicText = [dataText, uiText, ...caseFiles.map((c) => c.text)].join('\n');

describe('reglas de confidencialidad', () => {
  // Términos prohibidos (cifras internas, identificadores, sistemas de terceros, empresas sin constancia).
  // Se guardan como [longitud, sha256 del texto en minúsculas] para que este archivo no los revele.
  // La lista en claro vive fuera del repositorio, en la documentación de auditoría del proyecto.
  const DENYLIST: [number, string][] = [[6, "4d49bdea8109c061bd0892054c57be11a1887db92aa90429e2cde008bab4e85c"], [5, "d6ba9b8f6a4a172c5130916be8cba8b9b8ea8c2dfeed36a3eb09fba89f406d6f"], [5, "749a637aa5c8c5be92567e8f46f2ac78c44005feb6c55f1282ea110853aa1299"], [4, "32e91c1240d5f0df215a3d318b26dfb6755680982d5f6722a6aed0dae644c0b3"], [7, "fed095a85e804b12052302d26926542dac1785d07e586837040e493b0c8bb135"], [4, "3f85b3c509eb7f285c4d5d220b74cf12253f16cbb6cbd0025eabe5c08f078929"], [13, "7359e51bf38f3fd9ac7c17fba1985141f77a0f2a6ec1585cdde3d60442c8e44a"], [5, "0d0a1f85084a074399842d308764224076ab6eb9a91ed517ddfb4810d3fa328c"], [12, "626da6a18c17db77f9fd067ead8e26def9c14a05067343bdb97597ae6f2ee029"], [8, "959f795193ba28b2079d92e2abf391f58e1c4d4fee3c798fac81213b267a8c6b"], [11, "e95a56860175e17349ac1899bc96deb688f57fde6e934432b0d68eaaae582849"], [4, "404e91050d105f97f8785b94706814e4a6ead40fea25c0ecf9efefa6bea999f5"], [8, "368b284d06b66fbfb78ae2864fd478fe50050a87eade3ef76f7787d752852670"], [6, "caee08243af91e7a21a1a2dfb5366d3b8756a6075ef6f3b3e4bc07f812116efa"], [5, "f6574cf71ccf2ceae8c0498b0af7d0c3e4b31ce96e6a0739fa3a25f9afec2b99"], [11, "baffdf37aa5d3961c77ba6315dcd836823a20ead97869d4232780df8e4369f13"], [12, "3d936dc1061be0aa056080934b3a4d202f4047e6e8eaf0863801df3708ec9d9d"], [6, "28ec039832f5bc96c2be0eaee016dafeb7547ed76b510ed5a24d25b180493271"], [9, "8c303dba3bb6e069e16299d7898abe9e5fed32a46e2ad785db0a3f7fb7f576c1"], [8, "297349e3afcccc4269bc1b3068268db9743ffd7968fc227a3bab25702e6de754"], [12, "72604a3d0191d1e299cc18c77d4860f0c3730a97fb25cce964f17ece8ff704c4"], [9, "c420fdb9ac108def713bd76d179993d64d7bfe200ac4c079fa07fce95d5f5f9b"], [11, "98213a4c9f442f32f5d4b1c7bdf1edad23be65d1cbf94a7ea87efaae992dc73f"], [23, "939053824dc49a18c67f27802953259b527b66ef14ecaadd481b815285d64e3c"], [17, "7df706a3826da100865390251309315c5aa7858b9db2fff814225280cce27590"], [12, "e9920330ecebd88c3c8923611f88b96defa1df9c04f0b13d21b4548567aff3b6"], [13, "139f1a6a2de8ed76e991ce2beee459a3b2ae32fc24eaccece8c5fd49b7aaf876"]];
  const haystack = allPublicText.toLowerCase();
  const sha256 = (s: string) => createHash('sha256').update(s).digest('hex');
  const contains = (len: number, hash: string) => {
    for (let i = 0; i + len <= haystack.length; i++) if (sha256(haystack.slice(i, i + len)) === hash) return true;
    return false;
  };

  it.each(DENYLIST.map(([len, hash], i) => [i + 1, len, hash] as const))(
    'no contiene el término prohibido n.º %i',
    (_n, len, hash) => {
      expect(contains(len, hash)).toBe(false);
    },
  );

  it('no usa el correo corporativo como contacto', () => {
    expect(person.email ?? '').not.toMatch(/maha\.com\.mx/i);
  });

  it('no afirma mejoras de ventas o conversión', () => {
    expect(allPublicText).not.toMatch(/(aument[eé]|increment[eé]|increased|boosted)\s+(las\s+)?(ventas|conversi|sales|conversion)/i);
  });
});

describe('contenido bilingüe completo', () => {
  it('cada proyecto tiene todos sus textos en español y en inglés', () => {
    for (const p of projects) {
      for (const field of [p.title, p.oneLiner, p.problem, p.solution, p.role, p.status]) {
        expect(field.es.trim(), `${p.id} es`).not.toBe('');
        expect(field.en.trim(), `${p.id} en`).not.toBe('');
      }
      expect(p.facts.es.length, `${p.id} facts`).toBe(p.facts.en.length);
      expect(p.stack.length).toBeGreaterThan(0);
    }
  });

  it('cada experiencia tiene las mismas viñetas en ambos idiomas', () => {
    for (const job of experience) expect(job.bullets.es.length).toBe(job.bullets.en.length);
  });

  it('la interfaz tiene las mismas claves en ambos idiomas', () => {
    expect(Object.keys(ui.en).sort()).toEqual(Object.keys(ui.es).sort());
  });

  it('cada caso de estudio existe en los dos idiomas', () => {
    const es = caseFiles.filter((c) => c.lang === 'es').map((c) => c.file).sort();
    const en = caseFiles.filter((c) => c.lang === 'en').map((c) => c.file).sort();
    expect(en).toEqual(es);
  });
});

describe('honestidad sobre la autoría', () => {
  it('los proyectos privados no enlazan a un repositorio', () => {
    for (const p of projects.filter((x) => x.evidence.includes('private'))) expect(p.repo, p.id).toBeUndefined();
  });

  it('los proyectos marcados «con IA» lo dicen en el texto de su papel', () => {
    for (const p of projects.filter((x) => x.evidence.includes('ai'))) {
      expect(p.role.es, p.id).toMatch(/IA/);
      expect(p.role.en, p.id).toMatch(/AI/);
    }
  });

  it('no hay tecnologías repetidas entre niveles de evidencia', () => {
    const all = [...skills.prod, ...skills.proj, ...skills.acad];
    expect(new Set(all).size).toBe(all.length);
  });

  it('la educación no declara un título obtenido', () => {
    expect(education[0].period.es).toMatch(/en curso/);
  });
});
