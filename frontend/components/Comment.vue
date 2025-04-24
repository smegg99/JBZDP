<!-- Comment.vue -->
<template>
	<v-col no-gutters align="start" class="mb-4">
		<UserHeader :userData="commentData.user" :contentCreatedAt="commentData.createdAt"
			:contentUpdatedAt="commentData.updatedAt" />
		<!-- badges -->
		<div class="d-flex align-center flex-nowrap overflow-x-auto mb-2">
			<BadgeButton v-for="(count, type) in commentData.stats.badges" :key="type" :badge="{ type, count }"
				:given="userInteractions.badgesGiven[type]" :canGive="canInteract"
				@badge="emit('badge', { type, count })" />
		</div>

		<!-- body -->
		<div ref="contentRef" v-html="commentData.bodyHtml" class="text-body-2" />

		<!-- actions -->
		<ContentActions :contentData="commentData" @reply="emit('reply', commentData.id)"
			@upvote="emit('upvote')" @downvote="emit('downvote')" @favorite="emit('favorite')" />
	</v-col>
</template>

<script setup lang="ts">
import UserHeader from './UserHeader.vue';
import BadgeButton from './BadgeButton.vue';

const defaultInteractions = {
	hasUpvoted: false,
	hasDownvoted: false,
	isFavorited: false,
	badgesGiven: {} as Record<string, boolean>
}

const userInteractions = computed(() =>
	props.commentData.userInteractions ?? defaultInteractions
)

const canInteract = computed(() => {
	return props.commentData.userInteractions != null
})

const emit = defineEmits<{
	(e: 'upvote'): void
	(e: 'downvote'): void
	(e: 'favorite'): void
	(e: 'reply', id: Id): void
	(e: 'badge', badgeType: BadgeEntry): void
}>()

const props = defineProps<{ commentData: CommentCore }>()
</script>