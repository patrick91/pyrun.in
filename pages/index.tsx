import type { NextPage } from "next";
import Head from "next/head";
import { EventItem } from "../components/event-item";
import { Event, fetchEvents } from "../lib/fetch-events";

const Home: NextPage<{ events: Event[] }> = ({ events }) => {
  return (
    <div>
      <Head>
        <title>PyRun</title>
        <meta name="description" content="Run for Python" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <header className="text-center p-6">
          <h1 className="font-logo font-extrabold text-7xl">PyRun</h1>
        </header>

        <div className="text-center">
          <h2 className="font-heading text-3xl">Next event(s)</h2>
        </div>

        <ul>
          {events.map((event) => (
            <EventItem event={event} key={event.title} />
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const events = await fetchEvents();

  return {
    props: { events },
  };
}
