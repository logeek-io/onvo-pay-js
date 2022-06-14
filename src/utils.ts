type StringMap = Record<string, string>;

export function findScript(url: string): HTMLScriptElement | null {
  const currentScript = document.querySelector<HTMLScriptElement>(
    `script[src="${url}"]`
  );
  if (currentScript === null) return null;

  const nextScript = createScriptElement(url);

  // ignore the data-uid-auto attribute that gets auto-assigned to every script tag
  const currentScriptClone = currentScript.cloneNode() as HTMLScriptElement;
  delete currentScriptClone.dataset.uidAuto;

  // check if the new script has the same number of data attributes
  if (
    Object.keys(currentScriptClone.dataset).length !==
    Object.keys(nextScript.dataset).length
  ) {
    return null;
  }

  let isExactMatch = true;

  // check if the data attribute values are the same
  Object.keys(currentScriptClone.dataset).forEach((key) => {
    if (currentScriptClone.dataset[key] !== nextScript.dataset[key]) {
      isExactMatch = false;
    }
  });

  return isExactMatch ? currentScript : null;
}

function createScriptElement(
  url: string,
  attributes: StringMap = {}
): HTMLScriptElement {
  const newScript: HTMLScriptElement = document.createElement("script");
  newScript.src = url;

  Object.keys(attributes).forEach((key) => {
    newScript.setAttribute(key, attributes[key]);

    if (key === "data-csp-nonce") {
      newScript.setAttribute("nonce", attributes["data-csp-nonce"]);
    }
  });

  return newScript;
}

export interface ScriptElement {
  url: string;
  attributes?: StringMap;
  onSuccess: () => void;
  onError: OnErrorEventHandler;
}

export function insertScriptElement({ url, attributes, onSuccess, onError }: ScriptElement): void {
  const newScript = createScriptElement(url, attributes);
  newScript.onerror = onError;
  newScript.onload = onSuccess;

  document.head.insertBefore(newScript, document.head.firstElementChild);
}

export function parseErrorMessage(message: string): string {
  const originalErrorText = message.split("/* Original Error:")[1];

  return originalErrorText
    ? originalErrorText.replace(/\n/g, "").replace("*/", "").trim()
    : message;
}
