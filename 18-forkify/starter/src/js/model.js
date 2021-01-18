import { async } from 'regenerator-runtime';
import { API_URL } from '../js/config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {},
  bookmarks: {},
};

export const loadRecipe = async function (recipeId) {
  try {
    const resRecipe = await getJSON(`${API_URL}/${recipeId}`);
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
