<!-- BadgeButton.vue -->
<template>
	<v-btn :disabled="disabled" class="d-flex flex-column align-center pa-2" variant="text" elevation="0"
		@click="$emit('award', badgeType)" stacked>
		<v-img :src="badgeIcons[badgeType]" width="32" height="32" contain />

		<!-- price + currency icon row -->
		<div class="d-flex align-center mt-2">
			<span class="text-caption font-weight-medium mr-1">{{ badgePrices[badgeType] }}</span>
			<v-img :src="toilet_paper" width="16" height="16" contain />
		</div>
	</v-btn>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import theFinger from '@/assets/icons/badges/the_finger.svg'
import stone from '@/assets/icons/badges/stone.svg'
import silver from '@/assets/icons/badges/silver.svg'
import gold from '@/assets/icons/badges/gold.svg'
import toilet_paper from '@/assets/icons/currencies/toilet_paper.svg'

type BadgeType = 'the_finger' | 'stone' | 'silver' | 'gold'

const badgeIcons: Record<BadgeType, string> = {
	the_finger: theFinger,
	stone: stone,
	silver: silver,
	gold: gold,
}

const badgePrices: Record<BadgeType, number> = {
	the_finger: 550,
	stone: 100,
	silver: 400,
	gold: 1000,
}

const bgColor = computed(() => {
	switch (props.badgeType) {
		case 'the_finger': return 'bg-error'
		case 'stone': return 'bg-warning'
		case 'silver': return 'bg-info'
		case 'gold': return 'bg-grey-lighten-2'
	}
})

const props = defineProps<{
	badgeType: BadgeType
	disabled?: boolean
}>()
</script>
