cd ../wfe-heroku-deploy/tennis-vissioned
git add .
set /p mes="Enter commit message: "
git commit -am "%mes%"
git push heroku master
PAUSE