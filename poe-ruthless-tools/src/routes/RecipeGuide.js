import React from 'react';
import './stylesheets/RecipeGuide.css';
//show ruthless specific recipes, and all recipes that work
export default function RecipeGuide() {
  
  let testData = [
    {
      recipe: [
        '4x Portal Scroll'
      ],
      result: [
        'Scroll of Wisdom'
      ],
    },
    {
      recipe: [
        '3x Red Gem'
      ],
      result: [
        'Random Red Gem'
      ],
    },
    {
      recipe: [
        'Magic Belt',
        'Magic/Rare Body Armour with +#% to Chaos Resistance',
        'Orb of Augementation',
      ],
      result: [
        'Magic Belt with +#% to Chaos Resistance'
      ],
    },
  ];
  
  
  return (
    <div className='pageContainer'>
      <p>Recipe Guide</p>
      <div className='recipeTable'>
        <div className='recipeTableHeaders'>Recipe</div>
        <div className='recipeTableHeaders'>Result</div>
        {testData.map( recipe => <div className='recipeRow'>
        <div className='recipeBox'><div className='itemContainer'>{recipe.recipe.map(rec => <div className='tableItem'>{rec}</div>)}</div></div>  
        <div className='resultBox'><div className='itemContainer'>{recipe.result.map(res => <div className='tableItem'>{res}</div>)}</div></div>  
      </div>
      )}
      </div>
    </div>
  );
}
