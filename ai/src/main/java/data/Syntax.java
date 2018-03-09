package data;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.google.cloud.language.v1.AnalyzeSyntaxRequest;
import com.google.cloud.language.v1.AnalyzeSyntaxResponse;
import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.Document.Type;
import com.google.cloud.language.v1.EncodingType;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Token;

/**
 * 
 * @author Aaron
 * 
 *         Requests and stores syntax analysis from the Google API
 *
 */
public class Syntax
{
	private List<Token> tokens;

	/**
	 * Syntax constructor
	 * 
	 * @param text
	 *            the response to be analysed.
	 * @throws IOException
	 * @throws Exception
	 */
	protected Syntax(String text) throws IOException, Exception
	{
		tokens = getTokens(text);
	}

	/**
	 * Code snippet taken from Google's Syntax API example
	 * (https://cloud.google.com/natural-language/docs/analyzing-syntax)
	 * 
	 * Licensed under the Apache 2.0 License
	 * (http://www.apache.org/licenses/LICENSE-2.0)
	 * 
	 * @param text
	 *            the response to be analysed.
	 * @return the response from the Google API.
	 * 
	 * @throws IOException
	 * @throws Exception
	 */
	private List<Token> getTokens(String text) throws IOException, Exception
	{
		System.out.println("Accessing Google API");
		// Instantiate the Language client
		// com.google.cloud.language.v1.LanguageServiceClient
		try (LanguageServiceClient language = LanguageServiceClient.create())
		{
			Document doc = Document.newBuilder().setContent(text).setType(Type.PLAIN_TEXT).build();
			AnalyzeSyntaxRequest request = AnalyzeSyntaxRequest.newBuilder().setDocument(doc)
					.setEncodingType(EncodingType.UTF16).build();

			// analyze the syntax in the given text
			AnalyzeSyntaxResponse response = language.analyzeSyntax(request);
			System.out.println("API call complete.");
			return response.getTokensList();
		}
	}

	/**
	 * Get all words that match the type given.
	 * 
	 * @param type
	 *            the type of word to filter by
	 * @return all words that are of the type given.
	 */
	protected List<Token> getType(String type)
	{
		List<Token> toReturn = new ArrayList<>();

		for (int i = 0; i < tokens.size(); i++)
		{
			if (tokens.get(i).getPartOfSpeech().getTag().toString().equals(type))
			{
				toReturn.add(tokens.get(i));
			}
		}

		return toReturn;
	}
}
