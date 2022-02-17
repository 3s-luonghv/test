
app.controller('SystemCtrl', function($rootScope, $scope, $http, $timeout, $uibModal, $compile, $sce, WebService, ModalService, GridService, ValidateUltility) {
	$timeout(function() {
	})
	$rootScope.showAside = "";
	$rootScope.showNav = true;
	$rootScope.showHead = true;
	$scope.showhide1 = true;
	$rootScope.titlePage = "Hệ thống --> Chức năng hệ thống"
	$scope.selectStatus = 1 + "";
	$scope.selectLanguageSystem = fnGetClientInfo().langCode
	$scope.selectParentFunction = -1 + "";
	$scope.selectFunctionalClassification = -1 + "";
	var url = "screens/modal/modalsystem/modal.html" // khai báo đường link dẫn đến modal
	var dataGridListSystem = [];
	var idListSystem = new Array;
	var dbMultiLang = [];
	//-------------------------------------------------------------------------------------------------//
	fnInit();
	function fnInit() {
		//chạy fn để load các Dropdown
		getDataDropLang(dataRequestDropSystem());
		getDataDropSTT(dataRequestDropSystem());
		getDataDropParentFunction(dataRequestDropSystem());
		getDataDropFunctionalClassification(dataRequestDropSystem());
		//chạy fn để load Data bảng lên
		loadDataTable(dataAgain());
	}
	//khai báo request dùng cho các drop
	function dataRequestDropSystem() {
		var datarequest = {
			"client": {
				"langCode": fnGetClientInfo().langCode
			}
		}
		return datarequest;
	}
	//viết fn gọi API lấy data vào Drop Ngôn ngữ
	function getDataDropLang(datarequest) {
		//gọi WS để lấy dữ liệu gắn lên drop Lang
		WebService.call($http, "lang/lang001", datarequest, function(response) {
			var languageSystem = new Array();
			var dataDropLang = response.data.list;
			if (dataDropLang == 0) {
				console.log("Không có dữ liệu");
			} else {
				for (x in dataDropLang) {
					languageSystem.push(dataDropLang[x])
				}
			}
			// gắn giá trị vào drop Lang
			$scope.languageSystemList = languageSystem;
		}, "POST");
	}
	//viết fn gọi API lấy data vào Drop Status
	function getDataDropSTT(datarequest) {
		//gọi WS để lấy dữ liệu gắn lên drop STT
		WebService.call($http, "useflag/usl03", datarequest, function(response) {
			// console.log(response);
			var statusSystem = new Array();
			var dataDropSTT = response.data.list;
			if (dataDropSTT == 0) {
				console.log("Không có dữ liệu");
			} else {
				for (x in dataDropSTT) {
					statusSystem.push(dataDropSTT[x])
				}
			}
			$scope.StatusSystemList = statusSystem
		}, "POST");
	}
	//viết fn gọi API lấy data vào Drop CHức năng cha
	function getDataDropParentFunction(datarequest) {
		WebService.call($http, "system/sys03", datarequest, function(response) {
			var parentFunction = new Array();
			var dataDropSystem = response.data.list;
			var parentFunctionnew = [];
			//console.log(dataDropSystem);
			if (dataDropSystem == 0) {
				console.log("Không có dữ liệu");
			} else {
				for (x in dataDropSystem) {
					if (dataDropSystem[x].funcTypeId == 1) {
						parentFunction.push(dataDropSystem[x])
					}
				}
				for (x in parentFunction) {
					if (parentFunction[x].parentId == -1) {
						parentFunctionnew.push(parentFunction[x])
						for (y in parentFunction) {
							if (parentFunction[y].parentId == parentFunction[x].id) {
								parentFunction[y].displayText = "\xa0\xa0\xa0\xa0 " + parentFunction[y].displayText
								parentFunctionnew.push(parentFunction[y])
								for (z in parentFunction) {
									if (parentFunction[z].parentId == parentFunction[y].id) {
										parentFunction[z].displayText = "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 " + parentFunction[z].displayText
										parentFunctionnew.push(parentFunction[z])
									}
								}
							}
						}
					}
				}
				//gắn data vô drop
		$scope.parentFunctionList = parentFunctionnew
			}
		}, "POST");
	}
	//viết fn gọi API lấy data vào Drop Phân loại chức năng
	function getDataDropFunctionalClassification(datarequest) {
		WebService.call($http, "func/funty03", datarequest, function(response) {
			var functionalClassification = new Array();
			var dataDropFunctionalClassification = response.data.list;
			if (dataDropFunctionalClassification == 0) {
				console.log("Không có dữ liệu");
			} else {
				for (x in dataDropFunctionalClassification) {
					functionalClassification.push(dataDropFunctionalClassification[x])
				}
			}
			$scope.functionalClassificationList = functionalClassification
		}, "POST");
	}
	// khai báo data search để sử dụng nhiều lần
	function dataAgain() {
		var datarequest = {
			"client": {
				"langCode": $scope.selectLanguageSystem
			},
			"dummySearch": {
				"id": $scope.selectParentFunction,
				"parentId": $scope.selectParentFunction,
				"code": $scope.codeFunction,
				"displayText": $scope.nameFunction,
				"url": $scope.urlFunction,
				"funcTypeId": $scope.selectFunctionalClassification,
				"functionalClassification": $scope.selectFunctionalClassification,
				"useFlag": $scope.selectStatus
			}
		}
		return datarequest;
	}

	//viết fn gọi API lấy data vào
	function loadDataTable(datarequest) {
		WebService.call($http, "system/sys03", datarequest, function(response) {
			var listmenu = response.data.list;
			var columnInfo = [
				{
					"keycol": "action",
					'colType': "idx",
					"keyname": "<div class='form-check'><input class='form-check-input' type='checkbox' data-ng-change='checkboxRoleAll()' ng-model='ischeckRoleAll'><label class='form-check-label'></label></div>",
					"template": "<div class='form-check'><input class='form-check-input' type='checkbox' ng-model='checkboxRole{}' data-ng-click='clickRole({})'><label class='form-check-label'></label></div>"
				},
				{ "keycol": "STT", "keyname": "{{system16}}", "colType": "STT" },
				{
					"keycol": "displayText",
					"keyname": "{{system17}}",
					"colType": "link",
					"template": "<a class='nav-link p-0' style='line-height: 15px display: inline-flex !important'>"
				},
				{ "keycol": "url", "keyname": "{{system18}}", "colType": "string" },
				{ "keycol": "functionalClassification", "keyname": "{{system19}}", "colType": "string" },
				{ "keycol": "Language", "keyname": "{{system20}}", "colType": "string" },
				{ "keycol": "Status", "keyname": "{{system21}}", "colType": "string" },
				{
					"keycol": "action", 'colType': "idx", "keyname": "{{system22}}", "template": "<a data-ng-click='updateDataSystem({})' style='cursor:pointer'>" +
						"<i class='fas fa-edit' style='color: #28a745'></i></a> " +
						" <a data-ng-click='deleteTableSystem({})' style='cursor:pointer'>" +
						"<i class='fas fa-trash-alt' style='color: #28a745'></i></a>"
				}
			]
			var treeall = [];
			if (listmenu.length == 0) {
				$scope.message = dbMultiLang[25].displayText
				var table = GridService.buildGridnon(columnInfo, treeall)
				var tablehtml = $("#myGridTable").html("").html(table);
				$compile(tablehtml)($scope);
			} else {
				for (x in listmenu) {
					if (listmenu[x].parentId == $scope.selectParentFunction ) {
						listmenu[x]["level"] = "0"
						treeall.push(listmenu[x])
						for (y in listmenu) {
							if (listmenu[y].parentId == listmenu[x].id) {
								listmenu[y]["level"] = "1"
								treeall.push(listmenu[y])
								for (z in listmenu) {
									if (listmenu[z].parentId == listmenu[y].id) {
										listmenu[z]["level"] = "2"
										treeall.push(listmenu[z])
										for (v in listmenu) {
											if (listmenu[v].parentId == listmenu[z].id) {
												listmenu[v]["level"] = "3"
												treeall.push(listmenu[v])
											}

										}
									}
								}
							}
						}
					}
					/*else {
						for (y in listmenu) {
							if (listmenu[y].parentId == $scope.selectParentFunction) {
								listmenu[y]["level"] = "1"
								treeall.push(listmenu[y])
								for (z in listmenu) {
									if (listmenu[z].parentId == listmenu[y].id) {
										listmenu[z]["level"] = "2"
										treeall.push(listmenu[z])
										for (v in listmenu) {
											if (listmenu[v].parentId == listmenu[z].id) {
												listmenu[v]["level"] = "3"
												treeall.push(listmenu[v])
											}

										}
									}
								}
							}
						}
					}*/
				}

				$scope.isActivePagi = function(pagi) {
					return pagi === response.data.page.pageIdx + "";
				}
				//khai báo lấy dữ liệu từ database ra gắn vô bảng vủa tạo
				var table = GridService.buildGridTable(columnInfo, treeall)
				var tablehtml = $("#myGridTable").html("").html(table);
				$compile(tablehtml)($scope);
				// xét giá trị checkbox = false
				for (var row = 1; row <= response.data.list.length; row++) {
					$scope["checkboxRole" + row] = false;
					response.data.list[row - 1]["isCheck"] = false;
				}
				dataGridListSystem = treeall; //dataGridListRole được khai báo toàn cục ở trên
				dataGridPagi = response.data.page.pageCount;
				dataGridPagi1 = response.data.page.pageIdx;
				for (i in dataGridListSystem) {
					$scope["row" + dataGridListSystem[i].id] = true;
					$scope["icon" + dataGridListSystem[i].id] = "fa-angle-right"
				}
				$scope.menutable = function(id) {
					//		console.log(id)
					if ($scope["icon" + id] == "fa-angle-right") {
						$scope["icon" + id] = "fa-angle-down"
						for (x in dataGridListSystem) {
							if (dataGridListSystem[x].parentId == id) {
								$scope["row" + dataGridListSystem[x].id] = "";
								for (y in dataGridListSystem) {
									if (dataGridListSystem[y].parentId == dataGridListSystem[x].id) {
										$scope["row" + dataGridListSystem[y].id] = "";
										for (z in dataGridListSystem) {
											if (dataGridListSystem[z].parentId == dataGridListSystem[y].id) {
												$scope["row" + dataGridListSystem[z].id] = "";

											}
										}
									}
								}
							}
						}
					} else if ($scope["icon" + id] == "fa-angle-down") {
						$scope["icon" + id] = "fa-angle-right"
						for (x in dataGridListSystem) {
							if (dataGridListSystem[x].parentId == id)
								$scope["row" + dataGridListSystem[x].id] = true;
							for (y in dataGridListSystem) {
								if (dataGridListSystem[y].parentId == dataGridListSystem[x].id) {
									$scope["row" + dataGridListSystem[y].id] = true
									for (z in dataGridListSystem) {
										if (dataGridListSystem[z].parentId == dataGridListSystem[y].id) {
											$scope["row" + dataGridListSystem[z].id] = true
										}
									}
								}
							}
						}
					}
				}
			}

		}, "POST");
	}
	//////Đoạn này làm cho phần checkbox ở bảng
	var storeCheckedRow = {}; // khai báo 1 cái object rỗng để sử dụng
	//khai báo function cho nút checkbox all
	$scope.checkboxRoleAll = function() {
		storeCheckedRow = {};
		if ($scope.ischeckRoleAll == true) {
			for (var row = 1; row <= dataGridListSystem.length; row++) {
				$scope["checkboxRole" + row] = true;
				dataGridListSystem[row - 1]["isCheck"] = true;
				storeCheckedRow[row - 1] = true;
			}
		} else {
			for (var row = 1; row <= dataGridListSystem.length; row++) {
				$scope["checkboxRole" + row] = false;
				dataGridListSystem[row - 1]["isCheck"] = false;
			}
		}
		fnUpdCheckAll();
	}
	// khai báo function cho nút checkbox alone
	$scope.clickRole = function(id) {
		console.log(id)
		dataGridListSystem[id - 1]["isCheck"] = $scope["checkboxRole" + id];
		if ($scope["checkboxRole" + id]) {
			$scope["checkboxRole" + id] = true
			storeCheckedRow[id - 1] = true;
			//khi click thằng cha thì con check
			for (x in dataGridListSystem) {
				if (dataGridListSystem[x].parentId == dataGridListSystem[id - 1].id) {
					$scope["checkboxRole" + (parseInt(x) + 1)] = true;
					dataGridListSystem[x]["isCheck"] = true;
					for (y in dataGridListSystem) {
						if (dataGridListSystem[y].parentId == dataGridListSystem[x].id) {
							$scope["checkboxRole" + (parseInt(y) + 1)] = true;
							dataGridListSystem[y]["isCheck"] = true;
							for (z in dataGridListSystem) {
								if (dataGridListSystem[z].parentId == dataGridListSystem[y].id) {
									$scope["checkboxRole" + (parseInt(z) + 1)] = true;
									dataGridListSystem[z]["isCheck"] = true;
								}
							}
						}
					}
				}
			}
			//khi click thằng con thì con cha
			/*for (x in dataGridListSystem) {
				if (dataGridListSystem[x].id == dataGridListSystem[id - 1].parentId) {
					$scope["checkboxRole" + (parseInt(x) + 1)] = true;
					dataGridListSystem[x]["isCheck"] = true;
					for (y in dataGridListSystem) {
						if (dataGridListSystem[y].id == dataGridListSystem[x].parentId) {
							$scope["checkboxRole" + (parseInt(y) + 1)] = true;
							dataGridListSystem[y]["isCheck"] = true;
							for (z in dataGridListSystem) {
								if (dataGridListSystem[z].id == dataGridListSystem[y].parentId) {
									$scope["checkboxRole" + (parseInt(z) + 1)] = true;
									dataGridListSystem[z]["isCheck"] = true;
								}
							}
						}
					}
				}
			}*/
		} else { //khi bỏ click cha thì con bỏ check
			delete storeCheckedRow[id - 1];
			for (x in dataGridListSystem) {
				if (dataGridListSystem[x].parentId == dataGridListSystem[id - 1].id) {
					$scope["checkboxRole" + (parseInt(x) + 1)] = "";
					dataGridListSystem[x]["isCheck"] = false;
					for (y in dataGridListSystem) {
						if (dataGridListSystem[y].parentId == dataGridListSystem[x].id) {
							$scope["checkboxRole" + (parseInt(y) + 1)] = "";
							dataGridListSystem[y]["isCheck"] = false;
							for (z in dataGridListSystem) {
								if (dataGridListSystem[z].parentId == dataGridListSystem[y].id) {
									$scope["checkboxRole" + (parseInt(z) + 1)] = "";
									dataGridListSystem[z]["isCheck"] = false;

								}
							}
						}
					}
				}
			}
		}
		//console.log(storeCheckedRow);
		fnUpdCheckAll();
	}
	//viết function fnUpdCheckAll để đưa lên 2 cái check ở trên
	function fnUpdCheckAll() {
		var objectKey = Object.keys(storeCheckedRow);
		if (objectKey.length == dataGridListSystem.length) {
			$scope.ischeckRoleAll = true;
		} else {
			$scope.ischeckRoleAll = false;
		}
	}
	//////kết thúc.
	//viết fn cho nút lọc/tim kiếm
	$scope.searchFilter = function() {
		$scope.messagelang ="";
		if($scope.selectLanguageSystem ==""){
			$scope.messagelang =dbMultiLang[26].displayText;
		}else
		//	console.log($scope.selectParentFunction)
		loadDataTable(dataAgain());
	}
	//viết fn clear form system
	function clearForm() {
		$scope.messagelang = ""
		$scope.codeFunction = ""
		$scope.nameFunction = ""
		$scope.urlFunction = ""
		$scope.selectStatus = 1 + "";
		$scope.selectLanguageSystem = fnGetClientInfo().langCode
		$scope.limitValue = "5"
		$scope.selectParentFunction = -1 + "";
		$scope.selectFunctionalClassification = -1 + "";

	}
	//viết fn cho nút xóa from
	$scope.resetFilter = function() {
		clearForm();
		loadDataTable(dataAgain());
	}
	//nút thêm mới trang System
	$scope.btnAddNewSystem = function() {
		var titlemodal = "Thêm mới thông tin chức năng"
		ModalService.ShowModal(url, "ModalAddNewCtrl", titlemodal, "", callBack)
	}
	//viết fn để chuyển useFlag từ 1 qua 0 và lấy list ID để truyền xuống nút xóa cạnh nút thêm mới
	function ListSystemChecked() {
		for (var row = 1; row <= dataGridListSystem.length; row++) {
			if (dataGridListSystem[row - 1].isCheck == true) {
				dataGridListSystem[row - 1].useFlag = 2;
				idListSystem.push(dataGridListSystem[row - 1])
			}
		}
		return idListSystem;
	}
	//nút xóa bên cạnh nút thêm mới
	$scope.deleteList = function() {
		console.log(dataGridListSystem);
		if (ListSystemChecked().length == 0) {
			ModalService.alert({ "modalTitle": "Warning", "messenge": "Bạn chưa chọn dữ liệu để xóa" }, function() { }, function() { })
		} else {
			var datarequest = {
				"dtoList": idListSystem //List ID
			}
			WebService.call($http, "system/sys07", datarequest, function(response) {
				ModalService.alert({ "modalTitle": "Success", "messenge": "Bạn đã xóa thành công" }, function() { }, function() { })
				callBack();
			}, "POST");
		}
	}

	//nút edit trên table
	$scope.updateDataSystem = function(STT) {
		//console.log(STT);
		var para = dataGridListSystem[STT - 1];
		console.log(para.id.id);
		var titlemodal = "Chỉnh sửa thông tin chức năng"
		ModalService.ShowModal(url, "ModalEditSystemCtrl", titlemodal, para, callBack)
	}
	//nút xóa trên table cạnh nút edit
	$scope.deleteTableSystem = function(STT) {
		var para = dataGridListSystem[STT - 1];
		//viết fn để truyền xuống modal thực hiện(yesF)
		function deleteTable() {
			var datarequest = {
				"client": {
					"langCode": para.langCode
				},
				"dto": {
					"id": para.id,
					"code": para.code,
					"url": para.url,
					"funcTypeId": para.funcTypeId,
					"parentId": para.parentId,
					"useFlag": 2,
					"displayText": para.displayText,
				}
			}
			WebService.call($http, "system/sys05", datarequest, function(response) {
				if (response.data.isDone == true) {// nếu có ô bắt buộc chưa nhập thì báo lỗi không thì chạy tiếp
					ModalService.alert({ "modalTitle": "Success", "messenge": "Bạn đã xóa thành công" }, function() { }, function() { })
					callBack();
				} else {
					ModalService.alert({ "modalTitle": "Error", "messenge": "Bạn đã xóa thất bại" }, function() { }, function() { })
				}
			}, "POST");
		}
		ModalService.alert({ "modalTitle": "Question", "messenge": "Bạn có muốn xóa không" }, deleteTable, function() { console.log("no") })
	}
	// khai báo function để callback lại dữ liệu
	function callBack() {
		loadDataTable(dataAgain());
	}
	// gọi API thể hiện Đa ngôn ngữ trên màn hình
	loadMultiLang();
	function loadMultiLang() {
		var dataMultiLang = {
			"client": {
				"langCode": fnGetClientInfo().langCode
			},
			"dummySearch": {
				"screensId": 5
			}
		}
		WebService.call($http, "screensitem/screensitem03", dataMultiLang, function(response) {
			var db = response.data.list;
			dbMultiLang = db;
			$rootScope.titlePage = db[0].displayText;
			$scope.selectlanguage = db[24].displayText;
			$scope.selectClassificationoffunctions = db[23].displayText;
			$scope.selectParentfunction = db[22].displayText;

			for (x in db) {
				$scope[db[x].code] = db[x].displayText
				//console.log(db[x].code)
			}
		}, "POST");
	}
});