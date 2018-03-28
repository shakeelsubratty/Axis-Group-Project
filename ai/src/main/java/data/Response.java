package data;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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
	private String id;
	private String groupID;
	private String workshopID;
	private String description;
	private Syntax syntax;

	private List<String> groupSummaries;

	/**
	 * Response constructor
	 *
	 * @param text
	 *            the response to be analysed.
	 */
	public Response(String text)
	{
		id = "-1";
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

	public Response(String id, String text, String workshopID)
	{
		this.id = id;
		this.workshopID = workshopID;
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
			e.printStackTrace();
		}
	}


	public String getID()
	{
		return id;
	}

	public String getGroupID() {return groupID;}

	public void setGroupID(String groupID) {this.groupID = groupID;}

	public String getWorkshopID() {
		return workshopID;
	}

	public void setWorkshopID(String workshopID) {
		this.workshopID = workshopID;
	}

	/**
	 *
	 * @return the text of the response.
	 */
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
		boolean hasNouns = false;
		boolean hasVerbs = false;
		
		double nounMatch = 0;
		double verbMatch = 0;
		
		
		if(this.getNouns().size() > 0 && r.getNouns().size() > 0)
		{
			nounMatch = this.compareNounsTo(r);
			hasNouns = true;
		}
		
		if(this.getVerbs().size() > 0 && r.getVerbs().size() > 0)
		{
			verbMatch = this.compareVerbsTo(r);
			hasVerbs = true;
		}
		
		if(hasNouns && hasVerbs)
		{
			return (double) (nounMatch + verbMatch) / 2.0;
		}
		else if(hasNouns)
		{
			return nounMatch;
		}
		else if(hasVerbs)
		{
			return verbMatch;
		}
		else
		{
			return 0.0;
		}
		
	}

	@Override
	/**
	 * Returns the ID of the response as a String.
	 */
	public String toString()
	{
		return id + "";
	}

	/**
	 *
	 * @param r
	 *            the response to compare.
	 * @return true if the ID of the responses are the same.
	 */
	public boolean equals(Response r)
	{
		return id.equals(r.getID());
	}

}
