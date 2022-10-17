import os
import random
import pandas as pd

from ingredients import ingredient_candidates


def genIngredients():
    ingredients_tab = []
    for i, ingredient_candidate in enumerate(ingredient_candidates):
        ingredient_record = {
            "IngredientId": i + 1,
            "IngredientName": ingredient_candidate,
            "Amount": random.randint(0, 100)
        }
        ingredients_tab.append(ingredient_record)

    pd.DataFrame(ingredients_tab).to_csv("ingredients.csv", index=False)
    print("Ingredients csv generated!")


def selectRecipes(recipe_file, image_folder, select_total=50):
    recipe_pd = pd.read_csv(recipe_file,
                            usecols=["Title", "Image_Name", "Cleaned_Ingredients"])
    recipes = list(recipe_pd[:1000].itertuples(index=False, name=None))

    select_cnt = 0
    selected_recipes = []
    for recipe in recipes:
        # Select up to select_total recipes
        if select_cnt >= select_total:
            break

        title, image_name, recipe_ingredients = recipe

        # Remove recipes with special characters, too long title/image_name, or no corresponding image
        if not (title.isascii() and image_name.isascii()):
            continue
        if len(title) > 32 or len(image_name) > 128:
            continue
        if not os.path.exists(os.path.join(image_folder, image_name + ".jpg")):
            continue

        mined_ingredients = []
        for i, ingredient_candidate in enumerate(ingredient_candidates):
            # Assumption: ingredient shouldn't have prefix (should start with blank char)
            if (' ' + ingredient_candidate) in recipe_ingredients.lower():
                mined_ingredients.append((i + 1, ingredient_candidate))

        # Remove recipes with too few ingredients
        if len(mined_ingredients) <= 3:
            continue

        # Recipe format: ( (DishId, DishName), ImageUrl, [(IngredientId, IngredientName)] )
        selected_recipes.append(((select_cnt + 1, title), image_name + ".jpg", mined_ingredients))
        select_cnt += 1

    return selected_recipes


def genDishRecipe(selected_recipes):
    dishes_tab = []
    recipes_tab = []

    # Recipe format: ( (DishId, DishName), ImageUrl, [(IngredientId, IngredientName)] )
    for recipe in selected_recipes:
        dish, img_name, ingredients = recipe

        dishes_tab.append({
            "DishId": dish[0],
            "DishName": dish[1],
            "Price": random.randint(1, 50),
            "ImageUrl": img_name,
            "Description": "This dish contains: " + ", ".join([x[1] for x in ingredients]) + '.'
        })

        for ingredient in ingredients:
            recipes_tab.append({
                "DishId": dish[0],
                "IngredientId": ingredient[0]
            })

    pd.DataFrame(dishes_tab).to_csv("dishes.csv", index=False)
    print("Dishes csv generated!")

    pd.DataFrame(recipes_tab).to_csv("recipes.csv", index=False)
    print("Recipes csv generated!")


if __name__ == "__main__":
    RECIPE_FILE = "./Food_Recipe_Mapping.csv"
    IMG_FOLDER = "./Food_Images"
    SELECT_TOTAL = 50

    genIngredients()

    selected_recipes = selectRecipes(RECIPE_FILE, IMG_FOLDER, SELECT_TOTAL)

    genDishRecipe(selected_recipes)
