import { SiteHeader } from "./portal-header";
import { PortalFooter } from "./portal-footer";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <PortalFooter />
    </>
  );
}
