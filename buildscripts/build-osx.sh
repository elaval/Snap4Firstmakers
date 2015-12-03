#!/bin/sh
cd ../release/osx
rm -Rf Snap4FirstMakers.app
rm -Rf Snap4FirstMakers_unzipped.app
cp -R ../../releasecore/osx/Snap4FirstMakers.app ./Snap4FirstMakers_unzipped.app
cp -R ../../releasecore/osx/Snap4FirstMakers.app ./Snap4FirstMakers.app
cp -R ../../snap app
cd app
rm -Rf node_modules
cp -R ../../../modules/osx/* .
zip -r app.nw *
mv app.nw ../Snap4FirstMakers.app/Contents/Resources
cd ../Snap4FirstMakers_unzipped.app
rm -Rf ./Contents/Resources/app.nw
mv ../app ./Contents/Resources/app.nw
cd ..
ln -sf Snap4FirstMakers_unzipped.app/Contents/Resources/app.nw app.nw
sh ../../buildscripts/sign.sh Snap4FirstMakers.app
#rm -Rf FirstMakers/FirstMakers.app
#mv FirstMakers.app FirstMakers/


#rm -f Snap4Arduino.dmg
#hdiutil create -volname Snap4Arduino -srcfolder . -ov -format UDZO Snap4Arduino.dmg
#zip -r FirstMakers FirstMakers.app
cd ../../buildscripts
