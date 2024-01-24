FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install nodemon --save-dev 
RUN npm install git --save-dev
COPY . .
EXPOSE 8000
CMD [ "npm", "start" ]
