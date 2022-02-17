package org.o7planning.sbcrudrestful.search.dto;

import java.util.ArrayList;

import org.o7planning.sbcrudrestful.dto.SearchDto;

//@XmlRootElement(name = "result")
public class SearchResponse  {
	/*
	 * 件数
	 */
	public ArrayList<SearchDto> rows;
	public SearchDto SearchResult = new SearchDto();
}
