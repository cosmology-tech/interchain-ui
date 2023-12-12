const siteUrl = "https://storybook.cosmology.zone";
const siteAddress = new URL(siteUrl);
const canonical = siteAddress.href.slice(0, -1);
const title = "Interchain UI storybook";
const description = "UI building blocks for Interchain builders.";
const fbAppId = null;

console.log(canonical);

module.exports = {
  title,
  canonical,
  description,
  openGraph: {
    type: "website",
    url: siteUrl,
    title,
    description,
    site_name: title,
    images: [
      {
        url: canonical + "/og/image.jpg",
        width: 942,
        height: 466,
        alt: title,
      },
    ],
  },
  twitter: {
    handle: "@cosmology_tech",
    site: "@cosmology_tech",
  },
  facebook: fbAppId
    ? {
        appId: fbAppId,
      }
    : undefined,
};
