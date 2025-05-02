<template>
  <Page>
    <TabView androidTabsPosition="bottom">
        <TabViewItem title="Home">
            <Frame id="items">
              <Items :items="items" :title="title" @newRecipe="addRecipe"/>
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
import { knownFolders, path, File, ObservableArray, toJSON } from "@nativescript/core";
import { ref } from 'nativescript-vue';

const searchTerm = ref("");

const title = ref("My Recipes");

const documents = knownFolders.documents();
const filePath = path.join(documents.path, "data.json");
let items; 


if(!File.exists(filePath)){

  // Initialize data load from json file 
  items = new ObservableArray([
  {name: "BREAD",
    description: "ITS BREAD",
    ingredients: ["FLOUR, WATER, SALT"],
    instructions: ["MIX, BAKE"],
  }
  ]);

    //convert to json string
const JSONstring = items.toJSON();
console.log(JSONstring);
const file = documents.getFile("data.json");
file.writeTextSync(JSON.stringify(JSONstring));

}else{
  // Load data from json file
  const file = documents.getFile("data.json");
  items = new ObservableArray(
    JSON.parse(file.readTextSync())
  );
  // items = new ObservableArray(JSON.parse(jsonString));
}

const addRecipe = (recipe) => {
  items.push(recipe);
  const JSONstring = items.toJSON();
console.log(JSONstring);
const file = documents.getFile("data.json");
file.writeTextSync(JSON.stringify(JSONstring));
};
// const items = new ObservableArray([
//   {
//     name: "Item 1",
//     description: "Description for Item 1"
//   },
//   {
//     name: "Item 2",
//     description: "Description for Item 2"
//   },
//   {
//     name: "Item 3",
//     description: "Description for Item 3"
//   },
//   {
//     name: "Item 4",
//     description: "Description for Item 4"
//   },
//   {
//     name: "Item 5",
//     description: "Description for Item 5"
//   },
//   {
//     name: "Item 6",
//     description: "Description for Item 6"
//   },
//   {
//     name: "Item 7",
//     description: "Description for Item 7"
//   },
//   {
//     name: "Item 8",
//     description: "Description for Item 8"
//   },
//   {
//     name: "Item 9",
//     description: "Description for Item 9"
//   },
//   {
//     name: "Item 10",
//     description: "Description for Item 10"
//   }
// ]);
</script>

<style lang="scss">
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
