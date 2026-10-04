// Copia los diez CV de cv2026/ (fuente única: cv2026/src/content.mjs) a public/cv/.
// Ya no imprime /cv/ del sitio: así `npm run cv` no puede regenerar ni sobrescribir con una versión antigua.
// Uso: npm run cv            → copia los PDF ya validados
//      npm run cv -- --build → los regenera antes con cv2026/src/build.mjs (validarlos después con validate.py)
import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const CV = join(import.meta.dirname, '../../cv2026');
const OUT = join(import.meta.dirname, '../public/cv');
const variants = ['A_Software_Engineer', 'B_Full_Stack', 'C_Backend', 'D_Frontend_Web', 'E_Automation_Integrations'];

if (process.argv.includes('--build')) execFileSync('node', [join(CV, 'src/build.mjs')], { stdio: 'inherit' });

mkdirSync(OUT, { recursive: true });
for (const lang of ['ES', 'EN']) {
  for (const v of variants) {
    const src = join(CV, 'pdf', `Guillermo_Renteria_CV_${lang}_${v}.pdf`);
    if (!existsSync(src)) throw new Error(`Falta ${src}`);
    copyFileSync(src, join(OUT, `Guillermo_Renteria_CV_${lang}_${v}.pdf`));
  }
  // Nombre estable ya enlazado desde LinkedIn, GitHub y el sitio: siempre la versión principal (A).
  copyFileSync(join(CV, 'pdf', `Guillermo_Renteria_CV_${lang}_A_Software_Engineer.pdf`), join(OUT, `Guillermo_Renteria_CV_${lang}.pdf`));
}
console.log(readdirSync(OUT).sort().join('\n'));
