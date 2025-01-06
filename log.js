document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    const showError = (message) => {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        errorMessage.style.opacity = '0';
        setTimeout(() => {
            errorMessage.style.opacity = '1';
            errorMessage.style.transition = 'opacity 0.3s ease-in-out';
        }, 50);
    };

    const clearError = () => {
        errorMessage.style.display = 'none';
    };

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (!username || !password) {
            showError('Username and password cannot be empty.');
            return;
        }

        if (username === 'user' && password === 'pass123') {
            showError('Logging in...');
            errorMessage.style.color = 'green';
            setTimeout(() => {
                window.location.href = 'beranda.html';
            }, 1000);
        } else {
            showError('Invalid username or password.');
        }
    });

    usernameInput.addEventListener('input', clearError);
    passwordInput.addEventListener('input', clearError);
});
