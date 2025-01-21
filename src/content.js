function selectElement() {
  return new Promise((resolve, reject) => {
    document.body.style.cursor = 'crosshair';

    let previousElement = null;

    function onMouseOver(event) {
      if (previousElement) {
        previousElement.style.outline = '';
      }
      event.target.style.outline = '2px solid blue';
      previousElement = event.target;
    }

    function onClick(event) {
      event.preventDefault();
      event.stopPropagation();
      document.body.style.cursor = 'default';
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('click', onClick, true);
      if (previousElement) {
        previousElement.style.outline = '';
      }
      resolve(event.target);
    }

    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('click', onClick, true);
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'selectElement') {
    selectElement().then(selectedElement => {
      sendResponse({ element: selectedElement.outerHTML });
    }).catch(error => {
      sendResponse({ error: error.message });
    });
    return true; // Indicates that the response will be sent asynchronously
  } else if (message.action === 'convertAll') {
    sendResponse({ element: document.body.outerHTML });
  }
});