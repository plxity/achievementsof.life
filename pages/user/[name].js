import { useEffect } from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Layout from '../../components/Layout';
import { getUserInfoByName, getUsersSlugs } from '../../lib/api';
import Head from 'next/head';
import markdownToHtml from '../../lib/markdownToHtml';
import InfoHeader from '../../components/InfoHeader';
import AchievementCard from '../../components/AchievementCard';
import confetti from 'canvas-confetti';
export default function Post({ user }) {
  const router = useRouter();
  if (!router.isFallback && !user?.Name) {
    return <ErrorPage statusCode={404} />;
  }

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  const { Name, Twitter, Github, content } = user;
  return (
    <Layout>
      {router.isFallback ? (
        <div>Loading...</div>
      ) : (
        <>
          <Head>
            <title>{Name} achievements 🎉</title>
          </Head>
          <InfoHeader name={Name} twitter={Twitter} github={Github} />
          <AchievementCard content={content} />
        </>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const user = getUserInfoByName(params.name, [
    'Name',
    'Twitter',
    'Github',
    'Interest',
    'content',
  ]);
  const content = await markdownToHtml(user.content || '');

  return {
    props: {
      user: {
        ...user,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const users = getUsersSlugs(['name']);
  return {
    paths: users.map((user) => {
      return {
        params: {
          name: user,
        },
      };
    }),
    fallback: false,
  };
}
