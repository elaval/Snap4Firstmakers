#!/bin/sh
cd snaptmp
rm -Rf node_modules
cp -R ../../modules/osx/* .
zip -r app.nw *
mv app.nw ../release/osx/FirstMakers.app/Contents/Resources
cd ../release/osx
#rm -f Snap4Arduino.dmg
#hdiutil create -volname Snap4Arduino -srcfolder . -ov -format UDZO Snap4Arduino.dmg
zip -r FirstMakers FirstMakers.app
cd ../..
