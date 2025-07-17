#!/usr/bin/env bun

import { execSync } from "child_process";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

execSync("bun run dev", {
  stdio: "inherit",
  cwd: __dirname,
});