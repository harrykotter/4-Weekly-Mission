import { useGetUser } from "@/src/hooks/useGetUser";
import Footer from "./Footer/Footer";
import NavigationBar from "./NavigationBar";
import { ReactNode, RefObject, useEffect, useState } from "react";
import useAsync from "../hooks/useAsync";

interface layoutProps {
  children: ReactNode;
  footerRef?: RefObject<HTMLDivElement>;
  isNavFixed?: boolean;
}

interface Data {
  id: number;
  name: string;
  email: string;
  profileImageSource: string;
}

const Layout = ({ children, isNavFixed, footerRef }: layoutProps) => {
  const { wrappedFunction: getUser } = useAsync<Data>(useGetUser);
  const [data, setData] = useState<Data>();
  useEffect(() => {
    getUser().then(setData);
  }, []);

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
