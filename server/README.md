# Totem Server

## Requirements

* [NPM](https://www.npmjs.com/ "Social media website that rates memes.")
* [Node](https://nodejs.org/)

## Setup

1. `git clone https://github.com/MagnusFrater/Totem.git`
2. `cd Totem/server/`
3. `npm run init-prod`
5. fill out your `.env`

## Try it out!

1. `npm start`
2. Open your favourite browser<sub>*coughchromecough*</sub>
3. Visit `http://localhost`

### Routes

#### Authentication

Header Key: `Authorization`

Header Value: `Bearer JWT`

*replace JWT with the one you recieve from a successful signup/login*

#### Webapp

| Endpoint | Description |
| :--- | :--- |
| `/` | default endpoint, forwards to `/splash` |
| `/splash` | landing page |
| `/signup` | signup page |
| `/login` | login page |
| `/forgotpassword` | forgotten password page |
| `/public` | global feed |
| `/private` | friend feed |
| `/tournament` | tournament feed |
| `/profile` | profile page |
| `/settings` | settings page |

#### User

| Method | Endpoint | Description | Body Parameters |
| :---: | :--- | :--- | :---: |
| POST | `/api/user/signup` * | signs up a new user account | email, username, display_name, password, emoji |
| POST | `/api/user/login` * | logs a user in | username, password |
| GET | `/api/user/me` | returns your account information |  |
| GET | `/api/user/profile/username` | replace username with a real username, returns that user's account information |  |
| GET | `/api/user/search?username=<username>` | replace `<username>` with a real username, returns a list of all user accounts with similar usernames |  |
| GET | `/api/user/all` | returns a list of all user accounts |  |
| PUT | `/api/user/update` | updates your account, must pick at least one optional Body Parameter to update | display_name, password, emoji |
| GET | `/api/user/history` | (unimplemented) returns your vote history |  |

#### Friend

| Method | Endpoint | Description | Body Parameters |
| :---: | :--- | :--- | :---: |
| POST | `/api/user/friend` | creates friend request | friend_username |
| GET | `/api/user/friend/requests` | returns a list of all friend requests |  |
| PUT | `/api/user/friend` | accepts a friend request | friend_username |
| GET | `/api/user/friend` | returns a list of all your friends |  |
| DELETE | `/api/user/friend` | deletes friend / friend request | friend_username |

#### Poll

| Method | Endpoint | Description | Body Parameters |
| :---: | :--- | :--- | :---: |
| POST | `/api/poll/personal` | (unimplemented) creates a personal poll |  |
| POST | `/api/poll/challenge` | (unimplemented) creates a challenge request |  |
| GET | `/api/poll/challenge/requests` | (unimplemented) returns a list of all your challenge requests |  |
| PUT | `/api/poll/challenge` | (unimplemented) accepts a challenge request |  |
| GET | `/api/poll/search` | (unimplemented) returns a list of polls |  |
| PUT | `/api/poll/vote` | (unimplemented) sets a vote on a poll |  |

## Stack

* Framework: Node/Express
* Database: Sqlite

## Scripts

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
* `npm run unit tests`
  * runs all unit tests
* `npm run line-count`
  * prints every file's line count and the sum of all line counts for every file created by me (both with and without counting newlines)
 
