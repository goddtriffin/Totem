#!/bin/bash

echo "Including blank lines:"
echo "----------------------"

# find all files that were actually created by me
files=$(find . -type f ! -name "*-lock*" -not -path "*db/*" -not -path "*node_modules/*")

# print the line count of all files found
wc -l $files

echo
echo "Discluding blank lines:"
echo "----------------------"

# count up all the non-newline lines on a per-file basis
for file in $files
do
    lines=$(grep -v '^\s*$' $file | wc -l)
    echo "$lines $file"
done

# now print total non-newline line count
grep -v '^\s*$' $files | wc -l
