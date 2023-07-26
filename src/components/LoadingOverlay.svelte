<script lang="ts">
	import { fade } from 'svelte/transition'
	import LoadingCircle from './_LoadingCircle.svelte'
</script>

<div class="wrapper" transition:fade>
	<LoadingCircle color="#61afef" size={100} />
	<span>데이터를 불러오는 중입니다...</span>
</div>

<style lang="scss">
	.wrapper {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: #00000050;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		span {
			margin-top: 24px;

			font-size: 18px;
			font-weight: bold;
		}
	}
</style>
