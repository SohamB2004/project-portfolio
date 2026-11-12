@echo off
title Launching Shivera Portfolio Platform
echo ========================================================
echo   Starting Shivera Portfolio Platform
echo ========================================================
echo.

set PATH=C:\Program Files\nodejs;%PATH%

echo [1/2] Starting Backend Server (Express + API on port 5000)...
start "Shivera Backend Server" cmd /k "cd server && node src/index.js"

timeout /t 2 /nobreak >nul

echo [2/2] Starting Frontend Client (Vite + React on port 5173)...
start "Shivera Frontend Client" cmd /k "cd client && npm run dev"

echo.
echo ========================================================
echo   Application launched!
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:5000
echo ========================================================
timeout /t 3 >nul
start http://localhost:5173
