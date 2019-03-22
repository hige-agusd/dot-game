// Parses a string and prepares it as a reusable template
// @param {string} template - The string to be templatized
// @return {function}
export const template = (template) => {
     	// Replaces the placeholders of the templates with the data
      // @param {Object} data - The data to be inserted in the template
      // @return {string}
      return (data) => {
          	 return Object.keys(data).reduce((tmpl, key) =>{
              	 return tmpl.replace(new RegExp("{"+key+"}","g"), data[key]);
            }, template);
        }
    };

// To avoid calling many times the same function over a short period of time
// @param {function} fb - The function to be debounced
// @param {number} delay - The amount of milliseconds to wait between calls to fn
// @return {function}
export const debounced = (fn, delay, ...args) => {
        let timerId;
        // The debounced fn
        // @param {any}
        return (...args) => {
          if (timerId) {
            clearTimeout(timerId);
          }
          timerId = setTimeout(() => {
            fn(...args);
            timerId = null;
          }, delay);
        }
      };


// Observer generator - Listens when a NodeList is appended to the element being observed
// @param {HTMLElement} elem - The element to be observed
// @param {function} f - Function to handle the NodeList of appended elements
export const  onAppend = (elem, f) => {
  let observer = new MutationObserver((mutations)=> {
    mutations.forEach((m) => {
      if(m.addedNodes.length) {
        f(m.addedNodes)
      }
    })
  })
    observer.observe(elem, {childList: true})
}