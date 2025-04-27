<!-- ContentActions.vue -->
<template>
	<!-- actions -->
	<div class="d-flex align-center mt-4 flex-nowrap">
		<!-- upvote -->
		<v-btn rounded="xl" variant="outlined" size="small" :color="upvoted ? 'green' : undefined"
			:disabled="!canInteract" @click="emit('upvote')" class="mr-2"
			:prepend-icon="upvoted ? 'mdi-plus-circle' : 'mdi-plus-circle-outline'">
			{{ upvoteCount }}
		</v-btn>

		<!-- downvote -->
		<v-btn rounded="xl" variant="outlined" size="small" :color="downvoted ? 'red' : undefined"
			:disabled="!canInteract" @click="emit('downvote')" class="mr-2"
			:prepend-icon="downvoted ? 'mdi-minus-circle' : 'mdi-minus-circle-outline'">
			{{ downvoteCount }}
		</v-btn>

		<v-spacer class="flex-grow-1" />

		<!-- favorite -->
		<v-btn rounded="xl" variant="text" size="small" density="comfortable"
			:color="favorited ? 'yellow-darken-2' : undefined" :disabled="!canInteract" @click="emit('favorite')"
			:icon="favorited ? 'mdi-star' : 'mdi-star-outline'">
		</v-btn>

		<!-- award -->
		<v-menu v-model="menuOpen" offset-y>
			<template #activator="{ props: menuProps }">
				<v-btn v-bind="menuProps" rounded="xl" variant="text" size="small" density="comfortable"
					:disabled="!canInteract" icon="mdi-trophy-variant" class="ml-2" />
			</template>

			<!-- new horizontal badge row -->
			<v-card
				class="pa-4"
				elevation="1"
				style="overflow: visible"
			>
				<v-row
					v-for="type in badgeTypes"
					:key="type"
					cols="auto"
					class="d-flex flex-column align-center"
					style="overflow: visible"
				>
					<BadgeButton
						:badgeType="type"
						:disabled="userInteractions.badgesGiven?.[type]"
						@award="selectBadge"
					/>
				</v-row>
			</v-card>
		</v-menu>

		<!-- comments/replies -->
		<v-btn rounded="xl" variant="outlined" size="small" @click="emit('comments')" class="ml-2"
			:prepend-icon="replyInsteadOfComment ? 'mdi-reply' : 'mdi-comment'">
			{{ commentRepliesCount }}
		</v-btn>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BadgeButton from './BadgeButton.vue'

const menuOpen = ref(false)
const defaultInteractions = {
	hasUpvoted: false,
	hasDownvoted: false,
	isFavorited: false,
	badgesGiven: {} as Record<string, boolean>
}

const userInteractions = computed(() =>
	props.contentData.userInteractions ?? defaultInteractions
)
const canInteract = computed(() => {
	return props.contentData.userInteractions != null
})

const upvoted = computed(() => userInteractions.value?.hasUpvoted ?? false)
const downvoted = computed(() => userInteractions.value?.hasDownvoted ?? false)
const favorited = computed(() => userInteractions.value?.isFavorited ?? false)

const upvoteCount = computed(() => props.contentData.stats.upvoteCount)
const downvoteCount = computed(() => props.contentData.stats.downvoteCount)
const commentRepliesCount = computed(() => props.contentData.comments?.length ?? 0)

const badgeTypes = ['the_finger', 'stone', 'silver', 'gold'] as const

const emit = defineEmits<{
	(e: 'upvote'): void
	(e: 'downvote'): void
	(e: 'favorite'): void
	(e: 'award', badge: BadgeType): void
	(e: 'comments'): void
}>()

const props = defineProps<{
	readonly contentData: PostCore | CommentCore
	readonly replyInsteadOfComment?: boolean
}>()

function selectBadge(badge: { type: BadgeType; price: number; icon: string }) {
	emit('award', badge.type)
	menuOpen.value = false
}
</script>