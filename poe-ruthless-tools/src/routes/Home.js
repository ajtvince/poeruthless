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
    },
    {
      "name": "Summon Stone Golem",
      "class": "Duelist",
      "act": 4,
      "quest": "Breaking the Seal(Open the Mines)"
    },
    {
      "name": "Summon Stone Golem",
      "class": "Marauder",
      "act": 4,
      "quest": "Breaking the Seal(Open the Mines)"
    },
    {
      "name": "Summon Stone Golem",
      "class": "Ranger",
      "act": 4,
      "quest": "Breaking the Seal(Open the Mines)"
    },
    {
      "name": "Summon Stone Golem",
      "class": "Scion",
      "act": 4,
      "quest": "Breaking the Seal(Open the Mines)"
    },
    {
      "name": "Summon Stone Golem",
      "class": "Shadow",
      "act": 4,
      "quest": "Breaking the Seal(Open the Mines)"
    },
    {
      "name": "Summon Stone Golem",
      "class": "Templar",
      "act": 4,
      "quest": "Breaking the Seal(Open the Mines)"
    },
    {
      "name": "Summon Stone Golem",
      "class": "Witch",
      "act": 4,
      "quest": "Breaking the Seal(Open the Mines)"
    },
    {
      "name": "Summon Flame Golem",
      "class": "Duelist",
      "act": 4,
      "quest": "Breaking the Seal(Open the Mines)"
    },
    {
      "name": "Summon Flame Golem",
      "class": "Marauder",
      "act": 4,
      "quest": "Breaking the Seal(Open the Mines)"
    },
    {
      "name": "Summon Flame Golem",
      "class": "Ranger",
      "act": 4,
      "quest": "Breaking the Seal(Open the Mines)"
    },
    {
      "name": "Summon Flame Golem",
      "class": "Scion",
      "act": 4,
      "quest": "Breaking the Seal(Open the Mines)"
    },
    {
      "name": "Summon Flame Golem",
      "class": "Shadow",
      "act": 4,
      "quest": "Breaking the Seal(Open the Mines)"
    },
    {
      "name": "Summon Flame Golem",
      "class": "Templar",
      "act": 4,
      "quest": "Breaking the Seal(Open the Mines)"
    },
    {
      "name": "Summon Flame Golem",
      "class": "Witch",
      "act": 4,
      "quest": "Breaking the Seal(Open the Mines)"
    },
    {
      "name": "Shield Crush",
      "class": "Marauder",
      "act": 1,
      "quest": "Enemy at the Gate (Kill Hillock)"
    },
    {
      "name": "Vulnerability",
      "class": "Marauder",
      "act": 3,
      "quest": "Lost in Love(Find Tolman)Maramoa"
    },
    {
      "name": "Vulnerability",
      "class": "Scion",
      "act": 3,
      "quest": "Lost in Love(Find Tolman)Maramoa"
    },
    {
      "name": "Vulnerability",
      "class": "Templar",
      "act": 3,
      "quest": "Lost in Love(Find Tolman)Maramoa"
    }
];

const uniqueNames = [...new Set(originalArray.map(item => item.name))];

const reducedArrays = [];

for (let i = 0; i < Math.pow(2, uniqueNames.length); i++) {
  const reducedArray = [];

  for (let j = 0; j < uniqueNames.length; j++) {
    if (i & (1 << j)) {
      const item = originalArray.find(item => item.name === uniqueNames[j]);
      reducedArray.push(item);
    }
  }

  const isUnique = reducedArrays.every(array => {
    if (array.length !== reducedArray.length) {
      return true;
    }

    for (let k = 0; k < array.length; k++) {
      if (array[k].name !== reducedArray[k].name) {
        return true;
      }
    }

    return false;
  });

  if (isUnique) {
    reducedArrays.push(reducedArray);
  }
}

console.log(reducedArrays);

function Home() {
  return (
    <div>
      {reducedArrays.map((array, index) => (
        <div key={index}>
          {array.map(item => (
            <div key={`${item.name}-${item.class}-${item.act}`}>
              {item.name}, {item.class}, Act {item.act}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}


export default Home;


