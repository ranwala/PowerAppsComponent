import * as React from "react";
import ScanbotSDK from "scanbot-web-sdk";

import {
    DocumentScannerConfiguration,
    IDocumentScannerHandle,

} from "scanbot-web-sdk/@types";

let documentScanner: IDocumentScannerHandle;

const initialize = async () => {
    const sdk = await ScanbotSDK.initialize({
        licenseKey: "",
        // WASM files are copied to this directory by the npm postinstall script
        //engine: '/'
    });
}

const createDocumentScanner = async () => {
    const config: DocumentScannerConfiguration = {
        onDocumentDetected: (result) => {
            console.log(result);
        },
        containerId: "sample",
        text: {
            hint: {
                OK: "Capturing your document...",
                OK_SmallSize: "The document is too small. Try moving closer.",
                OK_BadAngles:
                    "This is a bad camera angle. Hold the device straight over the document.",
                OK_BadAspectRatio:
                    "Rotate the device sideways, so that the document fits better into the screen.",
                OK_OffCenter: "Try holding the device at the center of the document.",
                Error_NothingDetected:
                    "Please hold the device over a document to start scanning.",
                Error_Brightness: "It is too dark. Try turning on a light.",
                Error_Noise: "Please move the document to a clear surface.",
            },
        },
        style: {
            // Note that alternatively, styling the document scanner is also possible using CSS classes.
            // For details see https://docs.scanbot.io/document-scanner-sdk/web/features/document-scanner/document-scanner-ui/
            outline: {
                polygon: {
                    fillCapturing: "rgba(0, 255, 0, 0.2)",
                    strokeCapturing: "green",
                    fillSearching: "rgba(255, 0, 0, 0.2)",
                    strokeSearching: "red",
                }
            }
        },
        onError: () => { },
        preferredCamera: 'camera2 0, facing back'
    };
    documentScanner = await ScanbotSDK.instance.createDocumentScanner(config);
}

const reactComp = () => {

    initialize();

    //createDocumentScanner();

    return (
        <div>
            <h1>Hello, world!</h1>
            <div id="sample" style={{ width: "100%", height: "100%" }} />
            <button onClick={createDocumentScanner.bind(this)}> Click me</button>
        </div>
    );
}

export default reactComp;