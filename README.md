<h1 align="center">
    <img alt="proffy Logo" src="./web/src/assets/images/logo.svg" width="35%" />
</h1>

Proffy is an application where you can find teachers from many different areas and see their price/hour to start a "connection" (conversation). The backend (server) and the frontend (web, mobile) were made using Typescript; you can see all the technologies and dependecies of the project in the package.json of each section. This project was done during Next Level Week # 2 omnistack track, promoted by [Rocketseat](https://github.com/rocketseat), taught by [@diego3g](https://github.com/diego3g).

<p align="center">
  <img alt="Github language counter" src="https://img.shields.io/github/languages/count/fabiopapaiss/proffy?color=%2304D361">
  <img alt="Repo size" src="https://img.shields.io/github/repo-size/fabiopapaiss/proffy">
<a aria-label="Completo">
    <img src="https://img.shields.io/badge/Next Level Week-done-green?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAALVBMVEVHcExxWsF0XMJzXMJxWcFsUsD///9jRrzY0u6Xh9Gsn9n39fyMecy0qd2bjNJWBT0WAAAABHRSTlMA2Do606wF2QAAAGlJREFUGJVdj1cWwCAIBLEsRU3uf9xobDH8+GZwUYi8i6ucJwrxKE+7D0G9Q4vlYqtmCSjndr4CgCgzlyFgfKfKCVO0LrPKjmiqMxGXkJwNnXskqWG+1oSM+BSwD8f29YLNjvx/OQrn+g99oQSoNmt3PgAAAABJRU5ErkJggg=="></img>
  </a>
</p>

## Demo

<h3 align="center">
    <b>Web</b> <br/>
    <img alt="Web Demo" src="./proffy-demo-web.gif" width="80%" />
</h3>

<h3 align="center">
    <b>Mobile</b> <br/>
    <img alt="Web Demo" src="./proffy-demo-mobile.gif" width="30%" /> <br/>
<img align="center" title="Runs with expo" alt="Runs with expo" src="https://img.shields.io/badge/Runs%20with%20Expo-000.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000">
</h3>

## Install

OBS.: The project already comes with some sample data in the **database.sqlite** and in the **uploads** folder,
feell free to delete this content.

1. **Server** dependencies
    1. `cd server`
    2. `yarn install`
    3. On **.env file**, put your server domain (or your private ip, for local development). 
    4. `yarn knex:migrate`
2. **Web** dependencies
    1. `cd ../web`
    2. `yarn install`
3. **Mobile** dependencies
    1. `cd ../mobile`
    2. `yarn install` 

## Local Development Usage

**Server, Web and Mobile:**
    `yarn start`   

## Show your support

Give a ⭐️ if you liked this project!

***
Made with ❤️ by Fábio Papais
