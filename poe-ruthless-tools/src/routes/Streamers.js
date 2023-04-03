import React from 'react';
import './stylesheets/Streamers.css';
//list of streamers who stream ruthless
/**
const skills = [
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
  {
    "name": "Summon Carrion Golem",
    "class": "Templar",
    "act": 4,
    "quest": "Breaking the Seal(Open the Mines)"
  },
  {
    "name": "Summon Carrion Golem",
    "class": "Witch",
    "act": 4,
    "quest": "Breaking the Seal(Open the Mines)"
  }
];


function Streamers() {
  const objects = [];

  // Generate 20 objects with random values for name, class, and quest properties
  for (let i = 0; i < 20; i++) {
    const name = String.fromCharCode(Math.floor(Math.random() * 10) + 97);
    const classNum = Math.floor(Math.random() * 5) + 1;
    const questNum = Math.floor(Math.random() * 7) + 6;

    objects.push({
      name: name,
      class: classNum,
      quest: questNum
    });
  }

  // Find all possible arrays with unique name values
  const arrays = permute(objects);

  // Find the array with the lowest count of unique values in the class property
  let minClassCount = Infinity;
  let minClassArray;
  arrays.forEach(arr => {
    const classSet = new Set();
    arr.forEach(obj => classSet.add(obj.class));
    if (classSet.size < minClassCount) {
      minClassCount = classSet.size;
      minClassArray = arr;
    }
  });

  // Find the array with the highest count of unique values in the quest property
  let maxQuestCount = 0;
  let maxQuestArray;
  arrays.forEach(arr => {
    const questSet = new Set();
    arr.forEach(obj => questSet.add(obj.quest));
    if (questSet.size > maxQuestCount) {
      maxQuestCount = questSet.size;
      maxQuestArray = arr;
    }
  });

  // Return the array with the lowest count of unique values in the class property
  // and the highest count of unique values in the quest property
  return (
    <div>
      <h1>Lowest count of unique values in class property: {minClassCount}</h1>
      <h1>Highest count of unique values in quest property: {maxQuestCount}</h1>
      <h2>Array with lowest class count and highest quest count:</h2>
      <ul>
        {maxQuestArray.map(obj => (
          <li key={obj.name}>
            {obj.name}: {obj.class} - {obj.quest}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Find all possible arrays with unique name values
function permute(arr) {
  const result = [];

  const recurse = (currArr, restArr) => {
    if (restArr.length === 0) {
      result.push(currArr);
    } else {
      for (let i = 0; i < restArr.length; i++) {
        const newArr = currArr.concat(restArr[i]);
        const newRest = restArr.slice(0, i).concat(restArr.slice(i + 1));
        recurse(newArr, newRest);
      }
    }
  };

  recurse([], arr);
  return result.filter(arr => isUnique(arr));
}

// Helper function to check if an array has unique name values
function isUnique(arr) {
  const nameSet = new Set();
  for (let i = 0; i < arr.length; i++) {
    if (nameSet.has(arr[i].name)) {
      return false;
    } else {
      nameSet.add(arr[i].name);
    }
  }
  return true;
}
**/
function Streamers() {
  
}
export default Streamers;