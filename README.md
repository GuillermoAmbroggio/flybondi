# Flybondi App - [flybondi.vercel.app/](https://flybondi.vercel.app/)

[![Cypress](https://img.shields.io/badge/Test-Cypress-green)](https://www.cypress.io/)
[![Conventional Commits](https://img.shields.io/badge/Husky-Eslint--Prettier-red)](https://typicode.github.io/husky/#/)
[![Vite](https://img.shields.io/badge/Vite-Development%20tool-blue)](https://vitejs.dev/)

## How to run the project

To install all of the project dependencies run:

`npm i`

To run the project run:

`npm start`

To run in the development environment you must add an .env file that must contain:

- `VITE_APP_API_KEY` some api key
- `VITE_APP_API_URL` to point to `dev api url`

Also you shold run api server [API](https://github.com/GuillermoAmbroggio/flybondi-api)

## How to test the project

I use [Cypress](https://www.cypress.io/) to test this project.

All the tests are under the `cypress/` directory.

To run all the tests run:

`npm test`

Every pull request triggers [GithubActions](https://github.com/features/actions) to run the tests automatically. All tests must be passing before merging a pull request to `develop` and `master`.

## Deployment

The project gets automatically deployed through an [Vercel CodePipeline](https://vercel.com/docs/concepts/git/vercel-for-github#a-deployment-for-each-push) once it reaches either the `master` branch.

You can visit the deployed project at:

- [flybondi.vercel.app/](https://flybondi.vercel.app/)
