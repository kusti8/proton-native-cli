proton-native-cli
=================

Manage your Proton Native apps.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/proton-native-cli.svg)](https://npmjs.org/package/proton-native-cli)
[![Downloads/week](https://img.shields.io/npm/dw/proton-native-cli.svg)](https://npmjs.org/package/proton-native-cli)
[![License](https://img.shields.io/npm/l/proton-native-cli.svg)](https://github.com/kusti8/proton-native-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g proton-native-cli
$ proton-native COMMAND
running command...
$ proton-native (-v|--version|version)
proton-native-cli/0.0.1 linux-x64 node-v10.18.0
$ proton-native --help [COMMAND]
USAGE
  $ proton-native COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`proton-native help [COMMAND]`](#proton-native-help-command)
* [`proton-native hot [FILE]`](#proton-native-hot-file)
* [`proton-native init NAME`](#proton-native-init-name)

## `proton-native help [COMMAND]`

display help for proton-native

```
USAGE
  $ proton-native help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `proton-native hot [FILE]`

describe the command here

```
USAGE
  $ proton-native hot [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/hot.ts](https://github.com/kusti8/proton-native-cli/blob/v0.0.1/src/commands/hot.ts)_

## `proton-native init NAME`

Create a new Proton Native app.

```
USAGE
  $ proton-native init NAME

ARGUMENTS
  NAME  The name of the application (and the folder).

OPTIONS
  --verbose
```

_See code: [src/commands/init.ts](https://github.com/kusti8/proton-native-cli/blob/v0.0.1/src/commands/init.ts)_
<!-- commandsstop -->
