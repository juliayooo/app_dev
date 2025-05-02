<template>
    <Page>
        <ActionBar>
            <NavigationButton
                v-if="isAndroid"
                @tap="$navigateBack()" android.systemIcon="ic_menu_back"
            />
            <NavigationButton
                v-else
                @tap="$navigateBack()" text="Back"
            />
            <Label :text="item.name"></Label>
        </ActionBar>

        <ScrollView >
            <StackLayout orientation="vertical" class="scrollview">
            <Image class="image" :src="item.image" width="90%"></Image>
            <Label class="name" :text="item.name" textWrap="true" ></Label>
            <Label class="description" :text="item.description" textWrap="true" ></Label>
            <Label class="ingredientsT" :text="item.ingredients.title" textWrap="true" fontSize="30px"></Label>
            <Label class="ingredients" v-for="ingredient in item.ingredients.list" :text="ingredient" textWrap="true" fontSize="30px"></Label>
            <Label class="steps" :text="item.steps" textWrap="true" fontSize="30px"></Label>
            <!-- <Label v-for="prop in props.item" :text="item.prop" /> -->

        </StackLayout>


        </ScrollView>
    </Page>
</template>

<script setup>
import { $navigateBack } from 'nativescript-vue';
import { isAndroid } from '@nativescript/core';
const props = defineProps(['item']);
</script>

<style scoped lang="scss">
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables
.ingredients{
    margin: 50px;
    color: white;
    font-style: italic;
}
.steps{
    margin: 80px;
    color: white;

}
.description{
    text-align: center;
    font-size: 30px;
    color: white;
    font-weight: bold;

}
.name{
    font-size: 60px;
    text-align: center;
    margin: 30px;
    color: white;
    font-weight: bold;


}
.scrollview{
    background: rgb(244,198,181);
}
.image{
    margin-top: 60px;
    
}
.ingredientsT{
    font-weight: bold;
    color: white;
    margin: 30px;
}
// Custom styles
</style>
