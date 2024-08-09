function updateCalculationUI() {
    var calculationType = document.getElementById('calculationType').value;
    document.getElementById('circuitInputs').style.display = calculationType === 'circuit' ? 'block' : 'none';
    document.getElementById('findRInputs').style.display = calculationType === 'findR' ? 'block' : 'none';
    document.getElementById('findVInputs').style.display = calculationType === 'findV' ? 'block' : 'none';
    document.getElementById('findIInputs').style.display = calculationType === 'findI' ? 'block' : 'none';
    document.getElementById('findPInputs').style.display = calculationType === 'findP' ? 'block' : 'none';
}

function updateCircuitUI() {
    var circuitType = document.getElementById('circuitType').value;
    document.getElementById('seriesInputs').style.display = circuitType === 'series' ? 'block' : 'none';
    document.getElementById('parallelInputs').style.display = circuitType === 'parallel' ? 'block' : 'none';
}

function updateResistorFields(circuitType) {
    var fieldsContainer = document.getElementById('resistorFields' + capitalizeFirstLetter(circuitType));
    var numberOfResistors = parseInt(document.getElementById('numberOfResistors' + capitalizeFirstLetter(circuitType)).value);
    fieldsContainer.innerHTML = '';

    for (var i = 1; i <= numberOfResistors; i++) {
        var label = document.createElement('label');
        label.textContent = 'ความต้านทาน ' + i + ' (Ω):';
        fieldsContainer.appendChild(label);

        var input = document.createElement('input');
        input.type = 'number';
        input.id = 'resistance' + i + capitalizeFirstLetter(circuitType);
        input.placeholder = 'กรอกความต้านทาน';
        fieldsContainer.appendChild(input);
    }
}

function updateSeriesResistorFields() {
    updateResistorFields('series');
}

function updateParallelResistorFields() {
    updateResistorFields('parallel');
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function calculate() {
    var circuitType = document.getElementById('circuitType').value;
    var resultText = '';
    var stepsText = '';

    if (circuitType === 'series') {
        var voltage = parseFloat(document.getElementById('voltage').value);
        var resistances = [];
        var numberOfResistors = parseInt(document.getElementById('numberOfResistorsSeries').value);

        for (var i = 1; i <= numberOfResistors; i++) {
            var resistance = parseFloat(document.getElementById('resistance' + i + 'Series').value);
            if (!isNaN(resistance)) resistances.push(resistance);
        }

        var totalResistance = resistances.reduce((a, b) => a + b, 0);
        var current = voltage / totalResistance;
        var power = voltage * current;

        resultText = 
            'ความต้านทานรวม: ' + totalResistance.toFixed(2) + ' Ω\n' +
            'กระแส: ' + current.toFixed(2) + ' A\n' +
            'พลังงาน: ' + power.toFixed(2) + ' W';

        stepsText = 
            'วิธีคิด:\n' +
            '1. ความต้านทานรวม = R1 + R2 + ... + Rn\n' +
            '2. กระแส = แรงดัน / ความต้านทานรวม\n' +
            '3. พลังงาน = แรงดัน × กระแส';
    } else if (circuitType === 'parallel') {
        var voltage = parseFloat(document.getElementById('voltageParallel').value);
        var resistances = [];
        var numberOfResistors = parseInt(document.getElementById('numberOfResistorsParallel').value);

        for (var i = 1; i <= numberOfResistors; i++) {
            var resistance = parseFloat(document.getElementById('resistance' + i + 'Parallel').value);
            if (!isNaN(resistance)) resistances.push(resistance);
        }

        var totalResistance = 1 / resistances.reduce((a, b) => a + 1/b, 0);
        var current = voltage / totalResistance;
        var power = voltage * current;

        resultText = 
            'ความต้านทานรวม: ' + totalResistance.toFixed(2) + ' Ω\n' +
            'กระแส: ' + current.toFixed(2) + ' A\n' +
            'พลังงาน: ' + power.toFixed(2) + ' W';

        stepsText = 
            'วิธีคิด:\n' +
            '1. ความต้านทานรวม = 1 / (1/R1 + 1/R2 + ... + 1/Rn)\n' +
            '2. กระแส = แรงดัน / ความต้านทานรวม\n' +
            '3. พลังงาน = แรงดัน × กระแส';
    }

    document.getElementById('resultSeries').innerText = resultText;
    document.getElementById('stepsSeries').innerText = stepsText;
    document.getElementById('resultParallel').innerText = resultText;
    document.getElementById('stepsParallel').innerText = stepsText;
}

function calculateResistance() {
    var voltage = parseFloat(document.getElementById('voltageR').value);
    var current = parseFloat(document.getElementById('currentR').value);

    if (!isNaN(voltage) && !isNaN(current) && current !== 0) {
        var resistance = voltage / current;
        document.getElementById('resultR').innerText = 'ความต้านทาน (R): ' + resistance.toFixed(2) + ' Ω';
        document.getElementById('stepsR').innerText = 
            'วิธีคิด:\n' +
            '1. ความต้านทาน = แรงดัน / กระแส';
    } else {
        document.getElementById('resultR').innerText = 'กรุณากรอกแรงดันและกระแสให้ถูกต้อง';
        document.getElementById('stepsR').innerText = '';
    }
}

function calculateVoltage() {
    var resistance = parseFloat(document.getElementById('resistanceV').value);
    var current = parseFloat(document.getElementById('currentV').value);

    if (!isNaN(resistance) && !isNaN(current) && resistance !== 0) {
        var voltage = resistance * current;
        document.getElementById('resultV').innerText = 'แรงดัน (V): ' + voltage.toFixed(2) + ' V';
        document.getElementById('stepsV').innerText = 
            'วิธีคิด:\n' +
            '1. แรงดัน = ความต้านทาน × กระแส';
    } else {
        document.getElementById('resultV').innerText = 'กรุณากรอกความต้านทานและกระแสให้ถูกต้อง';
        document.getElementById('stepsV').innerText = '';
    }
}

function calculateCurrent() {
    var voltage = parseFloat(document.getElementById('voltageI').value);
    var resistance = parseFloat(document.getElementById('resistanceI').value);

    if (!isNaN(voltage) && !isNaN(resistance) && resistance !== 0) {
        var current = voltage / resistance;
        document.getElementById('resultI').innerText = 'กระแส (I): ' + current.toFixed(2) + ' A';
        document.getElementById('stepsI').innerText = 
            'วิธีคิด:\n' +
            '1. กระแส = แรงดัน / ความต้านทาน';
    } else {
        document.getElementById('resultI').innerText = 'กรุณากรอกแรงดันและความต้านทานให้ถูกต้อง';
        document.getElementById('stepsI').innerText = '';
    }
}

function calculatePower() {
    var voltage = parseFloat(document.getElementById('voltageP').value);
    var current = parseFloat(document.getElementById('currentP').value);

    if (!isNaN(voltage) && !isNaN(current)) {
        var power = voltage * current;
        document.getElementById('resultP').innerText = 'พลังงาน (P): ' + power.toFixed(2) + ' W';
        document.getElementById('stepsP').innerText = 
            'วิธีคิด:\n' +
            '1. พลังงาน = แรงดัน × กระแส';
    } else {
        document.getElementById('resultP').innerText = 'กรุณากรอกแรงดันและกระแสให้ถูกต้อง';
        document.getElementById('stepsP').innerText = '';
    }
}

// Initialize UI
updateCalculationUI();
updateCircuitUI();
