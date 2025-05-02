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

        
		<StackLayout orientation="vertical" class="page-content">
			<Label text="Name" class="input-label" />
			<TextField v-model="name" />

			<Label text="Description" class="input-label" />
			<TextField v-model="description" />

			<StackLayout orientation="vertical">
				<Label text="Ingredients" class="input-label" />

				<Label
					v-for="ingredient in ingredients"
					:text="ingredient"
				/>

				<StackLayout orientation="horizontal">
					<TextField width="70%" v-model="ingredientInput" />
					<Button width="30%" text="Add" @tap="addIngredient" />
				</StackLayout>
			</StackLayout>

			<StackLayout orientation="vertical">
				<Label text="Instructions" class="input-label" />

				<Label
					v-for="instruction in instructions"
					:text="instruction"
				/>

				<StackLayout orientation="horizontal">
					<TextField width="70%" v-model="instructionInput" />
					<Button width="30%" text="Add" @tap="addInstruction" />
				</StackLayout>
			</StackLayout>

        	
        </StackLayout>
	</Page>
</template>

<script setup>
import { $navigateBack } from 'nativescript-vue';
import { isAndroid } from '@nativescript/core';

const emit = defineEmits(["newRecipe"]);

const submit = () => {
	emit("newRecipe", {
        name: "Espresso martini",
        description: "A quick and easy guide to one of the best cocktails ever, the espresso martini. This coffee-based sipper was originally created by the late Dick Bradsell at the Soho Brasserie in London.",
        image: "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/espresso_martini_27398_16x9.jpg",
        ingredients: [
            "2 handfuls ice",
            "35ml/1¼fl oz vodka"
        ],
        instructions: [
            "For the sugar syrup, put the caster sugar in a small non-stick saucepan over a medium heat and pour in the water. Stir and bring to the boil. (CAUTION: boiling sugar is extremely hot. Handle very carefully. Use a deep pan to avoid bubbling over.)"
        ]
    });
	$navigateBack();
};
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>