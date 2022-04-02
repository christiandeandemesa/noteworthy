# Noteworthy
Allows the user to login and register an account. The logged in user can create, see, and delete their own notes. The backend was built with JavaScript, React.js, Node.js, Express.js and MongoDB. The frontend was built with JSX, CSS3, SASS, Redux, and React-Redux. 

Other features utilized include REST CRUD API, REST login/registration API, custom authorization middleware with JSON web tokens, custom error middleware, CORS, colors to have server side connections stand out, bcryptjs to hash passwords, concurrently to run the server and client simultaneously, Redux store, React-Redux components, reusable components, React Router DOM components, React icons, React-Toastify for errors, SASS modules, and a CSS reset provided by https://www.joshwcomeau.com/css/custom-css-reset/.

## How to run this project
### Copy this project and install dependencies
1. Open your terminal and type: git clone https://github.com/christiandeandemesa/noteworthy.git
2. To download the backend dependencies, cd into the noteworthy folder and type: npm install
3. To download the frontend dependencies, cd into the frontend folder and type: npm install
4. Go to the backend folder by typing: cd .. then cd backend
5. Create a .env file with the below code:
```
NODE_ENV = development
PORT = 5000
MONGO_URI = <Connection to your MongoDB>
JWT_SECRET = <Your secret key>
```
7. Run this project by typing: npm run dev

### Connect a MongoDB
1. Download the MongoDB community server [here](https://www.mongodb.com/try/download/community)
2. Sign into/Create your account [here](https://account.mongodb.com/account/login).
3. Create a new project.
4. Create and name a shared AWS cluster.
5. Give it a username and password, leave it on your local environment, and add your IP address.
6. Click the collections tab, and create a collection.
7. Click the overview tab, the connect button, and connect using MongoDB compass.
8. Open your MongoDB compass, copy the connection string to your MongoDB compass, and replace <password> with your password, and test with your database name.

## Features
- User can login and register an account.
- User cannot register another account with the same email.
- Dashboard cannot be accessed unless a user is logged in.
- Frontend validation.
- User can create a note.
- User can see all of their created notes.
- User can view a timestamp of a specific created note.
- User can delete their notes.

## Upcoming Features
- User can edit their notes.
- Responsive web design for portrait and landscape mobile devices.
- Cross browser support for Chrome, Firefox, Edge/Internet Explorer, Opera, and Safari.

## Author
- Christian Demesa: https://github.com/christiandeandemesa

## Demo
### Registration, Login, and Logout

https://user-images.githubusercontent.com/85912934/161366944-633b7418-6f1d-4752-b7a9-ea0f0df7ed28.mp4

### Creating, Viewing, and Deleting Notes that belong to the Logged In User.

https://user-images.githubusercontent.com/85912934/161366948-19da193f-ec1f-474f-a37b-dd2e69851435.mp4
