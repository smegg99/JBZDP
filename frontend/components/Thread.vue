<!-- Thread.vue -->
<template>
	<div>
		<div v-for="comment in comments" :key="comment.id" class="mb-4">
			<Comment :commentData="comment" @reply="onReply" />

			<div v-if="depth < maxDepth && (comment.comments?.length ?? 0) > 0" class="d-flex">
				<v-divider
					vertical
					class="mx-2 mx-md-4"
					color="grey lighten-2"
				/>

				<!-- nested thread grows to fill the rest -->
				<Thread :comments="comment.comments ?? []" :maxDepth="maxDepth" :depth="depth + 1" @respond="onReply"
					class="flex-grow-1" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Thread from './Thread.vue'
import Comment from './Comment.vue'

const props = defineProps<{
	comments: CommentCore[]
	maxDepth: number
	depth?: number
}>()

const depth = props.depth ?? 0
const emit = defineEmits<{
	(e: 'respond', parentId: Id): void
}>()

function onReply(id: Id) {
	emit('respond', id)
}
</script>
