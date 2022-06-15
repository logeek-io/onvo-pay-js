
> Loading wrapper for the [ONVO JS SDK](https://onvo-api.webflow.io/)

[![build status][build-badge]][build]
[![npm version][version-badge]][package]
[![bundle size][minzip-badge]][bundlephobia]
[![npm downloads][downloads-badge]][npmtrends]
[![apache license][license-badge]][license]

[build-badge]: https://img.shields.io/github/workflow/status/logeek-io/onvo-pay-js/Release?logo=github&style=flat-square
[build]: https://github.com/logeek-io/onvo-pay-js/actions?query=workflow%3Release
[version-badge]: https://img.shields.io/npm/v/@onvo/onvo-pay-js?style=flat-square
[package]: https://www.npmjs.com/package/@onvo/onvo-pay-js
[minzip-badge]: https://img.shields.io/bundlephobia/minzip/@onvo/onvo-pay-js.svg?style=flat-square
[bundlephobia]: https://bundlephobia.com/result?p=@onvo/onvo-pay-js
[downloads-badge]: https://img.shields.io/npm/dm/@onvo/onvo-pay-js.svg?style=flat-square
[npmtrends]: https://www.npmtrends.com/@onvo/onvo-pay-js
[license-badge]: https://img.shields.io/npm/l/@onvo/onvo-pay-js.svg?style=flat-square
[license]: https://github.com/onvo/onvo-pay-js/blob/main/LICENSE

## Installation

To get started, install onvo-pay-js with npm

```sh
npm install @onvo/onvo-pay-js
```

with yarn

```sh
npm yarn @onvo/onvo-pay-js
```

or including the script

```html
<script src="https://onvo-pay-widget.vercel.app/sdk.js" async></script>
```

## Prerequisites
- from you account dashboard get you `Secret` and `Public` Key
- in order to get the `paymentIntentId` you need to create one by doing a server side API request as follows:

```javascript
const {data, status} = await axios.post(
	'https://api.dev.onvopay.com/v1/payment-intents',
  {
		currency: 'USD',
    amount: 1000,
    description: 'my first payment intent',
  },
  {
		headers: {
			Authorization:
        'Bearer you_secret_key',
    },
  },
);

if (status == 201) {
	// Payment intent id id to pass down to the front-end
	console.log(data.id);
}
```

For now we just support `CRC` or `USD` as currencies, and remember to pass the payment intent amount as cents.

-----

read more information about our API [here](https://onvo-api.webflow.io/)


## Usage

### `with package manager`

Import the loadScript function for asynchronously loading the ONVO JS SDK.

### `loadScript(options)`

returns a Promise that resolves with `window.onvo` after the JS SDK is finished loading.

#### Async/Await

```javascript
import { loadScript } from "@onvo/onvo-pay-js";

let onvo;

try {
    onvo = await loadScript();
} catch (error) {
    console.error("failed to load the ONVO JS SDK script", error);
}

if (onvo) {
	onvo.pay({
		onError : (data) => {
			console.log('error', data);
		}, 
		onSuccess : (data) => {
			console.log('success', data);
		},
		publicKey: 'public-key', 
    paymentIntentId : "cl4de13uc457301lor2o0q9w1",
	}).render('#container');
}
```

#### Promises

```javascript
import { loadScript } from "@onvo/onvo-pay-js";

loadScript()
    .then((onvo) => {
			onvo.pay({
		    onError : (data) => {
			    console.log('error', data);
		    },
		    onSuccess : (data) => {
			    console.log('success', data);
		    },
		    publicKey: 'public-key',
		    paymentIntentId : "cl4de13uc457301lor2o0q9w1",
	    }).render('#container');
    })
    .catch((error) => {
        console.error("failed to load the PayPal JS SDK script", error);
    });
```

### `without package manager`

```html
<body>
    <!-- Container for our ONVO component to render into -->
    <div id="container"></div>
</body>

<script>
    // Render the component and pass down props
    onvo.pay({
        onError : (data) => {
            console.log('error', data);
        },
        onSuccess : (data) => {
            console.log('success', data);
        },
        publicKey: 'public-key',
        paymentIntentId : "cl4de13uc457301lor2o0q9w1",
    }).render('#container');
</script>

```

## Using with frameworks / libraries

### `React`

```javascript
import React from "react";
import ReactDOM from "react-dom";

const Pay = onvo.pay.driver("react", { React, ReactDOM });

...

return (
  <Pay 
    onError ={(data) => {
			console.log('error', data);
    }}
    onSuccess={(data) => {
	    console.log('success', data);
    }}
    publicKey="public-key"
    paymentIntentId="cl4de13uc457301lor2o0q9w1"
  />
);
```

### `Angular 1`

```javascript
onvo.pay.driver("angular", window.angular);

angular
	.module("app", ["onvo-pay"])
	.controller("appController", function ($scope) {
		$scope.opts = {
			onError : (data) => {
				console.log('error', data);
				return data;
			},
			onSuccess : (data) => {
				console.log('success', data);
        return data;
			},
			publicKey: 'public-key',
			paymentIntentId : "cl4de13uc457301lor2o0q9w1",
    };
  });
```

```html
<body ng-app="app" ng-controller="appController">
  <onvo-pay props="opts"></onvo-pay>
</body>
```

### `Angular 2`

```javascript
(function () {
  const Pay = onvo.pay.driver("angular2", ng.core);
  const appComponent = ng.core
    .Component({
      selector: "my-app",
      template:
          <div id="app">
            <pay [props]="{
                createOrder: createOrder,
                onApprove: onApprove
            }"></pay>
          </div>
      ,
    })
    .Class({
      constructor: function () {
        this.onError = (function(data) {
					console.log(data);
          return data;
        }).bind(this);
        this.onSuccess = (function(data) {
					console.log(data);
          return data;
        }).bind(this);
				this.publicKey = 'public-key';
				this.paymentIntentId = 'cl4de13uc457301lor2o0q9w1';
      });
    }});
  const appModule = ng.core
    .NgModule({
      imports: [ng.platformBrowser.BrowserModule, Pay],
      declarations: [appComponent],
      bootstrap: [appComponent],
    })
    .Class({
      constructor: function () {},
    });
  document.addEventListener("DOMContentLoaded", function () {
    ng.platformBrowserDynamic
      .platformBrowserDynamic()
      .bootstrapModule(appModule);
  });
})();
```

### `Vue`

```html
<div id="container">
  <app></app>
</div>

<script>
    const Pay = onvo.pay.driver("vue", window.Vue);

    Vue.component("app", {
        template: `
            <onvo-pay 
                :on-error="onError"
                :on-success="onSuccess"
                :public-key="publicKey"
                :payment-intent-id="paymentIntentId"
            />
        `,
        components: {
            "onvo-pay": Pay,
        },

        computed: {
            onError: function () {
							return (data) => {
								console.log(data);
								return data;
              }
            },
            onSuccess: function () {
                return (data) => {
                    console.log(data);
                    return data;
                }
            },
            publicKey: function () {
							return 'public-key';
            },
            paymentIntentId: function () {
                return 'cl4de13uc457301lor2o0q9w1';
            },
        },
    });

    const vm = new Vue({
        el: "#container",
    });
</script>
```











