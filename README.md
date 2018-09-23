This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Technology

* React
* Redux-Forms
* Enzyme w/ jest

## Specifics

* Browser - Chrome, Safari
* Node v8.5.0
* NPM v6.0.0

## Scripts

### Run mock server - `json-server --watch db.json --port 3004`

The server looks for the db.json file which is present within the project.<br/>
The port number can be changed to another value (except 3000), it can be updated in the constants.js file.

### Run frontend - `npm start` or `yarn run start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Run tests - `npm test` or `yarn run test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### Run bild - `npm build` or `yarn run build`

## Folder Structure
```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
  src/
    common/
      common.js
      constants.js
    components/
      card/
        index.js
        index.css
      fields/
        index.js
      user-role-form/
        index.js
        index.css
      validation/
        index.js
    App.css
    App.js
    App.test.js
    index.js
```