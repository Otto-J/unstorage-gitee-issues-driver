await Bun.build({
  entrypoints: ["packages/gitee-issues/index.tsx"],
  outdir: "./build",
});
console.log("Build complete!");
