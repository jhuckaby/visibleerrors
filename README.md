# Visible Errors

*Visible Errors* is a browser extension for Safari and Chrome, which shows you every JavaScript error on your pages visually, using a notification system similar to Growl.  This can be used for developing web apps, when you may not always have the console open.  The way JavaScript was designed, a single error doesn't necessarily stop execution of your web app.  DOM events still execute, timers still fire, etc.  Sometimes an error may be thrown but you may not even notice it.  Visible Errors puts a stop to that.  As a programmer, I want to see every error thrown by my apps, whether I have the console open or not.

Visible Errors shows notifications right in the page on which the errors occurred, in the top-right corner of the window.  They have a "fixed" position, so they aren't affected by scrolling.  If you have IFRAMEs in your app, they'll appear inside the frame, when appropriate.

For more details, screenshots and download links, please see: http://pixlcore.com/visibleerrors

## Local Development

### Safari

For developing extensions in Safari, you first need to get a certificate from Apple.  Instructions for this can be found here: https://developer.apple.com/programs/safari/gettingstarted/

Next, make sure the "Develop" menu is enabled in Safari (Preferences → Advanced), open the Develop menu, and select "Show Extension Builder".

Click the "+" icon in the bottom-left, and select "Add Extension...".  Select the "visible-errors-safari.safariextension" folder, and the extension settings should appear.

Click "Install" to install the extension, and "Reload" to reload it.

### Chrome

For developing extensions in Chrome, go to Window → Extensions, and enable "Developer Mode" by clicking the checkbox in the top-right corner.

Click "Load unpacked extension..." and select the "visible-errors-chrome" folder.  Your extension should now be loaded.  Click the "Reload" link to reload it.

## Packaging

### Safari

For packaging the extension in Safari, go to Develop → Show Extension Builder, then click on "Build Package".  This will create a "safariextz" file, which is the distributable Safari extension package.

### Chrome

For packaging the extension in Chrome, go to Window → Extensions, and click "Pack Extension...".  The root directory is the "visible-errors-chrome" folder.  Select your private key if you have one, and click "Pack Extension".  This will create a "crx" file, which is the distributable Chrome extension package.

## License

The MIT License (MIT)

Copyright (c) 2011 - 2014 Joseph Huckaby

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
