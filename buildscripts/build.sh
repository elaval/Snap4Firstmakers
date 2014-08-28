#!/bin/sh
cp -R ../snap snaptmp
./build-win32.sh
./build-osx.sh
./build-gnu.sh
rm -Rf snaptmp
