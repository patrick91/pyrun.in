import { parseISO, format } from "date-fns";
import matter from "gray-matter";

import { Event } from "../lib/fetch-events";

export const EventItem = ({ event }: { event: Event }) => {
  const { data } = matter(event.description);

  return (
    <li key={event.title} className="text-center">
      <p>{format(parseISO(event.startTime), "dd MMM yyyy 'at' HH:MM")}</p>
      <h3 className="font-bold">{event.title}</h3>
      <p>
        {event.address} - <a href={data.website}>{data.conference}</a>
      </p>
    </li>
  );
};
