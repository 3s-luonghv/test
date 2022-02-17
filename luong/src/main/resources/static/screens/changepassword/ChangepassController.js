app.controller('ChangepassCtrl', function($scope, $rootScope, $location,$http,WebService,ValidateUltility,ModalService) {
	$rootScope.showAside = ""
	$rootScope.showNav = true;
	$rootScope.showHead = true;
	$scope.passwordNew = "password";
	$scope.passwordConfirm = "password";
	var x = true;
	var y = true;
	//show/hide password

	$scope.showPass1 = function (){
		
		if(x){
			$scope.passwordNew="text";
			x = false;
		}else{
			$scope.passwordNew="password";
			x = true;
		}
		
	}	
	
	$scope.showPass2 = function (){
	
		if(y){
			$scope.passwordConfirm = "text";
			y = false;
		}else{
			$scope.passwordConfirm="password";
			y = true;
		}
	}
	//end
	
	//fn get API đa ngôn ngữ
	fnGetLangScreensLabel ();
	function fnGetLangScreensLabel (){
			var request = {"client":{"langCode":fnGetClientInfo().langCode},
						   "dummySearch":{"screensId":7}}
			WebService.call($http,"screensitem/screensitem03",request,function(response){
				$rootScope.titlePage = response.data.list[0].displayText;
				for (i = 1; i < response.data.list.length; i ++ ){
					$scope["StringInfo"+i]=response.data.list[i].displayText;
				}
				
			},"POST");
	}
	//end - fnGetLangScreensLabel

	/**
		Tạo request get API search User
		param: user : userName, pass : password,email
	 */
	function fnCreateRequest (user,email,pass){
		var request = {"dummySearch":{
										"userName":user,
										"email":email,
										"password":pass
										}
						}
		return request;
	}
	//end - fnCreateRequest
	
	//fn check username + pass có tồn tại trong DB trước khi đổi mật khẩu
	function fnGetdataUser(request){
		WebService.call($http,"useraccount/useraccount002",request,function(response){
			var data = response.data.list[0];				
			if(response.data.list.length == 1){
				if ($scope.PasswordNew == $scope.ConfirmpasswordNew) {
					if($scope.PasswordNew == $scope.passwordOld){
						ModalService.alert({"modalTitle": "Warning","messenge": "Mật khẩu mới trùng với mật khẩu hiện tại"}, function() {console.log("yes")}, function() {console.log("no")});
					}else{
						fnUpdPass(data);
					}
					
				}else {
					ModalService.alert({"modalTitle": "Warning","messenge": "Nhập mật khẩu xác nhận không khớp"}, function() {console.log("yes")}, function() {console.log("no")});
				}
			}else{
				ModalService.alert({"modalTitle":"Error","messenge":"Tên đăng nhập hoặc mật khẩu không chính xác"},function(){},function(){})
			}
		},"POST")
	}
	//end - fnGetdataUser2
	
	//Fn thực hiện update password cho user
	function fnUpdPass(data){
		var requestupdatepass = {
									    "dto": {
									        "companyId": data.companyId,
									        "emailId": data.emailId,
									        "userName": data.userName,
									        "password": $scope.PasswordNew,
									        "isVerified": data.isVerified,
									        "verifiedTime":data.verifiedTime,
									        "verifinedBy": data.verifinedBy,
									        "useFlag": data.useFlag,
									        "token": data.token,
									        "curentState": data.curentState,
									        "lastState": data.lastState,
									        "id": data.id
									    	   }
											}
										
		WebService.call($http, "useraccount/useraccount004", requestupdatepass, function(response){
			if(response.data.isDone == true) {
				$scope.CurrentUser = "";
				$scope.passwordOld = "";
				$scope.PasswordNew = "";
				$scope.ConfirmpasswordNew = "";
				ModalService.alert({"modalTitle":"Success","messenge": "Thay đổi mật khẩu thành công"}, function(){ console.log("yes")},function(){console.log("no")})
			}
		}, "POST");
	}
	//end - fnChangePass
	$scope.Created = function() {
		 fnClearMessage ();
		 if(fnValidateForm2() == true){
			return;
		}else {		
				if (ValidateUltility.checkEmail($scope.CurrentUser)){
				
					fnGetdataUser(fnCreateRequest ($scope.CurrentUser,"",$scope.passwordOld));
				}else {
					fnGetdataUser(fnCreateRequest ("",$scope.CurrentUser,$scope.passwordOld));
				}
				
			}
	}
	
//clear thông báo khi validate
	function fnClearMessage (){
		$scope.messageUser = "";
		$scope.messagepasswordOld="";		
		$scope.messagePasswordNew="";
		$scope.messageConfirmpasswordNew="";
	}
	//end-fnClearMessage
	
	//validate username, password
	
	function fnValidateForm2(){
		var hasError = false;
		if(ValidateUltility.checkEmpty($scope.CurrentUser)) {
			$scope.messageUser = "Vui lòng nhập tên hoặc email";
				hasError = true;
		}
		
		if(ValidateUltility.checkEmpty($scope.passwordOld)) {
			$scope.messagepasswordOld = "Vui lòng nhập mật khẩu";
				hasError = true;
		}
		
		if(ValidateUltility.checkEmpty($scope.PasswordNew)) {
			$scope.messagePasswordNew = "Vui lòng nhập mật khẩu mới";
				hasError = true;
		}else if(ValidateUltility.checkLength($scope.PasswordNew)){
			$scope.messagePasswordNew = "Vui lòng nhập mật khẩu từ 8 - 32 ký tự";
				hasError = true;
		}else if(ValidateUltility.checkSpecial($scope.PasswordNew)){
			$scope.messagePasswordNew = "Mật khẩu không chứa ký đặc biệt";
				hasError = true;
		}
		
		if(ValidateUltility.checkEmpty($scope.ConfirmpasswordNew)) {
			$scope.messageConfirmpasswordNew = "Vui lòng nhập lại mật khẩu mới";
				hasError = true;
		}else if(ValidateUltility.checkLength($scope.ConfirmpasswordNew)){
			$scope.messageConfirmpasswordNew = "Vui lòng nhập mật khẩu từ 8 - 32 ký tự";
				hasError = true;
		}
			return hasError;
	}
	//end-fnValidateForm
});