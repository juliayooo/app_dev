<template>
    <Page>
        <ActionBar>
            <Label text="Browse"></Label>
        </ActionBar>

        <StackLayout>
            <Label :text="dayLabel" class="h3"/>
            <!-- <Label :text="promptLabel" class="p"/> -->

            <GridLayout columns="*,*,*" rows="auto" class="buttons">
                <Image :src="pic1" col="0" stretch="aspectFit" height="300" width="100%"  />
                <Image :src="pic2" col="1"stretch="aspectFit" height="300" width="100%" />
                <Image :src="pic3" col="2" stretch="aspectFit" height="300"width="100%" />

                </GridLayout>

            </StackLayout>

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
const pic1 = ref("");
const pic2 = ref("");
const pic3 = ref("");
const dayLabel = ref("");
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
      const parsed = JSON.parse(content);
      items = new ObservableArray(parsed);  
      console.log(items);
      const todayEntry = items.find(item => item.day === new Date().toLocaleDateString());
      if (todayEntry && todayEntry.promptlist !== "") {
        console.log("Inside of browse:", todayEntry.promptlist);
       
      }

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
    h2{
        font-size: 40px;
        font-weight: bold;
        margin: 10px 0;
    }

</style>
