import * as React from 'react';
import '../styles/ui.css';
import GradientButton from './GradientButton';
import { Scrollbars } from 'react-custom-scrollbars';
import { flags } from '../assets/flags.json';
import CustomAlert from './CustomAlert';
import * as gradientTemplate from '../assets/gradient_template.json';

// Transforms the CSS format to the Figma format of a gradient
const CssToGradient = (css) => {

    let gradient = {
        gradientStops: [],
        gradientTransform: []
    };

    let args = css.split(', ');
    let rotation = args.shift();

    // Remove 'deg' from the end of the number
    rotation = rotation.slice(0, -3);

    // CSS starts counting degrees from the top, Figma from the right
    rotation -= 90;

    // Transform rotation from degrees to rads
    rotation = rotation * Math.PI / 180;

    // Fill in the rotation matrix
    gradient.gradientTransform.push([+Math.cos(rotation).toFixed(2), +Math.sin(rotation).toFixed(2), 0], [-Math.sin(rotation).toFixed(2), +Math.cos(rotation).toFixed(2), 0]);

    // Transform each color (format: hexcode start% end%) to the gradient format
    args.forEach(colorTriplet => {

        colorTriplet = colorTriplet.split(' ');

        // Transform the color hexcode to rgb
        let colorObject = {
            r: (parseInt(colorTriplet[0].slice(1, 3), 16) / 256),
            g: (parseInt(colorTriplet[0].slice(3, 5), 16) / 256),
            b: (parseInt(colorTriplet[0].slice(5, 7), 16) / 256),
            a: 1
        }

        // Create two new colors for the gradient, for the starting and ending positions
        for (let i = 1; i < 3; i++) {

            let newColor = {
                color: colorObject,
                position: (colorTriplet[i].slice(0, -1) / 100)
            };

            gradient.gradientStops.push(newColor);

        }

    });

    return gradient;

}

const App = ({ }) => {

    const [showAlert, setShowAlert] = React.useState(false);

    // When the user clicks on the promo button at the top of the plugin
    const onClickPromo = () => {
        const newWindow = window.open("https://www.github.com/Tadeas-Jun/figma-pride", '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
    };

    // The Figma API sent a message to the UI
    onmessage = (event) => {

        if (!event.data.pluginMessage.type) return;

        // The user had/didn't have have a selection when they tried to apply a gradient
        if (event.data.pluginMessage.type === 'hasSelection') {

            if (event.data.pluginMessage.selection) {

                // Hide the alert to select an object and apply the selected gradient to it
                setShowAlert(false);
                ApplyGradient(event.data.pluginMessage.flag);

            } else {

                // Show a timed gradient notifying the user to select an object to apply the gradient to
                setShowAlert(true);
                setTimeout(function () {
                    setShowAlert(false);
                }, 5000);

            }

        }

    }

    // Apply a selected gradient to an object
    const ApplyGradient = (flag) => {

        let gradient = gradientTemplate.template;
        let gradientObject = CssToGradient(flag.background);
        gradient.gradientStops = gradientObject.gradientStops;
        gradient.gradientTransform = gradientObject.gradientTransform;

        parent.postMessage({ pluginMessage: { type: 'apply', gradient: gradient } }, '*');

    }

    // When the user clicks one of the buttons
    const onGradientButton = (flag) => {

        parent.postMessage({ pluginMessage: { type: 'clickedGradientButton', flag: flag } }, '*')

    }

    // Generate a list of buttons, one for each defined flag
    const buttons = [];
    flags.forEach((selectedFlag) => {
        buttons.push(<GradientButton flag={selectedFlag} onApplyGradient={onGradientButton.bind(this)} />);
    });

    return (

        <div>

            <div id="topBar">

                <h2>Pride Flags &amp; Gradients</h2>
                <p>by Tadeas Jun</p>

                <div className="item-overlay right" onClick={onClickPromo.bind(this)}>
                    <p id="promoText">Contribute on GitHub  💼</p>
                </div>

            </div>

            <Scrollbars id="scrollbar" autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                autoHeight
                autoHeightMin={444}
                width={300}>

                <div id="appBody">

                    {buttons}

                </div>

            </Scrollbars>

            ({showAlert && <div id="alert">
                <CustomAlert />
            </div>})

        </div>

    );
};

export default App;
