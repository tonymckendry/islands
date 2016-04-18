# MoodTweet

*How is Twitter feeling today?*

Moodtweet allows you to enter a keyword, and it will pull in every tweet, in real-time, that is sent to twitter that contains that keyword.

It will then analyze the sentiment of the tweet using the AFINN dictionary and place the tweet on a graph.

###The AFINN Dictionary

*The Wordlist for Sentiment Analysis in Microblogs* was created by Finn Nielsen as a research thesis at the Technical University of Denmark. It scores a list of 2500 sentimental words on a scale of -5 to +5. Moodtweet parses through each word in a tweet, and compares them to the AFINN Dictionary to create an overall "score" for each tweet.

###Reading the Graph:

#####X-Axis:
Represents the overall Score of the tweet, the X axis is color coded - red on the left (negative) side of the graph represents negative scores, while blue on the right (positive) side of the graph represents positive scores. Green, in the middle, represents neutral sentimental scores.

#####Y-Axis:
Represents the amount of characters in the tweet on a scale of 0 to 140 (the maximum number of characters allowed in a tweet)

#####Dot size:
The amount of sentimental words found in the AFINN dictionary that were used in the tweet. The bigger the dot, the more words that were used.

###Technology Used:
* Socket.IO
* D3.js
* Angular.js
* Express
* Node.js
* Bootstrap
