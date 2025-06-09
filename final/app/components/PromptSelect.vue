<template>
  <Page>
    <ActionBar>
            <Label text="Fill Prompt"></Label></ActionBar>
    <StackLayout>
      <!-- <Image :src="photo" stretch="aspectFit" height="300" /> -->
      <Label text="Which prompt does this photo match?" class="h2" textAlignment="center" />
      <Image :src="props.photopath" stretch="aspectFit" height="300" />
       <!-- <Button class="photobtn" text="Take photo" @tap="capturePhoto"/> -->
        <!-- <Button class="uploadbtn" text="Add photo" @tap="addPhoto"/> -->

      <GridLayout columns="*,*,*" rows="auto" class="buttons">
        <Button class="pbutt" text="1" col="0" @tap="selectPrompt(1)" />
        <Button class="pbutt"text="2" col="1" @tap="selectPrompt(2)" />
        <Button class="pbutt"text="3" col="2" @tap="selectPrompt(3)" />
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script setup>

import Browse from "./Browse.vue"
import { ref, onMounted } from 'nativescript-vue'
import { knownFolders, path, File, ObservableArray, toJSON, GridLayout, Frame } from "@nativescript/core";
import { $navigateTo, $navigateBack } from 'nativescript-vue'
// import {displayPhotos} from './Browse.vue';

const currImage = ref("");
const documents = knownFolders.documents();
const filePath = path.join(documents.path, "data.json");
// define props 
const props  = 
defineProps({
  item: Object,
  photopath: String
});

//check if props are passed correctly
console.log("PromptSelect.vue loaded");
console.log(props.item.promptlist, props.item.day);
console.log("Photo path: ", props.photopath);
currImage.value = props.photopath;


const selectedImage = ref(null);
async function selectPrompt(promptNumber){
  console.log("Selected prompt number:", promptNumber);


   const updatedItem = {
      day : props.item.day,
      promptlist: props.item.promptlist,
      photo1: props.item.photo1,
      photo2: props.item.photo2,
      photo3: props.item.photo3 
    };

  if(promptNumber == 1){
    updatedItem.photo1 = props.photopath;
    props.item.photo1 = props.photopath;
    console.log("1");
    // displayPhotos();
    //convert to json string
  } else if(promptNumber == 2){
    updatedItem.photo2 = props.photopath;

    props.item.photo2 = props.photopath;

  } else if(promptNumber == 3){
    updatedItem.photo3 = props.photopath;

    props.item.photo3 = props.photopath;

  }
      console.log("outside");

    const file = documents.getFile("data.json");
     const content = file.readTextSync();

      const JSONstring = JSON.stringify(updatedItem);
      console.log("JSON string:", JSONstring);
      // wrote string 
      console.log(JSONstring);
        try {
            const parsed = JSON.parse(content); // parsed is an array

            // Find and update the correct day entry
            const todayIndex = parsed.findIndex(i => i.day === updatedItem.day);
            console.log("Today index:", todayIndex);
            if (todayIndex !== -1) {
              parsed[todayIndex] = updatedItem;

              // Write back to file
              file.writeTextSync(JSON.stringify(parsed));
              console.log("Successfully saved updated entry.", updatedItem);
            } else {
              console.warn("Entry not found for today's date.");
            }
          } catch (e) {
            console.error("Failed to update JSON file", e);
          }

          $navigateBack();


  console.log("Updated prompt list:", props.item);
  
 
};

// async function capturePhoto(){
//     console.log("Camera permissions");

//   const perms = await camera.requestPermissions();

// if (perms.Success && camera.isAvailable()) {
//   console.log("Camera permission granted");
//      // permission request accepted or already granted
//      // ... call camera.takePicture here ...
// } else {
//      // permission request rejected
//      // ... tell the user ...
//      console.log("Camera permission denied");
//      const cameraPermissionSuccess = perms.Details.Camera.Success;
//      const photoPermissionSuccess = perms.Details.Photo.Success
// }
// console.log("end");
// };

// //UPLOAD FROM ALBUM 
// async function uploadPhoto(){
//   console.log("LIBRARY permissions");

//   const perms = await camera.requestPermissions();

// if (perms.Success && camera.isAvailable()) {
//   console.log("Library permission granted");

//   const context = ImagePicker.create({
//     mode: 'single' 
//   });

//   await context.authorize();
//   const selection = await context.present();
//   // items.photo1 = selection[0].path;
//   console.log("Selected image: ", selection[0].path);
//   const selectedPath = selection[0].path;
  

//   // router.navigate({
//   //       component: () => import('./PromptSelect.vue'),
//   //       props: { photo: selectedPath }
//   //     })
  



//      // permission request accepted or already granted
//      // ... call camera.takePicture here ...
// } else {
//      // permission request rejected
//      // ... tell the user ...
//      console.log("Library permission denied");
//      const cameraPermissionSuccess = perms.Details.Camera.Success;
//      const photoPermissionSuccess = perms.Details.Photo.Success
// }
// console.log("end");
  
// }

// async function addPhoto(){ const action = await Dialogs.action({
//         title: "Select an image",
//         cancelButtonText: 'Cancel',
//         actions: ["Choose from library", "Take a picture"],
//         cancelable: true
//     });

//     if(action === "Choose from library"){
//         // Photo library access
//         const imagePickerObj = imagePickerPlugin.create({
//             mode: "single"
//         });

//         const authResult = await imagePickerObj.authorize();
//         if(authResult.authorized){
//             const [selection] = await imagePickerObj.present();
//             recipeImage.value = selection.path;
//         }
//     }else if(action === "Take a picture"){
//         // Camera access
//         try{
//             await camera.requestCameraPermissions();
//             // Permission given
//             const isAvailable = camera.isAvailable();
//             if(isAvailable){
//                 const imageAsset = await camera.takePicture({
//                     saveToGallery: false
//                 });

//                 const filePath = path.join(documents.path, `${nanoid()}.jpg`);
//                 const img = await ImageSource.fromAsset(imageAsset);
//                 const saved = img.saveToFile(filePath, "jpg");

//                 if(saved){
//                     recipeImage.value = filePath;
//                 }else{
//                     throw new Error("Failed to save image from camera")
//                 }
//             }else{
//                 console.log("Device does not have a camera");
//             }
//         }catch(err){
//             // Permission denied
//             console.error(err);
//             console.log("No picture taken");
//         }
//     }
// }

</script>


<style>
.pbutt{
  width: 100px;
  background-color: rgb(148, 172, 231);
  border-radius: 50%;
  color: white;
  font-weight: bold;
  margin-top: 100px;
}
</style>
<!-- 
<style scoped>
.photobtn {
  background-color: rgb(148, 172, 231);
  border-radius: 50%;
}
.uploadbtn {
  background-color: rgb(148, 172, 231);
  border-radius: 50%;
  
}
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  bottom: 100%;  
}

</style> -->
