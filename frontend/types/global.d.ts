// types/global.d.ts
/* eslint-disable @typescript-eslint/consistent-type-definitions */

import 'vue'

declare global {
	type Brand<T, B extends string> = T & { readonly __brand: B }

	interface WithId<I = Id>        { readonly id: I }
	interface WithTimestamps        { readonly createdAt: UnixMs; readonly updatedAt: UnixMs }
	interface Votable               { readonly stats: VoteStats; readonly userInteractions: UserInteractions | null }
	interface Authored              { readonly user: User; }
	interface NamedEntity<I = Id> extends WithId<I> { readonly name: string; readonly slug: string; readonly order: number }

	type Id           = Brand<number, 'id'>
	type UnixMs       = Brand<number, 'unixMs'>
	type Currency     = Brand<number, 'currency'>
	type Tag          = Brand<string, 'tag'>
	type SectionId    = Brand<number, 'sectionId'>
	type SubsectionId = Brand<number, 'subsectionId'>
	type CountryCode  = Brand<string, 'countryCode'>

	export const badgeTypes = ['the_finger', 'stone', 'silver', 'gold'] as const
	type BadgeType = (typeof badgeTypes)[number]
	type Badges = Record<BadgeType, number>
	type BadgesGiven = Record<BadgeType, boolean>
	interface BadgeEntry {readonly type: BadgeType, readonly count: number}

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
		readonly countryOfOrigin: CountryCode
		readonly isBanned: boolean
	}

	interface VoteStats { upvoteCount: number; downvoteCount: number; badges: Badges }
	interface UserInteractions {
		isFavorited: boolean;
		hasUpvoted: boolean;
		hasDownvoted: boolean;
		badgesGiven: BadgesGiven;
	}

	interface Section    extends NamedEntity<SectionId>    {}
	interface Subsection extends NamedEntity<SubsectionId> { readonly sectionId: SectionId }

	// Subsections can be null for posts without a subsection, e.g. those in the "Oczekujące" section
	interface PostLocation { readonly sectionId: SectionId; readonly subsectionId: SubsectionId | null }

	interface CommentCore extends WithId, WithTimestamps, Authored, Votable {
		readonly postId: Id
		readonly parentId: Id | null
		readonly bodyHtml: string
		readonly isDeleted: boolean
		readonly isPinned: boolean
		readonly comments: CommentCore[] | null
		readonly userInteractions: UserInteractions | null
	}

	interface PostCore extends WithId, WithTimestamps, Authored, Votable, PostLocation {
		readonly title: string
		readonly subtitle: string
		readonly tags: Tag[]
		readonly bodyHtml: string
		readonly pinnedComments: CommentCore[] | null
		// NOTE: Posts can be fetched in two ways:
		// 1. With the comments included (e.g. when fetching a whole post)
		// 2. Without the comments content included, used only for getting their count
		readonly comments: CommentCore[] | null
		readonly userInteractions: UserInteractions | null
	}
}

export {}