import React, {useEffect, useState} from 'react';
import Recipe from './recipe';
import './App.css';

const App = () => {

  const APP_ID = '783f55e8';
  const APP_KEY = process.env.REACT_APP_API_KEY;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken')

useEffect(() => {
  getRecipes();
}, [query]);

const getRecipes = async () => {
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);

  const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
}

// allows user to change the state of the search using the input value
const updateSearch = (e) => {
  setSearch(e.target.value);
}

// prevents the page from refresshing and spamming API requests, gives access to search value to pass into API URL
const getSearch = (e) => {
  e.preventDefault();
  setQuery(search);
  setSearch('');
}

  return (
  <div className="App">
    <form className='search-form' onSubmit={getSearch}>
      <input type='text' className='search-bar' value={search} onChange={updateSearch}/>
      <button type='submit' className='search-button'>Search</button>
    </form>
    <div className='recipes'>
    {recipes.map(recipe => (
      <Recipe 
      key={recipe.recipe.label}
      title={recipe.recipe.label} 
      calories={recipe.recipe.calories} 
      image={recipe.recipe.image}
      ingredients={recipe.recipe.ingredients}
      />
    ))}

    </div>
  </div>
  );
};

export default App;
