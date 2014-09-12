#!/bin/sh
cd ../release/osx
rm -Rf FirstMakers.app
rm -Rf FirstMakers-unzipped.app
cp -R ../../releasecore/osx/FirstMakers.app ./FirstMakers.app
cp -R ../../releasecore/osx/FirstMakers.app ./FirstMakers-unzipped.app
cp -R ../../snap app
cd app
rm -Rf node_modules
cp -R ../../../modules/osx/* .
zip -r app.nw *
mv app.nw ../FirstMakers.app/Contents/Resources
cd ../FirstMakers-unzipped.app
rm -Rf ./Contents/Resources/app.nw
mv ../app ./Contents/Resources/app.nw
cd ..
ln -sf FirstMakers-unzipped.app/Contents/Resources/app.nw app.nw
sh ../../buildscripts/sign.sh FirstMakers.app
rm -Rf ./FirstMakers/FirstMakers.app
mv FirstMakers.app FirstMakers


#rm -f Snap4Arduino.dmg
#hdiutil create -volname Snap4Arduino -srcfolder . -ov -format UDZO Snap4Arduino.dmg
#zip -r FirstMakers FirstMakers.app
cd ../../buildscripts
