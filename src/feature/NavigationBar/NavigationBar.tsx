import { ROUTE } from "../../util/constant";
import Cta from "../../ui/Cta/Cta";
import Profile from "../../ui/Profile/Profile";
import styles from "@/styles/feature/NavigationBar.module.css";

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
          <img
            className={styles.NavigationBarLogo}
            src="images/linkbrary.svg"
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
