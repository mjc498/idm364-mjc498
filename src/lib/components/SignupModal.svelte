<script>
	let { onClose = () => {}, onSwitchToLogin = () => {} } = $props();
	
	let username = $state('');
	let password = $state('');
	let rememberMe = $state(false);

	function handleSignup() {
		console.log('Sign up:', { username, password, rememberMe });
		onClose();
	}

	function handleOverlayClick(e) {
		if (e.target === e.currentTarget) {
			onClose();
		}
	}
</script>

<div 
	class="modal-overlay" 
	onclick={handleOverlayClick}
	onkeydown={(e) => e.key === 'Escape' && onClose()}
	role="button"
	tabindex="0"
	aria-label="Close modal"
>
	<div class="modal-container">
		<button class="close-btn" onclick={onClose} aria-label="Close">
			<img src="/images/exit.svg" alt="Close" />
		</button>

		<h2 class="modal-title">Sign Up</h2>
		<p class="login-text">
			Have an account? <button type="button" class="login-link" onclick={onSwitchToLogin}>Log in!</button>
		</p>

		<form class="signup-form" onsubmit={(e) => { e.preventDefault(); handleSignup(); }}>
			<div class="input-group">
				<input
					type="text"
					class="input-field"
					placeholder="Your username or email"
					bind:value={username}
					required
				/>

				<input
					type="password"
					class="input-field"
					placeholder="Create a password"
					bind:value={password}
					required
				/>
			</div>

			<button type="submit" class="signup-btn">Sign Up</button>
		</form>
	</div>
</div>

<style>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(202, 202, 202, 0.50);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		cursor: pointer;
	}

	.modal-container {
		width: 652px;
		height: auto;
		flex-shrink: 0;
		border-radius: 10px;
		background: #FAFAFA;
		padding: 32px;
		position: relative;
		cursor: default;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.close-btn {
		position: absolute;
		top: 32px;
		right: 32px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		width: 18px;
		height: 18px;
		transition: opacity 0.2s;
	}

	.close-btn:hover {
		opacity: 0.7;
	}

	.close-btn img {
		width: 18px;
		height: 18px;
		display: block;
	}

	.modal-title {
		height: 58px;
		align-self: stretch;
		color: #333;
		font-family: 'Fredoka One', sans-serif;
		font-size: 48px;
		font-weight: 400;
		margin: 0;
	}

	.signup-form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 32px;
		width: 100%;
	}

	.input-group {
		display: flex;
		width: 588px;
		flex-direction: column;
		align-items: flex-start;
		gap: 32px;
	}

	.input-field {
		display: flex;
		width: 588px;
		height: 52px;
		align-items: center;
		gap: 8px;
		border: none;
		border-bottom: 1px solid #333;
		background: transparent;
		font-family: 'Nunito', sans-serif;
		font-size: 16px;
		color: #333;
		padding: 0;
		outline: none;
	}

	.input-field::placeholder {
		color: rgba(202, 202, 202, 0.50);
	}

	.signup-btn {
		display: inline-flex;
		padding: 12px 264px;
		justify-content: center;
		align-items: center;
		gap: 10px;
		border-radius: 6px;
		background: #8B4513;
		border: none;
		color: #FAFAFA;
		font-family: 'Nunito', sans-serif;
		font-size: 20px;
		font-weight: 700;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	.signup-btn:hover {
		background-color: #6d3410;
	}

	.login-text {
		align-self: stretch;
		color: #333;
		font-family: 'Nunito', sans-serif;
		font-size: 16px;
		margin-bottom: 41px;
	}

	.login-link {
		background: none;
		border: none;
		color: #333;
		font-family: 'Nunito', sans-serif;
		font-size: 18px;
		font-style: normal;
		font-weight: 700;
		line-height: 25.2px;
		cursor: pointer;
		padding: 0;
		transition: opacity 0.2s;
	}
	
	@media (max-width: 700px) {
		.modal-container {
			width: 90%;
			height: auto;
			padding: 24px;
		}

		.input-group,
		.input-field {
			width: 100%;
		}

		.modal-title {
			font-size: 36px;
			line-height: 40px;
		}

		.signup-btn {
			padding: 12px 80px;
		}
	}
</style>