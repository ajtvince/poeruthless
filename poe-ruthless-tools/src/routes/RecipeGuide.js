import React from 'react';
import { useEffect, useRef } from 'react';
import useState from 'react-usestateref';
import './stylesheets/RecipeGuide.css';
import recipes from './data/recipes.json';
//show ruthless specific recipes, and all recipes that work
export default function RecipeGuide() {
  
  const [recipeMap, setRecipeMap] = useState(recipes.recipes);
  const [recipeMapSearch, setRecipeMapSearch, recipeMapRef] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
    
  function editSearchTerm(e) {
    setSearchTerm(e.target.value);
    console.log(recipeMap);
    console.log(searchTerm);
  }

  useEffect(() => {
    console.log('before');
    console.log(recipeMapRef);
      setRecipeMapSearch(recipeMap.filter(obj => {
        let temp = false;
        obj.recipe.forEach( rec => {
          if( rec.toLowerCase().includes(searchTerm.toLowerCase()) ){
            temp = true;
          }
        });
        obj.result.forEach( res => {
          if( res.toLowerCase().includes(searchTerm.toLowerCase()) ){
            temp = true;
          }
        });
        return temp;
      }));
      console.log('ref');
  }, [searchTerm]);

  return (
    <div className='pageContainer'>
      <div className='pageName'>Ruthless Vendor Recipes</div>
      <div id='searchRecipeLabel'>Search:</div>
      <input id='searchInput' type='text' value={searchTerm} onChange={editSearchTerm} />
      <div className='recipeTable'>
        <div className='recipeTableHeaders'>Recipe</div>
        <div className='recipeTableHeaders'>Result</div>
        {recipeMapSearch.map( recipe => <div className='recipeRow'>
        <div className='resultBox'>
          <div className='itemContainer'>{recipe.recipe.map(res => <div className='tableItem'>{res}</div>)}</div>
        </div>
        <div className='recipeBox'>
          <div className='itemContainer'>{recipe.result.map(rec => <div className='tableItem'>{rec}</div>)}</div>
        </div>
      </div>  
      )}
      </div>
    </div>
  );
}
