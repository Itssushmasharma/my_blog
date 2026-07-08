import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sushmasharma.com";

  // Define static routes
  const routes = ["", "/blog", "/author"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Define dynamic post routes
  const posts = [
    "cloud-insider-detection",
    "yolo-object-detection",
    "ui-ux-design-principles",
  ].map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...posts];
}
