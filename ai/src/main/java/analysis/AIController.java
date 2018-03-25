package analysis;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicLong;
import java.lang.Exception;
import java.io.IOException;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import analysis.RepetitionGrouper;
import analysis.UserEngagementCalculator;
import data.Response;

@RestController
public class AIController {

//    @RequestMapping(value = "/userengagement", method = RequestMethod.POST)
//    public ResponseEntity<UserEngagementResponse> userEngagement(@RequestBody List<Participant> participants)
//    {
//        System.out.println(participants.get(0).getID());
//
//        UserEngagementCalculator uec = new UserEngagementCalculator(participants);
//
//        uec.calculateLevel();
//
//        UserEngagementResponse u = new UserEngagementResponse(uec.returnAverageArr());
//        System.out.println("UserEngagement: Returning" + u.getEngagementResponse());
//        return new ResponseEntity<UserEngagementResponse>(u, HttpStatus.OK);
//    }
    @RequestMapping(value = "/userengagement", method = RequestMethod.POST)
    public ResponseEntity<String> userEngagement(@RequestBody List<Participant> participants)
    {

        return new ResponseEntity<String>("Hi there! Participant: " + participants.get(0).getID(),HttpStatus.OK);
//        System.out.println(participants.get(0).getID());
//
//        UserEngagementCalculator uec = new UserEngagementCalculator(participants);
//
//        uec.calculateLevel();
//
//        UserEngagementResponse u = new UserEngagementResponse(uec.returnAverageArr());
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
