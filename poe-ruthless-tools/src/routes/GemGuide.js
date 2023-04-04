import React from 'react';
import { useEffect, useRef } from 'react';
import useState from 'react-usestateref';
import './stylesheets/GemGuide.css';
import questData from './data/datatemp.json';
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
    setMainClass(selectedClass);
    console.log(mainClassRef.current);
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
      //get optimalpath for mule
      const uniqueCombos = findUniqueCombos(foundQuestGems);
      const filteredSkills = filterSkills(foundQuestGems);
      console.log(uniqueCombos);
      console.log(filteredSkills);
      
      //further parse the array
      let correctCombos = [];
      uniqueCombos.forEach(arr => {
        if(arr.length === uniqueCombos[0].length) {
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
          if (max >= classMaxCount) {
            classMaxCount = max;
            if (mainClass !== '' && x[mainClass] === max) {
              minOptimalPath.push(arr);
            } else if (mainClass === '') {
              minOptimalPath.push(arr);
            } else if (mainClass !== arr.class && minOptimalPath.length === 0) {
              minOptimalPath.push(arr);
            }
          }
        }
      });

      console.log(minOptimalPath);
      let bestPossiblePath = getBestPath(minOptimalPath);
      console.log(bestPossiblePath);

      if(bestPossiblePath.length < filteredSkills.length) {
        setMuleGemsFiltered(filteredSkills);
      } else {
        setMuleGemsFiltered(bestPossiblePath);
      }

      setMuleGems(foundQuestGems);
    } else {
      setMuleGemsFiltered([]);
      setMuleGems([]);
    }
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

  function filterSkills(skills) {
    const uniqueSkills = skills.reduce((acc, skill) => {
      if (!acc.some((s) => s.name === skill.name)) {
        acc.push(skill);
      }
      return acc;
    }, []);
  
    return uniqueSkills.filter((skill, index, arr) => {
      return !arr.some((s, i) => {
        return i !== index && s.class === skill.class && s.quest === skill.quest;
      });
    });
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

  }, [searchTerm]);

  return (
    <div className='pageContainer'>
      <div className='pageName'>Ruthless Skill Gem Mule Guide</div>
      <div id='muleGemPlanner'>
        <div id='searchGems'>
          <div id='searchGemsLabel'>Search Gems:</div>
          <input type='text' value={searchTerm} onChange={editSearchTerm} />
        </div>
        <div id='selectMainBtns'>
          <button onClick={() => selectMainClass('Templar')}>Templar</button>
          <button onClick={() => selectMainClass('Marauder')}>Marauder</button>
          <button onClick={() => selectMainClass('Duelist')}>Duelist</button>
          <button onClick={() => selectMainClass('Ranger')}>Ranger</button>
          <button onClick={() => selectMainClass('Shadow')}>Shadow</button>
          <button onClick={() => selectMainClass('Witch')}>Witch</button>
          <button onClick={() => selectMainClass('Scion')}>Scion</button>
        </div>
        <div id='selectedGemContainer'><div id='sGemContainer'>{buildGems}</div></div>
        <div id='buildGems'>
          <button id='resetBtn' onClick={() => clearGemList()}>Reset</button>
          <div className='buildPathHeader'>Optimal mule path</div>
          <div id='buildGemsContainerOptimal'>
            {muleGemsFiltered.map(gem => <GemIcon key={gem.class + '' + gem.name} gem={gem} removeGemFromList={removeGemFromList} />)}
          </div>
          <div className='buildPathHeader'>All gem options</div>
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
            <a href={'https://www.poewiki.net/wiki/' + gem.name} className='gemIconWiki'>wiki</a>
            </div>
            )} 
          </div>
        </div>
      </div>
    </div>
  );
}

class GemIcon extends React.Component<{isFlash: boolean}> {
  constructor(props) {
    super(props);
    this.state = {isFlash: false, styling: {transform: 'scale(1.05'} };
    console.log(this.state);
  }

  handleStatusChange(status) {

    console.log('status change');
    this.setState({
      isFlash: true
    });

    console.log(this.state);

    // Set flash back to false after the animation ends
    setTimeout(() => {
      this.setState({
        isFlash: false,
        styling: {},
      });
    }, 800);

    // Clear the timeout if the component unmounts before the animation ends
    //return () => clearTimeout(timeoutId);
  }

  componentDidMount() {
    console.log('test mounted');
    this.setState({isFlash: true, styling: {transform: 'scale(1.05)', boxShadow: 'yellow 0px 0px 20px'}});
    setTimeout(() => {
      this.setState({
        isFlash: false,
        styling: {},
      });
    }, 800);

  }
  componentDidUpdate(prevProps, prevState) {

    console.log('test updated');

    console.log(this.state);
  }

  render() {
    return (
      <div className='gemIconContainer' style={this.state.styling}>
        <div className='gemIconPic'>
          <img src='/media/Absolution_skill_icon.png' alt='-------'/>
        </div>
        <div className='gemIconName'>{this.props.gem.name}</div>
        <div className='gemIconContainerL'>
          <div className='gemIconClassLabel'>Class: </div>
          <div className='gemIconQuestLabel'>Quest: </div>
        </div>
        <div className='gemIconContainerR'>
          <div className='gemIconClass'>{this.props.gem.class}</div>
          <div className='gemIconQuest'>Act {this.props.gem.act}: {this.props.gem.quest}</div>
        </div>
        <div className='gemIconDelete' onClick={() => this.props.removeGemFromList(this.props.gem)}>X</div>
        <a href={'https://www.poewiki.net/wiki/' + this.props.gem.name} className='gemIconWiki'>wiki</a>
      </div>
    );
  }
}