<template>
  <Page>
    <TabView androidTabsPosition="bottom">
        <TabViewItem title="Today">
            <Frame id="today">
              <Items :items="items" :title="title" @newRecipe="addRecipe"/>
            </Frame>
        </TabViewItem>

        <TabViewItem title="Collection">
            <Frame id="collection">
              <Browse/>
            </Frame>
        </TabViewItem>

    </TabView>
  </Page>
</template>
<script setup>
import Items from "./Items.vue";
import Browse from "./Browse.vue";
import { knownFolders, path, File, ObservableArray, toJSON } from "@nativescript/core";
import { ref } from 'nativescript-vue';
console.log("Hello from Home.vue");
const searchTerm = ref("");

const title = ref("Today");

const documents = knownFolders.documents();
const filePath = path.join(documents.path, "data.json");
let items; 

  items = new ObservableArray([
  {
    day: new Date().toLocaleDateString(),
    promptlist: "",
    photo1: null,
    photo2: null,
    photo3: null,
  }
  ]);

    //convert to json string
const JSONstring = items.toJSON();
console.log(JSONstring);
const file = documents.getFile("data.json");
file.writeTextSync(JSON.stringify(JSONstring));


if(File.exists(filePath)){

  // Initialize data load from json file 

}else{
  // // Load data from json file
  // const file = documents.getFile("data.json");
  // items = new ObservableArray(
  //   JSON.parse(file.readTextSync())
  // );
  // // items = new ObservableArray(JSON.parse(jsonString));
}

const addRecipe = (recipe) => {
  items.push(recipe);
  const JSONstring = items.toJSON();
console.log(JSONstring);
const file = documents.getFile("data.json");
file.writeTextSync(JSON.stringify(JSONstring));
};
</script>

<style lang="scss">
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
