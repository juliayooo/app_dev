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

        <ScrollView>
            <StackLayout orientation="vertical">
                <Image :src="item.image" ref="image" class="recipe-image" />

                <Label
                    class="m-10 h3 recipe-content"
                    :text="item.description"
                    verticalAlignment="top"
                    textWrap="true"
                />

                <Label class="h1 m-10 recipe-content" text="Ingredients" />
                <Label class="m-10 recipe-content" v-for="ingredient in item.ingredients"
                    :key="ingredient"
                    :text="ingredient"
                    textWrap="true"
                />

                <Label class="h1 m-10 recipe-content" text="Instructions" />
                <Label class="m-10 recipe-content" v-for="instruction in item.instructions"
                    :key="instruction"
                    :text="instruction"
                    textWrap="true"
                />
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

// Custom styles
</style>