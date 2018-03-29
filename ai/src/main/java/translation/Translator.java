package translation;

import com.google.cloud.translate.Translate;
import com.google.cloud.translate.Translate.TranslateOption;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;

/**
 * 
 * @author Aaron
 * 
 *         Translates a given String into a given language (default target
 *         language of English)
 *
 */
public class Translator
{
	/**
	 * Default constructor
	 */
	public Translator()
	{
		// Default constructor
	}

	/**
	 * 
	 * @param text
	 *            the text to be translated
	 * @return the English translation of the text given
	 */
	public String translate(String text)
	{
		return translate(text, "en");
	}

	/**
	 * 
	 * @param text
	 *            the text to be translated
	 * @param tLang
	 *            the language to be translated into
	 * @return the translation of the text given
	 */
	public String translate(String text, String tLang)
	{
		Translate translate = TranslateOptions.getDefaultInstance().getService();

		String sLang = translate.detect(text).getLanguage();

		Translation translation = translate.translate(text, TranslateOption.sourceLanguage(sLang),
				TranslateOption.targetLanguage(tLang));

		return translation.getTranslatedText();
	}
}
