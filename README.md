<!-- ⚠️ This README has been generated from the file(s) "blueprint.md" ⚠️--><h1 align="center">node-express-crud-passport-auth</h1>
<p align="center">
  <b>This is a simple NodeJS CRUD project written in Express 4.</b></br>
  <sub>Its views are built in PUG(Jade) and it uses PassportJS for User Authentication. It validates inputs using Express-Validator. It does display error/success alert messages using Express-Messages and Connect-flash. It uses MongoDB for storage and bcryptJS for user password encryption. You can Create, Read, Update and Delete Articles and Users. Only users that have Admin role can manage users data. One can register and edit one's own data.<sub>
</p>

<br />

<p align="center">
		<a href="https://david-dm.org/trepichio/node-express-crud-passport-auth"><img alt="Dependencies" src="https://img.shields.io/david/trepichio/node-express-crud-passport-auth.svg" height="20"/></a>
<a href="https://github.com/trepichio/node-express-crud-passport-auth/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/trepichio/node-express-crud-passport-auth.svg" height="20"/></a>
<a href="https://visitor-badge.glitch.me/badge?page_id=trepichio/node-express-crud-passport-auth.visitor-badge"><img alt="GitHub Repo Views" src="https://visitor-badge.glitch.me/badge?page_id=trepichio/node-express-crud-passport-auth.visitor-badge" height="20"/></a>
<a href="https://badgen.net/github/stars/trepichio/node-express-crud-passport-auth"><img alt="GitHub Repo stars" src="https://badgen.net/github/stars/trepichio/node-express-crud-passport-auth" height="20"/></a>
<a href="https://img.shields.io/github/languages/top/trepichio/node-express-crud-passport-auth?style=falt"><img alt="GitHub top language" src="https://img.shields.io/github/languages/top/trepichio/node-express-crud-passport-auth?style=falt" height="20"/></a>
	</p>


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/solar.png)](#table-of-contents)

## ➤ Table of Contents

* [➤ Project Dependencies](#-project-dependencies)
* [➤ How to run this project](#-how-to-run-this-project)
	* [Clone this repository](#clone-this-repository)
	* [Enter project directory](#enter-project-directory)
	* [Install Nodemon (hot reload web server)](#install-nodemon-hot-reload-web-server)
	* [Install Dependencies](#install-dependencies)
	* [Install Bower Package manager](#install-bower-package-manager)
	* [Install Bower dependencies (Bootstrap and jQuery)](#install-bower-dependencies-bootstrap-and-jquery)
	* [Download and run Docker Container with MongoDB image](#download-and-run-docker-container-with-mongodb-image)
	* [Rename .env.example to .env](#rename-envexample-to-env)
	* [and setup environment variables (port, database name, secret)](#and-setup-environment-variables-port-database-name-secret)
	* [Run project](#run-project)
	* [Open browser in](#open-browser-in)
* [➤ Contributors](#-contributors)
* [➤ License](#-license)

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/solar.png)](#project-dependencies)

## ➤ Project Dependencies
* **bcryptjs**: ^2.4.3
* **body-parser**: ^1.19.0
* **connect-flash**: ^0.1.1
* **dotenv**: ^8.2.0
* **express**: ^4.17.1
* **express-messages**: ^1.0.1
* **express-session**: ^1.17.1
* **express-validator**: ^6.7.0
* **mongoose**: ^5.11.3
* **passport**: ^0.4.1
* **passport-local**: ^1.0.0
* **pug**: ^3.0.0

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/solar.png)](#how-to-run-this-project)

## ➤ How to run this project

### Clone this repository
```zsh
$ git clone https://github.com/trepichio/node-express-crud-passport-auth
```

### Enter project directory
```zsh
$ cd node-express-crud-passport-auth
```

### Install Nodemon (hot reload web server)
```zsh
$ npm install -g nodemon
```

### Install Dependencies
```zsh
$ npm install
```

### Install Bower Package manager
```zsh
$ npm install -g bower
```

### Install Bower dependencies (Bootstrap and jQuery)
```zsh
$ bower install bootstrap jquery
```

### Download and run Docker Container with MongoDB image
```zsh
$ docker run --network host --name express-mongo -p 27017:27017 -d mongo:latest
```

### Rename .env.example to .env
```zsh
$ mv .env.example .env
```

### and setup environment variables (port, database name, secret)
- open .env file and change env variables' values (do not forget to set a PORT value)

### Run project
```zsh
$ npm start
```

### Open browser in
```
http://localhost:<port_you_had_setup>/
```


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/solar.png)](#contributors)

## ➤ Contributors
	

| [<img alt="João Trepichio" src="https://avatars2.githubusercontent.com/u/11396817?s=460&u=085712d4f1296e6ad0a220ae7c0ea5278a9c40ed&v=4" width="100">](http://trepichio.github.io) |
|:--------------------------------------------------:|
| [João Trepichio](http://trepichio.github.io)     |
| [trepichio@gmail.com](mailto:trepichio@gmail.com) |
| 🔥                                               |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/solar.png)](#license)

## ➤ License
	
Licensed under [ISC](https://opensource.org/licenses/ISC).