# FRONTEND TECHINICAL TEST

#### FIRST TEST

##### 1. Nuxt Page and Nuxt Component

Create a page that mimics [the `/sentrack/` page](https://groover.co/band/sendtrack/) by using [Nuxt.js](https://nuxtjs.org/)
The page does not need to be pretty, this test will only juge your [Vue component](https://vuejs.org/v2/guide/components.html) organisation and your code quality. This entire test will be discussed during a future interview
Having 0 CSS ligns is perfectly okay.

###### Technical Specification

- The page is accessible from `/sendtrack/`
- To generate content you can use any method, but in case, you can always use this [API](https://pokeapi.co/)
- The 25 first list elements need to be prerendered with either [`fetch`](https://nuxtjs.org/api/pages-fetch/) or [`asyncData`](https://nuxtjs.org/api/)
- At last 150 elements are accessible
- A search function is mandatory
- Having a visual cart being displayed is not required, only the list the filters and the sorting options need to be displayed

###### Bonus

- It's not too ugly (optionnel but always apreciated)

**The final work needs to be accessible in a [`github`](https://github.com/) repository, having a nice commit history is always a plus**

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
