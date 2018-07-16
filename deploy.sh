#!/bin/bash

rm -r $TRAVIS_BUILD_DIR/tmp/

mkdir $TRAVIS_BUILD_DIR/tmp
cp index.html $TRAVIS_BUILD_DIR/tmp/
cp -R css $TRAVIS_BUILD_DIR/tmp/
cp -R dist $TRAVIS_BUILD_DIR/tmp/

rsync --quiet -r --delete $TRAVIS_BUILD_DIR/tmp/ travis@rancor.mortimer.nu:/var/travis/runit-web/$TRAVIS_BUILD_ID
ssh -t travis@rancor.mortimer.nu "rm /var/travis/runit-web/current && ln -s /var/travis/runit-web/$TRAVIS_BUILD_ID /var/travis/runit-web/current"

rm -r $TRAVIS_BUILD_DIR/tmp/