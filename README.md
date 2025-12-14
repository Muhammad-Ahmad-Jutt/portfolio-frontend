# React Frontend Docker Project

## Overview
This project is a React frontend application set up to run inside a Docker container. The container is based on `jenkins/jenkins:lts` and includes Node.js 20 for building and serving the React app. The project can either serve a production build or be used in development with environment variables for connecting to a backend Flask server.

## Project Structure
project_root/
│
├── public/
├── src/
├── package.json
├── package-lock.json
├── Dockerfile
└── docker-compose.yml

## Docker Setup
- Dockerfile installs Node.js 20, npm, and `serve` globally to serve production builds.  
- Copies dependencies and installs them.  
- Builds the React app (`npm run build`).  
- Serves the static build folder on port 3000.  
- docker-compose.yml builds the image, sets environment variable `REACT_APP_FLASK_SERVER`, maps port 3000, and restarts the container automatically.

## Environment Variables
- `REACT_APP_FLASK_SERVER` – The URL of your Flask backend (e.g., `http://localhost:5000`).  
This variable is injected during build and can be accessed in React with `process.env.REACT_APP_FLASK_SERVER`.

## Running the Project
### Production Build (Recommended)
1. Build and start the container:
docker-compose up --build
2. Access the React app at [http://localhost:3000](http://localhost:3000).

### Development (Optional)
For live reload during development, mount the source folder as a volume and run `npm start` (requires modifying Dockerfile and Compose volumes).

## Commands
- Build Docker image: docker-compose build  
- Start container: docker-compose up  
- Stop container: docker-compose down

## License
This project is licensed under the MIT License.
