import { Project } from "https://deno.land/x/ts_morph/mod.ts";

type FieldValue = string | number;

export const build = (data: { _: FieldValue[] }) => {
  const source = data._[1];
  if (!source) throw new Error("Must set value for source!");
  if (typeof source !== "string") throw new Error("Invalid type of source!");

  const project = new Project({});
  project.addSourceFileAtPath(source);
  const file = project.getSourceFileOrThrow(source);

  const items = [];
  for (const fn of file.getFunctions()) {
    if (!fn.isExported()) continue;

    const name = fn.getName();
    const params = fn
      .getParameters()
      .map((param) => [param.getName(), param.getType().getText()]);
    items.push([name, params]);
  }

  console.log(JSON.stringify(items));
};
