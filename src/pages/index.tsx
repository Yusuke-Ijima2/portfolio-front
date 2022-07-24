import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import { useAuth0 } from "@auth0/auth0-react";

// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// }
export async function getServerSideProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <Layout home>
        <p className="bg-blue-500 bg-opacity-100">Hello world!</p>
        <h1 className="... rotate-180 transform">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <Link href={`/test`}>
                  <a>test</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </section>
      </Layout>
      <div className="flex justify-center">
        <button
          className="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
          onClick={() => loginWithRedirect()}
        >
          ログイン
        </button>
      </div>
    </>
  );
}