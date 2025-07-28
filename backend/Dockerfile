FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

# Stage 2: Runtime - small image
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app /app
EXPOSE 3001
CMD ["node", "index.js"]
