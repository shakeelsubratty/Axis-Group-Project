package analysis;

import java.util.List;
import java.util.Map;
import data.Response;

public class RepetitionResponse
{
    private List<List<Response>> groups;

    public RepetitionResponse(List<List<Response>> groups)
    {
        this.groups = groups;
    }

    public List<List<Response>> getGroups() {
        return groups;
    }

    public void setGroups(List<List<Response>> groups) {
        this.groups = groups;
    }
}