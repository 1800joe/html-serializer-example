# prismic.io Example Website with a working HTML Serializer

This is a simple nodejs website example with a working HTML Serializer for prismic.io. 

The HTML Serializer is located in the prismic-configuration.js file. It is then called in homepage.pug and page.pug.

## Installing the project

You can launch this project easily with the prismic.io command line tool if you want to try it out yourself.

Start by installing the command line tool.

```
$ npm install -g prismic-cli
```

Next, point your terminal to the location where you want to install the project folder and run the following command. The command line tool will prompt you to pick a name for your prismic repository and the project folder.

```
$ prismic theme https://github.com/prismic-levi/example-website-theme
```

This will automatically install the project files, set up a new prismic-repository, and create the custom types. 

Then you just need to add some content on your prismic.io repository and you can launch the project locally to see it working. 


## Launch the project locally

Once the project is installed, launch a local instance of the project. Start by installing nodemon on your computer with the following command. You can skip this step if you have already installed nodemon.

```
$ npm install -g nodemon
```

Point your terminal to the project folder and run nodemon to start your local server.

```
$ nodemon app.js
```


## Licence

This software is licensed under the Apache 2 license, quoted below.

Copyright 2016 Zengularity (http://www.zengularity.com).

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this project except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
