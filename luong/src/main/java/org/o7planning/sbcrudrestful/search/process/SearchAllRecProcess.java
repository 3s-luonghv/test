package org.o7planning.sbcrudrestful.search.process;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;


import org.o7planning.sbcrudrestful.dto.RequestPageDto;
import org.o7planning.sbcrudrestful.dto.ResponsePageDto;
import org.o7planning.sbcrudrestful.dto.SearchDto;
import org.o7planning.sbcrudrestful.dto.ValidateUtility;
import org.o7planning.sbcrudrestful.search.dto.SearchRequest;
import org.o7planning.sbcrudrestful.search.dto.SearchResponse;
import org.springframework.stereotype.Component;

/**
 * 画面：業務マニュアルダウンロード
 * 概要：検索
 * @param <DBStatement>
 * @param <DBStatement>
 */
@Component("procSearch")
public class SearchAllRecProcess<DBStatement >  {

	public SearchAllRecProcess() {
		super();
	}

	public SearchResponse process(SearchRequest request, SearchResponse response) throws Exception  {
		ResultSet rs = null;
		DBStatement  ps = null;
		RequestPageDto req = new RequestPageDto ();
		ResponsePageDto rep = new ResponsePageDto();
		try {
			SearchRequest reqSearch = (SearchRequest) request;
			SearchResponse resSearch = (SearchResponse) response;
			String name = reqSearch.SearchCondition.NAME;
			String limitdate = reqSearch.SearchCondition.LIMMITDATE;
			String proddate = reqSearch.SearchCondition.PRODDATE;
			String status = reqSearch.SearchCondition.STATUS;
			rep.page.pageIdx = req.page.pageIdx;
			rep.page.limit = req.page.limit;
			rep.page.orderBy = req.page.orderBy;
			// SQL Query
			String strSql = "";
			strSql +=" SELECT ";
			strSql +=" name, limmitdate, proddate, status ";
			strSql +=" FROM  ";
			strSql +="  time_to_doing ";			
			strSql +=" WHERE  ";
			if (!ValidateUtility.CheckNull(name)){
				strSql += "name like  ?  ";
			}			
			//業務種別
			if (!ValidateUtility.CheckNull(status)){
				strSql +=" and status =?   ";
			}	
			strSql +=(" ;");
			 Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/data", "root", "123456");
			 PreparedStatement pstmt = con.prepareStatement(strSql);
			
			int index = 1;
			
			if (!ValidateUtility.CheckNull(name)){
				pstmt.setString(index, "%"+name+"%");
				index++;
			}

			//業務種別
			if (!ValidateUtility.CheckNull(status)){
				pstmt.setString(index, status);
				index++;
			}

			rs = pstmt.executeQuery();

			// Set response
			this.setResponse(rs, request, resSearch);
			if (resSearch.rows != null && resSearch.rows.size() == 0) {
				resSearch.rows = null;
			}

			return resSearch;
		} catch (SQLException e) {
			throw new Exception(e);
		} finally {
			try {
				if (rs != null) rs.close();
			} catch (SQLException e) {
				throw new Exception(e);
			}
		}
	}

	protected void setResponse(ResultSet rs, SearchRequest request,SearchResponse resSearch)
			throws SQLException {

		ArrayList<SearchDto> lst = new ArrayList<SearchDto>();

		while (rs.next()) {
			SearchDto row = new SearchDto();

			row.NAME = rs.getString("LANG");
			row.LIMMITDATE = rs.getString("LANGNM");
			row.PRODDATE = rs.getString("FILEPATH");
			row.STATUS = rs.getString("FILENM");
			
			lst.add(row);
		}

		resSearch.rows = lst;
	}

	
	protected SearchResponse createNewResponse(SearchRequest request) {
		return new SearchResponse();
	}
	
	protected String setKey() {
		return "";
	}

	protected String setLimit(Integer pageNum, Integer dispNum) {
		return "";
	}
}
