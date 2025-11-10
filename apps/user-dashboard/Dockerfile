# Stage 1 — Build React app
FROM node:22-bullseye-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx nx build user-dashboard

# Stage 2 — Serve
FROM nginx:alpine
COPY --from=build /app/dist/apps/user-dashboard /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
