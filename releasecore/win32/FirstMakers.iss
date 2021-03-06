; Script generated by the Inno Setup Script Wizard.
; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!

[Setup]
; NOTE: The value of AppId uniquely identifies this application.
; Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{9054AD1F-1321-432C-B0B8-ED2EB128364E}
AppName=FirstMakers
AppVersion=0.0.6
;AppVerName=FirstMakers 0.3
AppPublisher=TIDE SA
AppPublisherURL=http://www.firstmakers.com
AppSupportURL=http://www.firstmakers.com
AppUpdatesURL=http://www.firstmakers.com
DefaultDirName={pf}\FirstMakers
DefaultGroupName=FirstMakers
AllowNoIcons=yes
OutputDir=C:\s4a\output\firstmakers-win32\
OutputBaseFilename=FirstMakers-0.0.6
SetupIconFile=C:\s4a\FirstMakers.ico
Compression=lzma
SolidCompression=yes

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"
Name: "catalan"; MessagesFile: "compiler:Languages\Catalan.isl"
Name: "spanish"; MessagesFile: "compiler:Languages\Spanish.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked
Name: "quicklaunchicon"; Description: "{cm:CreateQuickLaunchIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked; OnlyBelowVersion: 0,6.1

[Files]
Source: "C:\s4a\app.nw"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\s4a\credits.html"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\s4a\ffmpegsumo.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\s4a\icudt.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\s4a\icudtl.dat   "; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\s4a\libEGL.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\s4a\libGLESv2.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\s4a\nw.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\s4a\nw.pak"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\s4a\nwsnapshot.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\s4a\FirstMakers.ico"; DestDir: "{app}"; Flags: ignoreversion
; NOTE: Don't use "Flags: ignoreversion" on any shared system files

[Icons]
Name: "{group}\FirstMakers"; Filename: "{app}\nw.exe"; Parameters: "app.nw"; IconFilename: "{app}\FirstMakers.ico"
Name: "{group}\{cm:ProgramOnTheWeb,FirstMakers}"; Filename: "http://www.firstmakers.com"
Name: "{group}\{cm:UninstallProgram,FirstMakers}"; Filename: "{uninstallexe}"
Name: "{commondesktop}\FirstMakers"; Filename: "{app}\nw.exe"; Parameters: "app.nw"; IconFilename: "{app}\FirstMakers.ico"; Tasks: desktopicon
Name: "{userappdata}\Microsoft\Internet Explorer\Quick Launch\FirstMakers"; Filename: "{app}\nw.exe"; Parameters: "app.nw"; Tasks: quicklaunchicon

[Run]
Filename: "{app}\nw.exe"; Parameters: "app.nw"; Description: "{cm:LaunchProgram,FirstMakers}"; Flags: nowait postinstall skipifsilent
