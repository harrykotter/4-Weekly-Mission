import { ROUTE } from "../util/constant";
import Cta from "../ui/Cta";
import Profile from "../ui/Profile";
import styles from "@/styles/feature/NavigationBar.module.css";
import Image from "next/image";

interface NavProps {
  isNavFixed?: boolean;
  profile?: {
    profileImageSource?: string;
    email?: string;
  };
}

const NavigationBar = ({ profile, isNavFixed }: NavProps) => {
  const NavBar = isNavFixed
    ? `${styles.NavigationBar} ${styles.NavFixed}`
    : styles.NavigationBar;
  return (
    <nav className={NavBar}>
      <div className={styles.NavigationBarItems}>
        <a href={ROUTE.랜딩}>
          <Image
            width={133}
            height={100}
            className={styles.NavigationBarLogo}
            src="/assets/linkbrary.svg"
            alt="Linkbrary 서비스 로고"
          />
        </a>
        {profile ? (
          <Profile profile={profile} />
        ) : (
          <a href={ROUTE.로그인}>
            <Cta>
              <span className={styles.NavigationBarSignin}>로그인</span>
            </Cta>
          </a>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
