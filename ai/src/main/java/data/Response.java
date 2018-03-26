package data;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

//import com.google.api.gax.rpc.InvalidArgumentException;
import com.google.cloud.language.v1.Token;

/**
 * 
 * @author Aaron
 * 
 *         Stores the data received from the Google API.
 *
 */
public class Response
{
	//private static int count;
	private final String id;
	private String groupID;

	private String description;

	private Syntax syntax;
	//private Categories categories;

//	/**
//	 * Response constructor
//	 *
//	 * @param text
//	 *            the response to be analysed.
//	 * @throws IOException
//	 * @throws Exception
//	 */
//	public Response(String id,String description) throws IOException, Exception
//	{
//		//count++;
//		this.id = id;
//		this.description = description;
//
//		//groupID = UUID.randomUID().toString();
//
//		syntax = new Syntax(description);
//		categories = new Categories(description);
//	}


	/**
	 * Response constructor
	 *
	 * @param text
	 *            the response to be analysed.
	 */
	public Response(String text)
	{
		id = "";
		init(text);
	}

	/**
	 * Response constructor with ID given
	 *
	 * @param text
	 *            the response to be analysed.
	 * @param id
	 *            the ID of the response.
	 */
//	public Response(String text, String id)
//	{
//		this.id = id;
//		init(text);
//	}

	public Response(String id, String text)
	{
		this.id = id;
		init(text);
	}

	private void init(String text)
	{
		this.description = text;

		try
		{
			syntax = new Syntax(text);
		}
		catch (Exception e)
		{
			// The response is too short to perform some analysis, but this does not impact
			// this program's use of the API.
		}
	}


	public String getID()
	{
		return id;
	}

	public String getText()
	{
		return description;
	}

	/**
	 * 
	 * @return a list of all words from the response that are verbs.
	 */
	public List<Token> getVerbs()
	{
		return syntax.getType("VERB");
	}

	/**
	 * 
	 * @return a list of all words from the response that are nouns.
	 */
	public List<Token> getNouns()
	{
		return syntax.getType("NOUN");
	}

	/**
	 * 
	 * @param a
	 *            a list of words to be compared from Response a
	 * @param b
	 *            a list of words to be compared from Response b
	 * @return the percentage match
	 */
	private double comparison(List<Token> a, List<Token> b)
	{
		List<Token> matches = new ArrayList<>();

		for (int i = 0; i < a.size(); i++)
		{
			for (int j = 0; j < b.size(); j++)
			{
				if (a.get(i).getLemma().equals(b.get(j).getLemma()))
				{
					matches.add(a.get(i));
				}
			}
		}
		double match = ((double) matches.size()) / ((double) Math.min(a.size(), b.size()));

		return match;
	}

	/**
	 * Compare the verbs in this Response to another response.
	 * 
	 * @param r
	 *            the Response to compare
	 * @return the percentage match
	 */
	public double compareVerbsTo(Response r)
	{
		return comparison(this.getVerbs(), r.getVerbs());
	}

	/**
	 * Compare the verbs in this Response to another response.
	 * 
	 * @param r
	 *            the Response to compare
	 * @return the percentage match
	 */
	private double compareNounsTo(Response r)
	{
		return comparison(this.getNouns(), r.getNouns());
	}

	/**
	 * 
	 * @param r
	 *            the Response to compare
	 * @return true if the responses have over 50% match
	 */
	public boolean matches(Response r)
	{
		return this.getMatchPercentage(r) > Constants.MATCH_PERCENTAGE;
	}

	/**
	 * 
	 * @param r
	 *            the Response to compare
	 * @return the percentage match for these two responses
	 */
	public double getMatchPercentage(Response r)
	{
		double nounMatch = this.compareNounsTo(r);
		double verbMatch = this.compareVerbsTo(r);
		
		return (double) (nounMatch + verbMatch) / 2.0;
	}
	
	@Override
	public String toString()
	{
		return id + "";
	}

	public boolean equals(Response r)
	{
		return id.equals(r.getID());
	}

}
