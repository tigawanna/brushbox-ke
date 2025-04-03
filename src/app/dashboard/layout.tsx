
import { DashboardLayout } from "./__components/dashoboard-sidebar/DashboardLayout";

interface layoutProps {
  children: React.ReactNode;
}

export default async function layout({ children }: layoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
