<div align="center">
  <a href="https://particle.network/">
    <img src="https://i.imgur.com/xmdzXU4.png" style="display: inline-block; vertical-align: middle;" />
  </a>
  <a href="https://another-link.com/">
    <img src="https://docs.iotex.io/~gitbook/image?url=https%3A%2F%2F448392349-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MUPHwAAaa4_zIrX70rA%252Flogo%252FlQw0U6ZRVi0hMAZ5ZsGD%252FIOTEX-logo-green-horizontal-400.png%3Falt%3Dmedia%26token%3D8cfefa4d-a027-4bce-b3f7-e04a424f289a&width=128&dpr=3&quality=100&sign=5c03bb73&sv=1" style="display: inline-block; vertical-align: middle;" />
  </a>
  <h3>
    @particle-network/auth-core @particle-network/aa Demo Application 
  </h3>
</div>


# Particle Auth, Account Abstraction SDK, Next.js, ethers V6, with IoTex

## Table of contents

- [Particle Auth, Account Abstraction SDK, Next.js, ethers V6, with IoTex](#particle-auth-account-abstraction-sdk-nextjs-ethers-v6-with-iotex)
  - [What is IoTex](#what-is-iotex)
  - [🔑 Particle Auth Core](#-particle-auth-core)
  - [🪪 Account Abstraction SDK](#-account-abstraction-sdk)
  - [🛠️ Quickstart](#-quickstart)
    - [Clone this repository](#clone-this-repository)
    - [Move into the app directory (Next JS)](#move-into-the-app-directory-next-js)
    - [Install dependencies](#install-dependencies)
    - [Set environment variables](#set-environment-variables)
    - [Start the project](#start-the-project)
  - [Development Next JS](#development-next-js)
  - [Development React Native](#development-react-native)
    - [Config social logins](#config-social-logins)
    - [AA options](#aa-options)
  - [Create a React project from scratch](#create-a-react-project-from-scratch)
    - [Create a React project](#create-a-react-project)
  - [Install Tailwind CSS](#install-tailwind-css)
  - [Fix Node JS polyfills issues](#fix-node-js-polyfills-issues)

⚡️ Basic demo application using `@particle-network/auth-core` and `@particle-network/aa` to initiate social login and send transactions via an account abstraction smart account on IoTex.

This is a lower-level library that powers `@particle-network/auth-core-modal`. The developer implementing this library must build most additional functionality beyond the aforementioned (login and transaction execution).

This app allows you to log in using social logins and interact with the Ethereum Sepolia and Base Sepolia testnets by displaying account information and sending a transfer transaction to an address you can input in the UI. The user can select to send a gasless transaction or pay gas with the native token.

This demo is built in both Next JS and Native React.

> The Next application is within the `iotex-particle-aa-nextjs` directory.

> The React application is within the `iotex-particle-aa-cra` directory.

> 🛠️ Try the Next JS demo: [Particle Auth Next.js AA demo](https://iotex-particle-auth-aa-demo.vercel.app/)

Built using:

- **Particle Auth Core**
- **Particle AA SDK**
- **ethers.js V6.x.x**
- **TypeScript**
- **Tailwind CSS**



## What is IoTex

[IoTeX](https://iotex.io/) is a blockchain-based platform that, through its decentralized bridge, provides full compatibility with Ethereum and other major EVM chains. With W3bstream, IoTeX enables dApps to perform verifiable processing using zero-knowledge proofs, effectively connecting off-chain data sources with blockchain applications.

## 🔑 Particle Auth Core

Particle Auth Core, a component of Particle Network's Wallet-as-a-Service, enables seamless onboarding to an application-embedded MPC-TSS/AA wallet facilitated by social login, such as Google, GitHub, email, phone number, etc. - as an alternative to Particle Auth, the Auth Core SDK comes with more control over the modal itself, application-embedded popups rather than redirects, and so on.

👉 Learn more about [Particle Auth](https://developers.particle.network/docs/building-with-particle-auth).

## 🪪 Account Abstraction SDK

Particle Network natively supports and facilitates the end-to-end utilization of ERC-4337 account abstraction. This is primarily done through the account abstraction SDK, which can construct, sponsor, and send UserOperations, deploy smart accounts, retrieve fee quotes, and perform other vital functions.

> Every gasless transaction is automatically sponsored on testnet. On mainnet, you'll need to deposit USDT into Paymaster.

👉 Learn more about the [Particle AA SDK](https://developers.particle.network/docs/aa-web-quickstart).

***

👉 Learn more about [Particle Network](https://particle.network).

## 🛠️ Quickstart

### Clone this repository
```
git clone https://github.com/soos3d/iotex-particle-auth-aa-demo.git
```

### Move into the app directory (Next JS)

```sh
cd iotex-particle-aa-nextjs
```

### Install dependencies

```sh
yarn install
```

Or

```sh
npm install
```

### Set environment variables
This project requires several keys from Particle Network to be defined in `.env`. The following should be defined:
- `NEXT_PUBLIC_PROJECT_ID`, the ID of the corresponding application in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
- `NEXT_PUBLIC_CLIENT_KEY`, the ID of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
-  `NEXT_PUBLIC_APP_ID`, the client key of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).

Use the following if you are setting up the React Native application

- `REACT_APP_PROJECT_ID`, the ID of the corresponding application in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
- `REACT_APP_CLIENT_KEY`, the ID of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
-  `REACT_APP_APP_ID`, the client key of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).

### Start the project
```sh
npm run dev
```

Or

```sh
yarn dev
```

## Development Next JS

Particle Auth config is in `src/app/layout.tsx`. 

## Development React Native

Particle Auth config is in `src/app/index.tsx`. 

### Config social logins

List of available social logins:

```sh
{
  email: 'email',
  phone: 'phone',
  facebook: 'facebook',
  google: 'google',
  apple: 'apple',
  twitter: 'twitter',
  discord: 'discord',
  github: 'github',
  twitch: 'twitch',
  microsoft: 'microsoft',
  linkedin: 'linkedin',
  jwt: 'jwt'
}
```

### AA options

You can configure the smart account using the `aaOptions` object in `src/app/page.tsx`.

- **BICONOMY**, a [Biconomy smart account](https://www.biconomy.io/smart-accounts).
  - `version`, either `1.0.0` or `2.0.0`; both versions of Biconomy's smart account implementation are supported.
  - `chainIds`, an array of chain IDs in which the smart account is expected to be used.
- **CYBERCONNECT**, a [CyberConnect smart account](https://wallet.cyber.co/).
  - `version`, currently only `1.0.0` is supported for `CYBERCONNECT`.
  - `chainIds`, an array of chain IDs in which the smart account is expected to be used.
- **SIMPLE**, a [SimpleAccount implementation](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/samples/SimpleAccount.sol).
  - `version`, currently only `1.0.0` is supported for `SIMPLE`.
  - `chainIds`, an array of chain IDs in which the smart account is expected to be used.

```ts
  // Set up and configure the smart account
  const smartAccount = new SmartAccount(provider, {
 projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
 clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY || "",
 appId: process.env.NEXT_PUBLIC_APP_ID || "",
 aaOptions: {
 accountContracts: {
 SIMPLE: [
 {
 version: "1.0.0", // SIMPLE only allows 1.0.0
 chainIds: [EthereumSepolia.id, BaseSepolia.id],
 },
 ],
 },
 },
 });

  // Use this syntax to upadate the smartAccount if you define more that one smart account provider in accountContracts
  //smartAccount.setSmartAccountContract({ name: "SIMPLE", version: "1.0.0" });
 ```

## Create a React project from scratch

You can follow these instructions if you want to configure the React project from zero.

### Create a React project

```sh
npx create-react-app particle-network-project
```

```sh
cd particle-network-project
```

## Install Tailwind CSS

This step is optional; follow it only if you want to use Tailwind CSS for the styling.

Follow the instructions in the [Tailwind CSS docs](https://tailwindcss.com/docs/guides/create-react-app).

## Fix Node JS polyfills issues

You will run into issues when building when using `create-react-app` versions 5 and above. This is because the latest versions of `create-react-app` do not include NodeJS polyfills.

Use `react-app-rewired` and install the missing modules to fix this.

If you are using Yarn

```sh
yarn add --dev react-app-rewired crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer process vm-browserify browserify-zlib
```

If you are using NPM

```sh
npm install --save-dev react-app-rewired crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer process vm-browserify browserify-zlib
```

Then Create a `config-overrides.js` in the root of your project directory and add the following:

```js
const webpack = require('webpack');

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "url": require.resolve("url"),
        "vm": require.resolve("vm-browserify")
 })
    config.resolve.fallback = fallback;
    config.ignoreWarnings = [/Failed to parse source map/];
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
 process: 'process/browser',
 Buffer: ['buffer', 'Buffer']
 })
 ])
    return config;
}
```

In `package.json` replace the starting scripts with the following:

```json
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
},
```

Opional, add this to `config-overrides.js` if you want to hide the warnings created by the console:

```js
config.ignoreWarnings = [/Failed to parse source map/];
```
