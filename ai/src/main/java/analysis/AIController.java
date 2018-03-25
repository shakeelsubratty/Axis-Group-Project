package analysis;

import java.util.List;
import java.util.Collection;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicLong;
import java.lang.Exception;
import java.io.IOException;


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

//    @RequestMapping(value = "/userengagement", method = RequestMethod.POST)
//    public ResponseEntity<UserEngagementResponse> userEngagement(@RequestBody List<Participant> participants)
//    {
//        //System.out.println(participants.get(0).getID());
//
//        UserEngagementCalculator uec = new UserEngagementCalculator(participants);
//
//        uec.calculateLevel();
//
//        UserEngagementResponse u = new UserEngagementResponse(uec.returnAverageArr());
//       // System.out.println("UserEngagement: Returning" + u.getEngagementResponse());
//        return new ResponseEntity<UserEngagementResponse>(u, HttpStatus.OK);
//    }
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
            JsonArray elementArray = e.getAsJsonArray();
            List<Response> responses = new ArrayList<>();

            for(JsonElement idea : elementArray.get(1).getAsJsonArray())
            {
                JsonArray ideaArray = idea.getAsJsonArray();
                try{
                    Response r = new Response(g.fromJson(ideaArray.get(0),String.class),g.fromJson(ideaArray.get(1),String.class));
                    responses.add(r);
                } catch(Exception excep)
                {
                    excep.printStackTrace();
                }
            }

            Participant participant = new Participant(g.fromJson(elementArray.get(0),String.class),responses);

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
//    @RequestMapping(value = "/wordcloud", method = RequestMethod.POST)
//    public ResponseEntity<WordCloudResponse> wordCloud(@RequestBody List<Participant> participants)
//    {
//        WordCloud wc = new WordCloud();
//
//        for(Participant p : participants)
//        {
//            for(String r : p.getResponsesString())
//            {
//                try {
//                    wc.processResponse(r);
//                } catch (Exception e){
//                    e.printStackTrace();
//                }
//            }
//        }
//
//        WordCloudResponse w = new WordCloudResponse(wc.getHashMap());
//
//        return new ResponseEntity<WordCloudResponse>(w,HttpStatus.OK);
//    }


}
