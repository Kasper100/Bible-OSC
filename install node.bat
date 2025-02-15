@echo off
setlocal

where scoop >nul 2>nul
if %errorlevel% equ 0 (
    echo Installing Node.js using Scoop...
    scoop install nodejs-lts
) else (
    echo Scoop not found. Installing Node.js using winget...
    winget install OpenJS.NodeJS
)

:: winget type shii
refreshenv

node -v >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js installation failed.
    exit /b 1
)

echo Node.js installation successful!
echo Now installing required packages...

npm install node-osc node-fetch figlet

echo Installation complete.
endlocal
pause