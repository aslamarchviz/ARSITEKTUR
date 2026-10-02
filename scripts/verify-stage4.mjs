import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const requiredFiles = [
  "index.html",
  "package.json",
  "vite.config.js",
  "src/main.jsx",
  "src/App.jsx",
  "src/index.css",
  "src/data/portfolio.js",
  "src/editor/config.jsx",
  "src/editor/EditorPage.jsx",
  "src/editor/storage.js",
  "src/editor/assets.js",
  "src/editor/ImageUploadField.jsx",
  "src/editor/useAssetSrc.js",
];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

let failed = false;
function check(condition, label) {
  if (condition) {
    console.log(`PASS  ${label}`);
  } else {
    console.error(`FAIL  ${label}`);
    failed = true;
  }
}

const pkg = JSON.parse(read("package.json"));
check(Number(process.versions.node.split(".")[0]) >= 20, "Node.js 20+ detected");
check(pkg.dependencies?.["@puckeditor/core"] === "0.23.0", "Puck 0.23.0 pinned");
check(pkg.dependencies?.react === "19.3.0", "React 19.3.0 pinned");
check(pkg.devDependencies?.vite === "8.3.1", "Vite 8.3.1 pinned");
check(pkg.dependencies?.tailwindcss === "4.3.3", "Tailwind 4.3.3 pinned");
check(pkg.scripts?.build === "vite build", "Production build script present");
check(pkg.scripts?.verify === "node scripts/verify-stage4.mjs", "Dependency-free verification script present");

for (const file of requiredFiles) {
  check(fs.existsSync(path.join(root, file)), `File exists: ${file}`);
}

const editor = read("src/editor/EditorPage.jsx");
check(editor.includes("drag: true"), "Drag permission enabled");
check(editor.includes("insert: true"), "Insert permission enabled");
check(editor.includes("delete: true"), "Delete permission enabled");
check(editor.includes("duplicate: true"), "Duplicate permission enabled");
check(editor.includes('behavior: "auto"'), "Puck DnD behavior set to auto");
check(editor.includes("disableOutlineDrag: false"), "Outline drag enabled");
check(editor.includes("disableAutoScroll: false"), "Drag auto-scroll enabled");
check(editor.includes('headerPath="Stage 4 · Insert / Delete / Duplicate"'), "Stage 4 editor label present");
check(!editor.includes('headerPath="Stage 2 Editor"'), "No stale Stage 2 header label");
check(editor.includes("loadPortfolioData(defaultData)"), "Editor has a deterministic default-data fallback");
check(editor.includes("queueAssetCleanup(data)"), "Asset cleanup is queued after persistence");
check(editor.includes("let cleanupQueue = Promise.resolve()"), "Asset cleanup is serialized");


const config = read("src/editor/config.jsx");
for (const name of [
  "HeroSection",
  "AboutSection",
  "PortfolioSection",
  "ServicesSection",
  "TestimonialSection",
  "ContactSection",
]) {
  check(config.includes(name), `Config contains ${name}`);
}

const storage = read("src/editor/storage.js");
check(storage.includes("localStorage"), "Page data uses localStorage");
check(storage.includes("architecture-portfolio:puck-data:v1"), "Storage key is versioned");

const assets = read("src/editor/assets.js");
check(assets.includes("indexedDB"), "Image assets use IndexedDB");
check(assets.includes("idb-image:"), "IndexedDB image references are namespaced");
check(assets.includes("garbageCollectUnusedImages"), "Unused image garbage collection is present");
check(!assets.includes("export async function deleteImage"), "Asset module has no eager-delete API");

const dataModule = await import(path.toNamespacedPath(path.join(root, "src/data/portfolio.js")));
check(Array.isArray(dataModule.defaultData?.content), "Default portfolio content is an array");
check(dataModule.defaultData?.content?.length === 6, "Six default page sections are present");
const sectionIds = dataModule.defaultData.content.map((item) => item.props?.id).filter(Boolean);
check(new Set(sectionIds).size === sectionIds.length, "Default section IDs are unique");
const portfolioItem = dataModule.defaultData.content.find((item) => item.type === "PortfolioSection");
const projectIds = (portfolioItem?.props?.projects || []).map((item) => item.id).filter(Boolean);
check(new Set(projectIds).size === projectIds.length, "Default project IDs are unique");

const projectDetail = read("src/components/ProjectDetail.jsx");
check(projectDetail.includes("useAssetSrc"), "Project detail resolves IndexedDB image references");

const uploadField = read("src/editor/ImageUploadField.jsx");
check(!uploadField.includes("deleteImage"), "Image upload field does not eagerly delete shared assets");

if (failed) {
  console.error("\nStage 4 verification FAILED.");
  process.exit(1);
}

console.log("\nStage 4 verification PASSED.");
