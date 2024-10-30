import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		emptyOutDir: false,
		target: 'node16',
		rollupOptions: {
			input: {
				content: './content_script/content.tsx',
			},
			output: {
				entryFileNames: 'assets/[name].js',
			},
		},
	},
});
