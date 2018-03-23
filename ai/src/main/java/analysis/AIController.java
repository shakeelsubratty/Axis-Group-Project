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

    @RequestMapping(value = "/userengagement", method = RequestMethod.POST)
    public ResponseEntity<UserEngagementResponse> userEngagement(@RequestBody List<Participant> participants)
    {

        UserEngagementCalculator uec = new UserEngagementCalculator(participants);

        uec.calculateLevel();

        UserEngagementResponse u = new UserEngagementResponse(uec.returnAverageArr());
        return new ResponseEntity<UserEngagementResponse>(u, HttpStatus.OK);
    }

    @RequestMapping(value = "/repetition", method = RequestMethod.POST)
    public ResponseEntity<RepetitionResponse> repetition(@RequestBody List<Participant> participants)
    {
        RepetitionGrouper rg = new RepetitionGrouper();


//        List<List<Response>> fake1 = new ArrayList<>();
//        List<Response> fake2 = new ArrayList<>();

        for(Participant p : participants)
        {
            for(String r : p.getResponses())
            {
                try{
                    rg.addResponse(new Response(r));
                } catch (Exception i){
                    i.printStackTrace();
                }
            }
        }

        //TODO: DO ID


        RepetitionResponse r = new RepetitionResponse(rg.getGroups());

        return new ResponseEntity<RepetitionResponse>(r,HttpStatus.OK);
    }

    @RequestMapping(value = "/wordcloud", method = RequestMethod.POST)
    public ResponseEntity<WordCloudResponse> wordCloud(@RequestBody List<Participant> participants)
    {
        WordCloud wc = new WordCloud();

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

        WordCloudResponse w = new WordCloudResponse(wc.getHashMap());
        return new ResponseEntity<WordCloudResponse>(w,HttpStatus.OK);
    }


}
