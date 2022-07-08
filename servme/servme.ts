import { parse } from "https://deno.land/std@0.147.0/flags/mod.ts";
import { build } from "./build.ts";
import { serve } from "./serve.ts";

const data = parse(Deno.args);
const {
  _: [command],
} = data;

switch (command) {
  case "build":
    build(data);
    break;
  case "serve":
    serve(data);
    break;
}
