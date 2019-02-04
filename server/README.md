# Totem Server

## Requirements

* NPM
* Node

## Setup

1. `npm install`
2. `npm run init-db-prod`
3. `cp .env.sample .env`
4. fill out your `.env`

## Try it out!

1. `npm start`
2. Open your favourite browser<sub>*coughchromecough*</sub>
3. Visit `http://localhost`

### API

 | Method | Endpoint | Description | Auth Required | Body |
 | :---: | :--- | :--- | :---: | :--- |
 | GET | `/` | default endpoint |  |  |
 | POST | `/api/signup` | signs up a new user account |  | email, username, display_name, password, emoji |
 | POST | `/api/login` | logs a user in |  | username, password |
 | GET | `/api/users` | returns a list of all user accounts | ✔️ |  |

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
 
