# Citapp Backend

## Usage

### Env Variables

Copy .env.example file to .env file
Update the .env file and add the following

```
NODE_ENV = development
CLUSTERING = 0
PORT = 5005
JWT_SECRET = auth123
REFRESH_SECRET = refresh_auth123
DB_NAME = 00_citapp
DB_USER = root
DB_PASSWORD = 
DB_HOST = localhost
DB_PORT = 3306
```

### Install Dependencies

```
npm install
```

### Run Development

```
npm run dev
```

### Deploy Production

```
npm run prod
```

## License

Copyright (c) 2022 Tolhah