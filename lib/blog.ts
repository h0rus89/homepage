import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

type Metadata = {
  title: string;
  date: string;
  summary: string;
};

async function getImageMetadata (slug: string) {
  const imagePath = path.join(process.cwd(), "public", "images", `${slug}-1.jpg`);
  const metadata = await sharp(imagePath).metadata();
  return { 
    src: `/images/${slug}-1.jpg`,
    width: metadata.width || 1200, 
    height: metadata.height || 900
  }
}

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match![1];
  let content = fileContent.replace(frontmatterRegex, '').trim();
  let frontMatterLines = frontMatterBlock.trim().split('\n');
  let metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ');
    let value = valueArr.join(': ').trim();
    value = value.replace(/^['"](.*)['"]$/, '$1'); // Remove quotes
    metadata[key.trim() as keyof Metadata] = value;
  });

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

function readMDXFile(filePath) {
  let rawContent = fs.readFileSync(filePath, 'utf-8');
  return parseFrontmatter(rawContent);
}

async function getMDXData(dir) {
  let mdxFiles = getMDXFiles(dir);
  return Promise.all(mdxFiles.map(async (file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file));
    let slug = path.basename(file, path.extname(file));
    const imageMetadata = await getImageMetadata(slug);
    return {
      metadata,
      slug,
      content,
      imageMetadata
    };
  }));
}

export async function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), 'content'));
}
