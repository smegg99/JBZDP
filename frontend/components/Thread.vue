<!-- Thread.vue -->
<template>
	<div>
		<Comment v-for="comment in rootComments" :key="comment.id" :comment="comment" @reply="onReply" />
		<div class="ml-8">
			<Comment v-for="comment in replies" :key="comment.id" :comment="comment" @reply="onReply" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Comment from './Comment.vue'

const props = defineProps<{ comments: CommentCore[] }>()
const emit = defineEmits<{ (e: 'respond', parentId: Id): void }>()

const onReply = (id: Id) => emit('respond', id)

const rootComments = computed(() => props.comments.filter(c => !c.parentId))
const replies = computed(() => props.comments.filter(c => !!c.parentId))
</script>