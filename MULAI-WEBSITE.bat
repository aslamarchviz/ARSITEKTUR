@echo off
setlocal EnableExtensions
cd /d "%~dp0"

echo ================================================
echo   ARCHITECTURE PORTFOLIO - STAGE 4
echo ================================================
echo.

echo [1/4] Memeriksa Node.js...
where node >nul 2>nul
if errorlevel 1 goto NO_NODE
node -v

echo.
echo [2/4] Memeriksa npm...
where npm >nul 2>nul
if errorlevel 1 goto NO_NPM
npm -v

echo.

if exist "node_modules\vite\bin\vite.js" goto SKIP_INSTALL

echo [3/4] Menginstall dependency. Proses ini hanya perlu dilakukan pertama kali.
echo.
call npm install --no-audit --no-fund
if errorlevel 1 goto INSTALL_ERROR
goto VERIFY

:SKIP_INSTALL
echo [3/4] Dependency sudah tersedia - melewati npm install.
echo.

:VERIFY
echo [4/4] Memeriksa project...
echo.
call npm run verify
if errorlevel 1 goto VERIFY_ERROR

echo.
echo ================================================
echo   WEBSITE SIAP
echo ================================================
echo.
echo Public site : http://localhost:5173/
echo Editor      : http://localhost:5173/#edit
echo.
echo Server akan berjalan di jendela hitam terpisah.
echo Jangan tutup jendela server selama website digunakan.
echo.

start "Architecture Portfolio Server" cmd /k ""%~dp0JALANKAN-SERVER.bat""
timeout /t 3 /nobreak >nul
start "" "http://localhost:5173/#edit"

echo Browser sudah dibuka.
echo Anda boleh menutup jendela launcher ini.
pause
exit /b 0

:NO_NODE
echo.
echo [ERROR] Node.js belum terpasang atau belum masuk PATH.
echo Install Node.js LTS, lalu buka kembali launcher ini.
echo https://nodejs.org/
echo.
pause
exit /b 1

:NO_NPM
echo.
echo [ERROR] npm tidak ditemukan.
echo Pastikan Node.js terpasang dengan benar, lalu restart Windows/Terminal.
echo.
pause
exit /b 1

:INSTALL_ERROR
echo.
echo [ERROR] npm install gagal.
echo Ini biasanya disebabkan koneksi internet, proxy, atau registry npm.
echo.
echo Jalankan manual untuk melihat pesan lengkap:
echo     npm install
echo.
pause
exit /b 1

:VERIFY_ERROR
echo.
echo [ERROR] Pemeriksaan project gagal. Pesan error ada di atas.
echo.
pause
exit /b 1
