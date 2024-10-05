FROM node:latest

WORKDIR /app

COPY ./package.json /app

RUN npm install

COPY . /app

EXPOSE 5173

CMD ["npm" , "run" , "dev" , "--" , "--host" , "0.0.0.0"] 
