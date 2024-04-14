import { useGetUser } from "@/src/hooks/useGetUser";
import Footer from "./Footer/Footer";
import NavigationBar from "./NavigationBar";
import { ReactNode, RefObject, useEffect, useState } from "react";
import useAsync from "../hooks/useAsync";
import { setAxiosHeader } from "../util/setAxiosToken";

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
  const { wrappedFunction: getUser } = useAsync<Data>(useGetUser);
  const [data, setData] = useState<Data>(null);
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      setData(null);
    } else {
      setAxiosHeader();
      getUser().then(setData);
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
