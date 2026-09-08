
var KTDatatablesBasicScrollable = function () {

    var initTable1 = async function (tblOpts = null, columns = null, tblActions = null, orderBy = null,footerSum =null,array=null) {
        // COLUMNAS PERSONALIZADAS
        
        var colDefs = [];
        var FilterRows = 2;
        var RowGroup = null;
        //var InitComplete = function (selector) {   
        //    var table = null;
        //    if (selector) {
        //        table = $(selector).dataTable();

        //    table.api().columns().every(function (index) {
        //        var column = this;

        //        if (columns.Options) {
        //            $.each(columns.Options, async function (key, col) {
                      
        //                if (col.Target == index) {
        //                    var data = (col.Data) ? col.Data : null;
                         
        //                    if (column.title().toLowerCase() == col.Name.toLowerCase()) {
        //                        $(`.fs-input-filter[data-col-index="${parseInt(col.Target)}"`).empty().append(`<option value>SELECCIONE</option>`);
        //                        if (data && data.length > 0) {
        //                            column.data().unique().sort().each(function (d, j) {
        //                                var objs = data.find(o => o.Identifier.toString() === d.toString())
        //                                if (objs && obj.Identifier)
        //                                    $(`.fs-input-filter[data-col-index="${parseInt(col.Target)}"`).append(`<option value="${objs.Identifier}">${objs.Title}</option>`);
        //                                else if (objs)
        //                                    $(`.fs-input-filter[data-col-index="${parseInt(col.Target)}"`).append(`<option value="${objs.Title}">${objs.Title}</option>`);
        //                                else
        //                                    $(`.fs-input-filter[data-col-index="${parseInt(col.Target)}"`).append(`<option value="${d}">${d}</option>`);
        //                            });
        //                        }
        //                        else {
        //                            column.data().unique().sort().each(function (d, j) {
                                       
        //                                $(`.fs-input-filter[data-col-index="${parseInt(col.Target)}"`).append(`<option value="${d}">${d}</option>`);
        //                            });
        //                        }
        //                    }
        //                }
        //            });
        //        }
        //    });
        //    }

        //}
        await colDefs.push({
            targets: tblActions.ActionCol ?? null,
            orderable: false,
            width: tblActions.Width?? null,
            render: function (data, type, full, meta) {
                if (tblActions) {
                    var content = "";
                    $.each(tblActions.Buttons, function (key, val) {
                        content = content +
                            `
                            <${(val.Type == "button") ? val.Type + ' type="button"' : val.Type} style="cursor:pointer"   id="${tblOpts && tblOpts.TableName}-tbl-action-${meta.col}${meta.row}-${key + 1}"
                            class=" tbl-action ${val.IsIcon ? "btn btn-icon btn-icon-md btn-sm" : ""}   ${(val.Class) ? val.Class : "btn-clean"} tbl-action-col-${meta.col} tbl-action-col-${meta.row} tbl-action-${key + 1} ${tblOpts && tblOpts.TableName}-tbl-action-${meta.col}-${meta.row} ${tblOpts && tblOpts.TableName}-tbl-action-${meta.col}${meta.row}-${key + 1}"   onClick="${val.OnClick ?? ''}"
                            ${val.Type == "a" && val.Href ? `href="${val.Href}"` : ""}
                                data-original-title="${val.Title}"  title="${val.Title}"
                                data-toggle="tooltip" data-placement="bottom" >
                                ${val.IsIcon ? `<i  class="${val.Icon}"></i>` : val.Title}
                            </${val.Type}>
                            `
                    })
                    return content;
                } else { return null; }
            }
        });
        if (orderBy) {
            orderBy.NonOrderable && colDefs.push({
                targets: orderBy.NonOrderable.split(",").map(Number),
                orderable: false,
            });
            orderBy.NonVisible &&  colDefs.push({
                targets: orderBy.NonVisible.split(",").map(Number),
                visible: false,
            });
        }
      
        if (tblOpts) {
            if (tblOpts.ColWidth) {
                $.each(tblOpts.ColWidth, function (key, val) {
                    colDefs.push({
                        targets: (val.Targets && val.Targets.split(",").map(Number)) ?? null,
                        width: val.Width ?? null,
                        className: val.Class ?? null
                    });
                });
            }
            if (tblOpts.RowGroup) {
                var group = tblOpts.RowGroup;
                if (group.Target && (!isNaN(group.Target)) || (group.Start.Cols.length > 0) || (group.End.Cols.length > 0)) {
                    RowGroup = {
                        className: "",
                        color: `#${group.Color}`,
                        dataSrc: (group.Target && parseInt(tblOpts.RowGroup.Target)) ?? 0,
                        startClassName: `dtrg-start ${(group.Start && group.Start.BgColor) ? "bg-" + group.Start.BgColor : "dtrg-group"}`,
                        startRender: ((group.Start.Cols.length > 0) && (group.Target)) ? (function (rows, groupValue) {
                            var data = `<div class="d-flex flex-wrap justify-content-between fs-margin-r-5">`;
                            // AL HACER UN REDUCE, CUENTA DOS VECES EL MISMO NUMERO, POR ESO SE DIVIDE AL FINAL ENTRE 2
                            let count = 0;
                            let total = 0;
                            //var RowSize = 0;
                            //if ((group.End.Cols) && group.End.Cols.length % 2 == 0)
                            //    RowSize = 12 / group.End.Cols.length
                            //else
                            //RowSize = 4
                            $.each(group.Start.Cols, function (key, val) {
                                if (typeof (val.Target) != 'undefined') {
                                    total = rows.data().pluck(val.Target).reduce(function (a, b) {
                                        count++;
                                        if (isNaN(b))
                                            return a + b.replace(/[^\d]/g, '') * 1;
                                        else
                                            return a + b * 1;
                                    }, 0)
                                }

                                data = data +
                                    `
                            <div id="${val.Id}${groupValue}" style="${(group.Start.Color) ? "color:" + group.Start.Color : ""}"
                            data-total=${total}>
                            ${val.Html
                                        .split("{title}").join((val.Title) ? val.Title : "{title}")
                                        .split("{state}").join((val.State) ? val.State : "{state}")
                                        .split("{data}").join((val.Data) ? val.Data : "{data}")
                                        .split("{group}").join(groupValue)
                                        .split("{count}").join(count/2)
                                        .split("{total}").join(total)}
                            </div>`
                                //        `
                                //<div id="${val.Id}${groupValue}"class="col-md-${RowSize}" style="display:inline-block;${(group.Start.Color) ? "color:" + group.Start.Color : ""}"
                                //data-total=${total}>
                                //${val.Html
                                //            .split("{title}").join((val.Title) ? val.Title : "{title}")
                                //            .split("{state}").join((val.State) ? val.State : "{state}")
                                //            .split("{data}").join((val.Data) ? val.Data : "{data}")
                                //        .split("{group}").join(groupValue)
                                //            .split("{total}").join(total)}
                                //</div>`
                            })
                            return `${data}</div>`;
                        }) :
                            function (rows, groupValue) { return groupValue},
                        endClassName: `dtrg-end ${(group.End && group.End.BgColor) ? "bg-" + group.End.BgColor : "dtrg-group"}`,
                        endRender: ((group.End.Cols.length > 0) && (!group.Target)) ? (function (rows, groupValue) {
                            let data = `<div class="d-flex flex-wrap justify-content-between">`;
                            let count = 0;
                            let total=0;
                            //var RowSize = 0;
                            //if ((group.End.Cols) && group.End.Cols.length % 2 == 0)
                            //    RowSize = 12 / group.End.Cols.length
                            //else
                                //RowSize = 4
                            $.each(group.End.Cols, function (key, val) {
                                if (typeof (val.target) != 'undefined') {
                                    total = rows.data().pluck(val.Target).reduce(function (a, b) {
                                        count++;
                                        return a + b.replace(/[^\d]/g, '') * 1;
                                    }, 0)
                                }
                              
                                data = data +
                                    `
                            <div id="${val.Id}${groupValue}" style="${(group.End.Color) ? "color:" + tblOpts.RowGroup.End.Color : ""}"
                             data-total=${total}>
                            ${val.Html
                                        .split("{title}").join((val.Title) ? val.Title : "{title}")
                                        .split("{state}").join((val.State) ? val.State : "{state}")
                                        .split("{data}").join((val.Data) ? val.Data : "{data}")
                                    .split("{group}").join(groupValue)
                                        .split("{total}").join(total)}
                            </div>`
                            })
                            return `${data}</div>`;
                        }) : null,


                    }
                }
            }
        }

        if (columns) {
            if (columns.ToggleColumns) {
                $.each(columns.ToggleColumns, async function (key, col) {
                    await colDefs.push({
                        targets: col.ToggleCol,
                        width: col.Width,
                        className: col.Class,
                        render: function (data, type, full, meta) {
                            return col.Html && col.Html
                                .split("{checked}").join(((data===true) && "checked") ?? "")
                                .split("{value}").join(((col.Value) && "checked") ?? "")     
                                .split("{title}").join(col.Title ?? "")
                                .split("{state}").join(col.State ?? "")
                                .split("{data}").join((data) ? data : "{data}")
                                .split("{id}").join(`${tblOpts && tblOpts.TableName}-toggle-${meta.col}${meta.row}`)
                                .split("{onClick}").join(col.OnClick ?? '')
                        }
                    })
                });
            }
            if (columns.Options) {
                $.each(columns.Options, async function (key, col) {
                    //debugger
                    await colDefs.push({
                        targets: parseInt(col.Target),
                        width: (col.Width) ? col.Width : null,
                        className: (col.Class) ? col.Class : null,
                        render: function (data, type, full, meta) {
                            //debugger
                            if (col.Data && col.Data.length > 0) {
                                var html = col.Html;
                                var arr = col.Data;
                                var objs = arr.find(o => ((o.Identifier) ? o.Identifier.toString().toLowerCase() : "") === ((data) ? data.toString().toLowerCase() : ""))
                                if ((objs) ? typeof objs.Identifier === 'undefined' : typeof objs === 'undefined') {
                                    return data;
                                }
                                if (typeof (html) != 'undefined' && html)
                                    return html.split("{state}").join(objs.State)
                                        .split("{title}").join(objs.Title)
                                        .split("{id}").join(objs.Identifier);
                                else
                                    return data;
                            } else {
                                return data;
                            }

                        }
                    })
                    if (columns.PredefinedRange.Active) {
                        FilterRows++;
                        $(`#${tblOpts.TableName}_wrapper div:first div:first `).after(`
                            <div>
                                    <div class="dataTables_filter" id="${tblOpts.TableName}_PredefinedRange_filter">
                                       <div class="row" >
                                        <div class="col-md-4">
                                            <label style="margin-top:5px"> Rango de Fecha: </label>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="input-group pull-right kt-daterangepicker-predefined">
                                                <input type="text" class="form-control "  data-col-index="${columns.PredefinedRange.Target}" readonly placeholder="Seleccione Rango de Fecha" />
                                                <div class="input-group-append">
                                                    <span class="input-group-text"><i class="la la-calendar-check-o"></i></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>  
                                </div>
                            </div>`);
                    //    $(`#${tblOpts.TableName}_wrapper div:first div:first `).after(`
                    //<div class="col-sm-12 col-md-6">
                    //        <div class="dataTables_filter" id="${tblOpts.TableName}_PredefinedRange_filter">
                    //           <div class="row" >
                    //            <div class="col-md-4">
                    //                <label style="margin-top:5px"> Rango de Fecha: </label>
                    //            </div>
                    //            <div class="col-md-8">
                    //                <div class="input-group pull-right kt-daterangepicker-predefined">
                    //                    <input type="text" class="form-control "  data-col-index="${columns.PredefinedRange.Target}" readonly placeholder="Seleccione Rango de Fecha" />
                    //                    <div class="input-group-append">
                    //                        <span class="input-group-text"><i class="la la-calendar-check-o"></i></span>
                    //                    </div>
                    //                </div>
                    //            </div>
                    //        </div>  
                    //    </div>
                    //</div>`);
                        KTBootstrapDaterangepicker.init();
                        // BUSCAR EN LA TABLA AL SELECCIONAR                
                        $('.kt-daterangepicker-predefined').on('apply.daterangepicker', function (ev, picker) {

                            var start = `${picker.startDate._d.getDate()}-${picker.startDate._d.getMonth() + 1}-${picker.startDate._d.getFullYear()}`
                            var end = `${picker.endDate._d.getDate()}-${picker.endDate._d.getMonth() + 1}-${picker.endDate._d.getFullYear()}`
                            var range = GetDateRange(start, end);
                            $(`#${tblOpts.TableName}`).DataTable().column(columns.PredefinedRange.Target).search(range ? range : '', true, true, true).draw();
                        });

                    }
                    // SELECT PARA FILTRAR POR COLUMNAS PERSONALIZADAS
                    if (col.HasFilter) {
                        FilterRows++;
                        if (tblOpts && tblOpts.TableName) {
                            $(`#${tblOpts.TableName}_wrapper div:first`).removeClass().addClass('d-flex flex-wrap justify-content-between');
                            $(`#${tblOpts.TableName}_wrapper div:first>div`).removeClass();
                            $(`#${tblOpts.TableName}_wrapper div:first div:first `).after(`
                                <div>
                                    <div class="dataTables_filter" id="${tblOpts.TableName}_${col.Name.split(" ").join("")}_filter">
                                        <div class="d-flex flex-wrap gap-2" >
                                            <div>
                                                <label style="margin-top:5px"> ${col.Name}: </label>
                                            </div>
                                            <div >
                                                <select data-live-search="true" title='SELECCIONE' data-col-index="${(col.Data.length == 0) ? col.Target : ""}"  class="form-control fs-table-sort sort-${col.Name.split(" ").join("").toLowerCase()} form-control-sm ${col.Data.length == 0 ? "fs-input-filter" : ""}" id="${tblOpts.TableName}-Sort${col.Name.split(" ").join("")}" >
                                                    <option value="">Seleccione</option>
                                                </select>
                                            </div>
                                        </div>  
                                    </div>
                                </div>`);
                    //        $(`#${tblOpts.TableName}_wrapper div:first div:first `).after(`
                    //<div class="col-sm-12 col-md-6">
                    //        <div class="dataTables_filter" id="${tblOpts.TableName}_${col.Name.split(" ").join("")}_filter">
                    //           <div class="row" >
                    //            <div class="col-md-4">
                    //                <label style="margin-top:5px"> ${col.Name}: </label>
                    //            </div>
                    //            <div class="col-md-8">
                    //                <select data-live-search="true" title='SELECCIONE' data-col-index="${(col.Data.length == 0) ? col.Target : ""}"  class="form-control sort-${col.Name.split(" ").join("").toLowerCase()} fs-selectpicker form-control-sm ${col.Data.length == 0 ? "fs-input-filter" : ""}" id="${tblOpts.TableName}-Sort${col.Name.split(" ").join("")}" >
                    //                    <option value="">Seleccione</option>
                    //                </select>
                    //            </div>
                    //        </div>  
                    //    </div>
                    //</div>`);

                            // LLENAR SELECT CON VALORES DE LA TABLA

                            if (col.Data && col.Data.length > 0) {
                                $.each(col.Data, function (key, val) {
                                    $(`#${tblOpts.TableName}_wrapper div:first #${tblOpts.TableName}_${col.Name.split(" ").join("")}_filter select`)
                                        .append(`<option value="${val.Title}">${val.Title}</option>`)
                                })
                            }
                        
                            // BUSCAR EN LA TABLA AL SELECCIONAR
                            $(`#${tblOpts.TableName}-Sort${col.Name.split(" ").join("")}`).on('change', function () {
                                $(`#${tblOpts.TableName}`).dataTable().api().column(col.Target).search($(this).val()).draw();
                            });
                            // SE DIVIDEN POR LA CANTIDAD DE DIV QUE HAYAN EN LA COLUMNA DE FILTROS QUE POR DEFAULT SON 2 PARA ORGANIZAR MEJOR LA COLUMNA
                            //debugger
                            //if ((columns.Options.filter((key) => key.HasFilter).length - 1) == key) {
                            //    //debugger
                            //    FilterRows = Math.round(12 / FilterRows);

                            //    $(`#${tblOpts.TableName}_wrapper div:first div.col-sm-12.col-md-6`).removeClass().addClass(`col-sm-12 col-md-${(Number.isInteger(FilterRows)) ? FilterRows : 4} `)
                            //}
                        }
                    }

                });
            }
          
        }
      
        // begin first table
        var selector = `#${tblOpts.TableName}`;
        //if (tblOpts && tblOpts.TableName) {
        //    if (tblOpts.TableName == 'fs-table')
        //        selector += `,.${tblOpts.TableName}`;
        //    else
        //        selector += `,#${tblOpts.TableName}`;
        //} else {
        //    selector +=',.fs-table'
        //}
        //debugger
        var table = await $(selector).DataTable({
            scrollX: (tblOpts && tblOpts.Scrollable) ? tblOpts.Scrollable.X : false,
            scrollY: (tblOpts && tblOpts.Scrollable) ? tblOpts.Scrollable.Y : "", //frecuentemente la desorganiza
            scrollCollapse: (tblOpts && tblOpts.Scrollable) ? tblOpts.Scrollable.ScrollColapse : false,
            //responsive:false,

            responsive: {
                details: {
                    renderer: function (api, rowIdx, columns) {
                        var data = $.map(columns, function (col, i) {
                            return col.hidden ?
                                `<tr  class="responsive-row" data-dt-row="${col.rowIndex}" data-dt-column="${col.columnIndex}">
                                <td>${col.title}:</td>
                                <td id="responsive-row-${col.rowIndex}-${col.columnIndex}" class="responsive-child-row">${col.data}</td>
                                </tr>`:
                                '';
                        }).join('');
                        return data ?
                            $('<table/>').append(data) :
                            false;
                    }
                }
            },

            //DOM Layout settings
            //         dom: `<'content-table'<'row'<'col-sm-12'tr>>
            //<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-12 dataTables_pager'lp>>`,
            //rowReorder: {
            //    selector: 'td:first-child'
            //},
            rowReorder: tblOpts.ReorderSelector && {
                selector: tblOpts.ReorderSelectors
            },
            //rowReorder: {
            //    dataSrc: 'Codigo',
            //    //editor: editor
            //},
            paging: (tblOpts && tblOpts.Paginator) ? tblOpts.Paginator.Paging : true,
            info: (tblOpts) ? tblOpts.Paging : true,
            pageLength: (tblOpts && tblOpts.Paginator) ? tblOpts.Paginator.PageLength : 5,
            lengthMenu: [5, 10, 25, 50],
            autoWidth: true,
            language: {
                lengthMenu: 'Mostrar  _MENU_',
                paginate: {
                    previous: "Anterior",
                    next: "Siguiente",
                },
                sSearch: "Buscar:",
                sZeroRecords: "No se han encontrado registros"
            },
            //searching: tblOpts.FilterBox,
            search:
            {
                input: $('#generalSearch'),
                regex: true,
                caseInsensitive: true,
            },
            select: {
                style: 'os',
                selector: 'td:first-child'
            },
            // Data
            data: array,
            // Column Data
            //columns: data ? Object.getOwnPropertyNames(data[0]).map((key) => { return { data: key } }) : null,

            rowGroup: RowGroup,
            //rowGroup: {
            //    dataSrc: 10
            //},
            /*      order: [[10, 'asc']],*/
            // Order settings
            order: [(orderBy && orderBy.DefaultOrder) ? orderBy.DefaultOrder : 0, (orderBy && orderBy.Orientation) ? orderBy.Orientation : "asc"],
            orderFixed: (tblOpts && tblOpts.RowGroup && tblOpts.RowGroup.FixedOrder && !isNaN(parseInt(tblOpts.RowGroup.FixedOrder.Target)))
                ? [tblOpts.RowGroup.FixedOrder.Target, tblOpts.RowGroup.FixedOrder.Orientation] : null,
            initComplete: function () {
                //debugger
                if (!tblOpts.FilterBox)
                    $('.dataTables_filter').css({ display: 'none' })
                const content = $(this).parents('.content-table')
                const inputFilters = $(content).find('.fs-input-filter').not('.dropdown');
                this.api().columns().every(function (index) {
                    var column = this;
                    if (columns.Options) {
                        $.each(columns.Options, async function (key, col) {
        
                            if (col.Target == index) {
                                var data = (col.Data && col.Data.length>0) ? col.Data : column.data().unique().toArray();
                                if (column.title().toLowerCase() == col.Name.toLowerCase()) {

                                    $(`[data-col-index="${parseInt(col.Target)}"`, inputFilters).empty().append(`<option value>SELECCIONE</option>`);
                                    if (data && data.length > 0) {
                                        column.data().unique().sort().each(function (d, j) {
                                            //var objs = data.find(o => o.Identifier.toString() === d.toString())
                                            var objs = data.find(o => !isNullOrEmpty(o.Identifier) ? o.Identifier.toString() === d.toString() : o == d.toString())
                                            //if (objs && objs.Identifier)
                                            //    $(`.fs-input-filter[data-col-index="${parseInt(col.Target)}"`).append(`<option value="${objs.Identifier}">${objs.Title}</option>`);
                                            //else
                                                if (objs)
                                                    $(`[data-col-index="${parseInt(col.Target)}"`, inputFilters).append(`<option value="${objs.Title}">${objs.Title}</option>`);
                                            else
                                                    $(`[data-col-index="${parseInt(col.Target)}"`, inputFilters).append(`<option value="${d}">${d}</option>`);
                                        });
                                    }
                                    else {
                                        $(`[data-col-index="${parseInt(col.Target)}"`, inputFilters).empty().append(`<option value>SELECCIONE</option>`);
                                        column.data().unique().sort().each(function (d, j) {
                                            $(`[data-col-index="${parseInt(col.Target)}"`, inputFilters).append(`<option value="${d}">${d}</option>`);
                                        });
                                    }
                                }
                            }
                        });
                    }
                })

                $('.fs-table-search', content).on('click', function (e) {
                    e.preventDefault();
                    var params = {};
                    $(inputFilters).each(function () {
                        var i = $(this).data('col-index');
                        if (params[i]) {
                            params[i] += '|' + $(this).val();
                        }
                        else {
                            if (typeof (i) != 'undefined')
                                params[i] = $(this).val();
                        }
                    });
                    $.each(params, function (i, val) {
                        // apply search params to datatable
                        if (Array.isArray(val)) {
                            for (let v of val)
                                table.column(i).search(v ? v : '', false,true);
                        } else
                            table.column(i).search(val ? val : '', false, false);
                       
                    });
                    table.table().draw();
                });

                $('.fs-table-reset', content).on('click', function (e) {
                    e.preventDefault();
                    const tableSorts = $('.fs-table-sort');
                    cleanDomElements(inputFilters)
                    cleanDomElements(tableSorts);
                    $(inputFilters).each(function () {     
                        table.column($(this).data('col-index')).search('', false, false);
                    });
                    $(tableSorts).each(function () {
                        $(this).trigger('change');
                    });
                    table.table().draw();
                });
            },
            columnDefs: colDefs,
            footerCallback: async function (row, data, start, end, display) {
                if (footerSum) {
                    var api = this.api(), data;
                    var footerHtml = "<div class='d-flex justify-content-evenly flex-row flex-wrap'>";
                    //var RowSize = 0;
                    //var ArraysLength = 0;
                    //if (footerSum.RowSum)
                    //    ArraysLength += footerSum.RowSum.length;
                    //if (footerSum.RowInfo)
                    //    ArraysLength += footerSum.RowInfo.length
                    //if (ArraysLength % 2 == 0)
                    //    RowSize = 12 / ArraysLength
                    //else
                    //    RowSize = 4
                    // RECORRER ARRAY DE SUMA DE COLUMNAS
                    await $.each(footerSum.RowSum, async function (key, val) {
                        // Remove the formatting to get integer data for summation
                        var intVal = function (i) {
                            return typeof i === 'string' ? i.replace(/[\$,]/g, '') * 1 : typeof i === 'number' ? i : 0;
                        };
                        let j = [];
                        var total = 0;
                        var pageTotal = 0;

                        for (let j in val.RowPositions) {
                            // Total over all pages
                            total += await api.column(val.RowPositions[j]).data().reduce(function (a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);
                            // Total over this page
                            pageTotal += await api.column(val.RowPositions[j], { page: 'current' }).data().reduce(function (a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);
                        }
                        //class="col-md-${RowSize}" style="display:inline-block;" 
                        if (tblOpts.Paginator.Paging)
                            footerHtml = footerHtml +
                                `<div class="fs-margin-l-auto" style="margin-right:2%" id="footer${val.Id}"  data-total='${total}'>
                                    ${val.Title}: ${val.Type == "int" ? "" : "$"} ${(pageTotal.toFixed(2))} de ( ${val.Type == "int" ? "" : "$"} ${(total.toFixed(2))} )
                            </div> `
                        else
                            footerHtml = footerHtml +
                                `<div class="fs-margin-l-auto" style="margin-right:2%" id="footer${val.Id}"  data-total='${total}'>
                                    ${val.Title}: ${val.Type == "int" ? "" : "$"} ${(pageTotal.toFixed(2))}
                                </div> `
                        $(api.column().footer()).html(footerHtml);

                    })
                    //  RECORRER ARRAY DE INFORMACIONES (STATUS, ETC)
                    $.each(footerSum.RowInfo, function (key, val) {
                        if (val.State)
                            val.Html = val.Html.split("{state}").join(val.State)
                        if (val.Data)
                            val.Html = val.Html.split("{data}").join(val.Data)
                        footerHtml = footerHtml +
                            `<div class="fs-margin-l-auto" style="margin-right:2%" id="footer${val.Id}">
                                ${val.Title} 
                                ${val.Html}
                            </div>`
                        $(api.column().footer()).html(footerHtml);
                    })
                    $(api.column().footer()).html(footerHtml + '</div>');

                }
            },
             
        });

        table.on('responsive-resize', function (e, datatable, columns) {
             //show/ hide group-end cells for columns that became visible/ invisible
            var activeColumns = {};

            activeColumns = columns.filter(function (value, index) {
                return (value === true || value === false) ? true : false;
            });

            $('tr.group-end').each(function () {

                $('td', this).css('display', function (index, value) {
                    return activeColumns[index] ? '' : 'none';
                });
            });
            //const element = e.currentTarget ?? e.target;
            //$.each($('.tbl-toggle', element), function (key, val) {
            //    let id = this.id;
            //    const element = $(`#${id}`);
            //    let params = $(element).data("params");
            //    let method = $(element).data("method");
            //    let display = $(element).css("display");
            //    let classes = $(element).attr("class");
            //    let methodName = $(this).attr("onclick");

            //    $(this).attr("onclick", buildMethod(methodName, params));
            //    $(this).data("params", params);
            //    $(this).data("method", method);
            //    $(this).css("display", display);
            //    $(this).addClass(classes);
            //})

            //$.each($('.tbl-action', element), function (key, val) {
            //    let id = this.id;
            //    const element = $(`#${id}`);
            //    let params = $(element).data("params");
            //    let method = $(element).data("method");
            //    let display = $(element).css("display");
            //    let methodName = $(this).attr("onclick");

            //    $(this).attr("onclick", buildMethod(methodName, params));
            //    $(this).data("params", params);
            //    $(this).data("method", method);
            //    $(this).css("display", display);
            //})
        });

        table.on('responsive-display', function (e, datatable, row, showHide, update) {
            const element = e.currentTarget ?? e.target;
            $.each($('.tbl-toggle',element), function (key, val) {
                let id = this.id;
                const element = $(`#${id}`);
                let params = $(element).data("params");
                let method = $(element).data("method");
                let display = $(element).css("display");
                let classes = $(element).attr("class");
                let methodName = $(this).attr("onclick");
            
                $(this).attr("onclick", buildMethod(methodName, params));
                $(this).data("params", params);
                $(this).data("method", method);
                $(this).css("display", display);
                $(this).addClass(classes);
            })
                 
            $.each($('.tbl-action',element), function (key, val) {
                let id = this.id;
                const element = $(`#${id}`);
                let params = $(element).data("params");
                let method = $(element).data("method");
                let display = $(element).css("display");
                let methodName = $(this).attr("onclick");
             
                $(this).attr("onclick", buildMethod(methodName, params));
                $(this).data("params", params);
                $(this).data("method", method);
                $(this).css("display", display);
                $(this).addClass("responsive-row");
            })
        });
       

        $('#kt_datepicker').datepicker({
            todayHighlight: true,
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>',
            },
        });


        var GetDateRange = function (start, end) {
            var FromDate = start.split("-");
            var ToDate = end.split("-");
            var arr = "";
            FromDate = new Date(`${FromDate[1]}-${FromDate[0]}-${FromDate[2]}`);
            ToDate = new Date(`${ToDate[1]}-${ToDate[0]}-${ToDate[2]}`);
            while (FromDate <= ToDate) {
                if (FromDate < ToDate) {
                    arr += (moment(FromDate).format('DD-MM-YYYY')) + '|'
                } else {
                    arr += (moment(FromDate).format('DD-MM-YYYY'))
                }
                FromDate.setDate(FromDate.getDate() + 1);
            }
            return arr;
        }
        const buildMethod = (methodName, params) => {

            var method = (methodName && methodName.replace(/\s*\(.*?\)\s*/g, '')) ?? "";
            return method && `${method}(event${params ? `,${params}` : ''})`
        }
        // AGREGAR EVENTOS A LAS COLUMNAS PERSONALIZADAS DE EDICION Y ELIMINAR
        $(`${selector}`).on('draw.dt', async function () {
       
            table.rows().every(function (rowIdx, tableLoop, rowLoop) {
                if (tblOpts) {
                    //debugger
                    var node = this.node();
                    var row = this;
                    var name = (tblOpts.TableName) ? tblOpts.TableName.replace("Tbl", "").replace("Table", "").replace("Tabla", "").replace("tabla", "") : null;

                    var id;
                    if (columns.ToggleColumns) { 
                        $.each($(node).find('.tbl-toggle'), function (key, val) {
                            //debugger
                            var toggle = columns.ToggleColumns[key];
                            var params = "";
                            var targets = (toggle.Targets && toggle.Targets.split(",").map(Number)) ?? "";
                            if (targets) {
                                $.each(targets, function (key, val) {
                                    if (key == (targets.length - 1))
                                        params += `'${(row).data()[val]}'`
                                    else
                                        params += `'${(row).data()[val]}',`;
                                })
                            }
                            $(this).data("params", params);
                           
                            var methodName = $(this).attr("onclick");
                            $(this).data("method", methodName && methodName.replace(/\s*\(.*?\)\s*/g, ''));
                            $(this).attr("onclick", buildMethod(methodName, params));
                            //$.each(targets, function (key, val) {
                            //    setDataTableValue(tblOpts.TableName,row,val,$(this).html())
                            //})
                           
                        })
                    }
                    if (tblActions) {
                        id = (this).data()[tblActions.TargetId ?? 0]
                        $(node).attr('id', `${name ?? ""}${id}`);
                        $(node).data('id', id);
                        if (tblActions.ClickableMethod) {
                            const clickable = tblActions.ClickableMethod;
                            var params = "";
                            let targets = (clickable.Targets && clickable.Targets.split(",").map(Number)) ?? "";
                            $.each(targets, function (key, val) {
                                if (key == (targets.length - 1))
                                    params += `'${(row).data()[val] ?? ''}'`
                                else
                                    params += `'${(row).data()[val] ?? ''}',`;
                            })
                            const allCols = (clickable.Cols && clickable.Cols == "_all");
                            $(this).data("params", params);
                            if (allCols)
                                $(node).attr('onClick', buildMethod(clickable.OnClick, params));
                            else {
                                let cols = (clickable.Cols && clickable.Cols.split(",").map(Number)) ?? "";
                                $.each(cols, function (key, val) {
                                    $(`:eq(${val})`,node).attr('onClick', buildMethod(clickable.OnClick, params));
                                })
                            }
                           
                        }

                        $.each($(node).find('.tbl-action'), function (key, val) {
                            let button = this;
                            var buttonData = tblActions.Buttons[key];
                            var params = "";
                            let array = [];
                            var targets = (buttonData.Targets && buttonData.Targets.split(",").map(Number)) ?? "";
                            if (targets) {
                                $.each(targets, function (key, val) {
                                    if (key == (targets.length - 1))
                                        params += `'${(row).data()[val]}'`
                                    else
                                        params += `'${(row).data()[val]}',`;
                                    array.push(params);
                                })
                            }
                            $(this).data("params", params);
                           
                            var method = $(this).attr("onclick");
                            $(this).data("method", method && method.replace(/\s*\(.*?\)\s*/g, ''));
                            $(this).attr("onclick", buildMethod(method, params))
                        })
                    }

                   

                }

            })
        
            //table.columns().every(function (index) {

            //    var column = this;
            //    if (columns.Options) {
            //        $.each(columns.Options, async function (key, col) {

            //            if (col.Target == index) {
            //                var data = (col.Data) ? col.Data : null;
            //                if (column.title().toLowerCase() == col.Name.toLowerCase()) {

            //                    $(`.fs-input-filter[data-col-index="${parseInt(col.Target)}"`).empty().append(`<option value>SELECCIONE</option>`);
            //                    if (data && data.length > 0) {
            //                        column.data().unique().sort().each(function (d, j) {
            //                            var objs = data.find(o => o.Identifier.toString() === d.toString())
            //                            if (objs)
            //                                $(`.fs-input-filter[data-col-index="${parseInt(col.Target)}"`).append(`<option value="${objs.Title}">${objs.Title}</option>`);
            //                            else
            //                                $(`.fs-input-filter[data-col-index="${parseInt(col.Target)}"`).append(`<option value="${d}">${d}</option>`);
            //                        });
            //                    }
            //                    else {
            //                        column.data().unique().sort().each(function (d, j) {

            //                            $(`.fs-input-filter[data-col-index="${parseInt(col.Target)}"`).append(`<option value="${d}">${d}</option>`);
            //                        });
            //                    }
            //                }
            //            }
            //        });
            //    }
            //})
        });
       

	};


	return {

		//main function to initiate the module
        init: function (tblOpts, columns, tblActions, orderBy,footerSum, array) {
            initTable1(tblOpts, columns, tblActions, orderBy, footerSum,array);
            //initTable2();
        }
	};
}();

jQuery(document).ready(function() {
	//KTDatatablesBasicScrollable.init();
});