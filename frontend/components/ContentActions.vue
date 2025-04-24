<!-- ContentActions.vue -->
<template>
	<!-- actions -->
	<div class="d-flex align-center mt-2 flex-nowrap overflow-x-auto">
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

		<div class="flex-grow-1" />

		<!-- favorite -->
		<v-btn rounded="xl" variant="text" size="small" :color="favorited ? 'yellow-darken-2' : undefined" :disabled="!canInteract"
			@click="emit('favorite')" :icon="favorited ? 'mdi-star' : 'mdi-star-outline'" />

		<!-- comments/replies -->
		<v-btn rounded="xl" variant="outlined" size="small" @click="emit('comments')" class="ml-2"
			:prepend-icon="'mdi-comment-outline'">
			{{ commentRepliesCount }}
		</v-btn>
	</div>
</template>

<script setup lang="ts">

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

const emit = defineEmits<{
	(e: 'upvote'): void
	(e: 'downvote'): void
	(e: 'favorite'): void
	(e: 'comments'): void
}>()

const props = defineProps<{
	readonly contentData: PostCore | CommentCore
}>()
</script>