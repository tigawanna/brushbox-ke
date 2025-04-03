export interface NextjsPageProps<
P extends Record<string, any> = Record<string, any>,
  SP extends Record<string, any> = Record<string, any>
> {
  searchParams:Promise<SP>
  params:Promise<P>
}
