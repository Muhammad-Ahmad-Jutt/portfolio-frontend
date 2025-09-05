# TO USE NODE IMAGE
FROM node:20

# SET WORKING DIRECTORY
WORKDIR /app

# COPY PACKAGE FILES
COPY package*.json ./

# INSTALL DEPENDENCIES
RUN npm install


# COPY PROJECT FILES
COPY . .



# # BUILD THE REACT APP
# RUN npm run build # no need right now as we are in development 
# EXPOSE PORT
EXPOSE 3000
# START THE APP
CMD ["npm", "start"]