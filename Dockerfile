FROM node:latest
WORKDIR /app
COPY . .
RUN npm install react-scripts
RUN npm run build
CMD ["npm", "start"]