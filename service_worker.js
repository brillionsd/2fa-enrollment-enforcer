chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const urlObj = new URL(tab.url);
    if (urlObj.pathname.includes('/interstitials/twosvrequired')) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: removeLinks
      }).catch(error => console.error(error));
    }
  }
});

function removeLinks() {
  const links = document.querySelectorAll('a');
  links.forEach((link) => {
    if (link.textContent === 'Do this later') {
      link.remove();
    }
  });
}
