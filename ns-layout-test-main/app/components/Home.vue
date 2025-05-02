<template>
  <TabView androidTabsPosition="bottom">
      <TabViewItem title="Home">
          <Frame id="items">
            <Items :items="items" :title="title"
            @new-recipe="addRecipe"/>
          </Frame>
      </TabViewItem>

      <TabViewItem title="Browse">
          <Frame id="browse">
            <Browse/>
          </Frame>
      </TabViewItem>

      <TabViewItem title="Search">
          <Frame id="search">
            <Search/>
          </Frame>
      </TabViewItem>
  </TabView>
</template>

<script setup>
import Items from "./Items.vue";
import Browse from "./Browse.vue";
import Search from "./Search.vue";
import { ObservableArray } from '@nativescript/core';
import { ref } from 'nativescript-vue';

const title = ref("My Recipes");

const items = new ObservableArray([
  {
    name: "Cookies",
    description: "These sugar cookies are soooo delicious MMMMM yummy!",
    image: "~/images/cookie.png",
    ingredients:
    {
      title: "Ingredients",
      list: [
        "2 ¾ cups all-purpose flour",
        "1 teaspoon baking soda",
        "½ teaspoon baking powder",
        "1 cup butter, softened",
        "1 ½ cups white sugar",
        "1 egg",
        "1 teaspoon vanilla extract"
      ]
    },
    steps: "Preheat oven to 350 degrees F (175 degrees C). Grease cookie sheets. In a small bowl, stir together flour, baking soda, and baking powder. Set aside. In a large bowl, cream together the butter, white sugar, and brown sugar until smooth. Beat in the egg and vanilla. Gradually blend in the dry ingredients. Roll rounded teaspoonfuls of dough into balls, and place onto ungreased cookie sheets. Flatten each ball with a fork, and sprinkle with sugar. Bake 8 to 10 minutes in the preheated oven, or until golden.",
  },
  {
    name: "Bread",
    description: "This is the most delicious bread ever 10/10 bread!",
    image: "~/images/bread.png",

    ingredients:
    {
      title: "Ingredients",
      list: [
      "500g strong white flour",

      "2 tsp salt",
      "7g sachet fast-action yeast",
      "3 tbsp olive oil",
      "300ml water",
      ]
    },
    steps: "Preheat oven to 350 degrees F (175 degrees C). Grease cookie sheets. In a small bowl, stir together flour, baking soda, and baking powder. Set aside. In a large bowl, cream together the butter, white sugar, and brown sugar until smooth. Beat in the egg and vanilla. Gradually blend in the dry ingredients. Roll rounded teaspoonfuls of dough into balls, and place onto ungreased cookie sheets. Flatten each ball with a fork, and sprinkle with sugar. Bake 8 to 10 minutes in the preheated oven, or until golden.",
  }


]);

const addRecipe = (recipe) => {
  items.push(recipe);
  
};
</script>

<style lang="scss">
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
