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

    public static void main(String[] args) throws Exception
    {
        boolean nextInput = true;
        ArrayList<String> inputs = new ArrayList<>();

        /*while(nextInput)
        {
            Scanner kb = new Scanner(System.in);

            System.out.print("Please enter some text or press enter to continue: ");
            String input = kb.nextLine();

            if(input == "")
            {
                nextInput = false;
            }

            inputs.add(input);
        }*/

        inputs.add("This product has an IMEI that uniquely identifies it. When we dispatch your order, we will scan the IMEI and add it to the order history. Where the item is not received, Amazon may register the IMEI with loss and theft databases to help prevent any fraudulent use or reselling of the item. This information is shared in accordance with the Amazon.co.uk Privacy Notice. There is no action required from you and the IMEI will only be used for this purpose.");
        inputs.add("QuietComfort® 25 headphones are engineered to sound better, be more comfortable and easier to take with you. Put them on, and suddenly everything changes. Your music is deep, powerful and balanced, and so quiet that every note sounds clearer. Even air travel becomes enjoyable, as engine roar gently fades away. No matter how noisy the world is, it's just you and your music—or simply peace and quiet.");
        inputs.add("Through our multi-sector domain expertise, extensive industry relationships and diverse, experienced team of exclusive venture partners who are proven company builders, we work hands-on with our portfolio companies as trusted advisers and partners from formation to exit. We help them develop business strategy, make connections within our networks, and guide them through both smooth and turbulent times toward a successful exit.");

        System.out.println("Analyzing text - please wait...");

        ArrayList<ClassificationCategory> classifications = new ArrayList<>();
        
        for(int i=0;i<inputs.size();i++)
        {
        		classifications.add(getCategories(inputs.get(i)));
        }

        ArrayList<String> categories = new ArrayList<>();
        
        ArrayList<Integer> groups = new ArrayList<>();
        
        for(int i=0;i<classifications.size();i++)
        {
        		String[] subcategories = classifications.get(i).getName().split("/");
			
			if(!categories.contains(subcategories[1]))
			{
				categories.add(subcategories[1]);
			}
			
			groups.add(categories.indexOf(subcategories[1]));
        }
        
        for(int i=0;i<categories.size();i++)
        {
        		System.out.println("*** CATEGORY: " + categories.get(i) + " ***");
        		
        		for(int j=0;j<groups.size();j++)
        		{
        			if(groups.get(j).equals(categories.indexOf(categories.get(i))))
        			{
        				System.out.println("\nInput " + j + "> " + inputs.get(j));
        			}
        		}
        		System.out.println("\n");
        }
    }
}
