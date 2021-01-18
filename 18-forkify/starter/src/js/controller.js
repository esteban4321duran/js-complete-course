import 'core-js/stable';
import * as model from './model.js';
import recipeView from './views/recipeView.js';

// API Main page
// https://forkify-api.herokuapp.com/v2

const controlRecipes = async function () {
  try {
    const recipeId = window.location.hash.slice(1);
    if (!recipeId) return;

    recipeView.renderSpiner();

    // await model.loadRecipe(recipeId);
    await model.loadRecipe(recipeId);

    recipeView.updateAndRender(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const init = function () {
  // implement the publisher-subscriber pattern for handling events produced on the view
  recipeView.addHandlerRender(controlRecipes);
};
init();
