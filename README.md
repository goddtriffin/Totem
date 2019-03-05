# Totem Server

## Requirements

* [NPM](https://www.npmjs.com/ "Social media website that rates memes.")
* [Node](https://nodejs.org/)

## Try it out!

1. `git clone https://github.com/MagnusFrater/Totem.git`
2. `cd Totem/`
3. `npm run init-prod`
4. fill out your `.env`
5. `npm start`
6. Open your favourite browser<sub>*coughchromecough*</sub>
7. Visit `http://localhost`

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
| `/` | splash page|
| `/signup` | signup page |
| `/login` | login page |
| `/forgot-password` | forgotten password page |
| `/public` | global feed |
| `/private` | friend feed |
| `/profile` | profile page |
| `/settings` | settings page |

#### User

| Name | Type | Description |
| :--- | :--- | :--- |
| email | string | user identifier (unique) |
| username | string | user identifier (unique) |
| display_name | string | fun name/title |
| emoji | string | icon |
| tiki_tally | integer | status of the user on Totem, count of other user interactions of their content |
| polls_created | integer | number of polls created |
| win_rate | double | ratio of challenge poll wins/losses |
| friend_state | string | friendship state ('N/A' if not currently friends, no pending request, or if the user is you) |

| Method | Endpoint | Description | Parameters |
| :---: | :--- | :--- | :---: |
| POST | $ `/api/user/signup` | signs up a new user account | email, username, display_name, password, emoji |
| POST | $ `/api/user/login` | logs a user in | username, password |
| GET | `/api/user/me` | returns your account information |  |
| GET | `/api/user/me/polls` | returns polls created by this account |  |
| GET | `/api/user/profile/:username` | returns that user's account information (replace `:username` with a real username) |  |
| GET | `/api/user/profile/:username/polls` | returns polls created by this account (replace `:username` with a real username) |  |
| GET | `/api/user/search?username=<username>` | returns a list of all user accounts with similar usernames (replace `<username>` with a real username) |  |
| GET | `/api/user/all` | returns a list of all user accounts |  |
| PUT | `/api/user/update` | updates your account, must pick at least one optional Body parameter to update | display_name, emoji |
| GET | `/api/user/history` | returns your poll vote history |  |
| POST | `/api/user/verify-email` | sends an email to help verify the user account's email | email, hash |
| POST | $ `/api/user/forgot-username` | sends an email the contains the correct user account's username | email |
| POST | `/api/user/forgot-password` | sends an email to help start the renew password process |  |
| POST | `/api/user/renew-password` | updates the user account's password | email, hash, password |

#### Friend

| Name | Type | Description |
| :--- | :--- | :--- |
| username | string | user identifier (unique) |
| display_name | string | fun name/title |
| emoji | string | icon |
| tiki_tally | integer | status of the user on Totem, count of other user interactions of their content |
| friends | string | friendship state |

| Method | Endpoint | Description | Parameters |
| :---: | :--- | :--- | :---: |
| POST | `/api/user/friend` | creates friend request | friend_username |
| GET | `/api/user/friend/requests` | returns a list of all friend requests |  |
| PUT | `/api/user/friend` | accepts a friend request | friend_username |
| GET | `/api/user/friend` | returns a list of all your friends |  |
| DELETE | `/api/user/friend` | deletes friend / friend request | friend_username |

#### Poll

Themes: `memes, fashion, movie, music, animals, nature, buildings, cities, food, beauty, color, space, vehicles, sports`

| Name | Type | Description |
| :--- | :--- | :--- |
| id | integer | poll identifier (unique) |
| created_at | datetime | SQL datetime the poll was created (year-month-day hours:minutes:seconds) |
| display_name | string | fun name/title of poll |
| theme | string | poll category |
| creator | string | username of the user that created the poll |
| opponent | string | username of the user that is being challenged (challenge poll only) |
| image_1 | string | path to the first image |
| image_2 | string | path to the second image |
| votes_1 | integer | vote count for image_1 |
| votes_2 | integer | vote count for image_2 |
| state | string | (challenge only: pending, ready,) active, expired |
| type | string | personal, challenge |
| scope | string | private, public |
| duration | integer | total minutes that the poll should be active for |
| start_time | datetime | SQL datetime the poll started (year-month-day hours:minutes:seconds) |
| end_time | datetime | SQL datetime the poll should end (year-month-day hours:minutes:seconds) |
| voted | integer | value the user set as their vote (only exists if the user has already voted on this particular poll) |

| Method | Endpoint | Description | Parameters |
| :---: | :--- | :--- | :---: |
| POST | `/api/poll/personal` | creates a personal poll | display_name, theme, creator, duration, scope, image_1, image_2 |
| POST | `/api/poll/challenge` | creates a challenge request | display_name, theme, creator, opponent, duration, scope, image |
| GET | `/api/poll/challenge/requests` | returns a list of all your challenge requests |  |
| PUT | `/api/poll/challenge/request/:id` | accepts a challenge request (replace `:id` with a real poll id) | image |
| DELETE | `/api/poll/challenge/request/:id` | rejects a challenge request (replace `:id` with a real poll id) |  |
| GET | `/api/poll/challenge/requests/accepted` | returns a list of all your accepted challenge requests |  |
| PUT | `/api/challenge/request/accepted/:id` | starts a challenge (replace `:id` with a real poll id) |  |
| GET | `/api/poll/:id` | returns that poll's information (replace `:id` with a real poll id) |  |
| GET | `/api/poll/search/private?themes=<themes>` | returns a list of private polls (replace `<themes>` with a real comma-delimited string of themes) |  |
| GET | `/api/poll/search/public?themes=<themes>` | returns a list of public polls (replace `<themes>` with a real comma-delimited string of themes) |  |
| PUT | `/api/poll/vote/:id` | replace `:id` with a real poll id, sets a vote on a poll | vote |

#### Feed

| Method | Endpoint | Description | Parameters |
| :---: | :--- | :--- | :---: |
| GET | `/api/feed/public?sort=<sort>` | returns a user's public feed (replace <sort> with a real sort: asc, desc) |  |
| GET | `/api/feed/private?sort=<sort>` | returns a user's private feed (replace <sort> with a real sort: asc, desc) |  |

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
  * prints every file's line count and the sum of all line counts for every file created by Todd (MagnusFrater) (both including, and not including, newlines and comments)
