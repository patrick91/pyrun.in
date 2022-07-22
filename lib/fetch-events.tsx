import puppeteer from "puppeteer";

export type Event = {
  title: string;
  description: string;
  address: string;
  zone: string;
  startTime: string;
};

const fetchEvent = async (url: string, puppeteer: puppeteer.Browser) => {
  const page = await puppeteer.newPage();
  await page.goto(url);
  await page.waitForNetworkIdle();
  const eventData = await page.evaluate(() => {
    return (window as any).groupEventJson.group_event;
  });

  return {
    title: eventData.title,
    description: eventData.description,
    address: eventData.address,
    zone: eventData.zone,
    startTime: eventData.schedule.start_time,
  } as Event;
};

export const fetchEvents = async () => {
  const base = "https://www.strava.com";

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(`${base}/clubs/1063997`);

  // find all elements with class group-event-title

  const urls = await page
    .evaluate(() => {
      const elements = document.querySelectorAll(".group-event-title");
      return Array.from(elements).map((element) =>
        element.getAttribute("href")
      );
    })
    .then((urls) => urls.map((url) => `${base}${url}`));

  const events = await Promise.all(
    urls.map(async (url) => {
      const event = await fetchEvent(url, browser);
      return event;
    })
  );

  await browser.close();

  return events;
};
