import { isValid as isVec4 } from "../lib/js/vec4.js";
import { isValid as isVec3 } from "../lib/js/vec3.js";
import { vecFromCSSRGBA } from "../lib/js/utils.js";
export const hasDevicePixelContentBox = async () => {
    try {
        return await new Promise((resolve) => {
            const ro = new ResizeObserver((entries) => {
                resolve(entries.every((entry) => "devicePixelContentBoxSize" in entry));
                ro.disconnect();
            });
            ro.observe(document.body, { box: "device-pixel-content-box" });
        });
    }
    catch {
        return false;
    }
};
export const getElementColor = (target) => {
    const { color: colorString } = getComputedStyle(target);
    const unknownColor = vecFromCSSRGBA(colorString);
    let color;
    if (isVec4(unknownColor)) {
        const [r, g, b, a] = unknownColor;
        return [r / 255, g / 255, b / 255, a];
    }
    else if (isVec3(unknownColor)) {
        const [r, g, b] = unknownColor;
        return [r / 255, g / 255, b / 255, 1];
    }
    else if (matchMedia("(prefers-color-scheme: dark)").matches) {
        return [1, 1, 1, 1];
    }
    else {
        return [0, 1, 0, 1];
    }
};
//# sourceMappingURL=utils.js.map