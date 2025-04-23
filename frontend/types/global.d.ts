// types/global.d.ts
/* eslint-disable @typescript-eslint/consistent-type-definitions */

import 'vue'

declare global {
	type Brand<T, B extends string> = T & { readonly __brand: B }

	interface WithId<I = Id>        { readonly id: I }
	interface WithTimestamps        { readonly createdAt: UnixMs; readonly updatedAt: UnixMs }
	interface Votable               { readonly stats: VoteStats; readonly viewerInteraction: ViewerInteraction }
	interface Authored              { readonly user: User; readonly badges: Badges }
	interface NamedEntity<I = Id> extends WithId<I> { readonly name: string; readonly slug: string; readonly order: number }

	type Id           = Brand<number, 'id'>
	type UnixMs       = Brand<number, 'unixMs'>
	type Currency     = Brand<number, 'currency'>
	type Tag          = Brand<string, 'tag'>
	type SectionId    = Brand<number, 'sectionId'>
	type SubsectionId = Brand<number, 'subsectionId'>

	export const badgeTypes = ['the_finger', 'stone', 'silver', 'gold'] as const
	type BadgeType = (typeof badgeTypes)[number]
	type Badges    = Record<BadgeType, number>

	type SearchType = 'posts' | 'users'
	interface SortOption { label: string; value: string; icon: string }

	type BaseRole = 'admin' | 'mod' | 'user'

	interface User extends WithId {
		readonly name: string
		readonly avatar: string
		readonly joinedAt: UnixMs
		readonly badges: Badges
		readonly isVerified: boolean
		readonly currency: Currency
		readonly baseRole: BaseRole
	}

	interface VoteStats { upvoteCount: number; downvoteCount: number }
	interface ViewerInteraction { isFavorited: boolean; hasUpvoted: boolean; hasDownvoted: boolean }

	interface Section    extends NamedEntity<SectionId>    {}
	interface Subsection extends NamedEntity<SubsectionId> { readonly sectionId: SectionId }

	// Subsections can be null for posts without a subsection, e.g. those in the "Oczekujące" section
	interface PostLocation { readonly sectionId: SectionId; readonly subsectionId: SubsectionId | null }

	interface CommentCore extends WithId, WithTimestamps, Authored, Votable {
		readonly postId: Id
		readonly parentId: Id | null
		readonly bodyHtml: string
		readonly isDeleted: boolean
		readonly isEdited: boolean
		readonly isPinned: boolean
	}

	interface PostCore extends WithId, WithTimestamps, Authored, Votable, PostLocation {
		readonly title: string
		readonly subtitle: string
		readonly tags: Tag[]
		readonly bodyHtml: string
		readonly isEdited: boolean
		readonly pinnedComments: CommentCore[]
	}
}

export {}