export const topics = [
  "fish",
  "car",
  "duck",
  "tiger",
  "leaf",
  "snake",
  "fire",
  "kite",
  "cherry",
  "tree",
  "hamburger",
  "moon",
  "boat",
  "ice cream",
  "sheep",
  "snowflake",
  "robot",
  "grass",
  "angel",
  "star",
  "pie",
  "king",
  "balloon",
  "diamond",
  "rabbit",
  "butterfly",
  "carrot",
  "airplane",
];

export const getRandomTopic = (topics) => {
  const topic = topics[Math.floor(Math.random() * topics.length)];
  return topic;
};
