In order to run the server and use the UI:


1. Download [NodeJS](https://nodejs.org/en/)
    - The download includes Node as well as NPM (Node Package Manager)
    - NPM allows you to install open source packages for use in your project
    - Make sure Node is installed globally and is added to your environment variable PATH
2. Pull the entire server_ui directory
3. From the command line, cd to the directory and run npm install
    - This will read through the dependencies listed in ./package.json and download the necessary packages

```
cd \server_ui
npm install
```

4. When the downloading is done, from the command line call npm run start
    - The UI is built using modules with many JS files being used, npm run start will bundle them all into a single file so that they can be served
    - This command will also run the server by calling node app/appServer.js
    - You can stop the server any time by hitting Ctrl^C twice

```npm run start```

5. After the UI is bundled and the server is started, navigate to [http://localhost:3000](http://localhost:3000)
