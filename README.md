# Micro Frontends

This project uses lerna to manage multiple packages
Please install lerna first 

`npm install --global lerna`


To install all the dependencies

`lerna bootstrap`

Angularjs project also requires bower components

`cd packages/angularjs`
`bower install`

To run all the packages

`lerna run start --parallel`