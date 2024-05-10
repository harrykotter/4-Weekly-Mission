import Footer from "./Footer/Footer";
import NavigationBar from "./NavigationBar";
import { ReactNode, RefObject, useEffect, useState } from "react";
import useAsync from "../hooks/useAsync";
import { getUser } from "@/pages/api/NavBarApi";

interface layoutProps {
  children: ReactNode;
  footerRef?: RefObject<HTMLDivElement>;
  isNavFixed?: boolean;
}

type Data = {
  id?: number;
  name?: string;
  email?: string;
  profileImageSource?: string;
} | null;

const Layout = ({ children, isNavFixed, footerRef }: layoutProps) => {
  const { wrappedFunction: getUserData } = useAsync<Data>(getUser);
  const [data, setData] = useState<Data>(null);
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      setData(null);
    } else {
      getUserData().then(setData);
    }
  }, []);

  const { email, profileImageSource } = data || {};
  const profile = data !== null ? { email, profileImageSource } : undefined;

  return (
    <div>
      <NavigationBar profile={profile} isNavFixed={isNavFixed} />
      <main>{children}</main>
      <Footer footerRef={footerRef} />
    </div>
  );
};

export default Layout;
