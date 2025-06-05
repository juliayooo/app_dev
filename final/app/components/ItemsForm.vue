<template>
	<Page>
		<ActionBar title="New Recipe">
            <NavigationButton
                v-if="isAndroid"
                @tap="$navigateBack()" android.systemIcon="ic_menu_back"
            />
            <NavigationButton
                v-else
                @tap="$navigateBack()" text="Back"
            />
            <ActionItem
            	ios.position="right"
                @tap="submit" text="Submit"
            />
            
        </ActionBar>

        <StackLayout direction="vertical">
        	
        </StackLayout>
	</Page>
</template>

<script setup>
import { $navigateBack } from 'nativescript-vue';
import { isAndroid } from '@nativescript/core';

const emit = defineEmits(["newRecipe"]);

const submit = () => {

	$navigateBack();
};
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>