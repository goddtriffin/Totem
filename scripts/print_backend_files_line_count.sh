#!/bin/bash

echo "Total line count:"
echo "-----------------"

# find all files that were actually created by me
files=$(find . -type f ! -name "*package-lock.json*" ! -name "*.DS_Store*" -not -path "*db/*" -not -path "*node_modules/*" -not -path "*.git/*" -not -path "*docs/*" -not -path "*static/*")

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

echo
echo "Discluding blank lines and comments:"
echo "----------------------"

# count up all the non-newline and non-comment lines on a per-file basis
for file in $files
do
    lines=$(egrep -v '^(\/\/.*|\s*)$' $file | wc -l)
    echo "$lines $file"
done

# now print total non-newline line count
egrep -v '^(\/\/.*|\s*)$' $files | wc -l
