import 'dotenv/config';
import { readFileSync } from 'fs';
import path from 'path';

const OUTPUT_DIR = process.env.OUTPUT_DIR || 'output';

export default function getData(id: string, filename: string){
  try {
    const filePath = path.join(OUTPUT_DIR, id, filename);
    const data = readFileSync(filePath, 'utf-8');
    return data
  } catch (error) {
    console.error(`Error reading file ${filename} for ID ${id}:`, error);
    return null;
  }
}