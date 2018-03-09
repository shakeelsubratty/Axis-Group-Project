package data;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

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
	private String text;

	private Syntax syntax;
	private Categories categories;

	/**
	 * Response constructor
	 * 
	 * @param text
	 *            the response to be analysed.
	 * @throws IOException
	 * @throws Exception
	 */
	public Response(String text) throws IOException, Exception
	{
		this.text = text;

		syntax = new Syntax(text);
		categories = new Categories(text);
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
				if (a.get(i).equals(b.get(j)))
				{
					matches.add(a.get(i));
				}
			}
		}

		double match = matches.size() / Math.min(a.size(), b.size());

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
	 * @return true if the responses have over 50% match
	 */
	public boolean matches(Response r)
	{
		double nounMatch = this.compareNounsTo(r);
		double verbMatch = this.compareVerbsTo(r);
		
		return ((double) (nounMatch + verbMatch) / 2.0) > 0.5;
	}
}
