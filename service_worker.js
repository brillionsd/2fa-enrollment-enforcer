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

  const paragraphs = document.querySelectorAll('p');
  paragraphs.forEach((p) => {
    if (p.textContent === 'Your domain will soon enforce 2-Step Verification to ensure better account security.') {
      p.textContent = 'Your organization requires you to use 2-Step Verification to ensure better account security';
    } else if (p.textContent === 'To avoid being locked out of your account please enroll into 2-Step Verification now.') {
      p.innerHTML = '<b>You must enroll into 2-Step Verification now or you will get locked out of your account.</b>';
    } else if (p.textContent.startsWith('This policy will be enforced from')) {
      p.remove();
    }
  });
}


