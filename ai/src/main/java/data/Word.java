package data;

public class Word {
	
	private String name;
	private int count;
	private String colour;
	private float sentiment;
	
	public Word(String name, float sentiment) {
		this.name = name;
		this.sentiment = sentiment;
		count = 1;
	}
	
	public String getName() {
		return name;
	}
	
	public int getCount() {
		return count;
	}
	
	public void incrementCount() {
		count++;
	}
	
	public String getColour() {
		return colour;
	}
	
	public void calculateColour() {
		double sentimentColour = sentiment, red, blue, green;
		
		if(sentimentColour < 0) {
			red = 1;
			blue = 0;
			green = sentimentColour + 1;
			
		} else {
			red = 1 - sentimentColour;
			blue = 0;
			green = 1;
		}
		
		red = red*255;
		green = green*255;
		blue = blue*255;
		
		colour = String.format("#%02x%02x%02x", (int)red, (int)green, (int)blue);;
	}
	
	public float getSentiment() {
		return sentiment;
	}
	
	public void calculateSentiment(float sentiment) {
		this.sentiment = (this.sentiment + sentiment)/count;
	}
	
}
