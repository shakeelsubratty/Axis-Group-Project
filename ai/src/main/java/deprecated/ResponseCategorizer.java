package deprecated;
import java.util.ArrayList;

import com.google.cloud.language.v1.ClassificationCategory;
import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Document.Type;

public class ResponseCategorizer
{
	public static ClassificationCategory getCategories(String text) throws Exception
	{
		try (LanguageServiceClient language = LanguageServiceClient.create())
		{
			Document doc = Document.newBuilder().setContent(text).setType(Type.PLAIN_TEXT).build();

			ClassificationCategory classification = language.classifyText(doc).getCategories(0);

			return classification;
		}
	}

	public static ArrayList<ClassificationCategory> getClassifications(ArrayList<String> inputs) throws Exception
	{
		ArrayList<ClassificationCategory> classifications = new ArrayList<>();

		for (int i = 0; i < inputs.size(); i++)
		{
			classifications.add(getCategories(inputs.get(i)));
		}

		return classifications;
	}

	public static Category getGroups(ArrayList<String> inputs) throws Exception
	{
		ArrayList<ClassificationCategory> classifications = getClassifications(inputs);

		ArrayList<String> categories = new ArrayList<>();

		ArrayList<Integer> groups = new ArrayList<>();

		// Get all categories and assign groups to each response
		for (int i = 0; i < classifications.size(); i++)
		{
			// Split the subcategories to get the most generic category
			String[] subcategories = classifications.get(i).getName().split("/");

			// If the category doesn't exist yet, add it to the list of categories
			if (!categories.contains(subcategories[1]))
			{
				categories.add(subcategories[1]);
			}

			// Add the response to the relevant group
			groups.add(categories.indexOf(subcategories[1]));
		}

		return new Category(categories, groups);
	}
}
