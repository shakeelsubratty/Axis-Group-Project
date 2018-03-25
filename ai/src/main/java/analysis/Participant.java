package analysis;

import java.util.List;
import java.util.ArrayList;
import data.Response;

public class Participant
{
    private final String id;
    private List<Response> responses;
    //private List<String> responsesString;     //For userEngagement and WordCloud

    private int sumOfLengths;
    private int numberOfResponses;
    private double engagementLevel;
    private double averageLength;
    private String stringLevel;

    public Participant(String id, List<Response> responses)
    {
        this.id = id;
        this.responses = responses;
//        this.responsesString = new ArrayList<>();
//        for(Response r : responses)
//        {
//            this.responsesString.add(r.getText());
//        }
        numberOfResponses = responses.size();

    }

    public double computeAverage()
    {

        for (String x: responsesString)
        {
            sumOfLengths += x.length();
        }

        if (responsesString.size()!=0)
        {
            averageLength = ( sumOfLengths /( responsesString.size() ));
        }

        return averageLength;
    }

    public String getID(){return id;}

    public List<String> getResponsesString() {return responsesString;}

    public List<Response> getResponses() {return responses;}

    public double fetchAverage(){
        return averageLength;
    }

    public int getNumResponses()
    {
        return responsesString.size();
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
        return responsesString.size();
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