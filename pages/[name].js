import { useEffect } from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';

import Layout from '../components/Layout';
import { getUserInfoByName, getUsersSlugs } from '../lib/api';
import Head from 'next/head';
import markdownToHtml from '../lib/markdownToHtml';
import InfoHeader from '../components/InfoHeader';
import AchievementCard from '../components/AchievementCard';
import confetti from 'canvas-confetti';

export default function Post({ user }) {
  const router = useRouter();
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);
  if (!router.isFallback && !user?.Name) {
    return <ErrorPage statusCode={404} />;
  }

  const { Name, Twitter, Github, Peerlist, content } = user;
  return (
    <Layout>
      {router.isFallback ? (
        <div>Loading...</div>
      ) : (
        <>
          <Head>
            <title>{Name} achievements 🎉</title>
            <link rel="icon" href="/achievements.svg" />
          </Head>
          <InfoHeader name={Name} twitter={Twitter} github={Github} peerlist={Peerlist}/>
          <AchievementCard content={content} />
          <a
            href="https://github.com/plxity/achievementsof.life#readme"
            className="create-your-page"
          >
            Create your achievements page 🎉
          </a>
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
    'Peerlist',
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
