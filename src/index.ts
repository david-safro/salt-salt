const server = Bun.serve({
    port: 3000,
    async fetch(req) {
        const url = new URL(req.url);

        if (url.pathname === "/") {
            return new Response(Bun.file("public/index.html"));
        }

        if (url.pathname.startsWith("/public/")) {
            return new Response(Bun.file(url.pathname.slice(1)));
        }

        if (url.pathname.startsWith("/src/") && url.pathname.endsWith(".ts")) {
            const file = Bun.file(url.pathname.slice(1));
            const exists = await file.exists();

            if (exists) {
                const transpiled = await Bun.build({
                    entrypoints: [url.pathname.slice(1)],
                    format: "esm",
                    target: "browser",
                });

                if (transpiled.outputs[0]) {
                    return new Response(transpiled.outputs[0], {
                        headers: { "Content-Type": "application/javascript" },
                    });
                }
            }
        }

        return new Response("Not Found", { status: 404 });
    },
});

console.log(`🎮 Dev server running at http://localhost:${server.port}`);
console.log(`📂 Open http://localhost:${server.port} in your browser`);