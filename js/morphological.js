let utils = new Utils('errorMessage');

// dilation - square hole
//utils.loadCode('dilation-sh');
utils.loadImageToCanvas('images/morphological/Square-Hole.gif', 'dilation-sh-canvas');
utils.addFileInputHandler('dilation-sh-input', 'dilation-sh-canvas');

// dilation - text broken
utils.loadImageToCanvas('images/morphological/text_broken.tif', 'dilation-tb-canvas');
utils.addFileInputHandler('dilation-tb-input', 'dilation-tb-canvas');

// erosion - square
//utils.loadCode('erosion');
utils.loadImageToCanvas('images/morphological/Squares.tif', 'canvasInput');
utils.addFileInputHandler('fileInput', 'canvasInput');

// opening - square
utils.loadImageToCanvas('images/morphological/Squares.tif', 'opening-s-canvas');
utils.addFileInputHandler('opening-s-input', 'opening-s-canvas');

// opening - cell
utils.loadImageToCanvas('images/morphological/Cells.png', 'opening-c-canvas');
utils.addFileInputHandler('opening-c-input', 'opening-c-canvas');

// closing - dark blobs
utils.loadImageToCanvas('images/morphological/dark_blobs.tif', 'closing-db-canvas');
utils.addFileInputHandler('closing-db-input', 'closing-db-canvas');

utils.loadOpenCv(() => {

    dilation('dilation-sh-canvas', 'dilation-sh-output', 1);
    document.getElementById('dilation-sh-label').innerHTML = 'Radius = 1';
    document.getElementById('dilation-sh-range').oninput = function() {
        radius = parseInt(this.value);
        document.getElementById('dilation-sh-label').innerHTML = 'Radius = ' + radius;
        dilation('dilation-sh-canvas', 'dilation-sh-output', radius);
    }

    dilation('dilation-tb-canvas', 'dilation-tb-output', 1);
    document.getElementById('dilation-tb-label').innerHTML = 'Radius = 1';
    document.getElementById('dilation-tb-range').oninput = function() {
        radius = parseInt(this.value);
        document.getElementById('dilation-tb-label').innerHTML = 'Radius = ' + radius;
        dilation('dilation-tb-canvas', 'dilation-tb-output', radius);
    }

    erosion('canvasInput', 'canvasOutput', 1);
    document.getElementById('radius').innerHTML = 'Radius = 1';
    document.getElementById('myRange').oninput = function() {
        radius = parseInt(this.value);
        document.getElementById('radius').innerHTML = 'Radius = ' + radius;
        erosion('canvasInput', 'canvasOutput', radius);
    }

    opening('opening-s-canvas', 'opening-s-output', 1);
    document.getElementById('opening-s-label').innerHTML = 'Radius = 1';
    document.getElementById('opening-s-range').oninput = function() {
        radius = parseInt(this.value);
        document.getElementById('opening-s-label').innerHTML = 'Radius = ' + radius;
        opening('opening-s-canvas', 'opening-s-output', radius);
    }

    opening('opening-c-canvas', 'opening-c-output', 1);
    document.getElementById('opening-c-label').innerHTML = 'Radius = 1';
    document.getElementById('opening-c-range').oninput = function() {
        radius = parseInt(this.value);
        document.getElementById('opening-c-label').innerHTML = 'Radius = ' + radius;
        opening('opening-c-canvas', 'opening-c-output', radius);
    }

    closing('closing-db-canvas', 'closing-db-output', 1);
    document.getElementById('closing-db-label').innerHTML = 'Radius = 1';
    document.getElementById('closing-db-range').oninput = function() {
        radius = parseInt(this.value);
        document.getElementById('closing-db-label').innerHTML = 'Radius = ' + radius;
        closing('closing-db-canvas', 'closing-db-output', radius);
    }

    /*dilation('-canvas', '-output', 1);
    document.getElementById('-label').innerHTML = 'Radius = 1';
    document.getElementById('-range').oninput = function() {
        radius = parseInt(this.value);
        document.getElementById('-label').innerHTML = 'Radius = ' + radius;
        dilation('-canvas', '-output', radius);
    }*/

});

function dilation(inputId, outputId, radius){
    let src = cv.imread(inputId);
    let dst = new cv.Mat();
    let M = cv.Mat.ones(radius, radius, cv.CV_8U);
    let anchor = new cv.Point(-1, -1);
    // You can try more different parameters
    cv.dilate(src, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());
    cv.imshow(outputId, dst);
    src.delete(); dst.delete(); M.delete();
};

function erosion(inputId, outputId, radius){
    let src = cv.imread(inputId);
    let dst = new cv.Mat();
    let M = cv.Mat.ones(radius, radius, cv.CV_8U);
    let anchor = new cv.Point(-1, -1);
    // You can try more different parameters
    cv.erode(src, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());
    cv.imshow(outputId, dst);
    src.delete(); dst.delete(); M.delete();
};

function opening(inputId, outputId, radius){
    let src = cv.imread(inputId);
    let dst = new cv.Mat();
    let M = cv.Mat.ones(radius, radius, cv.CV_8U);
    let anchor = new cv.Point(-1, -1);
    // You can try more different parameters
    cv.threshold(src, dst, 128, 255, cv.THRESH_BINARY);
    cv.morphologyEx(dst, dst, cv.MORPH_OPEN, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());
    cv.imshow(outputId, dst);
    src.delete(); dst.delete(); M.delete();
};

function closing(inputId, outputId, radius){
    let src = cv.imread(inputId);
    let dst = new cv.Mat();
    let M = cv.Mat.ones(radius, radius, cv.CV_8U);
    let anchor = new cv.Point(-1, -1);
    // You can try more different parameters
    cv.morphologyEx(src, dst, cv.MORPH_CLOSE, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());
    cv.imshow(outputId, dst);
    src.delete(); dst.delete(); M.delete();
};

/*var granimInstance = new Granim({
    element: '#canvas-image-blending',
    direction: 'top-bottom',
    opacity: [1, 1],
    isPausedWhenNotInView: true,
    states : {
        "default-state": {
            gradients: [
                ['#29323c', '#485563'],
                ['#FF6B6B', '#556270'],
                ['#80d3fe', '#7ea0c4'],
                ['#f0ab51', '#eceba3']
            ],
            transitionSpeed: 7000
        }
    }
});*/