import React from 'react';
import { useEffect, useRef } from 'react';
import useState from 'react-usestateref';
import './stylesheets/GemGuide.css';
import questData from './data/datatemp';
//show how to get the skills available from quests
//show removed gems
//show drop only gems
//select skill gems you plan to use, and system create guide to say what level to get each mule

export default function GemGuide() {

  //create state variables
  const [buildGemList, setGem, gemRef] = useState([]);
  const [muleGems, setMuleGems] = useState([]);
  const [muleGemsFiltered, setMuleGemsFiltered] = useState([]);
  const [allGems, setAllGems] = useState(questData.questSkills);
  const [buildGems, setBuildGems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [mainClass, setMainClass] = useState('Templar');

  //set constant to hold gem json data
  const questGemArr = questData.questSkills;

  //set searchTerm state to value in input box
  function editSearchTerm(e) {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  }

  //trigger when clicking gem from selectable gem list
  function selectGemFromList(selectedGem) {
    //set temp variables
    if (typeof selectedGem === 'string') {
      setMainClass(selectedGem);
      getRequiredMules(gemRef.current);
    }
    let tempCond = true;
    let tempArr = gemRef.current;
    let tempID = buildGemList.length;
    if (tempID < 0) {
      tempID = 0 + Math.random() * 100;
    } else {
      tempID = tempID + Math.random() * 100;
    }

    //look at current mule build list and check to see if gem has been added already or not
    if (gemRef.current.length <= 0) {
      tempCond = true;
    } else {
      console.log(gemRef.current.length);
      console.log(tempArr);
      tempArr.forEach(gem => {
        if (gem.gemID === selectedGem.name) {
          tempCond = false;
        }
        if (buildGemList.length === 1 && gem.gemID !== selectedGem.name) {
          tempCond = true;
        }
      });
    }

    //if gem not found in current mule build list, add gem to state variable and push new gem to temp array
    if (tempCond === true) {
      setGem([
        ...buildGemList,
        {
          id: tempID,
          gemID: selectedGem.name,
          gemPic: 'gemPic1',
          obtain: 'quest'
        }
      ]);

      tempArr.push({
        id: tempID,
        gemID: selectedGem.name,
        gemPic: 'gemPic1',
        obtain: 'quest'
      });

      //update mule build list based on temp array
      getRequiredMules(tempArr);
    }
  }

  //remove selected gem from mule build list
  function removeGemFromList(selectedGem) {
    const tempArrRm = buildGemList.filter(gem => gem.gemID !== selectedGem.name);
    setGem(tempArrRm);
    getRequiredMules(gemRef.current);
  }

  //clear all gems from mule build list
  function clearGemList() {
    setGem([]);
    getRequiredMules(gemRef.current)
  }

  //count duplicates, check if class exists already with chosen gems
  function getRequiredMules(data) {
    let selectedGems = data;
    let foundQuestGems = [];
    console.log('data passed to getRequiredMules:');
    console.log(selectedGems);
    setGem(selectedGems);

    selectedGems.forEach(gem => {
      questGemArr.filter(qgem => {
        if (qgem.name === gem.gemID) {
          foundQuestGems.push(qgem);
        }
      });
    });

    let tc1max = 0;
    let tc2max = 0;
    let tc1class = '';
    let tc2class = '';

    let duplicateGemList = [];

    //fill duplicateGemList array with duplicate gem names
    foundQuestGems.forEach(fgem1 => {
      foundQuestGems.forEach(fgem2 => {
        if(fgem1.name === fgem2.name && fgem1.class !== fgem2.class) {
          let tempFilter = duplicateGemList.filter(dupgem => (dupgem.name === fgem1.name && dupgem.class === fgem1.class)).length;
          if ( tempFilter == 0 ) {
            duplicateGemList.push(fgem1);
          }    
          let tc1 = fgem1.class;
          let tc2 = fgem2.class;
          let tc1count = foundQuestGems.filter(fgem => fgem.class === tc1).length;
          let tc2count = foundQuestGems.filter(fgem => fgem.class === tc2).length;
          //console.log(tc1count);
          //console.log(tc2count);
          if(tc1count > tc2count){
            if(tc1count > tc1max){
              tc1max = tc1count;
              tc1class = tc1;
            }
          } else if (tc2count > tc1count) {
            if(tc2count > tc2max) {
              tc2max = tc2count;
              tc2class = tc2;
            }
          }
        }
      });
    });

    console.log('duplicate gems');
    console.log(duplicateGemList);
    //create list of non-duplicate gems
    let gemListCopy = Object.assign([], foundQuestGems);
    let uniques = [];
    gemListCopy.forEach(ungem => {
      console.log('filter out below gem');
      let x = gemListCopy.filter(ugem => ugem.name === ungem.name).length;
      if (x === 1) {
        uniques.push(ungem);
      }
    });

    //get optimalpath for mule
    const uniqueCombos = findUniqueCombos(foundQuestGems);
    console.log(uniqueCombos);
    let correctCombos = [];
    uniqueCombos.forEach(arr => {
      if(arr.length === uniqueCombos[0].length) {
        console.log(arr);
        correctCombos.push(arr);
      }
    });

    let numDiffClasses=Infinity;
    let minOptimalPath = [];
    let classMaxCount=-Infinity;
    console.log(correctCombos);

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
          //if (x[mainClass] === max) {
            minOptimalPath.push(arr);
          //}
        }
      }
    });

    console.log(minOptimalPath);

    let bestPossiblePath = getBestPath(minOptimalPath);

    console.log(bestPossiblePath);

    setMuleGemsFiltered(bestPossiblePath);
    setMuleGems(foundQuestGems);
  }

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

  //find the best path for mule leveling with least number of characters
  function getBestPath(arr) {
    let uniqueClasses = {};
    let counts = [];
  
    // Loop through each array in the main array
    for (let i = 0; i < arr.length; i++) {
      // Loop through each object in the current array
      for (let j = 0; j < arr[i].length; j++) {
        // Add the class to the uniqueClasses object
        if (!uniqueClasses.hasOwnProperty(arr[i][j].class)) {
          uniqueClasses[arr[i][j].class] = true;
        }
      }
      // Add the count of unique classes to the counts array
      counts.push(Object.keys(uniqueClasses).length);
      uniqueClasses = {};
    }
  
    // Find the index of the array with the lowest count
    let minIndex = 0;
    for (let i = 1; i < counts.length; i++) {
      if (counts[i] < counts[minIndex]) {
        minIndex = i;
      }
    }
  
    // Return the array with the lowest count
    return arr[minIndex];
  }

  //fill initial selectable gems list, and update based on search query
  useEffect(() => {
    
    let muleGemsFiltered = allGems.filter(gem => gem.name.toLowerCase().includes(searchTerm.toLowerCase()));
    muleGemsFiltered = muleGemsFiltered.sort((a, b) => (a.name > b.name ? 1 : -1));
    setBuildGems(muleGemsFiltered.filter((value, index, self) => {
      return self.findIndex(v => v.name === value.name) === index;
    }).map(gem => <div className='gemThumbContainer' onClick={() => selectGemFromList(gem)}>
        <div className='gemThumbPic'><img src='/media/Absolution_inventory_icon.png'></img></div>
        <div className='gemThumbOverlay'>{gem.name}</div>
      </div>
    ));
    console.log('useeffect 1');

  }, [searchTerm]);

  //needed?
  useEffect(() => {
    console.log('gem list:' + buildGemList);
    setGem(buildGemList);
  }, [buildGemList]);

  return (
    <div className='pageContainer'>
      <div className='pageName'>Ruthless Skill Gem Mule Guide</div>

      <div id='questGems'>
      </div>

      <div id='droppedGems'>
      </div>

      <div id='removedGems'>
      </div>

      <div id='muleGemPlanner'>
        <div id='searchGems'>
          <div id='searchGemsLabel'>Search Gems:</div>
          <input type='text' value={searchTerm} onChange={editSearchTerm} />
        </div>
        <div id='selectedGemContainer'><div id='sGemContainer'>{buildGems}</div></div>
        <div id='buildGems'>
          <button onClick={() => clearGemList()}>Reset</button>
          <div>Optimal mule path</div>
          <div id='selectMainBtns'>
            <button onClick={() => selectGemFromList('Templar')}>Templar</button>
            <button onClick={() => selectGemFromList('Marauder')}>Marauder</button>
            <button onClick={() => selectGemFromList('Duelist')}>Duelist</button>
            <button onClick={() => setMainClass('Ranger')}>Ranger</button>
            <button onClick={() => setMainClass('Shadow')}>Shadow</button>
            <button onClick={() => setMainClass('Witch')}>Witch</button>
            <button onClick={() => setMainClass('Scion')}>Scion</button>
          </div>
          <div id='buildGemsContainerOptimal'>{muleGemsFiltered.map(gem => <div className='gemIconContainer'>
            <div className='gemIconPic'><img src='/media/Absolution_skill_icon.png' alt='-------'/></div>
            <div className='gemIconName'>{gem.name}</div>
            <div className='gemIconContainerL'>
              <div className='gemIconClassLabel'>Class: </div>
              <div className='gemIconQuestLabel'>Quest: </div>
            </div>
            <div className='gemIconContainerR'>
              <div className='gemIconClass'>{gem.class}</div>
              <div className='gemIconQuest'>Act {gem.act}: {gem.quest}</div>
            </div>
            <div className='gemIconDelete' onClick={() => removeGemFromList(gem)}>X</div>
            </div>
            )} 
          </div>
          <div>All options</div>
          <div id='buildGemsContainer'>{muleGems.map(gem => <div className='gemIconContainer'>
            <div className='gemIconPic'><img src='/media/Absolution_skill_icon.png' alt='-------'/></div>
            <div className='gemIconName'>{gem.name}</div>
            <div className='gemIconContainerL'>
              <div className='gemIconClassLabel'>Class: </div>
              <div className='gemIconQuestLabel'>Quest: </div>
            </div>
            <div className='gemIconContainerR'>
              <div className='gemIconClass'>{gem.class}</div>
              <div className='gemIconQuest'>Act {gem.act}: {gem.quest}</div>
            </div>
            <div className='gemIconDelete' onClick={() => removeGemFromList(gem)}>X</div>
            </div>
            )} 
          </div>
        </div>
      </div>
    </div>
  );
}