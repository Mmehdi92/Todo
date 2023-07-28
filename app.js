import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

function dailyMotivaiton() {
  const dailyMotivations = [
    "Believe in yourself, overcome any obstacle.",
    "Embrace challenges, they lead to growth.",
    "Take risks, find greatness beyond comfort.",
    "Start each day with gratitude's power.",
    "Failures are stepping stones to success.",
    "Focus on goals, reap rewarding journey.",
    "Surround yourself with positive minds.",
    "Be kind to yourself, you're enough.",
    "Remember why you started, keep going.",
    "Success is courage to continue trying.",
    "Every day's a chance, embrace it.",
    "You're the author of your story.",
    "Break limits, realize your potential fully.",
    "Believe, achieve the amazing in life.",
    "Don't wait, make the moment perfect.",
    "Love what you do, do great work.",
    "Success is in the journey, not destination.",
    "Difficulties reveal hidden potential, grow stronger.",
    "Positive action + thinking = success.",
    "Doubt kills dreams, believe in yourself.",
    "Your reaction defines life's 90%.",
    "Time's limited, live your life.",
    "Destiny's in your hands, decide freely.",
    "Believe, you're halfway to achieving dreams.",
    "Strive to add value, not just success.",
    "Future belongs to dream believers.",
    "Eliminate doubt, realize tomorrow's potential.",
    "Don't dwell on yesterday, seize today.",
    "Change brings a better life.",
    "Believe in the impossible, achieve it.",
    "Happiness is your choice, choose wisely.",
  ];

  return dailyMotivations[Math.floor(Math.random() * dailyMotivations.length)];
}

dailyMotivaiton();
var tasks = ["Daily Task Completed", "Next Chapter", "Ejs training"];
app.get("/", (req, res) => {
  res.render("index.ejs", {
    TodaysMotivation: dailyMotivaiton(),
    todos: tasks,
  });
});

app.post("/submit", (req, res) => {
  const newTask = req.body.task;
  tasks.push(newTask);
  res.render("index.ejs", { todos: tasks });
  console.log(tasks.length);
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

