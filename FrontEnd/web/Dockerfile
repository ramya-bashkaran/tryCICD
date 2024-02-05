# FROM node:latest
#
# WORKDIR /usr/src/app
# COPY package*.json ./
# # RUN npm install
# COPY . .
# # RUN npm run build --prod
## EXPOSE 4200
# # CMD ["npm", "start"]
#
# FROM nginx:latest
# RUN rm -rf /usr/share/nginx/html/*
# COPY src/index.html /usr/share/nginx/html
# EXPOSE 4200
#
#
# FROM node:latest as build
#
#
# WORKDIR /usr/local/app
#
# COPY ./ /usr/local/app/
#
# RUN npm install
#
# RUN npm run build



#  FROM nginx:latest
#  COPY --from=build /usr/local/app/dist/web    /usr/share/nginx/html

#  EXPOSE  80
#-----------------------------------------------------------------------------
FROM node:latest as build
RUN mkdir /app
WORKDIR /app
RUN npm install -g @angular/cli
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]




# FROM node:12.7-alpine AS build
# WORKDIR /usr/src/app
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . .


# FROM nginx:1.17.1-alpine
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY --from=build /usr/src/app/dist/web/browser /usr/share/nginx/html   