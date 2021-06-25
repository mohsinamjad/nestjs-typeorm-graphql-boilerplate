// let modules: any = {};
// (async function () {
//   const lazyRequire = require.context(
//     './',
//     true,
//     /^(?!.*(?:index|test)\.ts).*\.ts$/,
//     'sync',
//   );
//   lazyRequire.keys().forEach(async (filePath) => {
//     const md = lazyRequire(filePath);
//     modules = { ...modules, ...md };
//   });
// })();

// export const middlewares = modules;

export * from './logger.middleware';
