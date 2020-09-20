# Sample Customer Project

## Project Description:

- This is a project for get, post, update, delete and search customers.
- It is developed with **mobile first** approach.

## Technologies:

### Client

-   React
-   Redux
-   Typescript
-   CSS module
-   React-redux
-   Axios
-   Jest
-   Enzyme
-   React-test-renderer

### Server

- json-server

### Dev

- concurrently

## Run Application

### - Dependecy Installtion:

-   In the main root which both `client` and `server` folders exist, run `npm i`. As you can see in the `package.json` npm will automatically install all dependencies inside `client` and `server` folders by the use of the following script in the `package.json` file:

    `"postinstall": "(cd client && npm i); (cd server && npm i);"`

-   If you are not happy with this approach, please remove `postinstall` script with all it's commands completely and run `npm i` three times for `client`, `server` and main root directories.

### - Run Project:

After dependecies's installation finished, enter `npm start` command in the main root to run both `server` and `client` at the same time.

## Testing Scripts

In `client` folder enter the following commands:

-   For test result:
    `npm run test`

    All tests should pass properly.

-   For test coverage result:
    `npm run test -- --coverage --watchAll=false`

    Result should be like the following report:


| File                         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
| ---------------------------- | ------- | -------- | ------- | ------- | ----------------- |
| All files                    | 99.04   | 96.83    | 98.75   | 100     |                   |
| src                          | 100     | 100      | 100     | 100     |                   |
| Root.tsx                     | 100     | 100      | 100     | 100     |                   |
| src/components/Button        | 100     | 100      | 100     | 100     |                   |
| Button.tsx                   | 100     | 100      | 100     | 100     |                   |
| src/components/Customer      | 100     | 100      | 100     | 100     |                   |
| Customer.tsx                 | 100     | 100      | 100     | 100     |                   |
| src/components/Spinner       | 100     | 100      | 100     | 100     |                   |
| Spinner.tsx                  | 100     | 100      | 100     | 100     |                   |
| src/components/Toast         | 100     | 100      | 100     | 100     |                   |
| Toast.tsx                    | 100     | 100      | 100     | 100     |                   |
| src/containers/App           | 66.67   | 100      | 50      | 100     |                   |
| App.tsx                      | 66.67   | 100      | 50      | 100     |                   |
| src/containers/CustomerForm  | 97.22   | 94.74    | 100     | 100     |                   |
| CustomerForm.tsx             | 97.22   | 94.74    | 100     | 100     | 109               |
| src/containers/Customers     | 100     | 85.71    | 100     | 100     |                   |
| Customers.tsx                | 100     | 85.71    | 100     | 100     | 45                |
| src/containers/Search        | 100     | 100      | 100     | 100     |                   |
| Search.tsx                   | 100     | 100      | 100     | 100     |                   |
| src/fixtures/testData        | 100     | 100      | 100     | 100     |                   |
| testData.ts                  | 100     | 100      | 100     | 100     |                   |
| src/redux/actions/customers  | 100     | 100      | 100     | 100     |                   |
| customers.ts                 | 100     | 100      | 100     | 100     |                   |
| src/redux/actions/toasts     | 100     | 100      | 100     | 100     |                   |
| toasts.ts                    | 100     | 100      | 100     | 100     |                   |
| utils.ts                     | 100     | 100      | 100     | 100     |                   |
| src/redux/reducers/customers | 100     | 100      | 100     | 100     |                   |
| customers.ts                 | 100     | 100      | 100     | 100     |                   |
| utils.ts                     | 100     | 100      | 100     | 100     |                   |
| src/redux/reducers/toasts    | 100     | 100      | 100     | 100     |                   |
| toasts.ts                    | 100     | 100      | 100     | 100     |                   |
| src/services/customers       | 100     | 100      | 100     | 100     |                   |
| apis.ts                      | 100     | 100      | 100     | 100     |                   |
|                              |

