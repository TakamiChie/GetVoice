function GetVoice(domElement) {
  function parseElement(element) {
    let markdownText = '';

    element.childNodes.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        const trimmedText = child.textContent.trim();
        if (trimmedText) {
          markdownText += trimmedText + ' ';
        }
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        if (['script', 'style', 'noscript', 'iframe', 'object'].includes(child.tagName.toLowerCase())) {
          // Skip invisible elements
          return;
        }
        switch (child.tagName.toLowerCase()) {
          case 'h1':
            markdownText += '# ' + child.textContent.trim() + '\n\n';
            break;
          case 'h2':
            markdownText += '## ' + child.textContent.trim() + '\n\n';
            break;
          case 'h3':
            markdownText += '### ' + child.textContent.trim() + '\n\n';
            break;
          case 'p':
            markdownText += child.textContent.trim() + '\n\n';
            break;
          case 'ul':
            markdownText += parseList(child, '*');
            break;
          case 'ol':
            markdownText += parseList(child, '1.');
            break;
          default:
            const trimmedChildText = child.textContent.trim();
            if (trimmedChildText) {
              markdownText += trimmedChildText + ' ';
            }
            break;
        }
      }
    });

    return markdownText.split('\n').filter(line => line.trim() !== '').join('\n').trim();
  }

  function parseList(listElement, marker) {
    let listText = '';
    listElement.childNodes.forEach(item => {
      if (item.nodeType === Node.ELEMENT_NODE && item.tagName.toLowerCase() === 'li') {
        const trimmedItemText = item.textContent.trim();
        if (trimmedItemText) {
          listText += marker + ' ' + trimmedItemText + '\n';
        }
      }
    });
    return listText + '\n';
  }

  return parseElement(domElement);
}

document.getElementById('convert').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'selectElement' }, (response) => {
      if (response && response.element) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(response.element, 'text/html');
        const selectedElement = doc.body.firstChild;
        const markdownText = GetVoice(selectedElement);
        console.log(markdownText);
      } else if (response && response.error) {
        console.error('Error selecting element:', response.error);
      }
    });
  });
});

document.getElementById('convertAll').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'convertAll' }, (response) => {
      if (response && response.element) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(response.element, 'text/html');
        const bodyElement = doc.body;
        const markdownText = GetVoice(bodyElement);
        console.log(markdownText);
      } else if (response && response.error) {
        console.error('Error converting all:', response.error);
      }
    });
  });
});