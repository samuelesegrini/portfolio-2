module.exports = {
	ci: {
		collect: {
			staticDistDir: './dist',
			url: [
				'http://localhost/it/',
				'http://localhost/en/',
				'http://localhost/it/progetti/',
				'http://localhost/en/writing/designing-for-clarity/',
			],
			settings: { chromeFlags: '--no-sandbox --headless=new' },
		},
		assert: {
			assertions: {
				'categories:performance': ['error', { minScore: 0.9 }],
				'categories:accessibility': ['error', { minScore: 0.9 }],
				'categories:best-practices': ['error', { minScore: 0.9 }],
				'categories:seo': ['error', { minScore: 0.9 }],
			},
		},
		upload: { target: 'filesystem', outputDir: '.lighthouseci' },
	},
};
