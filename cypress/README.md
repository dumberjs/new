## Cypress e2e test
All e2e tests are in `cypress/integration/`.

First, run the app in dev mode
```
npx gulp
```

Then run e2e tests with

```
npx cypress run
```

Note if your dev app is not running on port 3000, you need to modify `cypress.json` to update dev app port.

To run Cypress interactively, do

```
npx cypress open
```

For more information, visit https://www.cypress.io
