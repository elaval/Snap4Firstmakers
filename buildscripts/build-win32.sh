#!/bin/sh
cd ../release/win32
cp -R ../../releasecore/win32/* .
rm -Rf app
cp -R ../../snap app
cd app
rm -Rf node_modules
cp -R ../../../modules/win32/* .
zip -r app.nw *
mv app.nw ..
cd ..
rm -Rf app
cd ../../buildscripts







#cd snaptmp
#rm -Rf node_modules
#cp -R ../../modules/win32/* .
#zip -r app.nw *
#mv app.nw ../release/win32
#cd ..
