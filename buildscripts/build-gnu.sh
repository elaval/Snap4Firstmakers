#!/bin/sh
cd snaptmp
rm -Rf node_modules
cp -R ../../modules/gnu/* .
zip -r app.nw *
mv app.nw ../release/gnu/FirstMakers
cd ../release/gnu
rm -f FirstMakers.tar.gz
tar -zcvf FirstMakers.tar.gz FirstMakers
cd ../..
