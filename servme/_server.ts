import { serve } from "https://deno.land/std@0.147.0/http/server.ts";
import {
  AugmentedRequest,
  createRouteMap,
  createRouter,
  jsonResponse,
  MissingRouteError,
  streamResponse,
} from "https://deno.land/x/reno@v2.0.48/reno/mod.ts";
import * as handlers from "???1";

// prettier-ignore
const config = JSON.parse('???2');
const router = createRouter(
  createRouteMap(
    config.map((item) => [
      `/${item[0]}`,
      () => new Response(`HELLO! This is ${item[0]}, we require params: ${JSON.stringify(item[1])}`),
    ])
  )
);

await serve(
  async (req) => {
    try {
      return await router(req);
    } catch (e) {
      return e instanceof MissingRouteError
        ? createErrorResponse(404, e)
        : createErrorResponse(500, e);
    }
  },
  {
    port: 8080,
  }
);

//#region
const createErrorResponse = (code: number, error: Error) => {
  return new Response(error.message, { status: code });
};
//#endregion
