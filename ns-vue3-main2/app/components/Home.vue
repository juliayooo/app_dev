<template>
  <Page>
    <TabView androidTabsPosition="bottom">
        <TabViewItem title="Home">
            <Frame id="items">
              <Items 
                :items="items" 
                :title="title"
                @newRecipe="addRecipe"
              />
            </Frame>
        </TabViewItem>

        <TabViewItem title="Browse">
            <Frame id="browse">
              <Browse/>
            </Frame>
        </TabViewItem>

        <TabViewItem title="Search">
            <Frame id="search">
              <Search v-model="searchTerm"/>
            </Frame>
        </TabViewItem>
    </TabView>
  </Page>
</template>

<script setup>
import Items from "./Items.vue";
import Browse from "./Browse.vue";
import Search from "./Search.vue";
import { ObservableArray } from '@nativescript/core';
import { ref } from 'nativescript-vue';

const searchTerm = ref("");

const title = ref("My Recipes");

const items = new ObservableArray([
  {
    name: "Pancakes",
    description: "This easy American pancake recipe makes really light and fluffy pancakes that are great for making a special weekend brunch from scratch. Try adding a large handful of fresh blueberries to the batter before cooking.",
    image: "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/fluffyamericanpancak_74828_16x9.jpg",
    ingredients: [
      "135g/4¾oz plain flour",
      "1 tsp baking powder",
      "½ tsp salt",
      "2 tbsp caster sugar",
      "130ml/4½fl oz milk",
      "1 large egg, lightly beaten",
      "2 tbsp melted butter (allowed to cool slightly), plus extra for cooking"
    ],
    instructions: [
      "Sift the flour, baking powder, salt and caster sugar into a large bowl. In a separate bowl or jug, lightly whisk together the milk and egg, then whisk in the melted butter.",
      "Pour the milk mixture into the flour mixture and, using a fork, beat until you have a smooth batter. Any lumps will soon disappear with a little mixing. Let the batter stand for a few minutes.",
      "Heat a non-stick frying pan over a medium heat and add a knob of butter. When it's melted, add a ladle of batter (or two if your frying pan is big enough to cook two pancakes at the same time). It will seem very thick but this is how it should be.",
      "Wait for about 3 minutes until the top of the pancake begins to bubble, and the edges begin to set. Flip it over and cook for another two minutes until both sides are golden brown and the pancake has risen to about 1cm/½in thick. If the pancake is too dark, reduce the heat slightly for the next round.",
      "Repeat until all the batter is used up. You can keep the pancakes warm in a low oven, but they taste best fresh out the pan.",
      "Serve with lashings of real maple syrup and extra butter, if you like."
    ]
  },
  {
    name: "Item 2",
    description: "Description for Item 2"
  },
  {
    name: "Item 3",
    description: "Description for Item 3"
  },
  {
    name: "Item 4",
    description: "Description for Item 4"
  },
  {
    name: "Item 5",
    description: "Description for Item 5"
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
