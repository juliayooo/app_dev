<template>
            <Page>
              <ActionBar>
            <Label text="Today"></Label></ActionBar>

              <StackLayout>
               
              <Label :text="`${new Date().toLocaleDateString()}`" class="h2" textAlignment="center" />
              <Label :text="prompts" class="p" textWrap="true" />
              <Button class="fillPrompt" text="Add Photo" @tap="addPhoto" width = "300"/>
              </StackLayout>
            </Page>

</template>


<script setup>
import { ref, onMounted, ActionBar } from 'nativescript-vue'
import { knownFolders, path, File, ObservableArray, StackLayout } from "@nativescript/core";
import { Dialogs, ImageSource } from '@nativescript/core';
import * as ImagePicker from '@nativescript/imagepicker';
import { requestPermissions } from '@nativescript/camera';
const camera = require("@nativescript/camera");
const { Image } = require("@nativescript/core");
import PromptSelect from "./PromptSelect.vue";
import { $navigateTo } from 'nativescript-vue';
import { API_KEY } from './credentials.js';

const prompts = ref("");
// check if prompts generated for the day 
const documents = knownFolders.documents();
const filePath = path.join(documents.path, "data.json");
let items; 


async function fillPrompt(photoPath)  {

  const today = new Date().toLocaleDateString();
  const file = documents.getFile("data.json");
  const content = file.readTextSync();
  const parsed = JSON.parse(content); // parsed is an array
  const todayIdx = parsed.findIndex(i => i.day === today);
  const todayItem = parsed[todayIdx];
  console.log("Today index:", todayIdx);
  console.log("photopath:", photoPath);
  if (todayIdx === -1) {
    console.error("No prompt found for today.");
    return;
  }

  console.log("Selected item:", todayItem.promptlist);
  console.log("Filling prompt with photo");

  $navigateTo(PromptSelect, {
    props: {
      item: todayItem,
      photopath: photoPath
    }
  });
}


console.log("Hello from App.vue");



const getPrompts = async () => {
  
  // Get prompts
  console.log("Fetching prompts from ChatGPT API...")
  try {      console.log("1");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": API_KEY
      },
      body: JSON.stringify({
        model: "gpt-4.1", 
        messages: [{ role: "user", 
        content: "Give me 3 prompts of things to take pictures of in my daily commute to promote presentness and mindfulness. No details, just the simple prompts. as a list" }],
        max_tokens: 100
      })
    })
    const result = await response.json()
          console.log("2");
    console.log(result);
    prompts.value = result.choices[0].message.content;
    console.log("Prompts fetched:", prompts.value);
  } catch (error) {
    console.error("API error:", error)
  }
  const file = documents.getFile("data.json");
     const content = file.readTextSync();
     const parsed = JSON.parse(content); // parsed is an array
    const todayIdx = parsed.findIndex(i => i.day === new Date().toLocaleDateString());
    console.log(new Date().toLocaleDateString());
    console.log("Today index:", todayIdx);
    const todayEntry = parsed[todayIdx];
    console.log("Today's entry:", todayEntry);
    if (todayEntry && todayEntry.promptlist == "") {
      const updatedItem = {
      day : new Date().toLocaleDateString(),
      promptlist: prompts.value,
      photo1: "",
      photo2: "",
      photo3: ""
    };
    const file = documents.getFile("data.json");
     const content = file.readTextSync();

      const JSONstring = JSON.stringify(updatedItem);
    

        console.log("Updated today's prompts:", todayEntry.promptlist);
      return;
    }
    else{
        console.log("No entry for today, creating new one");

      const updatedItem = {
      day : new Date().toLocaleDateString(),
      promptlist: prompts.value,
      photo1: "",
      photo2: "",
      photo3: ""
    };
     const file = documents.getFile("data.json");
     const content = file.readTextSync();

      const JSONstring = JSON.stringify(updatedItem);
      parsed.push(updatedItem); // add new entry if not found
      // wrote string 
      console.log(JSONstring);
       try {
            // const parsed = JSON.parse(content); // parsed is an array
    const todayIndex = parsed.findIndex(i => i.day === new Date().toLocaleDateString());

            // Find and update the correct day entry
            // const todayIndex = parsed.findIndex(i => i.day === updatedItem.day);
            console.log("Today index:", todayIndex);
            if (todayIndex !== -1) {
              parsed[todayIndex] = updatedItem;

              // Write back to file
              file.writeTextSync(JSON.stringify(parsed));
              console.log("Successfully saved updated entry.", updatedItem);
            } else {
                parsed.push(updatedItem);  // add new entry if not found
              file.writeTextSync(JSON.stringify(parsed));
              console.warn("Entry not found for today's date.");
            }
          } catch (e) {
            console.error("Failed to update JSON file", e);
          }


    }
    ;


      

}


onMounted(() => {


  // store today's prompts by date as JSON locally 
  
  const file = documents.getFile("data.json");
  if (File.exists(filePath)) {
    const content = file.readTextSync();
    try {
      const parsed = JSON.parse(content);
      items = parsed;
      console.log("Items loaded from data.json:", items);
      const todayEntry = items.find(item => item.day === new Date().toLocaleDateString());
      if (todayEntry && todayEntry.promptlist !== "") {
        console.log("Today's prompts already exist:", todayEntry.promptlist);
        prompts.value = todayEntry.promptlist;
        return;
       
      }
    } catch (e) {
      console.error("Error parsing data.json", e);
    }
    const todayEntry = items.find(item => item.day === new Date().toLocaleDateString());

     if(todayEntry &&todayEntry.photo1!== "" && todayEntry.photo2 !== ""&& todayEntry.photo3!== ""){
          console.log("Photos already added for today");
        return;
      }
        
  }

  // No prompt for today found, fetch one
  getPrompts();

  

})

const promptImage = ref("");
async function addPhoto(){

    // add a photo to the prompt, upload or take a picture 
    const action = await Dialogs.action({
        title: "Select an image",
        cancelButtonText: 'Cancel',
        actions: ["Choose from library", "Take a picture"],
        cancelable: true
    });


    // if upload chosen 
    if(action === "Choose from library"){


        console.log("LIBRARY permissions");

    const perms = await camera.requestPermissions();

    if (perms.Success && camera.isAvailable()) {
    console.log("Library permission granted");

    const context = ImagePicker.create({
    mode: 'single' 
    });

    await context.authorize();
    const selection = await context.present();
    // items.photo1 = selection[0].path;
    console.log("Selected image: ", selection[0].path);
    const selectedPath = selection[0].path;
    console.log("Selected path:", selectedPath);
    fillPrompt(selectedPath);


}

    }
    else if(action === "Take a picture"){
        // Camera access
        try{
            await camera.requestCameraPermissions();
            // Permission given
            const isAvailable = camera.isAvailable();
            if(isAvailable){
                const imageAsset = await camera.takePicture({
                    saveToGallery: false
                });

                const filePath = path.join(documents.path, `${nanoid()}.jpg`);
                const img = await ImageSource.fromAsset(imageAsset);
                const saved = img.saveToFile(filePath, "jpg");
                const selectedPath = "";

                if(saved){
                    selectedPath = filePath;
                    console.log("Image saved to:", selectedPath);
                    fillPrompt(selectedPath);
                }else{
                    throw new Error("Failed to save image from camera")
                }
            }else{
                console.log("Device does not have a camera");
            }
        }catch(err){
            // Permission denied
            console.error(err);
            console.log("No picture taken");
        }
    }
}
</script>

<style lang="scss">
@import "@nativescript/theme/scss/variables/blue";

.h2 {
  font-size: 30;
  margin: 16 0;
  font-weight: bold;
    font-family: 'Monospace';

}
.p {
  font-family: 'Monospace';
  font-size: 50;
  margin: 30;
  color: black;
}
body {
  background-color: tan;
}
.fillPrompt {
  background-color: rgb(148, 172, 231);
  border-radius: 50%;
  margin: 20;
  width: 300;
  font-size: 20;
  color: white;
    font-family: 'Monospace';

    font-weight: bold;
}


</style>
