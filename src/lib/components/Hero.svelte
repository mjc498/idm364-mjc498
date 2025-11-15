<section class="hero">
    <div class="hero-content">
        <h1>Erase with Taste.</h1>
        <p>Discover our collection of food erasers that look good enough to eat! From pizza to cake, our novelty erasers make perfect gifts, desk accessories, and conversation starters. Functional art that actually works.</p>
    </div>

    <div class="hero-icon">
        <svg viewBox="0 0 200 200" class="icon-svg">
            <circle
                cx="100"
                cy="100"
                r="95"
                fill="#FFB0B0"
            />
            <defs>
                <path
                    id="circlePath"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                />
            </defs>

            <g class="rotating-text">
                <text class="icon-text">
                    <textPath href="#circlePath" startOffset="0%">
                      ERASE WITH TASTE. ERASE WITH TASTE.
                    </textPath>
                </text>
            </g>

            <image 
                href="/images/hero-icon.png" 
                x="50" 
                y="50" 
                width="100" 
                height="100"
            />
        </svg>
    </div>
</section>

<style>
    .hero {
        background-color: #FFB0B0;
        padding: 80px 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 4rem;
        position: relative;
        min-height: 400px;
    }

    .hero-content {
        max-width: 800px;
        flex: 1;
    }

    h1 {
        font-family: 'Fredoka', sans-serif;
        font-size: 96px;
        color: #333333;
        margin: 0 0 16px 0;
        line-height: 130px;
    }

    p {
        font-family: 'Nunito', sans-serif;
        font-size: 20px;
        font-weight: 400;
        color: #333333;
        line-height: 35px;
        margin: 0;
        max-width: 900px;
    }

    .hero-icon {
        flex-shrink: 0;
        width: 250px;
        height: 250px;
    }

    .icon-svg {
        width: 100%;
        height: 100%;
    }

    .rotating-text {
        animation: rotate 20s linear infinite;
        transform-origin: 100px 100px;
    }

    .icon-text {
        font-family: 'Nunito', sans-serif;
        font-size: 16px;
        font-weight: 350;
        letter-spacing: 4px;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @media (max-width: 1024px) {
        .hero {
            flex-direction: column;
            padding: 60px 2rem;
        }

        .hero-content {
            display: flex;
            flex-direction: column;
        }

        h1 {
            font-size: 72px;
        }

        p {
            max-width: 100%;
        }

        .hero-icon {
            width: 180px;
            height: 180px;
        }
    }

    @media (max-width: 480px) {
        .hero {
            padding: 40px 1rem;
        }

        h1 {
            font-size: 48px;
        }

        p {
            font-size: 18px;
        }

        .hero-icon {
            width: 150px;
            height: 150px;
        }

        .icon-text {
            font-size: 12px;
        }
    }
</style>