document.addEventListener('DOMContentLoaded', () => {
    // Initialize PixiJS application for animated DJ disc
    const app = new PIXI.Application({ 
        width: window.innerWidth, 
        height: 300, 
        backgroundColor: 0x1099bb 
    });
    document.getElementById('pixi-container').appendChild(app.view);

    // Function to draw a DJ disc
    function drawDJDisc(graphics, radius) {
        // Outer circle
        graphics.beginFill(0x000000);
        graphics.drawCircle(0, 0, radius);
        graphics.endFill();

        // Inner circle
        graphics.beginFill(0xffffff);
        graphics.drawCircle(0, 0, radius * 0.6);
        graphics.endFill();

        // Small center circle
        graphics.beginFill(0xff0000);
        graphics.drawCircle(0, 0, radius * 0.1);
        graphics.endFill();

        // Lines on the disc
        graphics.lineStyle(2, 0xffd700);
        for (let i = 0; i < 12; i++) {
            const angle = (i * Math.PI) / 6;
            const x1 = Math.cos(angle) * radius * 0.6;
            const y1 = Math.sin(angle) * radius * 0.6;
            const x2 = Math.cos(angle) * radius;
            const y2 = Math.sin(angle) * radius;
            graphics.moveTo(x1, y1);
            graphics.lineTo(x2, y2);
        }
    }

    // Create a graphic (a DJ disc in this case)
    const graphics = new PIXI.Graphics();
    graphics.x = app.screen.width / 2;
    graphics.y = app.screen.height / 2;
    drawDJDisc(graphics, 50);
    app.stage.addChild(graphics);

    // Animate the DJ disc
    app.ticker.add(() => {
        graphics.rotation += 0.01;
    });

    // Update DJ disc size based on slider value
    document.getElementById('slider').addEventListener('input', (event) => {
        const size = event.target.value;
        graphics.clear();
        drawDJDisc(graphics, size);
    });

    // Adjust PixiJS canvas size on window resize
    window.addEventListener('resize', () => {
        app.renderer.resize(window.innerWidth, 300);
        graphics.x = app.screen.width / 2;
        graphics.y = app.screen.height / 2;
    });

    // Audio play/pause on hover
    const audioIcon = document.getElementById('audio-icon');
    const audio = document.getElementById('audio');

    audioIcon.addEventListener('mouseenter', () => {
        audio.play();
    });

    audioIcon.addEventListener('mouseleave', () => {
        audio.pause();
        audio.currentTime = 0; // Reset audio to the start
    });

    const genreFilter = document.getElementById('genre-filter');
    const artists = document.querySelectorAll('.artist');
    const audioElements = document.querySelectorAll('.audio-sample');
    const modal = document.getElementById('artist-modal');
    const modalContent = modal.querySelector('.modal-content');
    const modalArtistName = document.getElementById('modal-artist-name');
    const modalArtistDetails = document.getElementById('modal-artist-details');
    const closeModal = modal.querySelector('.close');
    const artistLinks = document.querySelectorAll('.artist-link');

    genreFilter.addEventListener('change', (event) => {
        const selectedGenre = event.target.value;
        artists.forEach(artist => {
            if (selectedGenre === 'all' || artist.getAttribute('data-genre') === selectedGenre) {
                artist.style.display = 'block';
            } else {
                artist.style.display = 'none';
            }
        });
    });

    artists.forEach(artist => {
        const img = artist.querySelector('.artist-img');
        const audio = artist.querySelector('.audio-sample');
        
        img.addEventListener('click', () => {
            // Pause all other audio elements
            audioElements.forEach(a => {
                if (a !== audio) {
                    a.pause();
                    a.currentTime = 0;
                }
            });

            // Toggle play/pause on click
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
                audio.currentTime = 0;
            }

            // Show modal with artist details
            const artistName = artist.querySelector('h3').innerText;
            const artistDetails = artist.getAttribute('data-details');
            modalArtistName.innerText = artistName;
            modalArtistDetails.innerHTML = artistDetails;
            modal.style.display = 'block';
        });
    });

    artistLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const artistId = link.getAttribute('href').substring(1);
            const artist = document.getElementById(artistId);

            const artistName = artist.querySelector('h3').innerText;
            const artistDetails = artist.getAttribute('data-details');
            modalArtistName.innerText = artistName;
            modalArtistDetails.innerHTML = artistDetails;
            modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Initialize PixiJS application for animated background
    const backgroundApp = new PIXI.Application({ 
        width: window.innerWidth, 
        height: window.innerHeight, 
        transparent: true
    });
    document.getElementById('pixi-bg').appendChild(backgroundApp.view);

    // Create particles for background animation
    const particles = [];
    const totalParticles = 100;
    const particleTexture = PIXI.Texture.from('images/98.jpg'); // Add a particle image to your project

    for (let i = 0; i < totalParticles; i++) {
        const particle = new PIXI.Sprite(particleTexture);
        particle.x = Math.random() * backgroundApp.screen.width;
        particle.y = Math.random() * backgroundApp.screen.height;
        particle.alpha = Math.random();
        particle.scale.set(Math.random() * 0.5);
        particle.speed = Math.random() * 2 - 1;
        backgroundApp.stage.addChild(particle);
        particles.push(particle);
    }

    backgroundApp.ticker.add(() => {
        particles.forEach(particle => {
            particle.y += particle.speed;
            if (particle.y > backgroundApp.screen.height) {
                particle.y = 0;
                particle.x = Math.random() * backgroundApp.screen.width;
            }
        });
    });

    window.addEventListener('resize', () => {
        backgroundApp.renderer.resize(window.innerWidth, window.innerHeight);
    });
});
