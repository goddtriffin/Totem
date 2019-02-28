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

`$` = *unauthenticated routes*

#### Authentication

Header Key: `Authorization`

Header Value: `Bearer JWT`

*replace JWT with the one you recieve from a successful signup/login*

#### Body Encoding

Any route that requires an image file to be uploaded: `multipart/form-data`

All other routes: `application/x-www-form-urlencoded`

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
| `/profile` | profile page |

#### User

User object contains:
```
email
username
display_name
emoji
tiki_tally
polls_created
win_rate
```

| Method | Endpoint | Description | Parameters |
| :---: | :--- | :--- | :---: |
| POST | $ `/api/user/signup` | signs up a new user account | email, username, display_name, password, emoji |
| POST | $ `/api/user/login` | logs a user in | username, password |
| GET | `/api/user/me` | returns your account information |  |
| GET | `/api/user/profile/:username` | returns that user's account information (replace `:username` with a real username) |  |
| GET | `/api/user/search?username=<username>` | returns a list of all user accounts with similar usernames (replace `<username>` with a real username) |  |
| GET | `/api/user/all` | returns a list of all user accounts |  |
| PUT | `/api/user/update` | updates your account, must pick at least one optional Body parameter to update | display_name, password, emoji |
| GET | `/api/user/history` | returns your poll vote history |  |

#### Friend

Friend object contains:
```
username
display_name
emoji
tiki_tally
```

| Method | Endpoint | Description | Parameters |
| :---: | :--- | :--- | :---: |
| POST | `/api/user/friend` | creates friend request | friend_username |
| GET | `/api/user/friend/requests` | returns a list of all friend requests |  |
| PUT | `/api/user/friend` | accepts a friend request | friend_username |
| GET | `/api/user/friend` | returns a list of all your friends |  |
| DELETE | `/api/user/friend` | deletes friend / friend request | friend_username |

#### Poll

Poll object contains:
```
id
display_name
theme
creator
opponent
image_1
image_2
votes_1
votes_2
state
type
duration
scope
start_time
end_time
```

| Method | Endpoint | Description | Parameters |
| :---: | :--- | :--- | :---: |
| POST | `/api/poll/personal` | creates a personal poll | display_name, theme, creator, duration, scope, image_1, image_2 |
| POST | `/api/poll/challenge` | creates a challenge request | display_name, theme, creator, opponent, duration, scope, image |
| GET | `/api/poll/challenge/requests` | returns a list of all your challenge requests |  |
| PUT | `/api/poll/challenge/request/:id` | accepts a challenge request (replace `:id` with a real poll id) | image |
| GET | `/api/poll/challenge/requests/accepted` | returns a list of all your accepted challenge requests |  |
| PUT | `/api/poll/challenge/request/:id` | starts a challenge (replace `:id` with a real poll id) |  |
| GET | `/api/poll/:id` | returns that poll's information (replace `:id` with a real poll id) |  |
| GET | `/api/poll/search?display_name=<display_name>` | returns a list of polls (replace `<display_name>` with a real display_name) |  |
| PUT | `/api/poll/vote/:id` | replace `:id` with a real poll id, sets a vote on a poll |  |

#### Feed

Feed returns a list of Poll objects.

| Method | Endpoint | Description | Parameters |
| :---: | :--- | :--- | :---: |
| GET | `/api/feed/public` | returns a user's public feed |  |
| GET | `/api/feed/private` | returns a user's private feed |  |

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
  * prints every file's line count and the sum of all line counts for every file created by me (both including, and not including, newlines)
