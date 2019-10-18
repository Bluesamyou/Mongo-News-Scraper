const axios = require('axios')
const cheerio = require("cheerio");
const db = require("../models");
const mongoose = require('mongoose');

module.exports = function (app) {
  app.get("/api/loadArticles", function (req, res) {
    db.Articles.find({}).then(function (articles) {
        res.status(200).json(articles);
      })
      .catch(function (err) {
        res.status(500).end()
      })
  })


  app.get("/api/fetchArticles", function (req, res) {
    axios({
        method: "get",
        url: "https://www.9news.com.au/just-in",
        headers: {
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36"
        }
      })
      .then(function (body) {
        var $ = cheerio.load(body.data);

        db.Articles.find({}).deleteMany().exec();

        $(".story-block").each(function (item, index) {
          if ($(this).find(".story__abstract").text() && $(this).find(".story__headline__text").text()) {
            db.Articles.create({
              title: $(this).find(".story__headline__text").text(),
              body: $(this).find(".story__abstract").text()
            })
          }
        })

        res.status(200).end()
      })
      .catch(function (err) {
        res.status(500).send(err)
      })
  })
  app.delete("/api/deleteArticles", function (req, res) {
    db.Articles.find({}).deleteMany().exec();

    res.status(200).end()
  })

  app.post("/api/saveArticle", function (req, res) {
    var id = req.body.id


  })
};