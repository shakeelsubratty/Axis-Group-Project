import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.Document.Type;

import data.Response;

import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Sentiment;
import com.google.cloud.language.v1.Token;
import com.google.cloud.language.v1.ClassificationCategory;

import java.util.List;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.Collections;

public class MainClass
{
	public static void main(String[] args) throws Exception
	{
		// inputs.add("This product has an IMEI that uniquely identifies it. When we
		// dispatch your order, we will scan the IMEI and add it to the order history.
		// Where the item is not received, Amazon may register the IMEI with loss and
		// theft databases to help prevent any fraudulent use or reselling of the item.
		// This information is shared in accordance with the Amazon.co.uk Privacy
		// Notice. There is no action required from you and the IMEI will only be used
		// for this purpose.");
		// inputs.add("QuietComfort® 25 headphones are engineered to sound better, be
		// more comfortable and easier to take with you. Put them on, and suddenly
		// everything changes. Your music is deep, powerful and balanced, and so quiet
		// that every note sounds clearer. Even air travel becomes enjoyable, as engine
		// roar gently fades away. No matter how noisy the world is, it's just you and
		// your music—or simply peace and quiet.");
		// inputs.add("Through our multi-sector domain expertise, extensive industry
		// relationships and diverse, experienced team of exclusive venture partners who
		// are proven company builders, we work hands-on with our portfolio companies as
		// trusted advisers and partners from formation to exit. We help them develop
		// business strategy, make connections within our networks, and guide them
		// through both smooth and turbulent times toward a successful exit.");
		
		String text = "This is some sample text.";

		Response r = new Response(text);
		
	}
}
