app.service('GridService', function() {
	this.buildGrid = function(colInfo, gridData, $scope) {
		var txt = "";
		txt += "<table class='table table-striped table-bordered text-nowrap' border ='1' >";
		txt += "<thead>";

		for (x in colInfo) {
			if (colInfo[x].colType === "STT") {
				txt += "<th class = 'text-center'>" + colInfo[x].keyname + "</th>"
			}
			else {
				txt += "<th>" + colInfo[x].keyname + "</th>"
			}

		};
		txt += "</thead>";
		txt += "<tbody>";


		for (idx in gridData) {

			var rowData = gridData[idx];
			txt += "<tr>";
			// 2 COLUMN 
			for (var i = 0, size = colInfo.length; i < size; i++) {
				var columnInfo = colInfo[i];

				// String
				if (columnInfo.colType === "string") {
					txt += "<td>" + rowData[columnInfo['keycol']] + "</td>";
				}
				else if (columnInfo.colType === "STT") {
					txt += "<td class = 'text-center'>" + (parseInt(idx) + 1) + "</td>";
				}
				else if (columnInfo.colType === "yearExp") {
					txt += "<td class = 'text-right'>" + rowData[columnInfo['keycol']] + " Năm" + "</td>";
				}
				else if (columnInfo.colType === "monthExp") {
					txt += "<td class = 'text-right'>" + rowData[columnInfo['keycol']] + " Tháng" + "</td>";
				}

				else if (columnInfo.colType === "int") {
					txt += "<td class='text-center'>" + rowData[columnInfo['keycol']] + "</td>";
				}
				// HTML Template
				else if (columnInfo.colType === "template") {
					// Tuong lai 
					if (columnInfo.template.indexOf("{") != -1) {
						var endMark = columnInfo.template.indexOf("}");
						var colId = columnInfo.template.substring(columnInfo.template.indexOf("{") + 1, endMark);
						var template = columnInfo.template;
						template = template.split("{" + colId + "}").join(rowData[colId]);
					}


					txt += "<td>" + template + "</td>";
				}
				// theo số thứ tự
				else if (columnInfo.colType === "checkbox") {
					// Tuong lai 
					var template = columnInfo.template;
					if (columnInfo.template.indexOf("{") != -1) {
						var endMark = template.indexOf("}");
						var colId = template.substring(template.indexOf("{") + 1, endMark);
						template = template.split("{" + colId + "}").join(parseInt(idx) + 1);
					}
					txt += "<td>" + template + "</td>";
				}
				// html link 
				else if (columnInfo.colType === "link") {
					if (columnInfo.template.indexOf("{") != -1) {
						var endMark = columnInfo.template.indexOf("}");
						var colId = columnInfo.template.substring(columnInfo.template.indexOf("{") + 1, endMark);
						var template = columnInfo.template;
						template = template.split("{" + colId + "}").join(rowData[colId]);
					}
					txt += "<td>" + template + rowData[columnInfo['keycol']] + "</a></td>";
				} else if (columnInfo.colType === "inputTable") {
					txt += "<td>" + "<input type='text' data-ng-model=dataRow" + idx + " class='form-control' data-ng-bind =dataRow" + idx + ">" + "</td>";
					$scope["dataRow" + idx] = rowData[columnInfo['keycol']];
				}
				else {
					txt += "<td>" + rowData[columnInfo['keycol']] + "</td>";
				}
			}
			txt += "</tr>";
		}
		txt += "</tbody>";
		txt += "</table>";

		return txt;
	}
	this.buildpagination = function(gridData) {
		var txt = ""
		txt += "<ul class='changepage pagination justify-content-end pr-4'>"
		if(gridData.page.pageIdx==1)
		{
			txt += "<li class='page-item ng-hide'data-ng-click= pagina(" + (gridData.page.pageIdx - 1) + ") data-ng-class={active1:isActivePagi(" + (gridData.page.pageIdx - 1) + ")}><a class='page-link' >" + "«" + "</a></li>"
		}
		else
		
		{txt += "<li class='page-item'data-ng-click= pagina(" + (gridData.page.pageIdx - 1) + ") data-ng-class={active1:isActivePagi(" + (gridData.page.pageIdx - 1) + ")}><a class='page-link' >" + "«" + "</a></li>"
		}
		if (gridData.page.pageIdx < gridData.page.pageCount - 3 && gridData.page.pageIdx > 0) {
			if (gridData.page.pageIdx == 1) {
				txt += "<li disabled class='page-item ng-hide'data-ng-click= pagina(" + 1 + ")><a class='page-link' >" + 1 + "</a></li>"
			}
			else if (gridData.page.pageIdx == 2) {
				txt += "<li disabled class='page-item'data-ng-click= pagina(" + 1 + ")><a class='page-link' >" + 1 + "</a></li>"
			}
			else if (gridData.page.pageIdx == 3) {
				txt += "<li disabled class='page-item'data-ng-click= pagina(" + 1 + ")><a class='page-link' >" + 1 + "</a></li>"
				txt += "<li disabled class='page-item'data-ng-click= pagina(" + 2 + ")><a class='page-link' >" + 2 + "</a></li>"
			}
			
			else {
				txt += "<li class='page-item'data-ng-click= pagina(" + 1 + ")><a class='page-link' >" + 1 + "</a></li>"
				txt += "<li class='page-item'><a class='page-link'>" + "..." + "</a></li>"
			}

			txt += "<li class='page-item'data-ng-click= pagina(" + gridData.page.pageIdx + ") data-ng-class={active1:isActivePagi(" + gridData.page.pageIdx + ")}><a class='page-link' >" + gridData.page.pageIdx + "</a></li>"
			txt += "<li class='page-item'data-ng-click= pagina(" + (gridData.page.pageIdx + 1) + ") data-ng-class={active1:isActivePagi(" + (gridData.page.pageIdx + 1) + ")}><a class='page-link' >" + (gridData.page.pageIdx + 1) + "</a></li>"
			txt += "<li class='page-item'data-ng-click= pagina(" + (gridData.page.pageIdx + 2) + ") data-ng-class={active1:isActivePagi(" + (gridData.page.pageIdx + 2) + ")}><a class='page-link' >" + (gridData.page.pageIdx + 2) + "</a></li>"

			txt += "<li class='page-item'><a class='page-link'>" + "..." + "</a></li>"
			txt += "<li class='page-item'data-ng-click= pagina('" + gridData.page.pageCount + "') data-ng-class={active1:isActivePagi('" + gridData.page.pageCount + "')}><a class='page-link' >" + gridData.page.pageCount + "</a></li>"
		}
		else if (gridData.page.pageIdx < gridData.page.pageCount - 3) {
			if (gridData.page.pageCount > 3 && gridData.page.pageCount < (gridData.page.pageCount - 3)) {
				txt += "<li class='page-item'data-ng-click= pagina(" + 1 + ")><a class='page-link' >" + 1 + "</a></li>"
				txt += "<li class='page-item'><a class='page-link'>" + "..." + "</a></li>"
				txt += "<li class='page-item'data-ng-click= pagina(" + (gridData.page.pageIdx - 2) + ") data-ng-class={active1:isActivePagi(" + (gridData.page.pageIdx - 2) + ")}><a class='page-link' >" + (gridData.page.pageIdx - 2) + "</a></li>"
				txt += "<li class='page-item'data-ng-click= pagina(" + (gridData.page.pageIdx - 1) + ") data-ng-class={active1:isActivePagi(" + (gridData.page.pageIdx - 1) + ")}><a class='page-link' >" + (gridData.page.pageIdx - 1) + "</a></li>"
				txt += "<li class='page-item'data-ng-click= pagina(" + gridData.page.pageIdx + ") data-ng-class={active1:isActivePagi(" + gridData.page.pageIdx + ")}><a class='page-link' >" + gridData.page.pageIdx + "</a></li>"
			}


		}
		else if (gridData.page.pageIdx >= gridData.page.pageCount - 3) {
			if (gridData.page.pageCount <= 3) {
				if(gridData.page.pageCount ==3)
				{
					txt += "<li class='page-item'data-ng-click= pagina(" + (gridData.page.pageCount - 2) + ") data-ng-class={active1:isActivePagi(" + (gridData.page.pageCount - 2) + ")}><a class='page-link' >" + (gridData.page.pageCount - 2) + "</a></li>"
				txt += "<li class='page-item'data-ng-click= pagina(" + (gridData.page.pageCount - 1) + ") data-ng-class={active1:isActivePagi(" + (gridData.page.pageCount - 1) + ")}><a class='page-link' >" + (gridData.page.pageCount - 1) + "</a></li>"
				txt += "<li class='page-item'data-ng-click= pagina(" + gridData.page.pageCount + ") data-ng-class={active1:isActivePagi(" + gridData.page.pageCount + ")}><a class='page-link' >" + gridData.page.pageCount + "</a></li>"
				}
				else if(gridData.page.pageCount ==2)
				{
				txt += "<li class='page-item'data-ng-click= pagina(" + (gridData.page.pageCount - 1) + ") data-ng-class={active1:isActivePagi(" + (gridData.page.pageCount - 1) + ")}><a class='page-link' >" + (gridData.page.pageCount - 1) + "</a></li>"
				txt += "<li class='page-item'data-ng-click= pagina(" + gridData.page.pageCount + ") data-ng-class={active1:isActivePagi(" + gridData.page.pageCount + ")}><a class='page-link' >" + gridData.page.pageCount + "</a></li>"
				}
			}
			else if (gridData.page.pageIdx == !(gridData.page.pageCount)) {
				txt += "<li class='page-item'data-ng-click= pagina('" + gridData.page.pageCount + "') data-ng-class={active1:isActivePagi('" + gridData.page.pageCount + "')}><a class='page-link' >" + gridData.page.pageCount + "</a></li>"
			} else {
				if(!(gridData.page.pageCount==4))
				{
				txt += "<li class='page-item'data-ng-click= pagina(" + 1 + ")><a class='page-link' >" + 1 + "</a></li>"
				txt += "<li class='page-item'><a class='page-link'>" + "..." + "</a></li>"
				}
				if (gridData.page.pageIdx == gridData.page.pageCount - 3) {
					txt += "<li class='page-item'data-ng-click= pagina(" + gridData.page.pageIdx + ") data-ng-class={active1:isActivePagi(" + gridData.page.pageIdx + ")}><a class='page-link' >" + gridData.page.pageIdx + "</a></li>"
				}	
				if(gridData.page.pageCount==4 && !(gridData.page.pageIdx ==1))
				{
					txt += "<li class='page-item'data-ng-click= pagina(" + 1 + ")><a class='page-link' >" + 1 + "</a></li>"
				}
				txt += "<li class='page-item'data-ng-click= pagina(" + (gridData.page.pageCount - 2) + ") data-ng-class={active1:isActivePagi(" + (gridData.page.pageCount - 2) + ")}><a class='page-link' >" + (gridData.page.pageCount - 2) + "</a></li>"
				txt += "<li class='page-item'data-ng-click= pagina(" + (gridData.page.pageCount - 1) + ") data-ng-class={active1:isActivePagi(" + (gridData.page.pageCount - 1) + ")}><a class='page-link' >" + (gridData.page.pageCount - 1) + "</a></li>"
				txt += "<li class='page-item'data-ng-click= pagina(" + gridData.page.pageCount + ") data-ng-class={active1:isActivePagi(" + gridData.page.pageCount + ")}><a class='page-link' >" + gridData.page.pageCount + "</a></li>"

			}
		}
		if(gridData.page.pageIdx==gridData.page.pageCount)
			{
				txt += "<li class='page-item ng-hide'data-ng-click= pagina(" + (gridData.page.pageIdx + 1) + ") data-ng-class={active1:isActivePagi(" + (gridData.page.pageIdx + 1) + ")}><a class='page-link' >" + "»" + "</a></li>"
			}
			else
			
			{txt += "<li class='page-item'data-ng-click= pagina(" + (gridData.page.pageIdx + 1) + ") data-ng-class={active1:isActivePagi(" + (gridData.page.pageIdx + 1) + ")}><a class='page-link' >" + "»" + "</a></li>"
			}
			+ "</ul>"
	
			return txt;
		}
	this.buildGridnon = function(colInfo, gridData) {
		var txt = "";
		txt += "<table class='table table-striped table-bordered text-nowrap' border ='1' >";
		txt += "<thead>";
		for (x in colInfo) {
			if (colInfo[x].colType === "STT") {
				txt += "<th class = 'text-center'>" + colInfo[x].keyname + "</th>"
			}
			else {
				txt += "<th>" + colInfo[x].keyname + "</th>"
			}
		};
		txt += "</thead>";
		txt += "<tbody>";
		txt += "<td class='text-center text-danger' colspan='" + colInfo.length + "'>{{message}}</td>"
		txt += "</tbody>";
		txt += "</table>";
		return txt;
	}
	this.buildGridTable = function(colInfo, gridData) {
		//console.log(gridData)
		var txt = "";
		txt += "<table class='table table-striped table-bordered text-nowrap' border ='1'>";
		txt += "<thead>";
		for (x in colInfo) {

			txt += "<th> " + colInfo[x].keyname + "</th>"
		};
		txt += "</thead>";
		txt += "<tbody>";
		for (idx in gridData) {
			var rowData = gridData[idx];
			var a = gridData[idx].id
			//console.log(rowData.id)
			txt += "<tr data-ng-show = 'row" + rowData.id + "' >";
			// 2 COLUMN
			for (var i = 0, size = colInfo.length; i < size; i++) {
				var columnInfo = colInfo[i];
				// String
				if (columnInfo.colType === "string") {
					txt += "<td class='pl-3 pr-3'>" + rowData[columnInfo['keycol']] + "</td>";
				}
				else if (columnInfo.colType === "STT") {
					txt += "<td class='pl-3 pr-3'>" + parseInt(parseInt(idx) + 1) + "</td>";
				}
				// HTML Template
				else if (columnInfo.colType === "template") {
					// Tuong lai
					var template = columnInfo.template;
					if (columnInfo.template.indexOf("{") != -1) {
						var endMark = template.indexOf("}");
						var colId = template.substring(template.indexOf("{") + 1, endMark);

						template = template.split("{" + colId + "}").join(rowData[colId]);
					}
					//console.log(rowData[colId]);
					txt += "<td>" + template + "</td>";
				} else if (columnInfo.colType === "idx") {
					// Tuong lai
					var template = columnInfo.template;
					if (columnInfo.template.indexOf("{") != -1) {
						var endMark = template.indexOf("}");
						var colId = template.substring(template.indexOf("{") + 1, endMark);
						template = template.split("{" + colId + "}").join(parseInt(parseInt(idx) + 1));
					}
					//console.log(rowData[colId]);

					txt += "<td>" + template + "</td>";
				} else if (columnInfo.colType === "link") {
					// Tuong lai
					var template = columnInfo.template;
					if (columnInfo.template.indexOf("{") != -1) {
						var endMark = template.indexOf("}");
						var colId = template.substring(template.indexOf("{") + 1, endMark);
						template = template.split("{" + colId + "}").join(rowData[colId]);
					}
					if (rowData.level == 0 ) {
						txt += "<td>" + "<li class ='nav-item has-treeview menu-open m-0' style='display: block !important; cursor: pointer;' data-ng-click='menutable(" + rowData.id + ")'><i class='right fas {{icon" + rowData.id + "}} mr-1'></i>" + template + "<p class='m-0'>" + rowData[columnInfo['keycol']] + "</p></a><ul class='menuleft nav nav-treeview'></ul></li></td>";

					} else if (rowData.level == 1 ) {
						txt += "<td>" + "<li class ='nav-item has-treeview menu-open m-0 ml-2' style='display: block !important ; cursor: pointer'  data-ng-click='menutable(" + rowData.id + ")'><i class='right fas {{icon" + rowData.id + "}} mr-1'></i>" + template + "<p class='m-0'>" + rowData[columnInfo['keycol']] + "</p></a><ul class='menuleft nav nav-treeview'></ul></li></td>";

					} else if (rowData.level == 2 ) {
						txt += "<td>" + "<li class ='nav-item has-treeview menu-open m-0 ml-4' style='display: block !important ; cursor: pointer;'  data-ng-click='menutable(" + rowData.id + ")'><i class='right fas {{icon" + rowData.id + "}} mr-1'></i>" + template + "<p class='m-0'>" + rowData[columnInfo['keycol']] + "</p></a><ul class='menuleft nav nav-treeview'></ul></li></td>";

					} else txt += "<td>" + "<li class ='nav-item has-treeview menu-open m-0 ml-5' style='display: block !important ; cursor: pointer'  data-ng-click='menutable(" + rowData.id + ")'><p class='m-0'>" + rowData[columnInfo['keycol']] + "</p></a><ul class='menuleft nav nav-treeview'></ul></li></td>";


				}
				else {
					txt += "<td>" + rowData[columnInfo['keycol']] + "</td>";
				}
			}

			txt += "</tr>";
		}
		txt += "</tbody>";
		txt += "</table>";

		return txt;
	}
	this.buildBody = function(colInfo, gridData) {
		var txt = "";
		
			for (idx in gridData) {
				var rowData = gridData[idx];
				
				for (var i = 0, size = colInfo.length; i < size; i++) {
				var columnInfo = colInfo[i];
				// String
				if (columnInfo.colType === "string") {
					txt +=  rowData[columnInfo['keycol']] ;
				}else if (columnInfo.colType === "checkboxrole") {
					var template = columnInfo.template;
					if (columnInfo.template.indexOf("{") != -1) {
						var endMark = template.indexOf("}");
						var colId = template.substring(template.indexOf("{") + 1, endMark);	
						template = template.split("{" + colId + "}").join(parseInt(idx)+1);
					}
					txt += template;
					}	
				}
			
			}
			
			return txt;
	}
});