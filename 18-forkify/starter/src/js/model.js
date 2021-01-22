import { async } from 'regenerator-runtime';
// import {
//   config.API_URL,
//   config.SEARCH_RESULTS_PER_PAGE,
//   config.STARTING_SEARCH_RESULTS_PAGE,
// } from './config.js';
import * as config from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: config.STARTING_SEARCH_RESULTS_PAGE,
    resultsPerPage: config.SEARCH_RESULTS_PER_PAGE,
    pageAmount: 0,
  },
  bookmarks: [],
};
export const loadRecipe = async function (recipeId) {
  try {
    const resRecipe = await getJSON(`${config.API_URL}${recipeId}`);
    const { recipe: unformattedRecipe } = resRecipe.data;
    state.recipe = formatRecipeObject(unformattedRecipe);
    // console.log(recipe);
    //This method doesn't actually return anything but rather change the state object.
    //The state object is then imported by the controller.
    //Exports-imports are live connections
  } catch (error) {
    throw error;
  }
};

const formatRecipeObject = function (recipe) {
  //determine if the recipe we're loading was already bookmarked
  const isBookmarked = state.bookmarks.some(
    bookmark => bookmark.id === recipe.id
  );
  return {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    image: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    source: recipe.source_url,
    title: recipe.title,
    bookmarked: isBookmarked,
  };
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const res = await getJSON(`${config.API_URL}?search=${query}`);
    const { recipes: unformattedRecipes } = res.data;
    state.search.results = unformattedRecipes.map(recipe =>
      formatRecipeObject(recipe)
    );

    state.search.page = config.STARTING_SEARCH_RESULTS_PAGE;
  } catch (error) {
    throw error;
  }
};

loadSearchResults('cheese');

export const getSearchResultsPage = function (page = state.search.page) {
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage; //the slice method return does not include the element on the end index
  return state.search.results.slice(start, end);
};

export const nextPage = function () {
  state.search.page++;
};
export const prevPage = function () {
  state.search.page--;
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ingredient => {
    return (ingredient.quantity =
      ingredient.quantity * (newServings / state.recipe.servings));
  });
  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  //Add bookmark
  state.bookmarks.push(recipe);

  //Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  // update the bookmarks data in localStorage
  storeBookmarks();
};

export const deleteBookmark = function (id) {
  //Find index of the bookmark we want to delete
  const delIndex = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(delIndex, 1);
  //unmark the current recipe as bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  // update the bookmarks data in localStorage
  storeBookmarks();
};

const storeBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const loadBookmarks = function () {
  const data = localStorage.getItem('bookmarks');
  if (!data) return;
  state.bookmarks = JSON.parse(data);
};

const init = function () {
  loadBookmarks();
  console.log(state.bookmarks);
};
init();
