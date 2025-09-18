export const useNotification = () => {
  // "The Beacon of Grace" - Ref for controlling the visibility of the snackbar
  const snackbar: Ref<boolean> = useState("snackbar", () => false);

  // "Color of the Elden Light" - Ref for setting the color of the snackbar
  const snackbarColor: Ref<string> = useState("snackbarColor", () => "");

  // "Words of the Ancients" - Ref for setting the text of the snackbar
  const snakeBarTexts: Ref<string> = useState("snakeBarTexts", () => "");

  // "Summon the Grace" - Function to trigger the notification with specified color and text
  function fireNotification(
    snackbarColorProp: string,
    snakeBarTextsProp: string
  ): void {
    // "Illuminate the Beacon" - Show the snackbar
    snackbar.value = true;

    // "Embrace the Elden Light" - Set the snackbar color
    snackbarColor.value = snackbarColorProp;

    // "Echo the Ancient Words" - Set the snackbar text
    snakeBarTexts.value = snakeBarTextsProp;
  }

  // "Return to the Lands Between" - Return the state and the function
  return { snackbar, snackbarColor, snakeBarTexts, fireNotification };
};
