#!/bin/bash

# download all npm dependencies
npm install

# initialize production database
npm run init-db-prod

# create the real .env
cp .env.sample .env

# tell the user to do the last step
echo
echo "Almost done! Fill out the '.env' file to complete setup."
