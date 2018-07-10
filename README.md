# Author: Abhijit Baldawa

# react-redux-ssr-assignment
A full stack node.js/react/redux SSR/client application which shows paginated list of viaplay series by fetching data from viaplay public REST endpoints. 

I have also implemented navigation capabilities to the UI even though it was not mentioned in the assignment. So user can  navigate "first", "prev", "next", "last" and browse viaplay series using REST endpoint (/navigation) exposed by local node.js server. I have used [Material-Ui](https://material-ui.com/) react components.


#### The front end (React/redux) and backend node.js is written in latest ES 2017 syntax completely with async/await and latest node.js version (10.5) and latest react/redux version is used. Also, all components in react are STATELESS as it was mentioned in the assignment and code is completely documented along with design/pattern decision description and method usage documentation.

## File Structure
1] ./server/ (DIRECTORY) -> Contains all the server code <br/>
2] ./client/ (DIRECTORY) -> Contains all the client code <br/>
3] ./common/ (DIRECTORY) -> Contains common code shared by client and server <br/>

## Exposed REST Endpoint
### <BASE_URL>/navigation
Also accepts **OPTIONAL** query param **pageUrl=VIAPLAY_URL_FOR_SERIES_DATA**
<br/>
1. If queryParam **'pageUrl'** is present then this endpoint returns series metadata for that VIAPLAY URL.
2. If it is NOT present then this endpoint returns first page series data from viaplay server (used by client side rendering)


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

## The output:
1. SSR output (and client as well) looks as below (Screen shot taken at 60 percent of zoom to fit everything on screen)
<img width="1280" alt="ssr" src="https://user-images.githubusercontent.com/5449692/42531235-bb129f6e-8483-11e8-8453-03049b380acd.png">


## Known issue
On server side rendered page ("http://localhost:3000/ssr") everything is fine on the landing page but when user clicks on navigation links ("first", "prev" etc.) the grid gap between individual series components reduces. This is happening due to styles not being correctly applied just for the grid element from "material-ui" so seems like some issue with "material-ui" when rendered on server side. Due to lack of time I did not spend much time on this as it does not impact a lot on alignment and visibility. On client side URL ("http://localhost:3000/ssr") there is no such issue on navigation.
