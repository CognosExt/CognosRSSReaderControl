# CognosRSSReaderControl
RSS Reader control for Cognos.

## Usage
1. Add a custom Control on your report.
2. Point the 'Module Path' attribute to where you installed the dist/CognosRSSReaderControl.js file (or to test, use https://rawgit.com/CognosExt/CognosRSSReaderControl/master/dist/CognosRSSReaderControl.js )
3. Copy the following json into the Configuration attribute:

```  
  {
    "Url": "https://www.mercedes-benz.com/en/ressort/mercedes-benz/feed/",
    "Proxy": true,
    "ShowTitle": true,
    "ShowLinks": true,
    "NewWindow": true,
    "ShowContent": true,
    "FullHTML": false,
    "MaxItems": 5,
    "Categories": [
        "me Magazine"
    ]
  }
  ```
Enjoy your first RSS feed in your Cognos report.

## Build

Clone this repository:
```
git clone https://github.com/CognosExt/CognosRSSReaderControl.git
```    
cd into the directory
```
cd CognosRSSReaderControl
```
install the local dependencies
```
npm install
```
install rollup globally (on ubuntu you should use sudo)
```
sudo npm intall rollup -g
``` 
Compile and watch the build
```
rollup -c -w
```    
