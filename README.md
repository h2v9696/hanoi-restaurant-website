## Hanoi restaurant website backend

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
Create database with name as above:
```
rake db:create
```
Run server 
```
rails server
```
Open browser and go to [http://localhost:3000]()