# Sample Customer Project

## Technologies:

-   React
-   Redux
-   Typescript
-   CSS module
-   React-redux
-   Axios

## Run Application

### - Dependecy Installtion:

-   In the main root which both `client` and `server` folders exist, run `npm i`. As you can see in the `package.json` npm will automatically install all dependencies inside `client` and `server` folders by the use of the following script in the `package.json` file:

    `"postinstall": "(cd client && npm i); (cd server && npm i);"`

-   If you are not happy with this approach, please remove `postinstall` script with all it's commands completely and run `npm i` three times for `client`, `server` and main root directories.

### - Run Project:

After dependecies's installation finished, enter `npm start` command in the main root to run both `server` and `client` at the same time.

## Testing Scripts

In client folder enter the following commands:

-   For test result:
    `npm run test`

-   For test coverage result:
    `npm run test -- --coverage`
