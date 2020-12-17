## How to run this project

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
