# the API 

This folder holds the node express api, there are some steps needed to be done, before you will be able to run it locally.


# init
I'm using pnpm, so if you use yarn or npm, then you will be faced with a lot of package conflicts. 

In order to get the api up and running, you first need the database to be running, since we need to talk with it before we start the api.
Remember to fill out the DATABASE_URL inside the .env file.

you need to run these commands:

```shell
pnpm install

# generated the prisma files, that the api need to run
pnpm run prisma_build
# this step was in the 'postinstall' package.json script before, but that gave problems with the github actions pipeline
```

then you can start it locally with "pnpm run dev".

in case you are faced with some errors, you could try to run "pnpm run prisma_update", but you should really not need to do that.


## why this extra step ?

Prisma files are made at build time, they are not commited to the repo and never will.
The whole api needs those files, if they are not here, nothing will work





