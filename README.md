# Axis Workshops & SALSA 3.0 #
This is a workshop app build using a React.js frontend, a nodejs backend layer, using Google APIs for AI-based analysis powered by a java server.

## Brief description of the code structure
The `frontend` folder contains the React.js-based frontend code. The `backend` folder contains the code for the nodejs backend, made to run in a docker container. The `ai` folder contains the java code running the artificial intelligence analysis functions, using Google APIs, made to build and run using gradle.

## Building and deploying
The project is made to be deployed in a Linux VM. The easiest solution is to host it on Google Cloud Compute Engine; otherwise, Google API access credentials needs to be setup (see below).

### Prerequisites
The following need to be installed:
 * For the frontend component:
   * nodejs/npm
   * nginx
 * For the backend component:
   * nodejs/npm
   * docker
   * docker-compose
 * For the AI component:
   * Java
   * Gradle

Example command on Ubuntu 17.10: `apt-get install nodejs nginx docker.io docker-compose gradle openjdk-8-jdk`

Additionally, port 3000 needs to be opened on the server.

### Nginx config
Run the following commands in the Google Cloud server:
* `$ sudo apt-get install -y nginx`
* `$ cd /etc/nginx/sites-available`
* `$ sudo mv default default.bak`
* `$ sudo touch default`

Edit the file 'default' and insert the following code:
```
server {
  listen 80;
  server_name kcl-salsa-3;

  location / {
    proxy_pass "http://127.0.0.1:8080";
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_cache_bypass $http_upgrade;
  }
}
```

* `$ sudo service nginx restart`

Change back to the root of the front-end
`$ cd ~/kcl-salsa-3/front-end`

Install pm2
`$ sudo npm install -g pm2`

Create a file pm2config.json and insert the following code:
```
{
  "apps": [{
    "script" : "./src/index.js",
    "env": {
      "NODE_ENV": "production",
      "PORT": "8080"
    }
  }]
}
```

Finally, run the following command:
`$ pm2 start pm2config.json`

### Deploying outside of Google Cloud (optional)
To access the Google APIs, an environment variable with access credentials needs to be set prior to deploying the AI component. (INSTRUCTIONS ON THAT GO HERE)

### Endpoint configuration
The variable `ROOT_URL` located in `front-end/src/actions/index.js` needs to be configured to the correct URL.

#### Backend
We do not support deploying the backend and AI components on separate servers, but it should not be tricky to achieve. The variable `aiUrl` located in `backend/config.js` needs to be set; there may or may not be additional networking configurations to take into consideration, such as modifying the docker configuration or opening additional ports.

### Additional installation
Prior to the initial deployment, `npm install` needs to be ran separately in the `front-end` and `backend` servers. This is not necessary to run for subsequent deployments.

Please also note that the initial startup of the backend component will take significantly more time than subsequent deployments, as the necessary images get downloaded.

### Deployment commands
 * Inside the `front-end` folder, run `npm start`
 * Inside the `backend` folder, run `docker-compose up`
 * Inside the `ai` folder, run `./gradlew build -x test && java -jar build/libs/gs-rest-service-0.1.0.jar`

## Running tests
 * Inside the `front-end' folder, run `npm test`
 * Inside the `backend` folder, run `npm test`
 * Inside the `ai` folder, run `gradle test`

## Out-of-scope features and enhancements
During development, various ideas were generated that were deemed useful, but had to be cut from the final project due to time or resource constraints.
 * Generating a report of the stats of a workshop
 * Analysis of questions
 * Workshop QoL features (ability for facilitator to delete ideas, ability for everyone to view all ideas after the workshop is closed, etc.)
 * Real-time analysis using typing speed, tab focus, amount of text deleted etc.
 * Real-time translation of languages for display and analysis
