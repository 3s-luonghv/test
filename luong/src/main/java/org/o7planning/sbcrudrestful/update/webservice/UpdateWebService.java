package org.o7planning.sbcrudrestful.update.webservice;

import org.o7planning.sbcrudrestful.update.dto.UpdateRequest;
import org.o7planning.sbcrudrestful.update.dto.UpdateResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;



@RequestMapping("/demo")
@RestController("Update")
public class UpdateWebService  {

	@Qualifier("procUpdate")
	@Autowired
	//IProcessor proc = null;

	@RequestMapping(value = "procUpdate", consumes = "application/json;charset=UTF-8", produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public UpdateResponse process(@RequestBody UpdateRequest request) {
		return (UpdateResponse) process(request);
	}

}