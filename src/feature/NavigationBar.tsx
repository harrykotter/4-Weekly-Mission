import Cta from "../ui/Cta";
import Profile from "../ui/Profile";
import styles from "@/styles/feature/NavigationBar.module.css";
import Image from "next/image";
import Link from "next/link";

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
        <Link href="/">
          <Image
            width={133}
            height={100}
            className={styles.NavigationBarLogo}
            src="/assets/linkbrary.svg"
            alt="Linkbrary 서비스 로고"
          />
        </Link>
        {profile ? (
          <Profile profile={profile} />
        ) : (
          <Link href="/signin">
            <Cta>
              <span className={styles.NavigationBarSignin}>로그인</span>
            </Cta>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
