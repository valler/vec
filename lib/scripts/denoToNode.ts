import { readDirSync, readTextFile, writeTextFile } from "./deps.ts";

const dir = readDirSync("deno");
for (const enrty of dir) {
  if (enrty.isFile) {
    const { name } = enrty;
    if (
      name !== "dev.ts" && name.endsWith(".ts") && !name.endsWith(".test.ts")
    ) {
      readTextFile(`deno/${name}`).then(transformImports(name));
    }
  }
}
function transformImports(name: string) {
  return (content: string) => {
    // replace import file extension
    const transformed = content.replaceAll(
      /([ }]from\s*['"]\.\.?\/[^'"]+\.)[Tt][Ss](['"]\s*;?)/g,
      "$1js$2",
    );
    writeTextFile(`js/${name}`, transformed);
  };
}
