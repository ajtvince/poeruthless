import React from 'react';
import { useState, useEffect } from 'react';
import './Stylesheets/GemGuide.css';
//show how to get the skills available from quests
//show removed gems
//show drop only gems
//select skill gems you plan to use, and system create guide to say what level to get each mule

export default function GemGuide() {

  const [buildGemList, setGem] = useState([{
    gemID: '',
    gemPic: '',
    obtain: '',
  }]);

  const [allGems, setAllGems] = useState(
    [
      {
        gemID: 'gem1',
        gemPic: 'gem1pic',
        obtain: 'quest',
      },
      {
        gemID: 'gem2',
        gemPic: 'gem2pic',
        obtain: 'drop',
      },
      {
        gemID: 'gem3',
        gemPic: 'gem3pic',
        obtain: 'quest',
      },
    ]
  );

  const [buildGems, setBuildGems] = useState([]);
  const [buildGemListDiv, setBuildGemList] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  function editSearchTerm(e) {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  }
  
  const questGemsData = ['cleave', 'explosive trap'];
  const droppedGemsData = ['lmp support', 'lightning dmg support', 'ignite support'];
  const removedGemsData = ['flame dash', 'dash'];
  
  const questGems = questGemsData.map(gem => <div className='gemContainer'>{gem}</div>);
  const droppedGems = droppedGemsData.map(gem => <div className='gemContainer'>{gem}</div>);
  const removedGems = removedGemsData.map(gem => <div className='gemContainer'>{gem}</div>);

  let muleGems = allGems.map(gem => <div>{gem.gemID}</div>);
  
  //get list of gems when searching for gem
  function getListOfGems() {

  }

  //here the buildGemList state is not updating until search changes - need to figure out why
  function selectGemFromList(gem) {
    setGem([
      ...buildGemList,
      {
        gemID: gem.gemID,
        gemPic: 'gemPic1',
        obtain: 'quest'
      }
    ]);
    //updateMuleList();
  }

  function updateMuleList() {
    buildGemList.forEach( gemObject => {
      console.log(gemObject.gemID);
    });
  }

  useEffect(() => {
    
    let muleGemsFiltered = allGems.filter(gem => gem.gemID.toLowerCase().includes(searchTerm.toLowerCase()));
    setBuildGems(muleGemsFiltered.map(gem => <div onClick={() => selectGemFromList(gem)}>{gem.gemID}</div>));
    console.log('useeffect 1');

  }, [searchTerm]);

  useEffect(() => {

    setBuildGemList(buildGemList.map(gem => <div className='gemContainer'>{gem.gemID}</div>));
    console.log(buildGemList);
    console.log('useeffect 2');

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
        <div id='buildGems'>{buildGemListDiv}</div>
      </div>
    </div>
  );
}