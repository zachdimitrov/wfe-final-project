cd ../wfe-heroku-deploy/tennis-visioned
git add .
set /p mes="Enter commit message: "
git commit -am "%mes%"
git push heroku master
PAUSE