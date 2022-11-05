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
//# sourceMappingURL=mod.js.map