package analysis;

import java.util.List;
import java.util.ArrayList;
import data.Response;

public class Participant
{
    private final String id;
    private List<Response> responsesList;
    private List<String> responses;     //For userEngagement and WordCloud

    private int sumOfLengths;
    private int numberOfResponses;
    private double engagementLevel;
    private double averageLength;
    private String stringLevel;

    public Participant(String id, List<Response> responses)
    {
        this.id = id;
        this.responsesList = responses;
        this.responses = new ArrayList<>();
        for(Response r : responses)
        {
            this.responses.add(r);
        }
        numberOfResponses = responses.size();

    }

    public double computeAverage()
    {

        for (String x: responses)
        {
            sumOfLengths += x.length();
        }

        if (responses.size()!=0)
        {
            averageLength = ( sumOfLengths /( responses.size() ));
        }

        return averageLength;
    }

    public String getID(){return id;}

    public List<String> getResponses() {return responses;}

    public List<Response> getResponsesList() {return responsesList;}

    public double fetchAverage(){
        return averageLength;
    }

    public int getNumResponses()
    {
        return responses.size();
    }

    public void setLevel(double x)
    {
        engagementLevel = x;
    }

    public double getLevel()
    {
        return engagementLevel;
    }

    public double getSize()
    {
        return responses.size();
    }

    public void setStringLevel(String a)
    {
        stringLevel=a;
    }

    public String getStringLevel()
    {
        return stringLevel;
    }

}