package data;

/**
 * The Class Word.
 */
public class Word {
	
	/** Word name. */
	private String name;
	
	/** Word count. */
	private int count;
	
	/** Word colour. */
	private String colour;
	
	/** Word sentiment. */
	private float sentiment;
	
	/**
	 * Instantiates a new word.
	 *
	 * @param String name
	 * @param float sentiment
	 */
	public Word(String name, float sentiment) {
		this.name = name;
		this.sentiment = sentiment;
		count = 1;
	}
	
	/**
	 * Returns the word name.
	 *
	 * @return String name
	 */
	public String getName() {
		return name;
	}
	
	/**
	 * Returns the word count.
	 *
	 * @return int count
	 */
	public int getCount() {
		return count;
	}
	
	/**
	 * Increments word count.
	 */
	public void incrementCount() {
		count++;
	}
	
	/**
	 * Returns the word colour as a hexadecimal.
	 *
	 * @return String colour
	 */
	public String getColour() {
		return colour;
	}
	
	/**
	 * Calculate colour from the word sentiment as a hexadecimal. Colour ranges from red to green.
	 */
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
	
	/**
	 * Returns the word sentiment.
	 *
	 * @return float sentiment
	 */
	public float getSentiment() {
		return sentiment;
	}
	
	/**
	 * Calculate sentiment depending on the word count to get an average value of the word.
	 *
	 * @param sentiment the sentiment
	 */
	public void calculateSentiment(float sentiment) {
		this.sentiment = (this.sentiment + sentiment)/count;
	}
	
}
