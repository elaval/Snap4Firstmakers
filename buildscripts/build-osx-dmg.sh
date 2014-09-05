#!/bin/sh
cd ../release/osx
rm -f Snap4Arduino.dmg
hdiutil create -volname FirstMakers -srcfolder FirstMakers -ov -format UDZO FirstMakers.dmg
cd ../..
