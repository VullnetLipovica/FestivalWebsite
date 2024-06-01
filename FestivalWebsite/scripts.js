document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');

    // Hide the preloader after a delay
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 1000); // Adjust this value for longer or shorter preloader display

    const audioIcon = document.getElementById('audio-icon');
    const audio = document.getElementById('audio');

    if (audio) {
        audio.volume = 0.08;

        audioIcon.addEventListener('mouseenter', () => {
            audio.play();
            audioIcon.src = 'images/music2.gif'; // Change to the new icon
        });

        audioIcon.addEventListener('mouseleave', () => {
            audio.pause();
            audio.currentTime = 0;
            audioIcon.src = 'images/music2.png'; // Revert to the original icon
        });
    }

    // Create a Pixi Application
    const app = new PIXI.Application({
        width: window.innerWidth,
        height: 400,
        backgroundColor: 0x1a1a1a
    });

    // Append the Pixi canvas to the container
    document.getElementById('pixi-container').appendChild(app.view);

    // Create interactive zones
    const zones = [
        { name: 'Main Stage', x: 860, y: 10, width: 300, height: 110, color: 0xff0000, price: '$200', info: 'Main Stage - Best View!' },
        { name: 'VIP', x: 650, y: 130, width: 200, height: 110, color: 0x00ff00, price: '$150', info: 'VIP Area - Exclusive Access!' },
        { name: 'Ultra', x: 1172, y: 10, width: 200, height: 110, color: 0x0000ff, price: '$100', info: 'Ultra Area - Premium Experience!' },
        { name: 'Normal', x: 860, y: 130, width: 300, height: 200, color: 0x000000, price: '$50', info: 'Normal Area - General Admission!' }
    ];

    zones.forEach(zone => {
        // Create zone graphics
        const zoneGraphics = new PIXI.Graphics();
        zoneGraphics.beginFill(zone.color);
        zoneGraphics.drawRect(0, 0, zone.width, zone.height);
        zoneGraphics.endFill();
        zoneGraphics.x = zone.x;
        zoneGraphics.y = zone.y;
        zoneGraphics.interactive = true;
        zoneGraphics.buttonMode = true;
        zoneGraphics.on('pointerover', () => {
            showInfoBox(zone.info, zone.price);
        });
        zoneGraphics.on('pointerout', hideInfoBox);
        app.stage.addChild(zoneGraphics);

        // Create text label for the zone
        const zoneText = new PIXI.Text(zone.name, {
            fontFamily: 'Kanit',
            fontSize: 24,
            fill: 0xffffff,
            align: 'center'
        });
        zoneText.x = zone.x + zone.width / 2 - zoneText.width / 2; // Center text horizontally
        zoneText.y = zone.y + zone.height / 2 - zoneText.height / 2; // Center text vertically
        app.stage.addChild(zoneText);
    });

    const infoBox = document.getElementById('info-box');

    function showInfoBox(info, price) {
        infoBox.innerHTML = `<p>${info}</p><p>${price}</p>`;
        infoBox.style.display = 'block';
    }

    function hideInfoBox() {
        infoBox.style.display = 'none';
    }

    // Handle ticket purchase buttons
    document.getElementById('normal-ticket').addEventListener('click', () => {
        alert('Normal Ticket Purchased!');
    });

    document.getElementById('early-bird-ticket').addEventListener('click', () => {
        alert('Early Bird Ticket Purchased!');
    });

    document.getElementById('vip-ticket').addEventListener('click', () => {
        alert('VIP Ticket Purchased!');
    });

    document.getElementById('ultra-ticket').addEventListener('click', () => {
        alert('Ultra Ticket Purchased!');
    });
});
