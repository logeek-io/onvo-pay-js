import { findScript, insertScriptElement, parseErrorMessage } from './utils';

interface ONVONamespace {
  onvo : any;
}

function getDefaultPromiseImplementation() {
    if (typeof Promise === "undefined") {
        throw new Error(
            "Promise is undefined. To resolve the issue, use a Promise polyfill."
        );
    }
    return Promise;
}

function getONVOWindowNamespace(namespace: string): ONVONamespace {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (window as any)[namespace];
}

function validateArguments(options: unknown, PromisePonyfill?: unknown) {
    if (typeof options !== "object" || options === null) {
        throw new Error("Expected an options object.");
    }

    if (
        typeof PromisePonyfill !== "undefined" &&
    typeof PromisePonyfill !== "function"
    ) {
        throw new Error("Expected PromisePonyfill to be a function.");
    }
}

export function loadScript(
    PromisePonyfill: PromiseConstructor = getDefaultPromiseImplementation()
): Promise<ONVONamespace | null> {
    validateArguments({}, PromisePonyfill);

    // resolve with null when running in Node
    if (typeof window === "undefined" || typeof global.window === "undefined") return PromisePonyfill.resolve(null);

    const url = "https://onvo-pay-widget.vercel.app/sdk.js";
    const namespace = "onvo";
    const existingWindowNamespace = getONVOWindowNamespace(namespace);

    // resolve with the existing global onvo namespace when a script with the same params already exists
    if (findScript(url) && existingWindowNamespace) {
        return PromisePonyfill.resolve(existingWindowNamespace);
    }

    return new PromisePonyfill((resolve, reject) => {
    // resolve with undefined when running in Node
        if (typeof window === "undefined" || typeof global.window === "undefined") return resolve(null);

        insertScriptElement({
            url,
            attributes : {},
            onSuccess : () => resolve(getONVOWindowNamespace(namespace)),
            onError : () => {
                const defaultError = new Error(
                    `The script "${url}" failed to load.`
                );

                if (!window.fetch) {
                    return reject(defaultError);
                }
                // Fetch the error reason from the response body for validation errors
                return fetch(url).then((response) => {
                    if (response.status === 200) {
                        reject(defaultError);
                    }
                    return response.text();
                }).then((message) => {
                    const parseMessage = parseErrorMessage(message);
                    reject(new Error(parseMessage));
                }).catch((err) => {
                    reject(err);
                });
            },
        });
    });
}
