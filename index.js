const jcgWriteFile = require('jcg-writefile');


function generateCode(fieldAttributes) {
    const { fields } = fieldAttributes;
  
    let htmlCode = '';
    let jsCode = '';
  
    fields.forEach(field => {
      const { "field-type": fieldType, type, value, placeholder, class: className, id, label, eventListener } = field;
  
      // Generate HTML code
      let fieldHtmlCode = '';
      let labelHtmlCode = '';
  
      if (label) {
        labelHtmlCode = `<label for="${id}">${label}</label>\n`;
      }
  
      if (fieldType === "input") {
        fieldHtmlCode = `<${fieldType} type="${type}" id="${id}" class="${className}" value="${value}" placeholder="${placeholder}">\n\n`;
      } else if (fieldType === "button" || fieldType === 'textarea') {
        fieldHtmlCode = `<${fieldType} id="${id}" class="${className}">${value}</${fieldType}>\n\n`;
      } else {
        throw new Error(`Invalid field-type: ${fieldType}`);
      }
  
      htmlCode += `<!--${labelHtmlCode}${fieldHtmlCode}-->`;
  
      // Generate JavaScript code
  
      if (label) {
          const labelJsCode = `let ${id}Label = document.createElement("label");
      ${id}Label.setAttribute("for", "${id}");
      ${id}Label.textContent = "${label}";
      container.appendChild(${id}Label);\n\n`;
    
          jsCode += `${labelJsCode}\n`;
        }
  
  if (fieldType === "button" || fieldType === 'textarea') {
  
    const fieldJsCode = `let ${id} = document.createElement("${fieldType}");
    ${id}.innerText = "${value}";
    ${id}.className = "${className}";
    ${id}.id = "${id}";
    container.appendChild(${id});\n\n`;
  
    jsCode += `${fieldJsCode}\n`;
  
  } else {
  
      const fieldJsCode = `let ${id} = document.createElement("${fieldType}");
      ${id}.type = "${type}";
      ${id}.value = "${value}";
      ${id}.placeholder = "${placeholder}";
      ${id}.className = "${className}";
      ${id}.id = "${id}";
      container.appendChild(${id});\n\n`;
    
      jsCode += `${fieldJsCode}\n`;
  
  }
  
      
  
  
  
      if (eventListener) {
        let eventType;
        let asyncListener = false;
        if (eventListener === true) {
          eventType = "click";
        } else if (typeof eventListener === "string") {
          eventType = eventListener;
        } else if (typeof eventListener === "object") {
          eventType = eventListener.type || "click";
          asyncListener = eventListener.async || false;
        }
  
        const eventListenerCode = `${id}.addEventListener("${eventType}", ${asyncListener ? "async " : ""}() => {
    // Your event listener code here
    // you can for example run a function:
    // runThisFunction();
  });`;
  
        jsCode += `${eventListenerCode}\n\n\n`;
      }
      
    });
  
    return {
      htmlCode,
      jsCode
    };



  }
  
  

  function codeGenerator(inputJSON, filename) {

    const generatedCode = generateCode(inputJSON);
    
    const finalHtmlCode = `<!DOCTYPE html>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>JCG Document</title>
        <link rel="stylesheet" href="${filename.css}">
    </head>
    <body>
        <div id="container">
        ${generatedCode.htmlCode}
        </div>
        <script src="${filename.js}"></script>
    </body>
    </html>`;
    
    const finalCSSCode = `
    
    my-input-class {
        font-size: 14px;
        font-family: arial;
        border-radius: 7px;
        border: 1px solid black;
    }
    
    my-button-class {
        font-size: 16px;
        font-family: arial;
        border-radius: 7px;
    }
    
    label {
        font-family: arial;
        font-size: 14px;
    }
    
    body {
        text-align: center;
    }
    
    #container {
        /* display: flex; */
        /* flex-direction: column; */
        width: 100%;
        text-align: center;
    }
    
    `;
    
    const finalJsCode = `document.addEventListener("DOMContentLoaded", () => {\n\n
        ${generatedCode.jsCode}
    
        \n\n\n
    });`;

    let content = [
        {
            "filename": filename.html,
            "content": finalHtmlCode,
        },
        {
            "filename": filename.js,
            "content": finalJsCode,
        },
        {
            "filename": filename.css,
            "content": finalCSSCode,
        },       
    ]

    jcgWriteFile(content);

  }

  module.exports = codeGenerator;