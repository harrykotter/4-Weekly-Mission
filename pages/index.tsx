import Head from "next/head";
import Layout from "@/src/feature/Layout";
import styles from "@/styles/pages/LandingPage.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Linkbrary</title>
      </Head>
      <Layout>
        <div className={styles.Landing}>
          <div className={styles.LinkWrapper}>
            <Link href="/folder" className={styles.linkButton}>
              폴더 페이지
            </Link>
            <Link href="/shared" className={styles.linkButton}>
              공유 페이지
            </Link>
            <Link href="/signin" className={styles.linkButton}>
              로그인 페이지
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}
