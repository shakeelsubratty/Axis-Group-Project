package analysis;

import java.util.List;
import java.util.Collection;
import java.util.ArrayList;
import java.lang.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import com.google.gson.*;

import analysis.RepetitionGrouper;
import analysis.UserEngagementCalculator;
import data.Response;

@RestController
public class AIController {


    private Map<String,RepetitionGrouper> reptitionGrouperMap = new Map<>();

    @RequestMapping(value = "/userengagement", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String userEngagement(HttpEntity<String> s)
    {
        String json = s.getBody();
        Gson g = new Gson();
        JsonParser parser = new JsonParser();
        JsonArray participantsArray = parser.parse(json).getAsJsonArray();
        List<Participant> participants = new ArrayList<Participant>();
        for(JsonElement e : participantsArray)
        {
            JsonObject elementObject = e.getAsJsonObject();
            List<Response> responses = new ArrayList<>();

            for(JsonElement idea : elementObject.get("responses").getAsJsonArray())
            {
                JsonObject ideaObject = idea.getAsJsonObject();
                try
                {
                    String id = g.fromJson(ideaObject.get("id"),String.class);
                    String description = g.fromJson(ideaObject.get("description"),String.class);
                    String workshopID = g.fromJson(ideaObject.get("workshop"),String.class);
                    //TODO: Reduce redundancy
                    Response r = new Response(id,description,workshopID);
                    responses.add(r);
                } catch(Exception excep)
                {
                    excep.printStackTrace();
                }
            }
            Participant participant = new Participant(g.fromJson(elementObject.get("id"),String.class),responses);
            participants.add(participant);
        }
        UserEngagementCalculator uec = new UserEngagementCalculator(participants);
        uec.calculateLevel();
        Collection<Double> results = uec.returnAverageArr();
        return g.toJson(results);
    }

    @RequestMapping(value = "/repetition", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String repetition(HttpEntity<String> s)
    {
        String json = s.getBody();
        Gson g = new Gson();
        JsonParser parser = new JsonParser();
        JsonObject responseObject = parser.parse(json).getAsJsonObject();
        try
        {
            String id = g.fromJson(responseObject.get("id"), String.class);
            String description = g.fromJson(responseObject.get("description"), String.class);
            String workshopID = g.fromJson(responseObject.get("workshop"), String.class);

            RepetitionGrouper rg;

            if(reptitionGrouperMap.containsKey(workshopID))
            {
                rg = repetitionGrouperMap.get("workshopID");
            }
            else{
                rg = new RepetitionGrouper();
                repetitionGrouperMap.put(workshopID, rg)
            }
            Response r = new Response(id, description,workshopID);
            rg.addResponse(r);
        } catch (Exception excep)
        {
            excep.printStackTrace();
        }
        return g.toJson(rg.getGroups());
    }

    @RequestMapping(value = "/wordcloud", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String wordCloud(HttpEntity<String> s)
    {
        WordCloud wc = new WordCloud();
        String json = s.getBody();
        Gson g = new Gson();
        JsonParser parser = new JsonParser();
        JsonArray participantsArray = parser.parse(json).getAsJsonArray();
        for(JsonElement e : participantsArray)
        {
            JsonObject elementObject = e.getAsJsonObject();
            List<Response> responses = new ArrayList<>();
            for(JsonElement idea : elementObject.get("responses").getAsJsonArray())
            {
                JsonObject ideaObject = idea.getAsJsonObject();
                try{
                    String description = g.fromJson(ideaObject.get("description"),String.class);
                    wc.processResponse(description);
                } catch(Exception excep)
                {
                    excep.printStackTrace();
                }
            }
        }
        return g.toJson(wc.getWords());
    }


}
