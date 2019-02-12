#!/bin/bash

# create database directory if it doesn't exist
mkdir -p db

# delete old development database
rm db/dev.db

# create new development database
NODE_ENV=development node -e "require('./tools/db').create('./db/dev.db', true, true, true).then((db) => db.destroy())"
