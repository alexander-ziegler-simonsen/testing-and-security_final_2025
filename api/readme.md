# the API 

This folder holds the node express api, there are some steps needed to be done, before you will be able to run it locally.


# init
I'm using pnpm, so if you use yarn or npm, it will be faced with a lot of package conflicts. 

In order to get the api up and running, you first need the database to be running, since we need to talk with it before we start the api.
Remember to fill out the DATABASE_URL inside the .env file.

run "pnpm install".
this comamnd should auto run "pnpm run postinstall", which generates the prisma files.
if there is no files inside the path "src/generated/prisma/", then you have to run it yourself.

in case you are faced with some errors, you could try to run "pnpm run update_schema", but you should not need to do that.


## why this extra step ?

Prisma files are made at build time, they are not commited to the repo and never will.
The whole api needs those files, if they are not here, nothing will work





