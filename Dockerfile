FROM resin/raspberry-pi-node as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM resin/raspberry-pi-node:slim
COPY --from=build /app .
WORKDIR /app
COPY . .
CMD ["npm", "start"]
EXPOSE 3000
