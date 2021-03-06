const Metalsmith = require("metalsmith");

const markdown = require("metalsmith-markdown");

const layouts = require("metalsmith-layouts");

const collections = require("metalsmith-collections");

const permalinks = require("metalsmith-permalinks");

const handlebars = require("handlebars");

const fs = require("fs");

handlebars.registerPartial(
  "navigation",
  fs.readFileSync(__dirname + "/layouts/partials/navigation.hbt").toString()
);

const serve = require("metalsmith-serve");

const watch = require("metalsmith-watch");

Metalsmith(__dirname)
  .source("src")
  .destination("public")
  .use(
    collections({
      articles: {
        pattern: "articles/*.md",
      },
    })
  )
  .use(markdown())
  .use(
    permalinks({
      pattern: ":collection/:title",
    })
  )
  .use(
    layouts({
      engine: "handlebars",
      directory: "./layouts",
      default: "article.html",
      pattern: ["*/*/*html", "*/*html", "*html"],
      partials: {
        navigation: "partials/navigation",
      },
    })
  )
  // .use(
  //   serve({
  //     port: 8081,
  //     verbose: true,
  //   })
  // )
  // .use(
  //   watch({
  //     paths: {
  //       "${source}/**/*": true,
  //       "layouts/**/*": "**/*",
  //     },
  //   })
  // )
  .build(function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log("build completed!");
    }
  });
