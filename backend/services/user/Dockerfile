FROM node:24-slim

WORKDIR /app

# Copy shared code
COPY shared ./shared

# Copy this service's files
COPY services/user/package*.json ./
COPY services/user/tsconfig.json ./
COPY services/user/src ./src
COPY services/user/db ./db

# Install and build
RUN npm install
RUN npm rebuild better-sqlite3
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
