#!/bin/bash

# find all files that were actually created by the developer
files=$(find . -type f ! -name "*-lock*" -not -path "*db/*" -not -path "*node_modules/*")

# print the line count of all files found
wc -l $files
