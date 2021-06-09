const express = require('express')
const mongoose = require('mongoose')

const app= express()
const Person = require('./Models/personSchema');

//connexion 
const mongoUrl = "mongodb+srv://Marie:hello123@devconnecter.rop2e.mongodb.net/test?authSource=admin&replicaSet=atlas-3u043x-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"   
app.use(express.json()) 


mongoose.connect( mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true }, (err)=>{
    err? console.log(err) : console.log('MongoDB Connected ...')
})

const port = 5000
app.listen(port,(err)=>{
  err ? console.log(err) : console.log('server is running on port 5000')  
})


// Create and Save a Record of a Model:
const createAndSavePerson = (done) => {
    let faten = new Person({ name: 'John', age: 25, favoriteFoods: ['pizza'] })
    faten.save((err, data) => {
        err ? console.log(err) : done(null, data)
    })
  };


  // Create Many Records 
let arrayOfPeople = [
    { name: 'John', age: 30, favoriteFoods: ['salad', 'burritos'] },
    { name: 'Marie', age: 30, favoriteFoods: ['salad', 'burritos'] },
    { name: 'Jennifer', age: 30, favoriteFoods: ['spaghetti','salad',] },
    { name: 'Amelie', age: 30, favoriteFoods: ['mechwi', 'burritos'] },
    { name: 'Camillia ', age: 30, favoriteFoods: ['salad', 'pizza'] }
  ];

  var createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, createdPeople) => {
        err ? console.log(err) : done(null, createdPeople)
    });
  
  };

  // Use model.find() to Search in the  Database
var findPeopleByName = (personName, done) => {
    Person.find({ name: personName }, (err, arrayOfResults) => {
        err ? console.log(err) : done(null, arrayOfResults)
    });
  };

  // Use model.findOne() to return a Single Matching Document from  the Database
var findOneByFood = (food, done) => {
    Person.findOne({ favoriteFoods: { $all: [food] } }, (err, result) => {
        err ? console.log(err) : done(null, result)
    })
  
  }

  // Use model.findById() to search in the database by id
var findPersonById = (personId, done) => {
    Person.findOne(personId, (err, result) => {
        err ? console.log(err) : done(null, result)
    });
  };

  // Perform Classic Updates by Running Find, Edit, then Save
var findEditThenSave = (personId, done) => {
    var foodToAdd = 'hamburger';
    Person.findById(personId, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            result.age = 25,
                result.favoriteFoods.push(foodToAdd),
                result.save((err, updatedRecord) => {
                    err ? console.log(err) : done(null, updatedRecord)
                })
        }
    })
  };


  // Perform New Updates on a Document Using model.findOneAndUpdate()
var findAndUpdate = (personName, done) => {
    var ageToSet = 20;
    Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, updatedRecord) => {
        err ? console.log(err) : done(null, updatedRecord)
  
    });
  };


  // Delete One Document Using model.findByIdAndRemove
var removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, (err, deletedRecord) => {
        err ? console.log(err) : done(null, deletedRecord)
    });
  };

  // MongoDB and Mongoose - Delete Many Documents with model.remove()
var removeManyPeople = (done) => {
    var nameToRemove = 'Marie';
    Person.remove({ name: nameToRemove }, (err, jsonStatus) => {
        err ? console.log(err) : done(null, jsonStatus)
    });
  };

  // Chain Search Query Helpers to Narrow Search Results
var queryChain = (done) => {
    var foodToSearch = "burritos";
    Person.find({ favoriteFoods: { $all: [foodToSearch] } })
        .sort({ name: 'asc' })
        .limit(3)
        .select('-age')
        .exec((err, filteredResults) => {
            err ? console.log(err) : done(null, filteredResults)
        });
  };

  