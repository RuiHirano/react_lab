FROM node:current-alpine3.12

# install dependencies
WORKDIR /react_lab/frontend

COPY . .

RUN yarn upgrade \ 
    && yarn install \
    && yarn build \
    && yarn add serve

EXPOSE 3000
CMD [ "yarn", "serve", "-s", "build", "-l", "3000"]
