#!/usr/bin/env node

const { execSync } = require("child_process");

execSync("bun run dev", {
  stdio: "inherit",
  cwd: require("process").cwd()
});