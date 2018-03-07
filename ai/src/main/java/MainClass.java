import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.Document.Type;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Sentiment;
import com.google.cloud.language.v1.ClassificationCategory;

import java.util.List;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.Collections;

public class MainClass
{
    public static ClassificationCategory getCategories(String text) throws Exception
    {
        try(LanguageServiceClient language = LanguageServiceClient.create())
        {
            Document doc = Document.newBuilder().setContent(text).setType(Type.PLAIN_TEXT).build();

            ClassificationCategory classification = language.classifyText(doc).getCategories(0);

            return classification;
        }
    }
    
    public static ArrayList<ClassificationCategory> getClassifications(ArrayList<String> inputs) throws Exception
    {
    		ArrayList<ClassificationCategory> classifications = new ArrayList<>();
    		
    		for(int i=0;i<inputs.size();i++)
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
        for(int i=0;i<classifications.size();i++)
        {
        		// Split the subcategories to get the most generic category
        		String[] subcategories = classifications.get(i).getName().split("/");
			
        		// If the category doesn't exist yet, add it to the list of categories
			if(!categories.contains(subcategories[1]))
			{
				categories.add(subcategories[1]);
			}
			
			// Add the response to the relevant group 
			groups.add(categories.indexOf(subcategories[1]));
        }
        
		return new Category(categories, groups);
    }
    
    public static void main(String[] args) throws Exception
    {
        boolean nextInput = true;
        ArrayList<String> inputs = new ArrayList<>();
        
        // Add responses to ArrayList
        inputs.add("This product has an IMEI that uniquely identifies it. When we dispatch your order, we will scan the IMEI and add it to the order history. Where the item is not received, Amazon may register the IMEI with loss and theft databases to help prevent any fraudulent use or reselling of the item. This information is shared in accordance with the Amazon.co.uk Privacy Notice. There is no action required from you and the IMEI will only be used for this purpose.");
        inputs.add("QuietComfort® 25 headphones are engineered to sound better, be more comfortable and easier to take with you. Put them on, and suddenly everything changes. Your music is deep, powerful and balanced, and so quiet that every note sounds clearer. Even air travel becomes enjoyable, as engine roar gently fades away. No matter how noisy the world is, it's just you and your music—or simply peace and quiet.");
        inputs.add("Through our multi-sector domain expertise, extensive industry relationships and diverse, experienced team of exclusive venture partners who are proven company builders, we work hands-on with our portfolio companies as trusted advisers and partners from formation to exit. We help them develop business strategy, make connections within our networks, and guide them through both smooth and turbulent times toward a successful exit.");

        System.out.println("Analyzing text - please wait...");
        
        // Get responses from Google API
        Category groups = getGroups(inputs);
        
        // Print output
        for(int i=0;i<groups.getCategories().size();i++)
        {
        		System.out.println("*** CATEGORY: " + groups.getCategories().get(i) + " ***");
        		
        		for(int j=0;j<groups.getGroups().size();j++)
        		{
        			if(groups.getGroups().get(j).equals(groups.getCategories().indexOf(groups.getCategories().get(i))))
        			{
        				System.out.println("\nInput " + j + "> " + inputs.get(j));
        			}
        		}
        		System.out.println("\n");
        }
    }
}
