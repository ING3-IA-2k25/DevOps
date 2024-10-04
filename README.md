# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Docker-compose

Make sure you have install docker and docker-compose on your engine then:

```bash
sudo docker-compose up --build -d

docker exec -ti devops_mongo_1 sh

mongoimport --collection='fieldfile_option' --file=/data/db/Spotify_headerless.csv --type=csv --fieldFile=/data/db/Spotify_field_file.txt -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD --authenticationDatabase $MONGO_INITDB_ROOT_USERNAME

```

## Docker

Make sure you have install docker on your engine then:

```bash
docker build -t 'devops' -f nuxt.Dockerfile .

docker run -p 3000:3000 -d -t 'devops'
```


## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
