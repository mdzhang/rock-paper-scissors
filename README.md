# Rock, Paper, Scissors (RPS)

A Node.JS implementation of Rock, Paper, Scissors that uses a command line interface.

## Installation

Guide intended for Mac OS X.

* Install [Homebrew](http://brew.sh/) on your machine

    `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

* Install [Node.js](http://nodejs.org/)

    * Install [nvm](https://github.com/creationix/nvm), a utility for managing Node versions

        `brew install nvm`

        * Make sure to source nvm in your `.profile`

            `source $(brew --prefix nvm)/nvm.sh`

        * Then restart your terminal windows

    * Install Node through nvm

        ```
        nvm install <version>
        nvm alias default <version>
        ```

        * Replace the `<version>` with the current known working version. The latest version numbers are in a box below.

* Install [git](https://git-scm.com/) on your machine

    `brew install git`

* Clone the repository.

    ```
    git clone git@github.com:mdzhang/rock-paper-scissors.git
    cd rock-paper-scissors
    ```

* Install dependencies

    ```
    npm update npm -g
    npm install -g mocha
    npm install
    ```

### Versions

This repo is known to work with:

* node: `5.8.0`
* npm: `3.8.8`

## Testing

`npm test`

## Usage

`node index.js [strategy]`

Available strategies

* `random`
* `beat_favorite`
* `beat_last_move`