# SolRFrontEnd
Front end web app for accessing a SolR database containing email documents

##Development Setup

Install [NodeJS] (https://nodejs.org/en/).

Clone this repository.

Navigate in the command line to the root of this repository (Probably called SolRFrontEnd).

If you are on Linux, run the following command in a terminal to install the appropriate tools:

```
npm install
```

If one makes changes to the index.js file in the root of this directory, make sure to run the refresh script (refresh.bat for Windows or refresh.sh for Linux) to recompile changes to web.js. If the refresh script has errors, run the following command from the terminal or try to install the package that the error claims is missing or inaccessible:

```
npm install
```

The solr-faceted-search-react package included in ./node_modules is a CUSTOM version. Do not update/remove/uninstall this package (there is a package by the same name in the npm registry) through npm. The repository for this can also be found [here](https://github.com/israelterrill/solr-faceted-search-custom). 

If one makes any changes to this package, make sure to run the watch script (watch.sh or windowsWatch.bat) located in the root directory of the solr-faceted-search-react package in order to compile changes. If the watch script throws any errors (i.e. does not remain open), one should try to install the package that the command claims is missing (simplest approach) or, if that does not work, run the following commmand from a terminal:

```
npm install
```

For much more helpful information on the solr-faceted-search package, see the original package information [SolR Faceted Search](https://github.com/HuygensING/solr-faceted-search-react).

If one wants to see one's changes before deployment, one can run a simple webserver. Although any web server may be chosen, one can use [http-server](https://www.npmjs.com/package/http-server), which can be installed using the following command from a terminal (be sure to have root or admin permissions):

```
npm install -g http-server
```

Now, in the root directory of the project (or a directory containing index.html and web.js if testing for deployment), run the following command in a terminal:

```
http-server
```

The correct address/port to use will be displayed in the terminal. If nothing shows up in the browser, use the developer tools (CTRL+SHIFT+J for Chrome) to view the errors.

IMPORTANT: MAKE SURE to use CTRL+F5 after every compile/change cycle when trying to load the page as the browser will cache the page from the last run (CTRL+F5 clears the page cache).

##Deployment
After completing the above [setup](##Development Setup) steps, go into the index.js and change the value of the url constants to point to your SOLR REST API and your database attachments directory.

To make sure these changes are reflected, run the refresh script (refresh.bat for Windows and refresh.sh for Linux) in the root directory to recompile changes to web.js in the root directory.  If the refresh script has errors, run the following command from the terminal or try to install the package that the error claims is missing or inaccessible:

```
npm install
```

From the root directory of the repository, copy the web.js and index.html files to the server of your choice. These are the only files required for deployment.

If you have problems with the page not showing up, check the developer tools of your browser (CTRL+SHIFT+J for Chrome), and, if the console has an error involving CORS access, install a [plugin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en) from the Chrome web store for temporary development or [change the server settings to allow CORS](http://marianoguerra.org/posts/enable-cors-in-apache-solr.html). If the page still does not show up, try navigating to the url of the SOLR database to be sure that the web browser is not blocking the page for security reasons (i.e. unsafe certificates).

