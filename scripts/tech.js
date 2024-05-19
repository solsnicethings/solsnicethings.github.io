async function FetchFileList(path, exceptionHandler) {
	
	const response = await fetch('https://api.github.com/repos/' + github_user + '/' + github_repo + '/contents/' + path, { credentials: "omit" });
	
	if (!response.ok) {
			if (exceptionHandler) exceptionHandler(response);
			else ShowError(response.status);
			return;
	}
	
	const data = await response.json();	
	
	if (data.message && !Array.isArray(data)) {
			if (exceptionHandler) exceptionHandler(data);
			else ShowError(data.message);
			return;
	}
	
	let filelist = [];
	
	for (const file of data) {
		if (file.type == 'file') filelist.push(file.path); 
	}
	
	return filelist;
}

function ShowError(message) {
	let e = document.createElement('errormsg');
	e.innerText = message;
	document.body.insertBefore(e, document.querySelector('body > footer:last-of-type'));
}

function PromiseEvent(target, event) {
  return new Promise((resolve) => {
    const listener = () => {
      target.removeEventListener(event, listener);
      resolve();
    }
    target.addEventListener(event, listener);
  })
}

function RunWhenDomReady(e) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", e);
	} else {
		e();
	}
}

function LinkStylesheet(fileName) {
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = fileName;
  return document.head.appendChild(link);
}