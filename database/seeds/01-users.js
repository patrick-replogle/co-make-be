const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
  return knex("users").insert([
    {
      username: "user1",
      first_name: "Patrick",
      last_name: "Replogle",
      email: "fakeuser1@gmail.com",
      password: bcrypt.hashSync("password", 10),
      profile_image_url: "http://somethinggoeshere.com",
      government_official: false
    },
    {
      username: "user2",
      first_name: "Carina",
      last_name: "Gonzalez",
      email: "fakeuser2@gmail.com",
      password: bcrypt.hashSync("password", 10),
      profile_image_url: "http://somethinggoeshere.com",
      government_official: false
    },
    {
      username: "user3",
      first_name: "Alex",
      last_name: "Kagak",
      email: "fakeuser3@gmail.com",
      password: bcrypt.hashSync("password", 10),
      profile_image_url: "http://somethinggoeshere.com",
      government_official: false
    },
    {
      username: "user4",
      first_name: "Matt",
      last_name: "Cheek",
      email: "fakeuser4@gmail.com",
      password: bcrypt.hashSync("password", 10),
      profile_image_url: "http://somethinggoeshere.com",
      government_official: false
    }
  ]);
};
