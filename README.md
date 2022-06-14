
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

or yarn

```sh
npm yarn @onvo/onvo-pay-js
```

## Usage


### `without package manager`

```html
<script src="https://onvo-pay-widget.vercel.app/sdk.js" async></script>

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

### `React`

```javascript
import React from "react";
import ReactDOM from "react-dom";

const Pay = onvo.pay.driver("react", { React, ReactDOM });

....

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

### `Angular`





