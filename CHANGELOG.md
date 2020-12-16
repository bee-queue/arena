## [3.7.0](https://github.com/bee-queue/arena/compare/v3.6.1...v3.7.0) (2020-12-16)

### Features

- **deps:** remove dependency on `handlebars-helpers` ([#302](https://github.com/bee-queue/arena/issues/302)) ([bbacae8](https://github.com/bee-queue/arena/commit/bbacae8d4af5e8f157e992d926b43ccb947e4015))

### [3.6.1](https://github.com/bee-queue/arena/compare/v3.6.0...v3.6.1) (2020-11-26)

### Bug Fixes

- support redis configuration with bullmq ([#294](https://github.com/bee-queue/arena/issues/294)) ([ab4b806](https://github.com/bee-queue/arena/commit/ab4b806308abec5d1824ee9b44f71bafcf8c6e3a))

## [3.6.0](https://github.com/bee-queue/arena/compare/v3.5.0...v3.6.0) (2020-11-25)

### Features

- support bullmq in docker image ([c10a294](https://github.com/bee-queue/arena/commit/c10a29448de701fece6efeac3d82d577d1683701)), closes [bee-queue/docker-arena#50](https://github.com/bee-queue/docker-arena/issues/50)

## [3.5.0](https://github.com/bee-queue/arena/compare/v3.4.0...v3.5.0) (2020-11-21)

### Features

- **job-details:** support arenaName display field ([332fb3a](https://github.com/bee-queue/arena/commit/332fb3af0d6a3af802b5e2f52ceaaa2f6fa7613f))

## [3.4.0](https://github.com/bee-queue/arena/compare/v3.3.3...v3.4.0) (2020-11-01)

### Features

- **bullmq:** initial support for bullmq ([#251](https://github.com/bee-queue/arena/issues/251)) ([1159dde](https://github.com/bee-queue/arena/commit/1159dde1223259c21d260ba4491026f6020e367f))

### [3.3.3](https://github.com/bee-queue/arena/compare/v3.3.2...v3.3.3) (2020-10-29)

### Bug Fixes

- **job-details:** actually correctly wait for promises ([#271](https://github.com/bee-queue/arena/issues/271)) ([6e205a6](https://github.com/bee-queue/arena/commit/6e205a6a3efd4e56347fb6351b61f69755e598d9))

### [3.3.2](https://github.com/bee-queue/arena/compare/v3.3.1...v3.3.2) (2020-10-29)

### Bug Fixes

- **job-details:** correctly wait for promises ([#254](https://github.com/bee-queue/arena/issues/254)) ([934e92a](https://github.com/bee-queue/arena/commit/934e92ab840fdd63e1d88b1584447f493bd10e94))

### [3.3.1](https://github.com/bee-queue/arena/compare/v3.3.0...v3.3.1) (2020-10-28)

### Bug Fixes

- **deps:** use correct bootstrap css ([#266](https://github.com/bee-queue/arena/issues/266)) ([a5a5e23](https://github.com/bee-queue/arena/commit/a5a5e23b7e8d775b245f3b226790600d07d73650))

## [3.3.0](https://github.com/bee-queue/arena/compare/v3.2.4...v3.3.0) (2020-10-28)

### Features

- **job-details:** show stacktraces when job is delayed or done ([#238](https://github.com/bee-queue/arena/issues/238)) ([6b3dd6f](https://github.com/bee-queue/arena/commit/6b3dd6f3117cdd8296c4eec9c2b39da90acea77e))

### [3.2.4](https://github.com/bee-queue/arena/compare/v3.2.3...v3.2.4) (2020-10-28)

### Bug Fixes

- **security:** upgrade jquery and bootstrap ([#253](https://github.com/bee-queue/arena/issues/253)) ([14b317b](https://github.com/bee-queue/arena/commit/14b317b956f099fc6c1d2fdc3719abbdcfc87925))
- revert jQuery upgrade ([#252](https://github.com/bee-queue/arena/issues/252)) ([2a268c3](https://github.com/bee-queue/arena/commit/2a268c3d8fc6a799126669a8fdd77815b0dc72e8))

### [3.2.3](https://github.com/bee-queue/arena/compare/v3.2.2...v3.2.3) (2020-10-17)

### Bug Fixes

- **security:** upgrade jQuery to v3.5.1 ([#249](https://github.com/bee-queue/arena/issues/249)) ([c124a47](https://github.com/bee-queue/arena/commit/c124a472cfcceeb2e53502219b51d5bb0a69c2e4))

### [3.2.2](https://github.com/bee-queue/arena/compare/v3.2.1...v3.2.2) (2020-08-06)

### Bug Fixes

- **retry-job:** include job name ([#235](https://github.com/bee-queue/arena/issues/235)) ([c145fe5](https://github.com/bee-queue/arena/commit/c145fe5c91eaec90a3694fc2fa1d105c470b11e4))

### [3.2.2](https://github.com/bee-queue/arena/compare/v3.2.1...v3.2.2) (2020-08-06)

### Bug Fixes

- **retry-job:** include job name ([#235](https://github.com/bee-queue/arena/issues/235)) ([c145fe5](https://github.com/bee-queue/arena/commit/c145fe5c91eaec90a3694fc2fa1d105c470b11e4))

### [3.2.1](https://github.com/bee-queue/arena/compare/v3.2.0...v3.2.1) (2020-08-05)

### Bug Fixes

- **queue-view:** improve handling of falsy job.id values ([9415643](https://github.com/bee-queue/arena/commit/94156434685bc02e0119d1233220246d153180d9)), closes [#181](https://github.com/bee-queue/arena/issues/181)

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
