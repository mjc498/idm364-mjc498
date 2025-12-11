<script>	
	let openQuestion = $state(null);
  
	const faqs = [
	  {
		id: 1,
		question: "Is this store real?",
		answer: "No, this store is not real! This is a project I created for a class called Interactive App Design IV. The class required its students create an online shopping store using the framework SvelteKit."
	  },
	  {
		id: 2,
		question: "Are the erasers edible?",
		answer: "No, the erasers are not edible! They are designed to look like delicious fruits but are made of rubber and other materials not meant for consumption. Please do not eat them!"
	  },
	  {
		id: 3,
		question: "Do the erasers actually erase?",
		answer: "Yes! While they look like adorable fruits, these erasers are fully functional and can erase pencil marks effectively. They work just like regular erasers."
	  },
	  {
		id: 4,
		question: "Can I get a refund?",
		answer: "Since this is a demonstration project for a class assignment, no actual transactions occur and therefore refunds are not applicable. This is a portfolio piece showcasing web development skills."
	  },
	  {
		id: 5,
		question: "Where is my order?",
		answer: "As this is a demo store created for educational purposes, no real orders are processed or shipped. This project demonstrates e-commerce functionality and user interface design."
	  },
	  {
		id: 6,
		question: "How can I contact you?",
		answer: "If you'd like to reach out about this project or discuss web development opportunities, please feel free to contact me through my portfolio website or professional social media accounts."
	  }
	];
  
	function toggleQuestion(id) {
	  openQuestion = openQuestion === id ? null : id;
	}

	import { slide } from 'svelte/transition';
  </script>
  
  <svelte:head>
	<title>FAQ - Erase with Taste</title>
  </svelte:head>
  
  <main class="faq-container">
	<div class="left-section">
	  <h1 class="title">Frequently Asked Questions</h1>
	</div>
  
	<div class="right-section">
	  <div class="questions-container">
		{#each faqs as faq}
		  <div class="faq-item">
			<button 
			  class="question-header"
			  onclick={() => toggleQuestion(faq.id)}
			  aria-expanded={openQuestion === faq.id}
			  aria-controls="answer-{faq.id}"
			  id="question-{faq.id}"
			>
			  <span class="question-text">{faq.question}</span>
			  <img 
				src="/images/plus.svg" 
				alt=""
				aria-hidden="true"
				class="plus-icon"
				class:rotated={openQuestion === faq.id}
			  />
			</button>
			{#if openQuestion === faq.id}
			  <div 
				class="answer"
				id="answer-{faq.id}"
				role="region"
				aria-labelledby="question-{faq.id}"
				transition:slide={{ duration: 300 }}
			  >
				<p>{faq.answer}</p>
			  </div>
			{/if}
		  </div>
		{/each}
	  </div>
	</div>
  </main>

<style>
	:global(body) {
		background-color: #FAFAFA;
		margin: 0;
		padding: 0;
		font-family: 'Nunito', sans-serif;
	}

	.faq-container {
		display: flex;
		height: 1040px;
		align-self: stretch;
		overflow: hidden;
	}

	.left-section {
		display: inline-flex;
		padding: 52px 115px 598px 52px;
		flex-direction: column;
		align-items: center;
		background: #FFB0B0;
	}

	.title {
		width: 593px;
		color: #333;
		font-family: 'Fredoka One', sans-serif;
		font-size: 110px;
		font-weight: 400;
	}

	.right-section {
		display: flex;
		flex: 1;
		background: #FAFAFA;
		justify-content: center;
		align-items: flex-start;
	}

	.questions-container {
		display: flex;
		width: 538px;
		padding: 105px 0;
		flex-direction: column;
		align-items: flex-start;
		gap: 24px;
	}

	.faq-item {
		width: 100%;
	}

	.question-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		align-self: stretch;
		border-bottom: 1px solid #333;
		width: 100%;
		background: none;
		border-top: none;
		border-left: none;
		border-right: none;
		padding: 20px 0;
		cursor: pointer;
	}

	.question-text {
		color: #333;
		font-family: 'Nunito', sans-serif;
		font-size: 18px;
		font-weight: 700;
		text-align: left;
	}

	.plus-icon {
		width: 20px;
		height: 20px;
		transition: transform 0.3s ease;
	}

	.plus-icon.rotated {
		transform: rotate(45deg);
	}

	.answer {
		width: 100%;
		padding: 20px 0;
		overflow: hidden;
	}

	.answer p {
		color: #333;
		font-family: 'Nunito', sans-serif;
		font-size: 16px;
		line-height: 25.2px;
		margin: 0;
	}

	@media (max-width: 1024px) {
		.faq-container {
			flex-direction: column;
			height: auto;
		}

		.left-section {
			padding: 40px;
			align-items: flex-start;
		}

		.title {
			width: 100%;
			font-size: 64px;
			line-height: 74px;
		}

		.questions-container {
			width: 90%;
			padding: 60px 0;
		}
	}

	@media (max-width: 768px) {
		.left-section {
			padding: 30px;
		}

		.title {
			font-size: 48px;
			line-height: 58px;
		}

		.questions-container {
			width: 95%;
			padding: 40px 0;
		}

		.question-text {
			font-size: 16px;
			line-height: 22px;
		}

		.answer p {
			font-size: 16px;
			line-height: 22px;
		}
	}
</style>