@echo off
cd /d "%~dp0"
echo ==============================================
echo Pushing Operation Louvre to GitHub...
echo ==============================================
git push -u origin main
echo.
pause
