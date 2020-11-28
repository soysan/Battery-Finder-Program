const battery =
    [{
        "batteryName": "WKL-78",
        "capacityAh": 2.3,
        "voltage": 14.4,
        "maxDraw": 3.2,
        "endVoltage": 10,
    },
    {
        "batteryName": "WKL-140",
        "capacityAh": 4.5,
        "voltage": 14.4,
        "maxDraw": 9.2,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-78",
        "capacityAh": 2.5,
        "voltage": 14.5,
        "maxDraw": 10,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-140",
        "capacityAh": 3.6,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 5,
    },
    {
        "batteryName": "IOP-E78",
        "capacityAh": 6.6,
        "voltage": 14.4,
        "maxDraw": 10.5,
        "endVoltage": 8,
    },
    {
        "batteryName": "IOP-E140",
        "capacityAh": 9.9,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 10,
    },
    {
        "batteryName": "IOP-E188",
        "capacityAh": 13.2,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C65",
        "capacityAh": 4.9,
        "voltage": 14.8,
        "maxDraw": 4.9,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C85",
        "capacityAh": 6.3,
        "voltage": 14.4,
        "maxDraw": 6.3,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C140",
        "capacityAh": 9.8,
        "voltage": 14.8,
        "maxDraw": 10,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C290",
        "capacityAh": 19.8,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 12,
    }]
    ;

const camera =
    [{
        "brand": "Cakon",
        "model": "ABC 3000M",
        "powerConsumptionWh": 35.5,
    },
    {
        "brand": "Cakon",
        "model": "ABC 5000M",
        "powerConsumptionWh": 37.2,
    },
    {
        "brand": "Cakon",
        "model": "ABC 7000M",
        "powerConsumptionWh": 39.7,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9000M",
        "powerConsumptionWh": 10.9,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9900M",
        "powerConsumptionWh": 15.7,
    },
    {
        "brand": "Go MN",
        "model": "UIK 110C",
        "powerConsumptionWh": 62.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 210C",
        "powerConsumptionWh": 64.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 230C",
        "powerConsumptionWh": 26.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 250C",
        "powerConsumptionWh": 15.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 270C",
        "powerConsumptionWh": 20.3,
    },
    {
        "brand": "VANY",
        "model": "CEV 1100P",
        "powerConsumptionWh": 22,
    },
    {
        "brand": "VANY",
        "model": "CEV 1300P",
        "powerConsumptionWh": 23,
    },
    {
        "brand": "VANY",
        "model": "CEV 1500P",
        "powerConsumptionWh": 24,
    },
    {
        "brand": "VANY",
        "model": "CEV 1700P",
        "powerConsumptionWh": 25,
    },
    {
        "brand": "VANY",
        "model": "CEV 1900P",
        "powerConsumptionWh": 26,
    }]
    ;

// errors
let message = document.createElement("div");
message.innerHTML = `<h2><span class="text-danger font-weight-bold">Your power consumpution is out of range</span></h2>`;
let message2 = document.createElement("div");
message2.innerHTML = `<h2><span class="text-danger font-weight-bold">There isn't matched battery</span></h2>`;


let brandHashMap = {};
let modelHashMap = {};
for (let i = 0; i < camera.length; i++) {
    if (brandHashMap[camera[i].brand] === undefined) brandHashMap[camera[i].brand] = 1;
    else brandHashMap[camera[i].brand] += 1;

    if (modelHashMap[camera[i].brand] === undefined) modelHashMap[camera[i].brand] = [camera[i].model];
    else modelHashMap[camera[i].brand].push(camera[i].model);
}

// ============== input brands =============

let brandOp = document.getElementById("brand");
for (let brand in brandHashMap) {
    let option = document.createElement("option");
    option.innerText = brand;
    option.value = brand;
    brandOp.append(option);
}

// =============== input models ============

document.getElementById("brand").addEventListener("change", () => {
    let modelOp = document.getElementById("model");
    modelOp.innerHTML = "";
    let chosenBrand = document.getElementById("brand").value;

    for (let i = 0; i < modelHashMap[chosenBrand].length; i++) {
        let option = document.createElement("option");
        option.innerText = modelHashMap[chosenBrand][i];
        option.value = modelHashMap[chosenBrand][i];
        modelOp.append(option);
    }
});

function getTheCameraP() {
    let brand = document.getElementById("brand").value;
    let model = document.getElementById("model").value;
    let cameraPowerC = 0;
    for (let i = 0; i < camera.length; i++) {
        if (camera[i].brand === brand && camera[i].model === model) {
            cameraPowerC = camera[i].powerConsumptionWh;
            break;
        }
    }
    return cameraPowerC;
}

function getSortedSuitableBatteries() {
    let batteries = {};
    let cameraP = getTheCameraP();
    let inputWat = document.getElementById("power").value;

    if (inputWat < 0 || inputWat > 100) return document.getElementById("showBatteries").append(message);

    for (let i = 0; i < battery.length; i++) {
        let currentB = battery[i];
        if (cameraP + inputWat > currentB.endVoltage * currentB.maxDraw) batteries[currentB.batteryName] = (currentB.capacityAh * currentB.voltage / cameraP).toFixed(1);
    }

    let sorted = {};
    Object.keys(batteries).sort().forEach(key => sorted[key] = batteries[key]);
    return sorted;
}

function showCapableBatteries() {
    let showBatteries = document.getElementById("showBatteries");
    showBatteries.innerHTML = "";

    let batteries = getSortedSuitableBatteries();
    let keys = Object.keys(batteries);
    if (keys.length == 0) return document.getElementById("showBatteries").append(message2);

    for (let key of keys) {
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        th.rowSpan = 1;
        th.innerHTML = key;
        let td = document.createElement("td");
        td.innerHTML = "Estimated " + batteries[key] + " hours on selected setup"
        th.append(td);
        tr.append(th);
        showBatteries.append(tr);
    }
}

// render the result

document.getElementById("button").addEventListener("click", () => {
    console.log(showCapableBatteries())
});


//         "capacityAh": 2.3, 容量（Ah
//         "voltage": 14.4, 電圧
//         "maxDraw": 3.2, 最大放電電流（A）
//         "endVoltage": 10, 終止電圧

        // "powerConsumptionWh": 26.3, 消費電力（Wh ワット時間）

        // (w/h) = capacityAh * voltage
        // t = w/h / powerConsumptionWh
