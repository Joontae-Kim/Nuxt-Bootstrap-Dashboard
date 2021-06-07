const { randomDate } = require('./dates')

/**
 * Event Data Property
 * title
 * publishedAt
 * modifiedAt
 * openAt
 * closedAt
 * eventType: [`Bargains`, `Package`, `Theme & Template`, `Newest`, `Hottest`, `Recommended`]
 * {
    title: ,
    publishedAt: ,
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Bargains`, `Package`, `Theme & Template`, `Newest`, `Hottest`, `Recommended`]
  }
 */

export const eventNameSet = [
  {
    title: '2020\'s Best 100+ Bootstrap Themes',
    publishedAt: randomDate(new Date(2020, 11, 15), new Date(2020, 11, 30)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: ['Theme & Template', 'Recommended', 'Hottest']
  },
  {
    title: '2020\'s Best 100+ Bootstrap Premium Themes',
    publishedAt: randomDate(new Date(2020, 12, 1), new Date(2020, 12, 20)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Theme & Template`, `Hottest`, `Recommended`]
  },
  {
    title: 'Ranking 50 Bootstrap Corporate and Landing Theme & Template',
    publishedAt: randomDate(new Date(2020, 12, 1), new Date(2020, 12, 20)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Theme & Template`, `Hottest`, `Recommended`]
  },
  {
    title: '150+ Free Bootstrap Theme',
    publishedAt: randomDate(new Date(2021, 2, 5), new Date(2021, 2, 15)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Theme & Template`, `Recommended`]
  },
  {
    title: 'Popular Free Vue.js Bootstrap Template',
    publishedAt: randomDate(new Date(2021, 1, 5), new Date(2021, 1, 15)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Theme & Template`, `Recommended`]
  },
  {
    title: 'Popular Free React.js Bootstrap Template',
    publishedAt: randomDate(new Date(2021, 1, 5), new Date(2021, 1, 15)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Package`, `Theme & Template`, `Hottest`]
  },
  {
    title: 'Popular Free Angular.js Bootstrap Template Best 10',
    publishedAt: randomDate(new Date(2021, 1, 5), new Date(2021, 1, 15)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Package`, `Theme & Template`, `Hottest`]
  },
  {
    title: 'Material Design Bootstrap Business and Landing Theme & Template',
    publishedAt: randomDate(new Date(2021, 1, 25), new Date(2021, 2, 25)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Bargains`, `Package`, `Theme & Template`, `Recommended`]
  },
  {
    title: 'Bootstrap CMS Theme and Template 100 with Bargains',
    publishedAt: randomDate(new Date(2021, 2, 25), new Date(2021, 3, 25)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Bargains`, `Package`, `Theme & Template`, `Recommended`]
  },
  {
    title: '80+ Bootstrap Admin Dashboard and Landing Page with Bargains',
    publishedAt: randomDate(new Date(2021, 2, 25), new Date(2021, 3, 25)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Bargains`, `Theme & Template`, `Recommended`]
  },
  {
    title: '2020\' Bestselleing Ranking 100 Bootstrap Template',
    publishedAt: randomDate(new Date(2021, 1, 10), new Date(2021, 1, 18)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Bargains`, `Theme & Template`, `Hottest`, `Recommended`]
  },
  {
    title: '2021\' 30+ Newest Responsive Bootstrap Material Design Themes',
    publishedAt: randomDate(new Date(2021, 2, 25), new Date(2021, 2, 29)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Theme & Template`, `Newest`]
  },
  {
    title: '2021\'s ~ 2Q The Newest Bootstrap E-Commerce Template',
    publishedAt: randomDate(new Date(2021, 5, 18), new Date(2021, 5, 25)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Theme & Template`, `Newest`]
  },
  {
    title: '2021\'s Febrary Newest Vue.js Bootstrap Template',
    publishedAt: randomDate(new Date(2020, 12, 15), new Date(2020, 12, 20)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Theme & Template`, `Newest`]
  },
  {
    title: '2021\'s March Recommened React.js Bootstrap Template',
    publishedAt: randomDate(new Date(2020, 12, 15), new Date()),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Theme & Template`, `Recommended`]
  },
  {
    title: '150+ Popular Admin Dashboard & WebApp Responsive Template',
    publishedAt: randomDate(new Date(), new Date()),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Package`, `Theme & Template`, `Hottest`]
  },
  {
    title: '2020\'s Recommened React.js Bootstrap Responsive Design Template',
    publishedAt: randomDate(new Date(2020, 12, 20), new Date(2021, 1, 20)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Package`, `Theme & Template`, `Recommended`]
  },
  {
    title: '2021\'s 150+ Ranking WebApp Responsive Template',
    publishedAt: randomDate(new Date(2021, 3, 2), new Date(2021, 3, 9)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Package`, `Theme & Template`, `Hottest`, `Recommended`]
  },
  {
    title: 'Newest Multipurpose Template + UI Kit in April 2021',
    publishedAt: randomDate(new Date(2021, 3, 17), new Date(2021, 3, 19)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Package`, `Theme & Template`, `Newest`, `Recommended`]
  },
  {
    title: 'Updated Application UI Kit in 2021',
    publishedAt: randomDate(new Date(2021, 4, 23), new Date(2021, 4, 29)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Package`, `Theme & Template`, `Recommended`]
  },
  {
    title: 'Newest Portfolio & Agency Template in May 2021 - updated weekly',
    publishedAt: randomDate(new Date(2021, 4, 10), new Date(2021, 4, 17)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Package`, `Theme & Template`, `Newest`]
  },
  {
    title: '2021\'s Best Selling Multipurpose E-Commerce Template - updated weekly',
    publishedAt: randomDate(new Date(2021, 5, 20), new Date(2021, 5, 27)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Bargains`, `Package`, `Theme & Template`, `Hottest`, `Recommended`]
  },
  {
    title: '2021\'s Best Selling Free Bootstrap Landing Pages for small Business - updated weekly',
    publishedAt: randomDate(new Date(2021, 5, 20), new Date(2021, 5, 27)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Bargains`, `Package`, `Theme & Template`, `Hottest`, `Recommended`]
  },
  {
    title: '2021\'s Best Selling Primium Bootstrap Landing Pages for small Business - updated weekly',
    publishedAt: randomDate(new Date(), new Date()),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Bargains`, `Package`, `Theme & Template`, `Hottest`, `Recommended`]
  },
  {
    title: '2021\'s Best Selling Multipurpose E-Commerce Template - updated weekly',
    publishedAt: randomDate(new Date(2021, 5, 20), new Date(2021, 5, 27)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Bargains`, `Package`, `Theme & Template`, `Hottest`, `Recommended`]
  },
  {
    title: '2021\'s Best Selling Free Responsive Website UI Kit - updated weekly',
    publishedAt: randomDate(new Date(2021, 5, 20), new Date(2021, 5, 27)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Bargains`, `Package`, `Theme & Template`, `Hottest`, `Recommended`]
  },
  {
    title: '2021\'s Best Selling Primium Responsive Website UI Kit - updated weekly',
    publishedAt: randomDate(new Date(2021, 5, 20), new Date(2021, 5, 27)),
    modifiedAt: null,
    openAt: null,
    closedAt: null,
    eventType: [`Bargains`, `Package`, `Theme & Template`, `Hottest`, `Recommended`]
  }
]