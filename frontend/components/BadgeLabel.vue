<!-- BadgeLabel.vue -->
<template>
	<v-chip size="x-small" variant="text" :color="badgeColors[badge.type]" class="px-1 overflow-visible">
		<v-img :src="badgeIcons[badge.type]" width="24" height="24" class="mr-1" />
		<span class="text-caption">{{ badge.count }}</span>
	</v-chip>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import theFinger from '@/assets/badges/the_finger.svg'
import stone from '@/assets/badges/stone.svg'
import silver from '@/assets/badges/silver.svg'
import gold from '@/assets/badges/gold.svg'

type BadgeType = 'the_finger' | 'stone' | 'silver' | 'gold'
interface BadgeEntry { type: BadgeType; count: number }

const badgeIcons: Record<BadgeType, string> = {
	the_finger: theFinger,
	stone: stone,
	silver: silver,
	gold: gold
}

const badgeColors: Record<BadgeType, string> = {
	the_finger: 'red',
	stone: 'grey',
	silver: 'cyan',
	gold: 'yellow'
}

const props = defineProps<{
	readonly badge: BadgeEntry
	readonly given?: boolean
}>()
</script>