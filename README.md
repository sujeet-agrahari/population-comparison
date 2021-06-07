# Population comparison

An app for country wise population comparison.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install dependencies.

```bash
npm install
```

## Usage

```javascript
npm test // run test cases
npm run dev // run server in development mode
npm start // run server in production mode

//APIs exposed (visit localhost):
http://localhost:3000/api/v1/contries
http://localhost:3000/api/v1/:countryName/population/:date
```


*Note: PORT is set to use 3000 in all modes. To update the port, modify `.env` file.*

## Project Architecture
Project is based on modular/component structure.

Each component contains all required controller, services, routes, validators inside its own component.

On boot, it loads routes and configs from 'src/loader`. It also validates necessary environment variables and makes sure they do exist.


Project is set to use `nodemon` in development mode, and `pm2` in production mode.

Logger logs to console  in `development` and `test` environment and to `file` inside `logs` directory (it will be created automaticaly if doesn't exist) in `production` environment.


It also contains `Dockerfile` to build *multi step docker images*
```
docker build ---target dev -t sujeet-agrahari/country-comparision:latest // for development
docker build --target prod -t sujeet-agrahari/country-comparision:latest // for production
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
