import { NextResponse } from 'next/server';
import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';

const unsplash = createApi({
  accessKey: 'RwSKZVSfO_nRwsq1_LcR8DzOs81fUsvTMCONPI3SHTY', // Replace with your Unsplash Access Key
  fetch: nodeFetch as unknown as typeof fetch,
});

export async function GET() {
  try {
    const result = await unsplash.photos.getRandom({});
    if (result.type === 'success') {
      return NextResponse.json(result.response);
    } else {
      return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}