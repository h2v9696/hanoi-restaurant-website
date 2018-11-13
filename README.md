## Hanoi restaurant website backend
Content:
- [Installation](#1-Installation)
- [Api list](#2-api-list)

### 1. Installation

#### Prerequisites

Verify ruby and rails installed:
```
ruby --version
```
> ruby 2.5.1p57 (2018-03-29 revision 63029) [x86_64-linux]
```
rails --version
```
> Rails 5.2.1

Install package `libmysqlclient-dev` required by gem mysql2. On ubuntu 18.04:
```
sudo apt install libmysqlclient-dev
```

#### Download
Clone project and cd to it
```
git clone https://github.com/nambn/hanoi-restaurant-website.git --branch backend/develop
cd hanoi-restaurant-website
```

#### Initializing

Install gems
```
bundle install
```
Generate file `config/application.yml` for storing environment variable
```
bundle exec figaro install
```
add these line to `config/application.yml` :
```
MYSQL_USERNAME: # your mysql username eg. root
MYSQL_PASSWORD: # your mysql password eg. 123456
MYSQL_DATABASE_DEV: # name of database your want to create
```
Create database and table, then populate database with fake data:
```
rails db:migrate:reset
rails db:seed
```

### 2. API list

**Note: All URI prefix with /api. Eg. `/users` -> `/api/users`**

#### User Authentication

Request | Uri | Required Fields | Details
--- | --- | --- | ---
POST | /users/sign_in | **Body:** `email`, `password` | Sign in, return user information
DELETE | /users/sign_out | | Sign out

#### User Model

Request | Uri | Required Fields | Details
--- | --- | --- | --- 
GET | /users || Index users
GET | /users/:id || Show user at :id
POST | /users/ | **Body:** `username`, `email`, `password`, `password_comfirmation` | Create new user
PUT<br>PATCH | /users/:id | **Body:** *(all fields is optional)* `username`, `email`, `image_url`, `cover_url`, `address`, `password`, `password_comfirmation` | Update user, when update password must have both `password` & `password_comfirmation` in params.
DELETE | /users/:id | | Delete user

#### Restaurant Model

Request | Uri | Required Fields | Details
--- | --- | --- | --- 
GET | /restaurants | | Index
GET | /restaurants/:id || Show
POST | /restaurants | **Body:** `name`, `address`, `phone`, `description` | Create
PUT<br>PATCH | /restaurants/:id | **Body:** `name`, `address`, `phone`, `description` | Update
DELETE | /restaurants/:id || Destroy

#### Dish Model

Request | Uri | Required Fields | Details
--- | --- | --- | --- 
GET | /dishes | **Params:** `restaurant_id` | Index
GET | /dishes/:dish_id | | Show
POST | /dishes | **Body:** `restaurant_id`, `name`, `price`, `image_url` | Create
PUT<br>PATCH | /dishes/:dish_id | **Body:** `restaurant_id`, `name`, `price`, `image_url` | Update
DELETE | /dishes/:dish_id | | Destroy

#### Rating Model

Request | Uri | Required Fields | Details
--- | --- | --- | --- 
GET | /ratings | **Params:** `restaurant_id` or `user_id` or both | Index
POST | /ratings | **Body:** `restaurant_id`, `user_id`, `value`  | Create
PUT<br>PATCH | /ratings/:id | **Body:** `value` | Update
DELETE | /ratings/:id | | Destroy

#### Comment Model

Request | Uri | Required Fields | Details
--- | --- | --- | --- 
GET | /comments | **Params:** `restaurant_id` or `user_id` or both | Index
GET | /comments/:id | | Return comment of `:id`, bonus user and its child comments.
POST | /comments | **Body:**<br>`restaurant_id`, `user_id`, `content` - create comment on restaurant page <br>`user_id`,  `parent_id`, `content` - create reply of comment with id = `parent_id`| Create
PUT<br>PATCH | /comments/:id | **Body:** `content` | Update
DELETE | /comments/:id | | Destroy

#### Subcription Model

Request | Uri | Required Fields | Details
--- | --- | --- | --- 
GET | /subscriptions | **Params:** `restaurant_id` or `user_id` or both | Index
POST | /subscriptions | **Body:** `restaurant_id`, `user_id` | Create
DELETE | /subscriptions/:id | | Destroy

#### Like Model

Request | Uri | Required Fields | Details
--- | --- | --- | --- 
POST | /likes | **Body:** `user_id`, `object_type`, `object_id` | Create like.<br>`object_type` restaurant is 1, comment is 2.
DELETE | /likes/:id | | Destroy

#### Search

Request | Uri | Required Fields | Details
--- | --- | --- | --- 
GET | /search | **Params:** `q` | Return list of restaurants.<br>Search fields: `name`, `address`, `description`