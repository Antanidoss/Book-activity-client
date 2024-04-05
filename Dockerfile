FROM node:latest
WORKDIR /app
COPY . .
RUN npm run build
CMD ["npm", "start"]