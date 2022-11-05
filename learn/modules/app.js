import repl from "../../app/repl/mod.js";
const d = document;
(() => {
    const input = d.getElementById("repl-i-0");
    if (!input)
        return;
    const output = d.getElementById("repl-o-0");
    if (!(output instanceof HTMLOutputElement))
        return;
    const error = d.getElementById("repl-e-0");
    if (!(error instanceof HTMLOutputElement))
        return;
    repl({ input, output, error });
})();
//# sourceMappingURL=app.js.map