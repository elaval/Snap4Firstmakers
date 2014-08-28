#!/bin/sh
cd ../release/osx
sh sign.sh FirstMakers.app
zip -r FirstMakers FirstMakers.app
rm -f Snap4Arduino.dmg
hdiutil create -volname FirstMakers -srcfolder . -ov -format UDZO FirstMakers.dmg
cd ../..
