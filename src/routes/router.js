const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();
const Person = require("../models/person");
console.log(process.env.TESTING);
require("../database/mongoose");



router.get("/person", (req, res) => {
  res.render("person");
});

router.get("/persons", function (req, res, next) {
  Person.find(function (err, persons) {
    if (err) return next(err);
    res.render("persons", { students: persons });
  });
});


router.post("/addPerson", async (req, res) => {

  const { name, lastName, age, typeBlood, nss } = req.body;
  var newStudent = new Person({
    nss: nss,
    firstName: name,
    lastName: lastName,
    age: age,
    typeBlood: typeBlood,
  });
  await newStudent.save();
  res.redirect("/main");
});


router.get("/deletePerson/:id", function (req, res, next) {
  console.log(req.params.id);
  Person.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.redirect("/persons");
  });
});

router.get("/findById/:id", function (req, res, next) {
  console.log(req.params.id);
  Person.findById(req.params.id, function (err, person) {
    if (err) return next(err);

    res.render("personUpdate", { person });
  });
});

router.post("/updatePerson/:id", function (req, res, next) {
  console.log(`${req.params.id} unu`);
  console.log(`${JSON.stringify(req.body)} unu`);

  Person.findByIdAndUpdate(
    req.params.id,
    {
      nss: req.body.nss,
      firstName: req.body.name,
      lastName: req.body.lastName,
      age: req.body.age,
      typeBlood: req.body.typeBlood,
    },
    function (err, post) {
      if (err) return next(err);
      res.redirect("/persons");
    }
  );
});

module.exports = router;
