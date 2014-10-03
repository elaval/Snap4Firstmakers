#!/bin/sh
cp -R ../snap snaptmp
cd snaptmp
rm -Rf node_modules
cp -R ../../modules/osx/* .
cd ..
rm -Rf ../release/osx/FirstMakers_unzipped.app/Contents/Resources/app.nw
mv snaptmp/ ../release/osx/FirstMakers_unzipped.app/Contents/Resources/app.nw
#rm -f Snap4Arduino.dmg
#hdiutil create -volname Snap4Arduino -srcfolder . -ov -format UDZO Snap4Arduino.dmg
#zip -r Snap4Arduino Snap4Arduino.app
