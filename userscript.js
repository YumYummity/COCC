// ==UserScript==
// @name         COCC - Chrome On Crack Client
// @namespace    https://www.guilded.gg/i/Eqz4YlD2
// @version      0.5
// @description  COCC (Chrome On Crack Client) is a utility client designed for Tampermonkey with many features.
// @author       YumYummity
// @match        *://*/*
// @grant        GM_addStyle
// ==/UserScript==

// CSS for overlay menu
let style = document.createElement('style');
style.innerHTML = `
  .coc-menu-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #ff4500;
    color: #fff;
    border-radius: 50%;
    padding: 12px;
    cursor: pointer;
    z-index: 999;
  }

  .coc-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 998;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease-in-out;
  }

  .coc-menu-overlay.active {
    opacity: 1;
    pointer-events: auto;
  }

  #coc-menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .coc-menu-item {
    background-color: #000;
    color: #fff;
    padding: 10px 20px;
    margin: 10px;
    border-radius: 50px;
    cursor: pointer;
    text-align: center; /* Add this line to center the text */
  }

  .coc-menu-btn {
    border-radius: 10px;
  }

  /* Add CSS for second row */
  #coc-menu .coc-menu-row {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
    margin-top: 10px;
  }

  #coc-menu .coc-menu-item:nth-child(n+7) {
    margin-top: 10px;
  }
`;
document.head.appendChild(style);

// Check if the window is top level
if (window.self !== window.top) {
    return;
}

// Create Menu Button
let menuBtn = document.createElement('div');
menuBtn.classList.add('coc-menu-btn');
menuBtn.textContent = 'Menu';
document.body.appendChild(menuBtn);

// Create Menu Overlay
let overlay = document.createElement('div');
overlay.classList.add('coc-menu-overlay');
overlay.innerHTML = `
  <div id="coc-menu">
    <div class="coc-menu-item" id="gradientBgBtn">Gradient BG</div>
    <div class="coc-menu-item" id="seizureBgBtn">Seizure BG</div>
    <div class="coc-menu-item" id="rainbowBgBtn">Rainbow BG</div>
    <div class="coc-menu-item" id="customAlertBtn">Custom Alert</div>
    <div class="coc-menu-item" id="runScriptBtn">Run Script</div>
    <div class="coc-menu-item" id="reloadPageBtn">Reload Page</div>

    <!-- Add second row of buttons -->
    <div class="coc-menu-row">
      <div class="coc-menu-item" id="nukeBtn">Nuke Webpage</div>
      <div class="coc-menu-item" id="pageEditorBtn">Toggle Page Editor</div>
      <div class="coc-menu-item" id="a">Button 9</div>
      <div class="coc-menu-item" id="b">Button 10</div>
      <div class="coc-menu-item" id="c">Button 11</div>
      <div class="coc-menu-item" id="dblsixBtn">Execute Order 66</div>
    </div>
  </div>
`;
document.body.appendChild(overlay);

// Add click event listener to Menu Button
menuBtn.addEventListener('click', function() {
    overlay.classList.toggle('active');
});

// Function for toggling the menu overlay
function toggleMenu() {
    overlay.classList.toggle('active');
}

// Function to show error message
function showError(message) {
    let overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.zIndex = "9999";
    let errorBox = document.createElement("div");
    errorBox.style.backgroundColor = "#fff";
    errorBox.style.border = "1px solid #000";
    errorBox.style.borderRadius = "5px";
    errorBox.style.padding = "20px";
    errorBox.style.maxWidth = "500px";
    errorBox.style.margin = "0 auto";
    errorBox.style.position = "absolute";
    errorBox.style.top = "50%";
    errorBox.style.left = "50%";
    errorBox.style.transform = "translate(-50%, -50%)";
    let errorMessage = document.createElement("p");
    errorMessage.textContent = message;
    errorMessage.style.marginBottom = "20px";
    errorMessage.style.textAlign = "center";
    errorBox.appendChild(errorMessage);
    let okayButton = document.createElement("button");
    okayButton.textContent = "Okay";
    okayButton.style.padding = "10px";
    okayButton.style.backgroundColor = "#007bff";
    okayButton.style.color = "#fff";
    okayButton.style.border = "none";
    okayButton.style.borderRadius = "5px";
    okayButton.style.display = "block";
    okayButton.style.margin = "0 auto";
    okayButton.addEventListener("click", function() {
        overlay.remove();
    });
    errorBox.appendChild(okayButton);
    overlay.appendChild(errorBox);
    document.body.appendChild(overlay);
}

// Function for GradientBG
function gradientBg() {
    let colors = [
        '#FF0000', '#FFA500', '#FFFF00', '#00FF00', '#00FFFF',
        '#0000FF', '#4B0082', '#EE82EE', '#FF00FF', '#008000',
        '#FFD700', '#7FFF00', '#8A2BE2', '#FF1493', '#FF4500', '#2E8B57'
    ];
    let i = 0;
    let direction = 1;

    let intervalId = setInterval(function() {
        let color1 = colors[i];
        let color2 = colors[(i + direction + colors.length) % colors.length];

        let directions = ['to top', 'to top right', 'to right', 'to bottom right', 'to bottom', 'to bottom left', 'to left', 'to top left'];
        let randomDirection = directions[Math.floor(Math.random() * directions.length)];

        document.body.style.background = `linear-gradient(${randomDirection}, ${color1}, ${color2})`;

        i = (i + direction + colors.length) % colors.length;
    }, 500); // Interval time reduced to 500 milliseconds for faster changes

    // Toggle menu after starting GradientBG
    toggleMenu();
}

// Function for seizure background
function seizureBg() {
    toggleMenu();
    let overlay = document.createElement("div");
    overlay.style.cssText = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 9999;";
    let errorBox = document.createElement("div");
    errorBox.style.cssText = "background-color: #fff; border: 1px solid #000; border-radius: 5px; padding: 20px; max-width: 500px; margin: 0 auto; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);";
    let errorMessage = document.createElement("p");
    errorMessage.textContent = "Are you sure?";
    errorMessage.style.cssText = "margin-bottom: 20px; text-align: center;";
    errorBox.appendChild(errorMessage);
    let buttonContainer = document.createElement("div");
    buttonContainer.style.cssText = "display: flex; justify-content: center;";
    let cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.style.cssText = "padding: 10px; background-color: #007bff; color: #fff; border: none; border-radius: 5px; margin-right: 10px;";
    cancelButton.addEventListener("click", function() {
        overlay.remove();
    });
    buttonContainer.appendChild(cancelButton);
    let okButton = document.createElement("button");
    okButton.textContent = "Ok";
    okButton.style.cssText = "padding: 10px; background-color: #007bff; color: #fff; border: none; border-radius: 5px;";
    okButton.addEventListener("click", function() {
        let colors = ["#000000", "#ffffff"];
        let i = 0;
        let direction = 1;

        setInterval(function() {
            document.body.style.background = `linear-gradient(to right, ${colors[i]}, ${colors[i + direction]})`;
            i = i + direction;
            if (i === colors.length - 1 || i === 0) {
                direction = -direction;
            }
        }, 1);
        overlay.remove();
    });
    buttonContainer.appendChild(okButton);
    errorBox.appendChild(buttonContainer);
    overlay.appendChild(errorBox);
    document.body.appendChild(overlay);
}

function rainbowBg() {
    toggleMenu();
    let overlay = document.createElement("div");
    overlay.style.cssText = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 9999;";
    let errorBox = document.createElement("div");
    errorBox.style.cssText = "background-color: #fff; border: 1px solid #000; border-radius: 5px; padding: 20px; max-width: 500px; margin: 0 auto; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);";
    let errorMessage = document.createElement("p");
    errorMessage.textContent = "Set speed for rainbow background.";
    errorMessage.style.cssText = "margin-bottom: 20px; text-align: center;";
    errorBox.appendChild(errorMessage);
    let sliderContainer = document.createElement("div");
    sliderContainer.style.cssText = "display: flex; align-items: center; justify-content: center;";
    let slider = document.createElement("input");
    slider.type = "range";
    slider.min = 5;
    slider.max = 50;
    slider.value = 20;
    slider.style.cssText = "flex-grow: 1; margin-right: 10px;";
    let inputBox = document.createElement("input");
    inputBox.type = "number";
    inputBox.min = 5;
    inputBox.max = 50;
    inputBox.value = 20;
    inputBox.style.cssText = "width: 50px;";
    slider.addEventListener("input", function() {
        inputBox.value = slider.value;
    });
    inputBox.addEventListener("change", function() {
        let inputValue = parseInt(inputBox.value);
        if (inputValue < 5) {
            inputBox.value = 5;
        } else if (inputValue > 50) {
            inputBox.value = 50;
        }
        slider.value = inputBox.value;
    });
    sliderContainer.appendChild(slider);
    sliderContainer.appendChild(inputBox);
    errorBox.appendChild(sliderContainer);
    let buttonContainer = document.createElement("div");
    buttonContainer.style.cssText = "display: flex; justify-content: center; margin-top: 20px;";
    let cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.style.cssText = "flex-grow: 1; padding: 10px; background-color: #007bff; color: #fff; border: none; border-radius: 5px; margin-right: 10px;";
    cancelButton.addEventListener("click", function() {
        overlay.remove();
    });
    buttonContainer.appendChild(cancelButton);
    let okButton = document.createElement("button");
    okButton.textContent = "Ok";
    okButton.style.cssText = "flex-grow: 1; padding: 10px; background-color: #007bff; color: #fff; border: none; border-radius: 5px; margin-left: 10px;";
    okButton.addEventListener("click", function() {
        let hue = 0;
        let speed = parseInt(inputBox.value);
        setInterval(() => {
            hue = (hue + 1) % 360;
            document.body.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
        }, speed);
        overlay.remove();
    });
    buttonContainer.appendChild(okButton);
    errorBox.appendChild(buttonContainer);
    overlay.appendChild(errorBox);
    document.body.appendChild(overlay);
}


// Function to send a custom alert
function customAlert() {
    toggleMenu();
    let style = document.createElement("style");
    style.innerHTML = `
    .coc-alert-box {
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      max-width: 300px;
      text-align: center;
    }

    .coc-alert-input {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 5px;
      box-sizing: border-box; /* Add this property */
    }

    .coc-alert-buttons {
      display: flex;
      justify-content: center;
    }

    .coc-alert-ok,
    .coc-alert-cancel {
      background-color: #000;
      color: #fff;
      padding: 10px 20px;
      margin: 0 10px;
      border-radius: 50px;
      cursor: pointer;
    }
  `;
    document.head.appendChild(style);
    let overlay = document.createElement("div");
    overlay.classList.add("coc-menu-overlay");
    let alertBox = document.createElement("div");
    alertBox.classList.add("coc-alert-box");
    let title = document.createElement("h2");
    title.textContent = "Custom Alert";
    alertBox.appendChild(title);
    let input = document.createElement("input");
    input.type = "text";
    input.classList.add("coc-alert-input");
    alertBox.appendChild(input);
    let buttons = document.createElement("div");
    buttons.classList.add("coc-alert-buttons");
    let okButton = document.createElement("button");
    okButton.textContent = "Send Alert";
    okButton.classList.add("coc-alert-ok");
    okButton.addEventListener("click", function() {
        let message = input.value;
        overlay.classList.remove("active");
        setTimeout(function() {
            if (message) {
                alert(message);
            }
            overlay.remove();
        }, 300);
    });
    buttons.appendChild(okButton);
    let cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.classList.add("coc-alert-cancel");
    cancelButton.addEventListener("click", function() {
        overlay.classList.remove("active");
        setTimeout(function() {
            overlay.remove();
        }, 300);
    });
    buttons.appendChild(cancelButton);
    alertBox.appendChild(buttons);
    overlay.appendChild(alertBox);
    document.body.appendChild(overlay);
    setTimeout(function() {
        overlay.classList.add("active");
        input.focus();
    }, 100);
}

// Custom Script Popup
function runScript() {
    toggleMenu();
    let style = document.createElement("style");
    style.innerHTML = `
    .coc-script-box {
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      max-width: 600px;
      width: 70%;
      text-align: center;
      margin: 0 auto;
      box-sizing: border-box;
    }

    .coc-script-input {
      width: 100%;
      height: 150px;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 5px;
      box-sizing: border-box;
    }

    .coc-script-buttons {
      display: flex;
      justify-content: center;
    }

    .coc-script-run,
    .coc-script-cancel {
      background-color: #000;
      color: #fff;
      padding: 10px 20px;
      margin: 0 10px;
      border-radius: 50px;
      cursor: pointer;
    }

    .coc-error-box {
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      max-width: 400px;
      width: 70%;
      text-align: center;
      margin: 0 auto;
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 9999;
    }

    .coc-error-message {
      margin-bottom: 10px;
    }

    .coc-error-okay {
      background-color: #000;
      color: #fff;
      padding: 10px 20px;
      margin-top: 10px;
      border-radius: 50px;
      cursor: pointer;
    }
  `;
    document.head.appendChild(style);
    let overlay = document.createElement("div");
    overlay.classList.add("coc-menu-overlay");
    let scriptBox = document.createElement("div");
    scriptBox.classList.add("coc-script-box");
    let title = document.createElement("h2");
    title.textContent = "Custom Script";
    scriptBox.appendChild(title);
    let input = document.createElement("textarea");
    input.classList.add("coc-script-input");
    scriptBox.appendChild(input);
    let buttons = document.createElement("div");
    buttons.classList.add("coc-script-buttons");
    let runButton = document.createElement("button");
    runButton.textContent = "Run";
    runButton.classList.add("coc-script-run");
    runButton.addEventListener("click", function() {
        let script = input.value;
        if (!script.trim()) {
            // Check if input is empty or full of whitespaces
            overlay.classList.remove("active");
            setTimeout(function() {
                overlay.remove();
            }, 300);
            showError("Input can't be empty");
        } else {
            overlay.classList.remove("active");
            setTimeout(function() {
                try {
                    eval(script);
                } catch (error) {
                    console.error("Error in custom script:", error);
                }
                overlay.remove();
            }, 300);
        }
    });
    buttons.appendChild(runButton);
    let cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.classList.add("coc-script-cancel");
    cancelButton.addEventListener("click", function() {
        overlay.classList.remove("active");
        setTimeout(function() {
            overlay.remove();
        }, 300);
    });
    buttons.appendChild(cancelButton);
    scriptBox.appendChild(buttons);
    overlay.appendChild(scriptBox);
    document.body.appendChild(overlay);
    setTimeout(function() {
        overlay.classList.add("active");
        overlay.appendChild(scriptBox);
        document.body.appendChild(overlay);
        setTimeout(function() {
            overlay.classList.add("active");
        }, 100);
    }, 100);
}

// Function for Reload page with custom confirmation popup
function reloadPage() {
    toggleMenu();
    // Create overlay element
    let overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "9999"; // Set z-index to a higher value

    // Create confirmation popup element
    let popup = document.createElement("div");
    popup.style.backgroundColor = "#fff";
    popup.style.padding = "20px";
    popup.style.borderRadius = "10px";
    popup.style.textAlign = "center";
    popup.innerHTML = `
    <div style="margin-bottom: 10px;">Are you sure you want to reload?</div>
    <div>
      <button id="reloadYesBtn" style="margin-right: 10px; padding: 10px 20px; border-radius: 5px; background-color: #007bff; color: #fff; cursor: pointer;">Yes</button>
      <button id="reloadNoBtn" style="padding: 10px 20px; border-radius: 5px; background-color: #ccc; color: #000; cursor: pointer;">No</button>
    </div>
  `;

    // Append popup to overlay
    overlay.appendChild(popup);

    // Append overlay to body
    document.body.appendChild(overlay);

    // Add event listener for Yes button click
    document.getElementById('reloadYesBtn').addEventListener('click', function() {
        location.reload();
    });

    // Add event listener for No button click
    document.getElementById('reloadNoBtn').addEventListener('click', function() {
        document.body.removeChild(overlay);
    });
}


// Add event listeners for the buttons
document.getElementById('gradientBgBtn').addEventListener('click', gradientBg);
document.getElementById('seizureBgBtn').addEventListener('click', seizureBg);
document.getElementById('rainbowBgBtn').addEventListener('click', rainbowBg);
document.getElementById('customAlertBtn').addEventListener('click', customAlert);
document.getElementById('runScriptBtn').addEventListener('click', runScript);
document.getElementById('reloadPageBtn').addEventListener('click', reloadPage);

// Function for Reload page with custom confirmation popup
function nukePage() {
    toggleMenu();
    // Create overlay element
    let overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "9999"; // Set z-index to a higher value

    // Create confirmation popup element
    let popup = document.createElement("div");
    popup.style.backgroundColor = "#fff";
    popup.style.padding = "20px";
    popup.style.borderRadius = "10px";
    popup.style.textAlign = "center";
    popup.innerHTML = `
    <div style="margin-bottom: 10px;">Are you sure you want to nuke this webpage?</div>
    <div>
      <button id="reloadYesBtn" style="margin-right: 10px; padding: 10px 20px; border-radius: 5px; background-color: #007bff; color: #fff; cursor: pointer;">Yes</button>
      <button id="reloadNoBtn" style="padding: 10px 20px; border-radius: 5px; background-color: #ccc; color: #000; cursor: pointer;">No</button>
    </div>
  `;

    // Append popup to overlay
    overlay.appendChild(popup);

    // Append overlay to body
    document.body.appendChild(overlay);

    // Add event listener for Yes button click
    document.getElementById('reloadYesBtn').addEventListener('click', function() {
        // Create overlay container
        const overlayContainer = document.createElement('div');
        overlayContainer.id = 'overlay-container';
        overlayContainer.style.position = 'fixed';
        overlayContainer.style.top = '0';
        overlayContainer.style.left = '0';
        overlayContainer.style.width = '100%';
        overlayContainer.style.height = '100%';
        overlayContainer.style.zIndex = '9999';
        overlayContainer.style.display = 'flex';
        overlayContainer.style.justifyContent = 'center';
        overlayContainer.style.alignItems = 'center';
        overlayContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // Change the opacity or color as needed

        // Create overlay image
        const overlayImage = document.createElement('img');
        overlayImage.src = 'https://www.pngall.com/wp-content/uploads/5/Giant-Nuclear-Explosion-PNG-Image.png'; // Replace with the URL of the image you want to overlay
        overlayImage.style.maxWidth = '100%';
        overlayImage.style.maxHeight = '100%';

        // Append overlay image to overlay container
        overlayContainer.appendChild(overlayImage);

        // Remove all child nodes from the body
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }

        // Append overlay container to the body
        document.body.appendChild(overlayContainer);

        // Remove the overlay container after 2 seconds (2000ms)
        setTimeout(() => {
            overlayContainer.remove();
        }, 5000);
    });

    // Add event listener for No button click
    document.getElementById('reloadNoBtn').addEventListener('click', function() {
        document.body.removeChild(overlay);
    });
}

// Function for Reload page with custom confirmation popup
function executeOrder66() {
    toggleMenu();
    // Create overlay element
    let overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "9999"; // Set z-index to a higher value

    // Create confirmation popup element
    let popup = document.createElement("div");
    popup.style.backgroundColor = "#fff";
    popup.style.padding = "20px";
    popup.style.borderRadius = "10px";
    popup.style.textAlign = "center";
    popup.innerHTML = `
    <div style="margin-bottom: 10px;">Are you sure you want to execute Order 66?</div>
    <div>
      <button id="reloadYesBtn" style="margin-right: 10px; padding: 10px 20px; border-radius: 5px; background-color: #007bff; color: #fff; cursor: pointer;">Yes</button>
      <button id="reloadNoBtn" style="padding: 10px 20px; border-radius: 5px; background-color: #ccc; color: #000; cursor: pointer;">No</button>
    </div>
  `;

    // Append popup to overlay
    overlay.appendChild(popup);

    // Append overlay to body
    document.body.appendChild(overlay);

    // Add event listener for Yes button click
    document.getElementById('reloadYesBtn').addEventListener('click', function() {
        document.body.removeChild(overlay);
        document.body.style.filter = 'hue-rotate(' + Math.floor(Math.random() * 360) + 'deg) saturate(' + (Math.random() * 3 + 1) + ') blur(' + (Math.random() * 10) + 'px)';

        // Get all the elements on the webpage
        var elements = document.querySelectorAll('*');

        // Loop through each element and apply random position transformation with staggered time delay
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (element !== overlay) { // Exclude the overlay element

                // Define a function to apply the position transformation with a random delay
                var applyTransformation = function(el) {
                    var translateX = Math.floor(Math.random() * 201) - 100; // Random value between -100 and 100
                    var translateY = Math.floor(Math.random() * 201) - 100; // Random value between -100 and 100
                    var rotate = Math.floor(Math.random() * 361) - 180; // Random value between -180 and 180

                    // Apply the position transformation to the element using relative positioning
                    el.style.position = 'relative';
                    el.style.left = `${translateX}px`;
                    el.style.top = `${translateY}px`;
                    el.style.transform = `rotate(${rotate}deg)`;

                    // Call the function again after a random delay between 0.2 and 0.4 seconds
                    setTimeout(function() {
                        applyTransformation(el);
                    }, Math.random() * 200 + 200);
                };

                // Call the function to start applying the position transformation with a random delay
                applyTransformation(element);
            }
        }
    });

    // Add event listener for No button click
    document.getElementById('reloadNoBtn').addEventListener('click', function() {
        document.body.removeChild(overlay);
    });
}

// Function for Reload page with custom confirmation popup
function togglePageEditor() {
    toggleMenu();
    // Create overlay element
    let overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "9999"; // Set z-index to a higher value

    // Create confirmation popup element
    let popup = document.createElement("div");
    popup.style.backgroundColor = "#fff";
    popup.style.padding = "20px";
    popup.style.borderRadius = "10px";
    popup.style.textAlign = "center";
    popup.innerHTML = `
    <div style="margin-bottom: 10px;">Are you sure you want to toggle page editor to <span id="toggleStatus">${document.designMode === 'on' ? 'OFF' : 'ON'}</span>?</div>
    <div>
      <button id="reloadYesBtn" style="margin-right: 10px; padding: 10px 20px; border-radius: 5px; background-color: #007bff; color: #fff; cursor: pointer;">Yes</button>
      <button id="reloadNoBtn" style="padding: 10px 20px; border-radius: 5px; background-color: #ccc; color: #000; cursor: pointer;">No</button>
    </div>
  `;

    // Append popup to overlay
    overlay.appendChild(popup);

    // Append overlay to body
    document.body.appendChild(overlay);

    // Add event listener for Yes button click
    document.getElementById('reloadYesBtn').addEventListener('click', function() {
        // Toggle the designMode property
        document.designMode = (document.designMode === 'on') ? 'off' : 'on';
        // Update the text based on the current state of designMode
        document.getElementById('toggleStatus').textContent = (document.designMode === 'on') ? 'OFF' : 'ON';
        document.body.removeChild(overlay);
    });

    // Add event listener for No button click
    document.getElementById('reloadNoBtn').addEventListener('click', function() {
        document.body.removeChild(overlay);
    });
}


// Second row event listeners
document.getElementById('nukeBtn').addEventListener('click', nukePage);
document.getElementById('pageEditorBtn').addEventListener('click', togglePageEditor);
//document.getElementById('FBIBtn').addEventListener('click', FBI);
//document.getElementById('customAlertBtn').addEventListener('click', customAlert);
//document.getElementById('runScriptBtn').addEventListener('click', runScript);
document.getElementById('dblsixBtn').addEventListener('click', executeOrder66);
