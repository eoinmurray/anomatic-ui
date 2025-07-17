import 'dotenv/config'; 
import fs from 'fs';
import path from 'path';
import Ajv from "ajv";

const PLOT_TYPES_DIR = process.env.PLOT_TYPES_DIR || 'plot-types';

const ajv = new Ajv();

export default function getPlotType(data: any) {

  if (data.length === 0) {
    return undefined;
  }

  const plotTypesDir = PLOT_TYPES_DIR;

  console.log(plotTypesDir)

  const jsonFiles = fs.readdirSync(plotTypesDir)
    .filter(file => file.endsWith('.json'))
    .map(file => {
      const schemaContent = fs.readFileSync(path.join(plotTypesDir, file), 'utf-8');
      return {
        file,
        schema: JSON.parse(schemaContent)
      };
    });

  return jsonFiles.map(jsonFile => {
    const schema = jsonFile.schema;
    const validate = ajv.compile(schema);
    return {
      type: jsonFile.file.replace('.json', ''),
      valid: validate(data)
    };
  }).find(result => result.valid);
}
