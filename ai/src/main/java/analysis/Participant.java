package analysis;

import java.util.List;

public class Participant
{
    private final long id;
    private List<String> responses;

    public Participant(long id, List<String> responses)
    {
        this.id = id;
        this.responses = responses;
    }

    public long getID(){return id;}

    public List<String> getResponses() {return responses;}

}