## [3.2.0](https://github.com/bee-queue/arena/compare/v3.1.0...v3.2.0) (2020-08-05)

### Features

- **add-job:** improve named job support ([#209](https://github.com/bee-queue/arena/issues/209)) ([1c131a9](https://github.com/bee-queue/arena/commit/1c131a9d143bdf8c2ef3c7bc2c1353b6f62346b1))

## [3.1.0](https://github.com/bee-queue/arena/compare/v3.0.2...v3.1.0) (2020-08-05)

### Features

- **add-job:** add jsoneditor code and text modes ([#217](https://github.com/bee-queue/arena/issues/217)) ([63ca0c8](https://github.com/bee-queue/arena/commit/63ca0c8623486a2b665d33de8bda5ff437f8f2ab))
- **job-details:** show raw progress when not numeric ([bd0d697](https://github.com/bee-queue/arena/commit/bd0d6970b6cf046c898569c8f0acbee88dfd642a))

### [3.0.2](https://github.com/bee-queue/arena/compare/v3.0.1...v3.0.2) (2020-08-05)

### Bug Fixes

- use normal require path for defaultConfig ([#196](https://github.com/bee-queue/arena/issues/196)) ([533f702](https://github.com/bee-queue/arena/commit/533f702079dced5986cc69d245e8a337acb6e657))

### [3.0.1](https://github.com/bee-queue/arena/compare/v3.0.0...v3.0.1) (2020-08-05)

### Bug Fixes

- improve error message for no queues ([b8f2afc](https://github.com/bee-queue/arena/commit/b8f2afc3a9a9e5f8802a8dc4147139e52eb6128a))

## [3.0.0](https://github.com/bee-queue/arena/compare/v2.8.2...v3.0.0) (2020-08-05)

### ⚠ BREAKING CHANGES

- all users must now pass in the queue constructor(s)
  for the configuration.

### Features

- remove direct application execution support ([95ecf42](https://github.com/bee-queue/arena/commit/95ecf420f360c270d8db623ecad9d572e3891f4f))
- remove explicit queue dependencies ([ba190a4](https://github.com/bee-queue/arena/commit/ba190a480f1f2139380cee09f91a77aea0f7e926))

## Release History

- 2.8.2

  - [Fix] Move nodemon to dev dependencies and update (#184) - thanks @Jimmysh!
  - [Fix] Encode url for the action 'add job' (#194) - thanks @pluschnikow!
  - [Fix] Fix job retry (#223) - thanks @roychri!

- 2.8.1 Fix bull queue job publishing

- 2.8.0 Add ability to run jobs on demand (#211) - thanks @bvallelunga!

- 2.7.1 Fix add job functionality (#197) - thanks @bogdan!

- 2.7.0 Job logs show up for bull queue jobs (#201) - thanks @ganeshcse2991!

- 2.6.4 Fix circular dependency issue when viewing failed jobs (#183) - thanks @ghmeier!

- 2.6.3 Pull in handlebars security advisory patch (#168) - thanks @pklingem!

- 2.6.2 Fix "add job" vendor/API path when basePath is set (#157) - thanks, @jacobpgn

- 2.6.1 Hot patch: commit /vendor assets to fix new UI.

- 2.6.0 Add the ability to add jobs via Arena (#55/#153) - thanks, @krazyjakee!

- 2.5.4 Upgrade handlerbars-helpers to fix flagged vulnerability (#151) - thanks, @eeVoskos!

- 2.5.3 Fix `navbar` reference (#146) - thanks @anurag-rai!

- 2.5.2 Support custom job IDs in arena (#126) - thanks @gcox!

- 2.5.1 Upgrade nodemon to avoid the vulnerable event-stream (#136)

- 2.5.0 Support redis over TLS. (#122) - thanks @timcosta!

- 2.4.5 Allow the package to be once again installed using Yarn (#99)

- 2.4.4 deyarn

- 2.4.3 Fix progress indicator for Bill 3.x https://github.com/bee-queue/arena/pull/96

- 2.4.2 Fix XSS issue https://github.com/bee-queue/arena/pull/84 (thanks @ohwillie)

- 2.4.1 Fix regression where 'url' parameter wasn't respected ([#85](https://github.com/bee-queue/arena/pull/85) - @ohwillie)

- 2.4.0 Custom Redis configurations and documentation improvements ([#81](https://github.com/bee-queue/arena/pull/81) - @vhf)

- 2.3.1 UI improvement: [add syntax highlighting to JSON](https://github.com/bee-queue/arena/pull/80) - thanks @emhagman!

- 2.3.0 Upgraded Bull to v3.3.7

- 2.2.2 Include name in description per [#74](https://github.com/bee-queue/arena/pull/74).

- 2.2.1 Fixed links in interface

- 2.2.0 Added `uri` coneection parameter.

- 2.1.3 Fixed issue where [progress bar didn't work in Bull](https://github.com/bee-queue/arena/pull/46) in Bull

- 2.1.2 Fixed issue where [paging wasn't working](https://github.com/bee-queue/arena/issues/39) in Bull

- 2.0.0 Added support for [Bee Queue](https://github.com/bee-queue/bee-queue)

- 1.0.0 Initial release
