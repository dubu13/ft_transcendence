FROM node:24-slim

WORKDIR /app

# Install build dependencies for native modules (better-sqlite3)
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy shared code
COPY shared ./shared

# Copy this service's files
COPY services/pong/package*.json ./
COPY services/pong/tsconfig.json ./
COPY services/pong/src ./src
COPY services/pong/db ./db

RUN npm install
RUN npm rebuild better-sqlite3
RUN npm run build

EXPOSE 6061

CMD ["npm", "start"]
