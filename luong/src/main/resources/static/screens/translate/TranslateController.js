app.controller('TranslateCtrl', function ($rootScope,$scope,$http,WebService,GridService,$compile,ModalService) {
        $rootScope.showAside = "";
        $rootScope.showNav = true;
        $rootScope.showHead = true;
		$scope.limitValue = 5 ;
		var limitView = "";
//fn get API đa ngôn ngữ
	fnGetLangScreensLabel ();
	function fnGetLangScreensLabel (){
			var request = {"client":{"langCode":fnGetClientInfo().langCode},
						   "dummySearch":{"screensId":8}}
			WebService.call($http,"screensitem/screensitem03",request,function(response){
				$rootScope.titlePage = response.data.list[13].displayText;
				for (i = 0; i < response.data.list.length; i ++ ){
					$scope["translateLabel"+i]=response.data.list[i].displayText;
					$scope.message = response.data.list[12].displayText;
				}
				
			},"POST");
	}
//end - fnGetLangScreensLabel
       
//Get API DB dropdown Màn hình
	fnGetDataScreens();
	function fnGetDataScreens(){
		var request = {"client":{"langCode":fnGetClientInfo().langCode}}
		WebService.call($http,"screens/screens001",request,function(response){
			$scope.dataScreens = response.data.list;
			$scope.dropScreens = $scope.dataScreens[0].id;
		},"POST")
	}
//end - fnGetDataScreens
//get dữ liệu từ bảng laguague trong DB lên dropdown ngôn ngữ
	fnGetLanguage();
	function fnGetLanguage(){
		var request = {"client":{"langCode":""}}
		WebService.call($http,"lang/lang001",request,function(response){
			console.log(response);
			$scope.dataLang = response.data.list;
			$scope.dropLangStart = $scope.dataLang[0].langCode;
			$scope.dropLangEnd = $scope.dataLang[0].langCode;
		},"POST");
	}
//end - fnGetLanguage

//get dữ liệu từ bảng laguague trong DB lên dropdown trạng thái
	fnGetDataStatus();
	function fnGetDataStatus(){
		var request = {"client":{"langCode":fnGetClientInfo().langCode}}
		WebService.call($http,"useflag/usl03",request,function(response){
			$scope.dataStatus = response.data.list;
			$scope.dropStatus = 1+"";
			
		},"POST");
	}
//end - fnGetLanguage

//tạo request get Api build lưới
	function  gridRequest(pageIndex) {
		var request ={
			   "client":{
				    "langCode":$scope.dropLangStart},
				"dummySearch" :{
				      
					  "langCodeTranslate":$scope.dropLangEnd,
					  "screensId": $scope.dropScreens,
					  "useFlag": $scope.dropStatus
				},
				"page":
				{
					"limit": $scope.limitValue,
					"pageIdx": pageIndex
				}
			}
		return request;
	}
//end - gridRequest

//get API getdata build lưới dịch nhãn ngôn ngữ
	var dataGridTransalte = [];
	function fnGetdataGridTranslate(request) {
		WebService.call($http, 'translate/translate002', request, function(response) {
			var columnInfo = [
				{ "keycol": "STT", "keyname": "{{translateLabel7}}", "colType": "STT" },
				{ "keycol": "code", "keyname": "{{translateLabel8}}", "colType": "string" },
				{ "keycol": "displayText", "keyname": "{{translateLabel9}}", "colType": "string" },
				{ "keycol": "displayTextTranslate", "keyname": "{{translateLabel10}}", "colType": "inputTable" },
			]
			if(response.data.list.length == 0){
				var table = GridService.buildGridnon(columnInfo, response.data.list);
				var tableHtml = $("#gridTranslate").html("").html(table);
				$compile(tableHtml)($scope);
				
				 $("#paginationTranslate").html('')
			}else {
				
			var table = GridService.buildGrid(columnInfo, response.data.list,$scope);
			var tableHtml = $("#gridTranslate").html("").html(table);
			$compile(tableHtml)($scope);
			dataGridTransalte = response.data.list;	
			var pagi = GridService.buildpagination(response.data);
			var pagiHtml = $("#paginationTranslate").html(pagi);
			$compile(pagiHtml)($scope);
			}
			$scope.isActivePagi = function(pagi) {

				return pagi === response.data.page.pageIdx;
			}
		}, "POST");
	
	}
//end - fnGetdataGridTranslate

 function listInput(){
	var list = [];
		for (var x = 0; x < dataGridTransalte.length;x++){
			var item = {
				"id":dataGridTransalte[x].id,
				"code":dataGridTransalte[x].code,
				"screensId":dataGridTransalte[x].screensId,
				"companyId":dataGridTransalte[x].companyId,
				"displayText":$scope["dataRow"+x],
				"useFlag":dataGridTransalte[x].useFlag,
			}
			list.push(item)
		}
	return list;
}
//save Translate
	$scope.fnSaveTranslate = function (){
		var requestSave = {
			"client":{
			       "langCode":$scope.dropLangEnd},
			"dtoList":listInput()
		}
		WebService.call($http, 'translate/translate003', requestSave, function(response) {
			console.log(response);
			if(response.data.isDone == true){
				ModalService.alert({"modalTitle":"Success","messenge":"Lưu nhãn thành công"},function(){},function(){})
			}else {
				ModalService.alert({"modalTitle":"Error","messenge":"Lưu nhãn thất bại"},function(){},function(){})
			}
		},"POST");
	}
//end -fnSaveTranslate()
	$scope.pagina = function(page) {	
		fnGetdataGridTranslate(gridRequest(page));			
	}
	
	$scope.changeValuelimit = function ()
	{
		fnGetdataGridTranslate(gridRequest(1));
	}
	$scope.fnSearch = function (){
		fnGetdataGridTranslate(gridRequest(1));
	}
});