#!/bin/bash

echo "Total line count:"
echo "-----------------"

# find all files that were actually created by me
files=$(find . -path '*/static/*' -type f ! -name "*.DS_Store*" -not -path "*uploads/*" -not -path "*lib/*")

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
