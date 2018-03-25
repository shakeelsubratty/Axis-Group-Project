import static org.junit.Assert.*;

import java.util.List;

import org.junit.Ignore;
import org.junit.Test;

import analysis.RepetitionGrouper;
import data.Response;

public class RepetitionTest
{
	@Test
	public void CreateResponse()
	{
		try
		{
			Response r = new Response(
					"This is a response. The text should be added to a new instance of Response and analysed by the Google API. The analysis returned from the API should be stored in an instance of Syntax within the Response object.");

			if (!r.getText().equals(
					"This is a response. The text should be added to a new instance of Response and analysed by the Google API. The analysis returned from the API should be stored in an instance of Syntax within the Response object."))
			{
				fail("The Response was not created correctly.");
			}
		}
		catch (Exception e)
		{
			fail(e.toString());
		}
	}

	@Test
	public void HandleShortResponse()
	{
		Response r = null;
		try
		{
			r = new Response("This is a response.");

			if (!r.getText().equals("This is a response."))
			{
				fail("The Response was not created correctly.");
			}
		}
		catch (Exception e)
		{
			fail(e.toString());
		}
	}

	@Test
	// @Ignore("Takes too long.")
	public void CreateAndGroupResponses()
	{
		try
		{
			// Create responses
			Response a = new Response(
					"It doesn’t really matter what you’re doing—hiking, biking, cooking dinner or hanging out. You need music. We designed a speaker that keeps pace with all of your adventures and delivers unmatched sound for its size. The SoundLink Micro speaker is small, but powerful. Super rugged and waterproof. It features a tear-resistant silicone strap—so you can take it along wherever you go. Because, when a speaker this small sounds this good, you’ll never want to leave it behind.",
					0);
			Response b = new Response(
					"Meet SoundLink Revolve, one of our best performing portable Bluetooth speakers yet. It delivers true 360° sound for consistent, uniform coverage. Place it in the centre of the room and everyone gets the same experience. Or set it near a wall and sound will radiate and reflect around the room, immersing you. Taking it outdoors? Great, it's meant to go where you go.",
					1);
			Response c = new Response(
					"This true 360° speaker was engineered to spread deep, jaw-dropping sound in every direction. That means, when everyone stands around it, everyone gets the same experience. If you set it near a wall, sound will radiate and reflect around the room, immersing you in that same feeling you felt at your favourite concert. And with a flexible handle, it's designed to go wherever you want to bring the music.",
					2);
			Response d = new Response(
					"This product has an IMEI that uniquely identifies it. When we dispatch your order, we will scan the IMEI and add it to the order history. Where the item is not received, Amazon may register the IMEI with loss and theft databases to help prevent any fraudulent use or reselling of the item. This information is shared in accordance with the Amazon.co.uk Privacy Notice. There is no action required from you and the IMEI will only be used for this purpose.",
					3);
			Response e = new Response(
					"QuietComfort® 25 headphones are engineered to sound better, be more comfortable and easier to take with you. Put them on, and suddenly everything changes. Your music is deep, powerful and balanced, and so quiet that every note sounds clearer. Even air travel becomes enjoyable, as engine roar gently fades away. No matter how noisy the world is, it's just you and your music—or simply peace and quiet.",
					4);
			Response f = new Response(
					"Through our multi-sector domain expertise, extensive industry relationships and diverse, experienced team of exclusive venture partners who are proven company builders, we work hands-on with our portfolio companies as trusted advisers and partners from formation to exit. We help them develop business strategy, make connections within our networks, and guide them through both smooth and turbulent times toward a successful exit.",
					5);
			Response g = new Response(
					"Amazon Echo connects to Alexa-a cloud-based voice service-to play music, make calls, set alarms and timers, ask questions, check your calendar, weather, traffic and sports scores, manage to-do and shopping lists, control compatible smart home devices, and more.",
					6);
			Response h = new Response(
					"Just ask for a song, artist or genre from Amazon Music, Spotify, TuneIn and more. With multi-room music, you can play music on Echo devices in different rooms, available for Amazon Music, TuneIn and Spotify; Bluetooth not supported. Echo can also play audiobooks, radio stations, news briefings and more.",
					7);
			Response aa = new Response(
					"Call or message anyone hands-free who also has an Echo device or the Alexa App. Also, quickly connect to other Echo devices in your home using just your voice.",
					8);
			Response ab = new Response(
					"New speaker with Dolby processing that fills the room with immersive, 360° omnidirectional audio, and delivers crisp vocals, deep bass, and clear highs at louder volumes.",
					9);

			// Add responses to grouper and group responses
			RepetitionGrouper rg = new RepetitionGrouper();

			rg.addResponse(a);
			rg.addResponse(b);
			rg.addResponse(c);
			rg.addResponse(d);
			rg.addResponse(e);
			rg.addResponse(f);
			rg.addResponse(g);
			rg.addResponse(h);
			rg.addResponse(aa);
			rg.addResponse(ab);

			// Get grouped responses
			List<List<Response>> results = rg.getGroups();
		}
		catch (Exception e)
		{
			e.printStackTrace();
			fail(e.toString());
		}
	}

	@Test
	public void CheckIdenticalResponsesMatch()
	{
		Response a = new Response(
				"JUnit is a unit testing platform for Java. It lets us check that our code functions as expected. We can use that in conjunction with JaCoCo to ensure that our code is tested sufficiently.");
		Response b = new Response(
				"JUnit is a unit testing platform for Java. It lets us check that our code functions as expected. We can use that in conjunction with JaCoCo to ensure that our code is tested sufficiently.");

		if (!a.matches(b))
		{
			fail("These should be a match, but a.matches(b) returns false.");
		}
	}

	@Test
	public void CheckDifferentResponsesDoNotMatch()
	{
		Response a = new Response(
				"JUnit is a unit testing platform for Java. It lets us check that our code functions as expected. We can use that in conjunction with JaCoCo to ensure that our code is tested sufficiently.");
		Response b = new Response(
				"It doesn’t really matter what you’re doing—hiking, biking, cooking dinner or hanging out. You need music. We designed a speaker that keeps pace with all of your adventures and delivers unmatched sound for its size. The SoundLink Micro speaker is small, but powerful. Super rugged and waterproof. It features a tear-resistant silicone strap—so you can take it along wherever you go. Because, when a speaker this small sounds this good, you’ll never want to leave it behind.");

		if (a.matches(b))
		{
			fail("These should be not a match, but a.matches(b) returns true.");
		}
	}

	@Test
	public void CheckToStringWhenIDIsNotSpecified()
	{
		Response a = new Response("This is a response.");

		if (!a.toString().equals("-1"))
		{
			fail("toString() does not function correctly.");
		}
	}

	@Test
	public void CheckToStringWhenIDIsSpecified()
	{
		Response a = new Response("This is a response.", 42);

		if (!a.toString().equals("42"))
		{
			fail("toString() does not function correctly.");
		}
	}

	@Test
	public void GetIDWhenIDIsNotSpecified()
	{
		Response a = new Response("This is a response.");

		if (a.getID() != -1)
		{
			fail("getID() does not function correctly.");
		}
	}

	@Test
	public void GetIDWhenIDIsSpecified()
	{
		Response a = new Response("This is a response.", 42);

		if (a.getID() != 42)
		{
			fail("getID() does not function correctly.");
		}
	}
	
	public void CheckEqualsImplementation()
	{
		Response a = new Response("This is a response.", 42);
		Response b = new Response("This is a response.", 42);
		Response c = new Response("This is another response.", 1337);
		
		if(a.equals(c))
		{
			fail("a and c are not equal, but a.equals(c) returns true.");
		}
		
		if(b.equals(c))
		{
			fail("b and c are not equal, but b.equals(c) returns true.");
		}
		
		if(!a.equals(b))
		{
			fail("a and b are equal, but a.equals(b) returns false.");
		}
	}
}
