app.controller('ModalEditSystemCtrl', function($http, $scope,$uibModal, TitleparentParameter, parentParameter, WebService, $uibModalInstance, ValidateUltility, ModalService) {
	$scope.titleModal = TitleparentParameter;
	$scope.selectStatus = 1 + ""; // mặc định ô select là sử dụng
	$scope.selectLanguageSystem = fnGetClientInfo().langCode //mặc định ô select Lang là lang
	$scope.selectParentFunction = "" // "" này là code của chức năng cha(--chọn chức năng cha--)
	
//	console.log(parentParameter)
	
//-------------------------//
	fnInit();
	function fnInit(){
	//chạy fn để load các Dropdown
	getDataDropLang(dataRequestDropSystem());
	getDataDropSTT(dataRequestDropSystem());
	getDataDropParentFunction(dataRequestDropSystem());
	getDataDropFunctionalClassification(dataRequestDropSystem());
	}
	//khai báo request dùng cho các drop
	function dataRequestDropSystem(){
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
					if (dataDropLang[x].displayText) {
					languageSystem.push(dataDropLang[x])
				}
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
		//	console.log(response);
			var statusSystem = new Array();
			var dataDropSTT = response.data.list;
			if (dataDropSTT == 0) {
				console.log("Không có dữ liệu");
			} else {
				for (x in dataDropSTT) {
					if (dataDropSTT[x].displayText) {
						statusSystem.push(dataDropSTT[x])
					}
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
			//console.log(dataDropSystem);
			if (dataDropSystem == 0) {
				console.log("Không có dữ liệu");
			} else {
				for (x in dataDropSystem) {
					if (dataDropSystem[x].funcTypeId == 1) {
						parentFunction.push(dataDropSystem[x])
					}
				}
				//gắn data vô drop
				$scope.parentFunctionList = parentFunction
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
	
	getDataTable(parentParameter.langCode)// chạy fn và truyền parentParameter.langCode(parentParameter là para truyền từ nút edit)
	//viết function để đưa dữ liệu từ bảng vào modal để update
	function getDataTable(lang){
		var datarequest = {
			"client": {
					"langCode": fnGetClientInfo().langCode //lang này là lấy từ ngoài vào (đây là tên tự đặt) = parentParameter.langCode
				},
				"dummySearch" :{
					"id" : parentParameter.id
				}
				
		}	
		WebService.call($http, "system/sys03", datarequest, function(response){
			var dataTable = response.data.list
		//	console.log(dataTable);
			$scope.selectFunctionalClassification = dataTable[0].funcTypeId + "";
			$scope.selectParentFunction = dataTable[0].parentId + "";
			$scope.codeSystem = dataTable[0].code;
			$scope.url = dataTable[0].url;
			$scope.selectStatus = dataTable[0].useFlag + "";
			$scope.selectLanguageSystem = dataTable[0].langCode;
			$scope.nameSystem = dataTable[0].displayText;
		}, "POST");
	}
	//viết fn tạo request dùng chung để lưu dữ liệu
	console.log(parentParameter.id);
	function editRequest(){
		var datarequest = {
			"client" : {
				"langCode" : $scope.selectLanguageSystem
			},
			"dto" : {
				"id" : parentParameter.id,
				"code" : $scope.codeSystem,
				"url" : $scope.url,
				"funcTypeId" : $scope.selectFunctionalClassification,
				"parentId" : $scope.selectParentFunction,
				"useFlag" : $scope.selectStatus,
				"displayText" : $scope.nameSystem
			}
		}
		return 	datarequest;
	}
	//viết fn gọi WS để save và tiếp
	function saveAndContinue(datarequest){
		WebService.call($http, "system/sys05", datarequest, function(response){
			if(response.data.isDone == true){// nếu có ô bắt buộc chưa nhập thì báo lỗi không thì chạy tiếp
				ModalService.alert({"modalTitle":"Success","messenge":"Bạn đã sửa thành công"}, function(){}, function(){})
				parentParameter.id = response.data.dto.id
			} else {
				ModalService.alert({"modalTitle":"Error","messenge":"Bạn đã sửa thất bại"}, function(){}, function(){})
			}
		}, "POST");
	}
	//viết fn cho nút lưu và tiếp
	$scope.clickSaveContinue = function (){
		fnClearMessage();//dùng để clear message rồi thực hiện tiếp
		if(fnValidateModal() == true){
			return
		} else {
			saveAndContinue(editRequest());
			clearContinue();
		}
	}
	//viết fn khi lưu xong thì clear để tiếp
	function clearContinue(){
		$scope.nameSystem = "";
	}
	//viết fn gọi WS để save và thêm
	function saveAndAdd(datarequest){
		WebService.call($http, "system/sys05", datarequest, function(response){
			if (response.data.isDone == true){
				ModalService.alert({"modalTitle":"Success","messenge":"Bạn đã sửa thành công"}, function(){}, function(){})
			} else {
				ModalService.alert({"modalTitle":"Error","messenge":"Bạn đã sửa thất bại"}, function(){}, function(){})
			}
		}, "POST");
	}
	//viết fn cho nút lưu và thêm
	$scope.clickSaveAdd = function(){	
		fnClearMessage();//dùng để clear message rồi thực hiện tiếp
		if(fnValidateModal() == true){// nếu có ô bắt buộc chưa nhập thì báo lỗi không thì chạy tiếp
			return
		} else {
			saveAndAdd(editRequest())
			clearAdd();
		}
	}
	//viết fn khi lưu xong thì clear để thêm
	function clearAdd(){
		parentParameter.id = 0
		$scope.selectParentFunction = "";
		$scope.codeSystem ="";
		$scope.url ="";
		$scope.css = "";
		$scope.nameSystem = "";
	}
	//viết fn gọi WS để save và đóng
	function saveAndClose(datarequest){
		WebService.call($http, "system/sys05", datarequest, function(response){
			if (response.data.isDone == true ){
				ModalService.alert({"modalTitle":"Success","messenge":"Bạn đã sửa thành công"}, function(){}, function(){})
				$uibModalInstance.close(response);
			} else {
				ModalService.alert({"modalTitle":"Error","messenge":"Bạn đã sửa thất bại"}, function(){}, function(){})
			}
		}, "POST");
	}
	//viết fn cho nút lưu và đóng
	$scope.clickSaveClose = function(){
		fnClearMessage();//dùng để clear message rồi thực hiện tiếp
		if(fnValidateModal() == true){// nếu có ô bắt buộc chưa nhập thì báo lỗi không thì chạy tiếp
			return
		} else {
			saveAndClose(editRequest());
		}	
	}
	//viết fn cho nút đóng modal
	$scope.exit = function(){
		if(fnCloseButton() == true) {
			function out(){
				$uibModalInstance.close();
			}
			ModalService.alert({"modalTitle":"Question","messenge":"Bạn có muốn thoát không"}, out , function(){console.log("no")})
		} else {
			$uibModalInstance.close();
		}			
	}
	//viết fn change Lang thì change luôn nội dung
	$scope.fnChangeLang = function(){
		  	getDataTable($scope.selectLanguageSystem)// chạy fn và truyền ngôn ngữ tại select ngôn ngữ	
	}
	function fnCloseButton(){
		var hasError = false;
		if (!ValidateUltility.checkEmpty($scope.codeSystem) 
			|| !ValidateUltility.checkEmpty($scope.url)
			|| !ValidateUltility.checkEmpty($scope.nameSystem)) {
			hasError = true;
		} 
		return hasError;
	}
	// viết function để bắt lỗi validate
	function fnValidateModal() {
		var hasError = false;
		if (ValidateUltility.checkEmpty($scope.selectFunctionalClassification)) {
			$scope.plcnMessage = "Chưa nhập dữ liệu. Vui lòng nhập dữ liệu.";
			hasError = true;
		} 
		if (ValidateUltility.checkEmpty($scope.codeSystem)) {
			$scope.codeSystemMessage = "Chưa nhập dữ liệu. Vui lòng nhập dữ liệu.";
			hasError = true;
		}
		if (ValidateUltility.checkEmpty($scope.url)){
			$scope.urlMessage = "Chưa nhập dữ liệu. Vui lòng nhập dữ liệu.";
			hasError = true;
		}
		if (ValidateUltility.checkEmpty($scope.selectStatus)){
			$scope.sttMessage = "Chưa nhập dữ liệu. Vui lòng nhập dữ liệu.";
			hasError = true;
		}
		if (ValidateUltility.checkEmpty($scope.selectLanguageSystem)){
			$scope.langMessage = "Chưa nhập dữ liệu. Vui lòng nhập dữ liệu.";
			hasError = true;
		}
		if (ValidateUltility.checkEmpty($scope.nameSystem)){
			$scope.nameSystemMessage = "Chưa nhập dữ liệu. Vui lòng nhập dữ liệu.";
			hasError = true;
		}
		return hasError;
	}
	// viết function để clear các dòng lỗi
	function fnClearMessage() {
		$scope.plcnMessage = "";
		$scope.codeSystemMessage = "";
		$scope.urlMessage = "";
		$scope.sttMessage = "";
		$scope.langMessage = "";
		$scope.nameSystemMessage = "";
	}
	// gọi API thể hiện Đa ngôn ngữ trên màn hình
	loadMultiLang();
	function loadMultiLang() {
		var dataMultiLang = {
			"client": {
				"langCode": fnGetClientInfo().langCode
			},
			"dummySearch": {
				"screensId": 10
			}
		}
		WebService.call($http, "screensitem/screensitem03", dataMultiLang, function(response) {
			
			var db = response.data.list;
			console.log(db)
			$scope.modalsystemtitle = db[13].displayText
			for (x in db) {
				$scope[db[x].code] = db[x].displayText
				//console.log(db[x].code)
			}
		}, "POST");
	}
});