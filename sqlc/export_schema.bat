REM first configure sqlc.yaml
@echo off
cd /d "%~dp0"
pg_dump --schema-only -d oauth -U postgres > schema.sql && sqlc generate && exit
pause