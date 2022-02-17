
app.service('ValidateUltility', function () {
    this.checkEmpty = function (strParam) {
		if(strParam == undefined || strParam == null || strParam == ""){
			return true; 
		}
		return false;
	}
	this.checkminusNum = function (strParam){
		if(strParam < 0 ){
			return true;
		}
		return false;
	}
    this.checkNumber = function (strParam) {
	var regex = /([0-9]*[.])?[0-9]+/;
		if(!strParam.match(regex)){
			return true; 
		}
		return false;
	}
	this.checkSpecial = function (strParam) {
	var regex = /[ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ|_\n#\s$&:\n\t^*(),.":{}|<>]/;
		if(strParam.match(regex)){
			return true; 
		}
		return false;
	}
	this.checkString = function (strParam) {
	var regex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
		if(!strParam.match(regex)){
			return true; 
		}
		return false;
	}
	
	 this.checkEmail = function (strParam) {
		var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

		if(!strParam.match(mailformat)){
			return true; 
		}
		return false;
	}
	this.checkLength = function (strParam){
		var maxlength = 32;
		var minlength = 8;
		if(strParam.length > maxlength || strParam.length < minlength ){
			return true;
		}
		return false;
	}		
}); 