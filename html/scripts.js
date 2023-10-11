$(function () {
    const sounds = {
        success: new Audio('audio/success.ogg'),
        error: new Audio('audio/error.ogg'),
        info: new Audio('audio/info.ogg'),
        warning: new Audio('audio/warning.ogg'),
        achievement: new Audio('audio/achievement.ogg')
    };

    const volumes = {
        success: 0.7,
        error: 0.7,
        info: 0.6,
        warning: 0.5,
        achievement: 0.6
    };

    for (let key in sounds) {
        if (volumes[key] !== undefined) {
            sounds[key].volume = volumes[key];
        } else {
            // Default value if volume is not defined //
            sounds[key].volume = 0.8;
        }
    }

    window.addEventListener('message', function (popup) {
        if (popup.data.action !== 'open') return;

        const number = Math.floor((Math.random() * 1000) + 1);
        const baseClass = `.notifywindow-${number}`;

        $('.toast').append(getNotificationHtml(number, popup.data.message));

        setupNotificationStyles(baseClass, number);
        handleNotificationType(baseClass, number, popup.data);

        animateNotificationEntry(baseClass);

        setTimeout(() => {
            animateNotificationExit(baseClass);
            setTimeout(() => $(baseClass).remove(), 750);
        }, popup.data.time);
    });

    function getNotificationHtml(number, message) {
        return `
            <div class="notifywindow-${number}">
                <div class="notification_main-${number}">
                    <div class="title-${number}"></div>
                    <div class="text-${number}">${message}</div>
                </div>
            </div>`;
    }

    function setupNotificationStyles(baseClass, number) {
        $(baseClass).css({
            "margin": "0 0 8px -170px",
            "margin-bottom": "10px",
            "width": "290px",
            "border-radius": "28px"
        });
        $(`.notification_main-${number}`).addClass('main');
        $('.text-' + number).css({ "font-size": "14px" });
    }

    function handleNotificationType(baseClass, number, data) {
        const types = ['success', 'error', 'info', 'warning', 'achievement'];

        for (let type of types) {
            if (data.type === type) {
                setNotificationDetails(baseClass, number, data, type);
            }
        }
    }

    function setNotificationDetails(baseClass, number, data, type) {
        $(`${baseClass} .title-${number}`).html(data.title).css({
            "font-weight": "800",
            "font-size": "18px"
        });
        $(`.notification_main-${number}`).addClass(`${type}-icon`);
        $(baseClass).addClass(`${type} ${type}-border`);
        if (data.playSound) sounds[type].play();
    }

    function animateNotificationEntry(target) {
        anime({
            targets: target,
            translateY: ['-100%', 0],
            opacity: [0, 1],
            rotate: ['-10deg', 0],
            scale: [0.95, 1],
            duration: 750,
            easing: 'spring(1, 70, 100, 10)'
        });
    }

    function animateNotificationExit(target) {
        anime({
            targets: target,
            translateY: '1500%',
            opacity: [1, 0],
            rotate: ['-45deg'],
            scale: [1, 0.75],
            duration: 750,
            easing: 'easeInOutSine'
        });
    }
});