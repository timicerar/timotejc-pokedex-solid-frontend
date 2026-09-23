# Stage 1: Build
ARG NODE_VERSION
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app

# 1. Copy package.json and package-lock.json
COPY package*.json ./

# 2. Install dependencies
RUN npm ci

# 3. Copy the rest of the source
COPY . ./

# 4. Build the app
ARG APP_IMAGE_TAG
ENV VITE_APP_IMAGE_TAG=$APP_IMAGE_TAG
RUN npm run build

# Stage 2: Production Server (Nginx)
FROM nginx:stable-alpine AS runner

# Copy the static build output from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the SPA specific Nginx config template
# The template makes sure nginx replaces any ${} env variables before it runs
COPY docker/nginx.conf.template /etc/nginx/templates/default.conf.template

# Copy the runtime environment script
COPY docker/runtime-env.sh /usr/local/bin/runtime-env.sh
RUN chmod +x /usr/local/bin/runtime-env.sh

EXPOSE 80

# Run the runtime environment script before starting the server
ENTRYPOINT ["/usr/local/bin/runtime-env.sh", "/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
