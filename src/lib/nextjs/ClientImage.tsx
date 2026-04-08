"use client";
import Image from "next/image";

type ClientNextImageProps = React.ComponentProps<typeof Image>;

export function ClientNextImage(props: ClientNextImageProps) {
  return <Image {...props} />;
}
type ClientImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export function ClientImage(props: ClientImageProps) {
  const { alt, ...rest } = props;
  return <img alt={alt ?? ""} {...rest} />;
}
