

const validateIsDataTable = async (selector) => {
    let table;
    if (selector.nodeType === Node.ELEMENT_NODE)
        table = selector;
    else
        table = `.${selector},#${selector}`
    return await $.fn.DataTable.isDataTable(table);
}

const destroyDataTable = async (selector) => {
    let table;
    if (selector.nodeType === Node.ELEMENT_NODE)
        table = selector;
    else
        table = `.${selector},#${selector}`
        let isDataTable = await validateIsDataTable(selector)
    if (isDataTable) {
        $(table).DataTable().destroy();
        $('tbody', table).empty();
    }
}

const InitTableBasicAsync = async (tblOptions, columnOptions, tblActions, tblOrder, tblFooter, data, destroy = true) => {
    //debugger
    if (!tblOptions)
        tblOptions = new TableOptions();
    if (!columnOptions)
        columnOptions = new ColumnOption();
    if (!tblActions)
        tblActions = new TableActions();
    if (!tblOrder)
        tblOrder = new TableOrder();
    if (destroy)
        await destroyDataTable(tblOptions.TableName)
    let t = $(`#${tblOptions.TableName},.${tblOptions.TableName}`);
    await KTDatatablesBasicBasic.init(tblOptions, columnOptions, tblActions, tblOrder, tblFooter, data);
    t = await t.dataTable().api();
    await t.draw();
    //await t.columns.adjust().draw();
    return await t;
}
const InitTableScrollableAsync = async (tblOptions, columnOptions, tblActions, tblOrder, tblFooter,data,destroy=true) => {
    if (!tblOptions)
        tblOptions = new TableOptions();
    if (!columnOptions)
        columnOptions = new ColumnOption();
    if (!tblActions)
        tblActions = new TableActions();
    if (!tblOrder)
        tblOrder = new TableOrder();
    if (destroy)
        await destroyDataTable(tblOptions.TableName)
    let t = $(`#${tblOptions.TableName},.${tblOptions.TableName}`);
    await KTDatatablesBasicScrollable.init(tblOptions, columnOptions, tblActions, tblOrder,tblFooter, data);
    t = await t.dataTable().api();
    await t.draw();
    //await t.columns.adjust();
    return await t;
}

const InitTableSearchOptionsAsync = async (tblOptions, columnOptions, tblActions, tblOrder, data, destroy = true) => {
    if (!tblOptions)
        tblOptions = new TableOptions();
    if (!columnOptions)
        columnOptions = new ColumnOption();
    if (!tblActions)
        tblActions = new TableActions();
    if (!tblOrder)
        tblOrder = new TableOrder();
    if (destroy)
        await destroyDataTable(tblOptions.TableName)
    let t = $(`#${tblOptions.TableName},.${tblOptions.TableName}`);
    await KTDatatablesSearchOptionsAdvancedSearch.init(tblOptions, columnOptions, tblActions, tblOrder, data,);
    t = await t.dataTable().api();
    await t.draw();
    //await t.columns.adjust();
    return await t;
}