"use strict";
var KTDatatablesBasicBasic = function () {
    $.fn.dataTable.Api.register('column().title()', function () {
        return $(this.header()).text().trim();
    });

    var initTable1 = async function (tblOpts = null, columns = null, tblActions = null, orderBy = null, footerSum = null,array=null) {
        var colDefs = [];
        var FilterRows = 2;
        var RowGroup = null;
        await colDefs.push({
            targets: tblActions.ActionCol ?? null,
            orderable: false,
            width: tblActions.Width ?? null,
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
            orderBy.NonVisible && colDefs.push({
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
                                        .split("{count}").join(count)
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
                            function (rows, groupValue) { return groupValue },
                        endClassName: `dtrg-end ${(group.End && group.End.BgColor) ? "bg-" + group.End.BgColor : "dtrg-group"}`,
                        endRender: ((group.End.Cols.length > 0) && (!group.Target)) ? (function (rows, groupValue) {
                            let data = `<div class="d-flex flex-wrap justify-content-between">`;
                            let count = 0;
                            let total = 0;
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
                                .split("{value}").join(((data || col.Value) && "checked") ?? "")
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

                    await colDefs.push({
                        targets: parseInt(col.Target),
                        width: (col.Width) ? col.Width : null,
                        className: (col.Class) ? col.Class : null,
                        render: function (data, type, full, meta) {
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
                        $(`#${tblOpts.TableName}_wrapper div:first`).removeClass().addClass('d-flex flex-wrap justify-content-between');
                        $(`#${tblOpts.TableName}_wrapper div:first>div`).removeClass();
                        $(`#${tblOpts.TableName}_wrapper div:first div:first `).after(`
                                <div >
                                    <div class="dataTables_filter" id="${tblOpts.TableName}_${col.Name.split(" ").join("")}_filter">
                                       <div class="d-flex flex-wrap gap-2" >
                                            <div>
                                                <label style="margin-top:5px"> ${col.Name}: </label>
                                            </div>
                                            <div>
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
                        //                <select data-live-search="true" title='SELECCIONE' data-col-index="${(col.Data.length == 0) ? col.Target : ""}"  class="form-control fs-selectpicker Sort${col.Name.split(" ").join("")} form-control-sm ${col.Data.length == 0 ? "fs-input-filter" : ""} " id="Sort${col.Name.split(" ").join("")}" >
                        //                    <option value="">Seleccione</option>
                        //                </select>
                        //            </div>
                        //        </div>  
                        //    </div>
                        //</div>`);

                        // LLENAR SELECT CON VALORES DE LA TABLA
                        $.each(col.Data, function (key, val) {
                            $(`#${tblOpts.TableName}_wrapper div:first #${tblOpts.TableName}_${col.Name.split(" ").join("")}_filter select`)
                                .append(`<option value="${val.Title}">${val.Title}</option>`)
                        })
                        // BUSCAR EN LA TABLA AL SELECCIONAR
                        $(`#Sort${col.Name.split(" ").join("")}`).on('change', function () {
                            $(`#${tblOpts.TableName}`).dataTable().api().column(col.Target).search($(this).val()).draw();
                        });
                        // SE DIVIDEN POR LA CANTIDAD DE DIV QUE HAYAN EN LA COLUMNA DE FILTROS QUE POR DEFAULT SON 2 PARA ORGANIZAR MEJOR LA COLUMNA
                        //if ((columns.Options.filter((key) => key.HasFilter).length - 1) == key) {
                        //    FilterRows = Math.round(12 / FilterRows);
                        //    $(`#${tblOpts.TableName}_wrapper div:first div.col-sm-12.col-md-6`).removeClass().addClass(`col-sm-12 col-md-${(Number.isInteger(FilterRows)) ? FilterRows : 4} `)
                        //}
                    }
                });
            }

        }
        // begin first table
            var selector = `#${tblOpts.TableName}`;
        //var selector = '#kt_table_1';
        //if (tblOpts && tblOpts.TableName) {
        //    if (tblOpts.TableName == 'fs-table')
        //        selector += `,.${tblOpts.TableName}`;
        //    else
        //        selector += `,#${tblOpts.TableName}`;
        //} else {
        //    selector += ',.fs-table'
        //}
        var table = await $(selector).DataTable({
            scrollX: (tblOpts && tblOpts.Scrollable) ? tblOpts.Scrollable.X : false,
            scrollY: (tblOpts && tblOpts.Scrollable) ? tblOpts.Scrollable.Y : "", //frecuentemente la desorganiza
            scrollCollapse: (tblOpts && tblOpts.Scrollable) ? tblOpts.Scrollable.ScrollColapse : false,
            rowGroup: RowGroup,
            responsive: {
                details: {
                    renderer: function (api, rowIdx, columns) {
                        var data = $.map(columns, function (col, i) {
                            return col.hidden ?
                                `<tr id="responsive-child-row-${col.rowIndex}-${col.columnIndex}" class="responsive-child-row" data-dt-row="${col.rowIndex}" data-dt-column="${col.columnIndex}">
                                <td>${col.title}:</td>
                                <td>${col.data}</td>
                                </tr>`:
                                '';
                        }).join('');
                        return data ?
                            $('<table/>').append(data) :
                            false;
                    }
                }
            },
            rowReorder: tblOpts.ReorderSelector && {
                selector: tblOpts.ReorderSelectors
            },
            paging: (tblOpts && tblOpts.Paginator) ? tblOpts.Paginator.Paging : true,
            info: (tblOpts) ? tblOpts.Paging : true,
			 //DOM Layout settings
			dom: `<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-12 dataTables_pager'lp>>`,
            //sDom: "",
			lengthMenu: [5, 10, 25, 50],

            pageLength: (tblOpts && tblOpts.Paginator) ? tblOpts.Paginator.PageLength : 5,

			language: {
                lengthMenu: 'Mostrar  _MENU_',
                paginate: {
                    previous: "Anterior",
                    next: "Siguiente",
                },
                sSearch: "Buscar:",
                sZeroRecords: "No se han encontrado registros"
            },
            // Data
            data: array,
            // Column Data
            //columns: data ? Object.getOwnPropertyNames(data[0]).map((key) => { return { data: key } }) : null,
            // Order settings
            //orderable: tblOpts.Orderable ,
            order: [(orderBy && orderBy.DefaultOrder) ? orderBy.DefaultOrder : 0, (orderBy && orderBy.Orientation) ? orderBy.Orientation : "asc"],
            // ordenar por group
            orderFixed: (tblOpts && tblOpts.RowGroup && tblOpts.RowGroup.FixedOrder && !isNaN(parseInt(tblOpts.RowGroup.FixedOrder.Target)))
                ? [tblOpts.RowGroup.FixedOrder.Target, tblOpts.RowGroup.FixedOrder.Orientation] : null,

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
                            val.Html =  val.Html.split("{data}").join(val.Data) 
                        footerHtml = footerHtml +
                            `<div class="col-md-${RowSize} style="display:inline-block" id="footer${val.Id}">
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
            $.each($('.tbl-toggle', element), function (key, val) {
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

            $.each($('.tbl-action', element), function (key, val) {
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
            })
        });

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
                                    $(`:eq(${val})`, node).attr('onClick', buildMethod(clickable.OnClick, params));
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
        });
        //$(`${selector}`).on('draw.dt', async function () {

        //    table.rows().every(function (rowIdx, tableLoop, rowLoop) {
        //        if (tblOpts) {
        //            //debugger
        //            var node = this.node();
        //            var row = this;
        //            var name = (tblOpts.TableName) ? tblOpts.TableName.replace("Tbl", "").replace("Table", "").replace("Tabla", "").replace("tabla", "") : null;

        //            var id;
        //            if (columns.ToggleColumns) {
        //                $.each($(node).find('.tbl-toggle'), function (key, val) {
        //                    //debugger
        //                    var toggle = columns.ToggleColumns[key];
        //                    var params = "";
        //                    var targets = (toggle.Targets && toggle.Targets.split(",").map(Number)) ?? "";
        //                    if (targets) {
        //                        $.each(targets, function (key, val) {
        //                            if (key == (targets.length - 1))
        //                                params += `'${(row).data()[val]}'`
        //                            else
        //                                params += `'${(row).data()[val]}',`;
        //                        })
        //                    }
        //                    $(this).data("params", params);
                       
        //                    var methodName = $(this).attr("onclick");
        //                    $(this).data("method", methodName && methodName.replace(/\s*\(.*?\)\s*/g, ''));
        //                    $(this).attr("onclick", buildMethod(methodName, params));
        //                    //$.each(targets, function (key, val) {
        //                    //    setDataTableValue(tblOpts.TableName,row,val,$(this).html())
        //                    //})

        //                })
        //            }
        //            if (tblActions) {
        //                id = (this).data()[tblActions.TargetId ?? 0]
        //                $(node).attr('id', `${name ?? ""}${id}`);
        //                $(node).data('id', id);
        //                if (tblActions.ClickableMethod) {
        //                    const clickable = tblActions.ClickableMethod;
        //                    var params = "";
        //                    let targets = (clickable.Targets && clickable.Targets.split(",").map(Number)) ?? "";
        //                    $.each(targets, function (key, val) {
        //                        if (key == (targets.length - 1))
        //                            params += `'${(row).data()[val] ?? ''}'`
        //                        else
        //                            params += `'${(row).data()[val] ?? ''}',`;
        //                    })
        //                    const allCols = (clickable.Cols && clickable.Cols == "_all");
        //                    $(this).data("params", params);
        //                    if (allCols)
        //                        $(node).attr('onClick', buildMethod(clickable.OnClick, params));
        //                    else {
        //                        let cols = (clickable.Cols && clickable.Cols.split(",").map(Number)) ?? "";
        //                        $.each(cols, function (key, val) {
        //                            $(`:eq(${val})`, node).attr('onClick', buildMethod(clickable.OnClick, params));
        //                        })
        //                    }

        //                }

        //                $.each($(node).find('.tbl-action'), function (key, val) {
        //                    let button = this;
        //                    var buttonData = tblActions.Buttons[key];
        //                    var params = "";
        //                    let array = [];
        //                    var targets = (buttonData.Targets && buttonData.Targets.split(",").map(Number)) ?? "";
        //                    if (targets) {
        //                        $.each(targets, function (key, val) {
        //                            if (key == (targets.length - 1))
        //                                params += `'${(row).data()[val]}'`
        //                            else
        //                                params += `'${(row).data()[val]}',`;
        //                            array.push(params);
        //                        })
        //                    }
        //                    $(this).data("params", params);
        //                    var method = $(this).attr("onclick");
        //                    $(this).data("method", method && method.replace(/\s*\(.*?\)\s*/g, ''));
        //                    $(this).attr("onclick", buildMethod(method, params))
        //                })
        //            }



        //        }

        //    })

        //    //table.columns().every(function (index) {

        //    //    var column = this;
        //    //    if (columns.Options) {
        //    //        $.each(columns.Options, async function (key, col) {

        //    //            if (col.Target == index) {
        //    //                var data = (col.Data) ? col.Data : null;
        //    //                if (column.title().toLowerCase() == col.Name.toLowerCase()) {

        //    //                    $(`.fs-input-filter[data-col-index="${parseInt(col.Target)}"`).empty().append(`<option value>SELECCIONE</option>`);
        //    //                    if (data && data.length > 0) {
        //    //                        column.data().unique().sort().each(function (d, j) {
        //    //                            var objs = data.find(o => o.Identifier.toString() === d.toString())
        //    //                            if (objs)
        //    //                                $(`.fs-input-filter[data-col-index="${parseInt(col.Target)}"`).append(`<option value="${objs.Title}">${objs.Title}</option>`);
        //    //                            else
        //    //                                $(`.fs-input-filter[data-col-index="${parseInt(col.Target)}"`).append(`<option value="${d}">${d}</option>`);
        //    //                        });
        //    //                    }
        //    //                    else {
        //    //                        column.data().unique().sort().each(function (d, j) {

        //    //                            $(`.fs-input-filter[data-col-index="${parseInt(col.Target)}"`).append(`<option value="${d}">${d}</option>`);
        //    //                        });
        //    //                    }
        //    //                }
        //    //            }
        //    //        });
        //    //    }
        //    //})
        //});

		table.on('change', '.kt-group-checkable', function() {
			var set = $(this).closest('table').find('td:first-child .kt-checkable');
			var checked = $(this).is(':checked');

			$(set).each(function() {
				if (checked) {
					$(this).prop('checked', true);
					$(this).closest('tr').addClass('active');
				}
				else {
					$(this).prop('checked', false);
					$(this).closest('tr').removeClass('active');
				}
			});
		});

		table.on('change', 'tbody tr .kt-checkbox', function() {
			$(this).parents('tr').toggleClass('active');
		});
    };


	return {

		//main function to initiate the module
        init: function (tblOpts, columns, tblActions, orderBy, footerSum, array) {
            initTable1(tblOpts, columns, tblActions, orderBy, footerSum, array);
		}
	};
}();

jQuery(document).ready(function() {
	//KTDatatablesBasicBasic.init();
});
