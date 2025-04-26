<template>
	<v-btn
		text
		class="d-flex align-center"
		:disabled="disabled"
		@click="emit('award', badgeType)"
	>
		<!-- badge icon on the far left -->
		<v-img
			:src="badgeIcons[badgeType]"
			width="24"
			height="24"
		/>
		<!-- push price+coin to the right -->
		<v-spacer />
		<!-- price + currency, centered vertically -->
		<div class="d-flex align-center">
			<span class="text-body-2 mr-1">
				{{ badgePrices[badgeType].price }}
			</span>
			<v-img
				:src="currencyIcon"
				width="16"
				height="16"
			/>
		</div>
	</v-btn>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import theFinger from '@/assets/badges/the_finger.svg'
import stone from '@/assets/badges/stone.svg'
import silver from '@/assets/badges/silver.svg'
import gold from '@/assets/badges/gold.svg'
import currency from '@/assets/currency/currency.svg'

type BadgeType = 'the_finger' | 'stone' | 'silver' | 'gold'

interface BadgeEntry {
	type: BadgeType
	price: number
}

const badgeIcons: Record<BadgeType, string> = {
	the_finger: theFinger,
	stone: stone,
	silver: silver,
	gold: gold
}

const badgePrices: Record<BadgeType, BadgeEntry> = {
	the_finger: { type: 'the_finger', price: 1 },
	stone: { type: 'stone', price: 2 },
	silver: { type: 'silver', price: 3 },
	gold: { type: 'gold', price: 4 }
}

const props = defineProps<{
	readonly badgeType: BadgeType
	readonly given?: boolean
	readonly currencyIcon?: string
}>()

const emit = defineEmits<{
	(e: 'award', badge: BadgeType): void
}>()

const disabled = computed(() => props.given === true)
const currencyIcon = computed(() => props.currencyIcon ?? currency)
</script>
