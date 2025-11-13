FROM node:24-slim

WORKDIR /app

# Copy shared code
COPY shared ./shared

# Copy this service's files
COPY services/auth/package*.json ./
COPY services/auth/tsconfig.json ./
COPY services/auth/src ./src
COPY services/auth/db ./db

# Install and build
RUN npm install
RUN npm rebuild better-sqlite3
RUN npm run build

EXPOSE 4000

CMD ["npm", "start"]
