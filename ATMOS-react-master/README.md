### Live Website

## Frontend

### Installation and Setup Instructions
- Install the dependencies using `npm install`
- To start the app, run `npm start` in the root directory.
- App will be running on port 3000 by default.

### Setup Environment
Add the following variable in .env file
```
REACT_APP_BACKEND_URL=http://localhost:4000
REACT_APP_SOCKET_URL=http://localhost:8800
```


Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


## Backend 

## Main Server

### Installation and Setup Instructions

- Install the dependencies using `npm install`
- To start the server, run `npm start` in the root directory.
- Server will be running on port 4000 by default.

### Setup Environment
Add the following variable in .env file
```
PORT=4000
MONGO_URI= -------
TOKEN_SECRET= -------
FRONTEND_URL=http://localhost:3000
```


## Socket Server

- Install the dependencies using `npm install`
- To start the server, run `npm start` in the root directory.
- Server will be running on port 8800 by default.


## Testing

- To test the server, run `npm test` in the root directory.
- To test the app, run `npm test` in the root directory.
