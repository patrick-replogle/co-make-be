# coMake

Back end repository for: coMake

Base url: "https://co-make-be.herokuapp.com/"

## Tech Stack
Node JS, Express, Knex, PostgreSQL, SQLite3, bcryptjs, jsonwebtoken

## API Routes

### Auth endpoints
| http type |            endpoint            |      category    | payload |
| --------- | :----------------------------: | --------------:  | -------:|
| post      |       /api/auth/register       |          auth    |     yes |
| post      |        /api/auth/login         |          auth    |     yes |

### User endpoints
| http type |            endpoint            |      category    | payload |
| --------- | :----------------------------: | --------------:  | -------:|
| get       |         /api/users/:id         |    user by id    |      no |
| put       |         /api/users/:id         |    edit  user    |     yes |
| delete    |         /api/users/:id         |   delete user    |      no |

### Posts endpoints
| http type |            endpoint            |      category    | payload |
| --------- | :----------------------------: | --------------:  | -------:|
| get       |           /api/posts           |     all posts    |      no |
| get       |      /api/posts/comments       |posts w/ comments |      no |
| get       |         /api/posts/:id         |    post by id    |      no |
| get       |       /api/posts/by/user       | posts by user    |      no |
| post      |           /api/posts           |     add post     |     yes |
| put       |         /api/posts/:id         |   edit post      |     yes |
| delete    |         /api/posts/:id         |  delete post     |      no |


### Search posts by city and zipcode endpoints
| http type |            endpoint            |      category    | payload |
| --------- | :----------------------------: | --------------:  | -------:|
| post      |         /api/posts/city        |  posts by city   |     yes |
| post      |         /api/posts/zipcode     |posts by zip_code |     yes |


### Votes endpoints
| http type |            endpoint            |      category    | payload |
| --------- | :----------------------------: | --------------:  | -------:|
| post      | /api/posts/:id/increment/votes | increase votes   |      no |



### Comments endpoints
| http type |            endpoint            |      category              | payload |
| --------- | :----------------------------: | --------------------------:|--------:|
| get       |    /api/posts/:id/comments     | all comments for one post  |      no |
| post      |    /api/posts/:id/comments     | add comment to post        |     yes |
| put       |       /api/comments/:id        | edit comment               |     yes |
| delete    |       /api/comments/:id        | delete comment             |      no |

## Authentication Endpoints:

### Register a new user:

POST /api/auth/register

Required fields: username, password, first_name, last_name, email

Optional Fields: profile_image_url, government_official (boolean)

Expected Request Body:

```
{
  "username": "user1",
  "password": "password",
  "first_name": "Patrick",
  "last_name": "Replogle",
  "email": "user1@gmail.com",
  "profile_image_url": "http://www.image_url.com"
}
```

Returns:

```
{
    "new_user": {
        "id": 1,
        "username": "user1",
        "first_name": "Patrick",
        "last_name": "Replogle",
        "email": "user1@email.com",
        "profile_image_url": "http://www.image_url.com",
        "government_official": 0

    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjQsInVzZXJuYW1lIjoiRGVtbzUiLCJpYXQiOjE1NzY4MDg1OTgsImV4cCI6MTU3NjgxMjE5OH0.PCNRX9Wn16kFBrTDNdQtHlyqs8BbiLxvAXvJHXDokzM"
}
```

### Login user endpoint:

POST /api/auth/login

Expected Request Body:

```
{
  "username": "user1",
  "password": "password"
}
```

Returns:

```
{
    "id": 1,
    "username": "user1",
    "message": "Welcome user1!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyMiIsImlhdCI6MTU4MjU2NTg1NSwiZXhwIjoxNTgzMTcwNjU1fQ.co-vWFadM3IbKznIUVsbyZkOqv7A1h1evS4jIsGpokA"
}
```

## User Endpoints

### Get user info by user id

GET /api/users/:id

Returns:

```
{
  "id": 1,
  "username": "user1-edited",
  "first_name": "Patrick",
  "last_name": "Replogle",
  "email": "user1@gmail.com",
  "profile_image_url": "http://www.image_url.com"
}
```

### Update user by user id

PUT /api/users/:id

Expected Request Body:

```
{
  "username": "user1-edited",
  "password": "password",
  "first_name": "Patrick",
  "last_name": "Replogle",
  "email": "user1@gmail.com",
  "profile_image_url": "http://www.image_url.com"
}
```

Returns:

```
{
  "id": 1,
  "username": "user1-edited",
  "first_name": "Patrick",
  "last_name": "Replogle",
  "email": "user1@gmail.com",
  "profile_image_url": "http://www.image_url.com"
}
```

### Delete user

DELETE /api/users/:id

Returns:

```
{
  message: "User account successfully deleted",
  removed: 1
}
```

## Posts Endpoints

### Get all posts for all users

GET /api/posts

### Get all posts for all users with comments

GET /api/posts/comments 

### Get post and related comments using post id

GET /api/posts/:id

### Get posts authored by logged in user

GET /api/posts/by/user

### Add new post

Required fields: title, description, city, zip_code

optional fields: post_image_url

POST /api/posts

Expected Request Body:

```
{
  "title": "need help",
  "description": "stuff needs to be fixed",
  "city": "Portland",
  "zip_code": "97206",
  "post_image_url": "www.image.com"
}
```

Returns:

```
{
  "id": 5,
  "title": "need help",
  "description": "stuff needs to be fixed",
  "post_image_url": "www.image.com",
  "city": "Portland",
  "zip_code": "97206",
  "user_id": 1,
  "votes": 0,
  "authorUsername": "user1",
  "authorEmail": "fakeuser1@gmail.com",
  "createdAt": "2020-03-04 23:15:58"
}
```

### Update post using post id

Same required/optional fields as adding a post

PUT /api/posts/:id

### Delete post using post id

DELETE /api/posts/:id

## Search posts by city or zip_code

### Search Posts by city

POST /api/posts/city

required fields: city (not case sensitive)

Expected Request Body:

```
{
  "city": "portland"
}
```

### Search Posts by zip_code

POST /api/posts/zipcode

required fields: zip_code 

Expected Request Body:

```
{
  "zip_code": "97219"
}
```

## Votes Endpoints

### Increment votes for one post using post id

No need to add a payload/body to this request. User can only vote once. A second post from the same user to a post that he/she has already voted on will remove the first vote.

POST /api/posts/:id/increment/votes


## Comments Endpoints

### Get all comments associated with a single post

GET /api/posts/:id/comments

### Add comment to post using post id

Required fields: text

POST /api/posts/:id/comments

Expected Request Body:

```
{
  "text": "new comment"
}
```

Returns:

```
{
  "id": 9,
  "text": "new comment",
  "username": "user1",
  "post_id": 4,
  "user_id": 1
}
```

### Edit comment using comment id

Required fields: text

PUT /api/comments/:id

```
{
  "text": "edited comment"
}
```

Returns:

```
{
  "id": 4,
  "text": "edited comment",
  "username": "user1",
  "post_id": 3,
  "user_id": 1
}
```

### Delete a comment using comment id

DELETE /api/comments/:id
