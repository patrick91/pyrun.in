import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Event, fetchEvents } from "../lib/fetch-events";

const Home: NextPage = ({ events }: { events: Event[] }) => {
  return (
    <div>
      <Head>
        <title>PyRun</title>
        <meta name="description" content="Run for Python" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>PyRun</h1>

        <h2>Next event(s)</h2>

        <ul>
          {events.map((event) => (
            <li key={event.title}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>{event.address}</p>
              <p>{event.zone}</p>
              <p>{event.startTime}</p>
            </li>
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
