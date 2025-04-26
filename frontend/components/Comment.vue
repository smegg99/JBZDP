<!-- Comment.vue -->
<template>
	<v-col align="start" class="mb-4">
		<UserHeader :userData="commentData.user" :contentCreatedAt="commentData.createdAt"
			:contentUpdatedAt="commentData.updatedAt" />

		<!-- badges -->
		<div
			v-if="commentData.stats.badges && Object.keys(commentData.stats.badges).length"
			class="d-flex align-center flex-nowrap mb-4"
		>
			<BadgeLabel
				v-for="(count, type) in commentData.stats.badges"
				:key="type"
				:badge="{ type, count }"
				:given="userInteractions.badgesGiven[type]"
			/>
		</div>

		<!-- body -->
		<div ref="contentRef" v-html="commentData.bodyHtml" class="text-body-2" />

		<!-- actions -->
		<ContentActions :replyInsteadOfComment="true" :contentData="commentData" @reply="emit('reply', commentData.id)" @upvote="emit('upvote')"
			@downvote="emit('downvote')" @favorite="emit('favorite')" />
	</v-col>
</template>

<script setup lang="ts">
import UserHeader from './UserHeader.vue';
import BadgeLabel from './BadgeLabel.vue';

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