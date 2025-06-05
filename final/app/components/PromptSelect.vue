<template>
  <Page>
    <StackLayout>
      <!-- <Image :src="photo" stretch="aspectFit" height="300" /> -->
      <Label text="Which prompt does this photo match?" class="h2" textAlignment="center" />
      <GridLayout columns="*,*,*" rows="auto" class="buttons">
        <Button class="photobtn" text="Take photo" @tap="capturePhoto"/>
              <Button class="uploadbtn" text="Upload photo" @tap="uploadPhoto"/>
        <!-- <Button text="1" col="0" @tap="selectPrompt(1)" />
        <Button text="2" col="1" @tap="selectPrompt(2)" />
        <Button text="3" col="2" @tap="selectPrompt(3)" /> -->
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script setup>
import { requestPermissions } from '@nativescript/camera';
import * as ImagePicker from '@nativescript/imagepicker';
const camera = require("@nativescript/camera");
const { Image } = require("@nativescript/core");
import Browse from "./Browse.vue"
import { ref, onMounted } from 'nativescript-vue'
import { knownFolders, path, File, ObservableArray, toJSON, GridLayout, Frame } from "@nativescript/core";
import { $navigateTo } from 'nativescript-vue'


console.log("PromptSelect.vue loaded");

// Get / check camera permissions 
//  **************************************************************
// REFERENCE: https://docs.nativescript.org/plugins/camera
//  **************************************************************
const selectedImage = ref(null);

async function capturePhoto(){
    console.log("Camera permissions");

  const perms = await camera.requestPermissions();

if (perms.Success && camera.isAvailable()) {
  console.log("Camera permission granted");
     // permission request accepted or already granted
     // ... call camera.takePicture here ...
} else {
     // permission request rejected
     // ... tell the user ...
     console.log("Camera permission denied");
     const cameraPermissionSuccess = perms.Details.Camera.Success;
     const photoPermissionSuccess = perms.Details.Photo.Success
}
console.log("end");
};

//UPLOAD FROM ALBUM 
async function uploadPhoto(){
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

  // router.navigate({
  //       component: () => import('./PromptSelect.vue'),
  //       props: { photo: selectedPath }
  //     })
  



     // permission request accepted or already granted
     // ... call camera.takePicture here ...
} else {
     // permission request rejected
     // ... tell the user ...
     console.log("Library permission denied");
     const cameraPermissionSuccess = perms.Details.Camera.Success;
     const photoPermissionSuccess = perms.Details.Photo.Success
}
console.log("end");
  
}



</script>

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

</style>
