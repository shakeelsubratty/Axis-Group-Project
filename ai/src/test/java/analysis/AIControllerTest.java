package analysis;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.google.gson.*;

import org.springframework.http.MediaType;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class AIControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void userEngagementPostRequestWithCorrectJSONShouldReturnListOfNumbers() throws Exception {
        String request =  "[\n" +
                            "   {\n" +
                            "      \"id\": \"5abb7ad87e9f8600015f805a\",\n" +
                            "      \"responses\": [\n" +
                            "         {\n" +
                            "            \"id\": \"5abb7b1b7e9f8600015f805c\",\n" +
                            "            \"description\": \"test1\"\n" +
                            "         },\n" +
                            "         {\n" +
                            "            \"id\": \"5abb7be07e9f8600015f805d\",\n" +
                            "            \"description\": \"test1\"\n" +
                            "         }\n" +
                            "      ]\n" +
                            "   },\n" +
                            "   {\n" +
                            "      \"id\": \"5abb7ad87e9f8600015f805b\",\n" +
                            "      \"responses\": []\n" +
                            "   }\n" +
                            "]";

        String response = "[\n" +
                            "   0.5,\n" +
                            "   0.0,\n" +
                            "   0.0,\n" +
                            "   0.5,\n" +
                            "   0.5\n" +
                            "]";

        this.mockMvc.perform(post("/userengagement").contentType(MediaType.APPLICATION_JSON_VALUE).content(request)).andExpect(status().isOk()).andExpect(content().json(response));
    }

    @Test
    public void userEngagementPostRequestWithCorrectJSONNoResponsesShouldReturnListOfZeroes() throws Exception {
        String request =  "[\n" +
                "   {\n" +
                "      \"id\": \"5abb7ad87e9f8600015f805a\",\n" +
                "      \"responses\": [\n" +
                "      ]\n" +
                "   },\n" +
                "   {\n" +
                "      \"id\": \"5abb7ad87e9f8600015f805b\",\n" +
                "      \"responses\": []\n" +
                "   }\n" +
                "]";

        String response = "[\n" +
                "   0.0,\n" +
                "   0.0,\n" +
                "   0.0,\n" +
                "   0.0,\n" +
                "   0.0\n" +
                "]";

        this.mockMvc.perform(post("/userengagement").contentType(MediaType.APPLICATION_JSON_VALUE).content(request)).andExpect(status().isOk()).andExpect(content().json(response));
    }

    @Test
    public void wordPostRequestWithCorrectJSONShouldReturnListOfNumbers() throws Exception {
        String request =  "[\n" +
                "   {\n" +
                "      \"id\": \"5abb7ad87e9f8600015f805a\",\n" +
                "      \"responses\": [\n" +
                "         {\n" +
                "            \"id\": \"5abb7b1b7e9f8600015f805c\",\n" +
                "            \"description\": \"test1\"\n" +
                "         },\n" +
                "         {\n" +
                "            \"id\": \"5abb7be07e9f8600015f805d\",\n" +
                "            \"description\": \"test1\"\n" +
                "         }\n" +
                "      ]\n" +
                "   },\n" +
                "   {\n" +
                "      \"id\": \"5abb7ad87e9f8600015f805b\",\n" +
                "      \"responses\": []\n" +
                "   }\n" +
                "]";

        this.mockMvc.perform(post("/wordcloud").contentType(MediaType.APPLICATION_JSON_VALUE).content(request)).andExpect(status().isOk());
    }

    @Test
    public void wordPostRequestWithEmptyCorrectJSONShouldReturnEmptyArray() throws Exception {
        String request =  "[\n" +
                "   {\n" +
                "      \"id\": \"5abb7ad87e9f8600015f805a\",\n" +
                "      \"responses\": [" +
                "      ]\n" +
                "   },\n" +
                "   {\n" +
                "      \"id\": \"5abb7ad87e9f8600015f805b\",\n" +
                "      \"responses\": []\n" +
                "   }\n" +
                "]";

        String response = "[]";

        this.mockMvc.perform(post("/wordcloud").contentType(MediaType.APPLICATION_JSON_VALUE).content(request)).andExpect(status().isOk()).andExpect(content().json(response));
    }

    @Test
    public void repetitionPostRequestWithCorrectJsonShouldReturnGroupID() throws Exception {
        String request = "{\"_id\":\"5abb7ad87e9f8600015f805a\",\"description\":\"This is a test\",\"workshop\":\"5abb7ad87e9f8600015f805b\"}\n";
        this.mockMvc.perform(post("/repetition").contentType(MediaType.APPLICATION_JSON_VALUE).content(request)).andExpect(status().isOk());
    }
}
