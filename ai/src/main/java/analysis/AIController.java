package analysis;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
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


    private Map<String,RepetitionGrouper> repetitionGrouperMap = new HashMap<>();

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

        RepetitionGrouper rg;

        String id = g.fromJson(responseObject.get("_id"), String.class);
        String description = g.fromJson(responseObject.get("description"), String.class);
        String workshopID = g.fromJson(responseObject.get("workshop"), String.class);

        if(repetitionGrouperMap.containsKey(workshopID))
        {
            rg = repetitionGrouperMap.get(workshopID);
        }
        else{
            rg = new RepetitionGrouper();
            repetitionGrouperMap.put(workshopID, rg);
        }

        Response r = new Response(id, description,workshopID);

        try
        {
            rg.addResponse(r);
        } catch (Exception excep)
        {
            excep.printStackTrace();
        }

        List<List<Response>> groups = rg.getGroups();


        for(List<Response> group : groups)
        {
            for(Response response : group)
            {
                if(response.getID().equals(id))
                {
                    return g.toJson(response.getGroupID());
                }
            }
        }

        return g.toJson("Error: err");
    }

    @RequestMapping(value ="/deleteworkshop", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String deleteWorkshop(HttpEntity<String> s)
    {
        String json = s.getBody();
        Gson g = new Gson();
        JsonParser parser = new JsonParser();
        JsonObject responseObject = parser.parse(json).getAsJsonObject();

        String workshopID = g.fromJson(responseObject.get("workshop"),String.class);

        if(repetitionGrouperMap.containsKey(workshopID))
        {
            repetitionGrouperMap.remove(workshopID);
        }
        else
        {
            return g.toJson("Workshop with ID: " + workshopID + " does not exist!");
        }

        return g.toJson("Deleted Workshop with ID: " + workshopID);

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
