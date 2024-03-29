import { useGetUser } from "@/src/hooks/useGetUser";
import Footer from "./Footer/Footer";
import NavigationBar from "./NavigationBar";
import { ReactNode, RefObject } from "react";

interface layoutProps {
  children: ReactNode;
  footerRef?: RefObject<HTMLDivElement>;
  isNavFixed?: boolean;
}

const Layout = ({ children, isNavFixed, footerRef }: layoutProps) => {
  const { data } = useGetUser();
  const { email, profileImageSource } = data || {};
  const profile = data ? { email, profileImageSource } : {};

  return (
    <div>
      <NavigationBar profile={profile} isNavFixed={isNavFixed} />
      <main>{children}</main>
      <Footer footerRef={footerRef} />
    </div>
  );
};

export default Layout;
