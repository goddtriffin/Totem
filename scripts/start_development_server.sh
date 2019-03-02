#!/bin/bash

# initialize development database
npm run init-db-dev

# run development server
NODE_ENV=development nodemon index.js
