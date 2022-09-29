# Citapp Backend

## Usage

### Env Variables

Copy .env.example file to .env file, then update the .env file and add the following:

```
NODE_ENV = development
CLUSTERING = 0
PORT = 5000
JWT_SECRET = your_jwt_secret
REFRESH_SECRET = your_refresh_secret
DB_NAME = dbname
DB_USER = dbuser
DB_PASSWORD = dbpassword
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