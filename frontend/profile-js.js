var state = {
    conditions : 1,
}

function addTable() {
    state.conditions += 1;
    console.log("Adding table")
    var table = document.getElementById('condition1')
    var completeTable = table.cloneNode(true);
    completeTable.id = 'condition' + state.conditions;
    document.getElementById('table-holder').appendChild(completeTable);
}