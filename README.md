# Tennis Vission

### Telerik Academy - Web Front End - Course Project

## Project Requirements - [[full](https://github.com/TelerikAcademy/Slice-and-Dice/tree/master/Course-Project)]
- slice the given design
- implement responsive design
- use web server for data
  - [parse](http://parseplatform.org/) - [documentation](http://docs.parseplatform.org/js/guide/)
  - custom server
- use build/dev/deploy scripts - 
  - [gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
  - [npm](https://docs.npmjs.com/misc/scripts) 
- follow best code practices 
- use efficient css
- backward compatibility
- integration tests
- host app on the cloud
  - [heroku](http://heroku.com)
  - [appharbpr](http://appharbor.com)
  - [rawgit](http://rawgit.com)
  
## Design - [[Envisioned](https://github.com/TelerikAcademy/Slice-and-Dice/blob/master/Course-Project/EnvisionedPSD.zip)]
- based on [design distribution](https://github.com/TelerikAcademy/Slice-and-Dice/blob/master/Course-Project/PSDs.md)

## Installation
- clone or download the [repo](https://github.com/zachdimitrov/wfe-final-project.git)
- install dependancies `npm install`
- run mongo instance for local start
- start app
  - locally `"./node_modules/.bin/gulp" dev`
  - remote `./node_modules/.bin/gulp" start` it will build youur project
- browse at `localhost:5000`

## User accounts
### Unregistered
If no user is logged in you can only read posts and comments  

### Regular user account 
Regular users can write comments to posts  
Create user with sign up menu and login with your credentials  

### Admin account
Admin account gives more functionality to app.  
Admin can add, edit and delete messages.  
Admin can remove (mark as deleted) other users comments.  
Admin can view other all comments for selected user.  

Test the admin account:
    user: **admin**
    pass: **123qwe**
    
## Deployment
- clone or download the [repo](https://github.com/zachdimitrov/wfe-final-project.git)
- Create a [Heroku](https://www.heroku.com/) account and download the [heroku cli](https://devcenter.heroku.com/articles/heroku-cli)
- Create empty project and add [mLab](https://mlab.com/) extension
- Create folder 'wfe-heroku-deploy' on the same level as 'wfe-final-project' folder
- Open shell in this location, login to heroku `heroku login` and pull your heroku app `heroku git:clone -a tennis-vissioned`
- `cd tennis-vissioned` and delete all content without the `.git` folder and then copy this [file](https://gist.github.com/zachdimitrov/7f19d2705b808aa4505150a591753ae9) inside
- go back to `wfe-final-project` and start `./node_modules/.bin/gulp build`
- start `deploy` script and when it ask you for commit message write something
- that's it, browse the project here - [https://tennis-visioned.herokuapp.com](https://tennis-vissioned.herokuapp.com)

## Docker info
- [docker demo](https://www.youtube.com/watch?v=0IEJMreS9vI&index=11&list=PLF4lVL1sPDSknRqUjl1PpGbI9Izn9pBqf)
- [install docker](https://docs.docker.com/docker-for-windows/install/#where-to-go-next)
- [docker hub](https://hub.docker.com/r/zachdimitrov/wfe-final-project/)
- docker pull - `docker pull zachdimitrov/wfe-final-project`

## Author
[Zahari Dimitov](https://telerikacademy.com/Users/ZachD) - **ZachD**   
[github profile](https://github.com/zachdimitrov)  
2017 - Telerik Academy 
