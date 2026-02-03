import { API } from '../types';

interface Env {
  WORKER_B: Service<API>;
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    // fetch の呼び出し
    const res = await env.WORKER_B.fetch(request);
    const text = await res.text(); // "Hello from B"

    // add の呼び出し
    const sum = await env.WORKER_B.add(1, 2); // 3

    return new Response(text + ', ' + sum);
  },
} satisfies ExportedHandler<Env>;