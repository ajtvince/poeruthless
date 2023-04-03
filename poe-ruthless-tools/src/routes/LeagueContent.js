import React from 'react';
import './stylesheets/LeagueContent.css';
//show league content that is in ruthless and info
function LeagueContent() {
  return (
    <div className='pageContainer'>
      <p>LeagueContent</p>
    </div>
  );
}

/**
const gemData = [
  {    "name": "Summon Chaos Golem",    "class": "Duelist",    "act": 4,    "quest": "Breaking the Seal(Open the Mines)"},  {    "name": "Summon Chaos Golem",    "class": "Marauder",    "act": 4,    "quest": "Breaking the Seal(Open the Mines)"},  {    "name": "Summon Chaos Golem",    "class": "Ranger",    "act": 4,    "quest": "Breaking the Seal(Open the Mines)"},  {    "name": "Summon Chaos Golem",    "class": "Scion",    "act": 4,    "quest": "Breaking the Seal(Open the Mines)"},  {    "name": "Summon Chaos Golem",    "class": "Shadow",    "act": 4,    "quest": "Breaking the Seal(Open the Mines)"},  {    "name": "Summon Chaos Golem",    "class": "Templar",    "act": 4,    "quest": "Breaking the Seal(Open the Mines)"},  {    "name": "Summon Chaos Golem",    "class": "Witch",    "act": 4,    "quest": "Breaking the Seal(Open the Mines)"},  {    "name": "Summon Flame Golem",    "class": "Duelist",    "act": 4,    "quest": "Breaking the Seal(Open the Mines)"},  {    "name": "Summon Flame Golem",    "class": "Marauder",    "act": 4,    "quest": "Breaking the Seal(Open the Mines)"},  {    "name": "Summon Flame Golem",    "class": "Ranger",    "act": 4,    "quest": "Breaking the Seal(Open the Mines)"},  {    "name": "Summon Flame Golem",    "class": "Scion",    "act": 4,    "quest": "Breaking the Seal(Open the Mines)"},  {    "name": "Summon Flame Golem",    "class": "Shadow",    "act": 4,    "quest": "Breaking the Seal(Open the Mines)"},  {    "name": "Summon Flame Golem",    "class": "Templar",    "act": 4,    "quest": "Breaking the Seal(Open the Mines)"},  {    "name": "Summon Flame Golem",    "class": "Witch",    "act": 4,    "quest": "Breaking the Seal(Open the Mines)"},  {    "name": "Flame Wall",    "class": "Templar",    "act": 1,    "quest": "Breaking Some Eggs(Mud Flats)"},  {    "name": "Flame Wall",    "class": "Witch",    "act": 1,    "quest": "Breaking Some Eggs(Mud Flats)"},  {    "name": "Firestorm",    "class": "Templar",    "act": 3,    "quest": "Sever the Right Hand(Kill Gravicius)"},  {    "name": "Firestorm",    "class": "Witch",    "act": 3,    "quest": "Sever the Right Hand(Kill Gravicius)"},  {    "name": "Fireball",    "class": "Witch",    "act": 1,    "quest": "Starter Gem"}
];

function findLowestUniqueQuestCount(inputArray) {
  // Get all unique names
  const uniqueNames = [...new Set(inputArray.map(item => item.name))];
  console.log(inputArray);
  console.log(uniqueNames);
  // Generate all possible arrays that include each unique name only one time
  const allArrays = [];
  const generateArrays = (arr, index) => {
    if (arr.length === uniqueNames.length) {
      console.log(arr);
      allArrays.push(arr);
      return;
    }
    for (let i = index; i < inputArray.length; i++) {
      if (!arr.includes(inputArray[i].name)) {
        generateArrays([...arr, inputArray[i].name], i + 1);
      }
    }
  };
  generateArrays([], 0);
  // Find the array that has the lowest count of unique values in the quest property
  let lowestCount = 0;
  let lowestArray = [];
  allArrays.forEach(array => {
    const uniqueQuests = [...new Set(array.map(name => inputArray.find(item => item.name === name)))];
    console.log(uniqueQuests);
    if (uniqueQuests.length > lowestCount) {
      lowestCount = uniqueQuests.length;
      lowestArray = array;
    }
  });
  return lowestArray;
}


let x = findLowestUniqueQuestCount(gemData);

**/
export default LeagueContent;