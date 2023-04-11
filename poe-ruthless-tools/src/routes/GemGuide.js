import React from 'react';
import { useEffect, useRef } from 'react';
import useState from 'react-usestateref';
import './stylesheets/GemGuide.css';
import questData from './data/datatemp.json';
import gemData from './data/gemData.json';
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
  const [muleGemsFiltered, setMuleGemsFiltered, muleGemsFilteredRef] = useState([]);
  const [actCount, setActCount, actCountRef] = useState([]);
  const [allGems, setAllGems] = useState(questData.questSkills);
  const [allGemData, setGemData] = useState(gemData);
  const [buildGems, setBuildGems] = useState([]);
  const [charsNeeded, setCharsNeeded, charsNeededRef] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [mainClass, setMainClass, mainClassRef] = useState('');

  //set constant to hold gem json data
  const questGemArr = questData.questSkills;

  allGems.forEach( gem => {
    allGemData.forEach( gem2 => {
      if (gem.name === gem2.name) {
        gem.types = gem2.gemTags;
        //console.log(gem);
      }
    });
  });



  //set searchTerm state to value in input box
  function editSearchTerm(e) {
    setSearchTerm(e.target.value);
    //console.log(searchTerm);
  }

  //trigger when clicking gem from selectable gem list
  function selectGemFromList(selectedGem) {
    //set temp variables
    if (typeof selectedGem === 'string') {
      setMainClass(selectedGem);
      //console.log('main class updated');
      //console.log(selectedGem);
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
      //console.log(gemRef.current.length);
      //console.log(tempArr);
      tempArr.forEach(gem => {
        if (gem.name === selectedGem.name) {
          tempCond = false;
        }
        if (buildGemList.length === 1 && gem.name !== selectedGem.name) {
          tempCond = true;
        }
      });
    }

    //if gem not found in current mule build list, add gem to state variable and push new gem to temp array
    if (tempCond) {
      setGem([
        ...buildGemList,
        selectedGem
      ]);

      tempArr.push(selectedGem);

      //update mule build list based on temp array
      getRequiredMules(tempArr);
    } else if(!tempCond) {
      removeGemFromList(selectedGem);
    }
  }

  //remove selected gem from mule build list
  function removeGemFromList(selectedGem) {
    //console.log(selectedGem);
    const tempArrRm = buildGemList.filter(gem => gem.name !== selectedGem.name);
    setGem(tempArrRm);
    //console.log(gemRef.current);
    getRequiredMules(gemRef.current);
  }

  //clear all gems from mule build list
  function clearGemList() {
    setGem([]);
    //console.log('before');
    setMainClass('');
    setSearchTerm('');
    //console.log('after');
    //console.log(gemRef.current);
    getRequiredMules(gemRef.current);
    setCharsNeeded({});
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
          if (hasUniqueNames([...comb])) {
            combinations.push([...comb]);
          }
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
    //console.log(countOfUnique);
    const allCombinations = generateCombinations(input, countOfUnique);
    //console.log(allCombinations);
    let returnArr = [];
    if (mainClassRef.current !== '') {
      let x = 0;
      allCombinations.forEach( arr => {
        let y = countClassNames(arr);
        let z = y[mainClassRef.current];
        if (z >= x) {
          x = z;
        }
      });
      allCombinations.forEach( arr => {
        let y = countClassNames(arr);
        let z = y[mainClassRef.current];
        if (z === x || z === x-1) {
          returnArr.push(arr);
        }
      });
    }

    if (returnArr.length === 0 ) {
      returnArr = Object.assign([], allCombinations);
    }
    //const uniqueNameCombinations = allCombinations.filter(hasUniqueNames);
    ////console.log(uniqueNameCombinations);
    //console.log(returnArr);
    return returnArr;
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

  function getArrayWithoutQuestDupe(currArr) {
    let tempCheckArr = [];
    let arrCount = 0;
    //console.log(highestSingleClassCountTotalArr);
    currArr.forEach( arr2 => {
      let tempCount1 = 0;
      for (let i=0; i<arr2.length; i++) {
        //console.log(arr2.some(obj => haveSameClassAndQuest2(obj, arr2[i])));
        if (arr2.some(obj => haveSameClassAndQuest2(obj, arr2[i]))) {
          //console.log(arr2[i]);
          tempCount1++;
          if (tempCount1 > 1) {
            tempCheckArr.push(arrCount);
            i = arr2.length;
            //console.log('push ' + arrCount);
          }
        }
      }
      arrCount++;
    });

    tempCheckArr.sort((a, b) => b - a);
    tempCheckArr.forEach( num => {
      let tempNum = num;
      currArr.splice(tempNum, 1);
    });

    return currArr;
  }

  //process optimal path
  function getRequiredMules(data) {
    
    if (data.length !== 0) {
    
      let selectedGems = data;
      let foundQuestGems = [];
      setGem(selectedGems);

      selectedGems.forEach(gem => {
        questGemArr.filter(qgem => {
          if (qgem.name === gem.name) {
            foundQuestGems.push(qgem);
          }
        });
      });

      //create copy list of gems
      let gemListCopy = Object.assign([], foundQuestGems);
      let newFunc = uniqueNameCombinations(foundQuestGems);
      let backupFunc = Object.assign([], newFunc);

      //console.log(newFunc);
      let noDupeArr = getArrayWithoutQuestDupe(newFunc);
      //console.log(noDupeArr);
      let duplicateClass = false;
      //check if noDupeArr returned empty or not
      if(noDupeArr.length === 0) {
        noDupeArr = Object.assign([], backupFunc);
        duplicateClass = true;
      }

      let lowestCount = Infinity;
      noDupeArr.forEach( arr => {
        let tempCount = countUniqueClasses(arr);
        if (tempCount < lowestCount) {
          lowestCount = tempCount;
        }
      });
      //console.log(lowestCount);

      //create new arr with lowest count of unique classes
      let lowestDiffClassArr = [];
      noDupeArr.forEach(arr => {
        if(countUniqueClasses(arr) === lowestCount) {
          lowestDiffClassArr.push(arr);
        }
      });

      //console.log(noDupeArr);
      //console.log(lowestDiffClassArr);
      let optimalPathFound = false;
      //if no arrays with unique classes at lowest count, increase number of unique classes by 1 until count found
      if (lowestDiffClassArr.length === 0) {
        let foundUniqueStatus = false;
        while(!foundUniqueStatus) {
          lowestCount += 1;
          let tempUStatus = false;
          if (lowestCount > noDupeArr[0].length) {
            //console.log('could not determine path/requires duplicates');
            setMuleGemsFiltered(noDupeArr[0]);
            setMuleGems(foundQuestGems);
            optimalPathFound = true;
          }
          noDupeArr.forEach(arr => {
            if(countUniqueClasses(arr) === lowestCount) {
              lowestDiffClassArr.push(arr);
              tempUStatus = true;
            }
          });
          if (tempUStatus) {
            foundUniqueStatus = true;
          }
        }
      //if arrays with unique classes is only 1, double check
      } else if(lowestDiffClassArr.length === 1) {
        
        //console.log(lowestDiffClassArr);
        let tempLowestDiffClassArr = getArrayWithoutQuestDupe(lowestDiffClassArr);
        
        if (tempLowestDiffClassArr.length === 1) {
          //console.log('only one option');
          setMuleGemsFiltered(lowestDiffClassArr[0]);
          setMuleGems(foundQuestGems);
          optimalPathFound = true;
        } else {
          lowestDiffClassArr = Object.assign([], noDupeArr);
        }
      }

      //run through logic if path not found
      if (!optimalPathFound) {

        let highestSingleClassCountTotalArr = [];
        let highestClassCount = 0;
        //get the total count of the most common class
        lowestDiffClassArr.forEach(arr => {
          let x = countClassNames(arr);
          let z = Object.values(x);
          let max = Math.max(...z);
          if(max > highestClassCount) {
            highestClassCount = max;
          }
        });
        //get array filled with paths with highest single class count
        lowestDiffClassArr.forEach(arr => {
          let x = countClassNames(arr);
          let z = Object.values(x);
          let max = Math.max(...z);
          if (max === highestClassCount) {
            highestSingleClassCountTotalArr.push(arr);
          }
        });
        //console.log(highestSingleClassCountTotalArr);
        //console.log(highestSingleClassCountTotalArr);
        //if only one class, set path
        if(highestSingleClassCountTotalArr.length === 1) {
          //console.log('highest class count is only 1 path');
          //console.log(highestSingleClassCountTotalArr);
          let tempCheckArr = getArrayWithoutQuestDupe(highestSingleClassCountTotalArr);
          //console.log(tempCheckArr);
          if(tempCheckArr.length !== 0) {
            setMuleGemsFiltered(highestSingleClassCountTotalArr[0]);
            setMuleGems(foundQuestGems);
            optimalPathFound = true;
          } else {
            highestSingleClassCountTotalArr = Object.assign([], lowestDiffClassArr);
          }
        }

        if(mainClassRef.current !== '' && !optimalPathFound) {
          let maxFound = false;
          let mainClassFound = false;
          highestSingleClassCountTotalArr.forEach( arr => {
            let checkClass = countClassNames(arr);
            //console.log(typeof checkClass[mainClassRef.current]);
            //code breaking here if removing gem with mainclass selected and it is last gem for mainclass and multiple possible options remain
            if (typeof checkClass[mainClassRef.current] !== 'undefined') {
              mainClassFound = true;
              if(checkClass[mainClassRef.current] === highestClassCount) {
                setMuleGemsFiltered(arr);
                setMuleGems(foundQuestGems);
                optimalPathFound = true;
                maxFound = true;
              }
            }
          });
          //console.log('next up while loop');
          //console.log(mainClassFound);
          while (!maxFound && mainClassFound) {
            for (let x=highestClassCount-1; x>0; x--) {
              highestSingleClassCountTotalArr.forEach( arr => {
                let checkClass = countClassNames(arr);
                //console.log(checkClass[mainClassRef.current]);
                if(checkClass[mainClassRef.current] === x) {
                  setMuleGemsFiltered(arr);
                  setMuleGems(foundQuestGems);
                  optimalPathFound = true;
                  maxFound = true;
                }
              });
              if(!maxFound && x===1) {
                maxFound = true;
              }
            }
          }
          if (!mainClassFound) {
            //console.log('selected class not found in any array')
            //console.log(highestSingleClassCountTotalArr);
            //let tempCheckArr = getArrayWithoutQuestDupe(highestSingleClassCountTotalArr);
            //console.log(tempCheckArr);
            //console.log(highestSingleClassCountTotalArr[0]);
            setMuleGemsFiltered(highestSingleClassCountTotalArr[0]);
            setMuleGems(foundQuestGems);
            optimalPathFound = true;
          }
        } else if (!optimalPathFound) {

          //console.log(highestSingleClassCountTotalArr);
          //let tempCheckArr = getArrayWithoutQuestDupe(highestSingleClassCountTotalArr);
          //console.log(tempCheckArr);
          //if (tempCheckArr.length === 0) {
            //console.log('no great path');
            //console.log(lowestDiffClassArr);
            //console.log(highestSingleClassCountTotalArr);
            setMuleGemsFiltered(highestSingleClassCountTotalArr[0]);
            setMuleGems(foundQuestGems);
          //} else {
            //setMuleGemsFiltered(tempCheckArr[0]);
            //setMuleGems(foundQuestGems);
          //}
          //console.log(highestSingleClassCountTotalArr);
          //let tempHighSing = Object.assign([],highestSingleClassCountTotalArr);
          //console.log(tempCheckArr);
          //console.log(tempHighSing);
        }
        
        //console.log(muleGemsFilteredRef.current);
        //console.log(countClassNames(muleGemsFilteredRef.current));
      }
      //run through props on object, apply to shit
      let classActArr = [];
      //console.log('breaks here?');
      //console.log(muleGemsFilteredRef.current);
      setCharsNeeded(countClassNames(muleGemsFilteredRef.current));
      //console.log(Object.keys(charsNeededRef.current));
      Object.keys(charsNeededRef.current).forEach( cl => {
        let x=0;
        muleGemsFilteredRef.current.forEach( arr => {
          if (arr.act > x && arr.class === cl) {
            x = arr.act;
          }
        });
        classActArr.push(x);
      });
      const allClassActArr = Object.assign([],classActArr);
      //console.log(charsNeededRef.current);
      //console.log(classActArr);
      //add notification about duplicate class WIP WIP
      if (duplicateClass) {
        let tempDupCount = 0;
        muleGemsFilteredRef.current.forEach( gem1 => {
          //console.log('resetFirstArr');
          muleGemsFilteredRef.current.forEach( gem2 => {
            //console.log(haveSameClassAndQuest2(gem1, gem2));
            if (haveSameClassAndQuest2(gem1, gem2)) {
              //console.log(gem1.class);
              let tempCharArr = Object.keys(charsNeededRef.current);
              for (let x=0; x < Object.keys(charsNeededRef.current).length; x++) {
                if (tempCharArr[x] === gem1.class) {
                  tempDupCount++;
                  //console.log('duplicate found');  
                  if (tempDupCount % 2 === 0) {      
                    //console.log(tempDupCount);
                    classActArr[x] = allClassActArr[x] + ' (x' + (tempDupCount / 2 + 1) + ')';
                  }
                }
              }
            }
          });
        });
      }
      //console.log(classActArr);
      setActCount(classActArr);
      
    } else {
      setMuleGemsFiltered([]);
      setMuleGems([]);
      setCharsNeeded({});
    }
  }

  useEffect(() => {
    let idArr = ['templarMain', 'marauderMain', 'duelistMain', 'rangerMain', 'shadowMain', 'witchMain', 'scionMain'];
    if(mainClassRef.current === '') {
      for (let x=0; x<idArr.length; x++) {
        document.getElementById(`${idArr[x]}`).style.backgroundColor = 'rgba(0, 0, 0, .2)';
        document.getElementById(`${idArr[x]}`).style.fontWeight = '400';
        document.getElementById(`${idArr[x]}`).style.color = 'whitesmoke';
        document.getElementById(`${idArr[x]}`).style.border = 'none';
      }
      getRequiredMules(gemRef.current);
    } else {
      for (let x=0; x<idArr.length; x++) {
        if (idArr[x].includes(mainClassRef.current.toLowerCase())) {
          document.getElementById(`${idArr[x]}`).style.backgroundColor = 'rgba(0, 0, 0, .8)';
          document.getElementById(`${idArr[x]}`).style.fontWeight = 'bold';
          document.getElementById(`${idArr[x]}`).style.color = '#e8ba7f';
          document.getElementById(`${idArr[x]}`).style.border = '2px solid green';
          getRequiredMules(gemRef.current);
        } else {
          document.getElementById(`${idArr[x]}`).style.backgroundColor = 'rgba(0, 0, 0, .2)';
          document.getElementById(`${idArr[x]}`).style.fontWeight = '400';
          document.getElementById(`${idArr[x]}`).style.color = 'whitesmoke';
          document.getElementById(`${idArr[x]}`).style.border = 'none';
        }
      }
    }
  }, [mainClass]);

  //fill initial selectable gems list, and update based on search query
  useEffect(() => {
    //console.log(allGems);
    let muleGemsFiltered = allGems.filter(gem => (gem.name.toLowerCase().includes(searchTerm.toLowerCase()) || gem.types?.some(obj => obj.toLowerCase().includes(searchTerm.toLowerCase()))));
    //console.log(allGems.filter( gem => gem.types?.some(obj => obj.toLowerCase().includes(searchTerm.toLowerCase()))));
    muleGemsFiltered = muleGemsFiltered.sort((a, b) => (a.name > b.name ? 1 : -1));
    setBuildGems(muleGemsFiltered.filter((value, index, self) => self.findIndex(v => v.name === value.name) === index));
  }, [searchTerm]);

  return (
    <div className='pageContainer'>
      <div className='pageName'>Ruthless Skill Gem Mule Guide</div>
      <p id='gemPageName'><em>(This tool contains a list of all skill gems that are available as quest rewards through the acts in ruthless. You can search by gem name or type.)</em></p>
      <div id='searchGems'>
        <div id='searchGemsLabel'>Search:</div>
        <input type='text' value={searchTerm} onChange={editSearchTerm} />
      </div>
      <div id='selectGemTypeBtns'>
          <button onClick={() => { if(searchTerm.toLowerCase() === 'melee') {setSearchTerm('')} else {setSearchTerm('melee')}}}>Melee</button>
          <button onClick={() => { if(searchTerm.toLowerCase() === 'bow') {setSearchTerm('')} else {setSearchTerm('bow')}}}>Bow</button>
          <button onClick={() => { if(searchTerm.toLowerCase() === 'attack') {setSearchTerm('')} else {setSearchTerm('attack')}}}>Attack</button>
          <button onClick={() => { if(searchTerm.toLowerCase() === 'spell') {setSearchTerm('')} else {setSearchTerm('spell')}}}>Spell</button>
          <button onClick={() => { if(searchTerm.toLowerCase() === 'aoe') {setSearchTerm('')} else {setSearchTerm('aoe')}}}>AoE</button>
          <button onClick={() => { if(searchTerm.toLowerCase() === 'minion') {setSearchTerm('')} else {setSearchTerm('minion')}}}>Minion</button>
      </div>
      <div id='selectedGemContainer'>
        <div id='sGemContainer'>{
        buildGems.map(gem => <GemThumb gem={gem} buildList={muleGemsFilteredRef.current} selectGemFromList={selectGemFromList}/>)
      }</div></div>
      <div id='buildGems'>
        <button id='resetBtn' onClick={() => clearGemList()}>Reset</button>
        <div id='selectMainBtnHeader'>Select Primary Class (Optional)<span><em>(If a primary class is selected, this will set the optimal path to the path with the highest possible number of gem unlocks for that specific class, while optimizing the rest of the classes required. NOTE: This may create suboptimal paths)</em></span></div>
        <div id='selectMainBtns'>
          <button onClick={() => selectMainClass('Templar')}><img src='/media/Templar_character_class.png'></img><div id='templarMain'>Templar</div></button>
          <button onClick={() => selectMainClass('Marauder')}><img src='/media/Marauder_character_class.png'></img><div id='marauderMain'>Marauder</div></button>
          <button onClick={() => selectMainClass('Duelist')}><img src='/media/Duelist_character_class.png'></img><div id='duelistMain'>Duelist</div></button>
          <button onClick={() => selectMainClass('Ranger')}><img src='/media/Ranger_character_class.png'></img><div id='rangerMain'>Ranger</div></button>
          <button onClick={() => selectMainClass('Shadow')}><img src='/media/Shadow_character_class.png'></img><div id='shadowMain'>Shadow</div></button>
          <button onClick={() => selectMainClass('Witch')}><img src='/media/Witch_character_class.png'></img><div id='witchMain'>Witch</div></button>
          <button onClick={() => selectMainClass('Scion')}><img src='/media/Scion_character_class.png'></img><div id='scionMain'>Scion</div></button>
        </div>
        <div id='uniqueClassCount'></div>
        <div className='buildGemsContainer'>
          <div className='buildPathHeader'>Optimal mule path <span style={{fontSize:'.6rem', fontWeight:'400', display:'block'}}>(x# after the act number indicates the # of duplicate characters needed)</span></div>
          <div>{Object.entries(charsNeeded).map( (char, index) => 
          <div class='charNeededContainer'>
            <div class='charNeededName'>{char[0]}</div>
            <div class='charNeededAct'>Act: {actCountRef.current[index]}</div>
          </div>
          )}</div>
          {muleGemsFiltered.map(gem => <GemCard key={gem.class + '' + gem.name} gem={gem} optimal={true} removeGemFromList={removeGemFromList} />)}
        </div>
        <div className='buildGemsContainer'>
          <div className='buildPathHeader'>All gem options</div>
          {muleGems.map(gem => <GemCard gem={gem} optimal={false} removeGemFromList={removeGemFromList} />)} 
        </div>
      </div>
    </div>
  );
}