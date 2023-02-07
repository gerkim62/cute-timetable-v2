/**
 * showCustomInstallPrompt - shows a custom installation prompt to the user
 * @param {BeforeInstallPromptEvent} event - the beforeinstallprompt event that was fired
 *
 * This function removes the hidden class from the custom install UI, adds event listeners to the "not now" and "install" buttons, and when the install button is clicked, it triggers the event.prompt() method to show the native installation prompt.
 * The userChoice promise is used to check the outcome of the prompt and log the result. It also add the hidden class to the custom install UI.
 */
export function showCustomInstallPrompt(event) {
  customInstallUI.classList.remove('hidden');
  notNowButton.addEventListener('click', () => {
    customInstallUI.classList.add('hidden');
    console.log('clicked not now')
  })
  customInstallButton.addEventListener('click', () => {
    event.prompt();
    customInstallUI.classList.add('hidden');
    event.userChoice.then((choice) => {

      if (choice.outcome === 'accepted') {
        console.log('The app was installed');
      } else {
        console.log('The app was not installed');
      }
      customInstallUI.classList.add('hidden');
    });
  });
}


// function to lock screen orientation to landscape
export function lockScreenToLandscape() {
  enableFullscreen(document.body)
  if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock('landscape');
  } else if (screen.lockOrientation) {
    screen.lockOrientation('landscape');
  } else if (screen.webkitLockOrientation) {
    screen.webkitLockOrientation('landscape');
  } else if (screen.mozLockOrientation) {
    screen.mozLockOrientation('landscape');
  } else if (screen.msLockOrientation) {
    screen.msLockOrientation('landscape');
  }
}

// function to unlock screen orientation
export function unlockScreenFromLandscape() {
  disableFullscreen()
  if (screen.orientation && screen.orientation.unlock) {
    screen.orientation.unlock();
  } else if (screen.unlockOrientation) {
    screen.unlockOrientation();
  } else if (screen.webkitUnlockOrientation) {
    screen.webkitUnlockOrientation();
  } else if (screen.mozUnlockOrientation) {
    screen.mozUnlockOrientation();
  } else if (screen.msUnlockOrientation) {
    screen.msUnlockOrientation();
  }
}

// function to enable fullscreen
function enableFullscreen(element) {
  if (!document.fullscreenElement) {
    element.requestFullscreen();
  }
}

// function to disable fullscreen
function disableFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
}
