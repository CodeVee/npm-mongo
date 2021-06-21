require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const { Schema } = mongoose;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const josh = new Person({name: 'Joshua Oyedepo', age: 26, favoriteFoods: ['Rice', 'Yam']});
  josh.save((err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    done(null, data);
  });
};

const arrayOfPeople = [
  {name: 'James Ayinlara', age: 26, favoriteFoods: ['Rice', 'Yam']},
  {name: 'Janet Akunne', age: 29, favoriteFoods: ['Eba', 'Beans']},
  {name: 'June Suleiman', age: 22, favoriteFoods: ['Semo', 'Potatoes']}
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.log(err);
    done(null, people);
  });
};

const personName = 'Jane';
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return console.log(err);
    done(null , data);
  }) 
};

const food = 'Rice';
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) return console.log(err);
    done(null , data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, data) => {
    if (err) return console.log(err);
    done(null , data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
