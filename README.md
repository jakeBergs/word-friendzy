Word Friendzy is a multiplayer word game built using React and Firebase. Players spell words using the available letters to score points

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Table of Contents

- [Game Play](#game-play)
  - [Rules](#rules)
- [Development Information](#development-information)

## Game Play

Word Friendzy is started when a player creates a new game. A game will be created and they will be taken to its waiting room. They will also be given a sharable link to invite friends to join the game.

A user can enter the game by navigating to the link provided. Here they will be prompted to enter a username for the game. A list of all players usernames show up on the sidebar. This is everybody that will be involved in the game when it starts.

A game is started when any player hits the "start game" button. During gameplay users race to enter words using the randomly generated letters provided. Every letter may only be used once. The remaining letters available to build a word change as a player types. Words can only be played once; if another user has entered that word, it is no longer available. Games last 60 seconds.

After the game ends, scores are tallied and a winner(s) is determined. All players' scores are shown in a table on this screen. This stats screen can be accessed again at any time by navigating to this URL (same as the sharable link).

### Rules

Some rules have already been discussed but will be repeated here.

* Players can join game until "game start" has been pressed
* Game lasts 60 seconds
* 9 letters, randomly generated
  * At least 2 consanants and 2 vowels
  * possiblity for 2 of the same letter
* Letters can only be used once per word
* Scoring:
  * 3 letter word - 1 point
  * 4 letter word - 2 point
  * 5 letter word - 3 point
  * 6 letter word - 4 point
  * 7 letter word - 5 point
  * 8 letter word - 6 point
  * 9 letter word - 7 point
* The winner is the player who scores the most points


## Development Information

Create-React-App was used to build this project. This took care of most of the boilerplate.

Firebase was used for data storage and real time data transfer. Each game is it's own database entry. Games keep track of the game status, players, letters, words played, and scores. Listeners for these variables are set in the 'Game' component after it mounts.

The uuid module was used to create unique identifiers for games. This gameID was intstrumental for saving information and transmitting it between users. The gameID is used in the sharable link so new players can access the game. Anybody that hits the URL with this value as the parameter has the ability to enter the game. However, these gameIDs are extremely unique, so each game is more or less private.

The game status was used to render different components on the users screen. After a game is created it is in 'waiting'. In this status new players can enter the game. After the game is started, the status is moved to 'playing'. When all users are informed of the status change to 'playing', the 60 second timer starts. After the timer has run out, the game moves to 'finished'. At this point the 'Game' component will show the games stats and game winner.

No unit testing has been written for this project yet, but given more time will be.




