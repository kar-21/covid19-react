# COVID19 React

[![React.js](https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-64.png)](https://reactjs.org/)[![D3.js](https://upload.wikimedia.org/wikipedia/en/thumb/1/15/Logo_D3.svg/64px-Logo_D3.svg.png)](https://d3js.org/)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

Website made-up of reactJS which displays covid19 count over India and state wise data. Donut graph is used to dispaly data using D3.js

## Tech
- React JS
- D3 JS

# Deployed site
[covid19-react](https://covid19-react-kk.netlify.app/)
[![covid19-react](websitte-preview.gif)]
## API's Used
* [State Data](https://api.covid19india.org/data.json) - This gives the State data along with other test details.
* [District Data](https://api.covid19india.org/state_district_wise.json) - This gives District wise data of all States.

#### If API's are depriciated Use
* [State Wise Data](./assets/data.json)
* [District wise State Data](./assets/state-wise-data.json)
* These are updated on 13th of September 2020 - 19:18

## Execute Project

Run below command to install necessary node_modules 
```sh
npm install
```

After successful installation of node_modules run below command
```sh
npm run start
```

By default project will open in http://localhost:3000/. Open it any browser to see it.
