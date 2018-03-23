import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.Document.Type;
import com.google.cloud.language.v1.EncodingType;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.AnalyzeEntitySentimentResponse;
import com.google.cloud.language.v1.AnalyzeEntitySentimentRequest;
import com.google.cloud.language.v1.Entity;

import java.util.HashMap;

public class WordCloud {
	
	private HashMap<String, Word> wordCloud = new HashMap<>();
	
	public void processResponce(String text) throws Exception{
		
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
	
	public HashMap<String, Word> getHashMap() {
		return wordCloud;
	}
	
	public static void main(String[] args) throws Exception {
		WordCloud cloud = new WordCloud();
		
		String a = "I love this coursework! Its the best!";
		cloud.processResponce(a);
		for(Word word : cloud.wordCloud.values()) {
			System.out.println(word.getName() + " " + word.getColour() + " " +  word.getCount() + " " +  word.getSentiment() + "\n");
		}
		System.out.print("---------------------" + "\n");
		
		String b = "I hate this coursework! Its the worst";
		cloud.processResponce(b);
		for(Word word : cloud.wordCloud.values()) {
			System.out.println(word.getName() + " " + word.getColour() + " " +  word.getCount() + " " +  word.getSentiment() + "\n");
		}
		System.out.print("---------------------" + "\n");
		
		String c ="I really believe I love salsa, but hate ketchup";
		cloud.processResponce(c);
		for(Word word : cloud.wordCloud.values()) {
			System.out.println(word.getName() + " " + word.getColour() + " " +  word.getCount() + " " +  word.getSentiment() + "\n");
		}
		System.out.print("---------------------" + "\n");
		
    }
}