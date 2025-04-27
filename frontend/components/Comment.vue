<!-- Comment.vue -->
<template>
	<v-col align="start" class="mb-4 pa-0">
		<UserHeader :userData="commentData.user" :contentCreatedAt="commentData.createdAt"
			:contentUpdatedAt="commentData.updatedAt" />

		<!-- badges -->
		<div v-if="commentData.stats.badges && Object.keys(commentData.stats.badges).length"
			class="d-flex align-center flex-nowrap mb-4">
			<BadgeLabel v-for="(count, type) in commentData.stats.badges" :key="type" :badge="{ type, count }"
				:given="userInteractions.badgesGiven[type]" />
		</div>

		<!-- body -->
		<div ref="contentRef" v-html="commentData.bodyHtml" class="text-body-2" />

		<!-- actions -->
		<ContentActions :replyInsteadOfComment="true" :contentData="commentData" @commentReply="toggleReplyForm"
			@upvote="() => emit('upvote', commentData.id)" @downvote="() => emit('downvote', commentData.id)"
			@favorite="() => emit('favorite', commentData.id)" />

		<!-- reply form -->
		<div v-if="showReplyForm" class="mt-4">
			<v-textarea v-model="replyText" label="Your reply" rows="3" auto-grow />
			<div class="d-flex justify-end mt-2">
				<v-btn text @click="cancelReply">Cancel</v-btn>
				<v-btn color="primary" :disabled="!replyText.trim()" @click="submitReply">
					Reply
				</v-btn>
			</div>
		</div>
	</v-col>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import UserHeader from './UserHeader.vue';
import BadgeLabel from './BadgeLabel.vue';
import ContentActions from './ContentActions.vue';

const props = defineProps<{ commentData: CommentCore }>();
const emit = defineEmits<{
	(e: 'upvote', id: Id): void;
	(e: 'downvote', id: Id): void;
	(e: 'favorite', id: Id): void;
	(e: 'reply', id: Id, text: string): void;
}>();

const showReplyForm = ref(false);
const replyText = ref('');

const defaultInteractions = {
	hasUpvoted: false,
	hasDownvoted: false,
	isFavorited: false,
	badgesGiven: {} as Record<string, boolean>
};

const userInteractions = computed(() =>
	props.commentData.userInteractions ?? defaultInteractions
);

function toggleReplyForm() {
	showReplyForm.value = !showReplyForm.value;
	if (!showReplyForm.value) replyText.value = '';
}

function cancelReply() {
	showReplyForm.value = false;
	replyText.value = '';
}

function submitReply() {
	if (!replyText.value.trim()) return;
	emit('reply', props.commentData.id, replyText.value.trim());
	replyText.value = '';
	showReplyForm.value = false;
}
</script>
