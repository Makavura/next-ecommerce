// components/ExternalImage.tsx
import Image, { ImageLoaderProps } from "next/image";

const externalLoader = ({ src }: ImageLoaderProps) => {
  return src;
};

type ExternalImageProps = Omit<React.ComponentProps<typeof Image>, "loader">;

export default function ExternalImage({ alt, ...props }: ExternalImageProps) {
  return <Image loader={externalLoader} alt={alt} {...props} />;
}