package analysis;

import java.util.List;
import java.util.Collection;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicLong;
import java.lang.Exception;
import java.io.IOException;

import com.google.api.gax.rpc.*;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.http.HttpEntity;

import org.springframework.web.bind.annotation.*;

import com.google.gson.*;

import analysis.RepetitionGrouper;
import analysis.UserEngagementCalculator;
import data.Response;

@RestController
public class AIController {

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
            //JsonArray elementArray = e.getAsJsonArray();
            JsonObject elementObject = e.getAsJsonObject();
            List<Response> responses = new ArrayList<>();

            for(JsonElement idea : elementObject.get("responses").getAsJsonArray())
            {
                //JsonArray ideaArray = idea.getAsJsonArray();
                JsonObject ideaObject = idea.getAsJsonObject();
                try{
                    String id = g.fromJson(ideaObject.get("id"),String.class);
                    String description = g.fromJson(ideaObject.get("description"),String.class);
                    Response r = new Response(id,description);
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

        String ret = g.toJson(results);

        return ret;

//        return new ResponseEntity<String>("Hi there! Participant: ",HttpStatus.OK);
//        System.out.println(participants.get(0).getID());
//
//
//        System.out.println("UserEngagement: Returning" + u.getEngagementResponse());
//        return new ResponseEntity<List<Double>>(u.getEngagementResponse(), HttpStatus.OK);
    }

//    @RequestMapping(value = "/repetition", method = RequestMethod.POST)
//    public ResponseEntity<RepetitionResponse> repetition(@RequestBody List<Participant> participants)
//    {
//        RepetitionGrouper rg = new RepetitionGrouper();
//
//        for(Participant p : participants)
//        {
//            for(Response r : p.getResponses())
//            {
//                try{
//                    rg.addResponse(r);
//                } catch (Exception i){
//                    i.printStackTrace();
//                }
//            }
//        }
//
//        //TODO: DO ID
//
//        RepetitionResponse r = new RepetitionResponse(rg.getGroups());
//
//        return new ResponseEntity<RepetitionResponse>(r,HttpStatus.OK);
//    }
//
    @RequestMapping(value = "/wordcloud", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String wordCloud(HttpEntity<String> s)
    {

        String json = s.getBody();
        Gson g = new Gson();
        JsonParser parser = new JsonParser();

        JsonArray participantsArray = parser.parse(json).getAsJsonArray();

        List<Participant> participants = new ArrayList<Participant>();

        for(JsonElement e : participantsArray)
        {
            //JsonArray elementArray = e.getAsJsonArray();
            JsonObject elementObject = e.getAsJsonObject();
            List<Response> responses = new ArrayList<>();

            for(JsonElement idea : elementObject.get("responses").getAsJsonArray())
            {
                //JsonArray ideaArray = idea.getAsJsonArray();
                JsonObject ideaObject = idea.getAsJsonObject();
                try{
                    String id = g.fromJson(ideaObject.get("id"),String.class);
                    String description = g.fromJson(ideaObject.get("description"),String.class);
                    Response r = new Response(id,description);
                    responses.add(r);
                } catch(Exception excep)
                {
                    excep.printStackTrace();
                }
            }

            Participant participant = new Participant(g.fromJson(elementObject.get("id"),String.class),responses);

            participants.add(participant);
        }

        try{
            WordCloud wc = new WordCloud("Hi");
            for(Participant p : participants)
            {
                for(String r : p.getResponses())
                {
                    try {
                        wc.processResponse(r);
                    } catch (Exception e){
                        e.printStackTrace();
                    }
                }
            }
        } catch (Exception b) {b.printStackTrace();}



//
//       WordCloudResponse w = new WordCloudResponse(wc.getHashMap());
//
//        String ret = g.toJson(w.getCloud());
        //return ret;

        return g.toJson(participants);
    }


}
