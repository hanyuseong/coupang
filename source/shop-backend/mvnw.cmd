@echo off
setlocal
set DIRNAME=%~dp0
if "%DIRNAME%"=="" set DIRNAME=.
set MAVEN_PROJECTBASEDIR=%DIRNAME%
set MAVEN_WRAPPER_DIR=%MAVEN_PROJECTBASEDIR%.mvn\wrapper
set MAVEN_WRAPPER_JAR=%MAVEN_WRAPPER_DIR%\maven-wrapper.jar

if not exist "%MAVEN_WRAPPER_JAR%" (
  echo Maven Wrapper jar not found: %MAVEN_WRAPPER_JAR%
  echo Ensure .mvn\wrapper\maven-wrapper.jar exists or generate wrapper with a Maven installation.
  exit /b 1
)

java -jar "%MAVEN_WRAPPER_JAR%" %*
endlocal