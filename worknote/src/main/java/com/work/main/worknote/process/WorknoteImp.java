package com.work.main.worknote.process;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.work.main.Entity.Status;
import com.work.main.Entity.Worknote;
import com.work.main.common.base.BaseResponse;
import com.work.main.status.process.IRepoStatus;
import com.work.main.worknote.dto.WorknoteRequest;
import com.work.main.worknote.dto.WorknoteResponse;



@Service
public class WorknoteImp  implements WorknoteService{
	@Autowired
	IRepoWorknote repo;
	@Autowired
	public IRepoStatus repoStatus;
	@Override
	public void save(WorknoteRequest req) {
		// TODO Auto-generated method stub
		BaseResponse cmRep = new BaseResponse();
		Status status = new Status();
		repoStatus.findById(req.getStatusID());
		Optional<Status> list = repoStatus.findById(req.getStatusID());
		status.setStatusID(list.get().getStatusID());
		status.setName(list.get().getName());
		Worknote worknote = new Worknote();
		worknote.setName(req.getName());
		worknote.setStartDate(req.getStartDate());
		worknote.setEndDate(req.getEndDate());
		worknote.setStatus(status);
		repo.save(worknote);
		
	}

	@Override
	public BaseResponse getAll() {
		// TODO Auto-generated method stub
		BaseResponse cmRep = new BaseResponse();
		WorknoteProcess process = new WorknoteProcess();
		
		List<Worknote> list = repo.findAll();
		if(list.isEmpty())
		{
			cmRep.setError("khong ton tai");
			return cmRep;
		}
		
		List<WorknoteResponse> rep = list.stream().map(WorknoteResponse::new).collect(Collectors.toList());
	//	List<WorknoteResponse> rep = process.setDataQuery(null, null, null)
		cmRep.setContent(rep);
		return cmRep;
	}
	
	@Override
	public BaseResponse getAllSort( WorknoteRequest req) {
		// TODO Auto-generated method stub
		BaseResponse cmRep = new BaseResponse();
		WorknoteProcess process = new WorknoteProcess();
		
		List<Worknote> list = repo.findAll();
		if(list.isEmpty())
		{
			cmRep.setError("khong ton tai");
			return cmRep;
		}
		 String queryString = process.createQueryString(req);
		 String count = process.createQueryCountString();
		 cmRep=process.setDataQuery(queryString,count, req); 
	//	List<WorknoteResponse> rep = list.stream().map(WorknoteResponse::new).collect(Collectors.toList());
	//	List<WorknoteResponse> rep = process.setDataQuery(null, null, null)
		
		return cmRep;
	}

	@Override
	public BaseResponse getByID(WorknoteRequest req) {
		BaseResponse cmRep = new BaseResponse();
		Optional<Worknote> rep = repo.findById(req.getWorkID());
		if(rep.isPresent()==false)
		{
			cmRep.setError("khong ton tai");
			return cmRep;
		}
		WorknoteResponse resp = new WorknoteResponse();
		resp.setWorkID(rep.get().getWorkID());
		resp.setStartDate(rep.get().getStartDate());
		resp.setEndDate(rep.get().getEndDate());
		resp.setStatusID(rep.get().getStatus().getStatusID());
		resp.setName(rep.get().getName());
		resp.setStatusName(rep.get().getStatus().getName());
		cmRep.setContent(resp);
		return cmRep;
	}

	@Override
	public BaseResponse update(WorknoteRequest req) {
		// TODO Auto-generated method stub
		BaseResponse cmRep = new BaseResponse();
		Optional<Worknote> rep = repo.findById(req.getWorkID());
		if(rep.isPresent()==false)
		{
			cmRep.setError("khong ton tai");
			return cmRep;
		}
		if (req.getWorkID() != null) {
			rep.get().setWorkID(req.getWorkID());
		}
		;
		if (req.getName() != null && req.getName() != "") {
			rep.get().setName(req.getName());
		}
		if (req.getStartDate() != null ) {
			rep.get().setStartDate(req.getStartDate());
		}
		if (req.getEndDate() != null ) {
			rep.get().setEndDate(req.getEndDate());
		}
		if (req.getStatusID() != null ) {
			Optional<Status> status = repoStatus.findById(req.getStatusID());
			rep.get().setStatus(status.get());
			
		}
		repo.save(rep.get());
		cmRep.setContent(rep);
		return cmRep;
	}

	@Override
	public BaseResponse delete(WorknoteRequest req) {
		BaseResponse cmRep = new BaseResponse();
		// TODO Auto-generated method stub
		repo.deleteById(req.getWorkID());
		cmRep.setContent("Delete Success");
		return null;
	}

	

	
}
