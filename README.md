# jcg-code-generator

#### npm package that generates html, js and css boilerplate code based on label, input, button, textarea, eventListeners etc

### Example Usage  

#### Put the code below in a .js file and run with:  


**node YourScriptFileName.js**

#### This should generate one .html file, one .js file and one .css file using the information you put in the fieldAttributes.fields 
#### You can easily switch filenames by changing the filename object and generate more fields by extending the fieldAttributes.fields Array with more entries.  

## JavaScript Code

```javascript
const codeGenerator = require('jcg-code-generator');

const fieldAttributes = {
  fields: [
    {
      "field-type": "input",
      "type": "text",
      "value": "",
      "placeholder": "your username",
      "class": "my-input-class",
      "id": "login",
      "label": "Login: ",
      "eventListener": {
        "type": "change",
        "async": false
      }
    },
    {
      "field-type": "input",
      "type": "password",
      "value": "",
      "placeholder": "your password",
      "class": "my-input-class",
      "id": "password",
      "label": "Password:"
    },
    {
      "field-type": "textarea",
      "value": "test",
      "placeholder": "your password",
      "class": "my-input-class",
      "id": "textarea1",
      "label": "Password:"
    },
    {
      "field-type": "button",
      "value": "Send",
      "class": "my-button-class",
      "id": "submit",
      "eventListener": {
        "type": "click",
        "async": false
      }
    }
    // Add more fields as needed
  ]
};

const filename = {
  "html": "index.html",
  "js": "script.js",
  "css": "style.css"
};

codeGenerator(fieldAttributes, filename);
