const mongoose = require("mongoose");
const { User } = require("./User");
const { Persons } = require("./User");
const dotenv = require("dotenv").config();

const database = (module.exports = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
  
  } catch (e) {
    console.log(e);
  }
});

database();

//Creation personne
async function run() {
  const user = new User({
    name: "mounir",
    age: 25,
    favoriteFoods: ["banana", "ananas"],
  });
  await user.save();
}
run();

//Create Many Records
Persons.createCollection()
  .then(function (arrayOfPeople) {
    console.log(arrayOfPeople);
  })
  .then(
    Persons.insertMany([
      {
        name: "nawfel",
        age: 38,
        favoriteFoods: ["peaches", "bread", "milk", "burritos"],
      },
      {
        name: "jamila",
        age: 44,
        favoriteFoods: ["salad", "tomatoes"],
      },
      {
        name: "morsi",
        age: 11,
        favoriteFoods: ["Sushi", "mango", "burritos"],
      },
      {
        name: "mohammed",
        age: 32,
        favoriteFoods: [
          "Meatloaf",
          "burritos",
        ],
      },
      {
        name: "ali",
        age: 99,
        favoriteFoods: ["butter", "lettuce"],
      },
    ])
  );

//trouver




Persons.find({ name: "ali" }, function (err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log("Result : ", res);
  }
});


Persons.findOne({ name: "mohammed" }, function (err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log("Result : ", res);
  }
});


Persons.findById("63f3268a292e51bd27b08353", function (err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log("Result : ", res);
  }
});

//Classic Updates Find, Edit, then Save
Persons.findOne({ name: "jamila" }).then((user) => {
  user.favoriteFoods.push("Hamburger");
  user.markModified("favoriteFoods");
  user.save((err) => console.log(err));
});


Persons.findOneAndUpdate(
  { name: "nawfel" },
  { name: "ezzeddine" },
  null,
  function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Original Doc : ", docs);
    }
  }
);




//findByIdAndRemove
Persons.findByIdAndRemove("63f32d8a7ac8f62fb085d755", function (err, docs) {
  if (err) {
    console.log(err);
  } else {
    console.log("Deleted User : ", docs);
  }
});

//Delete Many Documents
Persons.remove({ name: "ali" }).then((result) => {
  console.log(result);
});

//Chain Search Query Helpers

Persons.find({ favoriteFoods: "burritos" })
  .sort({ name: "asc" })
  .limit(2)
  .select("-age")
  .exec()
  .then((result) => {
    console.log(result);
  });
