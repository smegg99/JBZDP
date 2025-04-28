<!-- FollowedButton.vue -->
<template>
	<v-menu
		v-model="menuOpen"
		close-on-content-click
		transition="slide-y-transition"
		:open-on-hover="!smAndDown"
	>
		<template #activator="{ props }">
			<v-btn
				text
				v-bind="props"
				class="mx-3 top-bar-button"
				:append-icon="menuOpen ? 'mdi-menu-up' : 'mdi-menu-down'"
			>
				Obserwowane
			</v-btn>
		</template>
		<v-card class="pa-4" elevation="1" style="overflow: visible">
			<v-row cols="12" class="d-flex flex-column align-start">
				<v-btn
					block
					variant="text"
					class="d-flex justify-space-between mb-2"
					@click="goToSections"
					append-icon="mdi-fire"
				>
					Działy
				</v-btn>
				<v-btn
					block
					variant="text"
					class="d-flex justify-space-between"
					@click="goToUsers"
					append-icon="mdi-account-multiple"
				>
					Użytkownicy
				</v-btn>
			</v-row>
		</v-card>
	</v-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

const menuOpen = ref(false)
const router = useRouter()
const { smAndDown } = useDisplay()  // true on xs/sm screens

function goToSections() {
	menuOpen.value = false
	void router.push('/followed/sections')
}

function goToUsers() {
	menuOpen.value = false
	void router.push('/followed/users')
}
</script>
