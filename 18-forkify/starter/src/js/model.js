import { async } from 'regenerator-runtime';
import {
  API_URL,
  SEARCH_RESULTS_PER_PAGE,
  STARTING_SEARCH_RESULTS_PAGE,
} from '../js/config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: STARTING_SEARCH_RESULTS_PAGE,
    resultsPerPage: SEARCH_RESULTS_PER_PAGE,
    pageAmount: 0,
  },
  bookmarks: {},
};

export const loadRecipe = async function (recipeId) {
  try {
    const resRecipe = await getJSON(`${API_URL}${recipeId}`);
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
  return {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    image: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    source: recipe.source_url,
    title: recipe.title,
  };
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const res = await getJSON(`${API_URL}?search=${query}`);
    const { recipes: unformattedRecipes } = res.data;
    state.search.results = unformattedRecipes.map(recipe =>
      formatRecipeObject(recipe)
    );
    state.search.page = STARTING_SEARCH_RESULTS_PAGE;
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
