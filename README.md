# telldus-purple-internal

Internal dev repo for Telldus

**Notes:**

- keep the README.md complete and up to date! Goal is that it contains everything you need to get started.
- Feel free to adapt it as you see fit, you don't need permission.

## Install

All commands are assumed to be ran from project root.

### General

- install [nodejs >= 6](https://nodejs.org/en/)
- install local deps: `npm i`
- install global deps: `npm install -g react-native-cli`


### iOS

- install cacao pods cli: `brew install Caskroom/cask/cocoapods-app`
- install cacao pod deps: `cd ios && pod install`
- install Xcode via [Mac App Store](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)

### Android

## Development

### Local config

You'll need to add `local.config.js` in the root of your project. It's not to be checked in (ignored by git).

Create a file in the root of the project called 'config.local.js' with the contents of the script and fill with the valid keys.

**Example script:**

```
module.exports = {
	key1: value1,
	key2: value2,
	...
};
```

**Valid keys:**

 - `version`: string - App version
 - `apiServer`: string - Telldus API server url e.g. https://api.telldus.com
 - `publicKey`: string - Telldus API public key
 - `privateKey`: string - Telldus API public key
 - `googleAnalyticsId`: string - Google Analytics Id
 - `testUsername`: string - Used as a default username at login
 - `testPassword`: string - Used as a default passwod at login


## Run

- environment vars?

### iOS

- `react-native run-ios`

### Android


## Split dependencies

`dependencies` are dependencies require on production like servers, `devDependencies` are deps needed during development and the build process. All the client side libs should therefore reside in `devDependencies`.

## Builds

## Repo structure

## Testing

## Naming convention branches, commits and pull requests

## Logging