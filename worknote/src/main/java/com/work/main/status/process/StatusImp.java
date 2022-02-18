package com.work.main.status.process;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.work.main.Entity.Status;
import com.work.main.common.base.BaseResponse;
import com.work.main.status.dto.StatusRequest;
import com.work.main.status.dto.StatusResponse;

@Service
public class StatusImp implements StatusService {


	@Autowired
	public IRepoStatus repo;
	

	@Override
	public void save(StatusRequest req) {
	
		Status entity = new Status();
		System.out.println(req.getName());
		entity.setName(req.getName());
		repo.save(entity);
	
	}

	
	@Override
	public BaseResponse getAll() {
		List<Status> list = repo.findAll();
		BaseResponse cmRep = new BaseResponse();
		if (list.isEmpty()) {
			cmRep.setError("ko ton tai");
			return cmRep;
		}
		List<StatusResponse> rep = list.stream().map(StatusResponse::new).collect(Collectors.toList());
		cmRep.setContent(rep);
		return cmRep;
	}

	@Override
	public BaseResponse getByID(StatusRequest req) {
		// TODO Auto-generated method stub
		Optional<Status> list = repo.findById(req.getStatusID());
		BaseResponse cmRep = new BaseResponse();
		if (list.isPresent()==false) {
			cmRep.setError("ko ton tai");
			return cmRep;
		}
		StatusResponse rep = new StatusResponse();
		rep.setStatusID(list.get().getStatusID());
		rep.setName(list.get().getName());
		cmRep.setContent(rep);
		return cmRep;
	}

	@Override
	public BaseResponse update(StatusRequest req) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public BaseResponse delete(StatusRequest req) {
		// TODO Auto-generated method stub
		return null;
	}

}
