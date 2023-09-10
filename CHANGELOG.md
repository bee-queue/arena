## [4.0.0](https://github.com/bee-queue/arena/compare/v3.30.4...v4.0.0) (2023-09-02)

### ⚠ BREAKING CHANGES

- **bullmq:** add new prioritized state, previous versions of bullmq wont't see this state

### Features

- **bullmq:** support prioritized state ([#664](https://github.com/bee-queue/arena/issues/664)) ([9a7541c](https://github.com/bee-queue/arena/commit/9a7541cd08fa33e8c4f75f8fc38dae3a63eacaa2))

### [3.30.4](https://github.com/bee-queue/arena/compare/v3.30.3...v3.30.4) (2023-02-18)

### Bug Fixes

- **mounting:** differentiate base and appBase paths when disableListen ([#623](https://github.com/bee-queue/arena/issues/623)) ([387e3ac](https://github.com/bee-queue/arena/commit/387e3ac7fdcf94f72765d80c26d3b074c91cdd03))

### [3.30.3](https://github.com/bee-queue/arena/compare/v3.30.2...v3.30.3) (2023-01-06)

### Bug Fixes

- **bullmq:** consider delayed markers ([#605](https://github.com/bee-queue/arena/issues/605)) fixes [#600](https://github.com/bee-queue/arena/issues/600) ([8b6edae](https://github.com/bee-queue/arena/commit/8b6edae1b0d27833af42f60acf522a5e34b1a97a))

### [3.30.2](https://github.com/bee-queue/arena/compare/v3.30.1...v3.30.2) (2022-12-04)

### Bug Fixes

- **qs:** security patches on body-parser and express dependencies ([#593](https://github.com/bee-queue/arena/issues/593)) ([6c5871f](https://github.com/bee-queue/arena/commit/6c5871ffa149e83f0e51a2123567a9c0856f67d5))

### [3.30.1](https://github.com/bee-queue/arena/compare/v3.30.0...v3.30.1) (2022-11-07)

### Bug Fixes

- **remove-repeatable:** consider old versions of bull ([#580](https://github.com/bee-queue/arena/issues/580)) ([f406750](https://github.com/bee-queue/arena/commit/f406750ba4654918e194574caa08d29048f6ed03))

## [3.30.0](https://github.com/bee-queue/arena/compare/v3.29.5...v3.30.0) (2022-10-18)

### Features

- **bull:** support removing repeatable jobs ([#574](https://github.com/bee-queue/arena/issues/574)) ([29528cf](https://github.com/bee-queue/arena/commit/29528cfeea91dcf8771551c44fd4dc5e29f87718))

### [3.29.5](https://github.com/bee-queue/arena/compare/v3.29.4...v3.29.5) (2022-08-11)

### Bug Fixes

- **deps:** bump minimist from 1.2.5 to 1.2.6 ([#507](https://github.com/bee-queue/arena/issues/507)) ([229cfe3](https://github.com/bee-queue/arena/commit/229cfe3a90e41f11a296fd169e09a5628e948f77))

### [3.29.4](https://github.com/bee-queue/arena/compare/v3.29.3...v3.29.4) (2022-08-11)

### Bug Fixes

- **deps:** bump moment from 2.29.1 to 2.29.4 ([#540](https://github.com/bee-queue/arena/issues/540)) ([81f13a8](https://github.com/bee-queue/arena/commit/81f13a83cf38574746b6f23ae981819383e7a6f6))

### [3.29.3](https://github.com/bee-queue/arena/compare/v3.29.2...v3.29.3) (2021-09-08)

### Bug Fixes

- 🐛 Update how Redis URL is passed to Bull ([81bf488](https://github.com/bee-queue/arena/commit/81bf488d3d668dba986bc03e171e6f3bc0faf761)), closes [OptimalBits/bull#2118](https://github.com/OptimalBits/bull/issues/2118)

### [3.29.2](https://github.com/bee-queue/arena/compare/v3.29.1...v3.29.2) (2021-08-12)

### Bug Fixes

- Revert bootstrap upgrade in 3.24.0 ([PR](https://github.com/bee-queue/arena/pull/432))

### [3.29.1](https://github.com/bee-queue/arena/compare/v3.29.0...v3.29.1) (2021-07-06)

### Bug Fixes

- **job-details:** encodeURI of job ID for URL ([0b60010](https://github.com/bee-queue/arena/commit/0b600102769fe066c2aec7046c970009dbd5ef5f)), closes [#416](https://github.com/bee-queue/arena/issues/416)

## [3.29.0](https://github.com/bee-queue/arena/compare/v3.28.0...v3.29.0) (2021-06-14)

### Features

- **tree-view:** use perma links on nodes ([07b6f3d](https://github.com/bee-queue/arena/commit/07b6f3d89970cc8da3b2988f68213b47eac86c51))

## [3.28.0](https://github.com/bee-queue/arena/compare/v3.27.0...v3.28.0) (2021-06-11)

### Features

- **flow:** add search button to get a flow tree ([59b0423](https://github.com/bee-queue/arena/commit/59b0423d1525f1166ded19dfe9fe937b3a98023e))
- **layout:** add treeview ([d3fa754](https://github.com/bee-queue/arena/commit/d3fa754bf292c1e4f3d2805af4dfd155f1437f2f))
- **tree-view:** add tree view when creating a flow ([eb93a60](https://github.com/bee-queue/arena/commit/eb93a60c96ec4322ea1ca1d9b85389b9839e4712))

## [3.27.0](https://github.com/bee-queue/arena/compare/v3.26.0...v3.27.0) (2021-06-11)

### Features

- **job-details:** add pagination options in getDependencies ([40e177f](https://github.com/bee-queue/arena/commit/40e177f7acdb2991d6ba6e58b2fa82bce641d348))

## [3.26.0](https://github.com/bee-queue/arena/compare/v3.25.0...v3.26.0) (2021-06-10)

### Features

- **job-details:** add children counters ([71bbb9d](https://github.com/bee-queue/arena/commit/71bbb9dc3d5ec3236b5281b87aad757acde40462))

## [3.25.0](https://github.com/bee-queue/arena/compare/v3.24.1...v3.25.0) (2021-06-10)

### Features

- **parent-children:** implement perma-link for bullmq ([bbd2317](https://github.com/bee-queue/arena/commit/bbd2317606ed5fab5626de06f381ee02d6d7ab45))
- initial changes for displaying parentJob and childrenJobs in JobDetails template - WIP ([61d93e2](https://github.com/bee-queue/arena/commit/61d93e2fc31080bb3bc6846c212c75b96b5267d9))

### [3.24.1](https://github.com/bee-queue/arena/compare/v3.24.0...v3.24.1) (2021-06-08)

### Bug Fixes

- **job-details:** show progress for bullmq ([8341174](https://github.com/bee-queue/arena/commit/8341174cba43bf24ca4863df6abe88f2fb37fc98))

## [3.24.0](https://github.com/bee-queue/arena/compare/v3.23.0...v3.24.0) (2021-06-07)

### Features

- **bootstrap:** upgrade to v4.6.0 ([c8d24c5](https://github.com/bee-queue/arena/commit/c8d24c58bce363a0931fe1c67b885c165dbfc21b))

## [3.23.0](https://github.com/bee-queue/arena/compare/v3.22.0...v3.23.0) (2021-06-02)

### Features

- **bullmq:** provide support for flow creation ([da783af](https://github.com/bee-queue/arena/commit/da783afd52853a9c63510c3d1483afe1b15cf6c1))
- **flow-details:** add redis statistics ([e2b20f3](https://github.com/bee-queue/arena/commit/e2b20f374ccda9d51d3f2b23db5e1c29a0994bba))

## [3.22.0](https://github.com/bee-queue/arena/compare/v3.21.0...v3.22.0) (2021-05-25)

### Features

- **bull:** adding pause queue button ([019f7f5](https://github.com/bee-queue/arena/commit/019f7f53740c0c1804bbc8506ee0f8155348bba0))

### Bug Fixes

- **bull:** consider paused state ([3651d52](https://github.com/bee-queue/arena/commit/3651d5252d2d5a6b1cf704f34f75a97fe8c7582a))
- **deps:** upgrading handlebars to 4.7.7 ([5a62529](https://github.com/bee-queue/arena/commit/5a62529507b6c1895facc596a24daea4b9c5f842))

## [3.21.0](https://github.com/bee-queue/arena/compare/v3.20.1...v3.21.0) (2021-05-20)

### Features

- **bullmq:** support waiting-children state ([8832821](https://github.com/bee-queue/arena/commit/8832821225f69b51f753f24aa76d72889515031f))

### [3.20.1](https://github.com/bee-queue/arena/compare/v3.20.0...v3.20.1) (2021-04-15)

### Bug Fixes

- **jsoneditor:** adding map file ([f374f98](https://github.com/bee-queue/arena/commit/f374f98bdc2594dfea147a7309b306522557ac3d))

## [3.20.0](https://github.com/bee-queue/arena/compare/v3.19.0...v3.20.0) (2021-04-13)

### Features

- **promote:** adding Promote Jobs button ([c0e0d59](https://github.com/bee-queue/arena/commit/c0e0d590c02f986d0671551fed28dbdcfb379e86))

### Bug Fixes

- **lintstage:** applying eslint only to js to avoid conflicts with changelog ([4914b10](https://github.com/bee-queue/arena/commit/4914b1042738a6365b09b2fe81364ad81b4c2af3))

## [3.19.0](https://github.com/bee-queue/arena/compare/v3.18.0...v3.19.0) (2021-04-05)

### Features

- **bull:** add button to promote delayed job ([73031dd](https://github.com/bee-queue/arena/commit/73031dd8e9b59821e07c2da32ddaa638bcf722cf))

### Bug Fixes

- merge conflicts ([4484f3e](https://github.com/bee-queue/arena/commit/4484f3e81aac311f36f1b96fe0a6c256ee89380c))
- solve merge conflicts ([1a5661c](https://github.com/bee-queue/arena/commit/1a5661c8b6d2da272b6335681abd451eb970102c))

## [3.18.0](https://github.com/bee-queue/arena/compare/v3.17.1...v3.18.0) (2021-04-05)

### Features

- **customjspath:** customize layout by custom script ([b5e3651](https://github.com/bee-queue/arena/commit/b5e3651be5974aba783cb6d834c4c159baa1953a))

### Bug Fixes

- **bull:** link reference ([04e87f2](https://github.com/bee-queue/arena/commit/04e87f28c0081a18ef62aebe6607c4c212efe389))
- merge conflicts ([1ce7788](https://github.com/bee-queue/arena/commit/1ce778833ba8638afbfb57af4a33b43e6ae25d6c))
- merge conflicts ([fabdae3](https://github.com/bee-queue/arena/commit/fabdae3fff6f8123f0b0c97f96a2e35923cd06c9))

### [3.17.1](https://github.com/bee-queue/arena/compare/v3.17.0...v3.17.1) (2021-04-05)

### Bug Fixes

- fixes misplaced parameters ([4b98628](https://github.com/bee-queue/arena/commit/4b986281786be13d6c7dda89d24776298edbf6b2))

## [3.17.0](https://github.com/bee-queue/arena/compare/v3.16.0...v3.17.0) (2021-03-31)

### Features

- simpler labels ([653bc7c](https://github.com/bee-queue/arena/commit/653bc7c48c57160d042b351388731285049721df))

### Bug Fixes

- wrong "execute at" date ([3d0a4d1](https://github.com/bee-queue/arena/commit/3d0a4d14511fc0a3f9a3101a2b94d812eb8f9bb9))

## [3.16.0](https://github.com/bee-queue/arena/compare/v3.15.0...v3.16.0) (2021-03-31)

### Features

- add optional custom css ([3f68dc1](https://github.com/bee-queue/arena/commit/3f68dc11da5a57f6b298825d3118a8b244c60a90))

## [3.15.0](https://github.com/bee-queue/arena/compare/v3.14.0...v3.15.0) (2021-03-12)

### Features

- **bull:** adding log message in bull example ([eb12399](https://github.com/bee-queue/arena/commit/eb123997662adb832c3bceeff41d3de7332f70aa))

### Bug Fixes

- **queuejobsbystate:** bring logs only in job page ([8ebd5c0](https://github.com/bee-queue/arena/commit/8ebd5c04bfc10bba4d2b4d814cef1663d05e070a))

## [3.14.0](https://github.com/bee-queue/arena/compare/v3.13.0...v3.14.0) (2021-03-10)

### Features

- **jobdetails:** adding executes at detail ([2e88919](https://github.com/bee-queue/arena/commit/2e88919d81c07f074b5ff8f035bdca5fadcc2225))
- **jobdetails:** support executes at for bee queue ([03b4932](https://github.com/bee-queue/arena/commit/03b493293c316ae044c6cbb471f0048f0c1308e7))

## [3.13.0](https://github.com/bee-queue/arena/compare/v3.12.0...v3.13.0) (2021-03-08)

### Features

- **jobdetails:** showing processed on and finished on ([48ca96a](https://github.com/bee-queue/arena/commit/48ca96a655f503c294668f6680714208afd9351b))

### Bug Fixes

- **capitalize:** using passed value to be capitalized ([2d98fee](https://github.com/bee-queue/arena/commit/2d98fee0ebd1eeb7db4a5ab271ae8db8bc2394e8))

## [3.12.0](https://github.com/bee-queue/arena/compare/v3.11.0...v3.12.0) (2021-03-08)

### Features

- better example showing jobs move through states ([7c0bc7c](https://github.com/bee-queue/arena/commit/7c0bc7c8697d20513ebf8314295dd866f61112e7))

## [3.11.0](https://github.com/bee-queue/arena/compare/v3.10.0...v3.11.0) (2021-03-07)

### Features

- **bull:** adding example for failed and completed jobs ([8e1fdbc](https://github.com/bee-queue/arena/commit/8e1fdbc4d493d61b2a6a2e0d585cfb7c82ffc098))

### Bug Fixes

- **bulkaction:** handling retry logic in bulk ([d396dac](https://github.com/bee-queue/arena/commit/d396dac9bd4588b74599ae8b5e87e7997c08f0b9))
- **bulkaction:** use queuestate to differentiate logic ([62f72cf](https://github.com/bee-queue/arena/commit/62f72cf14d5a5ef68e59bbdbf1f2ba2e70763f23))
- **deps:** delete jsoneditor dependency ([17bc341](https://github.com/bee-queue/arena/commit/17bc341deffd10c18ba4a8531d37b74953af90a9))

## [3.10.0](https://github.com/bee-queue/arena/compare/v3.9.0...v3.10.0) (2021-03-02)

### Features

- **bull:** adding bull in example ([da1ad97](https://github.com/bee-queue/arena/commit/da1ad97f6fd5ce765718c10bfec278f830c1f85b))
- **queuejobsbystate:** retry bulk delayed jobs ([d3eb2bf](https://github.com/bee-queue/arena/commit/d3eb2bf3d2dedbe44f683f172cef121e59a45bca))

### Bug Fixes

- **bee-queue:** disable retry jobs button for bee-queue ([57dc1d6](https://github.com/bee-queue/arena/commit/57dc1d61100e1f2d6fa7d9a726287c21cd63c201))

## [3.9.0](https://github.com/bee-queue/arena/compare/v3.8.0...v3.9.0) (2021-02-25)

### Features

- add contributing guidelines and working example ([8616383](https://github.com/bee-queue/arena/commit/86163830e3ed7d94c7b48ef21b9c058671ebd8f3))

## [3.8.0](https://github.com/bee-queue/arena/compare/v3.7.1...v3.8.0) (2021-02-22)

### Features

- **queuejobsbystate:** adding order dropdown ([c5d21a0](https://github.com/bee-queue/arena/commit/c5d21a0d4e15cb2444f904d199440707cf8fac6d))

### Bug Fixes

- **queuejobsbystate:** apply descending ordering for jobs when using bull queue ([1e1f891](https://github.com/bee-queue/arena/commit/1e1f8910bc3499419f4370dd45998df7b9317b8a))

### [3.7.1](https://github.com/bee-queue/arena/compare/v3.7.0...v3.7.1) (2021-02-18)

### Bug Fixes

- **dashboard:** change shouldHide condition ([5722b55](https://github.com/bee-queue/arena/commit/5722b551be4b7142806d39cc4c4297eb19cd3f13))
- **dashboard:** refresh page when adding a new job ([0fa5d02](https://github.com/bee-queue/arena/commit/0fa5d02ec03a53909de5519b0a2aa8f5f38065de))

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
