import { assertEquals, test } from "./dev.ts";
import { vecFromCSSRGBA } from "./utils.ts";
import { vec as v4 } from "./vec.ts";

test("vecFromCSSRGBA", () => {
  assertEquals(
    vecFromCSSRGBA(" rgb( 0, 12, 3, .1, -8, 9) "),
    v4(0, 12, 3, .1, -8, 9),
  );
  assertEquals(
    vecFromCSSRGBA(" rgba( 0, 12, 3, .1, -8, 9) "),
    v4(0, 12, 3, .1, -8, 9),
  );
  assertEquals(
    vecFromCSSRGBA(" rg( 0, 12, 3, .1, -8, 9) "),
    v4(NaN, 12, 3, .1, -8, 9),
  );
});
