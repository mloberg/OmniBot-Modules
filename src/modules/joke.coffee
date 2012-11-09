# Description:
#   Tell some jokes.
# 
# Dependencies:
#   None
# 
# Configuration:
#   None
# 
# Commands:
#   omnibot joke
# 
# Author:
#   mloberg

jokes = [
  { joke: "What did the little boy tell the game warden?", answer: "His dad was in the kitchen poaching eggs!" },
  { joke: "What do you call a chicken crossing the road?", answer: "Poultry in motion." },
  { joke: "What do you call it when a cat sues another cat?", answer: "A Clawsuit." },
  { joke: "How can you tell the ocean is friendly?", answer: "It waves." },
  { joke: "What's black, white, green and bumpy?", answer: "A pickle wearing a tuxedo." },
  { joke: "What does a television have in common with a rabbit?", answer: "His ears!" },
  { joke: "What did the crop say to the farmer?", answer: "Why are you always picking on me?" },
  { joke: "What did the guy say when he walked into the bar?", answer: "Ouch." },
  { joke: "How is a locksmith like a typewritter?", answer: "They both have a lot of keys!" },
  { joke: "What has four legs and goes booo?", answer: "A cow with a cold." },
  { joke: "What is a caterpillar afraid of?", answer: "A dogerpillar!" },
  { joke: "Who has the strongest underwear?", answer: "Arnold Short-sineger." },
  { joke: "Why did the elephant decide not to move?", answer: "Because he couldn't lift his trunk." },
  { joke: "Which are the stronger days of the week?", answer: "Saturday and Sunday. The rest are weekdays." },
  { joke: "Which runs faster, hot or cold?", answer: "Hot. Everyone can catch a cold." },
  { joke: "Why did the strawberry cross the road?", answer: "Because his mother was in a jam." },
  { joke: "How do you keep a lion from charging?", answer: "Take away its credit cards." },
  { joke: "What do you call a cow with a twitch?", answer: "Beef jerky." },
  { joke: "What is the best way to keep water from running?", answer: "Don't pay the water bill." },
  { joke: "Where do cows go to have fun?", answer: "The moo-vies!" },
  { joke: "What time was is when the elephant sat on a chair?", answer: "Time to get a new chair." },
  { joke: "What did the flower say to the bike?", answer: "Petal" },
  { joke: "Why do we not tell secrets in a corn patch?", answer: "Too many ears!" },
  { joke: "What's yellow and writes?", answer: "A ball point banana." },
  { joke: "Did people laugh when the lady fell on the ice?", answer: "No, but the ice cracked up." },
  { joke: "What word is always spelled incorrectly?", answer: "Incorrectly." },
  { joke: "What should you do if your dog is missing?", answer: "Check the Lost and Hound." },
  { joke: "What have you seen that you will never see again?", answer: "Yesterday!" },
  { joke: "Why did the turkey cross the road?", answer: "To get to the chicken." },
  { joke: "Why was Cinderella Late for the ball?", answer: "She forgot to swing the bat!" },
  { joke: "How can you tell there's a hippo in your oven?", answer: "The oven door won't close." },
  { joke: "What do you get when you cross a shark and 'Flipper'?", answer: "A fat shark." },
  { joke: "What did the lamp say to the other lamp?", answer: "You turn me on." },
  { joke: "What did the sidewalk do when he heard a funny joke?", answer: "He cracked up." },
  { joke: "Why did the chicken cross the road?", answer: "He wanted to prove to the armadillo that it could be done." },
  { joke: "Why did the dalmation need glasses?", answer: "He was seeing spots." },
  { joke: "What did the book say to the page?", answer: "Don't turn away from me." },
  { joke: "What do you call a pig in a butcher shop?", answer: "A pork chop." },
  { joke: "In France, what do frogs eat?", answer: "French Flies." },
  { joke: "What is yellow and wears a mask?", answer: "The Lone Lemon." },
  { joke: "What do astronauts eat for dinner?", answer: "Launch meat." },
  { joke: "Why is the little duck always so sad?", answer: "Because he always sees a bill in front of his face." },
  { joke: "What did they digital clock say to its mom?", answer: "Look mom, no hands." },
  { joke: "What is the best way to raise a child?", answer: "In an elevator." },
  { joke: "What is always behind the time?", answer: "The back of the clock." },
  { joke: "What's green and sings?", answer: "Elvis Parsley!!" },
  { joke: "What has 10 letters and starts with gas?", answer: "An automobile." },
  { joke: "Why did they bury the battery?", answer: "Because it was dead." },
  { joke: "Why did the chicken go to the library?", answer: "To check out a bawk, bawk, bawk,bawk." },
  { joke: "If a woodchuck had a name, what would it be?", answer: "Chuck Wood." },
  { joke: "How do you catch a squirrel?", answer: "Climb a tree and act like a nut." },
  { joke: "What did one penny say to the other?", answer: "Let's get together and make some sense." },
  { joke: "Why don't lobsters share?", answer: "Because they are shellfish." },
  { joke: "Why does the man wish he could be a guitar player in a room full of beautiful girls?", answer: "Because if he was a guitar player, he would have his pick!" },
  { joke: "What is a cat's favorite color?", answer: "Purr-ple" },
  { joke: "Why did the ghost float across the road?", answer: "Because he couldn't walk." },
  { joke: "What kind of star could hurt you?", answer: "A shooting star." },
  { joke: "What's brown and sounds like a bell?", answer: "Dung!" },
  { joke: "What do you do to a pigtree?", answer: "Porkchop." },
  { joke: "What is Mario's favorite type of pants?", answer: "Denim Denim Denim." },
]

module.exports = (robot) ->
  robot.respond /joke/, (resp) ->
    joke = resp.random jokes
    resp.send joke.joke
    setTimeout ->
      resp.send joke.answer
    , 3000
