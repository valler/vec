import { assertEquals, test } from "./dev.ts";
import { fetchShader, vecFromCSSRGBA } from "./utils.ts";
import { set as v } from "./vec.ts";

test("vecFromCSSRGBA", () => {
  assertEquals(
    vecFromCSSRGBA(" rgb( 0, 12, 3, .1, -8, 9) "),
    v(0, 12, 3, .1, -8, 9),
  );
  assertEquals(
    vecFromCSSRGBA(" rgba( 0, 12, 3, .1, -8, 9) "),
    v(0, 12, 3, .1, -8, 9),
  );
  assertEquals(
    vecFromCSSRGBA(" rg( 0, 12, 3, .1, -8, 9) "),
    v(NaN, 12, 3, .1, -8, 9),
  );
});

test("fetchShader", async () => {
  const x = await fetchShader(
    "utils.test.ts",
    "file:///Users/v/Repos/vec/lib/deno/",
  );
  assertEquals(/fetch yourself/.test(x), true);
});
