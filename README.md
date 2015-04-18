# xinara cli client

This is the client of xirama (Xinara Is Not Another Recursive Acronym).

Xirama is a solution for your groupal, and one-to-one privacy comunication, this 
client manages a personal wallet of PGP keys and use it to cipher messages to
another persons, the message are sends to servers that distributte the messages
with all clients, but only the choose ones can read this messajes.

## Wy sends my privacy message to all people? Are you on drugs?

Nope, the messages are deliveried to all persons because if only the real recipient
gets the message the _internet's goblins_ must know you are posting something to 
someone.

The messages neither are sent at the moment, this are added in a pool and will be
sent each time (all together), if there are some government, corporation or evil
~~hacker~~ cracker listening by the wire, does not know who sent what message to
who.

## How I trust on the servers? I'm not insane bro

The server only are a message pasarella, this received the messages cipher to him
and when it decipher this found a another ciphered message, but not for him.

A compromised server only can no respect the delay time to sent messages and delate
who are connected.

For this reason we recomend you to use [TOR](https://www.torproject.org/),
[i2p](https://geti2p.net/en/) or similar.

For other hands, the messages are cipher every time and the server **never** has 
the public keys of the members, in fact, this are make for use temporary and 
secrets PGP keys, when the key sharing are responsibility of the users, I mean you.

You could raise you own server installing [xinara-server](https://github.com/xinara/xinara-server)
, if you do not trust us of course.

## Your english sucks

Yea, sorry, where I live I can buy a sandwich without knowing how the verb _to be_ is 
conjugated.

You could help us forking this repository and sending Pull Requests :-)

# Install

## By NPM

You can install xirama with [npm](https://www.npmjs.com/) typing:

    $ sudo npm install -g xirama-cli

## By source code

Yoy must download the source and run it with node.js and others tools like:

    $ sudo npm install -g grunt-cli
    $ git clone ...
    $ npm install 
    $ grunt
