package analysis;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AIController {

//    @RequestMapping(value = "/userengagement", method = RequestMethod.POST)
//    public ResponseEntity<UserEngagementResponse> userEngagement(@RequestBody List<Participant> participants)
//    {
//        UserEngagementResponse u = new UserEngagementResponse(1,2,3,4);
//        return new ResponseEntity<UserEngagementResponse>(u, HttpStatus.OK);
//    }

    @RequestMapping(value = "/repetition", method = RequestMethod.POST)
    public ResponseEntity<RepetitionResponse> repetition(@RequestBody List<Participant> participants)
    {
        Map<Integer, List<String>> m = new HashMap<>();

        ArrayList<String> arr = new ArrayList<>();
        arr.add("Hi");
        arr.add("Bye");

        m.put(0,arr);
        RepetitionResponse r = new RepetitionResponse(m);

        return new ResponseEntity<RepetitionResponse>(r,HttpStatus.OK);
    }

//    @RequestMapping(value = "/confidence", method = RequestMethod.POST)
//    public ResponseEntity<RepetitionResponse>
}
