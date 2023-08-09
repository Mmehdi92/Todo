import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
const mongoURL = "mongodb://127.0.0.1:27017/todoDb";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(mongoURL);

const itemSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", itemSchema);

const today = new Item({
  name: "this is the first item",
});

const tomorrow = new Item({
  name: "this is the second item",
});

const third = new Item({
  name: "this is the last item",
});

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

const defaultItem = [today, tomorrow, third];


app.get("/:customListName",(req,res)=>{
  console.log(req.params.customListName)
})


app.get("/", async (req, res) => {
  const founditems = await Item.find({});
  if (founditems.length === 0) {
    await Item.insertMany(defaultItem);
    res.redirect("/");
  } else {
    res.render("index.ejs", {
      TodaysMotivation: dailyMotivaiton(),
      todos: founditems,
    });
  }
});

app.post("/submit", async (req, res) => {
  const newTask = req.body.task;
  const item = new Item({
    name: newTask,
  });
  await Item.collection.insertOne(item);
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const itemSelected = req.body.tasksBox;
  if (itemSelected) {
    await Item.deleteOne({ _id: itemSelected });
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
