#export CODESIGN_ALLOCATE="/Applications/Xcode.app/Contents/Developer/usr/bin/codesign_allocate"
#Run the following to get a list of certs
#
#security find-identity
app="$1"
identity="DACAFF3AD78960F464DBCF4625D5F921FE90076D"

echo "### signing frameworks"
codesign --force --verify --verbose --sign "$identity" "$app/Contents/Frameworks/crash_inspector"
codesign --force --verify --verbose --sign "$identity" "$app/Contents/Frameworks/nwjs Framework.framework"
codesign --force --verify --verbose --sign "$identity" "$app/Contents/Frameworks/nwjs Helper EH.app"
codesign --force --verify --verbose --sign "$identity" "$app/Contents/Frameworks/nwjs Helper NP.app"
codesign --force --verify --verbose --sign "$identity" "$app/Contents/Frameworks/nwjs Helper.app"
echo "### signing app"
codesign --force --verify --verbose --sign "$identity" "$app"

echo "### verifying signature"
codesign -vvv -d "$app"
#sudo spctl -a -vvvv "$app"