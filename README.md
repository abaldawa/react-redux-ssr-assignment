# Author: Abhijit Baldawa

# react-redux-ssr-assignment
A full stack node.js/react/redux SSR application which shows paginated list of viaplay series by fetching data from viaplay public REST endpoints. 

I have also implemented navigation capabilities to the UI even though it was not mentioned in the assignment. So user can  navigate "first", "prev", "next", "last" and browse viaplay series using REST endpoint (/navigation) exposed by local node.js server.


#### The front end (React/redux) and backend node.js is written in latest ES 2017 syntax completely with async/await and latest node.js version (10.5) and latest react/redux version is used. Also, code is completely documented along with design/pattern decision description and method usage documentation.

## File Structure
1] ./server/ (DIRECTORY) -> Contains all the server code <br/>
2] ./client/ (DIRECTORY) -> Contains all the client code <br/>
3] ./common/ (DIRECTORY) -> Contains common code shared by client and server <br/>

## Exposed REST Endpoint
### <BASE_URL>/navigation?pageUrl=VIAPLAY_URL_FOR_SERIES_DATA
<br/>
Query param 'pageUrl' is mandatory.  <br/>
This endpoint fetches and returns series, navigation and links metadata from the 'pageUrl'. This endpoint is used by "first", "prev", "next", "last" navigation buttons.

## Exposed URL's
### <BASE_URL>/ssr
<br/>
Once the server is started this URL will display UI rendered on the server

### <BASE_URL>/client
<br/>
Once the server is started this URL will display UI rendered on the client

## How to run
1. git clone the project
2. cd react-redux-ssr-assignment
3. npm i
4. npm start
5. Go to http://localhost:3000/ssr to see SSR rendered UI or http://localhost:3000/client to see UI rendered on client side

## Known issue
Due to CORS, while on URL "http://localhost:3000/client" the browser will block direct calls to viaplay URL's and so the user might see error popup on the UI. Is the refresh is pressed 5-10 times in quick succession then it does work. Once the UI gets data from VIAPLAY server directly then the navigation works because the navigation requests are always made to local server at "/navigation?pageUrl=VIAPLAY_URL_TO_QUERY". I did it this way because in the assignment it was mentioned that the client should not depend on the local server (I still choose to do the navigation by calling to local server so that the UI works. I would have choosen to even get the landing page data via local server had this requirement not been mentioned)
