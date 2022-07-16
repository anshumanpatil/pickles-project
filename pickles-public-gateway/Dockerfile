# Common build stage
FROM node:14.0.0-buster as common-build-stage

COPY . ./app

WORKDIR /app

RUN npm install --verbose

EXPOSE 4000

# Development build stage
FROM common-build-stage as development-build-stage

ENV NODE_ENV development

CMD ["npm", "run", "dev"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

CMD ["npm", "run", "start"]
