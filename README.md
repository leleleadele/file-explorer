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
* Due to the server sometimes not responding correctly, I decided to add **a fallback response copy that will be used in case the request fails** (for demo purposes; just to make sure that the app's file exploring functionality can be tested at all times);
* Since there is no validation in place for file/folder name input, there is currently no restrictions as to what kind of names to enter. The user is able to enter pre-existing file/folder names and rewrite existing ones, if such with the same name exist.
* Since the app only registers file tree changes locally and does not trigger any updates on the server side, the server side file paths and locally stored file paths may likely fall out of sync. **As long as the file paths are stored in local memory, files data from the server WILL NOT be repeatedly requested.**
  
## Running the App Locally

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
