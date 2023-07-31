<script lang="ts">
	import { goto } from '$app/navigation'
	import SvgIcon from '@jamescoyle/svelte-icon'
	import { mdiChevronLeft } from '@mdi/js'

	const back = () => {
		const ref = document.referrer
		goto(ref.length > 0 ? ref : '/')
	}
</script>

<nav>
	<button class="back-button" on:click={back}>
		<SvgIcon type="mdi" path={mdiChevronLeft} size={32} />
		뒤로
	</button>
</nav>

<style lang="scss">
	.back-button {
		height: 64px;
		margin-top: 8px;
		border: none;
		background-color: unset;

		cursor: pointer;

		display: flex;
		align-items: center;

		font-size: 20px;
		font-weight: bold;
	}
</style>
