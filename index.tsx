import Head from 'next/head';
import WebhookSender from '../components/WebhookSender';

export default function Home() {
  return (
    <>
      <Head>
        <title>ExoDB Dashboard</title>
      </Head>
      <div className="bg-background min-h-screen p-8">
        <h1 className="text-4xl text-neon text-neon mb-6">
          ExoDB Dashboard
        </h1>
        <WebhookSender />
      </div>
    </>
  );
}
