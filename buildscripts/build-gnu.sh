#!/bin/sh
cd ../release/gnu/FirstMakers
cp -R ../../../releasecore/gnu/FirstMakers/* .
rm -Rf app
cp -R ../../../snap app
cd app
rm -Rf node_modules
cp -R ../../../../modules/gnu/* .
zip -r app.nw *
mv app.nw ../app.nw
cd ..
rm -Rf app
cd ..
rm -f FirstMakers.tar.gz
tar -zcvf FirstMakers.tar.gz FirstMakers
cd ../../buildscripts
