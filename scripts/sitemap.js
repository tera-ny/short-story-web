const sitemap = require("nextjs-sitemap-generator");
const path = require("path");

let baseUrl;

switch (process.env.ENDPOINT) {
  case "production":
    baseUrl = "https://https://short-story.space";
  default:
    baseUrl = "https://short-story.tera-ny.vercel.app";
}

sitemap({
  baseUrl: baseUrl,
  pagesDirectory: path.join(__dirname, "../src/pages"),
  ignoredPaths: [],
  targetDirectory: "public/",
  nextConfigPath: path.join(__dirname, "../next.config.js"),
  ignoredExtensions: ["png", "jpg", "svg"],
});
