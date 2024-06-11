document.addEventListener('DOMContentLoaded', () => {
    const media = [
        { type: 'video', src: 'video/movie.mp4' },
        { type: 'video', src: 'video/movie2.mp4' },
        { type: 'video', src: 'video/movie3.mp4' },
        { type: 'image', src: 'images/festival4.webp' }
    ];

    let currentIndex = 0;

    const app = new PIXI.Application({
        width: 1000,
        height: 400, 
        backgroundColor: 0x1a1a1a
    });

    document.getElementById('pixi-slider').appendChild(app.view);

    const textures = media.map(item => {
        if (item.type === 'video') {
            const videoBaseTexture = PIXI.Texture.from(item.src);
            const videoSprite = new PIXI.Sprite(videoBaseTexture);
            videoSprite.texture.baseTexture.autoPlay = false;
            videoSprite.texture.baseTexture.mipmap = PIXI.MIPMAP_MODES.OFF;
            videoSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.CLAMP;
            videoSprite.texture.baseTexture.resource.source.muted = true;
            videoSprite.texture.baseTexture.resource.source.loop = true;
            videoSprite.texture.baseTexture.resource.source.controls = true;
            return videoSprite.texture;
        } else {
            return PIXI.Texture.from(item.src);
        }
    });

    const sprite = new PIXI.Sprite(textures[currentIndex]);
    app.stage.addChild(sprite);

    sprite.anchor.set(0.5);
    sprite.x = app.screen.width / 2;
    sprite.y = app.screen.height / 2;
    sprite.width = app.screen.width;
    sprite.height = app.screen.height;

    function resize() {
        app.renderer.resize(document.getElementById('slider-container').clientWidth, 400);
        sprite.x = app.screen.width / 2;
        sprite.y = app.screen.height / 2;
        sprite.width = app.screen.width;
        sprite.height = app.screen.height;
    }

    window.addEventListener('resize', resize);
    resize();

    function fadeIn(sprite) {
        sprite.alpha = 0;
        let ticker = new PIXI.Ticker();
        ticker.add((delta) => {
            if (sprite.alpha < 1) {
                sprite.alpha += 0.02 * delta;  // Adjust the increment to control speed
            } else {
                ticker.stop();
                ticker.destroy();
            }
        });
        ticker.start();
    }

    document.getElementById('next-button').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % textures.length;
        sprite.texture = textures[currentIndex];
        fadeIn(sprite);
    });

    document.getElementById('prev-button').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + textures.length) % textures.length;
        sprite.texture = textures[currentIndex];
        fadeIn(sprite);
    });

    // Initial fade-in
    fadeIn(sprite);
});
