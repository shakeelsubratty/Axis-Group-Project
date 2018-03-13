package hello;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AIController {

    @RequestMapping(value = "/userengagement", method = RequestMethod.POST)
    public ResponseEntity<UserEngagementResponse> userEngagement(@RequestBody List<Participant> participants)
    {
        UserEngagementResponse u = new UserEngagementResponse(1,2,3,4);
        return new ResponseEntity<UserEngagementResponse>(u, HttpStatus.OK);
    }
}
