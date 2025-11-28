module.exports = [
"[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/real-time-feedback-app/presenter-frontend/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "chunks/ee050_3ece3c5c._.js",
  "chunks/[root-of-the-server]__819e2557._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/real-time-feedback-app/presenter-frontend/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];