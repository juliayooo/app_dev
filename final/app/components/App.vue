<template>
  <TabView androidTabsPosition="bottom">
    <TabViewItem title="Today">
      <Frame>
        <Page>
        <ScrollView>
            <StackLayout>
              <Label :text="`${new Date().toLocaleDateString()}`" class="h2" textAlignment="center" />
              <Label :text="prompts" class="p" textWrap="true" />
              <Button class="fillPrompt" text="Fill Prompt" @tap="fillPrompt"/>

            </StackLayout>
                  
       
          </ScrollView>
      </Page>
        </Frame>
     
    </TabViewItem>
  
    <TabViewItem title="Collection">
      <Frame>
          <Browse />
      </Frame>
    </TabViewItem>
  </TabView>
</template>


<script setup>
import Browse from "./Browse.vue"
import { ref, onMounted } from 'nativescript-vue'
import { knownFolders, path, File, ObservableArray, toJSON, GridLayout, Frame } from "@nativescript/core";
import PromptSelect from "./PromptSelect.vue";
import { $navigateTo } from 'nativescript-vue'

// const $navigateTo = useNavigate();

async function fillPrompt()  {
  console.log("Filling prompt with photo");
  $navigateTo(PromptSelect, {
    // props: {  }
  });
}





console.log("Hello from App.vue");
const prompts = ref("");


// check if prompts generated for the day 

const documents = knownFolders.documents();
const filePath = path.join(documents.path, "data.json");
let items; 



const getPrompts = async () => {
  console.log("Fetching prompts from ChatGPT API...")
  try {      console.log("1");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": ""
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
  } catch (error) {
    console.error("API error:", error)
  }



    items = new ObservableArray([
  {
    day: new Date().toLocaleDateString(),
    promptlist: prompts.value,
    photo1: null,
    photo2: null,
    photo3: null,
  }
  ]);


      //convert to json string
      const JSONstring = items.toJSON();
      // wrote string 
      console.log(JSONstring);

      // write to file
      const file = documents.getFile("data.json");
      file.writeTextSync(JSON.stringify(JSONstring));

}


onMounted(() => {


  // store today's prompts by date as JSON locally 
  
  const file = documents.getFile("data.json");
  if (File.exists(filePath)) {
    const content = file.readTextSync();
    try {
      const parsed = JSON.parse(content);
      items = new ObservableArray(parsed);
      const todayEntry = items.find(item => item.day === new Date().toLocaleDateString());
      if (todayEntry) {
        prompts.value = todayEntry.promptlist;
        return;
      }
    } catch (e) {
      console.error("Error parsing data.json", e);
    }
  }

  // No prompt for today found, fetch one
  getPrompts();

  

})

</script>

<style lang="scss">
@import "@nativescript/theme/scss/variables/blue";

.h2 {
  font-size: 30;
  margin: 16 0;
}
.p {
  font-size: 50;
  margin: 30;
}

</style>
