package analysis;

import java.util.List;
import java.util.Map;

public class RepetitionResponse
{
    private Map<Integer, List<String>> map;
//    private List<Participant> participants;
//    private List<String> responses;
//
    public RepetitionResponse(Map<Integer, List<String>> map)
    {
        this.map = map;
    }

    public Map<Integer, List<String>> getMap() {
        return map;
    }

    public void setMap(Map<Integer, List<String>> map) {
        this.map = map;
    }

}