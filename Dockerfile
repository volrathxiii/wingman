FROM arm32v7/node

WORKDIR /build/wingman/

RUN apt-get update && apt-get install -y git

RUN npm install -g npm@latest

EXPOSE 8080
CMD [ "npm", "start" ]