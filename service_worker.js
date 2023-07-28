chrome.action.onClicked.addListener((tab) => {
  if(tab.url.includes('https://myaccount.google.com/interstitials/twosvrequired')) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: removeLinks,
    });
  }
});

function removeLinks() {
  const links = document.querySelectorAll('a');
  links.forEach((link) => {
    if (link.innerText === 'Do this later') {
      link.remove();
    }
  });
}
