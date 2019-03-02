#!/bin/bash

# create database directory if it doesn't exist
mkdir -p db

# create new production database
NODE_ENV=production node -e "require('./tools/db').create('./db/prod.db', true, true, true).then((db) => db.destroy())"
