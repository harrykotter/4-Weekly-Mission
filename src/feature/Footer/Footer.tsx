import { ROUTE } from "@/src/util/constant";
import styles from "@/styles/feature/Footer.module.css";
import TEXT from "./constant";
import { RefObject } from "react";
import Image from "next/image";

const Footer = ({ footerRef }: { footerRef?: RefObject<HTMLDivElement> }) => {
  return (
    <footer className={styles.Footer} ref={footerRef}>
      <div className={styles.FooterItems}>
        <span className={styles.FooterCopyright}>{TEXT.codeit}</span>
        <div className={styles.FooterLinks}>
          <a className={styles.FooterLink} href={ROUTE.개인정보처리방침}>
            {TEXT.privacyPolicy}
          </a>
          <a className={styles.FooterLink} href={ROUTE.FAQ}>
            {TEXT.faq}
          </a>
        </div>
        <div className={styles.FooterSns}>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              width={20}
              height={20}
              src="/assets/facebook.svg"
              alt="facebook 홈페이지로 연결된 facebook 로고"
            />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              width={20}
              height={20}
              src="/assets/twitter.svg"
              alt="twitter 홈페이지로 연결된 twitter 로고"
            />
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              width={20}
              height={20}
              src="/assets/youtube.svg"
              alt="youtube 홈페이지로 연결된 youtube 로고"
            />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              width={20}
              height={20}
              src="/assets/instagram.svg"
              alt="instagram 홈페이지로 연결된 instagram 로고"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
