import express from 'express';

export const viewEngine = (app) => {
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
}
 