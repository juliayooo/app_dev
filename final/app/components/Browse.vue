<template>
    <Page>
        <ActionBar>
            <Label text="Browse"></Label>
        </ActionBar>

        <ScrollView>
      <StackLayout>
        <StackLayout v-for="(entry, index) in item" :key="index">
          <Label :text="entry.day" class="dayLabel" />
          <Label :text="entry.promptlist" class="promptLabel" textWrap="true" />
          <GridLayout columns="*,*,*" rows="auto" class="buttons">
            <Image :src="entry.photo1" col="0" stretch="aspectFit" height="300" width="100%" />
            <Image :src="entry.photo2" col="1" stretch="aspectFit" height="300" width="100%" />
            <Image :src="entry.photo3" col="2" stretch="aspectFit" height="300" width="100%" />
          </GridLayout>
        </StackLayout>
      </StackLayout>
    </ScrollView>
       

    </Page>
</template>

<script setup>
import { StackLayout } from "@nativescript/core";
import { ref } from "vue";
import { onMounted, onUnmounted} from 'nativescript-vue'
import { knownFolders, path, File, ObservableArray,  } from "@nativescript/core";
import { on } from "events";
import { onNavigatedTo } from 'nativescript-vue';
import { eventBus } from './bus';

// import { watch } from "fs";

console.log("Hello from Browse.vue");
// check if prompts generated for the day 
const documents = knownFolders.documents();
const filePath = path.join(documents.path, "data.json");
let items; 
const item = ref([]);
const pic1 = ref("");
const pic2 = ref("");
const pic3 = ref("");
const dayLabel = ref("Add photos to see them here");
const promptLabel = ref("");

function handleTabEvent() {
  displayPhotos();
}

onMounted(() => {
  eventBus.on('tabChangedToBrowse', handleTabEvent);
});

onUnmounted(() => {
  eventBus.off('tabChangedToBrowse', handleTabEvent);
});

function displayPhotos() {
    console.log("Display photos function called");
const file = documents.getFile("data.json");
  if (File.exists(filePath)) {
    const content = file.readTextSync();
    try {
      // get the items file 
      const parsed = JSON.parse(content);
      items = new ObservableArray(parsed);  
      item.value = parsed;
      console.log("FULLitems: ", items);
      const todayEntry = items.find(item => item.day === new Date().toLocaleDateString());


      if (todayEntry && todayEntry.promptlist !== "") {
        console.log("pic values:", todayEntry.photo1, todayEntry.photo2, todayEntry.photo3);
        if(todayEntry.photo1 !== "" && todayEntry.photo2!== "" && todayEntry.photo3!== ""){
          dayLabel.value = todayEntry.day;
          promptLabel.value = todayEntry.promptlist;
          console.log("Browse's prompts:", todayEntry.promptlist);
          console.log(todayEntry.day);
          pic1.value = todayEntry.photo1;
          pic2.value = todayEntry.photo2;
          pic3.value = todayEntry.photo3;
      }
        console.log("Inside of browse:", todayEntry.promptlist);
       
      }


        
    } catch (e) {
      console.error("Error parsing data.json", e);
    }
   
  }

}


  
</script>



<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles
    .dayLabel{
        font-size: 20px;
        font-weight: bold;
        margin-left: 80px;
        margin-top: 80px;
        font-family: 'Monospace';
    }
    .promptLabel{
        margin-left: 80px;
        font-size: 15px;
        font-family: 'Monospace';
    }
</style>
