# Steps followed

1. npm init -y
2. yarn add express dotenv
3. yarn add -D typescript @types/express @types/node
4. npx tsc --init
5. change outDir's value to "./dist"
6. yarn add -D nodemon ts-node
7. added
   ```json
   {
     "scripts": {
       "build": "npx tsc",
       "start": "node dist/index.js",
       "dev": "nodemon src/index.ts"
     }
   }
   ```
8. yarn add -D concurrently
9. created nodemon.json. This file lets you specify directories and extensions to watch
   and define commands to execute, while nodemon manages the reloading of the application
   upon changes

```json
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "concurrently \"npx tsc --watch\" \"ts-node src/index.ts\""
}
```
