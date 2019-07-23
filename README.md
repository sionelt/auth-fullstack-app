# AUTH FULLSTACK APP

## Client

### Installation
1. Navigate to client dir `cd client`
2. Install packages/dependencies `npm install`
3. Run local development `npm run serve`

### Deployment

[![Netlify Status](https://api.netlify.com/api/v1/badges/77178fbf-6a4c-41d6-89fe-ca4dc4b177fc/deploy-status)](https://app.netlify.com/sites/distracted-mccarthy-9b9840/deploys)

Deployment to Netlify is auto trigger on merged pull requests to `master` branch

SPA available at [https://distracted-mccarthy-9b9840.netlify.com](https://distracted-mccarthy-9b9840.netlify.com/?target=_blank)


## REST API

### Installation
1. Navigate to api dir `cd api`
2. Install packages/dependencies `npm install`
3. Run local development server `npm start:local`

### Deployment
Install Heroku CLI `npm install -g heroku`
Authenticate your Heroku account `heroku login`
Create a heroku app `heroku create auth-oauth-rest-api`
Connect git repo to Heroku remotely `heroku git:remote -a auth-oauth-rest-api`
Push only the api dir to Heroku remote master `git subtree push --prefix api/ heroku master` or `npm run deploy`
View Heroku app logs `heroku logs --tail`

## Database
1. Create free tier MonogDB instance on Heroku `heroku addons:create mongolab:sandbox`
2. Fisrt script will return `MONGODB_URI`. Secure it as a config variable on Heroku `heroku config:set DATABASE_URI=[database_uri_here]`
3. To view `DATABASE_URI` `heroku config:get DATABASE_URI`

## Local Development
Run REST API server locally on http://localhost:5000 `heroku local web` or `npm run start:api`
Run Vue SPA locally on http://localhost:8080 `npm run start:client`
