import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.Document.Type;

import data.Response;

import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Sentiment;
import com.google.cloud.language.v1.Token;

import analysis.RepetitionGrouper;

import com.google.cloud.language.v1.ClassificationCategory;

import java.util.List;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.Collections;

public class MainClass
{
	public static void main(String[] args) throws Exception
	{
		Response a = new Response(
				"It doesn’t really matter what you’re doing—hiking, biking, cooking dinner or hanging out. You need music. We designed a speaker that keeps pace with all of your adventures and delivers unmatched sound for its size. The SoundLink Micro speaker is small, but powerful. Super rugged and waterproof. It features a tear-resistant silicone strap—so you can take it along wherever you go. Because, when a speaker this small sounds this good, you’ll never want to leave it behind.");
		Response b = new Response(
				"Meet SoundLink Revolve, one of our best performing portable Bluetooth speakers yet. It delivers true 360° sound for consistent, uniform coverage. Place it in the centre of the room and everyone gets the same experience. Or set it near a wall and sound will radiate and reflect around the room, immersing you. Taking it outdoors? Great, it's meant to go where you go.");
		Response c = new Response(
				"This true 360° speaker was engineered to spread deep, jaw-dropping sound in every direction. That means, when everyone stands around it, everyone gets the same experience. If you set it near a wall, sound will radiate and reflect around the room, immersing you in that same feeling you felt at your favourite concert. And with a flexible handle, it's designed to go wherever you want to bring the music.");
		Response d = new Response(
				"This product has an IMEI that uniquely identifies it. When we dispatch your order, we will scan the IMEI and add it to the order history. Where the item is not received, Amazon may register the IMEI with loss and theft databases to help prevent any fraudulent use or reselling of the item. This information is shared in accordance with the Amazon.co.uk Privacy Notice. There is no action required from you and the IMEI will only be used for this purpose.");
		Response e = new Response(
				"QuietComfort® 25 headphones are engineered to sound better, be more comfortable and easier to take with you. Put them on, and suddenly everything changes. Your music is deep, powerful and balanced, and so quiet that every note sounds clearer. Even air travel becomes enjoyable, as engine roar gently fades away. No matter how noisy the world is, it's just you and your music—or simply peace and quiet.");
		Response f = new Response(
				"Through our multi-sector domain expertise, extensive industry relationships and diverse, experienced team of exclusive venture partners who are proven company builders, we work hands-on with our portfolio companies as trusted advisers and partners from formation to exit. We help them develop business strategy, make connections within our networks, and guide them through both smooth and turbulent times toward a successful exit.");

		ArrayList<Response> responses = new ArrayList<>();

		RepetitionGrouper rg = new RepetitionGrouper();

		rg.addResponse(a);
		rg.addResponse(b);
		rg.addResponse(c);
		rg.addResponse(d);
		rg.addResponse(e);
		rg.addResponse(f);

		List<List<Response>> results = rg.groupResponses();

		// System.out.println(results.toString());

		for (int i = 0; i < results.size(); i++)
		{
			System.out.println("***** GROUP " + i + " *****");

			List<Response> thisGroup = results.get(i);

			for (int j = 0; j < thisGroup.size(); j++)
			{
				System.out.println("\t" + thisGroup.get(j).getText());
				if(j+1 != thisGroup.size())
				{
					System.out.println();
				}
			}
			System.out.println("***** END OF GROUP *****\n");
		}

	}
}
