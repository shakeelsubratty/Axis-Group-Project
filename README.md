# Axis Workshops & SALSA 3.0 #
This is a workshop app build using a React.js frontend, a nodejs backend layer, using Google APIs for AI-based analysis powered by a java server.

## Brief description of the code structure
The `frontend` folder contains the React.js-based frontend code. The `backend` folder contains the code for the nodejs backend, made to run in a docker container. The `ai` folder contains the java code running the artificial intelligence analysis functions, using Google APIs, made to build and run using gradle.

## Building and deploying
The project is made to be deployed in a Linux VM hosted on Google Cloud. After cloning the repository to the deployment machine, run configure.sh with root privileges to install all the prerequisites. Afterwards, run deploy.sh to start all three components, or alternatively start them manually (see below).

## Non-standard deployments
### Outside of Google Cloud
To access the Google APIs, an environment variable with access credentials needs to be set prior to deploying the AI component. (INSTRUCTIONS ON THAT GO HERE)

### Manual deployment
If you wish to e.g. deploy the various components on different servers, or if you wish to have more control over the deployment of each component, you will want to deploy them manually.

#### Configuration
If the frontend needs to be deployed  separately from the backend, the variable `ROOT_URL` located in `front-end/src/actions/index.js` needs to be configured to the correct URL.
Similarly, if the backend and AI components need to be deployed separately, the variable `aiUrl` located in `backend/config.js` needs to be set.

#### Deployment commands
 * Inside the `front-end` folder, run `npm start`
 * Inside the `backend` folder, run `docker-compose up`
 * Inside the `ai` folder, run `./gradlew build -x test && java -jar build/libs/gs-rest-service-0.1.0.jar`
