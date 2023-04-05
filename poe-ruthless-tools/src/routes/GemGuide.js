import React from 'react';
import { useEffect, useRef } from 'react';
import useState from 'react-usestateref';
import './stylesheets/GemGuide.css';
import questData from './data/datatemp.json';
import GemCard from './components/GemCard';
import GemThumb from './components/GemThumb';
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
  const [mainClass, setMainClass, mainClassRef] = useState('');

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
      console.log('main class updated');
      console.log(selectedGem);
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
    console.log(selectedGem);
    const tempArrRm = buildGemList.filter(gem => gem.gemID !== selectedGem.name);
    setGem(tempArrRm);
    console.log(gemRef.current);
    getRequiredMules(gemRef.current);
  }

  //clear all gems from mule build list
  function clearGemList() {
    setGem([]);
    console.log('before');
    setMainClass('');
    console.log('after');
    console.log(gemRef.current);
    getRequiredMules(gemRef.current);
  }

  //select main class
  function selectMainClass(selectedClass) {
    if (selectedClass === mainClassRef.current) {
      setMainClass('');
    } else {
      setMainClass(selectedClass);
    }
  }

  function uniqueNameCombinations(input) {
    function generateCombinations(arr, k) {
      let combinations = [];
      let comb = [];
      
      function recur(idx, n) {
        if (comb.length === k) {
          combinations.push([...comb]);
          return;
        }
        for (let i = idx; i < n; i++) {
          comb.push(arr[i]);
          recur(i + 1, n);
          comb.pop();
        }
      }
      
      recur(0, arr.length);
      return combinations;
    }
  
    function hasUniqueNames(arr) {
      const names = arr.map(obj => obj.name);
      const uniqueNames = new Set(names);
      return names.length === uniqueNames.size;
    }
  
    let countOfUnique = countUniqueNames(input);
    const allCombinations = generateCombinations(input, countOfUnique);
    const uniqueNameCombinations = allCombinations.filter(hasUniqueNames);
    
    return uniqueNameCombinations;
  }

  function countUniqueNames(arr) {
    const uniqueNames = new Set(); // Create a new Set to store unique names
    arr.forEach(obj => {
      uniqueNames.add(obj.name); // Add each name property to the Set
    });
    return uniqueNames.size; // Return the number of unique names in the Set
  }

  function countUniqueClasses(arr) {
    const uniqueNames = new Set(); // Create a new Set to store unique names
    arr.forEach(obj => {
      uniqueNames.add(obj.class); // Add each name property to the Set
    });
    return uniqueNames.size; // Return the number of unique names in the Set
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
    return count;
  }

  function haveSameClassAndQuest2(obj1, obj2) {
    return obj1.class === obj2.class && obj1.quest === obj2.quest && obj1.name !== obj2.name;
  }

  //count duplicates, check if class exists already with chosen gems
  function getRequiredMules(data) {
    
    if (data.length !== 0) {
    
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

      //create list of non-duplicate gems
      let gemListCopy = Object.assign([], foundQuestGems);
      let uniques = [];
      gemListCopy.forEach(ungem => {
        let x = gemListCopy.filter(ugem => ugem.name === ungem.name).length;
        if (x === 1) {
          uniques.push(ungem);
        }
      });

      console.log(foundQuestGems);
      let newFunc = uniqueNameCombinations(foundQuestGems);
      console.log(newFunc);

      let lowestCount = Infinity;
      newFunc.forEach( arr => {
        let tempCount = countUniqueClasses(arr);
        if (tempCount < lowestCount) {
          lowestCount = tempCount;
        }
      });
      console.log(lowestCount);

      let testArr = [];
      let arrCount = 0;
      newFunc.forEach( arr => {
        for (let i=0; i<arr.length; i++) {
          if (arr.some(obj => haveSameClassAndQuest2(obj, arr[i]))) {
            testArr.push(arrCount);
            i = arr.length;
          }
        }
        arrCount++;
      });

      console.log(testArr);
      testArr.forEach( num => {
        let tempNum = testArr.length - (num+1);
        newFunc.splice(tempNum, 1);
      })
      console.log(newFunc);
      let lowestDiffClassArr = [];
      newFunc.forEach(arr => {
        if(countUniqueClasses(arr) === lowestCount) {
          lowestDiffClassArr.push(arr);
        }
      });
      if (lowestDiffClassArr.length === 0) {
        lowestCount += 1;
        newFunc.forEach(arr => {
          if(countUniqueClasses(arr) === lowestCount) {
            lowestDiffClassArr.push(arr);
          }
        });
      }

      console.log(lowestDiffClassArr);
      let highestSingleClassCountTotalArr = [];
      let highestClassCount = 0;

      if (lowestDiffClassArr.length === 1) {
        console.log('only one option');
        setMuleGemsFiltered(lowestDiffClassArr[0]);
        setMuleGems(foundQuestGems);
      } else {
        lowestDiffClassArr.forEach(arr => {
          //get the total count of the most common class
          let x = countClassNames(arr);
          let z = Object.values(x);
          let max = Math.max(...z);
          if(max > highestClassCount) {
            highestClassCount = max;
          }
        });
        console.log(highestClassCount);
        lowestDiffClassArr.forEach(arr => {
          let x = countClassNames(arr);
          let z = Object.values(x);
          let max = Math.max(...z);
          if (max === highestClassCount) {
            highestSingleClassCountTotalArr.push(arr);
          }
        });
        console.log(highestSingleClassCountTotalArr);
        if(highestSingleClassCountTotalArr.length === 1) {
          setMuleGemsFiltered(highestSingleClassCountTotalArr[0]);
          setMuleGems(foundQuestGems);
        } else {
          if (mainClassRef.current !== '') {
            let maxFound = false;
            highestSingleClassCountTotalArr.forEach( arr => {
              let checkClass = countClassNames(arr);
              console.log(checkClass[mainClassRef.current]);
              if(checkClass[mainClassRef.current] === highestClassCount) {
                setMuleGemsFiltered(arr);
                setMuleGems(foundQuestGems);
                maxFound = true;
              }
            });
            while (!maxFound) {
              for (let x=highestClassCount-1; x>0; x--) {
                highestSingleClassCountTotalArr.forEach( arr => {
                  let checkClass = countClassNames(arr);
                  console.log(checkClass[mainClassRef.current]);
                  if(checkClass[mainClassRef.current] === x) {
                    setMuleGemsFiltered(arr);
                    setMuleGems(foundQuestGems);
                    maxFound = true;
                  }
                });
                if(!maxFound && x===1) {
                  maxFound = true;
                }
              }

            }
          } else {
            setMuleGemsFiltered(highestSingleClassCountTotalArr[0]);
            setMuleGems(foundQuestGems);
          }
        }
      }
      console.log(muleGemsFiltered);
      console.log(countClassNames(muleGemsFiltered));
    } else {
      setMuleGemsFiltered([]);
      setMuleGems([]);
    }
  }

  useEffect(() => {
    let idArr = ['templarMain', 'marauderMain', 'duelistMain', 'rangerMain', 'shadowMain', 'witchMain', 'scionMain'];
    if(mainClassRef.current === '') {
      for (let x=0; x<idArr.length; x++) {
        document.getElementById(`${idArr[x]}`).style.backgroundColor = 'rgba(0, 0, 0, .4)';
        document.getElementById(`${idArr[x]}`).style.fontWeight = '400';
      }
      getRequiredMules(gemRef.current);
    } else {
      for (let x=0; x<idArr.length; x++) {
        console.log(idArr[x]);
        if (idArr[x].includes(mainClassRef.current.toLowerCase())) {
          document.getElementById(`${idArr[x]}`).style.backgroundColor = 'rgba(0, 0, 0, .8)';
          document.getElementById(`${idArr[x]}`).style.fontWeight = 'bold';
          getRequiredMules(gemRef.current);
        } else {
          document.getElementById(`${idArr[x]}`).style.backgroundColor = 'rgba(0, 0, 0, .4)';
          document.getElementById(`${idArr[x]}`).style.fontWeight = '400';
        }
      }
    }
  }, [mainClass]);

  //fill initial selectable gems list, and update based on search query
  useEffect(() => {
    let muleGemsFiltered = allGems.filter(gem => gem.name.toLowerCase().includes(searchTerm.toLowerCase()));
    muleGemsFiltered = muleGemsFiltered.sort((a, b) => (a.name > b.name ? 1 : -1));
    setBuildGems(muleGemsFiltered.filter((value, index, self) => self.findIndex(v => v.name === value.name) === index));
  }, [searchTerm]);

  return (
    <div className='pageContainer'>
      <div className='pageName'>Ruthless Skill Gem Mule Guide</div>
      <div id='searchGems'>
        <div id='searchGemsLabel'>Search Gems:</div>
        <input type='text' value={searchTerm} onChange={editSearchTerm} />
      </div>
      <div id='selectMainBtnHeader'>Select Primary Class<span><em>(If optimal path has multiple equivalent options, this will set the optimal path to the path with the highest count of the primary class)</em></span></div>
      <div id='selectMainBtns'>
        <button onClick={() => selectMainClass('Templar')}><img src='/media/Absolution_skill_icon.png'></img><div id='templarMain'>Templar</div></button>
        <button onClick={() => selectMainClass('Marauder')}><img src='/media/Absolution_skill_icon.png'></img><div id='marauderMain'>Marauder</div></button>
        <button onClick={() => selectMainClass('Duelist')}><img src='/media/Absolution_skill_icon.png'></img><div id='duelistMain'>Duelist</div></button>
        <button onClick={() => selectMainClass('Ranger')}><img src='/media/Absolution_skill_icon.png'></img><div id='rangerMain'>Ranger</div></button>
        <button onClick={() => selectMainClass('Shadow')}><img src='/media/Absolution_skill_icon.png'></img><div id='shadowMain'>Shadow</div></button>
        <button onClick={() => selectMainClass('Witch')}><img src='/media/Absolution_skill_icon.png'></img><div id='witchMain'>Witch</div></button>
        <button onClick={() => selectMainClass('Scion')}><img src='/media/Absolution_skill_icon.png'></img><div id='scionMain'>Scion</div></button>
      </div>
      <div id='selectedGemContainer'><div id='sGemContainer'>{
        buildGems.map(gem => <GemThumb gem={gem} selectGemFromList={selectGemFromList}/>)
      }</div></div>
      <div id='buildGems'>
        <button id='resetBtn' onClick={() => clearGemList()}>Reset</button>
        <div className='buildPathHeader'>Optimal mule path</div>
        <div id='uniqueClassCount'></div>
        <div className='buildGemsContainer'>
          {muleGemsFiltered.map(gem => <GemCard key={gem.class + '' + gem.name} gem={gem} optimal={true} removeGemFromList={removeGemFromList} />)}
        </div>
        <div className='buildPathHeader'>All gem options</div>
        <div className='buildGemsContainer'>
          {muleGems.map(gem => <GemCard gem={gem} optimal={false} removeGemFromList={removeGemFromList} />)} 
        </div>
      </div>
    </div>
  );
}