# Tom's Javascript Analog Clock and Alarm
An analog clock and alarm clock.

You can see it live at:
https://tomgalpin.github.io/analog-clock-and-alarm/clock.html

## Notes: 
1. Did not add ability to turn off alarm clock.  Would be pretty easy, but ran out of steam.
2. Did not do Bonus portion either.
3. Used jquery for to make DOM manipulation and styling eaiser/quicker

## Areas of Improvement:
1. Add some simple tests
2. Change Date format to make easier to add dummy data and test
3. Refactor function calls 
4. Add ability to turn off alarm clock

## Guidelines:
1. Produce a web page that when loaded into a browser will render a round analog clock with dynamically moving hour/minute/second hands that point to actual clock numbers (basically a real-looking analog clock) which tells real time and AM/PM indicator. 
2. Add controls near the clock to allow a user to set an alarm that triggers some alert based on when the user enters the hour/minute/second of when the alarm should go off, and a way to turn the alarm on and off. 
3.  Bonus points: Add a date indicator on the clock somewhere and incorporate setting date into the alarm also.

## Structure
    .
    ├── /js 
    │     └── clock.js
    ├── /stylesheets
    │     ├── /scss  => SASS files 
    │     ├── styles.css => compiled CSS from SASS files
    │     └── styles.css.map => SASS mapping
    └── clock.html

## Run locally:
Open `clock.html` into your browser.

## Run SASS:
https://sass-lang.com/guide
`sass --watch stylesheets/scss/styles.scss stylesheets/styles.css`

