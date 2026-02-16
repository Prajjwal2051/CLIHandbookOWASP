import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { navigation } from "./navigation";

const docsDirectory = path.join(process.cwd(), "docs");

export interface DocContent {
  slug: string[];
  title: string;
  description?: string;
  content: string;
  category: string;
}

export function getAllDocs(): DocContent[] {
  const docs: DocContent[] = [];

  function readDocsRecursively(dir: string, category: string = "") {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        readDocsRecursively(fullPath, file);
      } else if (file.endsWith(".md")) {
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        const relativePath = path.relative(docsDirectory, fullPath);
        const slug = relativePath.replace(/\.md$/, "").split(path.sep);

        docs.push({
          slug,
          title: data.title || file.replace(/\.md$/, ""),
          description: data.description,
          content,
          category: category || slug[0],
        });
      }
    }
  }

  readDocsRecursively(docsDirectory);
  return docs;
}

export function getDocBySlug(slug: string[]): DocContent | null {
  const allDocs = getAllDocs();
  return (
    allDocs.find(
      (doc) =>
        doc.slug.length === slug.length &&
        doc.slug.every((s, i) => s === slug[i]),
    ) || null
  );
}

export function getDocsByCategory(category: string): DocContent[] {
  return getAllDocs().filter((doc) => doc.category === category);
}

// Get docs ordered by navigation structure
export function getOrderedDocs(): DocContent[] {
  const allDocs = getAllDocs();
  const ordered: DocContent[] = [];

  // Build ordered list from navigation
  navigation.forEach((section) => {
    if (section.items && section.items.length > 0) {
      section.items.forEach((item) => {
        const href = item.href.startsWith('/') ? item.href.slice(1) : item.href;
        const slug = href.split('/');
        const doc = allDocs.find(
          (d) => d.slug.join('/') === slug.join('/')
        );
        if (doc) {
          ordered.push(doc);
        }
      });
    } else {
      // Section with no items (like FAQ)
      const href = section.href.startsWith('/') ? section.href.slice(1) : section.href;
      const slug = href.split('/');
      const doc = allDocs.find(
        (d) => d.slug.join('/') === slug.join('/')
      );
      if (doc) {
        ordered.push(doc);
      }
    }
  });

  return ordered;
}
