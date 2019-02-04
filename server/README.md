# Totem Server

## Requirements

* NPM
* Node

## Setup

1. `npm install`
2. `cp .env.sample .env`
3. fill out your `.env`

## Try it out!

1. `npm start`
2. Open your favourite browser<sub>*coughchromecough*</sub>
3. Visit `http://localhost:3000`

### Endpoints

* `/`
  * default endpoint
* `/api/signup?email=&username=&display_name=&password=`
  * signs up a new user account
* `/api/users`
  * returns a list of all user accounts
* `/*`
  * any other endpoint will return a 404

## Stack

* Framework: Node/Express
* Database: Sqlite

## Developers

### Scripts

* `npm start`
  * starts up the production server
* `npm run dev`
  * starts up the developer server
* `npm run init-db-prod`
  * creates fresh production database
* `npm run init-db-dev`
  * creates fresh development database
 
