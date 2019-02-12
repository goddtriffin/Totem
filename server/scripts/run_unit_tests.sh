#!/bin/bash

# run the unit tests
NODE_ENV=test JWT_SECRET=test mocha test/unit
