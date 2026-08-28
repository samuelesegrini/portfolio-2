import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const isProduction = process.env.CF_PAGES_BRANCH === 'main';
if (!isProduction) process.exit(0);

const failures = [];
const siteConfig = readFileSync('src/config/site.ts', 'utf8');
if (!siteConfig.includes('isPlaceholder: false')) failures.push('siteConfig.isPlaceholder is not false');
if (!process.env.PUBLIC_SITE_URL || process.env.PUBLIC_SITE_URL.includes('placeholder')) failures.push('PUBLIC_SITE_URL is missing or still a placeholder');
if (!process.env.TINA_PUBLIC_CLIENT_ID || !process.env.TINA_TOKEN) failures.push('TinaCloud credentials are missing');
for (const file of ['public/cv/cv-it.pdf', 'public/cv/cv-en.pdf']) {
	if (!existsSync(file)) failures.push(`${file} is missing`);
}

const contentDirectories = ['src/content/projects', 'src/content/posts', 'src/content/pages'];
for (const directory of contentDirectories) {
	for (const localeOrFile of readdirSync(directory, { withFileTypes: true })) {
		const paths = localeOrFile.isDirectory()
			? readdirSync(join(directory, localeOrFile.name)).map((file) => join(directory, localeOrFile.name, file))
			: [join(directory, localeOrFile.name)];
		for (const path of paths) {
			const content = readFileSync(path, 'utf8');
			if (/dimostrativ[oa]|demonstration (content|article|biography)/i.test(content)) {
				failures.push(`${path} still contains demonstration copy`);
			}
		}
	}
}

if (failures.length > 0) {
	console.error(`Production launch blocked:\n- ${failures.join('\n- ')}`);
	process.exit(1);
}
