FROM node:22-alpine

WORKDIR /app

RUN corepack enable

ENV CI=true

COPY package.json pnpm-lock.yaml ./

RUN pnpm config set onlyBuiltDependencies esbuild

RUN pnpm install

COPY . .

EXPOSE 5173

CMD ["pnpm","run","dev","--","--host","0.0.0.0"]