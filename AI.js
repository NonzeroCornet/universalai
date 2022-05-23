var scenarios = [];
var outputs = 0;
var lastIndex = 0;
var lastIndexIndex = 0;
var brainOut = document.getElementById("brain");
setTimeout(function () {
  scenarios = eval(prompt("Import Brain (Leave as [] to create new):", "[]"));
  outputs = prompt("Number of possible outputs in general:");
  scenarios.push([0, [0]]);
  update();
}, 1000);

function update() {
  var state = prompt("New input:").toString();
  var foundMatch = false;
  for (let i = 0; i < scenarios.length; i++) {
    if (!foundMatch) {
      if (scenarios[i][0] == state) {
        lastIndexIndex = tryAttempt(scenarios[i][1]);
        lastIndex = i;
        foundMatch = true;
      } else if (scenarios[i][0] != state && i == scenarios.length - 1) {
        lastIndex = scenarios.length;
        var temp = [];
        for (let x = 1; x <= outputs; x++) {
          temp.push(x);
        }
        scenarios.push([state, temp]);
        lastIndexIndex = tryAttempt(scenarios[scenarios.length - 1][1]);
        foundMatch = true;
      }
    }
  }

  if (JSON.stringify(scenarios[0]) === "[0,[0]]") {
    scenarios.shift();
  }
  var Continue = confirm(
    "Current Brain (Press cancel to end): " + JSON.stringify(scenarios)
  );
  brainOut.innerHTML = "Brain: <br><br>" + JSON.stringify(scenarios);
  Continue ? update() : Continue;
}

function tryAttempt(arr) {
  let random = Math.round(Math.random() * (arr.length - 1));
  var attempt = confirm("Try " + arr[random]);
  if (!attempt) {
    arr.splice(random, 1);
    tryAttempt(arr);
  } else {
    var won = prompt(
      "Reward/Punish?",
      "r to reward, p for punish, or just press enter for neither"
    );
    if (won === "r") {
      arr.push(arr[random]);
      return random;
    } else if (won === "p") {
      arr.splice(random, 1);
      if (arr == []) {
        scenarios[lastIndex][1].splice(lastIndexIndex, 1);
      }
      return random;
    } else {
      return random;
    }
  }
}