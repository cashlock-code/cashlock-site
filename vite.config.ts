import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Actions will set the correct base automatically for Pages,
// but this fallback helps local builds if needed.
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";

export default defineConfig({
  plugins: [react()],
  base: repoName ? `/${repoName}/` : "/",
});
