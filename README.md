# Access the App

The app is deployed to [adeles-file-explorer.netlify.app](https://adeles-file-explorer.netlify.app).

## About the App

Features:
* Fetches file paths from server on initial page load when app is first visited;
* User can expand and close folders and see their contents by clicking on them;
* User can create new files and folders using the "+file" and "+folder" buttons on every level of the file tree;
* User can delete files and folders by clicking the "x" button on the right side of the file/folder in question;
* Any user actions are stored locally and the state of the file tree is preserved between page refreshes, unless local storage is cleared.

Known issues:
* Since there is no validation in place for file/folder name input, there is currently no restrictions as to what kind of names to enter. The user is able to enter pre-existing file/folder names and rewrite existing ones, if such with the same name exist.
  
## Running the App Locally

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
