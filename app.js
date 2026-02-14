document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Update nav
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update tabs
        const target = btn.dataset.tab;
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        document.getElementById(target).classList.add('active');
    });
});

function selectMask(mask) {
    showToast(`Equipped: ${mask.charAt(0).toUpperCase() + mask.slice(1)} Mask`);

    // Simple mock effects
    const accent = mask === 'ronin' ? '#9d50bb' : (mask === 'ghost' ? '#00ccff' : '#00ff88');
    document.documentElement.style.setProperty('--accent', accent);
}

function petInteraction(action) {
    const avatar = document.getElementById('petAvatar');
    let emoji = '🐾';
    let msg = '';

    switch (action) {
        case 'feed':
            emoji = '😋';
            msg = 'Yum! Pet is full.';
            break;
        case 'pet':
            emoji = '🥰';
            msg = 'Pet loves the attention!';
            break;
        case 'play':
            emoji = '🎉';
            msg = 'XP Gained! Pet is happy.';
            break;
    }

    avatar.innerText = emoji;
    showToast(msg);

    setTimeout(() => {
        avatar.innerText = '🐾';
    }, 2000);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Initial state
console.log("MaskMode Preview Loaded.");
