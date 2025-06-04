import { rollup } from 'rollup';
import dts from 'rollup-plugin-dts';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildTypes() {
    const bundle = await rollup({
        input: path.resolve(__dirname, '../src/index.ts'),
        plugins: [dts()],
    });

    await bundle.write({
        file: path.resolve(__dirname, '../dist/index.d.ts'),
        format: 'es',
    });

    console.log('✔ Type declarations built');
}

buildTypes();
