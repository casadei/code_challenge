Code Challenge for Software Engineer
====================================

This is a coding challenge for Software Engineering position with WoboInc. 

It's a small project that makes use of:
- SASS (pre-processor);
- Twitter Bootstrap 3;
- Angular;
- Bower;
- Rails;

A search engine was created to satisfy the challenge requisites. Although the focus of my project is on client side, 
I've made a small abstraction* of the Google Books API in order to demonstrate some knowledge of server side too.

OBS. I belive that is not the optimal solution in the real world. I'd probably choose to make requests directly from Google API without intermediaries.

This project is benefited with two levels of cache. One on client that stores requests made by user while he is on the page and another on server abstraction that stores the searches for one hour.

I also tried to make a responsive site with a nice user experience for mobile resolutions.


[Here](http://casadei-cc.herokuapp.com/) you can see a live demo of it hosted on Heroku!

## Setting Up

Clone this repository and run these commands:

```
npm install
bundle install
rake bower:update
```

From now on your project is ready to use and you can start rails server whenever you want.

## Running Tests

Is there a total of 32 specs in both client and server. You can run it through these commands:

```
rake spec
rake spec:javascript
```

You also can view Jasmine's reports through http://localhost:3000/specs in your browser.

## Not fullfilled wishes

Unfortunatelly I'm also commited with another things (mainly my full time job and a master degree of Computer Science) and so I could not finish on time all things that I wanted to:

- Reach 100% of test coverage;
- Write functional tests;
- Refactor the SASS;
- Improve the semantic of HTML;
- Create more Angular directives to represent data (like book);
- Use JSLint;
- Configure my environment to make use of some kind of file watcher that runs the specs automagically;

## Weird Thing

I've noticed that total items of a Google Books API response can vary between requests. You can see it running:

```
curl "https://www.googleapis.com/books/v1/volumes/?maxResults=30&q=game+of+thrones&startIndex=0"   | head -10;
curl "https://www.googleapis.com/books/v1/volumes/?maxResults=30&q=game+of+thrones&startIndex=50"  | head -10; 
curl "https://www.googleapis.com/books/v1/volumes/?maxResults=30&q=game+of+thrones&startIndex=100" | head -10;
```

Compare the result of totalItem in each request. Did you see it?

## Thanks

Thanks for the opportunity to participate of this challenge. I hope leave a good impression.