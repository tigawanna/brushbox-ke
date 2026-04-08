export interface NextjsPageProps<
  P extends Record<string, unknown> = Record<string, unknown>,
  SP extends Record<string, unknown> = Record<string, unknown>,
> {
  searchParams: Promise<SP>;
  params: Promise<P>;
}
