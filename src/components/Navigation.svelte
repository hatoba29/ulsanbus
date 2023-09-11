<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { goto } from '$app/navigation'
	import SvgIcon from '@jamescoyle/svelte-icon'
	import { mdiChevronLeft, mdiStar, mdiStarOutline } from '@mdi/js'

	export let favorite: boolean

	const dispatch = createEventDispatcher<{ toggle: null }>()

	const back = () => {
		const ref = document.referrer
		goto(ref.length > 0 ? ref : '/')
	}
	const toggleFavorite = () => {
		dispatch('toggle')
	}
</script>

<nav class="wrapper">
	<button class="back-button" on:click={back}>
		<SvgIcon type="mdi" path={mdiChevronLeft} size={32} />
		뒤로
	</button>
	<button class="star-button" on:click={toggleFavorite}>
		{#if favorite}
			<SvgIcon type="mdi" path={mdiStar} size={32} />
		{:else}
			<SvgIcon type="mdi" path={mdiStarOutline} size={32} />
		{/if}
	</button>
</nav>

<style lang="scss">
	@use '@/styles/color';
	@use '@/styles/button';

	.wrapper {
		margin-top: 8px;

		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.back-button {
		@extend %button;

		height: 64px;

		font-size: 20px;
		font-weight: bold;
	}
	.star-button {
		@extend %button;

		:global(path) {
			color: color.$yellow;
		}
	}
</style>
