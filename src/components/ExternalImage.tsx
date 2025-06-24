// components/ExternalImage.tsx
import Image, { ImageLoaderProps } from "next/image";

const externalLoader = ({ src }: ImageLoaderProps) => {
  return src;
};

export default function ExternalImage(
  props: Omit<React.ComponentProps<typeof Image>, "loader">
) {
  return <Image loader={externalLoader} {...props} />;
}
