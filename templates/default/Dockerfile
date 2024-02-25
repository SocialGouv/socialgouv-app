FROM node:18-alpine as base

RUN apk add --no-cache git
WORKDIR /app

FROM base AS builder

COPY . .

RUN yarn install
RUN yarn build

FROM base AS runner

COPY --from=builder /app/build /app
COPY --from=builder /app/node_modules /app/node_modules

USER 1000

CMD ["node", "index.js"]
