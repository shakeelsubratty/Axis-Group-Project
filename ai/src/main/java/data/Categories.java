package data;

import java.io.IOException;
import java.util.List;

import com.google.cloud.language.v1.ClassificationCategory;
import com.google.cloud.language.v1.ClassifyTextRequest;
import com.google.cloud.language.v1.ClassifyTextResponse;
import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.Document.Type;
import com.google.cloud.language.v1.LanguageServiceClient;

/**
 * 
 * @author Aaron
 *
 *         Requests and stores category analysis from the Google API
 */
public class Categories
{
	private List<ClassificationCategory> categories;

	/**
	 * Categories constructor
	 * 
	 * @param text
	 *            the response to be analysed.
	 * @throws IOException
	 * @throws Exception
	 */
	protected Categories(String text) throws IOException, Exception
	{
		categories = getCategories(text);
	}

	/**
	 * Code snippet taken from Google's Classifying Text API example
	 * (https://cloud.google.com/natural-language/docs/classifying-text)
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
	private List<ClassificationCategory> getCategories(String text) throws IOException, Exception
	{
		// Instantiate the Language client
		// com.google.cloud.language.v1.LanguageServiceClient
		try (LanguageServiceClient language = LanguageServiceClient.create())
		{
			// set content to the text string
			Document doc = Document.newBuilder().setContent(text).setType(Type.PLAIN_TEXT).build();
			ClassifyTextRequest request = ClassifyTextRequest.newBuilder().setDocument(doc).build();

			// detect categories in the given text
			ClassifyTextResponse response = language.classifyText(request);

			return response.getCategoriesList();
		}
	}

	/**
	 * 
	 * @return the categories from the Google API
	 */
	public List<ClassificationCategory> getCategories()
	{
		return categories;
	}
}
