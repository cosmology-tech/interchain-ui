const fs = require("fs");
const path = require("path");

const seo = require("../config/seo");
const siteInfo = require("../config/site");
const canonical = seo.canonical;
const STORYBOOK_STATIC_DIR = path.resolve(__dirname, "../storybook-static/");
const STORYBOOK_INDEX_JSON = path.resolve(
  __dirname,
  "../storybook-static/stories.json"
);

const pageObjects = {};
const legalPageObjects = {};

function genStoryURL(kind = "docs", storyId) {
  // Generate a storybook URL for a story
  // URL format story
  // http://localhost:6006/?path=/story/nft-nftprofile--primary
  // URL format docs
  // http://localhost:6006/?path=/docs/nft-nftprofile--docs
  if (kind !== "docs" && kind !== "story") {
    throw new Error("kind must be doc or story");
  }

  return `${canonical}/?path=/${kind}/${storyId}`;
}

function isDocsStory(storyId) {
  return storyId.includes("--docs");
}

// Function to generate the sitemap.xml content
function genStorybookSitemap() {
  try {
    const storybookIndex = fs.readFileSync(STORYBOOK_INDEX_JSON, "utf8");
    const storiesJson = JSON.parse(storybookIndex);
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    Object.keys(storiesJson.stories).forEach((storyId) => {
      const url = genStoryURL(isDocsStory(storyId) ? "docs" : "story", storyId);
      const lastmod = new Date().toISOString().split("T")[0];

      sitemap += `  <url>\n`;
      sitemap += `    <loc>${url}</loc>\n`;
      sitemap += `    <lastmod>${lastmod}</lastmod>\n`;
      sitemap += `  </url>\n`;
    });

    sitemap += "</urlset>";
    console.log("generated", sitemap);

    return sitemap;
  } catch (error) {
    console.error(`Error reading file: ${error}`);
    return "";
  }
}

const IGNORE = ["404", "_document", "_app"];

// FOR NOW keep this stuff out
// later when you generate a sitemap page, you can categorize this in Legal
const LEGAL_FILES = [
  "acceptable-use-policy",
  "brand-guidelines",
  "cookie-policy",
  "copyright-policy",
  "corporate-colors",
  "credits",
  "data-processing-addendum",
  "developer-terms-of-use",
  "logo-guidelines",
  "security-measures",
];

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

// const pageSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//   ${Object.keys(pageObjects)
//     .map(
//       (path) => `<url>
//     <loc>${canonical}${path}</loc>
//     <lastmod>${formatDate(new Date(pageObjects[path].lastModified))}</lastmod>
//   </url>`
//     )
//     .join("\n")}
// </urlset>`;

const legalSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${Object.keys(legalPageObjects)
    .map(
      (path) => `<url>
    <loc>${canonical}${path}</loc>
    <lastmod>${formatDate(
      new Date(legalPageObjects[path].lastModified)
    )}</lastmod>
  </url>`
    )
    .join("\n")}
</urlset>`;

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<sitemap>
<loc>${canonical}/sitemaps/legal.xml</loc>
<loc>${canonical}/sitemaps/pages.xml</loc>
</sitemap>
</sitemapindex>
`;

const BAD_AGENTS = [
  {
    text: "Search engines only please :) Thanks for obeying robots.txt",
    bots: ["UbiCrawler", "DOC", "Zao", "discobot", "dotbot", "yacybot"],
  },
  {
    text: "Dear bots, we don't appreciate you copying site content and providing very little additional value.",
    bots: [
      "sitecheck.internetseer.com",
      "Zealbot",
      "MJ12bot",
      "MSIECrawler",
      "SiteSnagger",
      "WebStripper",
      "WebCopier",
      "Fetch",
      "Offline Explorer",
      "Teleport",
      "TeleportPro",
      "WebZIP",
      "linko",
      "HTTrack",
      "Microsoft.URL.Control",
      "Xenu",
      "larbin",
      "libwww",
      "ZyBORG",
      "Download Ninja",
    ],
  },
  {
    text: "Recursive mode wget is not friendly",
    bots: ["wget", "grub-client"],
  },
  {
    text: "I realize you don't follow robots.txt, but FYI",
    bots: ["k2spider"],
  },
  {
    text: "Abusive bots",
    bots: ["NPBot"],
  },
];

const robotsTxt = `
#
# Dear bot, crawler or kind technical person who wishes to crawl ${
  siteInfo.site.host
},
#   please email ${
  siteInfo.emails.support
}. We require whitelisting to access our sitemap.
#
#   Thanks in advance! Your friendly Ops Team @ ${seo.title}.

${BAD_AGENTS.map(({ text, bots }) => {
  return `
#
# ${text}
#

  ${bots
    .map((bot) => {
      return `
User-agent: ${bot}
Disallow: /`;
    })
    .join("\n")}
  `;
}).join("")}

User-agent: *

${Object.keys(pageObjects)
  .map((path) => `Allow: ${path}$`)
  .join("\n")}

Sitemap: ${canonical}/sitemaps/pages.xml
Sitemap: ${canonical}/sitemaps/legal.xml

Host: ${siteInfo.site.host}

`;

fs.writeFileSync("storybook-static/sitemap.xml", sitemapXml);
require("mkdirp").sync("storybook-static/sitemaps");
fs.writeFileSync("storybook-static/sitemaps/pages.xml", genStorybookSitemap());
fs.writeFileSync("storybook-static/sitemaps/legal.xml", legalSitemapXml);
fs.writeFileSync("storybook-static/robots.txt", robotsTxt);
