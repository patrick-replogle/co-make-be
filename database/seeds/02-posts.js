exports.seed = function (knex, Promise) {
  return knex("posts").insert([
    {
      title: "I need help filling a pot hole",
      description:
        "A pot hole needs to be filled in my neighborhood near 50th and Powell in SE Portland. I am willing to contribute money for concrete, but I could really use help with tools and the someone more skilled than I to actually fill the pothole with new concrete.",
      city: "Portland",
      zip_code: "97206",
      user_id: 1,
      votes: 5,
    },
    {
      title:
        "Does someone have a truck I could use to dump an abandoned couch?",
      description:
        "An old couch has been dumped on the sidewalk in my neighborhood. Can someone with a truck help me take it to the dump or help me donate it to household that would like it?",
      city: "Portland",
      zip_code: "97202",
      user_id: 2,
      votes: 0,
    },
    {
      title: "Looking for volunteers to help feed the homeless",
      description:
        "I am looking to build a small group of local volunteers to help feed the homeless camping in the SE Portland area near 82nd Street. We are also partnering up with a local church to build tiny homes and any help with labor and/or money for supplies would be greatly appreciated.",
      city: "Portland",
      zip_code: "97219",
      user_id: 3,
      votes: 2,
    },
    {
      title: "Neighborhood watch in Alberta area",
      description:
        "After a recent string of burglaries in the NE Portland neighborhood in Alberta, I'm hoping to put together a local neighborhood watch to patrol the area at night. No weapons allowed, just good neighborly intentions.",
      city: "Portland",
      zip_code: "97211",
      user_id: 4,
      votes: 1,
    },
  ]);
};
