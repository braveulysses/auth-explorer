# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## Unreleased [1.1.1] - 2017-07-16
This release includes minor bug fixes and dependency updates.
* Update Data Governance Broker version to 6.0.2.0.
* Fix a warning emitted by the Semantic UI library from the OAuth 2 request component.
* Upgrade React dependency to 15.6.1.

## Compatibility release for Broker 6.0.1.0 [1.1.0] - 2017-02-06
This release updates the Auth Explorer for compatibility with Auth API changes in Data Governance Broker 6.0.1.0.

This release also includes updated dependencies and a `yarn.lock` file for use with the [Yarn](https://yarnpkg.com/) dependency management tool.

## Maintenance release [1.0.3] - 2016-12-01
Minor enhancements and bug fixes:
* Fixed a bug in which the Auth Explorer displayed the wrong Suggested Action after the user approved scopes and performed a PUT.
* Added some unit tests.
* Other small changes.

## Maintenance release [1.0.2] - 2016-12-01
Minor enhancements and bug fixes:
* Documentation links to [developer.unboundid.com](https://developer.unboundid.com/) are provided for all flows and identity authenticators.
* Fixed some bugs with the Telephony Delivered Code authenticator form that caused it to produce malformed and/or incomplete requests.

## Maintenance release [1.0.1] - 2016-12-01
Minor enhancements and bug fixes:
* Display a spinner and dim the request UI when an HTTP request is in progress.
* The UI now displays suggested next actions for the consent/approval flow.
* Got rid of a warning issued to the JavaScript Console by the ACE editor.

## Initial release [1.0.0] - 2016-11-28
This is the initial public release, intended for use with Ping Identity
Data Governance Broker 6.0.0.1.