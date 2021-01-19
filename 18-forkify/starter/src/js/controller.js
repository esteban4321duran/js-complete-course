import 'core-js/stable';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import searchResultsView from './views/searchResultsView.js';
import paginationView from './views/paginationView.js';

//////////////////////////////////////
// Parcel. Enable hot module reload //
//////////////////////////////////////
// if (module.hot) {
//   module.hot.accept;
// }
//////////////////////////////////////
// API Main page
// https://forkify-api.herokuapp.com/v2

const controlRecipes = async function () {
  try {
    const recipeId = window.location.hash.slice(1);
    if (!recipeId) return;

    recipeView.renderSpiner();
    // update search results view to mark selected recipe
    const resultRecipes = model.getSearchResultsPage();
    searchResultsView.updateAndRender(resultRecipes);
    // searchResultsView.updateAndMergeText(resultRecipes); //BUG Have to use updateAndRender because for some misterious reason updateAndMerge doesn't want to work with the search results
    // await model.loadRecipe(recipeId);
    await model.loadRecipe(recipeId);

    recipeView.updateAndRender(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    searchResultsView.renderSpiner();
    //request search result recipes
    const query = searchView.getQuery();
    await model.loadSearchResults(query);
    //render results to the searchResultsView
    // & render initial pagination
    renderSearchResultsAndPagination();
  } catch (error) {
    console.error(error);
    recipeView.renderError(error.message);
  }
};
const renderSearchResultsAndPagination = function () {
  const resultRecipes = model.getSearchResultsPage();
  searchResultsView.updateAndRender(resultRecipes);
  paginationView.updateAndRender(model.state.search);
};

const controlPagination = function (element) {
  if (!element) return;
  if (element.classList.contains('pagination__btn--prev')) {
    model.prevPage();
    renderSearchResultsAndPagination();
  }

  if (element.classList.contains('pagination__btn--next')) {
    model.nextPage();
    renderSearchResultsAndPagination();
  }
};

const controlServings = function (element) {
  if (!element) return;

  //get current servings
  const servings = model.state.recipe.servings;

  //update recipe servings (in state)
  if (element.dataset.type === 'decrease') {
    //check if servings is a valid number
    if (servings <= 1) return;
    model.updateServings(servings - 1);
  }
  if (element.dataset.type === 'increase') model.updateServings(servings + 1);
  //update the recipeView
  recipeView.updateAndMergeText(model.state.recipe);
};

const init = function () {
  // implement the publisher-subscriber pattern for handling events produced on the view
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
