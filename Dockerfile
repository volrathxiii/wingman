FROM arm32v7/node

WORKDIR /build/wingman/

RUN apt-get update && apt-get install -y git

RUN npm install -g npm@latest
RUN npm install -g n
COPY src/.nvmrc /build/wingman/.nvmrc
RUN n auto

EXPOSE 8080
EXPOSE 8081
CMD [ "npm", "start" ]