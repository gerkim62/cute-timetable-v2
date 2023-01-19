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
