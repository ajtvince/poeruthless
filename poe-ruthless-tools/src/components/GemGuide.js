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
  const [muleGems, setMuleGems] = useState([])
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
    let tempDuelistCount = foundQuestGems.filter(fgem => fgem.class === 'Duelist' ).length;
    let tempRangerCount = foundQuestGems.filter(fgem => fgem.class === 'Ranger' ).length;
    let tempMarauderCount = foundQuestGems.filter(fgem => fgem.class === 'Marauder' ).length;
    let tempWitchCount = foundQuestGems.filter(fgem => fgem.class === 'Witch' ).length;
    let tempTemplarCount = foundQuestGems.filter(fgem => fgem.class === 'Templar' ).length;
    let tempShadowCount = foundQuestGems.filter(fgem => fgem.class === 'Shadow' ).length;
    let tempScionCount = foundQuestGems.filter(fgem => fgem.class === 'Scion' ).length;
    let duplicateGemList = [];

    foundQuestGems.forEach(fgem1 => {
      foundQuestGems.forEach(fgem2 => {
        if(fgem1.name === fgem2.name && fgem1.class !== fgem2.class) {
          //compareDuplicateGems(fgem1, fgem2);
          let tempFilter = duplicateGemList.filter(dupgem => dupgem === fgem1.name ).length;
          if ( tempFilter > 0 ) {
            //console.log('same');
          } else {
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
    let filteredNoDupe = foundQuestGems;
    duplicateGemList.forEach(dpgem => {
      let tempCount = 0;
      while (tempCount < 1) {
        foundQuestGems.forEach(fdpgem => {
          if (dpgem === fdpgem.name) {
            filteredNoDupe = filteredNoDupe.filter(fndgem => fndgem.name !== dpgem);
            tempCount++;
          }
        });
      }

    });
    console.log(filteredNoDupe);

    //console.log('counted tc1 tc2');
    //console.log(tc1max + ' ----- ' + tc2max);
    //console.log(tc1class + ' ----- ' + tc2class);
    //console.log(foundQuestGems);
    //console.log('full');
    //console.log(questGemArr);
    //console.log('dupl');
    //console.log(duplicateGemList);

    setMuleGems(foundQuestGems);
  }

  function compareDuplicateGems(fgem1, fgem2) {

  }



  useEffect(() => {
    
    let muleGemsFiltered = allGems.filter(gem => gem.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setBuildGems(muleGemsFiltered.map(gem => <div onClick={() => selectGemFromList(gem)}>{gem.name}</div>));
    console.log('useeffect 1');

  }, [searchTerm]);

  useEffect(() => {
    console.log('gem list:' + buildGemList);
    setGem(buildGemList);
  }, [buildGemList]);

  return (
    <div className='pageContainer'>
      <div className='pageName'>Ruthless Skill Gem Guide</div>

      <div id='questGems'>
      </div>

      <div id='droppedGems'>
      </div>

      <div id='removedGems'>
      </div>

      <div id='muleGemPlanner'>
        <div id='selectedGemContainer'>{buildGems}</div>
        <div id='muleGemSelection' onClick={getListOfGems}>+</div>
        <div id='searchGems'><input type='text' value={searchTerm} onChange={editSearchTerm} /></div>
        <div id='buildGems'> {muleGems.map(gem => <div>{gem.name}{gem.class}{gem.act}{gem.quest}<div onClick={() => removeGemFromList(gem)}>del</div></div>)} </div>
      </div>
    </div>
  );
}