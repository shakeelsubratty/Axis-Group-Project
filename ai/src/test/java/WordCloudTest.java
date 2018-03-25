import static org.junit.Assert.*;

import org.junit.Test;

import analysis.WordCloud;
import data.Word;

/**
 * The Class WordCloudTest.
 */
public class WordCloudTest {

	/**
	 * Test Word class constructor.
	 */
	@Test
	public void testWord() {
		Word word = new Word("First", -0.4f);
		assertEquals("First", word.getName());
		assertEquals(-0.4f, word.getSentiment(), -0.4f);
		assertEquals(1, word.getCount());
		assertNull(word.getColour());
	}
	
	/**
	 * Test Word getName method.
	 */
	@Test
	public void testGetName() {
		Word word1 = new Word("First", -0.8f);
		assertEquals("First", word1.getName());
		
		Word word2 = new Word("Second", 0.7f);
		assertEquals("Second", word2.getName());
	}
	
	/**
	 * Test Word getCount method.
	 */
	@Test
	public void testGetCount() {
		Word word = new Word("First", -0.4f);
		assertEquals(1, word.getCount());
		
		word.incrementCount();
		assertEquals(2, word.getCount());
		
	}
	
	/**
	 * Test Word incrementCount method.
	 */
	@Test
	public void testIncrementCount() {
		Word word = new Word("First", -0.3f);
		word.incrementCount();
		assertEquals(2, word.getCount());
		word.incrementCount();
		assertEquals(3, word.getCount());
	}

	/**
	 * Test Word getColour method.
	 */
	@Test
	public void testGetColour() {
		Word word = new Word("First", -0.4f);
		assertNull(word.getColour());
		word.calculateColour();
		assertEquals("#ff9800", word.getColour());
	}
	
	/**
	 * Test Word calculateColour method.
	 */
	@Test
	public void testCalculateColour() {
		Word word1 = new Word("First", -0.4f);
		assertNull(word1.getColour());
		word1.calculateColour();
		assertEquals("#ff9800", word1.getColour());
		
		Word word2 = new Word("Second", 0.9f);
		assertNull(word2.getColour());
		word2.calculateColour();
		assertEquals("#19ff00", word2.getColour());
	}

	/**
	 * Test Word getSentiment method.
	 */
	@Test
	public void testGetSentiment() {
		Word word = new Word("First", -0.4f);
		assertEquals(-0.4f, word.getSentiment(), -0.4f);
	}

	/**
	 * Test Word calculateSentiment method.
	 */
	@Test
	public void testCalculateSentiment() {
		Word word = new Word("First", 0.4f);
		assertEquals(0.4f, word.getSentiment(), 0.4f);
		word.calculateSentiment(0.2f);
		assertEquals(0.6f, word.getSentiment(), 0.6f);
		word.incrementCount();
		assertEquals(0.3f, word.getSentiment(), 0.3f);

	}
	
	/**
	 * Test WordCloud class constructor.
	 */
	@Test
	public void testWordCloud() {
		WordCloud wordCloud = new WordCloud();
		assertTrue(wordCloud.getHashMap().isEmpty());
	}

	/**
	 * Test WordCloud processResponse method.
	 *
	 * @throws Exception the exception
	 */
	@Test
	public void testProcessResponse() throws Exception {
		WordCloud wordCloud = new WordCloud();
		wordCloud.processResponse("I love this coursework! Its the best!");
		
		assertTrue(wordCloud.getHashMap().containsKey("best"));
		assertTrue(wordCloud.getHashMap().containsKey("coursework"));
		
		wordCloud.processResponse("I hate this coursework! Its the worst");
		
		assertTrue(wordCloud.getHashMap().containsKey("best"));
		assertTrue(wordCloud.getHashMap().containsKey("coursework"));
		assertTrue(wordCloud.getHashMap().containsKey("worst"));
	}

	/**
	 * Test WordCloud getHashMap method.
	 *
	 * @throws Exception the exception
	 */
	@Test
	public void testGetHashMap() throws Exception {
		WordCloud wordCloud = new WordCloud();
		assertTrue(wordCloud.getHashMap().isEmpty());
		wordCloud.processResponse("I love this coursework! Its the best!");
		assertFalse(wordCloud.getHashMap().isEmpty());
	}
}