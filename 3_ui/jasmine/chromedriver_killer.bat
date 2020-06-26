tasklist /nh /fi "imagename eq chromedriver*" | find /i "chromedriver" && (
taskkill /f /im chromedriver*
) || (
echo chromedriver is not running
)

exit 0
