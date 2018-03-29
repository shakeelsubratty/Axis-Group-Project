import static org.junit.Assert.fail;

import org.junit.Test;

import translation.Translator;

public class TranslationTest
{
	@Test
	public void TranslateFromSpanishToEnglish()
	{
		Translator t = new Translator();
		
		String text = t.translate("¡Hola! Yo hablo español.");
		
		if(!text.equalsIgnoreCase("Hello! I speak spanish.") && !text.equalsIgnoreCase("Hello! I am speaking spanish."))
		{
			fail("Spanish was not accurately translated to English.\nTranslation given: " + text);
		}
	}
	
	@Test
	public void TranslateFromFrenchToEnglish()
	{
		Translator t = new Translator();
		
		String text = t.translate("Salut! Je parle français.");
		
		if(!text.equalsIgnoreCase("Hello! I speak french.") && !text.equalsIgnoreCase("Hello! I am speaking french."))
		{
			fail("French was not accurately translated to English.\nTranslation given: " + text);
		}
	}
	
	@Test
	public void TranslateFromEnglishToSpanish()
	{
		Translator t = new Translator();
		
		String text = t.translate("Hello! I speak english.", "es");
		
		if(!text.equalsIgnoreCase("¡Hola! Hablo inglés.") && !text.equalsIgnoreCase("¡Hola! Yo hablo inglés."))
		{
			fail("English was not accurately translated to Spanish.\nTranslation given: " + text);
		}
	}
	
	@Test
	public void TranslateFromEnglishToFrench()
	{
		Translator t = new Translator();
		
		String text = t.translate("Hello! I speak english.", "fr");
		
		if(!text.equalsIgnoreCase("Salut! Je parle anglais."))
		{
			fail("English was not accurately translated to French.\nTranslation given: " + text);
		}
	}
}
