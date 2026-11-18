@echo off
title Opération Louvre : La Résistance (Money Heist x Révolution)
cd /d "%~dp0"
echo ======================================================
echo   OPERATION LOUVRE : LA RESISTANCE (MONEY HEIST)
echo ======================================================
echo.

where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Demarrage du serveur local...
    node server.js
) else if exist "C:\Program Files\nodejs\node.exe" (
    echo Demarrage du serveur local via Program Files...
    "C:\Program Files\nodejs\node.exe" server.js
) else (
    echo Ouverture directe de index.html dans votre navigateur...
    start "" "%~dp0index.html"
)
pause
