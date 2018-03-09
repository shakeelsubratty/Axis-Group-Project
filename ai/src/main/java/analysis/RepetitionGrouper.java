package analysis;

import java.util.ArrayList;
import java.util.List;
import data.Response;

public class RepetitionGrouper
{
	private List<Response> responses;
	
	public RepetitionGrouper()
	{
		responses = new ArrayList<>();
	}
	
	public boolean addResponse(Response r)
	{
		return responses.add(r);
	}
	
	public boolean removeResponse(Response r)
	{
		return responses.remove(r);
	}
}
