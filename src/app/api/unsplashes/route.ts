import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';

const unsplash = createApi({
  accessKey: 'MY_ACCESS_KEY',
  fetch: nodeFetch,
});