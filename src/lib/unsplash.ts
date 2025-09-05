import { createApi } from "unsplash-js";
import nodeFetch from "node-fetch";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY as string,
  fetch: nodeFetch as unknown as typeof fetch,
});
export default unsplash;
