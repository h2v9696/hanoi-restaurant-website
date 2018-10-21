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
Create database and table, then populate database with fake data (if database already exists, drop it: `rails db:drop`)
```
rails db:setup
```
Test server 
```
rails server
```
Open browser and go to [http://localhost:3000](http://localhost:3000)

### 2. API list

**Note: All URI prefix with /api. Eg. `/users` -> `/api/users`**

#### User Authentication

Request | Uri | Required Fields | Details
--- | --- | --- | ---
POST | /users/sign_in | **Body:** `email`, `password` | Sign in<br>Return `uid`, new `access-token`, new `client` in Headers
DELETE | /users/sign_out | **Headers:** `uid`, `access-token`, `client` | Sign out

#### User Model

Request | Uri | Required Fields | Details
--- | --- | --- | --- 
GET | /users || Index users
GET | /users/:id || Show user at :id
POST | /users | **Body:** `username`, `email`, `password`, `password_comfirmation` | Create new user
PUT | /users | **Headers:** `uid`, `access-token`, `client`<br> **Body:** *(all fields is optional)* `username`, `email`, `image_url`, `cover_url`, `address`, `password`, `password_comfirmation` | Update user.<br>For update password: must include `current_password` in Body.<br>Return `uid`, new `access-token`, same `client`.
DELETE | /users | **Headers:** `uid`, `access-token`, `client` | Delete user

#### Restaurant Model

Request | Uri | Required Fields | Details
--- | --- | --- | --- 
GET | /restaurants | | Index
GET | /restaurants/:id || Show
POST | /restaurants | **Body:** `name`, `address`, `phone`, `description` | Create
PATCH | /restaurants/:id | **Body:** `name`, `address`, `phone`, `description` | Update
DELETE | /restaurants/:id || Destroy

#### Dish Model

Request | Uri | Required Fields | Details
--- | --- | --- | --- 
GET | /dishes | **Params:** `restaurant_id` | Index
GET | /dishes/:dish_id | | Show
POST | /dishes | **Body:** `restaurant_id`, `name`, `price`, `image_url` | Create
PATCH | /dishes/:dish_id | **Body:** `restaurant_id`, `name`, `price`, `image_url` | Update
DELETE | /dishes/:dish_id | | Destroy

#### Rating Model

Request | Uri | Required Fields | Details
--- | --- | --- | --- 
GET | /ratings | **Params:** `restaurant_id` or `user_id` or both | Index
POST | /ratings | **Body:** `restaurant_id`, `user_id`, `value`  | Create
PATCH | /ratings/:rating_id | **Body:** `value` | Update
DELETE | /ratings/:rating_id | | Destroy

#### Comment Model

Request | Uri | Required Fields | Details
--- | --- | --- | --- 
GET | /comments | **Params:** `restaurant_id` or `user_id` or both | Index
GET | /comments/:comment_id | | Show
POST | /comments | **Body:** `restaurant_id`, `user_id`, `content` | Create
PATCH | /comments/:comment_id | **Body:** `content` | Update
DELETE | /comments/:comment_id | | Destroy

#### Subcription Model

Request | Uri | Required Fields | Details
--- | --- | --- | --- 
GET | /subscriptions | **Params:** `restaurant_id` or `user_id` or both | Index
POST | /subscriptions | **Body:** `restaurant_id`, `user_id` | Create
DELETE | /subscriptions/:subscription_id | | Destroy

#### Like Model

Request | Uri | Required Fields | Details
--- | --- | --- | --- 
GET | /likes | **Params:** `user_id` or (`object_type` & `object_id`) or both | Index
POST | /likes | **Body:** `user_id`, `object_type`, `object_id` | Create
DELETE | /likes/:like_id | | Destroy
