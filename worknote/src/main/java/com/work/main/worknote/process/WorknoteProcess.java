package com.work.main.worknote.process;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.Tuple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.work.main.common.base.BaseResponse;
import com.work.main.common.base.ContentResponse;
import com.work.main.status.dto.StatusResponse;
import com.work.main.worknote.dto.WorknoteRequest;
import com.work.main.worknote.dto.WorknoteResponse;


@Component
public class WorknoteProcess {

	@Autowired
	EntityManager em;
	private String from;
	private String where;
	public BaseResponse setDataQuery(String Query, String Count, WorknoteRequest req) {
		BaseResponse cmRep = new BaseResponse();
		Query query = em.createNativeQuery(Query, Tuple.class);
		Query count = em.createNativeQuery(Count);
		Long worknoteID = req.getWorkID();
		Date startDate = req.getStartDate();
		Date endDate = req.getEndDate();
		Long statusID = req.getStatusID();
		
		
		if (req.getStartDate() != null) {
			query.setParameter("startDate", req.getStartDate());
			count.setParameter("startDate", req.getStartDate());
			
		}
		if (req.getEndDate() != null) {
			query.setParameter("startDate", req.getEndDate());
			count.setParameter("startDate", req.getEndDate());
			
		}

		if (req.getStatusID() != null) {
			query.setParameter("statusID", req.getStatusID());
			count.setParameter("statusID",req.getStatusID());
		}
	
	
		int offSet = (req.getPageNum() - 1) * req.getPageSize();
		query.setParameter("offSet", offSet);
		query.setParameter("pageSize", req.getPageSize());

		 int totalElements = ((Number) count.getSingleResult()).intValue();
		List<Tuple> list = query.getResultList();
		List<Object> listRes = new ArrayList();

		for (Tuple tuple : list) {

			WorknoteResponse res = new WorknoteResponse();
			StatusResponse statusRep = new StatusResponse();
			
			res.setWorkID(((BigInteger) tuple.get("WorkID")).longValue());
			res.setStartDate(((Date) tuple.get("startDate")));
			res.setEndDate(((Date) tuple.get("setEndDate")));		
			res.setStatusID(((BigInteger) tuple.get("statusID")).longValue());
			res.setStatusName((String) tuple.get("statusName"));
			listRes.add(res);
		}
		ContentResponse content = new ContentResponse(listRes, req.getPageNum(), req.getPageSize(), totalElements);
		cmRep.setContent(content);
		return cmRep;

	}
	
	public String createQueryString(WorknoteRequest req) {
		StringBuffer select = new StringBuffer(" SELECT ");
		StringBuffer from = new StringBuffer(" FROM WORK AS W ");
		StringBuffer where = new StringBuffer(" WHERE 1 AND ");
		StringBuffer limit = new StringBuffer("LIMIT :offSet, :pageSize");

		select.append(" W.WORK_ID as workID, W.start_date as startDate  ,  W.end_date as endDate , W.status as statusID, ST.name as statusName ");
		
				
		from.append(" left join status  as ST on  W.status = ST.status_id ");

		 
			if (req.getWorkID() != null) {
				where.append(" W.WORK_ID = :workID and ");
			}
			if (req.getStartDate() != null) {
				where.append(" W.startDate = :startDate and  ");
			}

			if (req.getEndDate() != null) {
				where.append(" W.startDate = :startDate and  ");
			}
			if (req.getStatusID() != null) {
				where.append(" W.status = :statusID and  ");
			}

		
		
		where.append(" 1 ");
		this.where = where.toString();
		this.from = from.toString();
		StringBuffer queryString = new StringBuffer();
		queryString.append(select).append(from).append(where).append(limit);
		return queryString.toString();

	}
	
	public String createQueryCountString() {
		StringBuffer queryString = new StringBuffer();
		StringBuffer select = new StringBuffer(" SELECT Count(work_id)");
		StringBuffer from = new StringBuffer();
		StringBuffer where = new StringBuffer();
		from.append(this.from);
		where.append(this.where);
		StringBuffer querycountString = new StringBuffer();
		querycountString.append(select).append(from).append(where);
		return querycountString.toString();
	}
}
