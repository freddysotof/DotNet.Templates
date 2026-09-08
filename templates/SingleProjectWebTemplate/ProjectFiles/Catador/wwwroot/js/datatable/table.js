
/** */
/**
 * [Esta clase toma los parametros iniciales del Datatable
 * Asigna el nombre, paginador,scrollable, ancho de las columnas, agrupamiento de registros y sumatoria de registros agrupados (valores y registros)]
 * @class
 * @classdesc 
 */
class TableOptions {

    //the class constructor
    /**
     * constructor description
     * @param  {[string]} tableName [Indica id de la Tabla]
     * @param  {[Paging:boolean, PageLength:number}]} paginator [Indica si la pagina tendra paginador y 
     * cantidad de registros a mostrar por pagina]
     * @param  {[{X:boolean, Y:boolean, ScrollColapse:boolean}]} scrollable [Indica si la tabla tendra scroll 
     * de forma horizontal (X), vertical(Y) y si el scroll al cambiar de pagina se mantendra el mismo tamaño 
     * aunque sean menos registros]
     * @param  {[[{Targets:string,Width:string,Class:string}]]} colWidth \
     * [Indica las columnas a las  que se le cambiara el ancho de la columna. 
     * targets:string delimitado por coma con las posiciones de las columnas '1,2,3,4'
     * Width:number el ancho de las columnas en medidas de datatable
     * Class:string alguna clase adicional]
     * @param  {[boolean]} reorder[Indica si la tabla podra ser reordenada mediante drag and drop]
     * @param  {[boolean]} filterBox[Indica si la tabla podra ser filtrada por textbox]
     */

    constructor(tableName = null, paginator = { Paging: true, PageLength: 5 },
        scrollable = { X: false, Y: "", ScrollColapse: false }, orderable = true, colWidth = [], reorderSelector=null,filterBox=true ) {
        this.TableName = (tableName) ? tableName : "kt-table";
        this.Paginator = paginator
        this.Scrollable = scrollable
        this.Orderable = orderable
        this.RowGroup = {
            Start: {
                BgColor: null, Color: null, Cols: []
            },
            End: {
                BgColor: null, Color: null, Cols: []
            },
            Target: null,
            Color: 'white',
            FixedOrder: { Target: null, Orientation: "" }
        };
        this.ColWidth = colWidth;
        this.ReorderSelector = reorderSelector;
        this.FilterBox = filterBox;
    }
    /**
    * [Se utiliza en caso de que se agrupe por columnas para determinar si cuando se reordene se reordene especialmente por grupos o por registros]
    * @param  {[string]} target [Posiciones en la tabla delimitado por coma 
     * Ejemplo: '1,2,3,4']
    * @param  {[string]} orientation [tipo de orientación]
    */
    SetFixedOrder(target = null, orientation = "asc") {
        this.RowGroup.FixedOrder.Target = target;
        this.RowGroup.FixedOrder.Orientation = orientation;
    }


    /** @type { {Start:string, End:string}} [Tipo de Row Group: Start al principio del grupo, End al final del grupo] */
    static rowGroupType = {
        Start: 'start',
        End: 'end'
    }




    /**
    * [Insertar RowGroup en DataTable,Si se dividira la tabla por grupos]
    * @param  {[string]} rowGroupType [Tipo de Row Group: Start al principio del grupo, 
     * End al final del grupo]
    * @param  {[string]} id [Identificador en el DOM]
    * @param  {[string]} sumTargets [En caso de querer sumar valores en la tabla, 
     * digite las posiciones de las columnas delimitadas por coma ]
    * @param  {[string]} title [Header o titulo que tendra el grupo]
    * @param  {[string]} state [Estado de la plantilla o bootstrap (metal,brand,etc)]
    * @param  {[string]} typeOfSum [Tipo de la sumatoria: total de un monto, 
     * ponemos "money", total de una cantidad "int"]
    * @param  {[string]} data [Valor que se quiera mostrar adicional en el DOM]
    * @param  {[string]} color [Color adicional para el texto]
    * @param  {[string]} html [Formato en que como se visualizara la data en el DOM, 
     * teniendo en cuenta que debe haber pasado el parametro data si se quiere visualizar en el DOM
     * MUY IMPORTANTE: si queremos que se visualice el valor por el cual se esta diviendo la tabla en 
     * grupos debemos anexar en el html {group}  donde queremos que se visualice 
     * Si queremos que se visualice el total de la sumatoria de los sumTargets debemos poner {total}
     * EJ DE html: 'La cantidad de {group} es de: {total} y {data}
     * ]
    */
    InsertRowGroupCols(rowGroupType, id, sumTargets, title, state = null, html = '{title}', typeOfSum = 'int', color = null, data = null) {
        switch (rowGroupType) {
            case TableOptions.rowGroupType.Start:
                this.RowGroup.Start.Cols.push(
                    {
                        Id: id,
                        Target: sumTargets,
                        Title: title,
                        State: state,
                        Html: html,
                        Type: typeOfSum,
                        Color: color,
                        Data: data
                    })
                break;
            case TableOptions.rowGroupType.End:
                this.RowGroup.End.Cols.push(
                    {
                        Id: id,
                        Target: sumTargets,
                        Title: title,
                        State: state,
                        Html: html,
                        Type: typeOfSum,
                        Data: data
                    })
                break;

        }
    }


    /**
    * [Mantener orden fijo en la tabla al agrupar registros]
    * @param  {[string]} targets [Posiciones en la tabla delimitado por coma 
     * Ejemplo: '1,2,3,4']
    * @param  {[string]} width [Ancho de la tabla en medida del datatable]
    * @param  {[string]} classname [clase adicional para la columna, preferiblemente del datatable]
    */
    InsertColWidth(targets, width, classname = null) {
        this.ColWidth.push(
            {
                Targets: targets,
                Width: width,
                Class: classname
            })
    }

}


/** */
/**
 * [Esta clase asigna las columnas especiales o personalizadas que tendra el datatable, 
 * filtros de búsquedas, filtros de fechas,etc]
 * @class
 * @classdesc
 */
class ColumnOption {
    constructor() {
        this.Options = [];
        this.PredefinedRange = { Active: false, Target: null },
        this.ToggleColumns = []
    }

    /**
    * [Se utiliza en caso de que se agrupe por columnas para determinar si cuando se reordene se reordene especialmente por grupos o por registros]
    * @param  {[string]} name [Nombre o valor de la Opcion]
    * @param  {[string]} targets [Posiciones en la tabla delimitado por coma
    * Ejemplo: '1,2,3,4']
    * @param  {[string]} width [Ancho de la columna en medida de datatable]
    * @param  {[string]} html [Formato en el DOM. 
     * Se debe poner la etiqueta {title} dentro del parametro donde se quiera poner el titulo
     * Se debe poner la etiqueta {state} en caso de querer darle el estilo del template o bootstrap (brand,metal)]
    * @param  {[string]} className [Clase Adicional del datatable]
    * @param  {[{index:number, identifier:string, title:string, state:string,id:string,callback:Event}]} data
     * [Valores de la opcion.
     * index: posicion de la opcion en el array
     * identifier: valor se sustituira el registro de la columna 
     * EJ: Valor Columna: 1, Identifier: Activo. Nuevo Valor de la columna: Activo
     * title: Titulo o label adicional 
     * state: Estado de la plantilla o bootstrap en caso de darle estilo al nuevo html
     * id: Identificador en el DOM
     * callback: evento callback
     * EJ: { index:0, identifier: 1, title: 'Activo', 'success',null,}
    */
    InsertOption(name = null, targets = null, width = null, html = SimpleTitleTemplate, className = null/*, isIdentifierValue = false, IdentifierTarget = target*/, hasFilter = true, data = []) {
        this.Options.push({
            Html: html,
            Name: name,
            Target: targets,
            Width: width,
            Class: className,
            HasFilter: hasFilter,
            //IsIdentifierValue: isIdentifierValue,
            Data: data??[],

        });
    }
    /**
    * [Se utiliza para agregar la data dentro de la opcion de columnas]
    
    * @param  { [number] } index [posicion de la opcion en el array]
    * @param  { [identifier] } identifier [valor se sustituira el registro de la columna
    * EJ: Valor Columna: 1, Identifier: Activo.Nuevo Valor de la columna: Activo]
    * @param  { [string] } title [Titulo o label adicional]
    * @param  { [string] } state: [Estado de la plantilla o bootstrap en caso de darle estilo al nuevo html]
    * @param  { [string] } id: [Identificador en el DOM]
    * @param  { [Event] } id: [evento callback]
    */
    InsertOptionData(index, identifier, title, state, id, callback) {
        this.Options[index].Data.push({
            Identifier: identifier,
            Title: title,
            State: state,
            Id: id,
            Callback: callback
        })
    }

    /**
* [Especificara si querra que exista un filtro para buscar entre fecha de dias seleccionados 
 * (hoy,ayer,hace 7 dias)]
* @param  { [boolean] } active [Si el rango de fecha de busqueda estara activo]
* @param  { [string] } target [Posicion en la tabla de la columna de fecha]
*/
    SetPredefinedRange(active, target) {
        this.PredefinedRange.Active = active;
        this.PredefinedRange.Target = target;
    }

    /**
* [Se utiliza en caso de querer agregar una columna que tenga un checkbox o un toggle column, utilizando uno de los templates de html que tiene la misma clase]
* @param  {[number]} toggleCol [Posicion donde se creara la columna con el toggle]
* @param  {[string]} targets [Posiciones en la tabla de donde se tomaran los parametros para el evento o la accion delimitado por coma.Ejemplo: '1,2,3,4']
* @param  {[number]} onClick [Nombre del metodo del boton con o sin parentesis. Ej: Guardar,Guardar()]
* @param  {[string]} width [Ancho de la columna en medidas de datatable]
* @param  {[number]} state [Estado de la plantilla o bootstrap para el cambio de colores]
* @param  {[string]} html [Formato en el DOM.
     * Se debe poner la etiqueta {value} dentro del parametro donde se quiera poner el valor booleano]
* @param  {[string]} value [Valor booleano del toggle]
* @param  {[string]} className [Clase adicional del datatable]
*/
    InsertToggleColumn(toggleCol, html, width = null, onClick,  targets, state, value,title, className = null) {
        this.ToggleColumns.push({
            ToggleCol: toggleCol,
            Targets: targets,
            OnClick: onClick,
            State: state,
            Width: width,
            Html: html,
            Value: value,
            Title: title,
            Class: className
        });
    }

    static SimpleTitleTemplate = `{title}`;
    static SimpleDataTemplate = `{title}`;
    static BadgeDotTitleTemplate = `<span class="badge bg-{state} badge-dot"></span>&nbsp;
    <span class="kt-font-bold kt-font-{state}">{title}</span>`;
    static BadgePillDataTemplate = `<span class="badge  bg-{state} badge--inline rounded-pill">{data}</span>`;
    static BadgePillTitleTemplate = `<span class="badge  bg-{state}  badge--inline rounded-pill border border-3 border-light">{title}</span>`;
    static BadgeGroupTitleTemplate = ` &nbsp;&nbsp;{title}: &nbsp;&nbsp; <span class=" badge badge--lg  bg-{state}">{group}</span>`
    static BadgeGroupTitleSmallTemplate = `&nbsp;&nbsp;{title}: <span class="badge badge--lg bg-{state} text-center" style="font-size:14px">{group}</span> &nbsp;&nbsp;`
    static BadgePillRoundedGroupTitleSmallTemplate = `&nbsp;&nbsp;{title}: <span class="badge badge--lg rounded-pill bg-{state} text-center" style="font-size:14px">{group}</span> &nbsp;&nbsp;`
    static RowGroupTitleTemplate = `{title} : {group}`;
    static RowGroupTotalTemplate = `<strong>Total {title} {group}: {total}</strong>`;
    static MaterialToggleTemplate = `<div class="form-check form-switch switch switch-{state}">
                    <label>
                    <input {value} class="form-check-input fs-toggle tbl-toggle {id}" type="checkbox"
                      name="{id}" id="{id}" onClick="{onClick}" />
                    <span class="lever"></span>{title}
    </label>          
</div>`
    static MaterialCheckboxTemplate = `<div class="form-check d-flex justify-content-center">
    <input class="form-check-input fs-checkbox" type="checkbox" onClick="{onClick}" {checked}
           id="" name="" />
    <label class="form-check-label" for=""></label>
</div>`
    //<label class="form-check-label">
    //static MaterialToggleTemplate = `<div class="form-switch form-check switch switch-info">
    //                    <label><input class="form-check-input fs-toggle tbl-toggle" type="checkbox"><span class="lever"></span></label></div>`

}




/** */
/**
 * [Esta clase asigna la columna de opciones para generar botones dinamicos con funcionalidades]
 * @class
 * @classdesc
 */
class TableActions {
    /**
    * [Asigna los valores de la columna que se utilizara para los botones de acciones]
     * OJO: LOS FUNCIONES, METODOS O EVENTOS ASIGNADOS AL BOTON DEBEN ACEPTAR COMO PRIMER PARAMETRO EL EVENTO QUE QUE HA OCURRIDO
     * EJ: function newEvent(event,id,nombre){ }
    * @param  {[string]} width [Ancho de la columna]
    * @param  {[number]} actionCol [Columna donde se van a desplegar las opciones]
    * @param  {[number]} targetId [De que columna se tomara el id (de la columna 0 por ej) para asignarselo al Id de la celda]
    * @param  {[{title:number, icon:string, onclick:string, targets:string,type:string,classname:string,attr:string,href:string}]} data
    * [Valores de la opcion.
    * title: Titulo del boton
    * icon: Icono del boton (en caso de tener)
    * onclick: Nombre del metodo del boton con o sin parentesis. Ej: Guardar,Guardar()
     * OJO: SIN PARAMETROS, ESTOS SE TOMARAN EN BASE A LOS TARGETS DE LA COLUMNA ASIGNADOS
    * targets:  Posiciones en la tabla delimitado por coma. Ejemplo: '1,2,3,4'
    * type: Tipo de elemento de la acción. Generalmente es 'a' o 'button'
    * classname: Clase adicional, especialmente del datatable
    * attr: atributos adicionales
    * EJ: { title:'Eliminar','fa fa-trash','Eliminar','0','a',null,null,null}]
    */
    constructor(width = null, actionCol = null, targetId = null, clickableMethod = null, buttons = []) {
        this.Buttons = buttons;
        this.Width = width;
        this.ActionCol = actionCol;
        this.TargetId = targetId;
        this.ClickableMethod = clickableMethod
    }
    /**
    * [Inserta Nuevo Boton en la lista de acciones]
    * OJO: LOS FUNCIONES, METODOS O EVENTOS ASIGNADOS AL BOTON DEBEN ACEPTAR COMO PRIMER PARAMETRO EL EVENTO QUE QUE HA OCURRIDO
    * EJ: function newEvent(event,id,nombre){ }
    * @param  {[string]} title [Titulo del boton]
    * @param  {[number]} icon [Icono del boton(en caso de tener)]
    * @param  {[number]} onclick [Nombre del metodo del boton con o sin parentesis.Ej: Guardar, Guardar()]
    * @param  {[number]} targets [Posiciones en la tabla donde todelimitado por coma.Ejemplo: '1,2,3,4']
    * @param  {[number]} type [Tipo de elemento de la acción.Generalmente es 'a' o 'button']
    * @param  {[number]} classname [Clase adicional, especialmente del datatable]
    * @param  {[number]} attr [Atributos adicionales]
    */
    InsertButton(title, icon, onclick, targets, type, classname, attr, href = null) {
        this.Buttons.push(
            { Title: title, Icon: icon, OnClick: onclick, Targets: targets, Type: type, Class: classname, Attr: attr, IsIcon: (icon && true) ?? false, Href: href }
        )
    }

    /**
    * [Inserta Metodo al hacer click en la fila]
    * OJO: LOS FUNCIONES, METODOS O EVENTOS ASIGNADOS AL BOTON DEBEN ACEPTAR COMO PRIMER PARAMETRO EL EVENTO QUE QUE HA OCURRIDO
    * EJ: function newEvent(event,id,nombre){ }
    * @param  {[string]} onclick [Nombre del metodo del boton con o sin parentesis.Ej: Guardar, Guardar()]
    * @param  {[string]} targets [Posiciones en la tabla delimitado por coma.Ejemplo: '1,2,3,4']
    * @param  {[string]} cols [Columnas donde funcionara el metodo delimitado por coma.Ejemplo: '1,2,3,4']
    */
    InsertClickableMethod(onclick, targets, cols) {
        this.ClickableMethod = { OnClick: onclick, Targets: targets,Cols:cols };
    }
}


/** */
/**
 * [Esta clase asigna informacion o datos en el footer de la tabla]
 * @class
 * @classdesc
 */
class TableFooter {
    //RowSum:array Se guardaran todas las filas que seran de sumatoria entre columnas
    //RowInfo:array Se guardaran todas las filas que seran de informacion en el footer
    constructor() {
        this.RowSum = []
        this.RowInfo = []
    }

    /**
    * [Inserta todas las filas que seran de sumatoria entre columnas en el footer]
    * @param  {[string]} id [Identificador en el DOM]
    * @param  {[[number]]} rowPositions [Posiciones de las filas en array de numeros]
    * @param  {[string]} title [Titulo de la fila en el footer]
    * @param  {[string]} typeOfSum [Tipo de la sumatoria: total de un monto,
     * ponemos "money", total de una cantidad "int"]
    */
    InsertRowSum(id, rowPositions, title, typeOfSum) {
        this.RowSum.push(
            { Id: id, RowPositions: rowPositions, Title: title, Type: typeOfSum }
        );
    }

    /**
    * [Inserta todas las filas que seran de información en el footer]
    * @param  {[string]} id [Identificador en el DOM]
    * @param  {[[number]]} title [Titulo de la informacion en el footer]
    * @param  {[string]} data [Valor a mostrar]
    * @param  {[string]} state [estado de la plantilla o bootstrap en caso de ser utilizado
     * EJ: (brand,metal,info)]
    * @param  {[string]} html [Formato en el DOM.
     * Se debe poner la etiqueta {title} dentro del parametro donde se quiera poner el titulo
     * Se debe poner la etiqueta {state} en caso de querer darle el estilo del template o bootstrap (brand,metal)]
    */
    InsertRowInfo(id, title, data, state, html) {
        this.RowInfo.push(
            { Id: id, Title: title, Data: data, State: state, Html: html }
        );
    }
}


/** */
/**
 * [Esta clase asigna:
 * - Orden de la tabla por defecto,
 * - Orientacion,
 * - Campos no ordenables
 * - Campos invisibles]
 * @class
 * @classdesc
 */
class TableOrder {
    /**
    * [Asignar valores del tableOrder]
    * @param  {[number]} defaultOrder [Orden por defecto por columna de la tabla
     * EJ: 0]
    * @param  {[string]} orientation [Orientacion del orden de la tabla (asc,desc)]
    * @param  {[string]} nonOrderable [Posiciones en la tabla que no se ordernaran delimitado por coma.Ejemplo: '1,2,3,4']
    * @param  {[string]} nonVisible [Posiciones en la tabla que no se visualizaran delimitado por coma.Ejemplo: '1,2,3,4']
    */
    constructor(defaultOrder = 0, orientation = null, nonOrderable = null, nonVisible = null) {
        this.DefaultOrder = defaultOrder;
        this.Orientation = orientation;
        this.NonOrderable = nonOrderable;
        this.NonVisible = nonVisible;
    }
}

