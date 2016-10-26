#!/bin/bash
set -e

cd src

#--------------------------

node -v
npm install gitbook-cli -g
gitbook --version

gitbook _book
cd _book

#--------------------------

git config user.email "noreply@example.com"
git config user.name "Travis-CI"

git init
git add .
git commit -m "Deploy to GitHub Pages"
git push --force --quiet "https://${GH_TOKEN}@github.com/lury-lang/lury-specification.git" master:gh-pages > /dev/null 2>&1
