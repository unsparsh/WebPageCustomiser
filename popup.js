document.getElementById('applyChanges').addEventListener('click', async () => {
    const theme = document.getElementById('theme').value;
    const fontColor = document.getElementById('fontColor').value;
  
    const styles = {
      theme,
      fontColor
    };
  
    // Send styles to content script
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: applyCustomStyles,
      args: [styles]
    });
  });
  
  // Function to apply styles on the webpage
  function applyCustomStyles(styles) {
    const themes = {
      dark: { background: "#121212", color: styles.fontColor },
      beige: { background: "#f5f5dc", color: styles.fontColor },
      lightGrey: { background: "#d3d3d3", color: styles.fontColor }
    };
  
    const themeStyles = themes[styles.theme];
    document.body.style.backgroundColor = themeStyles.background;
    document.body.style.color = themeStyles.color;
  
    const allElements = document.querySelectorAll("*");
    allElements.forEach(el => {
      el.style.color = themeStyles.color;
    });
  }
  