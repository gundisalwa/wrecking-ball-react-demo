#!/bin/bash
set -e # exit with nonzero exit code if anything fails

# go to the module directory and create a *new* Git repo
cd build
git init
git remote add -t gh-pages -f origin "https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG.git"

# inside this git repo we'll pretend to be a new user
git config user.name "gundisalwa"
git config user.email "gundisalwa@gmail.com"

# the first and only commit to this new Git repo contains all the
# files present with the commit message.
git add .
git commit -m "Wrecking Ball React Demo $TRAVIS_TAG" --allow-empty

# force push from the current repo's master
# (all previous history will be lost, since we are overwriting it.)
# we redirect any output to /dev/null to hide any sensitive credential data that might otherwise be exposed.
git push --force --quiet origin gh-pages > /dev/null 2>&1