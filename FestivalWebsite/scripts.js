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
        graphics.beginFill(0x000000);
        graphics.drawCircle(0, 0, radius);
        graphics.endFill();

        graphics.beginFill(0xffffff);
        graphics.drawCircle(0, 0, radius * 0.6);
        graphics.endFill();

        graphics.beginFill(0xff0000);
        graphics.drawCircle(0, 0, radius * 0.1);
        graphics.endFill();

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

    const graphics = new PIXI.Graphics();
    graphics.x = app.screen.width / 2;
    graphics.y = app.screen.height / 2;
    drawDJDisc(graphics, 50);
    app.stage.addChild(graphics);

    app.ticker.add(() => {
        graphics.rotation += 0.01;
    });

    document.getElementById('slider').addEventListener('input', (event) => {
        const size = event.target.value;
        graphics.clear();
        drawDJDisc(graphics, size);
    });

    window.addEventListener('resize', () => {
        app.renderer.resize(window.innerWidth, 300);
        graphics.x = app.screen.width / 2;
        graphics.y = app.screen.height / 2;
    });

    const audioIcon = document.getElementById('audio-icon');
    const audio = document.getElementById('audio');

    audio.volume = 0.08;

    audioIcon.addEventListener('mouseenter', () => {
        audio.play();
    });

    audioIcon.addEventListener('mouseleave', () => {
        audio.pause();
        audio.currentTime = 0;
    });

    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        // Add a delay of 1 second (1000 milliseconds)
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 700); // You can adjust this value to make the delay longer or shorter
    });

});
