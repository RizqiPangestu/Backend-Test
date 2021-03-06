# Backend-Test
Repository Backend Test for Bukit Vista Intern

## Software Requirment:
- Javascript (Nodejs, Express, Axios, Sequilize)
- mysql

## Getting Statted:
First of all, make sure you have installed software requirements above before run this REST API. If you have not installed, you can clone this repo by following this instructions.
1. Clone this repository on your local computer. If you use ssh, run:
```bash
git clone git@github.com:RizqiPangestu/Backend-Test.git
```

2. Install dependencies
```bash
npm install express axios sequelize
```
install this package too if you want to make sure all needed packages installed
```bash
npm install cors bcrypt body-parser cookie-session pino@next pino-pretty dotenv jsonwebtoken
```
Note : Authentication bearer token is not implemented yet

3. Install mysql. If you use ubuntu, follow [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04). Follow the instruction and create `root` as admin and `password` as password

4. Get Started by running `node --experimental-worker main.js | pino-pretty`. It will bring you to homepage, make sure the `homepage.html` form action has same port as in `.env`. You can find movie poster url by typing it's title. `pino-pretty` used for request logging on your console. 


Note : This application just can running on localhost for now. Enjoy:)

# How to Use in POSTMAN:
## ROUTES:
Use this urls to use some features

### GET METHOD
- `/movies/` It's Forbidden
- `/movies/{title}` Find poster's url from `{title}` movies. Example:
```bash
 http://http://localhost:8080/movies/harry potter?
 ```
  will return [this](https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg)
- `/movies/favourites/{user_id}` Return list of `{user_id}`'s favourite movies poster URL. If `0`, it will return all user's 

### POST METHOD
- `/movies/favourites` Add favourite movies to requested `user_id`. To add new favourite, request using json format `{"user_id":"your_user_id","title":"movie_title_to_add"}`

- `/user/add` Add new user. To add new favourite, request using json format `{"name":"your_user_id","password":"password"}`

# TODOS
- Auth bearer token feature