import 'dotenv/config';
import { readdirSync, statSync } from 'fs';
import path from 'path';

const OUTPUT_DIR = process.env.OUTPUT_DIR || 'output';

export default function getAllFiles(id: string) {

  try {
    const dirPath = path.join(OUTPUT_DIR, id);
    const files = readdirSync(dirPath).map(file => {
      const filePath = path.join(dirPath, file);
      const stats = statSync(filePath);
      return {
        id: file,
        meta: {
          size: stats.size,
          created: stats.birthtime,
        },
      };
    });

    return files;
  } catch (error: any) {
    console.error(`Error reading files for ID ${id}:`, error);
    return [];
  }
}