@echo off
setlocal
cd /d "%~dp0"
echo ================================================
echo   ARCHITECTURE PORTFOLIO SERVER
echo ================================================
echo.
echo URL editor: http://localhost:5173/#edit
echo.
echo Server sedang berjalan. Jangan tutup jendela ini.
echo Untuk menghentikan server, tekan Ctrl+C.
echo.
call npm run dev

echo.
echo Server berhenti.
pause
