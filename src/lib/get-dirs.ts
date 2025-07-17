import 'dotenv/config';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const OUTPUT_DIR = process.env.OUTPUT_DIR || 'output';

export default function getDirs() {
  try {

    const dirs = readdirSync(OUTPUT_DIR)
      .filter(name => statSync(join(OUTPUT_DIR, name)).isDirectory());

    return dirs.map(dir => {
      const metaPath = join(OUTPUT_DIR, dir, 'meta.json');
      try {
        const meta = statSync(metaPath).isFile()
          ? JSON.parse(require('fs').readFileSync(metaPath, 'utf-8'))
          : null;
        return { id: dir, meta };
      } catch {
        return { id: dir, meta: null };
      }
    });
  } catch (error) {
    return [];
  }
}