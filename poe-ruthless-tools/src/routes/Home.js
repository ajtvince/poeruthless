import React from 'react';
import './stylesheets/Home.css';
//show current race leader
//show news posts related to ruthless



const originalArray = [
    {
      "name": "Double Strike",
      "class": "Duelist",
      "act": 1,
      "quest": "Starter Gem"
    },
    {
      "name": "Cleave",
      "class": "Duelist",
      "act": 1,
      "quest": "Enemy at the Gate (Kill Hillock)"
    },
    {
      "name": "Galvanic Arrow",
      "class": "Duelist",
      "act": 1,
      "quest": "Enemy at the Gate (Kill Hillock)"
    },
    {
      "name": "Galvanic Arrow",
      "class": "Ranger",
      "act": 1,
      "quest": "Enemy at the Gate (Kill Hillock)"
    },
    {
      "name": "Molten Strike",
      "class": "Duelist",
      "act": 1,
      "quest": "Enemy at the Gate (Kill Hillock)"
    },
    {
      "name": "Molten Strike",
      "class": "Marauder",
      "act": 1,
      "quest": "Enemy at the Gate (Kill Hillock)"
    },
    {
      "name": "Molten Strike",
      "class": "Scion",
      "act": 1,
      "quest": "Enemy at the Gate (Kill Hillock)"
    },
    {
      "name": "Molten Strike",
      "class": "Templar",
      "act": 1,
      "quest": "Enemy at the Gate (Kill Hillock)"
    },
    {
      "name": "Lacerate",
      "class": "Duelist",
      "act": 1,
      "quest": "The Siren's Cadence(Cavern of Wrath WP)"
    },
];

console.log(originalArray);

function findUniqueCombos(arr) {
  let result = [];

  // Helper function to check if two objects have the same class and quest values
  function haveSameClassAndQuest(obj1, obj2) {
    return obj1.class === obj2.class && obj1.quest === obj2.quest;
  }

  // Recursive function to find all unique combinations
  function findCombos(currArr, remainingArr) {
    // Base case: If there are no more objects remaining, add the current array to the result
    if (remainingArr.length === 0) {
      result.push(currArr);
      return;
    }

    // For each object in the remaining array
    for (let i = 0; i < remainingArr.length; i++) {
      // If the current array does not already contain an object with the same name value
      if (!currArr.some(obj => obj.name === remainingArr[i].name)) {
        // If the current array does not already contain an object with the same class and quest values
        if (!currArr.some(obj => haveSameClassAndQuest(obj, remainingArr[i]))) {
          // Recursively call the function with the current array plus the current object, and the remaining array without the current object
          findCombos([...currArr, remainingArr[i]], remainingArr.slice(i + 1));
        }
      }
    }
  }

  findCombos([], arr);
  return result;
}

const uniqueCombos = findUniqueCombos(originalArray);
console.log(uniqueCombos);
let correctCombos = [];
uniqueCombos.forEach(arr => {
  if(arr.length === uniqueCombos[0].length) {
    console.log('length 10');
    console.log(arr);
    correctCombos.push(arr);
  }
});

let numDiffClasses=Infinity;
let minOptimalPath = [];
let classMaxCount=-Infinity;
let mainClass = "Duelist";

correctCombos.forEach( arr => {
  let x = countClassNames(arr);
  let tc = Object.keys(x).length;
  if (tc <= numDiffClasses) {
    numDiffClasses = tc;
    let z = Object.values(x);
    let max = Math.max(...z);
    console.log(max);
    if (max >= classMaxCount) {
      classMaxCount = max;
      console.log(arr);
      if (x[mainClass] === max) {
        minOptimalPath.push(arr);
      }
    }
  }
});

console.log(minOptimalPath);



function countClassNames(arr) {
  let count = {};

  for (let i = 0; i < arr.length; i++) {
    if (count[arr[i].class]) {
      count[arr[i].class]++;
    } else {
      count[arr[i].class] = 1;
    }
  }
  console.log(count);
  return count;
}

function Home() {
  return (
    <div>

    </div>
  );
}


export default Home;

[
  [
      {
          "name": "Ancestral Protector",
          "class": "Templar",
          "act": 1,
          "quest": "Breaking Some Eggs(Mud Flats)"
      },
      {
          "name": "Battlemage's Cry",
          "class": "Templar",
          "act": 3,
          "quest": "Lost in Love(Find Tolman)Maramoa"
      },
      {
          "name": "Bladefall",
          "class": "Scion",
          "act": 3,
          "quest": "Sever the Right Hand(Kill Gravicius)"
      },
      {
          "name": "Blood Rage",
          "class": "Duelist",
          "act": 2,
          "quest": "Intruders in Black(Kill Fidelitas)"
      },
      {
          "name": "Clarity",
          "class": "Witch",
          "act": 1,
          "quest": "The Caged Brute(Kill Brutus)"
      }
  ],
  [
      {
          "name": "Ancestral Protector",
          "class": "Templar",
          "act": 1,
          "quest": "Breaking Some Eggs(Mud Flats)"
      },
      {
          "name": "Battlemage's Cry",
          "class": "Templar",
          "act": 3,
          "quest": "Lost in Love(Find Tolman)Maramoa"
      },
      {
          "name": "Bladefall",
          "class": "Scion",
          "act": 3,
          "quest": "Sever the Right Hand(Kill Gravicius)"
      },
      {
          "name": "Blood Rage",
          "class": "Ranger",
          "act": 2,
          "quest": "Intruders in Black(Kill Fidelitas)"
      },
      {
          "name": "Clarity",
          "class": "Witch",
          "act": 1,
          "quest": "The Caged Brute(Kill Brutus)"
      }
  ],
  [
      {
          "name": "Ancestral Protector",
          "class": "Templar",
          "act": 1,
          "quest": "Breaking Some Eggs(Mud Flats)"
      },
      {
          "name": "Battlemage's Cry",
          "class": "Templar",
          "act": 3,
          "quest": "Lost in Love(Find Tolman)Maramoa"
      },
      {
          "name": "Bladefall",
          "class": "Scion",
          "act": 3,
          "quest": "Sever the Right Hand(Kill Gravicius)"
      },
      {
          "name": "Blood Rage",
          "class": "Shadow",
          "act": 2,
          "quest": "Intruders in Black(Kill Fidelitas)"
      },
      {
          "name": "Clarity",
          "class": "Witch",
          "act": 1,
          "quest": "The Caged Brute(Kill Brutus)"
      }
  ],
  [
      {
          "name": "Ancestral Protector",
          "class": "Templar",
          "act": 1,
          "quest": "Breaking Some Eggs(Mud Flats)"
      },
      {
          "name": "Battlemage's Cry",
          "class": "Templar",
          "act": 3,
          "quest": "Lost in Love(Find Tolman)Maramoa"
      },
      {
          "name": "Bladefall",
          "class": "Shadow",
          "act": 3,
          "quest": "Sever the Right Hand(Kill Gravicius)"
      },
      {
          "name": "Blood Rage",
          "class": "Duelist",
          "act": 2,
          "quest": "Intruders in Black(Kill Fidelitas)"
      },
      {
          "name": "Clarity",
          "class": "Witch",
          "act": 1,
          "quest": "The Caged Brute(Kill Brutus)"
      }
  ],
  [
      {
          "name": "Ancestral Protector",
          "class": "Templar",
          "act": 1,
          "quest": "Breaking Some Eggs(Mud Flats)"
      },
      {
          "name": "Battlemage's Cry",
          "class": "Templar",
          "act": 3,
          "quest": "Lost in Love(Find Tolman)Maramoa"
      },
      {
          "name": "Bladefall",
          "class": "Shadow",
          "act": 3,
          "quest": "Sever the Right Hand(Kill Gravicius)"
      },
      {
          "name": "Blood Rage",
          "class": "Ranger",
          "act": 2,
          "quest": "Intruders in Black(Kill Fidelitas)"
      },
      {
          "name": "Clarity",
          "class": "Witch",
          "act": 1,
          "quest": "The Caged Brute(Kill Brutus)"
      }
  ],
  [
      {
          "name": "Ancestral Protector",
          "class": "Templar",
          "act": 1,
          "quest": "Breaking Some Eggs(Mud Flats)"
      },
      {
          "name": "Battlemage's Cry",
          "class": "Templar",
          "act": 3,
          "quest": "Lost in Love(Find Tolman)Maramoa"
      },
      {
          "name": "Bladefall",
          "class": "Shadow",
          "act": 3,
          "quest": "Sever the Right Hand(Kill Gravicius)"
      },
      {
          "name": "Blood Rage",
          "class": "Shadow",
          "act": 2,
          "quest": "Intruders in Black(Kill Fidelitas)"
      },
      {
          "name": "Clarity",
          "class": "Witch",
          "act": 1,
          "quest": "The Caged Brute(Kill Brutus)"
      }
  ]
]