chrome.tabs.onActivated.addListener((activeInfo) => {
	console.log("activeInfo.tabId = " + activeInfo.tabId);
	chrome.tabs.get(activeInfo.tabId, (tab) => {
		// Check if tab exists AND the URL matches the conditions
		if (tab && (tab.url === "about:blank" || tab.url.startsWith("data:text/html") || tab.url.startsWith("about:blank"))) { 
			console.log("Tab is 'about:blank' or starts with 'data:text/html', tabId is " + activeInfo.tabId);
			setTimeout(() => {
				chrome.tabs.get(activeInfo.tabId, (updatedTab) => {
					// Check updatedTab in case the tab changed during the timeout
					if (updatedTab && (updatedTab.url === "about:blank" || updatedTab.url.startsWith("data:text/html") || updatedTab.url.startsWith("about:blank"))) {
					console.log("tabId " + activeInfo.tabId + " still matches after 5 seconds, killing");
					chrome.tabs.remove(activeInfo.tabId);
					} else {
					console.log("tabId " + activeInfo.tabId + " no longer matches, nothing to do");
					}
				});
			}, 5000);
		}
	});
  });
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	// IMPORTANT: Only proceed if the 'url' property has changed
	if (changeInfo.url) { 
	  if (tab && (tab.url === "about:blank" || tab.url.startsWith("data:text/html") || tab.url.startsWith("about:blank"))) {
		console.log("A tab is 'about:blank' or starts with 'data:text/html', tabId is " + tabId);
		setTimeout(() => {
		  chrome.tabs.get(tabId, (updatedTab) => {
			// Check updatedTab in case the tab changed during the timeout
			if (updatedTab && (updatedTab.url === "about:blank" || updatedTab.url.startsWith("data:text/html") || updatedTab.url.startsWith("about:blank"))) {
			  console.log("tabId " + tabId + " still matches after 5 seconds, killing");
			  chrome.tabs.remove(tabId);
			} else {
			  console.log("tabId " + tabId + " no longer matches, nothing to do");
			}
		  });
		}, 5000);
	  }    
	}
  });