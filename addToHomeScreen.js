let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-info bar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Show the button to prompt the user to add to home screen
  showAddToHomeScreenButton(); // Call your function to show the button
});

function showAddToHomeScreenButton() {
  const button = document.createElement('button');
  button.innerText = 'Add to Home Screen';
  button.style.position = 'fixed';
  button.style.bottom = '20px';
  button.style.right = '20px';
  button.style.zIndex = '1000';
  document.body.appendChild(button);

  button.addEventListener('click', () => {
    // Hide the button
    button.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
}

// Optionally, hide the button if the user has already added the app
if (window.matchMedia('(display-mode: standalone)').matches) {
  const button = document.querySelector('button');
  if (button) {
    button.style.display = 'none';
  }
}
