<!-- layouts/default.vue -->
<template>
	<v-app>
		<TopBar />

		<v-main>
			<NuxtPage />
		</v-main>
	</v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TopBar from '~/components/TopBar.vue'
</script>
