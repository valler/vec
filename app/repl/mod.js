const repl = ({ input, output, error }) => {
    const prefix = "data:text/javascript;charset=utf-8,";
    input.addEventListener("input", async () => {
        const href = prefix + encodeURIComponent(input.textContent || "");
        try {
            output.value = (await import(href)).default;
            error.value = "";
        }
        catch (e) {
            output.value = "";
            error.value = `${e}`;
        }
    });
};
export default repl;
const d = document;
export const initRepl = (...[i, o, e]) => {
    const input = d.getElementById(i);
    if (!input)
        return;
    const output = d.getElementById(o);
    if (!(output instanceof HTMLOutputElement))
        return;
    const error = d.getElementById(e);
    if (!(error instanceof HTMLOutputElement))
        return;
    repl({ input, output, error });
};
//# sourceMappingURL=mod.js.map