# COVID19 React

[![React.js](https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-64.png)](https://reactjs.org/)[![D3.js](//upload.wikimedia.org/wikipedia/en/thumb/1/15/Logo_D3.svg/64px-Logo_D3.svg.png)](https://d3js.org/)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![yarn version](https://img.shields.io/badge/yarn-v1.19.1-green)](https://classic.yarnpkg.com/en/package/react) [![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

Website made-up of reactJS which displays covid19 count over India and state wise data. Donut graph is used to dispaly data using D3.js

## Tech
- React JS
- D3 JS

## API's Used
* [State Data](https://api.covid19india.org/data.json) - This gives the State data along with other test details.
* [District Data](https://api.covid19india.org/state_district_wise.json) - This gives District wise data of all States.

#### If API's are depriciated Use
* [State Wise Data](./assets/data.json)
* [District wise State Data](./assets/state-wise-data.json)
* These are updated on 12th of April 2020 - 21:18

## Execute Project

If you don't have yarn install it from npm by running command
```sh
npm install yarn
```

After this run below command to install necessary node_modules 
```sh
yarn install
```

After successful installation of node_modules run below command
```sh
yarn start
```

By default project will open in http://localhost:3000/. Open it any browser to see it.

#### Demos / Pictures

[![screenshot-1](./asstes/image-1.jpg)]()
[![screenshot-2](./asstes/image-2.jpg)]()
[![screenshot-3](./asstes/image-3.jpg)]()