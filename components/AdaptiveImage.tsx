import Image, { ImageProps } from "next/image";
import sharp from "sharp";
import path from "path";
import { cache } from 'react';

interface AdaptiveImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;
}

const getImageMetadata = cache(async (src: string) => {
  try {
    const imagePath = path.join(process.cwd(), "public", src);
    const metadata = await sharp(imagePath).metadata();
    return { 
      width: metadata.width || 1200, 
      height: metadata.height || 900 
    };
  } catch (error) {
    console.error("Fehler beim Abrufen der Bildmetadaten:", error);
    return { width: 1200, height: 900 };
  }
});

const shimmer = (w: number, h: number) => `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink">
  <style>
    @media (prefers-color-scheme: dark) {
      .background {
        fill: #374151;
      }
      .icon {
        fill: #4b5563;
      }
    }
    @media (prefers-color-scheme: light) {
      .background {
        fill: #d1d5db;
      }
      .icon {
        fill: #e5e7eb;
      }
    }
  </style>
  <g>
    <rect width="100%" height="100%" class="background">
      <animate attributeName="opacity" values="1;0.1;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite" keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" calcMode="spline" />
    </rect>
    <svg x="50%" y="50%" height="40" width="40" viewBox="0 0 20 18" overflow="visible">
      <g transform="translate(-10,-9)">
        <path class="icon" d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z">
          <animate attributeName="opacity" values="1;0.1;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite" keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" calcMode="spline" />
      </path>
      </g>
    </svg>
    <animate attributeName="opacity" values="1;0.5;1" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" calcMode="spline" />
  </g>
</svg>`;

const toBase64 = (str: string) => Buffer.from(str).toString('base64');

export async function AdaptiveImage({ src, alt, ...props }: AdaptiveImageProps) {
  const imageMetadata = await getImageMetadata(src);

  const dimensionsProps = props.fill
    ? {}
    : { width: imageMetadata.width, height: imageMetadata.height };

  return (
    <Image
      src={src}
      alt={alt}
      placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(imageMetadata.width, imageMetadata.height))}`}
      {...dimensionsProps}
      {...props}
    />
  );
}
