# auth-api

## Author: Wesam Al-Masri

Auth - API server with basic and bearer authentication system to register a user and login, in addition a two version of  api with two end point for food and clothes, one of the restricted with role permission.

- [Submission Pull Request](https://github.com/401-js-WesamAlmasri/auth-api/pull/1)
- [Tests](https://github.com/401-js-WesamAlmasri/auth-api/actions/)
- [Deployed url](https://auth-api0.herokuapp.com/)

## WRRC

![WRRC](assets/auth-api-wrrc.jpeg)

## Data Model

Physical data model using mongodb

![Data Model](assets/data-modeling.png)

## UML

![UML](assets/auth-api-uml.jpeg)

## Setup

`.env Requierments`

- `PORT` - port number
- `MONGODB_URI` - mongodb connection string
- `SECRET` - api secret key

## Getting Started

1. Clone the repo.
2. Enter the command `npm start`
3. Test
   - Unit Tests: run the command `npm run test`

### Endpoints

#### Ovreview

##### Auth

| Method | Endpint    | Description                                                 |
| ------ | ---------- | ----------------------------------------------------------- |
| POST   | `/signup`  | Create a new user                                           |
| POST   | `/signuin` | Login in with certian user using basic authentication       |
| GET    | `/users`   | Get all users (restricted only to users with admin role)    |
| GET    | `/secret`  | Welcome message to secret stuff (To any authenticated user) |

##### API (v1 and v2)

**Food Model**:

| Method | Endpint            | Description                        |
| ------ | ------------------ | ---------------------------------- |
| POST   | `/api/v1/food`     | Create a new food record           |
| Get    | `/api/v1/food`     | Get all food records               |
| PUT    | `/api/v1/food/:id` | Update the food record with the id |
| DELETE | `/api/v1/food/:id` | Delete the food record with the id |

 |

**Clothes Model**:

| Method | Endpint               | Description                         |
| ------ | --------------------- | ----------------------------------- |
| POST   | `/api/v1/clothes`     | Create a new cloth record           |
| Get    | `/api/v1/clothes`     | Get all cloth records               |
| PUT    | `/api/v1/clothes/:id` | Update the cloth record with the id |
| DELETE | `/api/v1/clothes/:id` | Delete the cloth record with the id |

#### Details

##### Auth

**Request:**

| Method | Endpint   | Description       |
| ------ | --------- | ----------------- |
| POST   | `/signup` | Create a new user |

**Response:** JSON

```json
{
"user": {
    "_id": "60abdbdadef86b8f8e097584",
    "username": "wesamm",
    "password": "$2b$10$LEgyN87IUgyalZs2AqxVUO97kwppgVYaYGtg2CTIFKx8bZFuRoROO",
    "__v": 0
},
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Indlc2FtbSIsImlhdCI6MTYyMTg3NTY3NCwiZXhwIjoxNjIxODc2NTc0fQ.lie2bnZAjbo1LVMCuCWBBfXsgbE6z_v9vmQHWHFeuGE"

}
```

**Request:**

| Method | Endpint    | Description                                           |
| ------ | ---------- | ----------------------------------------------------- |
| POST   | `/signuin` | Login in with certian user using basic authentication |

**Response:** JSON

```json
{
"user": {
    "_id": "60abdbdadef86b8f8e097584",
    "username": "wesamm",
    "password": "$2b$10$LEgyN87IUgyalZs2AqxVUO97kwppgVYaYGtg2CTIFKx8bZFuRoROO",
    "__v": 0
},
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Indlc2FtbSIsImlhdCI6MTYyMTg3NTczNCwiZXhwIjoxNjIxODc2NjM0fQ._NJRpC_VMSC6TbyfOW7MUlAfJehoDzwiWsdwny7d65Q"
}
 ```

**Request:**

| Method | Endpint  | Description                                              |
| ------ | -------- | -------------------------------------------------------- |
| GET    | `/users` | Get all users (restricted only to users with admin role) |

**Response:** JSON

```json
[
"wesam",
"waseem",
"wesamm",
...
]
```

**Request:**

| Method | Endpint   | Description                                                 |
| ------ | --------- | ----------------------------------------------------------- |
| GET    | `/secret` | Welcome message to secret stuff (To any authenticated user) |

**Response:** JSON

```json
Welcome to the secret area
```

##### API (v1 and v2)

###### Food model

**Request:**

| Method | Endpint        | Description              |
| ------ | -------------- | ------------------------ |
| POST   | `/api/v1/food` | create a new food record |

**Response:** JSON

```json
{
   "_id": "60a52e3c2324ab4b3ad1174a",
   "name": "banana ",
   "calories": 500,
   "type": "FRUIT",
   "__v": 0
}
```

**Request:**

| Method | Endpint        | Description          |
| ------ | -------------- | -------------------- |
| GET    | `/api/v1/food` | Get all food records |

**Response:** JSON

```json
[
   {
   "_id": "60a52e3c2324ab4b3ad1174a",
   "name": "banana ",
   "calories": 500,
   "type": "FRUIT",
   "__v": 0
    },
   {
   "_id": "60a52e3c2324ab4b3ad1174a",
   "name": "banana ",
   "calories": 500,
   "type": "FRUIT",
   "__v": 0
},
   ....
]
```

**Request:**

| Method | Endpint            | Description                 |
| ------ | ------------------ | --------------------------- |
| GET    | `/api/v1/food/:id` | Get food record with the id |

**Response:** JSON

```json
{
   "_id": "60a52e3c2324ab4b3ad1174a",
   "name": "banana ",
   "calories": 500,
   "type": "FRUIT",
   "__v": 0
}
```

**Request:**

| Method | Endpint            | Description                        |
| ------ | ------------------ | ---------------------------------- |
| PUT    | `/api/v1/food/:id` | Update the food record with the id |

**Response:** JSON

```json
{
   "_id": "60a52e3c2324ab4b3ad1174a",
   "name": "hamar ",
   "type": "121212",
   "__v": 0
}
```

**Request:**

| Method | Endpint            | Description                        |
| ------ | ------------------ | ---------------------------------- |
| DELETE | `/api/v1/food/:id` | Delete the food record with the id |

**Response:** JSON

```json
{}
```

###### Clothes model

**Request:**

| Method | Endpint           | Description               |
| ------ | ----------------- | ------------------------- |
| POST   | `/api/v1/clothes` | create a new cloth record |

**Response:** JSON

```json
{
   "_id": "60a52e3c2324ab4b3ad1174a",
   "name": "shirt ",
   "color": "red",
   "size": "LASRG",
   "__v": 0
}
```

**Request:**

| Method | Endpint           | Description           |
| ------ | ----------------- | --------------------- |
| GET    | `/api/v1/clothes` | Get all cloth records |

**Response:** JSON

```json
[
   {
   "_id": "60a52e3c2324ab4b3ad1174a",
   "name": "shirt ",
   "color": "red",
   "size": "LASRG",
   "__v": 0
    },
   {
   "_id": "60a52e3c2324ab4b3ad1174a",
   "name": "shirt ",
   "color": "red",
   "size": "LASRG",
   "__v": 0
},
   ....
]
```

**Request:**

| Method | Endpint               | Description                  |
| ------ | --------------------- | ---------------------------- |
| GET    | `/api/v1/clothes/:id` | Get cloth record with the id |

**Response:** JSON

```json
{
   "_id": "60a52e3c2324ab4b3ad1174a",
   "name": "shirt ",
   "color": "red",
   "size": "LASRG",
   "__v": 0
}
```

**Request:**

| Method | Endpint               | Description                         |
| ------ | --------------------- | ----------------------------------- |
| PUT    | `/api/v1/clothes/:id` | Update the cloth record with the id |

**Response:** JSON

```json
{
   "_id": "60a52e3c2324ab4b3ad1174a",
   "name": "shirt ",
   "color": "red",
   "size": "LASRG",
   "__v": 0
}
```

**Request:**

| Method | Endpint               | Description                         |
| ------ | --------------------- | ----------------------------------- |
| DELETE | `/api/v1/vlothes/:id` | Delete the cloth record with the id |

**Response:** JSON

```json
{}
```