exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("comments")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("comments").insert([
        {
          username: "user2",
          text: "I could help out with this. DM me for details.",
          post_id: 1,
          user_id: 2
        },
        {
          username: "user1",
          text:
            "I have a large truck and I don't mind hauling this off to the dump for you.",
          post_id: 2,
          user_id: 1
        },
        {
          username: "user4",
          text: "I would love to volunteer to help with this.",
          post_id: 3,
          user_id: 4
        },
        {
          username: "user1",
          text:
            "There are some other foundations in town that would probably be good to reach out to help with this. I'll DM you their contacts.",
          post_id: 3,
          user_id: 1
        }
      ]);
    });
};
