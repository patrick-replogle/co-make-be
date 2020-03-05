exports.up = async function(knex) {
  await knex.schema.createTable("users", user => {
    user.increments();
    user
      .string("username", 128)
      .notNullable()
      .unique();
    user.string("password", 128).notNullable();
    user
      .string("email", 128)
      .notNullable()
      .unique();
    user.string("first_name", 128).notNullable();
    user.string("last_name", 128).notNullable();
    user.text("profile_image_url").defaultTo("");
    user.boolean("government_official").defaultTo(false);
  });

  await knex.schema.createTable("posts", post => {
    post.increments();
    post.string("title", 500).notNullable();
    post.text("description", 1000).notNullable();
    post.string("post_image_url").defaultTo("");
    post.string("city", 128).notNullable();
    post.string("zip_code", 10).notNullable();
    post.timestamp("createdAt").defaultTo(knex.fn.now());
    post
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    post
      .integer("votes")
      .unsigned()
      .notNullable()
      .defaultTo(0);
  });

  await knex.schema.createTable("comments", comment => {
    comment.increments();
    comment.text("text", 500).notNullable();
    comment.string("username").notNullable();
    comment.timestamp("created_at").defaultTo(knex.fn.now());
    comment
      .integer("post_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    comment
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });

  await knex.schema.createTable("votes", vote => {
    vote.increments();
    vote.integer("user_id").notNullable();
    vote
      .integer("post_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("votes");
  await knex.schema.dropTableIfExists("comments");
  await knex.schema.dropTableIfExists("posts");
  await knex.schema.dropTableIfExists("users");
};
