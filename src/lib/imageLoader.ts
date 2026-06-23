type Params = { src: string; width: number; quality?: number };

export default function imageLoader({ src }: Params): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`;
}
