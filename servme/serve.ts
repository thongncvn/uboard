import { exec } from "https://deno.land/x/exec@0.0.5/mod.ts";
import { readLines } from "https://deno.land/std@0.147.0/io/buffer.ts";

export const serve = async (data: any) => {
  /**
   * TODO:
   * - Check if conf is a JSON string of valid config object.
   * - Check if conf is not... malicious.
   * - The same to `source`.
   */
  const config = (await readLines(Deno.stdin).next()).value;
  const file = Deno.makeTempFileSync({ dir: Deno.cwd(), suffix: ".ts" });

  Deno.addSignalListener("SIGINT", () => {
    Deno.removeSync(file);
    Deno.exit();
  });

  const {
    _: [, source],
  } = data;
  const template = `${new URL('.', import.meta.url).pathname}_server.ts`;
  const content = new TextDecoder("utf-8")
    .decode(Deno.readFileSync(template))
    .replace("???1", source)
    .replace("???2", config);
  Deno.writeTextFileSync(file, content);

  await exec(`deno run --watch --allow-net ${file}`);
  Deno.removeSync(file);
};
