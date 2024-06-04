var state = {
        entry_conditions : [{"Ind1":"rishabh","ops":"=","Ind2":"aviral","cand1":"2","cand2":"3","andOr":"and","Ind1String":"ta.rsi(close,12)","Ind2String":"ta.supertrend(high,low,close,10,4)"},{"Ind1":"rishabh2","ops":"crossAbove","Ind2":"aviral2","cand1":"2","cand2":"4","andOr":"-","Ind1String":"ta.tsi(close,12,14,15)[ta.tsi(close,12,14,15).keys()[0]]","Ind2String":"ta.macd(close,90,91,92)[ta.macd(close,90,91,92).keys()[0]]"}],
        exit_conditions : [{"Ind1":"aviral2","ops":">","Ind2":"aviral","cand1":"5","cand2":"6","andOr":"or","Ind1String":"ta.macd(close,90,91,92)[ta.macd(close,90,91,92).keys()[0]]","Ind2String":"ta.supertrend(high,low,close,10,4)"},{"Ind1":"rishabh2","ops":"==","Ind2":"rishabh","cand1":"4","cand2":"8","andOr":"-","Ind1String":"ta.tsi(close,12,14,15)[ta.tsi(close,12,14,15).keys()[0]]","Ind2String":"ta.rsi(close,12)"}], 
        indicators : [{"indicatorType":"RSI","indicatorName":"rishabh","length":"12","indicatorString":"ta.rsi(close,12)"},{"indicatorType":"SUPERTREND","indicatorName":"aviral","length":"10","multiplier":"4","indicatorString":"ta.supertrend(high,low,close,10,4)"},{"indicatorType":"TSI","indicatorName":"rishabh2","fast":"12","slow":"14","signal":"15","indicatorString":"ta.tsi(close,12,14,15)[ta.tsi(close,12,14,15).keys()[0]]"},{"indicatorType":"MACD","indicatorName":"aviral2","fast":"90","slow":"91","signal":"92","indicatorString":"ta.macd(close,90,91,92)[ta.macd(close,90,91,92).keys()[0]]"}],
        strategy : {
                data_setting : {},
                indicators : [] ,
                entry_conditions : {
                    'Ind1' : [], 
                    'ops' : [], 
                    'Ind2' : [], 
                    'cand1' : [], 
                    'cand2' : [],
                    'andOr' : []
                },
                exit_conditions : {
                    'Ind1' : [], 
                    'ops' : [], 
                    'Ind2' : [], 
                    'cand1' : [], 
                    'cand2' : [],
                    'andOr' : []
                },
                strategy_details : {},
                name : ''
            },
        user_details : {
            strategies : [],
            userName : '',
            userId : '',
            userEmail : [],
            credit : 0,
        }
}
const stock_data=["SBIN","HDFCBANK","TCS","INFY","MARUTI","TATAMOTORS","ACC","ADANIENT","ADANIPORTS","HAL","HINDUNILVR"]
const indicatorMap = {
    EMA: {
        fieldsCount: 1,
        fields: ['length'],
        defaultString: ['close'],
        keys : -1
    },
    HMA: {
        fieldsCount: 1,
        fields: ['length'],
        defaultString: ['close']  ,
        keys : -1
    },
    SMA: {
        fieldsCount: 1,
        fields: ['length'],
        defaultString: ['close'],
        keys : -1
    },
    RSI: {
        fieldsCount: 1,
        fields: ['length'],
        defaultString: ['close'],
        keys : -1
    },
    SUPERTREND: {
        fieldsCount: 2,
        fields: ['length', 'multiplier'],
        defaultString: ['high', 'low', 'close'],
        keys : -1
    },
    ADX: {
        fieldsCount: 1,
        fields: ['length'],
        defaultString: ['high', 'low', 'close'],
        keys : -1
    },
    BBANDS_UPPER: {
        fieldsCount: 1,
        fields: ['length'],
        defaultString: ['close',],
        keys : 2
    },
    BBANDS_LOWER: {
        fieldsCount: 1,
        fields: ['length'],
        defaultString: ['close',],
        keys : 0
    },
    ATR: {
        fieldsCount: 1,
        fields: ['length'],
        defaultString: ['high', 'low', 'close'],
        keys : -1
    },
    MACD: {
        fieldsCount: 3,
        fields: ['fast', 'slow', 'signal'],
        defaultString: ['close', ],
        keys : 0
    },
    MACD_H: {
        fieldsCount: 3,
        fields: ['fast', 'slow', 'signal'],
        defaultString: ['close'],
        keys : 1
    },
    MACDS: {
        fieldsCount: 3,
        fields: ['fast', 'slow', 'signal'],
        defaultString: ['close'],
        keys : 2
    },
    VWAP: {
        fieldsCount: 0,
        fields: [],
        defaultString: ['high','low','close','volume'],
        keys : -1
    },
    VALUE: {
        fieldsCount: 0,
        fields: [],
        defaultString: ['float()'],
        keys : -1
    },
    CLOSE: {
        fieldsCount: 0,
        fields: [],
        defaultString: ['close'],
        keys : -1
    },
    OPEN: {
        fieldsCount: 0,
        fields: [],
        defaultString: ['open'],
        keys : -1
    },
    HIGH: {
        fieldsCount: 0,
        fields: [],
        defaultString: ['high'],
        keys : -1
    },
    LOW: {
        fieldsCount: 0,
        fields: [],
        defaultString: ['low'],
        keys : -1
    },
    // LTP: {
    //     fieldsCount: 0,
    //     fields: [],
    //     defaultString: '-' ,
    // keys : -1
    // },
    VOLUME: {
        fieldsCount: 0,
        fields: [],
        defaultString: ['volume'],
        keys : -1
    },
    // HL2: {
    //     fieldsCount: 0,
    //     fields: [],
    //     defaultString: '-',
    // keys : -1
    // },
    // HL3: {
    //     fieldsCount: 0,
    //     fields: [],
    //     defaultString: '-',
    // keys : -1
    // },
    // PREV_DAY_HIGH: {
    //     fieldsCount: 0,
    //     fields: [],
    //     defaultString: '-',
    // keys : -1
    // },
    // PREV_DAY_LOW: {
    //     fieldsCount: 0,
    //     fields: [],
    //     defaultString: '-',
    // keys : -1
    // },
    STOCH_K: {
        fieldsCount: 3,
        fields: ['k', 'd'],
        defaultString: ['high', 'low', 'close'],
        keys : 0
    },
    STOCH_D: {
        fieldsCount: 3,
        fields: ['k', 'd'],
        defaultString: ['high', 'low', 'close'],
        keys : 1
    },
    CCI: {
        fieldsCount: 1,
        fields: ['length'],
        defaultString: ['high','low','close'],
        keys : -1
    },
    MFI: {
        fieldsCount: 1,
        fields: ['length'],
        defaultString: ['high','low','close','volume'],
        keys : -1
    },
    CMF: {
        fieldsCount: 1,
        fields: ['length'],
        defaultString: ['high','low','close','volume'],
        keys : -1
    },
    ROC: {
        fieldsCount: 1,
        fields: ['length'],
        defaultString: ['close'],
        keys : -1
    },
    AROON_DOWN: {
        fieldsCount: 1,
        fields: ['length'],
        defaultString: ['high', 'low'],
        keys : 0
    },
    AROON_UP: {
        fieldsCount: 1,
        fields: ['length'],
        defaultString: ['high', 'low'],
        keys : 1
    },
    AROON_OSCILLATOR: {
        fieldsCount: 1,
        fields: ['length'],
        defaultString: ['high', 'low'],
        keys : 2
    },
    WILLR: {
        fieldsCount: 1,
        fields: ['length'],
        defaultString: ['high','low','close'],
        keys : -1
    },
    TSI: {
        fieldsCount: 3,
        fields: ['fast', 'slow', 'signal'],
        defaultString: ['close' ],
        keys : 0
    },
    TSI_SIGNAL: {
        fieldsCount: 3,
        fields: ['fast', 'slow', 'signal'],
        defaultString: ['close' ],
        keys : 1
    },
    PSAR_ABOVE: {
        fieldsCount: 3,
        fields: ['af0', 'af', 'max_af'],
        defaultString: ['high', 'low', 'close'],
        keys : 0
    },
    PSAR_BELOW: {
        fieldsCount: 3,
        fields: ['af0', 'af', 'max_af'],
        defaultString: ['high', 'low', 'close'],
        keys : 1
    },
    CHOP: {
        fieldsCount: 3,
        fields: ['length', 'atr_length', 'ln'],
        defaultString: ['high','low','close'],
        keys : -1
    }
};


function backtest(){
    state.strategy.indicators=[];
    state.indicators.forEach(indicator => {
        state.strategy.indicators.push(indicator);
    })
    state.strategy.entry_conditions={
        'Ind1' : [], 
        'ops' : [], 
        'Ind2' : [], 
        'cand1' : [], 
        'cand2' : [],
        'andOr' : []
    };
    state.entry_conditions.forEach(condition =>{
        state.strategy.entry_conditions.Ind1.push(condition.Ind1String);
        state.strategy.entry_conditions.Ind2.push(condition.Ind2String);
        state.strategy.entry_conditions.ops.push(condition.ops);
        state.strategy.entry_conditions.cand1.push(condition.cand1);
        state.strategy.entry_conditions.cand2.push(condition.cand2);
        state.strategy.entry_conditions.andOr.push(condition.andOr);
    })
    state.strategy.exit_conditions={
        'Ind1' : [], 
        'ops' : [], 
        'Ind2' : [], 
        'cand1' : [], 
        'cand2' : [],
        'andOr' : []
    };
    state.exit_conditions.forEach(condition =>{
        state.strategy.exit_conditions.Ind1.push(condition.Ind1String);
        state.strategy.exit_conditions.Ind2.push(condition.Ind2String);
        state.strategy.exit_conditions.ops.push(condition.ops);
        state.strategy.exit_conditions.cand1.push(condition.cand1);
        state.strategy.exit_conditions.cand2.push(condition.cand2);
        state.strategy.exit_conditions.andOr.push(condition.andOr);
    })


    const url = 'http://127.0.0.1:8000/strategies';
    const options = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(state.strategy) 
    };
    
    // Sending the request
    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

const url = 'http://127.0.0.1:8000/allstrategies';
    const options = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email_id : 'frizokin@gmail.com'
        }) 
    };
    
    // Sending the request
    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            state.user_details.strategies = data.strategies;
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Backtesting Tool could not Fetch User data")
        });

function saveName(event){
        event.preventDefault();
        const form = document.getElementById('strategy_name');
        const newName = form.value.trim();
        console.log(newName)
        var nameExists = false
        state.user_details.strategies.forEach(strategy =>{
            if(strategy.toLowerCase() === newName.toLowerCase()){
                nameExists= true;
                return
            }
        })
        if (nameExists) {
            alert('Error: The strategy name already exists. Please choose a different name.');
            throw new Error('The strategy name already exists.');
        } else {
            state.strategy.name = newName;
            state.user_details.strategies.push(newName); 
        }
}

function renderTable(){
        const tableBody = document.getElementById('table-body');
        const tableHead = document.getElementById('table-head');
        tableBody.innerHTML="";
        tableHead.innerHTML="";
        const tr0 = document.createElement('tr');
        const th1 = document.createElement('th');
        th1.textContent = 'Indicator Type';
        const th2 = document.createElement('th');
        th2.textContent = 'Indicator Name';
        tr0.appendChild(th1);
        tr0.appendChild(th2);
        tableHead.appendChild(tr0)

        state.indicators.forEach(item => {
            const tr = document.createElement('tr');
            const typeTd = document.createElement('td');
            typeTd.textContent = item.indicatorType || '';
            tr.appendChild(typeTd);

            const nameTd = document.createElement('td');
            nameTd.textContent = item.indicatorName || '';
            tr.appendChild(nameTd);
            tableBody.appendChild(tr);
        });
    }

function populateSymbol(selectId, data){
    const selectElement = document.getElementById(selectId);
    selectElement.innerHTML="";
    data.forEach(item =>{
        const option= document.createElement('option');
        option.value = item;
        option.textContent = item;
        selectElement.appendChild(option)
    })
}
function populateSelect(selectId, data) {
    const selectElement = document.getElementById(selectId);
    selectElement.innerHTML = '';
    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.indicatorName;
        option.textContent = `${item.indicatorType}: ${item.indicatorName}`;
        selectElement.appendChild(option);
    });
}

function addFields(){
    const selectedIndicator = document.getElementById('indicator-select').value;
            const fieldsCount = indicatorMap[selectedIndicator].fieldsCount;
            const dynamicFieldsContainer = document.getElementById('dynamic-fields');
            dynamicFieldsContainer.innerHTML = '';
            for (let i = 0; i < fieldsCount; i++) {
                dynamicFieldsContainer.innerHTML += `
                    <div class="form-group mb-3 col">
                        <label for="${indicatorMap[selectedIndicator].fields[i]}"> ${indicatorMap[selectedIndicator].fields[i]}:</label>
                        <input type="text" required="true" id="${indicatorMap[selectedIndicator].fields[i]}" name="${indicatorMap[selectedIndicator].fields[i]}" class="form-control">
                    </div>
                `;
            }
}

function EntryConditionCreate(event){
    event.preventDefault();
    const form = document.getElementById('entry-condition-form');
    const formData = new FormData(form);
    var condition={};
    formData.forEach((value, key) => {
        condition[key] = value;
    });
    const ind1 = state.indicators.filter((ind) => ind.indicatorName == condition.Ind1);
    condition.Ind1String = ind1[0].indicatorString
    const ind2 = state.indicators.filter((ind) => ind.indicatorName == condition.Ind2);
    condition.Ind2String = ind2[0].indicatorString
    state.entry_conditions.push(condition);
    const modal = document.getElementById('entryConditionBuilder');
    const bootstrapModal = bootstrap.Modal.getInstance(modal);
    bootstrapModal.hide();
    populateTable('entry-condition-table-body', state.entry_conditions);
}
function ExitConditionCreate(event){
    event.preventDefault();
    const form = document.getElementById('exit-condition-form');
    const formData = new FormData(form);
    var condition={};
    formData.forEach((value, key) => {
        condition[key] = value;
    });
    const ind1 = state.indicators.filter((ind) => ind.indicatorName == condition.Ind1);
    condition.Ind1String = ind1[0].indicatorString
    const ind2 = state.indicators.filter((ind) => ind.indicatorName == condition.Ind2);
    condition.Ind2String = ind2[0].indicatorString
    state.exit_conditions.push(condition);
    const modal = document.getElementById('exitConditionBuilder');
    const bootstrapModal = bootstrap.Modal.getInstance(modal);
    bootstrapModal.hide();
    populateTable('exit-condition-table-body', state.exit_conditions);
}
function indicatorCreate(event) {
    event.preventDefault();
    var flag = true;
    const indicatorType = document.getElementById('indicator-select').value;
    const indicatorName = document.getElementById('indicator-name').value;
    state.indicators.map((indicator) => {
        if(indicator.indicatorName === indicatorName){
            flag = false;
            return alert('Indicator already exists');
        }
    });

    const form = document.getElementById('indicator-form');
            const formData = new FormData(form);
            var indicatorString ="ta.";
            indicatorString=indicatorString.concat(indicatorType.toLowerCase())
            indicatorString=indicatorString.concat("(");
            indicatorMap[indicatorType].defaultString.forEach((str) =>{
                indicatorString=indicatorString.concat(str + ",");
            })
            var indicator = {
                indicatorType: indicatorType,
            };
            
            formData.forEach((value, key) => {
                indicator[key] = value;
                if(key != "indicatorName")
                indicatorString=indicatorString.concat(value + ",")
            });
            indicatorString = indicatorString.slice(0,-1);
            indicatorString=indicatorString.concat(")");
            if(indicatorMap[indicatorType].keys != -1){
                indicatorString = indicatorString.concat('[' + indicatorString + '.keys()[' + indicatorMap[indicatorType].keys +']]');
            }
            indicator["indicatorString"] = indicatorString;
            const modal = document.getElementById('indicatorbuilder');
            const bootstrapModal = bootstrap.Modal.getInstance(modal);
            bootstrapModal.hide();
    if(flag){
        state.indicators.push(indicator);
        renderTable();
        populateSelect('indicator-one-entry', state.indicators);
        populateSelect('indicator-two-entry', state.indicators);
        populateSelect('indicator-one-exit', state.indicators);
        populateSelect('indicator-two-exit', state.indicators);
    }
}

function getIndicatorType(indicatorName) {
    const indicator = state.indicators.find(ind => ind.indicatorName === indicatorName);
    return indicator ? indicator.indicatorType : 'Unknown';
}

function populateTable(id, data) {
    const tableBody = document.getElementById(id);
    tableBody.innerHTML = ''; 

    data.forEach((condition, index) => {
        const tr = document.createElement('tr');
        // Create checkbox cell
        const checkboxTd = document.createElement('td');
        checkboxTd.classList.add('text-center', 'w-3x', 'pt-2');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.dataset.index = index;
        checkboxTd.appendChild(checkbox);
        tr.appendChild(checkboxTd);

        // Create Indicator 1 cell
        const Ind1Td = document.createElement('td');
        const Ind1Type = getIndicatorType(condition.Ind1);
        Ind1Td.textContent = `${Ind1Type} : ${condition.Ind1}`;
        tr.appendChild(Ind1Td);

        // Create Operator cell
        const opsTd = document.createElement('td');
        opsTd.textContent = condition.ops.toUpperCase();
        tr.appendChild(opsTd);

        // Create Indicator 2 cell
        const Ind2Td = document.createElement('td');
        const Ind2Type = getIndicatorType(condition.Ind2);
        Ind2Td.textContent = `${Ind2Type} : ${condition.Ind2}`;
        tr.appendChild(Ind2Td);

        // Create Offset1 cell
        const cand1Td = document.createElement('td');
        cand1Td.textContent = condition.cand1;
        tr.appendChild(cand1Td);

        // Create Offset2 cell
        const cand2Td = document.createElement('td');
        cand2Td.textContent = condition.cand2;
        tr.appendChild(cand2Td);

        // Create And/Or cell
        const andOrTd = document.createElement('td');
        andOrTd.textContent = condition.andOr.toUpperCase();
        tr.appendChild(andOrTd);

        tableBody.appendChild(tr);
    });
}

function deleteSelectedEntryConditions() {
    const checkboxes = document.querySelectorAll('#entry-condition-table-body input[type="checkbox"]:checked');
    const indexesToDelete = Array.from(checkboxes).map(checkbox => parseInt(checkbox.dataset.index));
    state.entry_conditions = state.entry_conditions.filter((condition, index) => !indexesToDelete.includes(index));
    populateTable('entry-condition-table-body', state.entry_conditions);
}
function deleteSelectedExitConditions() {
    const checkboxes = document.querySelectorAll('#exit-condition-table-body input[type="checkbox"]:checked');
    const indexesToDelete = Array.from(checkboxes).map(checkbox => parseInt(checkbox.dataset.index));
    state.exit_conditions = state.exit_conditions.filter((condition, index) => !indexesToDelete.includes(index));
    populateTable('exit-condition-table-body', state.exit_conditions);
}

document.getElementById('delete-button-entry').addEventListener('click', deleteSelectedEntryConditions);
document.getElementById('delete-button-exit').addEventListener('click', deleteSelectedExitConditions);
populateTable('entry-condition-table-body', state.entry_conditions);
populateTable('exit-condition-table-body', state.exit_conditions);
renderTable();
populateSelect('indicator-one-entry', state.indicators);
populateSelect('indicator-two-entry', state.indicators);
populateSelect('indicator-one-exit', state.indicators);
populateSelect('indicator-two-exit', state.indicators);
populateSymbol('symbol', stock_data);


function dataSetting(event){
    event.preventDefault();
    const form = document.getElementById('data_setting');
    const formData = new FormData(form);
    formData.forEach((value,key)=>{
        state.strategy.data_setting[key] = value;
    })
}
function strategyDetails(event){
    event.preventDefault();
    const form = document.getElementById('strategy_details');
    const formData = new FormData(form);
    formData.forEach((value,key)=>{
        state.strategy.strategy_details[key] = value;
    })
}
function toggleOptionsFields() {
    var instrumentType = document.getElementById('Instrument_type').value;
    var optionsFields = document.getElementById('options_fields');
    if (instrumentType === 'OPTIONS') {
        optionsFields.style.display = 'flex';
    } else {
        optionsFields.style.display = 'none';
    }
}
function toggleEntryExitTime() {
    var tradingType = document.getElementById('trading_type').value;
    var timeFields = document.getElementById('time_fields');
    if (tradingType === 'Intraday') {
        timeFields.style.display = 'flex';
    } else {
        timeFields.style.display = 'none';
    }
}
document.addEventListener('DOMContentLoaded', function() {
    toggleOptionsFields();
    toggleEntryExitTime();
});
function toggleInputField(fieldId) {
    var checkbox = document.getElementById('check_' + fieldId);
    var input = document.getElementById(fieldId);
    if (checkbox.checked) {
        input.style.display = 'block';
    } else {
        input.style.display = 'none';
    }
}
// indicatorMap = {
//     EMA: 1,ta.ema(close, length),
//     HMA: 1,ta.hma(close,length),
//     SMA: 1,ta.sma(close, length),
//     RSI:1, ta.rsi(close, length), 
//     SUPERTREND: 2,ta.supertrend(high, low, close, length, multiplier),
//     ADX: 1,ta.adx(high, low, close, length),
//     BBANDS_UPPER: 1,ta.bbands(close, length)[ta.bbands(close,length).keys()[2]],
//     BBANDS_LOWER: 1,ta.bbands(close, length)[ta.bbands(close,length).keys()[0]],
//     ATR: 1,ta.atr(high, low, close, length),
//     MACD: 3,ta.macd(close, fast, slow, signal)[ta.macd(close, fast, slow, signal).keys()[0]],
//     MACD_H: 3,ta.macd(close, fast, slow, signal)[ta.macd(close, fast, slow, signal).keys()[1]],
//     MACDS: 3,ta.macd(close, fast, slow, signal)[ta.macd(close, fast, slow, signal).keys()[2]],
//     VWAP: 0,ta.vwap(high,low,close,volume),
//     VALUE: 0,float(),
//     CLOSE: 0,close,
//     OPEN: 0,open,
//     HIGH: 0,high,
//     LOW: 0,low,
//     LTP: 0, - 
//     VOLUME: 0,volume ,
//     HL2: 0,-
//     HL3: 0,-
//     PREV_DAY_HIGH: 0,-
//     PREV_DAY_LOW: 0,-
//     STOCH_K: 3,ta.stoch(high, low, close, k,d)[ta.stoch(high, low, close, k,d).keys()[0]],
//     STOCH_D: 3,ta.stoch(high, low, close,k,d)[ta.stoch(high, low, close, k,d).keys()[1]],
//     CH_EXIT_LONG: 2,-
//     CH_EXIT_SHORT: 2,-
//     CCI: 1,ta.cci(high, low, close, length),
//     MFI: 1,ta.mfi(high, low, close, volume , length),
//     CMF: 1,ta.cmf(high, low, close, volume, length),
//     ROC: 1,ta.roc(close, length),
//     AROON_DOWN: 1,ta.aroon(high, low, length)[ta.aroon(high, low, length).keys()[0]],
//     AROON_UP: 1,ta.aroon(high,low, length)[ta.aroon(high, low, length).keys()[1]],
//     AROON_OSCILLATOR: 1,ta.aroon(high,low, length)[ta.aroon(high, low, length).keys()[2]],
//     WILLR: 1,ta.willr(high,low,close,length),
//     TSI: 3,ta.tsi(close,fast,slow,signal)[ta.tsi(close,fast,slow,signal).keys()[0]],
//     TSI_SIGNAL: 3,ta.tsi(close,fast,slow,signal)[ta.tsi(close,fast,slow,signal).keys()[1]],
//     PSAR_ABOVE: 3,ta.psar(high, low, close, af0, af, max_af)[ta.psar(high, low, close, af0, af, max_af).keys()[0]],
//     PSAR_BELOW: 3,ta.psar(high, low, close, af0, af, max_af)[ta.psar(high, low, close, af0, af, max_af).keys()[1]],
//     CHOP: 3,ta.chop(high, low, close, length,atr_length, ln),
//     SMA_RSI: 3,-
//     HIGH_LOW: 2,
//     PREV_DAY_CLOSE: 1,
//     PIVOT: 0,-
//     BCP: 0,-
//     OPEN_LOW: 1,
//     HIGH_OPEN: 1,
//     RSI_BUY: 1,
//     RSI_SELL: 1,
//     ORB_HIGH: 1,
//     ORB_LOW: 1
// };



