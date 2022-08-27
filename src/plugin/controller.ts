// Show the UI window with a set size
figma.showUI(__html__, { width: 300, height: 500 });

// Interpret a message from the UI
figma.ui.onmessage = (msg) => {

  // According to the message type
  switch (msg.type) {

    // Apply the given gradient to the selection
    case 'apply':
      ApplyGradient(msg.gradient);
      break;

    // Return back if the user made a valid selection for the application of the gradient
    case 'clickedGradientButton':
      CheckSelection(msg.flag);
      break;

  }

};

function ApplyGradient(gradient) {

  // Go through all nodes in selection
  for (const node of figma.currentPage.selection) {

    // If the given node can be filled in, fill it in with the selected gradient
    if ("fills" in node) {

      const fills = [
        gradient
      ];

      node.fills = fills;

    }
  }
}

// Message the UI about the user's selection
function CheckSelection(flagObject) {

  figma.ui.postMessage({
    type: 'hasSelection',
    selection: (figma.currentPage.selection.length !== 0),
    flag: flagObject
  });

}
