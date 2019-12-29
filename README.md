# Unity3D + Node.JS

This repository will contain all the code corresponding to the video tutorials of my YouTube series about how to create online multi-player games using Unity3D + Node.JS


# Info

You may have noticed that this repository includes the ** node_modules ** folder, well, I do this because I want people with not much knowledge in node.js being able to use these examples more easily ;)

You can contact me or ask me any questions to this email: **merlimejia2@gmail.com**

# Episodes

[1- Basic principles, configure project and connect to the server](https://youtu.be/uD1320SRAzo)


# Useful Commands

Inicialize a Node.js project:

    npm init

Install Typescript:

    npm install typescript -s

How the **scripts** tag should looks like inside our **package.json** file:

    "scripts": {  
    "tsc": "tsc",  
    "dev": "ts-node-dev --respawn --transpileOnly ./src/Server.ts",  
    "prod": "tsc && node ./Build/Server.js"  
    },

Inicialize Typescript:

    npm run tsc -- --init

Install the **net** library types:

    npm install @types/node

Install node-ts-dev:

```
npm install @types/node
```

Run server on development mode:

    npm run dev

Run server on production mode:

    npm run prod

