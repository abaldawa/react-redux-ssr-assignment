/**
 * User: abhijit.baldawa
 *
 * This module is used to get HTML template for client and server side react/redux application
 */

/**
 * @method PUBLIC
 *
 * This method returns HTML template string for both client and server side rendering based on passed in 'content'.
 *
 * @param {String} title This is the title for the HTML page
 * @param {Object} state :OPTIONAL: state When present adds state of the store to window.__STATE__ so that it can used late for ssr
 * @param {String} :OPTIONAL: content When present returns HTML with the contents included
 * @param {String} :OPTIONAL: css css to be injected in the script
 * @returns {string}
 */
function template(title, state = {}, content = "", css){
  let
      scripts = '';

  if(content){
    scripts = ` <script>
                   window.__STATE__ = ${JSON.stringify(state)}
                </script>
                <script src="assets/ssrClient.js"></script>
                <style id="jss-server-side">${css}</style>
                `;
  } else {
    scripts = ` <script src="assets/client.js"> </script> `;
  }

  let
      page = `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="utf-8">
                <title> ${title} </title>
              </head>
              <body>
                <div class="content">
                   <div id="app" class="wrap-inner">
                      ${content}
                   </div>
                </div>

                ${scripts}
              </body>
              `;

  return page;
}

module.exports = template;
