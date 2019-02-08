# Totem Server

## Requirements

* NPM
* Node

## Setup

1. `git clone https://github.com/MagnusFrater/Totem.git`
2. `cd Totem/server/`
3. `npm run init-prod`
5. fill out your `.env`

## Try it out!

1. `npm start`
2. Open your favourite browser<sub>*coughchromecough*</sub>
3. Visit `http://localhost`

### API

 | Method | Endpoint | Description | Auth Required | Body Parameters |
 | :---: | :--- | :--- | :---: | :---: |
 | GET | `/` | default endpoint |  |  |
 | POST | `/api/user/signup` | signs up a new user account |  | email, username, display_name, password, emoji |
 | POST | `/api/user/login` | logs a user in |  | username, password |
 | GET | `/api/user/me` | returns your account information | ✔️ |  |
 | GET | `/api/user/u/username` | replace username with a real username, returns that user's account information | ✔️ |  |
 | GET | `/api/user/all` | returns a list of all user accounts | ✔️ |  |
 | GET | `/api/user/search` | returns a list of all user accounts with names similar to the query | ✔️ | query |
 | PUT | `/api/user/update` | updates your account | ✔️ | display_name, password, emoji |
 | GET | `/api/user/history` | not implemented | ✔️ |  |

## Stack

* Framework: Node/Express
* Database: Sqlite

## Developers

### Scripts

* `npm run init-prod`
  * one line production server setup script
* `npm start`
  * starts up the production server
* `npm run dev`
  * starts up the developer server
* `npm run init-db-prod`
  * creates fresh production database
* `npm run init-db-dev`
  * creates fresh development database
 
