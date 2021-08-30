# Backend-Test
Repository Backend Test for Bukit Vista Intern

## Software Requirment:
- Javascript (Nodejs, Express, Axios, Sequilize)
- mysql

## Getting Statted:
First of all, make sure you have installed software requirements above before run this REST API. If you have not installed, you can clone this repo by following this instructions.
1. Clone this repository on your local computer
```bash
git clone git@github.com:RizqiPangestu/Backend-Test.git
```
if you use ssh

2. Install depedencies
```bash
backend-test$ npm install express axios sequilize
```
install this package too if you want to be same as this repo
```bash
backend-test$ npm install bcrypt body-parser cookie-parser pino-http
```
Note : cookies and pino is not implemented yet

3. Install mysql. If you use ubuntu, follow [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04). Follow the instruction and create admin `root` and password `password`

4. Get Started by running `node main.js`. It will bring you to homepage. You can find movie poster url by typing it`s title.


Note : This application just can running on localhost for now. Enjoy:)

# How to Use in POSTMAN:
## ROUTES:
Use this urls to use some features

### GET METHOD
- `/movies/` It's Forbidden
- `/movies/{title}` Find poster's url from `{title}` movies
example `http://http://localhost:8080/movies/harry potter?` will return [this](https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg)
- `/movies/favourites/{user_id}` Return list of `{user_id}`'s favourite movies

### POST METHOD
- `/movies/favourites` Add favourite movies to requested `user_id`
- `/user/add` Add new user