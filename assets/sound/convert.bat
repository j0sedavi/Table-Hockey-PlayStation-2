@echo off
title WAV-2-ADP
echo Place WAV files in the same folder as "adpenc.exe" and "convert.bat"
echo Please make sure WAV files are in STEREO format before conversion.
echo(

pause
echo(

echo Converting...
echo(

mkdir converted

adpenc.exe cursor.wav converted/cursor.adp
echo cursor.adp
adpenc.exe message.wav converted/message.adp
echo message.adp
adpenc.exe boot.wav converted/boot.adp
echo boot.adp
adpenc.exe confirm.wav converted/confirm.adp
echo confirm.adp
adpenc.exe cancel.wav converted/cancel.adp
echo cancel.adp
adpenc.exe transition.wav converted/transition.adp
echo transition.adp
echo(

echo Conversion complete
echo(

pause