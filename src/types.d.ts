// /app/src/types.d.ts
import { WorkerEntrypoint } from "cloudflare:workers";

export declare class API extends WorkerEntrypoint {
  async fetch(req: Request): Promise<Response>;
  async add(a: number, b: number): Promise<number>;
}
