# Use official node image as the base image
FROM node:14.18.1 as build

# Set the working directory
RUN rm -rf /usr/local/app/dist
RUN rm -rf /usr/share/nginx/html

# Add the source code to app
COPY ./ /usr/local/app/

# Set the working directory
WORKDIR /usr/local/app


# Install all the dependencies
RUN npm cache clean --force
RUN npm cache verify  
RUN npm install

# Generate the build of the application
RUN npm run build

# Stage 2: Serve app with nginx server
# Use official nginx image as the base image
FROM nginx:latest

COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/local/app/dist  /usr/share/nginx/html

# Expose port 80
EXPOSE 80