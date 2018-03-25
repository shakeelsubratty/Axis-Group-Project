package analysis;

import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.Document.Type;
import com.google.cloud.language.v1.EncodingType;
import com.google.cloud.language.v1.LanguageServiceClient;

import data.Word;

import com.google.cloud.language.v1.AnalyzeEntitySentimentResponse;
import com.google.cloud.language.v1.AnalyzeEntitySentimentRequest;
import com.google.cloud.language.v1.Entity;

import java.util.HashMap;

/**
 * The Class WordCloud.
 */
public class WordCloud {
	
	/** The word cloud to be displayed. */
	private HashMap<String, Word> wordCloud;
	
	/**
	 * Instantiates a new word cloud.
	 */
	public WordCloud() {
		wordCloud = new HashMap<>();
	}
	
	/**
	 * Process user response. Add the word entities to the wordCloud variable.
	 * Then go through the entities in the wordClouds and calculate their colour.
	 * 
	 * @param text the text
	 * @throws Exception the exception
	 */
	public void processResponse(String text) throws Exception{
		
		try (LanguageServiceClient language = LanguageServiceClient.create()) {
	    	  Document doc = Document.newBuilder()
			      .setContent(text).setType(Type.PLAIN_TEXT).build();
			  AnalyzeEntitySentimentRequest request = AnalyzeEntitySentimentRequest.newBuilder()
			      .setDocument(doc)
			      .setEncodingType(EncodingType.UTF16).build();
			  AnalyzeEntitySentimentResponse response = language.analyzeEntitySentiment(request);

			  for(Entity entity : response.getEntitiesList()) {
				  
				if(wordCloud.isEmpty() || !wordCloud.containsKey(entity.getName())) {
					Word word = new Word(entity.getName(), entity.getSentiment().getScore());
					wordCloud.put(word.getName(), word);
				} else {
	                Word value = wordCloud.get(entity.getName());
	                value.incrementCount();
	                value.calculateSentiment(entity.getSentiment().getScore());
				}	
			  }
	    	}
		
		for(Word word : wordCloud.values()) {
			word.calculateColour();
		}
	}
	
	/**
	 * Returns the wordCloud hashMap.
	 *
	 * @return HashMap wordCloud
	 */
	public HashMap<String, Word> getHashMap() {
		return wordCloud;
	}
}