#!/bin/bash
set -e

cd src

#--------------------------

node -v
npm install gitbook-cli -g
gitbook --version

gitbook build
cd _book

#--------------------------

git init
git config user.email "nanase@users.noreply.github.com"
git config user.name "Nanase"
git add .
git commit -m "Deploy to GitHub Pages"
git push --force --quiet "https://${GH_TOKEN}@github.com/lury-lang/lury-specification.git" master:gh-pages > /dev/null 2>&1
