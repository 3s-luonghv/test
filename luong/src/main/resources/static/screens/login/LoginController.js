app.controller('LoginCtrl', function($scope, $rootScope, $location,$cookies,$http,WebService,ValidateUltility,ModalService) {
	$rootScope.showAside = "ml-0"
	$rootScope.showNav = false;
	$rootScope.showHead = false;
	$rootScope.titlePage = "LOGIN";
	
	//get dữ liệu từ bảng laguague trong DB lên dropdown ngôn ngữ
	fnGetLanguage();
	function fnGetLanguage(){
		var request = {"client":{"langCode":""}}
		WebService.call($http,"lang/lang001",request,function(response){
			$scope.langData = response.data.list;
			$scope.dropDownLang = "vi";
		},"POST")
	}
	//end - fnGetLanguage
	
	//Xử lí check user + pass nếu tồn tại thì login =true
	$scope.Login = function() {
		 fnClearMessage ();
		 if(fnValidateForm() == true){
			return;
		}
			
		else {	if(ValidateUltility.checkEmail($scope.User)){//check tên đăng nhập hoặc email tồn tại trong DB
					fnGetdataUser(fnCreateRequest ($scope.User,"",$scope.Password));
				}else{
					fnGetdataUser(fnCreateRequest ("",$scope.User,$scope.Password));
				}
				
			}
	}
	//end - Login
	
	/**
		Tạo request get API search User
		param: user : userName, pass : password,email
	 */
	function fnCreateRequest (user,email,pass){
		var request = {"dummySearch":{
										"userName":user,
										"email":email,
										"password":pass,
										"useFlag":1
										}
						}
		return request;
	}
	//end - fnCreateRequest
	
	//Get data để check username, password đăng nhập có tồn tại không
	function fnGetdataUser(request){
		WebService.call($http,"useraccount/useraccount002",request,function(response){			
			if(response.data.list.length == 1){
				var data = {"userId":response.data.list[0].id,
							"langCode":$scope.dropDownLang,
							"companyId":response.data.list[0].companyId};
					$rootScope.logintrue = true;
					$location.path('/General');		
					$rootScope.build = function() {
						$rootScope.$broadcast('buildMenu', data);
					}
					$rootScope.build();
			}else{
				ModalService.alert({"modalTitle":"Error","messenge":"Tên đăng nhập hoặc mật khẩu không chính xác"},function(){},function(){})
			}
		},"POST")
	}
	//end-fnGetdataUser
	
	//clear thông báo khi validate
	function fnClearMessage () {
		$scope.userMessage = "";
		$scope.passMessage = "";
		
	}
	//end-fnClearMessage
	
	//validate username, password
	function fnValidateForm () {
		var hasError = false;
		
		if(ValidateUltility.checkEmpty($scope.User)) {
			$scope.userMessage = "Vui lòng nhập tên hoặc email";
				hasError = true;
		} 
		
		if(ValidateUltility.checkEmpty($scope.Password)) {
			$scope.passMessage = "Vui lòng nhập mật khẩu";
				hasError = true;
		}
		
		return hasError;
	}
	
	//end-fnValidateForm
	
	
});