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
  const [muleGemsFiltered, setMuleGemsFiltered, muleGemsFilteredRef] = useState([]);
  const [actCount, setActCount, actCountRef] = useState([]);
  const [allGems, setAllGems] = useState(questData.questSkills);
  const [buildGems, setBuildGems] = useState([]);
  const [charsNeeded, setCharsNeeded, charsNeededRef] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [mainClass, setMainClass, mainClassRef] = useState('');

  //set constant to hold gem json data
  const questGemArr = questData.questSkills;

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

  //process optimal path
  function getRequiredMules(data) {
    
    if (data.length !== 0) {
    
      let selectedGems = data;
      let foundQuestGems = [];
      //console.log('data passed to getRequiredMules:');
      //console.log(selectedGems);
      setGem(selectedGems);

      selectedGems.forEach(gem => {
        questGemArr.filter(qgem => {
          if (qgem.name === gem.name) {
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

      //console.log(foundQuestGems);
      //console.log(uniques);
      let newFunc = uniqueNameCombinations(foundQuestGems);
      let backupFunc = Object.assign([], newFunc);
      //console.log(backupFunc);

      let lowestCount = Infinity;
      newFunc.forEach( arr => {
        let tempCount = countUniqueClasses(arr);
        if (tempCount < lowestCount) {
          lowestCount = tempCount;
        }
      });
      //console.log(lowestCount);

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

      //console.log(testArr);
      testArr.sort((a, b) => b - a);
      testArr.forEach( num => {
        let tempNum = num;
        newFunc.splice(tempNum, 1);
        //console.log(newFunc);
      })
      //console.log(newFunc);
      //here breaks if need more than one of same class
      let duplicateClass = false;
      if(newFunc.length === 0) {
        //console.log('you will need duplicate of the same character');
        //console.log(backupFunc);
        newFunc = backupFunc;
        duplicateClass = true;
      }
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

      //console.log(lowestDiffClassArr);
      let highestSingleClassCountTotalArr = [];
      let highestClassCount = 0;

      if (lowestDiffClassArr.length === 1) {
        for (let i=0; i<lowestDiffClassArr[0].length; i++) {
          if (lowestDiffClassArr[0].some(obj => haveSameClassAndQuest2(obj, lowestDiffClassArr[0][i]))) {
            //console.log('dupe found in single');
            lowestDiffClassArr = Object.assign([], newFunc);
            //console.log(newFunc);
            i = lowestDiffClassArr[0].length;
          }
        }
      }

      if (lowestDiffClassArr.length === 1) {
        //console.log('only one option');
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
        //console.log(highestClassCount);
        lowestDiffClassArr.forEach(arr => {
          let x = countClassNames(arr);
          let z = Object.values(x);
          let max = Math.max(...z);
          if (max === highestClassCount) {
            highestSingleClassCountTotalArr.push(arr);
          }
        });
        //console.log(highestSingleClassCountTotalArr);
        if(highestSingleClassCountTotalArr.length === 1) {
          //console.log('equals one');
          let tempCheckArr = [];
          let arrCount = 0;
          //console.log(highestSingleClassCountTotalArr);
          highestSingleClassCountTotalArr.forEach( arr2 => {
            let tempArrCount = 0;
            for (let i=0; i<arr2.length; i++) {
              //console.log(arr2.some(obj => haveSameClassAndQuest2(obj, arr2[i])));
              if (arr2.some(obj => haveSameClassAndQuest2(obj, arr2[i]))) {
                tempArrCount++;
                if (tempArrCount > 1) {
                  tempCheckArr.push(arrCount);
                  i = arr2.length;
                }
              }
            }
            arrCount++;
          });
    
          //console.log(tempCheckArr);
          tempCheckArr.sort((a, b) => b - a);
          tempCheckArr.forEach( num => {
            let tempNum = num;
            highestSingleClassCountTotalArr.splice(tempNum, 1);
          });

          if(highestSingleClassCountTotalArr.length === 0) {
            setMuleGemsFiltered(lowestDiffClassArr[0]);
            setMuleGems(foundQuestGems);
          } else {
            setMuleGemsFiltered(highestSingleClassCountTotalArr[0]);
            setMuleGems(foundQuestGems);
          }

          /**
          if(highestSingleClassCountTotalArr.length === 0) {
            //console.log('0');
            let hscStatus = true;
            while (hscStatus) {
              lowestDiffClassArr.forEach(arr => {
                let tempPC = 0;
                let x = countClassNames(arr);
                let z = Object.values(x);
                let max = Math.max(...z);
                if (max === highestClassCount) {
                  for(let p=0;p<arr.length;p++) {
                    if(arr.some( obj => haveSameClassAndQuest2(obj, arr[p]))){
                      tempPC++;
                      if (tempPC > 1) {
                        highestClassCount--;
                        p = arr.length;
                      }
                    }
                  }
                  if (tempPC === 1) {
                    setMuleGemsFiltered(arr);
                    setMuleGems(foundQuestGems);
                    hscStatus = false;
                  } else {
                    highestClassCount--;
                  }
                }
              });
            }
          } else {
            setMuleGemsFiltered(highestSingleClassCountTotalArr[0]);
            setMuleGems(foundQuestGems);
          }**/
        } else {
          if (mainClassRef.current !== '') {
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
              let tempCheckArr = [];
              let arrCount = 0;
              //console.log(highestSingleClassCountTotalArr);
              highestSingleClassCountTotalArr.forEach( arr2 => {
                for (let i=0; i<arr2.length; i++) {
                  //console.log(arr2.some(obj => haveSameClassAndQuest2(obj, highestSingleClassCountTotalArr[arrCount][i])));
                  if (arr2.some(obj => haveSameClassAndQuest2(obj, highestSingleClassCountTotalArr[arrCount][i]))) {
                    tempCheckArr.push(arrCount);
                    i = arr2.length;
                  }
                }
                arrCount++;
              });
        
              //console.log(tempCheckArr);
              tempCheckArr.sort((a, b) => b - a);
              tempCheckArr.forEach( num => {
                let tempNum = num;
                highestSingleClassCountTotalArr.splice(tempNum, 1);
              });
              setMuleGemsFiltered(highestSingleClassCountTotalArr[0]);
              setMuleGems(foundQuestGems);
            }
          } else {
            let tempCheckArr = [];
            let arrCount = 0;
            //console.log(highestSingleClassCountTotalArr);
            highestSingleClassCountTotalArr.forEach( arr2 => {
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
      
            //console.log(highestSingleClassCountTotalArr);
            let tempHighSing = Object.assign([],highestSingleClassCountTotalArr);
            //console.log(tempCheckArr);
            tempCheckArr.sort((a, b) => b - a);
            tempCheckArr.forEach( num => {
              let tempNum = (num);
              //console.log(tempNum);
              tempHighSing.splice(tempNum, 1);
            });
            //console.log(tempHighSing);
            setMuleGemsFiltered(tempHighSing[0]);
            setMuleGems(foundQuestGems);
          }
        }
      }
      //console.log(muleGemsFilteredRef.current);
      //console.log(countClassNames(muleGemsFilteredRef.current));
      
      //run through props on object, apply to shit
      let classActArr = [];
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
      //console.log(charsNeededRef.current);
      //console.log(classActArr);
      //add notification about duplicate class WIP WIP
      if (duplicateClass) {
        //console.log(Object.entries(charsNeeded));
        muleGemsFilteredRef.current.forEach( gem1 => {
          muleGemsFilteredRef.current.forEach( gem2 => {
            //console.log(haveSameClassAndQuest2(gem1, gem2));
            if (haveSameClassAndQuest2(gem1, gem2)) {
              //console.log(gem1.class);
              let tempCharArr = Object.keys(charsNeededRef.current);
              for (let x=0; x < Object.keys(charsNeededRef.current).length; x++) {
                if (tempCharArr[x] === gem1.class) {
                  //console.log('duplicate found add extra class');
                  classActArr[x] += '*';
                }
              }
            }
          });
        });
      }
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
    let muleGemsFiltered = allGems.filter(gem => (gem.name.toLowerCase().includes(searchTerm.toLowerCase()) || gem.types?.some(obj => obj.toLowerCase().includes(searchTerm.toLowerCase()))));
    //console.log(allGems.filter( gem => gem.types?.some(obj => obj.toLowerCase().includes(searchTerm.toLowerCase()))));
    muleGemsFiltered = muleGemsFiltered.sort((a, b) => (a.name > b.name ? 1 : -1));
    setBuildGems(muleGemsFiltered.filter((value, index, self) => self.findIndex(v => v.name === value.name) === index));
  }, [searchTerm]);

  return (
    <div className='pageContainer'>
      <div className='pageName'>Ruthless Skill Gem Mule Guide</div>
      <p id='gemPageName'><em>(This tool contains a list of all skill gems that are available as quest rewards through the acts. It will calculate the optimal path for getting all the selected skill gems with the least amount of characters and total leveling)</em></p>
      <div id='searchGems'>
        <div id='searchGemsLabel'>Search:</div>
        <input type='text' value={searchTerm} onChange={editSearchTerm} />
      </div>
      <div id='selectedGemContainer'><div id='sGemContainer'>{
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
          <div className='buildPathHeader'>Optimal mule path <span style={{fontSize:'.6rem', fontWeight:'400', display:'block'}}>(** after the number of an act indicates a duplicate character is required)</span></div>
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