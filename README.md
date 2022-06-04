# Sinarmas EMS Backend

> Observation with filtration and packaging.

This is a project

## Features

- Login
- Get all asset equipments
- Get asset equipment by id
- Filtration
- Packaging


## Usage

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
JWT_SECRET = abc123
```

### Install Dependencies (backend)

```
# Install backend deps
npm install
```

### Run

```
# Run mysql container
docker run --name mydatabase -v C:\Users\21000872\PROJECTS\vol-mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:5.7.22

# Run backend only
npm run server
```

### Create Database tables
To force re-create (destroy and create) tables, open config/db.js, set force = true in syncDB function.
```
const syncDB = () => {
  db.sync(
    {
      force: true
    }
  );
}
```

## Build & Deploy

```
# Create backend prod build
npm run build
```


### Seed Database

You can use the following commands to seed the database with some sample entities as well as destroy all data

```
# Import data
npm run data:import
```

```
Sample User Logins

admin@example.com (Admin MR Officer)
123456
```


## License

Copyright (c) 2021 Sinarmas

