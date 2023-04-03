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

  const [buildGemList, setGem, gemRef] = useState([]);
  const [muleGems, setMuleGems] = useState([]);
  const [muleGemsFiltered, setMuleGemsFiltered] = useState([]);
  const [allGems, setAllGems] = useState(questData.questSkills);

  const [buildGems, setBuildGems] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const questGemArr = questData.questSkills;
  console.log(questGemArr);

  function editSearchTerm(e) {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  }

  //const questGemsData = ['cleave', 'explosive trap'];
  //const droppedGemsData = ['lmp support', 'lightning dmg support', 'ignite support'];
  //const removedGemsData = ['flame dash', 'dash'];
  //const questGems = questGemsData.map(gem => <div className='gemContainer'>{gem}</div>);
  //const droppedGems = droppedGemsData.map(gem => <div className='gemContainer'>{gem}</div>);
  //const removedGems = removedGemsData.map(gem => <div className='gemContainer'>{gem}</div>);
  
  //get list of gems when searching for gem
  function getListOfGems() {

  }

  //here the buildGemList state is not updating until search changes - need to figure out why
  function selectGemFromList(selectedGem) {
    let tempCond = true;
    let tempArr = gemRef.current;
    let tempID = buildGemList.length;
    if (tempID < 0) {
      tempID = 0 + Math.random() * 100;
    } else {
      tempID = tempID + Math.random() * 100;
    }

    console.log(buildGemList.length);
    console.log(buildGemList);
    console.log(tempArr);
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

    console.log(tempCond);

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

      console.log(tempArr);

  //    setMuleGems(tempArr);
      getRequiredMules(tempArr);
    }
  }

  function removeGemFromList(selectedGem) {
    const tempArrRm = buildGemList.filter(gem => gem.gemID !== selectedGem.name);
    console.log(tempArrRm);
    console.log(selectedGem);
    //console.log('before');
    //console.log(buildGemList);
    //console.log('after');
    console.log(tempArrRm);
    setGem(tempArrRm);
    getRequiredMules(gemRef.current)
  }

  function clearGemList() {
    setGem([]);
    getRequiredMules(gemRef.current)
  }
  //count duplicates, check if class exists already with chosen gems
  function getRequiredMules(data) {
    //let selectedGems = data;
    let selectedGems = data;
    let foundQuestGems = [];
    console.log(selectedGems);
    setGem(selectedGems);

    selectedGems.forEach(gem => {
      questGemArr.filter(qgem => {
        if (qgem.name === gem.gemID) {
          foundQuestGems.push(qgem);
        }
      });
    });

    let tempClassCompare = [];
    let tc1max = 0;
    let tc2max = 0;
    let tc1class;
    let tc2class;

    let duplicateGemList = [];

    foundQuestGems.forEach(fgem1 => {
      foundQuestGems.forEach(fgem2 => {
        if(fgem1.name === fgem2.name && fgem1.class !== fgem2.class) {
          //compareDuplicateGems(fgem1, fgem2);
          let tempFilter = duplicateGemList.filter(dupgem => dupgem === fgem1.name ).length;
          console.log(tempFilter);
          if ( tempFilter == 0 ) {
            //console.log('same');
            duplicateGemList.push(fgem1.name);
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
    /**
    let filteredNoDupe = foundQuestGems;
    let tempCount = 0;
    duplicateGemList.forEach(dpgem => {
      while (tempCount < 1) {
        console.log('while loop');
        foundQuestGems.forEach(fdpgem => {
          if (dpgem === fdpgem.name) {
            console.log(filteredNoDupe);
            filteredNoDupe = filteredNoDupe.filter(fndgem => fndgem.name !== dpgem);
            tempCount++;
            console.log('duplicate found' + dpgem);
          }
        });
      }
      console.log('reset count');
      tempCount = 0;
    });
    console.log(filteredNoDupe);
    console.log(duplicateGemList);
    console.log(foundQuestGems);
    let optimalQuestPath = getOptimalPath(foundQuestGems, duplicateGemList);
    console.log(optimalQuestPath);
    let tempA = foundQuestGems;
    optimalQuestPath.forEach(dup => {
      foundQuestGems.forEach(fg => {
        console.log(dup);
        console.log(fg);
        if(dup.name === fg.name && dup.class !== fg.class) {
          console.log('remove item');
          let y = tempA.indexOf(dup);
          console.log(y);
          console.log(tempA);
          tempA.splice(y, 1);
          console.log(tempA);
        } 
      });
    });
    **/

    let optimalQuestPath = getOptimalPath(foundQuestGems, duplicateGemList);
    let newOptimalPath = getBestPath(foundQuestGems);
    console.log(optimalQuestPath);
    console.log(foundQuestGems);

    let allFQG = Object.assign([], foundQuestGems);
    console.log(allFQG);
    allFQG.forEach(qg => {
      optimalQuestPath.forEach(oqg => {
        if (qg.name === oqg.name && qg.class !== oqg.class) {
          console.log('remove item');
          console.log(qg);
          let x = allFQG.indexOf(qg);
          console.log(x);
          console.log(allFQG);
          allFQG.splice(x, 1);
          console.log(allFQG);
          console.log(foundQuestGems);
        }
      });
    });

    


    //console.log('counted tc1 tc2');
    //console.log(tc1max + ' ----- ' + tc2max);
    //console.log(tc1class + ' ----- ' + tc2class);
    //console.log(foundQuestGems);
    //console.log('full');
    //console.log(questGemArr);
    //console.log('dupl');
    //console.log(duplicateGemList);
    //setMuleGemsFiltered(optimalQuestPath);
    setMuleGemsFiltered(newOptimalPath);
    setMuleGems(foundQuestGems);
  }

  function getBestPath(data) {
    const uniqueNames = [...new Set(data.map(item => item.name))];

    const reducedArrays = [];

    for (let i = 0; i < Math.pow(2, uniqueNames.length); i++) {
      const reducedArray = [];

      for (let j = 0; j < uniqueNames.length; j++) {
        if (i & (1 << j)) {
          const item = data.find(item => item.name === uniqueNames[j]);
          reducedArray.push(item);
        }
      }

      console.log(reducedArray);

      const isUnique = reducedArrays.every(array => {
        if (array.length !== reducedArray.length) {
          return true;
        }

        for (let k = 0; k < array.length; k++) {
          if (array[k].name !== reducedArray[k].name) {
            return true;
          }
        }

        return true;
      });

      if (isUnique) {
        reducedArrays.push(reducedArray);
      }
    }

    console.log(reducedArrays);
    let z = reducedArrays.length-1;
    return reducedArrays[z];
  }

  function getOptimalPath(data, dupeData) {
    let tempClassCount = [];
    let filteredData = [];
    tempClassCount.push({class: 'Duelist', count: data.filter(fgem => fgem.class === 'Duelist' ).length});
    tempClassCount.push({class: 'Ranger', count: data.filter(fgem => fgem.class === 'Ranger' ).length});
    tempClassCount.push({class: 'Marauder', count: data.filter(fgem => fgem.class === 'Marauder' ).length});
    tempClassCount.push({class: 'Witch', count: data.filter(fgem => fgem.class === 'Witch' ).length});
    tempClassCount.push({class: 'Templar', count: data.filter(fgem => fgem.class === 'Templar' ).length});
    tempClassCount.push({class: 'Shadow', count: data.filter(fgem => fgem.class === 'Shadow' ).length});
    tempClassCount.push({class: 'Scion', count: data.filter(fgem => fgem.class === 'Scion' ).length});
    console.log(tempClassCount);
    let maxCount=1;
    let maxClass;
    tempClassCount.forEach(classC => {
      if(classC.count > maxCount) {
        maxClass = classC.class;
        maxCount = classC.count;
      }
    });
    if (maxCount === 1) {
      return filteredData = data;
    }
    dupeData.forEach(dupeName => {
      let tempFilteredData = [];
      let tempFiltered = allGems.filter(gem => gem.name.toLowerCase().includes(dupeName.toLowerCase()));
      console.log(tempFiltered);
      let dupeCounter=0;
      while (dupeCounter=0) {
        tempFiltered.forEach(filgem => {
          if(filgem.class === maxClass) {
            tempFilteredData = filgem;
            dupeCounter=1;
            console.log(filgem);
          } 
        });
        console.log(filteredData);
        filteredData.push(tempFilteredData);
      }

    });
    console.log(filteredData);
    return filteredData;
  }



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