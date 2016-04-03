FROM hypriot/rpi-node

WORKDIR /app
COPY . /app
RUN cd /app; npm install

ENTRYPOINT ["npm", "start"]
EXPOSE 3000
