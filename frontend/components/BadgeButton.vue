<!-- BadgeButton.vue -->
<template>
	<v-btn :key="badge.type" rounded="xl" :variant="given ? 'tonal' : 'outlined'" size="small"
		:color="badgeColors[badge.type]" :disabled="!canGive"
		class="mr-2" @click="emit('badge', badge)">
		<template #prepend>
			<v-img :src="badgeIcons[badge.type]" width="16" height="16" class="mr-1" />
		</template>
		<!-- NOTE: this should update only increment on the emit event -->
		{{ badge.count }}
	</v-btn>
</template>

<script setup lang="ts">
import theFinger from '@/assets/badges/the_finger.svg'
import stone from '@/assets/badges/stone.svg'
import silver from '@/assets/badges/silver.svg'
import gold from '@/assets/badges/gold.svg'

const badgeIcons: Record<BadgeType, string> = {
	the_finger: theFinger,
	stone: stone,
	silver: silver,
	gold: gold
}

const badgeColors: Record<BadgeType, string> = {
	the_finger: 'red',
	stone: 'grey',
	silver: 'dark-grey',
	gold: 'yellow'
}

const emit = defineEmits<{
	(e: 'badge', badgeType: BadgeEntry): void
}>()

const props = defineProps<{
	readonly badge: BadgeEntry
	readonly given: boolean
	readonly canGive: boolean
}>()
</script>